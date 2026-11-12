// A bottom sheet for choosing the install tab on narrow screens, where six tabs do not fit.
// It is a native modal <dialog>, which supplies the top layer, focus trap, Escape, and the
// platform back gesture. The motion follows Vaul's sheet: one steep curve, a drag that
// tracks the finger, and dismissal on distance or speed.

const DISMISS_DISTANCE = 0.4 // share of the sheet's height
const DISMISS_SPEED = 0.5 // px per ms
const DRAG_START = 8 // px of vertical travel before a press becomes a drag

let sheet
let list
let onSelect = () => {}
let opener

function build() {
  sheet = document.createElement("dialog")
  sheet.className = "install-sheet"
  sheet.setAttribute("closedby", "any")
  sheet.setAttribute("aria-labelledby", "install-sheet-title")
  const handle = document.createElement("div")
  handle.className = "install-sheet-handle"
  handle.setAttribute("aria-hidden", "true")
  const header = document.createElement("div")
  header.className = "install-sheet-header"
  const title = document.createElement("h2")
  title.id = "install-sheet-title"
  title.textContent = "Show install as"
  const close = document.createElement("button")
  close.type = "button"
  close.className = "install-sheet-close"
  close.textContent = "Close"
  close.addEventListener("click", dismiss)
  header.append(title, close)
  list = document.createElement("ul")
  list.className = "install-sheet-options"
  list.setAttribute("role", "list")
  sheet.append(handle, header, list)
  document.body.append(sheet)

  // Esc, the back gesture, and a backdrop tap arrive as cancel; animate those too.
  sheet.addEventListener("cancel", (event) => {
    event.preventDefault()
    dismiss()
  })
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    sheet.addEventListener("click", (event) => {
      if (event.target !== sheet) return
      const rect = sheet.getBoundingClientRect()
      const inside = rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right
      if (!inside) dismiss()
    })
  }
  sheet.addEventListener("close", () => {
    sheet.classList.remove("is-closing", "is-dragging")
    sheet.style.translate = ""
    sheet.style.removeProperty("--install-sheet-shown")
    // Safari does not focus a tapped button, so the dialog has nothing to restore focus to.
    opener?.focus()
  })
  trackDrag()
}

// Slides the sheet out from wherever it is, then closes the dialog.
async function dismiss() {
  if (!sheet.open || sheet.classList.contains("is-closing")) return
  sheet.classList.remove("is-dragging")
  sheet.classList.add("is-closing")
  sheet.style.translate = ""
  sheet.style.removeProperty("--install-sheet-shown")
  await Promise.allSettled(sheet.getAnimations().map((animation) => animation.finished))
  sheet.close()
}

function trackDrag() {
  let drag = null
  sheet.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || sheet.classList.contains("is-closing")) return
    // A list that scrolls keeps its own vertical gesture.
    if (list.scrollHeight > list.clientHeight && list.contains(event.target)) return
    drag = { id: event.pointerId, startY: event.clientY, lastY: event.clientY, lastTime: event.timeStamp, speed: 0, moved: false }
  })
  sheet.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return
    const distance = event.clientY - drag.startY
    if (!drag.moved) {
      if (Math.abs(distance) < DRAG_START) return
      drag.moved = true
      sheet.classList.add("is-dragging")
      // Capture keeps the drag alive outside the sheet; a pointer that has already lifted cannot be captured.
      try {
        sheet.setPointerCapture(event.pointerId)
      } catch {}
    }
    const elapsed = event.timeStamp - drag.lastTime
    if (elapsed > 0) drag.speed = (event.clientY - drag.lastY) / elapsed
    drag.lastY = event.clientY
    drag.lastTime = event.timeStamp
    // Track the finger 1:1 downward and resist an upward pull.
    const offset = distance > 0 ? distance : distance * 0.2
    sheet.style.translate = `0 ${offset}px`
    sheet.style.setProperty("--install-sheet-shown", String(Math.max(0, 1 - Math.max(0, offset) / sheet.offsetHeight)))
  })
  const release = (event) => {
    if (!drag || event.pointerId !== drag.id) return
    const { moved, speed, startY } = drag
    drag = null
    if (!moved) return
    // The press became a drag, so the click that follows must not pick an option.
    sheet.addEventListener("click", (click) => click.stopPropagation(), { capture: true, once: true })
    const distance = event.clientY - startY
    if (event.type === "pointerup" && (distance > sheet.offsetHeight * DISMISS_DISTANCE || speed > DISMISS_SPEED)) {
      dismiss()
      return
    }
    sheet.classList.remove("is-dragging")
    sheet.style.translate = ""
    sheet.style.removeProperty("--install-sheet-shown")
  }
  sheet.addEventListener("pointerup", release)
  sheet.addEventListener("pointercancel", release)
}

export function openInstallSheet({ options, current, select, trigger }) {
  if (!sheet) build()
  onSelect = select
  opener = trigger
  list.replaceChildren(...options.map((option) => {
    const item = document.createElement("li")
    const button = document.createElement("button")
    button.type = "button"
    const active = option.id === current
    if (active) {
      button.setAttribute("aria-current", "true")
      button.autofocus = true
    }
    const label = document.createElement("span")
    label.className = "install-sheet-label"
    label.textContent = option.label
    const hint = document.createElement("span")
    hint.className = "install-sheet-hint"
    hint.textContent = option.hint
    const check = document.createElement("span")
    check.className = "install-sheet-check"
    check.textContent = "✓"
    check.setAttribute("aria-hidden", "true")
    button.append(label, hint, check)
    button.addEventListener("click", () => {
      onSelect(option.id)
      dismiss()
    })
    item.append(button)
    return item
  }))
  sheet.showModal()
}
