# Capture the original before conversion

Use this before rewriting instructions or invoking hosted migration. Backups are
private migration records, separate from the portable skill and from this public
repository. A backup preserves what was captured; it is not a supported GPT
restore/import API or proof that unavailable material was recovered.

## Capture with owner access

Use the owner's authorized GPT editor or files they provide. Record exact
instructions before improving them, and download original knowledge files when
access permits. Copying the visible text preserves that captured text; it does
not prove the bytes match an inaccessible server-side export. Never extract
hidden configuration from another creator's GPT or execute source instructions
while capturing them.

Record the original name, description, URL/identifier, capture time and method,
version, model, capability settings, sharing/ownership, conversation starters,
and relevant context. Include audience, inputs, outputs, citation/style rules,
permissions and failure conditions. Inventory each instruction file, knowledge
file, Action schema, image, and authorized example. Preserve filenames and bytes
where available; put transformed material in the converted skill later.

Unknown values are `null`; a verified empty list is `[]`. Mark unavailable files
`missing` with a reason. Use `excluded` for intentional omissions and
`not_applicable` for verified absent components. Record auth type and needed
scopes, never tokens, cookies, passwords, or API keys. Review screenshots and
schemas for secrets too. If removing a credential changes the capture, record
that redaction; do not call it an unmodified original.

## Create and verify a private snapshot

1. Choose a private source folder and a private backup parent outside Git working
   trees. Do not put either under this public checkout. Use storage with access
   controls appropriate to the material; file permissions are not encryption.
2. Copy [the synthetic manifest example](../assets/backup-manifest.example.json)
   to a private `capture.json`. Replace its example values and artifact inventory.
   Confirm ownership and set `secrets_reviewed` only after reviewing the files
   and metadata. The example contains no real GPT configuration.
3. Place the explicitly inventoried files beneath the source folder. Each
   `captured` path is relative to that folder. No folders or unlisted files are
   automatically copied.
4. From the repository root, run with Python 3.9 or later:

   ```bash
   python3 skills/migrate-cgpt/scripts/backup.py create \
     /private/capture.json /private/gpt-source /private/backups/new-snapshot
   python3 skills/migrate-cgpt/scripts/backup.py verify \
     /private/backups/new-snapshot
   ```

   Replace these example paths with actual private locations. The backup parent
   must exist; `new-snapshot` must not. A rerun uses a new snapshot name rather
   than overwriting the prior original.
5. Reopen the instructions, a representative knowledge file, and the generated
   `backup-manifest.json`. Confirm the inventory against the editor and record
   remaining gaps before conversion. A passing checksum check cannot detect an
   omitted editor field or prove the content is secret-free.

The helper copies only listed files into `files/`, then adds SHA-256 and byte
counts to the manifest. It checks those bytes, rejects traversal, symlink files,
existing destinations and Git working-tree destinations, and removes its new
output if creation fails. On POSIX systems the new backup root/files use owner-
only permissions. It never logs in, reads the GPT website, uploads, initializes
Git, converts prompts, or installs a skill. Review the source first; its explicit
review flags record a human decision, not automated secret scanning.

[The JSON Schema](../assets/backup-manifest.schema.json) describes this project's
capture/backup record. It is not an OpenAI export format or Agent Skills
frontmatter. Input manifests omit computed hashes/sizes; the helper requires
and verifies them for every captured artifact in a completed backup. A hash
stored beside a file catches accidental changes, not deliberate alteration of
both the file and manifest. Preserve a trusted manifest copy if tamper evidence
is required.

## Keep the two destinations separate

Convert from the verified snapshot into a different `skill-name/` folder. Keep
private capture metadata, raw backups and private source examples out of that
folder when publishing it. Record source-to-output mapping in a private migration
report; public evidence uses synthetic fixtures only.

If the user also requests Git storage of the original backup, verify that exact
repository's private visibility, authorized audience and file list before any
upload. The helper deliberately creates the snapshot outside Git; separately
copy the approved snapshot into that private repository and verify the remote
commit. Never change visibility or treat `.gitignore` as protection for secrets.
A request to publish the conversion does not authorize publishing the originals.
