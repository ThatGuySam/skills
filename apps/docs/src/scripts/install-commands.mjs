export const STORAGE_KEY = "sam-skills:install-runner"

export const RUNNERS = [
  { id: "npx", label: "npx", command: "npx skills" },
  { id: "bunx", label: "bunx", command: "bunx skills" },
  { id: "pnx", label: "pnx", command: "pnx skills" },
  { id: "mise", label: "mise", command: "mise exec node@lts npm:skills@latest -- skills" },
  { id: "yarn", label: "Yarn dlx", command: "yarn dlx skills" },
]

const LEGACY_RUNNERS = { pnpx: "pnx", pnpm: "pnx", npm: "npx" }

export function runnerFor(id) {
  const migrated = LEGACY_RUNNERS[id] ?? id
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

export const TAB_STORAGE_KEY = "sam-skills:install-tab"
export const TAB_PARAM = "install"
export const PROMPT_TAB = "prompt"

// One tab group: the agent prompt first, then each runner's command.
export function tabsFor(hasPrompt) {
  const runners = RUNNERS.map((runner) => ({ id: runner.id, label: runner.label, hint: runner.command }))
  return hasPrompt ? [{ id: PROMPT_TAB, label: "Prompt", hint: "A request to paste into your agent" }, ...runners] : runners
}

// Returns a known tab ID, or null for anything else.
function tabFor(id) {
  if (id === PROMPT_TAB) return PROMPT_TAB
  const migrated = LEGACY_RUNNERS[id] ?? id
  return RUNNERS.some((runner) => runner.id === migrated) ? migrated : null
}

// A selection is the chosen tab plus the last runner, which a command with no prompt shows.
// The address wins over storage so a shared link opens on the tab it names. Storage wins
// over the default, and a runner saved before tabs existed still counts as a choice.
export function readSelection(storage, href) {
  let savedTab = null
  let savedRunner = null
  try {
    savedTab = tabFor(storage().getItem(TAB_STORAGE_KEY))
    savedRunner = tabFor(storage().getItem(STORAGE_KEY))
  } catch {
    // Blocked storage falls through to the address and the default.
  }
  if (savedRunner === PROMPT_TAB) savedRunner = null
  const linked = href ? tabFor(new URL(href).searchParams.get(TAB_PARAM)) : null
  const tab = linked ?? savedTab ?? savedRunner ?? PROMPT_TAB
  return { tab, runner: tab === PROMPT_TAB ? (savedRunner ?? RUNNERS[0].id) : tab }
}

export function saveSelection(storage, selection, id) {
  const tab = tabFor(id) ?? selection.tab
  const next = { tab, runner: tab === PROMPT_TAB ? selection.runner : tab }
  try {
    storage().setItem(TAB_STORAGE_KEY, next.tab)
  } catch {
    // The current page still works when the browser blocks persistent storage.
  }
  if (tab !== PROMPT_TAB) savePreference(storage, tab)
  return next
}

// A command with no prompt, such as `skills list`, shows the last runner instead.
export function shownTab(selection, hasPrompt) {
  return selection.tab === PROMPT_TAB && !hasPrompt ? selection.runner : selection.tab
}

export function urlForTab(href, id) {
  const url = new URL(href)
  url.searchParams.set(TAB_PARAM, tabFor(id) ?? PROMPT_TAB)
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

// The prompt always uses the first runner, npx, because it ships with Node.js and is the
// one most machines already have. Other runners are offered as tabs, never put in the prompt.
export function formatPrompt(command) {
  const install = parseInstall(command)
  if (!install) return null
  const has = (...flags) => flags.some((flag) => install.tokens.includes(flag))
  const targeted = has("--agent", "-a")
  const line = [
    command.prefix + RUNNERS[0].command,
    ...install.tokens,
    ...(has("--global", "-g") ? [] : ["--global"]),
    ...(has("--yes", "-y") ? [] : ["--yes"]),
  ].join(" ")
  const many = install.skills.length > 1
  const check = many ? "each skill's `SKILL.md` exists" : `\`${install.skills[0]}/SKILL.md\` exists`
  const target = targeted ? "" : ", adding `--agent` with your own agent ID, such as `claude-code` or `codex`"
  // One short paragraph: on a phone the whole prompt and its Copy button should fit one screen.
  return [
    `Install the ${listNames(install.skills)} agent skill${many ? "s" : ""} from ${install.url} for me.`,
    `Run \`${line}\`${target}.`,
    `Then confirm that ${check} and tell me to start a new session.`,
  ].join(" ")
}

// Where the prompt can be opened. Each link goes to PrefillPrompt's preview screen with the
// agent preset. That screen shows the prompt, warns if it looks dangerous, and opens the
// agent's app or website when the reader clicks.
export function openTargets(prompt) {
  return ["chatgpt", "claude"].map((id) => {
    const url = new URL("https://prefillprompt.com/open")
    url.searchParams.set("s", id)
    url.searchParams.set("q", prompt)
    return { id, label: id === "chatgpt" ? "ChatGPT" : "Claude", url: url.href }
  })
}
