# Lighter, Faster Secret Scanning Than Gitleaks

Research memo, 2026-11-05. Prompted by a Gitleaks run that held 8–9 of 12 cores for over two minutes during a local pre-push check. The question: is there a more CPU-efficient scanner (Rust or otherwise), and what actually reduces the cost?

## Scope

- Local developer use on macOS (Apple Silicon): pre-commit, pre-push, and ad hoc directory scans.
- Practitioner evidence, primary repos, and one local measurement. No fresh head-to-head benchmark of the alternatives was run.

## Short Answer

The expensive run was mostly a **scope** problem, not a tool problem. Fix scope first, then cap parallelism, then consider a faster engine or tool.

1. Scan only what you are about to commit or push, not the working tree.
2. Run the scanner at background priority or with fewer threads so it cannot take the whole machine.
3. If you still want a faster tool: **Kingfisher** (Rust, Vectorscan) has the strongest published speed numbers; **Betterleaks** (Go, by the Gitleaks author) is the closest drop-in. **ripsecrets** (Rust) is the lightest but misses too much to be the only check.

## Local Evidence

Measured on this Mac (12 cores: 8 performance, 4 efficiency) with Homebrew Gitleaks 8.30.1.

- The heavy run was `gitleaks detect --no-git --source . --max-target-megabytes 5` from a project root. That working tree is about 91 GB on disk, while its ~19,500 tracked files total about 660 MB. Top showed Gitleaks at 772% and 932% CPU in two 5-second samples, with the machine under 1% idle, about 2 minutes into the run.
- The follow-up scan, limited to the 121 files actually headed for the push, finished in 0.44 s (862 KB of text scanned; images skipped).
- With `--log-level debug`, Homebrew's Gitleaks prints `using stdlib regex engine`. That is the slower engine (see below).

Inference: most of the cost came from scanning untracked build outputs, dependencies, and artifacts. Which directories dominated was not profiled. A third-party report says the default config skips `node_modules`, but that was not checked here.

## What the Evidence Says

### Gitleaks itself

