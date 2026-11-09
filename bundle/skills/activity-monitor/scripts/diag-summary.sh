#!/usr/bin/env bash
# Read-only. Condenses macOS diagnostic files so the evidence fits in a reply:
#   *.diag / *.cpu_resource.diag  resource reports (CPU, wakeups, disk writes)
#   JetsamEvent-*.ips             memory-pressure kill reports
#   sample output files           from `sample <pid> 5 -file <path>`
#
# Usage: bash diag-summary.sh FILE [FILE...]
#
# Drops dispatch/pthread scaffolding frames, offsets, and addresses.

set -u

if [ $# -eq 0 ]; then
  echo "usage: bash diag-summary.sh FILE [FILE...]" >&2
  exit 2
fi

scaffold='start_wqthread|_pthread_wqthread|_pthread_start|thread_start|_dispatch_|dispatch_once|_os_once|__NSThread__start__|CFRunLoopRun|__CFRunLoop|^ *[0-9]+ +start \(|^ *\?\?\?'

clean_frames() {
  # strip "(lib + offset) [0xaddr]" and "+ 123" offsets, keep count, symbol, library
  sed -E 's/ \+ [0-9]+ \(([^ +]+)[^)]*\) \[0x[0-9a-f]+\]/  (\1)/; s/ \[0x[0-9a-f]+\]//; s/  \(in ([^)]*)\)  *\+ [0-9]+.*/  (\1)/'
}

summarize_resource_diag() {
  f=$1
  echo "== Resource report: $f"
  awk '/^Heaviest stack/ { exit } /^(Date\/Time|End time|Command|Path|PID|Parent|Event|Action taken|CPU|Wakeups|Writes|Duration|Active cpus|Memory size|Time Since Wake|Free disk space|Advisory levels):/' "$f"
  echo
  echo "-- Heaviest stack for the target process (scaffolding removed, top 15):"
  awk '/^Heaviest stack for the target process:/ { on = 1; next } on && /^$/ { exit } on' "$f" |
    grep -Ev "$scaffold" | clean_frames | head -15
  echo
  echo "-- Per-process sections (first is the target; later ones are other processes active in the same window):"
  awk '
    function flush() {
      if (name == "") return
      printf "  %s | samples %s | threads %s | footprint %s | start %s\n", name, samples, threads, footprint, start
      if (state != "") printf "    primary state: %s\n", state
      printf "    leaf-tagged samples (the rest share the primary state): kernel=%d user=%d e-core=%d p-core=%d\n", kmode, umode, ecore, pcore
    }
    /^Powerstats for:/ {
      flush()
      shown++
      if (shown > 6) { name = ""; done = 1; next }
      name = $0; sub(/^Powerstats for: +/, "", name)
      samples = threads = footprint = start = state = "?"; state = ""
      ecore = pcore = kmode = umode = 0
      next
    }
    done { next }
    name == "" { next }
    /^Num samples:/ { samples = $0; sub(/^Num samples: +/, "", samples) }
    /^Num threads:/ { threads = $3 }
    /^Footprint:/ { footprint = $2 " " $3 }
    /^Start time:/ { start = $3 " " $4 }
    /^Primary state:/ {
      s = $0
      mode = (s ~ /Kernel mode/) ? "kernel mode" : ((s ~ /User mode/) ? "user mode" : "")
      qos = ""
      if (match(s, /Effective Thread QoS [A-Za-z ]+,/)) qos = substr(s, RSTART, RLENGTH - 1)
      core = (s ~ /e-core/) ? "e-core" : ((s ~ /p-core/) ? "p-core" : "")
      n = $3
      state = n " samples: " mode (qos != "" ? ", " qos : "") (core != "" ? ", " core : "")
    }
    /^ +[0-9]+ +<[^>]*>/ {
      n = $1
      if ($0 ~ /<[^>]*Kernel mode/) kmode += n
      if ($0 ~ /<[^>]*User mode/) umode += n
      if ($0 ~ /<[^>]*e-core/) ecore += n
      if ($0 ~ /<[^>]*p-core/) pcore += n
    }
    END { flush() }
  ' "$f"
  echo
}

summarize_jetsam() {
  f=$1
  echo "== Jetsam (memory-pressure kill) report: $f"
  grep -m1 -oE '"date" *: *"[^"]*"' "$f"
  grep -m1 -oE '"largestProcess" *: *"[^"]*"' "$f"
  echo "-- Killed processes by reason:"
  awk '
    /"name" *:/ { nm = $0; sub(/.*"name" *: *"/, "", nm); sub(/".*/, "", nm) }
    /"reason" *:/ {
      rs = $0; sub(/.*"reason" *: *"/, "", rs); sub(/".*/, "", rs)
      if (nm != "") { byreason[rs]++; byname[rs " | " nm]++ }
      nm = ""
    }
    END {
      for (r in byreason) printf "  %6d  %s\n", byreason[r], r
      print "-- Most-killed names (count  reason | name), top 12:"
      for (k = 1; k <= 12; k++) {
        best = ""; bv = 0
        for (x in byname) if (!(x in shown) && byname[x] > bv) { bv = byname[x]; best = x }
        if (best == "") break
        shown[best] = 1
        printf "  %6d  %s\n", bv, best
      }
    }
  ' "$f"
  echo
}

summarize_sample() {
  f=$1
  echo "== sample output: $f"
  grep -E '^(Process|Path|Parent|Date/Time|Duration|Physical footprint):' "$f"
  echo
  echo "-- Sort by top of stack (where threads were when sampled), top 15:"
  awk '/^Sort by top of stack/ { on = 1; next } on && /^Binary Images:/ { exit } on && NF' "$f" | head -15
  echo
  echo "-- Call graph with scaffolding frames removed (first 40 lines):"
  awk '/^Call graph:/ { on = 1; next } on && /^Total number in stack/ { exit } on && NF' "$f" |
    grep -Ev "$scaffold" | clean_frames | head -40
  echo
}

for f in "$@"; do
  if [ ! -r "$f" ]; then
    echo "== $f: not readable (missing, or needs a group/permission this user lacks)"
    echo
    continue
  fi
  case $(basename "$f") in
    JetsamEvent-*) summarize_jetsam "$f" ;;
    *)
      if grep -q '^Sort by top of stack' "$f" && grep -q '^Call graph:' "$f"; then
        summarize_sample "$f"
      elif grep -q '^Heaviest stack for the target process:' "$f"; then
        summarize_resource_diag "$f"
      else
        echo "== $f: unrecognized format; first lines:"
        head -20 "$f"
        echo
      fi
      ;;
  esac
done
