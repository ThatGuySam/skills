#!/usr/bin/env bash
# Read-only. Lists the apps WindowServer marked unresponsive ("not responding"),
# mapped from connection ID (cid) to PID and app name.
#
# Usage: bash unresponsive-apps.sh [window_minutes] [lookup_hours] [recheck_seconds]
#   window_minutes   how far back to look for unresponsive marks (default 40)
#   lookup_hours     how far back to look for the cid -> PID lines (default 48;
#                    larger is slower, roughly 10-15 s per day of log)
#   recheck_seconds  minimum re-check window (default 60). After the first scan,
#                    each cid's new marks since that scan are counted; the script
#                    waits only if the lookups finished sooner.
#
# A recent last mark does not show an app is still hung. Apps that stalled
# together (after a wake, under memory pressure) leave a short burst of marks
# and recover; a hung app that receives no input can go quiet for minutes.
# New marks during the re-check, and a sustained run of marks compared with
# the other cids, separate the two.
#
# Prints executable names and .app bundle names only, never command arguments.

set -u

window=${1:-40}
lookup=${2:-48}
recheck=${3:-60}
burst=60   # a cid whose marks all fall within this many seconds is a short burst
for value in "$window" "$lookup" "$recheck"; do
  case $value in
    '' | *[!0-9]*)
      echo "usage: bash unresponsive-apps.sh [window_minutes] [lookup_hours] [recheck_seconds]" >&2
      exit 2
      ;;
  esac
done

work=$(mktemp -d "${TMPDIR:-/tmp}/unresponsive.XXXXXX") || exit 1
trap 'rm -rf "$work"' EXIT

now=$(date +%s)
echo "Checked: $(date '+%Y-%m-%d %H:%M:%S')  window=${window}m  lookup=${lookup}h  re-check>=${recheck}s"

unresponsive='process == "WindowServer" AND eventMessage CONTAINS "connectionIsUnresponsive: 1"'

# 1. Unresponsive marks per cid: count, first and last timestamp.
log show --last "${window}m" --style compact --predicate "$unresponsive" \
  2>"$work/err1" |
  awk '
    /connectionIsUnresponsive: 1/ && match($0, /cid 0x[0-9a-fA-F]+/) {
      cid = tolower(substr($0, RSTART + 4, RLENGTH - 4))
      ts = $1 " " substr($2, 1, 8)
      if (!(cid in first)) first[cid] = ts
      last[cid] = ts
      marks[cid]++
    }
    END { for (cid in marks) print cid, marks[cid], first[cid], last[cid] }
  ' >"$work/cids"
# The re-check counts marks logged after this scan finished.
t0_epoch=$(($(date +%s) + 1))
t0=$(date -r "$t0_epoch" '+%Y-%m-%d %H:%M:%S')

if [ ! -s "$work/cids" ]; then
  if [ -s "$work/err1" ]; then
    echo "log show failed or was blocked:"
    head -3 "$work/err1"
  else
    echo "No app connections were marked unresponsive in the last ${window} minutes."
  fi
  exit 0
fi

# 2. Map each cid to a PID with WindowServer's "conn 0x<cid>, PID <n>" lines.
#    One bounded log query per chunk of cids; a "Closing conn" line means the
#    connection closed (app quit, crashed, or was force-quit).
: >"$work/map"
cut -d' ' -f1 "$work/cids" | awk '{ printf "%s%s", (NR % 25 == 1 ? (NR > 1 ? "\n" : "") : " "), $1 } END { print "" }' >"$work/chunks"
while read -r chunk; do
  [ -n "$chunk" ] || continue
  predicate='process == "WindowServer" AND ('
  sep=''
  for cid in $chunk; do
    predicate="$predicate$sep"'eventMessage CONTAINS "conn '"$cid"',"'
    sep=' OR '
  done
  predicate="$predicate)"
  log show --last "${lookup}h" --style compact --predicate "$predicate" 2>>"$work/err2" |
    awk '
      match($0, /conn 0x[0-9a-fA-F]+, PID [0-9]+/) {
        s = substr($0, RSTART, RLENGTH)
        split(s, parts, /[ ,]+/)
        cid = tolower(parts[2]); pid = parts[4]
        closed = ($0 ~ /Closing conn/) ? $1 " " substr($2, 1, 8) : ""
        print cid, pid, (closed == "" ? "-" : closed)
      }
    ' >>"$work/map"
done <"$work/chunks"

