import { STORAGE_KEY, formatCommand, parseCommand, readPreference, runnerFor, savePreference } from "./install-commands.mjs"
import { createRunnerMenu } from "./runner-menu.mjs"

const storage = () => window.localStorage
let selected = readPreference(storage)
let pickers = []

// Wrap lines only between arguments, never inside a flag such as --skill.
function renderCommand(code, text) {
  code.replaceChildren(...text.split(/(\s+)/).filter(Boolean).map((part) => {
    if (/^\s+$/.test(part)) return document.createTextNode(part)
    const token = document.createElement("span")
    token.className = "install-command-token"
    token.textContent = part
    return token
  }))
}

function updatePickers(id) {
  selected = runnerFor(id).id
  for (const picker of pickers) {
    picker.runnerMenu.setValue(selected)
    renderCommand(picker.code, formatCommand(picker.command, selected))
    picker.status.textContent = ""
  }
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
    label.textContent = "Run with "
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
    pre.setAttribute("aria-label", "Install command")
    const status = document.createElement("span")
    status.className = "install-command-status"
    status.setAttribute("role", "status")
    toolbar.append(label, status, copy)
    panel.append(toolbar, pre)
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
    // Expressive Code ships its page-wide stylesheet and script inside the first block.
    block.before(...block.querySelectorAll(":scope > link, :scope > script"))
    block.replaceWith(panel)
    pickers.push({ panel, runnerMenu, code, command, status })
  }
  updatePickers(readPreference(storage))
}

initialize()
document.addEventListener("astro:page-load", initialize)
window.addEventListener("resize", () => pickers.forEach((picker) => picker.runnerMenu.position()))
window.addEventListener("scroll", () => pickers.forEach((picker) => picker.runnerMenu.position()), true)
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY || event.key === null) updatePickers(event.newValue)
})
