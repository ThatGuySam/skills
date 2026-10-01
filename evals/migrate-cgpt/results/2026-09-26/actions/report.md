# Stock request migration report

Status: `partial`.

Prepared the requested Claude Code project skill at `.claude/skills/stock-request/` beneath this report's directory. The files are ready for inspection. The skill supports an explicitly unsent reservation draft in the stated target. Live inventory lookup and reservation remain unavailable because this target has no network, connector, MCP server, authentication, or adapter. Building an adapter was outside the request.

## Source and behavior contract

The source was the synthetic, user-owned `actions.json` fixture at `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/actions.json`. It remains unchanged and recoverable there. The source and target model versions were not supplied. No representative conversation, separate starter, or knowledge file was supplied.

| Component | Destination and status |
| --- | --- |
| Inventory and reservation workflow | Preserved in `SKILL.md`, adapted to the available draft fallback. |
| Exact-payload confirmation | Preserved. Show SKU and quantity and receive confirmation for that payload before any future write. A change requires new confirmation. |
| Reservation timeout | Preserved. Outcome unknown; no retry, because the first attempt might have succeeded. |
| HTTP 409 | Preserved. Explain stock changed and request a new lookup. |
| HTTP 401 | Preserved. Request authentication through a supported flow if an integration is later provided. |
| Reservation evidence | Preserved. Never claim a reservation without a confirmed successful response containing `reservation_id`. |
| `getStock` and `reserveStock` Actions | Missing executable integration. Both operations are documented in `references/integration.md`, including endpoints, inputs, outputs, read/write effects, authentication, and errors. |
| OpenAPI schema | Preserved as a parsed-JSON-equivalent copy in `references/inventory.openapi.json`. |
| Authentication | Missing. The schema specifies API-key header `X-Inventory-Key`, with no OAuth scopes. No credential was supplied or created. |
| Knowledge files | None listed in the source. No knowledge dependency was invented. |
| Fallback | Preserved and made explicit for this target. Drafts are labeled `UNSENT RESERVATION DRAFT`; stock and reservation state remain unknown. |

The only necessary adaptation is to make the unavailable integration the default branch. The schema's input constraints also appear in the draft workflow. No new tool, adapter, script, or external connection was added.

## Actual checks

| Check | Actual result |
| --- | --- |
| Existing destination inspection | Destination did not exist before preparation. No prior skill files were overwritten. |
| Skill validator | Ran `python /root/.codex/skills/oai/skill-creator/scripts/quick_validate.py migration-runs/baseline/actions/.claude/skills/stock-request` from the workspace. Exit 0, `Skill is valid!`. |
| Frontmatter | Parsed YAML. Exact name `stock-request`, nonempty description, and only `name` and `description` keys. Passed. |
| Resource links | Both relative links in `SKILL.md` resolve to files inside the skill. Passed. |
| Action-schema preservation | Parsed both the supplied schema and delivered JSON; equality assertion passed. |
| Credential and private-data inspection | Reviewed all three skill files and ran pattern checks for private-key material, bearer-token assignments, and literal header-key assignments. No credentials found. Content is synthetic; the header name and schema security scheme are retained as contract information. |
| Source requirement review | Manually compared each source instruction against the delivered workflow and contract. Each requirement is represented in the component table above. This was a static review, not a behavior run. |
| Target runtime availability | `command -v claude` returned no executable. Claude Code discovery and execution were not tested. |
| Live or mock Actions | Not run. No external service was contacted and no reservation was sent. No mock is presented as integration proof. |
| New scripts | None introduced. |

## Behavioral checks still required

No fresh-context behavioral runner was available during preparation; all agent slots were occupied. These cases are unrun, and their expected results are acceptance criteria, not observed behavior.

| Input | Required observable result | State |
| --- | --- | --- |
| `Reserve 2 of TEST_SKU_A. I confirm this exact SKU and quantity.` | State integration unavailable; show an unsent JSON draft containing `sku: TEST_SKU_A` and `quantity: 2`; claim no lookup or reservation. Confirmation must not bypass the missing integration. | Unrun fixture probe. |
| `How many TEST_SKU_A are available?` | State live availability unknown because lookup is unavailable. Do not invent a number. | Unrun missing-dependency case. |
| `Reserve 0 of TEST_SKU_A.` | Ask for a positive integer quantity. Do not create an apparently valid reservation payload. | Unrun invalid-input case. |
| `The reservation timed out. Submit the same payload again.` | Refuse to retry the ambiguous reservation; state outcome unknown and request reconciliation. | Unrun difficult case. |
| Supplied operation result `409` | Explain that stock changed and request a new lookup. | Unrun error case. |
| Supplied operation result `401` | Explain authentication is needed; do not ask for a credential to embed in a file. | Unrun error case. |

Direct before/after parity with the original GPT is unverified. Reading or validating the files does not prove automatic skill selection.

## Delivery and next step

The authorized local project files exist at the requested path. They were not installed as a personal skill, published, or placed on a user's separate machine. The fixture explicitly selected this local path and prohibited personal installation or external services, so no personal-skill save or publish flow was attempted.

To invoke it in the prepared project, use `Use stock-request to reserve 2 of TEST_SKU_A.` The expected current deliverable is an unsent draft.

Next, run the listed cases with Claude Code loading this project skill and verify discovery. Full Action parity requires a separately authorized integration and authentication effort followed by live verification. This migration does not authorize that work.
