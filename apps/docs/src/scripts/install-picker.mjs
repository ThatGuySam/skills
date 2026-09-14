import { RUNNERS, STORAGE_KEY, formatCommand, parseCommand, readPreference, runnerFor, savePreference } from "./install-commands.mjs"

const storage = () => window.localStorage
let selected = readPreference(storage)
let pickers = []

function updatePickers(id) {
  selected = runnerFor(id).id
  for (const picker of pickers) {
    picker.select.value = selected
    picker.code.textContent = formatCommand(picker.command, selected)
    picker.status.textContent = ""
  }
}

function initialize() {
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
    const label = document.createElement("label")
    label.textContent = "Run with "
    const select = document.createElement("select")
    select.name = "install-runner"
    select.setAttribute("aria-label", "Run command with")
    for (const runner of RUNNERS) select.add(new Option(runner.label, runner.id))
    label.append(select)
    const copy = document.createElement("button")
    copy.type = "button"
    copy.textContent = "Copy command"
    const pre = document.createElement("pre")
    const code = document.createElement("code")
    pre.append(code)
    pre.tabIndex = 0
    pre.setAttribute("aria-label", "Install command")
    const status = document.createElement("span")
    status.className = "install-command-status"
    status.setAttribute("role", "status")
    toolbar.append(label, status, copy)
    panel.append(toolbar, pre)
    select.addEventListener("change", () => {
      savePreference(storage, select.value)
      updatePickers(select.value)
    })
    copy.addEventListener("click", async () => {
      const value = code.textContent
      try {
        await navigator.clipboard.writeText(value)
        status.textContent = code.textContent === value ? "Copied!" : "Previous command copied"
      } catch {
        const range = document.createRange()
        range.selectNodeContents(code)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        status.textContent = "Select and copy the command"
      }
    })
    block.replaceWith(panel)
    pickers.push({ panel, select, code, command, status })
  }
  updatePickers(readPreference(storage))
}

initialize()
document.addEventListener("astro:page-load", initialize)
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY || event.key === null) updatePickers(event.newValue)
})
