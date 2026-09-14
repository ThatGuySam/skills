export const STORAGE_KEY = "sam-skills:install-runner"

export const RUNNERS = [
  { id: "npx", label: "npx", detail: "Included with Node.js", group: "Recommended", command: "npx skills" },
  { id: "bunx", label: "bunx", detail: "For Bun users", group: "Recommended", command: "bunx skills" },
  { id: "pnx", label: "pnx", detail: "For pnpm 12+ users", group: "Recommended", command: "pnx skills" },
  { id: "mise", label: "mise", detail: "Manage the runtime too", group: "Also supported", command: "mise exec node@lts npm:skills@latest -- skills" },
  { id: "yarn", label: "Yarn dlx", detail: "For Yarn 2+ users", group: "Also supported", command: "yarn dlx skills" },
]

export function runnerFor(id) {
  const migrated = { pnpx: "pnx", pnpm: "pnx", npm: "npx" }[id] ?? id
  return RUNNERS.find((runner) => runner.id === migrated) ?? RUNNERS[0]
}

export function readPreference(storage) {
  try {
    return runnerFor(storage().getItem(STORAGE_KEY)).id
  } catch {
    return "npx"
  }
}

export function savePreference(storage, id) {
  try {
    storage().setItem(STORAGE_KEY, runnerFor(id).id)
  } catch {
    // The current page still works when the browser blocks persistent storage.
  }
}

export function parseCommand(source) {
  // Preserve optional environment assignments, flags, and line continuations.
  // Expressive Code encodes line breaks as DEL in its copy-button payload.
  const decoded = source.replaceAll("\u007f", "\n")
  const match = decoded.match(/^((?:[A-Z_][A-Z0-9_]*=\S+\s+)*)npx skills(?=\s|$)([\s\S]*)$/)
  return match ? { prefix: match[1], arguments: match[2] } : null
}

export function formatCommand(command, id) {
  return command.prefix + runnerFor(id).command + command.arguments
}
