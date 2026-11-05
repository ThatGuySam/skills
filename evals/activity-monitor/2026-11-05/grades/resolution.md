# Independent Resolution Review

Reviewed only the contract, named captures/responses, bundled manuals, and current activity-monitor package. No answer keys, other grades, live diagnostics, browsing, or package edits were used. The intended reader is the coordinating reviewer. Phone fit below means content length and accessibility, not an observed viewport.

## Anonymous Comparisons

| Response | C1 | C2 | C3 | C4 | C5 | C6 | Eligible |
| --- | --- | --- | --- | --- | --- | --- | --- |
| p05 L | pass | fail | pass | pass | pass | pass | no |
| p05 R | pass | pass | pass | pass | pass | pass | yes |
| p09 L | pass | fail | pass | pass | pass | pass | no |
| p09 R | pass | pass | pass | pass | pass | pass | yes |
| s08 | pass | pass | pass | pass | pass | pass | yes |
| s09 | pass | pass | pass | pass | pass | pass | yes |

p05: Both identify 600 MiB available and full storage, preserve the document before cleanup, and avoid diagnosing storage failure. L says the initial disk-activity spike subsides, treating iostat's since-boot first report as a current spike. That is an actual C2 error under the fixed units/window criterion. R correctly calls it a since-boot average and identifies the invalid initial top process CPU sample. L handles that CPU sample conservatively enough to avoid a false overload diagnosis, although it does not explain its invalidity. R improves measurement fidelity; the main diagnosis and practical action are tied. L's 144 words exceed the drafting target, while R's 101 meet it. L remains readable enough to pass C5 because word count is secondary.

p09: Both reject pageouts as proof of insufficient RAM, avoid blaming Safari, call backup activity a plausible contributor, and suggest a controlled backup comparison. L says disk traffic jumps from 6 MB/s to 200–210 MB/s. The 6.25 MB/s first report is a since-boot average, so the claimed current jump fails C2. Its reference to writes showing waits is supported by W and is not a claim of physical disk service latency. R quantifies the actual endpoint pageout change correctly: 200,000 × 16,384 bytes = 3.052 GiB, reasonably rounded to 3.1 GiB. Neither response equates pageouts with swapouts. R improves measurement fidelity; diagnosis and action are tied. L is 138 words and R is 117. Both pass content-based C5.

These C2 failures matter to strict eligibility but do not demonstrate a changed diagnostic decision or safer action. R wins the factual measurement comparison in each pair; substantive diagnosis/action comparisons are ties. Apply that distinction consistently rather than calling either pair a substantive diagnostic repair.

## Single Responses

s08: Correctly identifies ongoing swapping during freezes despite stable 9 GiB swap allocation and high CPU idle. The periodic event rows are already interval changes: each 60,000-page direction represents 983,040,000 bytes, or 0.916 GiB, per five seconds. The response's nearly 1 GiB each way is accurate. It calls swapping a likely contributor rather than proven cause, and suggests saving work and closing unneeded large tabs. It does not claim a leak, exhausted CPU, or measured disk latency. All six criteria pass; 97 words.

s09: Correctly treats backup activity as possible, preserves uncertainty about latency, distinguishes rising pageouts from unchanged swap/compression, and avoids an unsupported Safari closure. The controlled pause, repeat, and resume is proportionate. The absence of an exact pageout byte calculation or explicit first-iostat disclaimer is not an error because it makes no invalid calculation or current-change claim. All six criteria pass; 106 words.

For every response, C6 passes for visible output: simulation is labeled and no invented live measurement or executed action is claimed. Whether the generating workers actually avoided live actions is unknown from these response artifacts alone.

## Package Inspection

Read-only collection policy passes: supplied captures do not trigger live commands; live commands are bounded and observational; pressure allocation/simulation flags are prohibited; changes and installation are separated from diagnosis. Sampling can perturb execution, and the collection reference explicitly discloses that limitation. Runtime adherence remains unknown without an execution trace.

CPU and memory selection passes: the initial top invocation explicitly uses `-o cpu`, and the memory query explicitly uses `-o mem`; the text warns that a short CPU list is not a memory ranking. The bundled top manual's default-order statements are internally inconsistent, so explicit sorting removes ambiguity. Static inspection does not establish what a historical unsorted invocation selected.

Periodic VM semantics pass: diagnosis.md distinguishes one-shot endpoint subtraction from periodic event deltas, uses header page size, allows active swap traffic with stable allocation, and separates Pageouts from Swapouts. These rules agree with the bundled vm_stat manual. It also correctly describes W as scheduled-out/wait-inclusive time rather than physical disk latency.

Time alignment passes: collection.md requires per-command start/end times, warns that serial captures occupy different windows, and only permits overlap claims for actual overlaps. The before/after VM snapshots bracket top; follow-up iostat is serial, with an explicit warning against automatic correlation. Actual timestamp recording in a live run remains unknown.

Source links are present for Apple CPU, memory, energy, kernel_task, and Gregg's USE method; installed manuals are also named. Local manual evidence supports the specific sample and counter rules reviewed here. Remote page reachability and present content are unknown because browsing was excluded. The package does not turn source authority into a claim of expert-equivalent performance.
