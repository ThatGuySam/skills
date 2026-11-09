# Interpret Resource Evidence

## Establish Time and Units

Correlate the capture with the symptom and compare intervals. macOS top's first process CPU sample is invalid because it needs a difference between samples. A process at 100% uses about one core; total user/system/idle describes the whole machine. Read the known core count before comparing those quantities. On Apple Silicon, equal percentages do not imply equal throughput across efficiency/performance cores or different frequencies.

`vm_stat` one-shot counters include cumulative events since boot. Subtract endpoint values and use the header's page size. Never assume 4 KiB pages on Apple Silicon. Distinguish pages stored in the compressor from original pages represented there. iostat's first report is since-boot activity; later reports describe their intervals. nettop delta bytes must be divided by the actual interval to produce bytes/second. A large counter alone does not show a recent surge.

Read the command mode before subtracting. In periodic `vm_stat interval` output, the first event row is totals and later event rows are already interval changes; equal nonzero swap rows still show ongoing I/O. A stable swap allocation also permits active swap traffic. The current macOS man page distinguishes `Pageouts`, file-backed writes to a pager, from `Swapouts`; pageouts alone do not prove anonymous-memory swapping. Check the installed version's definitions. In fs_usage, `W` includes time scheduled out or waiting and does not isolate physical disk service time.

## Choose the Supported Conclusion

| Evidence | Useful interpretation and follow-up |
| --- | --- |
| Little CPU idle across valid intervals, a process dominates, symptom overlaps | CPU contention is plausible. Identify whether the work is intentional; reduce its parallelism or pause it through the app's controls if the user wants relief. High CPU alone does not imply a runaway process. |
| One process near one core, whole machine mostly idle | A single-thread limit is possible for that workload; system-wide CPU exhaustion is not established. Look at the sluggish app's sample before blaming it for unrelated apps. |
| Low free pages or lots of used RAM, stable swap/compression, symptom absent | Cache and retained swap can be normal. Check current pressure and changes before calling memory scarce. |
| Compression/decompression and swap-in/out increase rapidly during a freeze | Memory churn is a likely contributor. Find large footprints and reduce unneeded work after saving. Growth over time can suggest a leak; a large snapshot does not prove one. |
| High device throughput or filesystem operations | Activity is visible, not necessarily saturation. Seek stalled work, latency/error evidence, repeated alignment, or a controlled pause. Cached file operations need not equal physical disk I/O. |
| Swap used close to swap total while the data volume has little free space | Severe freeze risk. macOS cannot grow swap further, so apps stall on page-ins and Jetsam kills processes (`low-swap` kills in Jetsam reports). Find what holds memory: process count, largest footprints. Relief comes from ending the leak or freeing disk, after the user saves work. |
| Swap total shrinks between captures | Expected recovery. macOS resizes its swap files as pressure eases, so totals change size. Judge pressure from used versus total within one capture and from swapin/swapout deltas. |
| 15-minute load average far above the core count while the 1-minute value is near normal | A recent stall that is easing. Load counts runnable and uninterruptible threads, so memory and I/O stalls raise it too, not only CPU. Correlate with wake times, report timestamps, and unresponsive-app marks. |
| Symptom starts at a wake (pmset `Wake from` time) | Work deferred during sleep resumes at once, and a memory-starved Mac must page everything back in. Line up the wake time with first unresponsive marks, load averages, and process ages. |
| Process count far above this Mac's usual level, or growing between captures | A spawner is leaking processes. Attribute it with the census to the deepest owning ancestor and its app, and estimate the rate from its elapsed time. Thousands of small processes can exhaust memory with no single large process. |
| Many apps marked unresponsive at once, recovering together | A system-wide stall (memory, disk, WindowServer), not separate app bugs. Find the shared cause. An app that keeps getting new marks on a re-check after the others stopped is hung on its own work; sample it. |
| Jetsam report with many `low-swap` kills | Memory ran out at that time. `largestProcess` names the biggest single consumer then; a process-count leak spreads across many small processes and may not be it. |
| A system daemon hot, mostly kernel (red) time, at background QoS | Often a reaction to another condition the daemon monitors. Read its report or sample for the mechanism, infer the trigger from the hot path ([hot-process](hot-process.md) step 5), check the trigger's current state, and give the conditional restart advice below. A restart while the trigger persists goes hot again. |
| Little available data-volume capacity | Storage capacity is a separate risk from throughput. Explain implications for saves, swap, or updates without claiming the device is failing. Protect work before recommending user-selected cleanup. |
| High per-process network traffic | Attribute the transfer, then check whether it coincides with the symptom. Without capacity/latency/loss evidence, saturation is unproven. A controlled pause can isolate competition. |
| Serious thermal pressure and high kernel_task on a hot Mac | Thermal protection may be limiting throughput. kernel_task can be a response to heat. Reduce load and improve ventilation, then check recovery; do not terminate it. Hardware-specific causes need their own evidence. |
| mdworker, mds, backup, sync, or browser helpers busy | Identify what their work plausibly is, then verify the relevant app/job. Process names alone prove neither maliciousness nor the cause. Indexing can continue after a progress UI disappears. |
| Commands denied, unsupported sensors, stale or incomplete capture | Mark the affected resource unknown. Ask for the smallest permitted observation that can change the conclusion. A missing metric is not a zero or a healthy result. |

Prefer a controlled comparison to an explanation by association. Pause one known background workload through its own controls, reproduce the symptom, and compare. The user decides whether to change that workload; the skill's default is inspection.

## Restart and Recheck

Restart advice depends on the trigger's state, not on whether CPU stays high. Give it in the first answer once that state has been read; a wait or a later sample does not replace it.

1. Check the trigger's state now: memory pressure level and swap used for a memory trigger, disk headroom for a full disk, the leaking spawner still running for a process leak.
2. Give the advice as a condition, leading with the branch that matches now:
   - Trigger still active: a restart will not stick; the new instance goes hot again. Fix the trigger first (save work and quit what holds memory, end the leak, free disk), then restart.
   - Trigger cleared: a restart should stick. The user runs `sudo killall <full name>`; launchd relaunches a daemon whose parent is `1`, by itself or on next demand. kernel_task, WindowServer (ending it logs the user out), loginwindow, and launchd are excluded.
3. If an earlier restart went hot again, compare that instance's start time with when the trigger was active. A start inside that period explains why it did not stick.
4. Re-snapshot immediately before handing over any command, using the full name from `ps -p <PID> -o comm=` (top truncates names).
5. After a restart, re-check after longer than the previous instance took to go hot (its start time to when it was seen hot). Give the user a one-line re-check, for example `top -l 6 -s 10 -stats pid,command,cpu,time -pid "$(pgrep -x <full name>)"`.

## Sources

The sources behind these interpretations, and how to look up a process, symbol, message, or code this table does not cover, are in [lookups](lookups.md).
