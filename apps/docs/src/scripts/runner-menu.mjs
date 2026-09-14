import { RUNNERS, runnerFor } from "./install-commands.mjs"

let nextId = 0

export function createRunnerMenu(onChange) {
  const wrapper = document.createElement("div")
  wrapper.className = "install-runner"
  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "install-runner-trigger"
  trigger.setAttribute("aria-haspopup", "menu")
  trigger.setAttribute("aria-expanded", "false")
  const title = document.createElement("span")
  const chevron = document.createElement("span")
  chevron.className = "install-runner-chevron"
  chevron.setAttribute("aria-hidden", "true")
  trigger.append(title, chevron)
  const menu = document.createElement("div")
  menu.className = "install-runner-menu"
  menu.id = `install-runner-${++nextId}`
  menu.popover = "auto"
  menu.setAttribute("role", "menu")
  menu.setAttribute("aria-label", "Command runner")
  trigger.setAttribute("aria-controls", menu.id)
  let current = "npx"
  const options = RUNNERS.map((runner) => {
    const option = document.createElement("button")
    option.type = "button"
    option.setAttribute("role", "menuitemradio")
    option.setAttribute("aria-checked", "false")
    option.dataset.runner = runner.id
    option.tabIndex = -1
    const name = document.createElement("span")
    name.textContent = runner.label
    const check = document.createElement("span")
    check.className = "install-runner-check"
    check.textContent = "✓"
    check.setAttribute("aria-hidden", "true")
    option.append(name, check)
    option.addEventListener("click", () => {
      onChange(runner.id)
      menu.hidePopover()
      trigger.focus()
    })
    menu.append(option)
    return option
  })
  wrapper.append(trigger, menu)

  function position() {
    if (!menu.matches(":popover-open")) return
    const rect = trigger.getBoundingClientRect()
    const below = innerHeight - rect.bottom - 12
    const above = rect.top - 12
    menu.style.maxHeight = `${Math.max(80, above, below)}px`
    const size = menu.getBoundingClientRect()
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - size.width - 8))}px`
    menu.style.top = `${Math.max(8, below >= size.height || below >= above ? rect.bottom + 6 : rect.top - size.height - 6)}px`
  }
  function open(index = RUNNERS.findIndex((runner) => runner.id === current)) {
    menu.showPopover()
    trigger.setAttribute("aria-expanded", "true")
    position()
    options[index].focus()
  }
  trigger.addEventListener("click", () => {
    if (menu.matches(":popover-open")) menu.hidePopover()
    else open()
  })
  trigger.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
    event.preventDefault()
    open(event.key === "ArrowDown" ? 0 : options.length - 1)
  })
  menu.addEventListener("toggle", () => trigger.setAttribute("aria-expanded", String(menu.matches(":popover-open"))))
  let query = ""
  let typedAt = 0
  menu.addEventListener("keydown", (event) => {
    const index = options.indexOf(document.activeElement)
    let next
    if (event.key === "ArrowDown") next = (index + 1) % options.length
    if (event.key === "ArrowUp") next = (index - 1 + options.length) % options.length
    if (event.key === "Home") next = 0
    if (event.key === "End") next = options.length - 1
    if (event.key === "Escape" || event.key === "Tab") {
      if (event.key === "Escape") event.preventDefault()
      menu.hidePopover()
      trigger.focus()
      return
    }
    if (event.key.length === 1 && event.key !== " " && !event.ctrlKey && !event.metaKey && !event.altKey) {
      query = (Date.now() - typedAt < 500 ? query : "") + event.key.toLowerCase()
      typedAt = Date.now()
      const match = RUNNERS.findIndex((runner) => runner.label.toLowerCase().startsWith(query))
      if (match >= 0) next = match
    }
    if (next !== undefined) {
      event.preventDefault()
      options[next].focus()
    }
  })
  return {
    element: wrapper,
    position,
    setValue(id) {
      const runner = runnerFor(id)
      current = runner.id
      title.textContent = runner.label
      trigger.setAttribute("aria-label", `Run command with ${runner.label}`)
      for (const option of options) option.setAttribute("aria-checked", String(option.dataset.runner === current))
    },
  }
}
