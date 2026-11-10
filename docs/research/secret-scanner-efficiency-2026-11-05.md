# Lighter, Faster Secret Scanning Than Gitleaks

Research memo, 2026-11-05. Prompted by a Gitleaks run that held 8–9 of 12 cores for over two minutes during a local pre-push check. The question: is there a more CPU-efficient scanner (Rust or otherwise), and what actually reduces the cost?

## Scope

- Local developer use on macOS (Apple Silicon): pre-commit, pre-push, and ad hoc directory scans.
- Practitioner evidence, primary repos, and a local head-to-head benchmark of seven scanner builds (see Local Benchmark).

## Short Answer

The expensive run was mostly a **scope** problem, not a tool problem. Fix scope first, then cap parallelism, then consider a faster engine or tool.

1. Scan only what you are about to commit or push, not the working tree.
2. Run the scanner at background priority or with fewer threads so it cannot take the whole machine.
3. For a faster engine, the local benchmark below favors **Betterleaks** (Go, by the Gitleaks author). It used 5–20x less CPU than the Gitleaks builds and had the best recall on planted secrets. Just switching from Homebrew Gitleaks to the official release binary cuts CPU 4–12x with identical findings. **Kingfisher** (Rust) had the shortest history-scan time but used 6.3 GB of memory and reported almost nothing on real code at default confidence. **ripsecrets** (Rust) starts instantly but was the slowest tool on a large tree.

## Local Evidence

Measured on this Mac (12 cores: 8 performance, 4 efficiency) with Homebrew Gitleaks 8.30.1.

- The heavy run was `gitleaks detect --no-git --source . --max-target-megabytes 5` from a project root. That working tree is about 91 GB on disk, while its ~19,500 tracked files total about 660 MB. Top showed Gitleaks at 772% and 932% CPU in two 5-second samples, with the machine under 1% idle, about 2 minutes into the run.
- The follow-up scan, limited to the 121 files actually headed for the push, finished in 0.44 s (862 KB of text scanned; images skipped).
- With `--log-level debug`, Homebrew's Gitleaks prints `using stdlib regex engine`. That is the slower engine (see below).

Inference: most of the cost came from scanning untracked build outputs, dependencies, and artifacts. Which directories dominated was not profiled. A third-party report says the default config skips `node_modules`, but that was not checked here.

## Local Benchmark

Run 2026-11-05 on the same Mac (12 cores, 96 GB) with other agent sessions running. The load average ranged from 13 to 64, so wall times are noisy; CPU seconds repeated within about 5% across two rounds. Every tool ran with default rules, offline, and with validation off.

Tools: Homebrew Gitleaks 8.30.1 (stdlib regex), the official Gitleaks 8.30.1 release binary (go-re2, checksum verified), Betterleaks 1.9.0, Kingfisher 2.16.0 (`--no-validate`), TruffleHog 3.99.7 (`--no-verification`), Titus 1.2.11, and ripsecrets 0.1.11.

### Directory scan: 1.7 GB snapshot of a project's tracked files (19,441 files)

| Tool | Wall s (round 1 / 2) | CPU s | Avg cores | Max RSS MB | Data scanned |
| --- | --- | --- | --- | --- | --- |
| Gitleaks (Homebrew, stdlib) | 65.2 / 49.5 | 474 / 468 | 7–9 | 108 | 614 MB |
| Gitleaks (release, RE2) | 16.3 / 14.5 | 109 / 118 | 7–8 | 140 | 614 MB |
| Betterleaks | 3.2 / 3.0 | 23 | 7–8 | 198 | 714 MB |
| Kingfisher | 4.2 / 4.2 | 21 | 5 | 262 | 1.87 GB (includes binaries) |
| TruffleHog | 8.2 / 7.6 | 63 | 8 | 406 | 727 MB |
| Titus | 2.6 / 2.7 | 6 | 2 | 491–656 | 387 MB (10 MB file cap) |
| ripsecrets | 65.7 / 72.0 | 536 | 8 | 180 | not reported |

### Git history scan: 1,078 commits, 3.1 GB pack

