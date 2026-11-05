# Bounded macOS Collection

Collect the smallest evidence that can distinguish the likely causes. Use local `man` and command help to verify flags when a macOS version differs. Native commands suffice; third-party dashboards are optional.

Start with `sw_vers`, `uname -m`, `sysctl -n hw.logicalcpu hw.memsize`, a three-sample top capture, and memory counters before and after the same window. Use absolute executable paths if command lookup is untrusted. Avoid `ps` full command arguments and system-wide open-file/path captures by default; they can expose credentials and private filenames.

```sh
sw_vers
uname -m
sysctl -n hw.logicalcpu hw.memsize
vm_stat
sysctl vm.swapusage
top -l 3 -s 5 -n 12 -stats pid,command,cpu,mem,threads,state
vm_stat
sysctl vm.swapusage
memory_pressure
df -h /System/Volumes/Data
```

Bare `memory_pressure` is observational. Its allocation and simulation options can deliberately stress the machine; keep them out of diagnosis.

Choose further collection for a concrete question:

| Question | Bounded command or next observation |
| --- | --- |
| Is device I/O active during a stall? | `iostat -w 5 -c 3`. Discard the since-boot first report for current rates. |
| Which process transfers data? | `nettop -P -L 3 -d -n -s 5 -J bytes_in,bytes_out`. Delta bytes cover five seconds, not one. |
| Is thermal pressure present? | Inspect `powermetrics --help` for supported samplers, then `sudo powermetrics --samplers thermal -i 5000 -n 2` if permitted. |
| Which processes have current energy impact? | `sudo powermetrics --samplers tasks --show-process-energy -i 5000 -n 2` if permitted. Impact is a relative proxy. |
| Why does one process have a large footprint? | `footprint -p "$pid"` or `vmmap -summary "$pid"` for a verified numeric PID. Ownership/protections may limit access. |
| What is a hot or stuck process doing? | `sample "$pid" 5 -file "$report_path"` for a verified PID and private report destination. Sampling briefly suspends threads and perturbs execution. |
| Which files does a process touch? | `sudo fs_usage -w -f filesys -t 10 "$pid"` only after selecting the target. Redact private paths. |

Root requests are conditional, not required for a basic brief. Respect the tool's approval mechanism. If the agent sandbox blocks process inspection, request its supported read-only escalation or ask for a supplied capture. Do not infer a macOS failure from an agent sandbox failure. Stop blocked attempts rather than repeatedly trying the same collection or asking for blanket sudo. Never recommend disabling SIP for this workflow.

Keep captures bounded and local. Do not write a persistent daemon, upload diagnostic archives, run stress loads, or inspect unrelated browser history. Reuse the active capture for follow-up rather than resampling the whole machine needlessly.