# 3. Resolve status and names.
to_epoch() { date -j -f "%Y-%m-%d %H:%M:%S" "$1" +%s 2>/dev/null || echo 0; }
etime_seconds() {
  # ps etime: [[dd-]hh:]mm:ss
  echo "$1" | awk '{
    d = 0; t = $1
    if (index(t, "-")) { split(t, a, "-"); d = a[1]; t = a[2] }
    n = split(t, p, ":"); s = 0
    for (i = 1; i <= n; i++) s = s * 60 + p[i]
    print d * 86400 + s
  }'
}
app_label() {
  # basename plus outermost .app bundle, from the executable path only.
  # argv[0] can be rewritten, so fall back to the short accounting name.
  case $1 in
    /*) ;;
    *) ps -p "$2" -o ucomm= 2>/dev/null | sed -E "s/ +$//"; return ;;
  esac
  echo "$1" | awk '{
    path = $0; name = path; sub(/.*\//, "", name)
    app = ""
    if (match(path, /[^\/]+\.app\//)) app = substr(path, RSTART, RLENGTH - 1)
    if (app != "" && app != name ".app") print name " [" app "]"; else print name
  }'
}

: >"$work/rows"
: >"$work/names"
: >"$work/exited_pids"
while read -r cid marks fd ft ld lt; do
  first="$fd $ft"
  last="$ld $lt"
  last_epoch=$(to_epoch "$last")
  first_epoch=$(to_epoch "$first")
  age=$((now - last_epoch))
  span=$((last_epoch - first_epoch))
  line=$(awk -v c="$cid" '$1 == c { pid = $2; if ($3 != "-") closed = $3 " " $4 } END { if (pid != "") print pid "|" closed }' "$work/map")
  pid=${line%%|*}
  closed=${line#*|}
  name="?"
  if [ -z "$line" ]; then
    status="UNMAPPED"
    pid="-"
  else
    path=$(ps -p "$pid" -o comm= 2>/dev/null)
    started_ok=1
    if [ -n "$path" ]; then
      et=$(ps -p "$pid" -o etime= 2>/dev/null | tr -d ' ')
      # An unreadable age cannot prove the PID was reused, so only a known age is checked.
      if [[ $et =~ ^[0-9] ]]; then
        started=$((now - $(etime_seconds "$et")))
        [ "$started" -le "$first_epoch" ] || started_ok=0
      fi
    fi
    if [ -n "$closed" ]; then
      if [ -n "$path" ] && [ "$started_ok" = 1 ]; then
        name=$(app_label "$path" "$pid")
        status="CONN CLOSED at ${closed#* }; process still running"
      else
        status="CONN CLOSED at ${closed#* }; process gone (quit, crashed, or force-quit)"
      fi
    elif [ -n "$path" ] && [ "$started_ok" = 1 ]; then
      name=$(app_label "$path" "$pid")
      status="LIVE"
    else
      status="EXITED"
    fi
    # Name gone processes from their own log lines, up to shortly after the
    # connection closed (or the last mark), so a reused PID cannot lend its
    # new name. A hung app often logs nothing until it exits.
    if [ "$name" = "?" ]; then
      if [ -n "$closed" ]; then cut_epoch=$(to_epoch "$closed"); else cut_epoch=$last_epoch; fi
      cutoff=$(date -r $((cut_epoch + 15)) '+%Y-%m-%d %H:%M:%S')
      echo "$pid $cutoff" >>"$work/exited_pids"
    fi
  fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$cid" "$pid" "$marks" "$span" "$age" "$first" "$last" "$status" >>"$work/rows"
  printf '%s\t%s\n' "$cid" "$name" >>"$work/names"
done <"$work/cids"

# 4. Names for PIDs that are gone: their own log lines inside the lookup
#    window, up to each PID's cutoff. A hung app may have logged nothing since
#    before the Mac slept, so search the whole lookup window; stop once every
#    PID has a name.
if [ -s "$work/exited_pids" ]; then
  predicate=$(awk '$1 ~ /^[0-9]+$/ && !seen[$1]++ { printf "%sprocessID == %s", (n++ ? " OR " : ""), $1 }' "$work/exited_pids")
  wanted=$(awk '$1 ~ /^[0-9]+$/ && !seen[$1]++ { n++ } END { print n + 0 }' "$work/exited_pids")
  end_ts=$(sort -k2 "$work/exited_pids" | tail -1 | cut -d' ' -f2-)
  start_ts=$(date -v-"${lookup}"H '+%Y-%m-%d %H:%M:%S')
  if [ -n "$predicate" ]; then
    log show --start "$start_ts" --end "$end_ts" --style compact --predicate "$predicate" 2>/dev/null |
      awk -v list="$work/exited_pids" -v wanted="$wanted" '
      BEGIN { while ((getline row < list) > 0) { split(row, r, " "); upto[r[1]] = r[2] " " r[3] } }
      NR > 1 {
        line = $0
        ts = $1 " " substr($2, 1, 8)
        sub(/^[^ ]+ [^ ]+ +[^ ]+ +/, "", line)
        i = index(line, "[")
        if (i < 2) next
        name = substr(line, 1, i - 1)
        rest = substr(line, i + 1)
        pid = rest; sub(/:.*/, "", pid)
        if (!(pid in upto) || ts > upto[pid]) next
        if (name == "xpcproxy") next   # pre-exec launcher name for the same PID
        if (!(pid in seen)) {
          seen[pid] = 1; found++
          print pid "\t" name " (from log, exited)"
          if (found >= wanted) exit
        }
      }' >"$work/exited_names"
  fi
