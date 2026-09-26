# Component mapping

Use this when inventorying a GPT or deciding what belongs in the replacement.

| Source component | Destination | Check |
| --- | --- | --- |
| Instructions | SKILL.md workflow and conditional references | Preserve output, evidence, permissions, and stop conditions |
| Knowledge files | Focused references, original assets, or an explicit retrieval dependency | Verify files exist and required facts remain retrievable |
| Templates and examples | assets/ or references/ | Preserve fields and formatting that downstream work needs |
| Conversation starters | Invocation examples and behavioral checks | Use realistic requests, not only the skill name |
| Web, code, images, connected apps | Target runtime capabilities | Verify availability and specify behavior when unavailable |
| Action OpenAPI schema | Integration contract and adapter work if authorized | Schema is not an executable integration |
| Model choice | Migration record and target evaluation | Similar instructions do not establish identical results |
| Chat history and memory | Selected authorized context or external state | Do not silently turn historical examples into permanent rules |
| Sharing and ownership | Destination access configuration | Verify separately from successful file creation |

## Knowledge

Inventory names, formats, versions, and missing files. For transformed files, retain provenance and check representative tables, numbers, and formatting against the original. Use checksums when a byte-for-byte copy matters. Keep large corpora out of SKILL.md. An asset directory does not recreate hosted semantic retrieval: choose direct reads, search, or a maintained retrieval tool according to the corpus and runtime. Test a question requiring the actual material.

If a required file is missing, write the available workflow with a clear stop or reduced-output path. Do not invent its content or create an empty file that looks like a successful migration. Use descriptive paths without machine-specific absolute paths.

## Actions and authentication

For each used operation, record its operation ID, endpoint, inputs, outputs, error behavior, read/write effects, auth mechanism, and required scopes. Identify a working connector, MCP tool, or narrowly scoped adapter available to the target. Preserve domain restrictions and authorization requirements.

Do not copy API keys, bearer tokens, cookies, or OAuth credentials into instructions, source control, test fixtures, or output. Describe environment-variable or secret-store requirements by name. Reconnect authentication through the destination's supported flow.

When an adapter is in scope, test input mapping, response handling, and failure behavior with fixtures or a safe sandbox. Record live verification separately. Do not send email, issue refunds, update customer records, or perform other external mutations solely to prove migration works unless the user authorized that effect.

When rebuilding is outside scope or credentials are unavailable, deliver the useful skill and a concrete integration gap. Preserve a read-only or draft-only fallback if it serves the task; do not pretend the original operation succeeded.
