export const STORAGE_KEY = "sam-skills:install-runner"

export const RUNNERS = [
  { id: "npx", label: "npx", command: "npx skills" },
  { id: "bunx", label: "bunx", command: "bunx skills" },
  { id: "pnx", label: "pnx", command: "pnx skills" },
  { id: "mise", label: "mise", command: "mise exec node@lts npm:skills@latest -- skills" },
  { id: "yarn", label: "Yarn dlx", command: "yarn dlx skills" },
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

export const MODE_PARAM = "install"
export const MODES = [
  { id: "command", label: "Command" },
  { id: "prompt", label: "Prompt" },
]

export function modeFor(id) {
  return MODES.find((mode) => mode.id === id)?.id ?? "command"
}

// The command tab is the default, so only the prompt tab appears in the URL.
export function modeFromUrl(href) {
  return modeFor(new URL(href).searchParams.get(MODE_PARAM))
}

export function urlForMode(href, id) {
  const url = new URL(href)
  if (modeFor(id) === "command") url.searchParams.delete(MODE_PARAM)
  else url.searchParams.set(MODE_PARAM, modeFor(id))
  return url.href
}

// Returns the remote package and skills of an `add` command, or null when an
// agent prompt would not make sense: other subcommands, --list, a local path,
// or no named skill.
export function parseInstall(command) {
  const tokens = command.arguments.replace(/\\\n/g, " ").trim().split(/\s+/)
  if (tokens[0] !== "add" && tokens[0] !== "a") return null
  const source = tokens[1]
  if (!source || !(/^https?:\/\//.test(source) || /^[\w.-]+\/[\w.-]+$/.test(source))) return null
  if (tokens.includes("--list") || tokens.includes("-l")) return null
  const flag = tokens.findIndex((token) => token === "--skill" || token === "-s")
  const skills = []
  for (const token of flag < 0 ? [] : tokens.slice(flag + 1)) {
    if (token.startsWith("-")) break
    skills.push(token)
  }
  if (!skills.length || skills.includes("*") || skills.includes("'*'")) return null
  return { source, url: source.startsWith("http") ? source : `https://github.com/${source}`, skills, tokens }
}

function listNames(names) {
  if (names.length < 3) return names.join(" and ")
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`
}

export function formatPrompt(command, id) {
  const install = parseInstall(command)
  if (!install) return null
  const has = (...flags) => flags.some((flag) => install.tokens.includes(flag))
  const scoped = has("--global", "-g")
  const targeted = has("--agent", "-a")
  const line = [
    command.prefix + runnerFor(id).command,
    ...install.tokens,
    ...(scoped ? [] : ["--global"]),
    ...(has("--yes", "-y") ? [] : ["--yes"]),
  ].join(" ")
  const many = install.skills.length > 1
  const run = [
    `Run \`${line}\`.`,
    ...(targeted ? [] : ["Add `--agent` with the ID of the agent you are running in, such as `claude-code` or `codex`."]),
    ...(scoped ? [] : ["Drop `--global` if I ask for this project only."]),
  ].join(" ")
  const confirm = many
    ? `Confirm that ${listNames(install.skills.map((skill) => `\`${skill}/SKILL.md\``))} now exist in my skills folder.`
    : `Confirm that \`${install.skills[0]}/SKILL.md\` now exists in my skills folder.`
  return [
    `Install the ${listNames(install.skills)} agent skill${many ? "s" : ""} from ${install.url} for me.`,
    "",
    `1. ${run}`,
    `2. ${confirm}`,
    `3. Tell me to start a new session, then show me one example of how to use ${many ? "each skill" : "the skill"}.`,
  ].join("\n")
}