| Tool | Wall s | CPU s | Max RSS MB | Data scanned |
| --- | --- | --- | --- | --- |
| Gitleaks (Homebrew, stdlib) | 207.8 | 1,413 | 1,676 | 533 MB |
| Gitleaks (release, RE2) | 27.8 | 120 | 1,679 | 533 MB |
| Betterleaks | 18.0 | 59 | 1,691 | 629 MB |
| Kingfisher | 6.1 | 37 | 6,301 | 5.4 GB of blobs |
| TruffleHog | 74.2 | 176 | 1,713 | 686 MB |
| Titus | 28.3 | 33 | 1,553 | 563 MB |

ripsecrets has no history mode. TruffleHog's `git` source needs an index, so it failed on a `--no-checkout` clone until `git reset` created one.

### One-file scan (pre-commit size), three runs

All tools took under 0.5 s except TruffleHog (0.65–0.70 s). Titus spent 11.8 s on its first run compiling a Hyperscan database, then about 0.04 s once it was cached. Kingfisher took 4.2–4.5 s on the 30-file planted corpus below but 0.4 s on one file.

### Accuracy: planted corpus (20 fake secrets, 10 lookalike decoys, one per file)

| Tool | Found | Decoys flagged | Missed |
| --- | --- | --- | --- |
| Betterleaks | 19/20 | 0 | Postgres URL password |
| Gitleaks (both builds) | 18/20 | 0 | Postgres URL password, YAML `password:` |
| Kingfisher | 17/20 | 0 | Postgres URL, YAML password, Hugging Face |
| Titus | 17/20 | 1 (placeholder `.env`) | base64-encoded token, Hugging Face, Stripe |
| TruffleHog | 16/20 | 0 | YAML password, Google API key, JWT, Twilio |
| ripsecrets | 15/20 | 1 (AWS docs example key) | Anthropic, OpenAI, Slack, Twilio, YAML password |

Bias: I wrote this corpus, mostly in formats with well-known rules, so it can favor Gitleaks-family regexes. Decoys covered UUIDs, hashes, commit SHAs, placeholders, environment lookups, lockfile integrity hashes, SSH public keys, CSS hashes, and data URLs.

### Agreement with Gitleaks on the real 1.7 GB snapshot

No ground truth exists for these files, and findings were not triaged. Gitleaks (release) reported 91 findings in 47 files.

| Tool | Findings | Files | Shared with Gitleaks | Tool-only files | Gitleaks files missed |
| --- | --- | --- | --- | --- | --- |
| Gitleaks (Homebrew) | 91 | 47 | 47 | 0 | 0 |
| Betterleaks | 155 | 84 | 43 | 41 (mostly `generic-password`, `generic-api-key`, `gcp-api-key`) | 4 |
| Kingfisher | 2 | 2 | 2 | 0 | 45 |
| TruffleHog | 128 | 55 | 29 | 26 (56 `TomorrowIO` hits, mostly JSON and zip) | 18 |
| Titus | 78 | 61 | 29 | 32 (mostly generic rules in PHP) | 18 |
| ripsecrets | 108 | 69 | 37 | 32 (JSON, HTML, CSS) | 10 |

Interpretation (inference): the two Gitleaks builds differ only in speed. Betterleaks covers almost everything Gitleaks flags and adds generic matches, which likely means more noise rather than more real secrets. Kingfisher's default `medium` confidence is very conservative on real code. ripsecrets is fast to start but the slowest tool on a large tree, contrary to its README claim.

### Full-repository trial: Betterleaks vs Gitleaks (release), 2026-11-05 13:00

Load average about 5. Both tools used each repository's `.gitleaks.toml` when one existed. A history finding counts once per commit where it appears, so file+rule pairs are the better measure of distinct issues.

| Scan | Gitleaks wall / CPU s | Betterleaks wall / CPU s | Max RSS (G / B) | File+rule pairs (G / B) | Files shared / B-only / G-only |
| --- | --- | --- | --- | --- | --- |
| Repository A, full history (4,237 commits) | 64.5 / 297 | 46.6 / 159 | 784 / 790 MB | 15 / 16 | 12 / 2 / 1 |
| Repository A, HEAD tracked files | 4.1 / 30 | 1.1 / 9 | 157 / 148 MB | 3 / 3 | 2 / 1 / 1 |
| Repository B, full history (1,129 commits, 3.1 GB pack) | 318.5 / 2,216 | 259.5 / 1,019 | 5.1 / 8.0 GB | 55 / 94 | 44 / 42 / 4 |
| Repository B, HEAD tracked files | 14.3 / 140 | 2.8 / 24 | 128 / 186 MB | 54 / 92 | 43 / 41 / 4 |

