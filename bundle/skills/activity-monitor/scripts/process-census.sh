#!/usr/bin/env bash
# Read-only. Summarizes how many processes are running, which names repeat,
# and which ancestor processes own the most descendants.
#
# Usage: bash process-census.sh [top_n]   (default 10)
#
# Prints executable names, .app bundle names, users, and elapsed times only,
# never command arguments (they can contain tokens and private paths).

set -u

top_n=${1:-10}
case $top_n in
  '' | *[!0-9]*)
    echo "usage: bash process-census.sh [top_n]" >&2
    exit 2
    ;;
esac

echo "Checked: $(date '+%Y-%m-%d %H:%M:%S')"
top -l 1 -n 0 2>/dev/null | grep -E '^(Processes|Load Avg|PhysMem)'
echo

work=$(mktemp -d "${TMPDIR:-/tmp}/census.XXXXXX") || exit 1
trap 'rm -rf "$work"' EXIT
# ucomm is the short accounting name; comm is argv[0], usually the executable
# path. A process can rewrite argv[0], so comm is used only when it is a path.
ps -axo pid=,ucomm= 2>/dev/null >"$work/ucomm"
ps -axo pid=,ppid=,user=,etime=,comm= 2>/dev/null >"$work/procs"

awk -v N="$top_n" '
  function shortname(path, pid,   name) {
    if (substr(path, 1, 1) != "/") return uc[pid]
    name = path; sub(/.*\//, "", name)
    return name
  }
  function label(path, pid,   name, app) {
    name = shortname(path, pid)
    if (substr(path, 1, 1) != "/") return name
    app = ""
    if (match(path, /[^\/]+\.app\//)) app = substr(path, RSTART, RLENGTH - 1)
    if (app != "" && app != name ".app") return name " [" app "]"
    return name
  }
  FNR == NR { u = $0; sub(/^ *[0-9]+ +/, "", u); sub(/ +$/, "", u); uc[$1] = u; next }
  {
    line = $0
    pid = $1; ppid = $2; user = $3; et = $4
    sub(/^ *[0-9]+ +[0-9]+ +[^ ]+ +[^ ]+ +/, "", line)
    parent[pid] = ppid; owner[pid] = user; elapsed[pid] = et
    lab[pid] = label(line, pid)
    base = shortname(line, pid); bname[pid] = base
    total++; byuser[user]++; byname[base]++
    if (ppid == 1) underlaunchd[base]++
  }
  END {
    print "Total processes: " total
    printf "Top users:"
    for (k = 1; k <= 5; k++) {
      best = ""; bv = 0
      for (u in byuser) if (!(u in ushown) && byuser[u] > bv) { bv = byuser[u]; best = u }
      if (best == "") break
      ushown[best] = 1
      printf "  %s=%d", best, bv
    }
    print "\n"

    print "Most common executable names (count  name):"
    for (k = 1; k <= N; k++) {
      best = ""; bv = 0
      for (n in byname) if (!(n in shown) && byname[n] > bv) { bv = byname[n]; best = n }
      if (best == "") break
      shown[best] = 1
      printf "  %6d  %s\n", bv, best
    }
    print ""

    # Descendant counts: walk each process up its parent chain.
    for (p in parent) {
      q = parent[p]; depth = 0
      while (q > 1 && (q in parent) && depth < 200) { desc[q]++; q = parent[q]; depth++ }
    }
    print "Ancestors owning the most descendants (descendants  pid  user  elapsed  name; top child names):"
    for (k = 1; k <= N; k++) {
      best = ""; bv = 0
      for (p in desc) if (!(p in picked) && desc[p] > bv) { bv = desc[p]; best = p }
      if (best == "" || bv < 2) break
      picked[best] = 1; order[k] = best; count = k
    }
    for (p in parent) {
      q = parent[p]; depth = 0
      while (q > 1 && (q in parent) && depth < 200) {
        if (q in picked) kid[q SUBSEP bname[p]]++
        q = parent[q]; depth++
      }
    }
    for (k = 1; k <= count; k++) {
      p = order[k]
      kids = ""
      delete used
      for (j = 1; j <= 3; j++) {
        bn = ""; bc = 0
        for (key in kid) {
          split(key, kp, SUBSEP)
          if (kp[1] == p && !(kp[2] in used) && kid[key] > bc) { bc = kid[key]; bn = kp[2] }
        }
        if (bn == "") break
        used[bn] = 1
        kids = kids (kids == "" ? "" : ", ") bn "=" bc
      }
      printf "  %6d  %-7s %-12s %-12s %s; %s\n", desc[p], p, owner[p], elapsed[p], lab[p], kids
    }
    print ""

    print "Names with many copies reparented to launchd (possible orphans; count >= 10):"
    any = 0
    for (n in underlaunchd) if (underlaunchd[n] >= 10) { printf "  %6d  %s\n", underlaunchd[n], n; any = 1 }
    if (!any) print "  none"
  }
' "$work/ucomm" "$work/procs"
