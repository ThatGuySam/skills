# Not Responding, Freezes, and Process Explosions

Helper scripts are in this skill's `scripts/` folder. Run them with `bash`, and give each a tool timeout of at least three minutes.

## Which apps are not responding

macOS exposes no CLI flag or process state for "not responding". `lsappinfo`, System Events, `ps` STAT letters, and top's `stuck` state do not report app hangs. WindowServer does: while an app stops draining its event queue, WindowServer repeatedly logs `connectionIsUnresponsive: 1` for that app's connection ID (cid). Each cid maps to a PID through WindowServer's own `conn 0x<cid>, PID <n>` lines.

```sh
bash scripts/unresponsive-apps.sh [window_minutes] [lookup_hours] [recheck_seconds]   # defaults 40 48 60
```

Choose a window that covers the symptom, for example from the last wake time in `recent-events.sh` to now. The script lists every marked cid with its mark count, span (first to last mark), new marks during a re-check, status, and app name, still-hung first. It typically takes two minutes because the cid and name lookups read days of log; run it once with a window wide enough, rather than repeatedly.

How recently an app was last marked does not tell you whether it is still hung. Apps that stalled together during a system-wide stall leave a short burst of marks and recover, while a hung app that receives no input can go quiet for minutes. The script therefore re-checks: it counts each cid's marks logged after its first scan, over at least `recheck_seconds`.

| Status | Meaning and follow-up |
| --- | --- |
| `STILL HUNG` | New marks arrived during the re-check. The app is hung now. Its mark count and span usually stand far above the other cids'. Sample it (below). |
| `RECOVERED (likely)` | A short burst (marks within about a minute) and nothing during the re-check. When many cids show bursts in the same few seconds (the summary line gives the range), that was one shared stall, and those apps recovered. Report them as recovered, not as frozen. |
| `QUIET` | A sustained run of marks, but none during the re-check. Either it recovered, or it is still hung and no input is reaching it. Compare its count and span with the others, then confirm: ask the user to click the app and rerun with a short window (`bash scripts/unresponsive-apps.sh 3`), check Force Quit, or sample it. |
| `CONN CLOSED …; process still running` | That window or connection closed; the app survived. |
| `CONN CLOSED …; process gone` / `EXITED` | The app quit, crashed, or was force-quit. The name comes from its own log lines. |
| `UNMAPPED` (after the status) | The connection opened before the lookup window, so the app is unnamed. Rerun with a larger `lookup_hours` when it matters; each extra day costs about 10–15 seconds. |

Call an app still hung only on `STILL HUNG` evidence or the user's confirmation. Otherwise say "recovered" for a burst or "quiet, not confirmed hung" for `QUIET`, and give the on-screen check: Force Quit Applications (⌥⌘⎋) lists a hung app as "(not responding)". One app can own several cids; merge them by app in the answer. Many apps marked at once and recovering together point to a system-wide stall (memory, disk, WindowServer); one app marked while others stay clean points to that app. A cid marked sparsely but steadily for hours, owned by a background process or script rather than an app the user sees, is a client that rarely reads its events; mention it only if it is user-visible.

To see what a hung app is doing, sample it. A user-owned app needs no sudo:

```sh
sample "$(pgrep -x '<App Name>' | head -1)" 3 -file /tmp/<app>-sample.txt
bash scripts/diag-summary.sh /tmp/<app>-sample.txt
```

A main thread waiting in `mach_msg` under `CFRunLoopRun` is idle. A main thread in synchronous XPC, a lock or semaphore wait, file I/O, or a busy loop is hung on that work.

Manual recipe when the script cannot run (use `bash`; in zsh, `log` is a builtin, so call `command log`):

```sh
log show --last 40m --style compact --predicate 'process == "WindowServer" AND eventMessage CONTAINS "connectionIsUnresponsive: 1"' | grep -oE 'cid 0x[0-9a-f]+' | sort | uniq -c
log show --last 48h --style compact --predicate 'process == "WindowServer" AND eventMessage CONTAINS "conn 0x<cid>,"' | grep -oE '(New|Closing) conn 0x[0-9a-f]+, PID [0-9]+'
ps -p <PID> -o pid=,etime=,ucomm=
```

- Match `connectionIsUnresponsive: 1` exactly; `: 0` lines are healthy connections.
- Extract with `grep -oE`. Fixed awk field numbers break on the compact style.
- Bound the lookup window; it is the slow step.
- A live PID counts only if its process started before the cid's first mark (`etime`); otherwise the PID was reused.
- Judge "still hung" by re-running the first command over the minute or two after your first run (`--start "<time of first run>"`), not by how recent the last mark was.

## Freeze after wake, or a past stall

A freeze that has passed still leaves evidence. Collect it before suggesting the user wait for a recurrence:

```sh
bash scripts/recent-events.sh [hours]   # default 24
```

It reports boot time, 1/5/15-minute load averages, swap, data-volume headroom, memory pressure, full wakes and user sleeps from the pmset log, and diagnostic reports from the window. Then:

- Summarize any `JetsamEvent-*.ips` in the window with `bash scripts/diag-summary.sh <file>`: kill counts by reason and the largest process at that moment.
- Summarize any `.diag` report near the symptom time the same way.
- Compare process ages with the wake time: `ps -axo pid=,etime=,ucomm=`. Apps that started after the wake were relaunched, crashed, or were force-quit.
- Run the unresponsive-apps script with a window starting before the wake.

## Too many processes

top's header line `Processes: N total, … M threads` is evidence; read it in every capture. A count far above this Mac's usual level, or one that grows between captures, means something is spawning processes and not reaping them. Each process holds memory and kernel resources; thousands can exhaust RAM and swap even when no single process looks large.

```sh
bash scripts/process-census.sh [top_n]   # default 10
```

It prints the total, top users, the most common executable names, the ancestors owning the most descendants with their top child names and elapsed time, and names reparented to launchd in bulk (possible orphans). Name the culprit as the deepest ancestor that still owns most of the excess, together with the app or session that hosts it, since a bundled helper tool and its host app need different fixes. Divide its descendant count by its elapsed time to estimate the leak rate.

Manual equivalent:

```sh
ps -axo ucomm= | sort | uniq -c | sort -rn | head -15
ps -axo pid=,ppid=,etime=,ucomm=        # walk ppid chains for the most repeated name
```

Keep system-wide `ps` output to names and IDs. `args` and `command` columns can carry tokens and private paths.

When coding-agent helpers dominate (`node`, `node_repl`, `uv`, `python`, `npm`, `bun`, or MCP servers under a coding-agent CLI or desktop app) and `command -v agent-procs` finds the tool, run `agent-procs check`. It is read-only and reports agent sessions, helper counts, and orphans. `agent-procs clean` only previews; stopping helpers takes the user's explicit request and `--apply --yes`.
