# Interpret Resource Evidence

## Establish Time and Units

Correlate the capture with the symptom and compare intervals. macOS top's first process CPU sample is invalid because it needs a difference between samples. A process at 100% uses about one core; total user/system/idle describes the whole machine. Read the known core count before comparing those quantities. On Apple Silicon, equal percentages do not imply equal throughput across efficiency/performance cores or different frequencies.

`vm_stat` one-shot counters include cumulative events since boot. Subtract endpoint values and use the header's page size. Never assume 4 KiB pages on Apple Silicon. Distinguish pages stored in the compressor from original pages represented there. iostat's first report is since-boot activity; later reports describe their intervals. nettop delta bytes must be divided by the actual interval to produce bytes/second. A large counter alone does not show a recent surge.

## Choose the Supported Conclusion

| Evidence | Useful interpretation and follow-up |
| --- | --- |
| Little CPU idle across valid intervals, a process dominates, symptom overlaps | CPU contention is plausible. Identify whether the work is intentional; reduce its parallelism or pause it through the app's controls if the user wants relief. High CPU alone does not imply a runaway process. |
| One process near one core, whole machine mostly idle | A single-thread limit is possible for that workload; system-wide CPU exhaustion is not established. Look at the sluggish app's sample before blaming it for unrelated apps. |
| Low free pages or lots of used RAM, stable swap/compression, symptom absent | Cache and retained swap can be normal. Check current pressure and changes before calling memory scarce. |
| Compression/decompression and swap-in/out increase rapidly during a freeze | Memory churn is a likely contributor. Find large footprints and reduce unneeded work after saving. Growth over time can suggest a leak; a large snapshot does not prove one. |
| High device throughput or filesystem operations | Activity is visible, not necessarily saturation. Seek stalled work, latency/error evidence, repeated alignment, or a controlled pause. Cached file operations need not equal physical disk I/O. |
| Little available data-volume capacity | Storage capacity is a separate risk from throughput. Explain implications for saves, swap, or updates without claiming the device is failing. Protect work before recommending user-selected cleanup. |
| High per-process network traffic | Attribute the transfer, then check whether it coincides with the symptom. Without capacity/latency/loss evidence, saturation is unproven. A controlled pause can isolate competition. |
| Serious thermal pressure and high kernel_task on a hot Mac | Thermal protection may be limiting throughput. kernel_task can be a response to heat. Reduce load and improve ventilation, then check recovery; do not terminate it. Hardware-specific causes need their own evidence. |
| mdworker, mds, backup, sync, or browser helpers busy | Identify what their work plausibly is, then verify the relevant app/job. Process names alone prove neither maliciousness nor the cause. Indexing can continue after a progress UI disappears. |
| Commands denied, unsupported sensors, stale or incomplete capture | Mark the affected resource unknown. Ask for the smallest permitted observation that can change the conclusion. A missing metric is not a zero or a healthy result. |

Prefer a controlled comparison to an explanation by association. Pause one known background workload through its own controls, reproduce the symptom, and compare. The user decides whether to change that workload; the skill's default is inspection.

## Source Basis

- [Apple CPU activity](https://support.apple.com/guide/activity-monitor/view-cpu-activity-actmntr43452/mac) and installed `man top` establish CPU scope and sample semantics.
- [Apple memory usage](https://support.apple.com/en-mide/guide/activity-monitor/actmntr1004/mac) and installed `man vm_stat` distinguish pressure, caching, compression, swap, counters, and page units.
- [Apple energy consumption](https://support.apple.com/en-euro/guide/activity-monitor/actmntr43697/mac) and installed `man powermetrics` define relative impact and hardware-dependent telemetry.
- [Brendan Gregg's USE method](https://www.brendangregg.com/usemethod.html) separates utilization, saturation, and errors; high utilization alone is not proof of queued work.
- [Apple kernel_task explanation](https://support.apple.com/en-us/102172) describes its thermal-management role.

Sources inform diagnostic method. They do not establish that an agent is an expert, that every platform exposes the same counters, or that a simulated capture describes the user's computer.
