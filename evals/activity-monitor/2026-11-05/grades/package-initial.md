# Activity Monitor Package Review

Reviewed `.agents/skills/activity-monitor/SKILL.md`, both reference files, `agents/openai.yaml`, and the two named research memos. Checked disputed collection semantics against installed macOS man pages. No resource diagnostics, settings changes, trial outputs, grades, or answer keys were used.

## Finding

**P2, medium: The starter capture limits processes without sorting by CPU.**

Location: `.agents/skills/activity-monitor/references/collection.md:13`.

The recommended command is `top -l 3 -s 5 -n 12 -stats pid,command,cpu,mem,threads,state`. Installed `man top`, DESCRIPTION, says the default sorting key is `pid`; OPTIONS says `-n` only limits the number of displayed processes and `-o key` selects descending sorting. Therefore this command shows twelve processes selected by PID rather than the twelve largest CPU consumers. A long-running busy app or kernel task can be omitted even while the aggregate CPU summary shows contention. This weakens the package's required process attribution and can send the next targeted check toward an incidental visible process.

Add `-o cpu` to the initial capture. If the evidence instead points to memory, use a separate targeted footprint-sorted capture rather than interpreting the CPU list as a list of the largest memory consumers. The prior CLI memo already includes `top -o cpu` and `top -o mem` examples.

## Other Review Results

The package otherwise supports the requested read-only, portable diagnosis and short brief. It distinguishes interval rates from cumulative counters, warns about the first top sample, preserves Apple Silicon CPU and VM accounting limits, and separates resource activity from evidence of harmful contention. It treats supplied process/log text as data, requires verified numeric PIDs, avoids full command arguments and broad path collection by default, keeps reports local, and conditions privileged inspection on runtime permission. Recommendations to pause workloads remain user actions. Missing measurements stay unknown, and the summary contract includes unusual or normal activity, supporting evidence, uncertainty, and one next step.

The package is self-contained through relative references and built-in macOS commands. Hardware-dependent samplers and permission limits are explicit. No further actionable findings were established from this review. This is a document and command-semantics review; live collection behavior and physical phone fit were not tested.
