# Initial validation

Checked October 12, 2026. Status: validated for the bounded authoring and review behavior below; downstream use of generated skills and automatic discovery remain untested.

Three tasks ran with the mixer and three matching tasks ran with normal guidance, using fresh gpt-6.1-sol agents at high reasoning effort. They could write only to separate temporary output directories. Deployment, global installation, additional history reads, and child agents were excluded from these authoring trials.

| Task | Mixer output | Baseline output | Artifact assessment |
| --- | --- | --- | --- |
| Author a finite preview-delivery skill | [Create A](outputs/create-a.md) | [Create B](outputs/create-b.md) | Both deliver usable skills, preserve content/authority, and require deployed desktop/phone evidence. |
| Review contradictory release instructions without editing | [Review A](outputs/review-a.md) | [Review B](outputs/review-b.md) | Both identify production-authority conflict, repeated permission, premature completion, and excessive triggers. Original fixture hash remained unchanged. |
| Derive a personal style from scoped mixed evidence | [Preferences A](outputs/preferences-a.md) | [Preferences B](outputs/preferences-b.md) | Both retain recurring preferences and specific exceptions without making the one-off no-deploy request permanent. |

Independent gpt-6-astra review graded both variants as satisfying the five requested artifact assertions per case. The trials establish no clear superiority over baseline. Reported side-effect boundaries are supported by retained outputs and run reports; this was not an instrumented audit of every possible external effect. Token and latency comparisons were unavailable and are not inferred.

The mixer's structural validator and all four generated skill validators passed using the Codex creator's actual `quick_validate.py` with a task-local Python 3.12 / PyYAML 6.0.3 environment. Earlier trial reports correctly noted that their default Python lacked PyYAML; the parent subsequently ran the named validator rather than treating alternate YAML parsing as equivalent.

Seven dependency tests passed: complete receipt, installed-content tampering, local-source drift, missing required dependency, missing support reference, escaping symlink, and manifest/source mismatch. Frozen installation restored all six dependencies successfully. Freshness checks compared upstream heads and the installed Codex creator; their dated result is in [freshness.json](freshness.json).

The reviewer found missing packaged fixtures. They are now bundled under `fixtures/` and `cases.json` uses paths relative to the skill root. Local source snapshots also moved into `.sources/` to keep nested SKILL.md files private. These packaging corrections did not change remote source bytes or the authoring decision rules; dependency and structural checks passed afterward.

Before broad quality or automatic-trigger claims, run the cases through the intended runtime's actual discovery mechanism and exercise generated skills on safe representative projects. The current evidence concerns this mixer's authoring behavior, not live deployment by the authored preview skill or durable user preference approval.

Installed-location structural validation and all seven dependency tests also passed. The [installed dependency receipt](dependency-receipt.json) records the final paths, lock hash, source commits, and mixer fingerprints.

Public copies of receipts and reports replace machine-specific path prefixes with `<skill-root>` and `<codex-home>`. Hashes, outcomes, and dates are retained. These are sanitized historical receipts, not fresh runs on the reader’s machine.

Public packaging checks are recorded in [publication.json](publication.json). Skills CLI 1.7.2 discovered only this entrypoint, copied its bundled snapshot, and restored all six locked dependencies in an isolated project-local Codex installation; all seven dependency tests passed there.
