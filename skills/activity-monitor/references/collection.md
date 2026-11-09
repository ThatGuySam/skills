# Bounded macOS Collection

Collect the smallest evidence that can distinguish the likely causes. Use local `man` and command help to verify flags when a macOS version differs; [lookups](lookups.md) covers looking up anything else the evidence names. Native commands suffice; third-party dashboards are optional.

Start with `sw_vers`, `uname -m`, core and memory sizes, a three-sample top capture, and memory counters before and after the same window. Use absolute executable paths if command lookup is untrusted. Avoid `ps` full command arguments and system-wide open-file/path captures by default; they can expose credentials and private filenames.

```sh
sw_vers
uname -m
sysctl -n hw.logicalcpu hw.perflevel0.logicalcpu hw.perflevel1.logicalcpu hw.memsize
sysctl -n vm.loadavg
vm_stat
sysctl vm.swapusage
top -l 3 -s 5 -n 12 -o cpu -stats pid,command,cpu,mem,threads,state
vm_stat
sysctl vm.swapusage
memory_pressure
df -h /System/Volumes/Data
```

Read top's header in every capture, not only the process rows: `Processes: … total, … threads`, `Load Avg`, `PhysMem`, and the `VM` swapins/swapouts. Compare the process count, load averages, swap used against swap total, and data-volume free space with what is normal for this Mac; each one can be the clue the process list hides.

When the symptom happened earlier (after a wake, "this morning", "it froze"), also collect the recorded evidence of that episode:

```sh
bash scripts/recent-events.sh [hours]   # load averages, swap, disk, wakes/sleeps, recent diagnostic reports
```

Helper scripts live in this skill's `scripts/` folder; run them with `bash`. They are read-only and print names, not command arguments. In zsh, `log` is a builtin that shadows `/usr/bin/log`; run unified-log queries from the scripts, under `bash`, or as `command log`.

Bare `memory_pressure` is observational. Its allocation and simulation options can deliberately stress the machine; keep them out of diagnosis.

Choose further collection for a concrete question:

| Question | Bounded command or next observation |
| --- | --- |
| Which process holds the most memory? | `top -l 2 -s 5 -n 12 -o mem -stats pid,command,cpu,mem,threads,state`. A CPU-sorted short list is not a memory ranking. |
| Is device I/O active during a stall? | `iostat -w 5 -c 3`. Discard the since-boot first report for current rates. |
| Which process transfers data? | `nettop -P -L 3 -d -n -s 5 -J bytes_in,bytes_out`. Delta bytes cover five seconds, not one. |
| Is thermal pressure present? | Inspect `powermetrics --help` for supported samplers, then `sudo powermetrics --samplers thermal -i 5000 -n 2` if permitted. |
| Which processes have current energy impact? | `sudo powermetrics --samplers tasks --show-process-energy -i 5000 -n 2` if permitted. Impact is a relative proxy. |
| Why does one process have a large footprint? | `footprint -p "$pid"` or `vmmap -summary "$pid"` for a verified numeric PID. Ownership/protections may limit access. |
| What is a hot or stuck process doing? | User-owned: `sample "$pid" 5 -file "$report_path"` for a verified PID. Root-owned: recorded `.diag` reports first, then the user-run `sudo sample` escalation in [hot-process](hot-process.md). Summarize either with `bash scripts/diag-summary.sh`. Sampling briefly suspends threads. |
| Which threads are busy, at what QoS, in kernel or user time? | `ps -M -o pri -p "$pid"`. Works on root processes without sudo; see [hot-process](hot-process.md). |
| Which apps are or were not responding? | `bash scripts/unresponsive-apps.sh`; see [not-responding](not-responding.md). |
| Why are there so many processes? | `bash scripts/process-census.sh`; see [not-responding](not-responding.md). |
| What did the system record about an earlier episode? | `bash scripts/recent-events.sh`, then `bash scripts/diag-summary.sh` on Jetsam and resource reports from that window. |
| Which files does a process touch? | `sudo fs_usage -w -f filesys -t 10 "$pid"` only after selecting the target. Redact private paths. |

Root requests are conditional, not required for a basic brief. Respect the tool's approval mechanism. When a root-only read is the next step that can change the conclusion, hand the user one exact command that writes a readable file, as in [hot-process](hot-process.md#escalation-for-root-processes). If the agent sandbox blocks process inspection, request its supported read-only escalation or ask for a supplied capture. Do not infer a macOS failure from an agent sandbox failure. Stop blocked attempts rather than repeatedly trying the same collection or asking for blanket sudo. Never recommend disabling SIP for this workflow.

Keep captures bounded and local. Do not write a persistent daemon, upload diagnostic archives, run stress loads, or inspect unrelated browser history. Reuse the active capture for follow-up rather than resampling the whole machine needlessly.

Processes exit, restart, and get relaunched between captures. Before any recommendation that names a process, re-snapshot it, and build user commands from names (`pgrep -x <name>`, `pgrep -P <ppid>`) rather than PIDs from earlier captures. top truncates COMMAND to 16 characters; take the full name from `ps -p <PID> -o comm=` first, because a truncated name matches nothing in `pgrep -x`, `killall`, or a report file name. If the culprit disappeared mid-investigation, say so and show the before and after numbers.

Record each command's start and end time. Serial top, disk, and network captures are different windows. Call them overlapping evidence only when their intervals actually overlap; otherwise reproduce the symptom in the targeted follow-up. A ten-second capture can miss a brief burst.
