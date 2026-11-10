# Attribute a Busy Process or Core Group

Helper scripts are in this skill's `scripts/` folder. Run them with `bash`.

## Name, owner, mechanism, trigger

Work down this ladder for every process using about a core or more, and for any system daemon whose activity is unexplained.

1. **Name and owner.** From a valid top interval, take the PID, then `ps -o pid=,ppid=,user=,etime=,ucomm= -p <PID>`. `etime` gives the start time of this instance; a parent of `1` means launchd manages it. top's COMMAND column and `ucomm` cut names to 16 characters. Before using a name anywhere (a report search, `pgrep -x`, `killall`), get the full one with `ps -p <PID> -o comm=`; the last part of that path is the name. A truncated name matches nothing.
2. **Threads.** `ps -M -o pri -p <PID>` lists each thread's `%CPU`, priority, system time (`STIME`, kernel) and user time (`UTIME`). It works on root processes without sudo, and the `-o` truncates the command column. Priority `4` marks background-QoS threads, which run on efficiency cores. Times are cumulative per thread; take two snapshots a few seconds apart to see current rates.
3. **Stack.**
   - User-owned process: `sample <PID> 5 -file /tmp/<name>-sample.txt`. No sudo needed. Sampling briefly suspends threads.
   - Root-owned process: look first for a recorded resource report (`.cpu_resource.diag`, wakeups, disk writes). List the folder newest first and match the name loosely: `ls -t /Library/Logs/DiagnosticReports/ | grep -i '<start of the name>' | head`. Report file names use the full process name, so one exact glob that matches nothing does not show that no report exists. These files are usually readable without sudo by admin users. Summarize one with `bash scripts/diag-summary.sh <file>`. A report gives the event (CPU used over a duration), the heaviest stack, the primary state (user or kernel mode, effective thread QoS, e-core or p-core), and the other processes active in the same window. Its PID and time may belong to an earlier instance; compare them with the current PID's start time.
   - No usable report, or it predates the episode: hand the user the escalation command below. `sample` without sudo cannot read a root process; skip that attempt.
4. **Read the stack.** `bash scripts/diag-summary.sh <sample-or-report>` drops dispatch and pthread scaffolding. Find the deepest app-specific frames under the top of stack. A system call at the top (a `libsystem_kernel` frame such as `mach_msg`, `kevent`, `ioctl`, `read`, or a `*_control` call) means the time is kernel time. A tight loop around one query, or calls that keep returning errors, suggests the process is stuck retrying. Look up a frame, library, or daemon you cannot explain with [lookups](lookups.md) before naming its purpose.
5. **Trigger.** Infer it from what the hot path is doing. Memory-statistics or memory-pressure work (`memorystatus_*` calls, footprint or priority reads) points to memory pressure. Socket or network-framework calls point to the network. FSEvents or file-metadata work points to file churn, power or battery calls to power state, and process enumeration to the process count. Work that iterates over every process, such as per-process memory or priority reads, scales with the process count, so a recent process explosion is a candidate trigger alongside memory pressure. Check both, and say which evidence supports each: the pressure level and swap for memory; top's `Processes:` line against this Mac's usual level, and the census's owner and elapsed times, for the count. Name the condition the evidence supports as the trigger. When a process explosion also filled memory, name both conditions and how one led to the other.
6. **Check the trigger now, and compare times.** Read the trigger's current state. For memory: `memory_pressure | tail -1`, `sysctl kern.memorystatus_vm_pressure_level` (1 normal, 2 warning, 4 critical), and `sysctl vm.swapusage`. For process count, top's `Processes:` line; for disk, `df -h /System/Volumes/Data`. Compare the instance's start time (`etime`) with when the trigger was active (swap peak, Jetsam reports, wake). An instance that started while the trigger was active explains why an earlier restart did not stick.
7. **Advise in the same answer.** Give the conditional restart advice from [restart and recheck](diagnosis.md#restart-and-recheck) now. When the trigger's state can be read now, do not replace that advice with a wait or a later sample. A sample can add detail alongside it.

### Escalation for root processes

Give the user one exact command that writes a file you can read, then summarize the file:

```sh
sudo sample <PID> 5 -file /tmp/<name>-sample.txt
```

In Claude Code the user can run it by typing `! sudo sample …` in the prompt; otherwise in Terminal. Look up the PID with the full name immediately before handing it over (`pgrep -x <full name>`, step 1), and check that it returns one PID. Ask for one command at a time. Never ask for the password or for blanket sudo. For cluster-level CPU evidence, the equivalent escalation is `sudo powermetrics --samplers cpu_power -i 5000 -n 2`.

## Efficiency vs performance cores and CPU History screenshots

- **Core counts:** `sysctl -n hw.perflevel0.logicalcpu` (performance) and `sysctl -n hw.perflevel1.logicalcpu` (efficiency). Use the group labels in the screenshot. If the screenshot does not label the groups, state your core-order assumption.
- **Colors in CPU History:** red is system (kernel) time, green is user time. A red-heavy group points to processes spending their time in system calls. Find them through high `STIME` threads in `ps -M`, or kernel-mode samples in a report or sample.
- **Scheduling:** macOS keeps background and maintenance QoS threads on the efficiency cores. Higher-QoS work prefers performance cores and spills onto efficiency cores when the performance cores are busy.
- **Connecting the graph to processes:** top has no per-core view. Link a busy efficiency group to processes with QoS evidence: priority-4 threads in `ps -M`, `Effective Thread QoS Background … e-core` in a report, or per-cluster residency from powermetrics. Add up the candidates' CPU: a combined N% fills about N/100 cores. Compare that with the efficiency-core count and the graph's fill to judge whether the candidates explain it. If they do not, say what is left unexplained.
- Without QoS evidence, "background work is on the efficiency cores" is a guess. Label it as one.