- The maintainer says release binaries from GitHub are built with RE2 (`gore2regex` build tag), while a source build uses Go's stdlib `regexp`, "which is much slower." The reporter measured 7.58 s vs 17.5 s on 41.5 MB. ([gitleaks#2044](https://github.com/gitleaks/gitleaks/issues/2044), Feb 2026.) The Homebrew build here reports the stdlib engine.
- Since 8.2x, `--max-decode-depth` defaults to 5 (recursive base64/hex/percent decoding), even though the README said 0. One user hit about 24 GB of memory on a 287 MB repo; `--max-decode-depth=0` avoided it. ([gitleaks#2019](https://github.com/gitleaks/gitleaks/issues/2019), open.) Disabling decoding trades away detection of encoded secrets.
- In the same thread, the maintainer said he is shifting focus to Betterleaks and does not plan significant new Gitleaks features. ([gitleaks#2044](https://github.com/gitleaks/gitleaks/issues/2044))

### Alternatives

| Tool | Language / engine | Homebrew (2026-11-05) | Speed evidence | Fit |
| --- | --- | --- | --- | --- |
| [Kingfisher](https://github.com/mongodb/kingfisher) (MongoDB) | Rust, Vectorscan/Hyperscan | 2.16.0 | Vendor benchmark: faster than Gitleaks on all 9 repos, e.g. django 6.9 s vs 59.5 s, linux 205 s vs 549 s (16-core arm64 Mac) ([COMPARISON.md](https://github.com/mongodb/kingfisher/blob/main/docs/COMPARISON.md)) | Fastest published numbers. Validation appears to be on by default and makes network calls; use `--no-validate` for offline local checks. Supports `--staged`. Reads Betterleaks TOML rules, not Gitleaks configs. |
| [Betterleaks](https://github.com/betterleaks/betterleaks) | Go, RE2 + Aho-Corasick | 1.9.0 (v2 in development on `main`) | Launch post claims faster parallel git scanning but gives no numbers ([Aikido, 2026-03-12](https://www.aikido.dev/blog/betterleaks-gitleaks-successor)); press cites 4–5x on large repos ([BleepingComputer](https://www.bleepingcomputer.com/news/security/betterleaks-a-new-open-source-secrets-scanner-to-replace-gitleaks/)) | Closest drop-in: v1 accepts Gitleaks flags and `.gitleaks.toml`. v2 has a migration guide. `-j/--jobs` caps concurrency. Funded by Aikido, so its own "best tool" rankings are not neutral. |
| [ripsecrets](https://github.com/sirwart/ripsecrets) | Rust | 0.1.11 | Claims 95x faster than other tools. Independent test: 33 of 60 planted secrets found, 6 s full-history scan ([Safeguard, 2026](https://safeguard.sh/resources/blog/best-secrets-detection-tools-compared-2026)) | Lightest pre-commit tripwire. Low recall; pair it with a fuller scanner in CI. |
| [Nosey Parker](https://github.com/praetorian-inc/noseyparker) | Rust, Hyperscan | 0.24.0 | — | Archived 2026-04-24; replaced by [Titus](https://github.com/praetorian-inc/titus) (Go). Avoid for new setups. |
| [TruffleHog](https://github.com/trufflesecurity/trufflehog) | Go | 3.99.7 | Slower than Gitleaks in Kingfisher's benchmark; 15,624 network requests on gitlab vs 17 for Kingfisher | Best known for live verification, not lightness. |

Caveats: every speed number above comes from a vendor or a single reviewer. A GSA-TTS plan for an independent Gitleaks/TruffleHog/Kingfisher benchmark is still open ([GSA-TTS/scanning-service#23](https://github.com/GSA-TTS/scanning-service/issues/23)). Kingfisher has an open report of quadratic time on repeated `key: <hex>` lines ([kingfisher#532](https://github.com/mongodb/kingfisher/issues/532), 2026-10-02). I found no Hacker News or Lobsters discussion with independent measurements.

## What Works

- **Scan the diff, not the disk.** `gitleaks git --staged` (pre-commit), `gitleaks git --log-opts="origin/main..HEAD"` (pre-push), or `gitleaks dir` over an explicit list of candidate files. Kingfisher: `kingfisher scan . --staged --no-validate`.
- **Bound the CPU.** Gitleaks and Betterleaks are Go programs, so `GOMAXPROCS=4` caps their CPU threads. Betterleaks also has `--jobs`. On macOS, `taskpolicy -b <command>` runs at background QoS so the scheduler favors efficiency cores and interactive apps stay responsive (inference from the QoS model; not measured here).
- **Use the RE2 build** of Gitleaks (the GitHub release binary) if you stay on Gitleaks. Confirm with `--log-level debug`, which shows the regex engine in use.
- **Set a timeout** for agent-run scans: `--timeout 60` exists on Gitleaks 8.30.

## What to Avoid

- `--no-git --source .` from the root of a large working tree. It reads untracked outputs, caches, and media that will never be pushed.
- Treating ripsecrets as a complete replacement.
- Turning off decoding (`--max-decode-depth=0`) by default. Reserve it for repos where decoding is measured as the cost.
- Running a validating scanner such as Kingfisher or TruffleHog on private code without `--no-validate` when you don't want candidate secrets sent to provider APIs.

## Recommendation

Keep the Gitleaks rules and workflow. Change agent and hook instructions to scan staged or outgoing changes only, and wrap them in `taskpolicy -b` or `GOMAXPROCS=4`. If a faster engine is still wanted, trial Betterleaks first (drop-in config), then Kingfisher with `--no-validate` (fastest published numbers, different rule format). Run each on the same tracked-file set and record wall time, CPU, and findings before switching.

## Open Questions

- Which directories dominated the 91 GB scan? `gitleaks --diagnostics=cpu` or a per-directory timing would answer it.
- How much does the RE2 release binary save on this Mac? Untested.
- How do Betterleaks and Kingfisher compare on this Mac with the same inputs? Untested.

## Source Links

- [gitleaks#2044: release vs source build performance, RE2 build tag](https://github.com/gitleaks/gitleaks/issues/2044) (Feb 2026)
- [gitleaks#2019: decode-depth default and memory blowup](https://github.com/gitleaks/gitleaks/issues/2019) (Jan–Jul 2026)
- [gitleaks#1286: node_modules still scanned in Docker mode](https://github.com/gitleaks/gitleaks/issues/1286)
- [Betterleaks repository](https://github.com/betterleaks/betterleaks)
- [Aikido: Betterleaks launch post](https://www.aikido.dev/blog/betterleaks-gitleaks-successor) (2026-03-12, vendor)
- [BleepingComputer: Betterleaks to replace Gitleaks](https://www.bleepingcomputer.com/news/security/betterleaks-a-new-open-source-secrets-scanner-to-replace-gitleaks/)
- [Help Net Security: Betterleaks](https://www.helpnetsecurity.com/2026/03/19/betterleaks-open-source-secrets-scanner/) (2026-03-19)
- [Kingfisher repository](https://github.com/mongodb/kingfisher) and [README](https://github.com/mongodb/kingfisher/blob/main/README.md)
- [Kingfisher COMPARISON.md benchmark](https://github.com/mongodb/kingfisher/blob/main/docs/COMPARISON.md) (vendor)
- [kingfisher#532: quadratic scan on repeated hex lines](https://github.com/mongodb/kingfisher/issues/532) (2026-10-02)
- [GSA-TTS/scanning-service#23: planned independent benchmark](https://github.com/GSA-TTS/scanning-service/issues/23)
- [ripsecrets repository](https://github.com/sirwart/ripsecrets)
- [Safeguard: secrets detection tools compared 2026](https://safeguard.sh/resources/blog/best-secrets-detection-tools-compared-2026) (single reviewer)
- [Nosey Parker repository (archived)](https://github.com/praetorian-inc/noseyparker) and [Praetorian: Titus announcement](https://www.praetorian.com/blog/titus-open-source-secret-scanner/)
- [AppSecSanta: secret scanning tools roundup](https://appsecsanta.com/secret-scanning-tools) (discovery only)
