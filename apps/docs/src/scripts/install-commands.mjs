export const STORAGE_KEY = "sam-skills:install-runner"

export const RUNNERS = [
  { id: "npx", label: "npx", command: "npx skills" },
  { id: "bunx", label: "bunx", command: "bunx skills" },
  { id: "pnpx", label: "pnpx", command: "pnpx skills" },
  { id: "pnpm", label: "pnpm dlx", command: "pnpm dlx skills" },
  { id: "yarn", label: "Yarn dlx", command: "yarn dlx skills" },
  { id: "npm", label: "npm exec", command: "npm exec -- skills" },
  { id: "mise", label: "mise", command: "mise exec node@lts npm:skills@latest -- skills" },
  { id: "pnx", label: "pnx (pnpm 12+)", command: "pnx skills" },
]

export function runnerFor(id) {
  return RUNNERS.find((runner) => runner.id === id) ?? RUNNERS[0]
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
