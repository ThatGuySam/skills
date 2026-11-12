import {
  PROMPT_TAB,
  STORAGE_KEY,
  TAB_STORAGE_KEY,
  formatCommand,
  formatPrompt,
  openTargets,
  parseCommand,
  readSelection,
  saveSelection,
  shownTab,
  tabsFor,
  urlForTab,
} from "./install-commands.mjs"
import { createIcon } from "./install-icons.mjs"
import { openInstallSheet } from "./install-sheet.mjs"

const storage = () => window.localStorage
let selection = readSelection(storage, location.href)
let pickers = []
let nextId = 0

// Wrap lines only between words, never inside a flag such as --skill.
function renderCommand(code, text) {
  code.replaceChildren(...text.split(/(\s+)/).filter(Boolean).map((part) => {
    if (/^\s+$/.test(part)) return document.createTextNode(part)
    const token = document.createElement("span")
    token.className = "install-command-token"
    token.textContent = part
    return token
  }))
}

function updatePickers() {
  for (const picker of pickers) {
    const shown = shownTab(selection, picker.options[0].id === PROMPT_TAB)
    const prompt = shown === PROMPT_TAB
    renderCommand(picker.code, prompt ? formatPrompt(picker.command) : formatCommand(picker.command, shown))
    picker.open.hidden = !prompt
    for (const tab of picker.tabs) {
      const active = tab.dataset.tab === shown
      tab.setAttribute("aria-selected", String(active))
      tab.tabIndex = active ? 0 : -1
      if (active) picker.pre.setAttribute("aria-labelledby", tab.id)
    }
    const label = picker.options.find((option) => option.id === shown).label
    picker.choice.replaceChildren(createIcon(shown), label)
    picker.select.dataset.tab = shown
    picker.select.setAttribute("aria-label", `Showing ${label}. Choose what to show`)
    picker.copy.setAttribute("aria-label", prompt ? "Copy install prompt" : "Copy command")
    picker.status.textContent = ""
  }
}

// The choice is saved for the next page and written to the address for sharing.
function selectTab(id) {
  selection = saveSelection(storage, selection, id)
  history.replaceState(history.state, "", urlForTab(location.href, selection.tab))
  updatePickers()
}

function createTabs(options, panelId) {
  const list = document.createElement("div")
  list.className = "install-command-tabs"
  list.setAttribute("role", "tablist")
  list.setAttribute("aria-label", "Show install as")
  const tabs = options.map((option) => {
    const tab = document.createElement("button")
    tab.type = "button"
    tab.id = `${panelId}-${option.id}`
    tab.dataset.tab = option.id
    tab.append(createIcon(option.id), option.label)
    tab.setAttribute("role", "tab")
    tab.setAttribute("aria-controls", panelId)
    tab.addEventListener("click", () => selectTab(option.id))
    return tab
  })
  list.addEventListener("keydown", (event) => {
    const index = tabs.indexOf(document.activeElement)
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key]
    if (index < 0 || next === undefined) return
    event.preventDefault()
    selectTab(tabs[next].dataset.tab)
    tabs[next].focus()
  })
  list.append(...tabs)
  return { list, tabs }
}

// Narrow boxes swap the tab row for this button, which opens the options in a sheet.
function createSelect(options) {
  const select = document.createElement("button")
  select.type = "button"
  select.className = "install-command-select"
  select.setAttribute("aria-haspopup", "dialog")
  const choice = document.createElement("span")
  choice.className = "install-command-choice"
  const chevron = document.createElement("span")
  chevron.className = "install-command-chevron"
  chevron.setAttribute("aria-hidden", "true")
  select.append(choice, chevron)
  select.addEventListener("click", () => openInstallSheet({ options, current: select.dataset.tab, select: selectTab, trigger: select }))
  return { select, choice }
}

// Links that open the prompt in an agent, by way of PrefillPrompt's preview screen.
function createOpenLinks(prompt) {
  const row = document.createElement("div")
  row.className = "install-command-open"
  const label = document.createElement("span")
  label.textContent = "Open in"
  row.append(label, ...openTargets(prompt).map((target) => {
    const link = document.createElement("a")
    link.href = target.url
    link.target = "_blank"
    link.rel = "noopener"
    link.append(createIcon(target.id), target.label)
    link.setAttribute("aria-label", `Open the prompt in ${target.label}`)
    return link
  }))
  return row
}

function initialize() {
  if (!("showModal" in (window.HTMLDialogElement?.prototype ?? {}))) return
  pickers = pickers.filter((picker) => picker.panel.isConnected)
  for (const block of document.querySelectorAll(".sl-markdown-content .expressive-code")) {
    // Expressive Code's copy payload retains newlines between highlighted divs.
    const source = block.querySelector("button[data-code]")?.getAttribute("data-code")
    const command = source && parseCommand(source)
    if (!command) continue

    const panel = document.createElement("section")
    panel.className = "install-command-picker not-content"
    panel.setAttribute("aria-label", "Skills CLI command")
    const toolbar = document.createElement("div")
    toolbar.className = "install-command-toolbar"
    const pre = document.createElement("pre")
    const code = document.createElement("code")
    pre.append(code)
    pre.tabIndex = 0
    pre.id = `install-command-${++nextId}`
    pre.setAttribute("role", "tabpanel")
    const prompt = formatPrompt(command)
    const options = tabsFor(Boolean(prompt))
    const { list, tabs } = createTabs(options, pre.id)
    const { select, choice } = createSelect(options)
    const copy = document.createElement("button")
    copy.type = "button"
    copy.className = "install-command-copy"
    copy.textContent = "Copy"
    const status = document.createElement("span")
    status.className = "install-command-status"
    status.setAttribute("role", "status")
    const open = prompt ? createOpenLinks(prompt) : document.createElement("div")
    toolbar.append(list, select, status, copy)
    panel.append(toolbar, pre, open)
    copy.addEventListener("click", async () => {
      const value = code.textContent
      try {
        await navigator.clipboard.writeText(value)
        status.textContent = code.textContent === value ? "Copied!" : "Previous text copied"
      } catch {
        const range = document.createRange()
        range.selectNodeContents(code)
        const selected = window.getSelection()
        selected?.removeAllRanges()
        selected?.addRange(range)
        status.textContent = "Select and copy the text"
      }
    })
    // Expressive Code ships its page-wide stylesheet and script inside the first block.
    block.before(...block.querySelectorAll(":scope > link, :scope > script"))
    block.replaceWith(panel)
    pickers.push({ panel, pre, code, command, status, copy, tabs, select, choice, options, open })
  }
  selection = readSelection(storage, location.href)
  updatePickers()
}

initialize()
document.addEventListener("astro:page-load", initialize)
window.addEventListener("popstate", () => {
  selection = readSelection(storage, location.href)
  updatePickers()
})
// Another browser tab changed the saved choice.
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY && event.key !== TAB_STORAGE_KEY && event.key !== null) return
  selection = readSelection(storage)
  updatePickers()
})
