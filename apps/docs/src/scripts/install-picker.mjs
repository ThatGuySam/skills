import {
  MODES,
  STORAGE_KEY,
  formatCommand,
  formatPrompt,
  modeFor,
  modeFromUrl,
  parseCommand,
  readPreference,
  runnerFor,
  savePreference,
  urlForMode,
} from "./install-commands.mjs"
import { createRunnerMenu } from "./runner-menu.mjs"

const storage = () => window.localStorage
let selected = readPreference(storage)
let mode = modeFromUrl(location.href)
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

function updatePickers(id = selected) {
  selected = runnerFor(id).id
  for (const picker of pickers) {
    picker.runnerMenu.setValue(selected)
    // A picker without a prompt, such as `skills list`, always shows its command.
    const shown = picker.tabs.length ? mode : "command"
    renderCommand(picker.code, (shown === "prompt" ? formatPrompt : formatCommand)(picker.command, selected))
    for (const tab of picker.tabs) {
      const active = tab.dataset.mode === shown
      tab.setAttribute("aria-selected", String(active))
      tab.tabIndex = active ? 0 : -1
      if (active) picker.pre.setAttribute("aria-labelledby", tab.id)
    }
    picker.copy.setAttribute("aria-label", `Copy install ${shown}`)
    picker.status.textContent = ""
  }
}

// The tab lives in the URL so a link can open straight on the prompt.
function selectMode(id) {
  mode = modeFor(id)
  history.replaceState(history.state, "", urlForMode(location.href, mode))
  updatePickers()
}

function createTabs(panelId) {
  const list = document.createElement("div")
  list.className = "install-command-tabs"
  list.setAttribute("role", "tablist")
  list.setAttribute("aria-label", "Install format")
  const tabs = MODES.map((item) => {
    const tab = document.createElement("button")
    tab.type = "button"
    tab.id = `${panelId}-${item.id}`
    tab.dataset.mode = item.id
    tab.textContent = item.label
    tab.setAttribute("role", "tab")
    tab.setAttribute("aria-controls", panelId)
    tab.addEventListener("click", () => selectMode(item.id))
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
    selectMode(tabs[next].dataset.mode)
    tabs[next].focus()
  })
  list.append(...tabs)
  return { list, tabs }
}

function initialize() {
  if (!("showPopover" in HTMLElement.prototype)) return
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
    const label = document.createElement("div")
    label.className = "install-runner-label"
    const labelText = document.createElement("span")
    labelText.className = "install-runner-text"
    labelText.textContent = "Run with "
    label.append(labelText)
    const runnerMenu = createRunnerMenu((id) => {
      savePreference(storage, id)
      updatePickers(id)
    })
    label.append(runnerMenu.element)
    const copy = document.createElement("button")
    copy.type = "button"
    copy.textContent = "Copy"
    copy.setAttribute("aria-label", "Copy install command")
    const pre = document.createElement("pre")
    const code = document.createElement("code")
    pre.append(code)
    pre.tabIndex = 0
    pre.id = `install-command-${++nextId}`
    const { list, tabs } = formatPrompt(command, selected) ? createTabs(pre.id) : { list: null, tabs: [] }
    if (list) pre.setAttribute("role", "tabpanel")
    else pre.setAttribute("aria-label", "Install command")
    const status = document.createElement("span")
    status.className = "install-command-status"
    status.setAttribute("role", "status")
    // One toolbar row, so the tabs do not push the example prompt off a phone screen.
    toolbar.append(...(list ? [list] : []), label, status, copy)
    panel.classList.toggle("install-command-picker-tabbed", Boolean(list))
    panel.append(toolbar, pre)
    copy.addEventListener("click", async () => {
      const value = code.textContent
      try {
        await navigator.clipboard.writeText(value)
        status.textContent = code.textContent === value ? "Copied!" : "Previous text copied"
      } catch {
        const range = document.createRange()
        range.selectNodeContents(code)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        status.textContent = "Select and copy the text"
      }
    })
    // Expressive Code ships its page-wide stylesheet and script inside the first block.
    block.before(...block.querySelectorAll(":scope > link, :scope > script"))
    block.replaceWith(panel)
    pickers.push({ panel, runnerMenu, pre, code, command, status, copy, tabs })
  }
  mode = modeFromUrl(location.href)
  updatePickers(readPreference(storage))
}

initialize()
document.addEventListener("astro:page-load", initialize)
window.addEventListener("resize", () => pickers.forEach((picker) => picker.runnerMenu.position()))
window.addEventListener("scroll", () => pickers.forEach((picker) => picker.runnerMenu.position()), true)
window.addEventListener("popstate", () => {
  mode = modeFromUrl(location.href)
  updatePickers()
})
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY || event.key === null) updatePickers(event.newValue)
})