fi

# 5. Re-check: new marks per cid since the first scan.
elapsed=$(($(date +%s) - t0_epoch))
[ "$elapsed" -lt "$recheck" ] && sleep $((recheck - elapsed))
t1=$(date '+%Y-%m-%d %H:%M:%S')
rc=$(($(date +%s) - t0_epoch))
log show --start "$t0" --style compact --predicate "$unresponsive" 2>/dev/null |
  awk '
    /connectionIsUnresponsive: 1/ && match($0, /cid 0x[0-9a-fA-F]+/) { n[tolower(substr($0, RSTART + 4, RLENGTH - 4))]++ }
    END { for (c in n) print c, n[c] }
  ' >"$work/new"

hang_status() { # marks span age new
  if [ "$4" -gt 0 ]; then
    echo "STILL HUNG: $4 new marks during the ${rc}s re-check"
  elif [ "$2" -le "$burst" ]; then
    echo "RECOVERED (likely): short burst of $1 marks within ${2}s, none during the ${rc}s re-check"
  else
    echo "QUIET during the ${rc}s re-check after $1 marks over $(($2 / 60))m, last $(($3 / 60))m before the first scan: recovered, or hung with no input reaching it; confirm in Force Quit"
  fi
}

: >"$work/final"
total=0 renewed=0 bursts=0 burst_first="" burst_last=""
while IFS=$'\t' read -r cid pid marks span age first last state; do
  new=$(awk -v c="$cid" '$1 == c { print $2 }' "$work/new")
  new=${new:-0}
  total=$((total + 1))
  [ "$new" -gt 0 ] && renewed=$((renewed + 1))
  case $state in
    LIVE) status=$(hang_status "$marks" "$span" "$age" "$new") ;;
    UNMAPPED) status="$(hang_status "$marks" "$span" "$age" "$new"); UNMAPPED: conn opened before lookup window, raise lookup_hours" ;;
    *) status=$state ;;
  esac
  if [ "$new" -eq 0 ] && [ "$span" -le "$burst" ] && { [ "$state" = LIVE ] || [ "$state" = UNMAPPED ]; }; then
    bursts=$((bursts + 1))
    if [ -z "$burst_first" ] || [[ $first < $burst_first ]]; then burst_first=$first; fi
    if [ -z "$burst_last" ] || [[ $last > $burst_last ]]; then burst_last=$last; fi
  fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$new" "$cid" "$pid" "$marks" "$span" "$first" "$last" "$status" >>"$work/final"
done <"$work/rows"

echo
printf '%-11s %-7s %6s %7s %5s  %-19s  %-19s  %s\n' "CID" "PID" "MARKS" "SPAN_S" "NEW" "FIRST MARK" "LAST MARK" "STATUS / APP"
sort -t$'\t' -k1,1nr -k4,4nr "$work/final" | while IFS=$'\t' read -r new cid pid marks span first last status; do
  name=$(awk -F'\t' -v c="$cid" '$1 == c { print $2 }' "$work/names")
  if [ "$name" = "?" ] && [ -s "$work/exited_names" ]; then
    found=$(awk -F'\t' -v p="$pid" '$1 == p { print $2 }' "$work/exited_names")
    [ -n "$found" ] && name=$found
  fi
  printf '%-11s %-7s %6s %7s %5s  %-19s  %-19s  %s\n' "$cid" "$pid" "$marks" "$span" "$new" "$first" "$last" "$status"
  printf '%-11s %s\n' "" "-> $name"
done

echo
echo "Re-check ${t0} to ${t1} (${rc}s): ${renewed} of ${total} connections got new marks."
if [ "$bursts" -gt 0 ]; then
  echo "Short bursts with no new marks: ${bursts} connections, all marks between ${burst_first} and ${burst_last}."
fi
echo "Confirm on screen: Force Quit Applications (Option-Command-Esc) shows a hung app as \"(not responding)\"."

if [ -s "$work/err2" ]; then
  echo
  echo "Some cid lookups reported errors:"
  head -3 "$work/err2"
fi