- In repository A, results were nearly the same. Betterleaks added `generic-password` and `generic-credential-uri` hits in a prototype app and a test, and missed three `generic-api-key` hits in plan docs. Most history findings came from one experiment folder repeated across commits.
- In repository B, Betterleaks' extra files at HEAD were mostly `generic-password` in tests, `.example` files, and templates, plus `gcp-api-key` in seed JSON and mirrored HTML. Gitleaks-only hits were `generic-api-key` in two app folders. None were triaged.
- Betterleaks' full-history scan of repository B peaked at 8 GB of memory. Size CI runners for that or scope history scans to a range.

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

Done 2026-11-05 in the private workspace: agent push and commit instructions and a staged-scan hook now scan only staged or outgoing changes, at background priority with a timeout. The hook runs Betterleaks and falls back to Gitleaks when Betterleaks is not installed.

Based on the benchmark:

1. **Lowest-risk improvement:** replace Homebrew Gitleaks with the official release binary. It produced identical findings with 4x less CPU on a directory and 12x less on history.
2. **Best overall:** Betterleaks. On this Mac it used about 5x less CPU than RE2 Gitleaks on a directory and 2x less on history, had the best planted recall (19/20, no decoys flagged), and reads Gitleaks configs. Expect more generic findings to review.
3. **Not as the default local gate:** Kingfisher (6.3 GB of memory on history, very few default findings on real code), Titus (narrower default coverage, a cold-start compile), TruffleHog (slower history scans, noisy extra detectors), and ripsecrets (lowest recall, slow on large trees).

For pre-commit-sized scans, every tool finishes in under a second. Engine choice matters for large directory and history scans; scope matters everywhere.

## Switching to Betterleaks: Allowlist Lessons

From a redacted triage of every HEAD finding in both repositories (2026-11-05). Values were never printed; classification used value shape, dictionary words, decoded JWT claims, and cross-file comparison.

- **Almost every extra Betterleaks finding was a false positive.** Repository B dropped from 155 findings to 2 after narrow allowlists. The cases were vendored plugin code, mirrors of public websites, public Google browser keys repeated in seed data, lockfile metadata, `.env.example` placeholders, test fixtures, documentation placeholder connection strings with a literal `user:password@host`, GitHub Actions `${{ secrets.X }}` references, hyphenated dev placeholders such as `<name>-local-password`, and email template copy such as "password reset."
- **All the JWTs flagged were Supabase `anon` keys**, which are public client keys by design. Decoding only the payload claims (`role`, `iss`) settles this without exposing the signature.
- **Keep test and example exceptions rule-scoped.** Skipping only `generic-password` and `generic-credential-uri` in `*.test.*` files, rather than whole paths, still caught GitHub tokens planted in a test file and an `.env.example`.
- **Gitleaks rejects a config that names a Betterleaks-only rule** (`target rule ID 'generic-password' does not exist`). Put Betterleaks-only allowlists in `.betterleaks.toml`. Betterleaks reads that file before `.gitleaks.toml`, so the Gitleaks fallback keeps its own config.
- **Betterleaks 1.9.0 resolves `[extend] path` from the working directory, not the config file.** `.betterleaks.toml` extending `.gitleaks.toml` failed to load from any other directory. Copy the shared entries instead and note that they must stay in sync.
- **A path pattern like `(^|/)\.env(\.[\w-]+)?\.example$` did not match in Betterleaks 1.9.0**, while `(^|/)\.env[\w.-]*\.example$` did. Other optional groups such as `contracts(?:-v2)?/` worked. Test every allowlist entry against a real hit.

## Open Questions

- Which directories dominated the 91 GB working-tree scan? `gitleaks --diagnostics=cpu` or per-directory timing would answer it.
- How do the tools compare on an idle machine? The benchmark rounds shared the CPU with other sessions.

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
