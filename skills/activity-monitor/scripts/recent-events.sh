#!/usr/bin/env bash
# Read-only. Gathers the recorded evidence of a past episode in one pass:
# boot and load averages, swap and disk headroom, memory pressure, recent
# sleep/wake transitions, and recent diagnostic reports.
#
# Usage: bash recent-events.sh [hours]   (default 24)

set -u

hours=${1:-24}
case $hours in
  '' | *[!0-9]*)
    echo "usage: bash recent-events.sh [hours]" >&2
    exit 2
    ;;
esac

echo "Checked: $(date '+%Y-%m-%d %H:%M:%S %z')  looking back ${hours}h"
echo "Hardware: $(sysctl -n hw.model 2>/dev/null), logical CPUs $(sysctl -n hw.logicalcpu 2>/dev/null), perf levels: $(sysctl -n hw.perflevel0.logicalcpu 2>/dev/null)P/$(sysctl -n hw.perflevel1.logicalcpu 2>/dev/null)E, RAM $(($(sysctl -n hw.memsize) / 1073741824)) GB"
echo "Boot: $(sysctl -n kern.boottime 2>/dev/null | sed -E 's/.*} //')"
echo "Load averages (1/5/15 min): $(sysctl -n vm.loadavg 2>/dev/null)"
sysctl vm.swapusage 2>/dev/null
df -h /System/Volumes/Data 2>/dev/null | awk 'NR == 2 { print "Data volume: " $4 " free of " $2 " (" $5 " used)" }'
memory_pressure 2>/dev/null | grep -E 'System-wide memory free percentage' | sed 's/^/Memory: /'
echo

echo "-- Recent full wakes and user-visible sleeps (pmset log; maintenance wakes and sleeps counted, not listed):"
pmset -g log 2>/dev/null |
  awk -v cutoff="$(date -v-"${hours}"H '+%Y-%m-%d %H:%M:%S')" '
    ($1 " " $2) < cutoff { next }
    / DarkWake +\tDarkWake from/ { dark++; next }
    /\tWake from/ { print $1 " " $2 "  WAKE   " substr($0, index($0, "\tWake from") + 1, 100); next }
    /\tEntering Sleep/ {
      if ($0 ~ /Maintenance Sleep|Sleep Service/) { maint++; next }
      print $1 " " $2 "  SLEEP  " substr($0, index($0, "\tEntering Sleep") + 1, 100)
    }
    END { print "  (in window: " dark + 0 " DarkWake maintenance wakes, " maint + 0 " maintenance sleeps)" }
  ' | tail -n 13
echo

echo "-- Diagnostic reports modified in the last ${hours}h (incident time is in the file name; mtime can be later):"
for dir in /Library/Logs/DiagnosticReports "$HOME/Library/Logs/DiagnosticReports"; do
  if [ ! -r "$dir" ]; then
    echo "  $dir: not readable"
    continue
  fi
  find "$dir" -maxdepth 1 -type f -mmin "-$((hours * 60))" 2>/dev/null |
    sed "s|^$dir/||" | sort | awk -v d="$dir" '
      { n++; if (n <= 25) print "  " d "/" $0 }
      END { if (n > 25) print "  ... " n - 25 " more in " d; if (n == 0) print "  " d ": none" }
    '
done
