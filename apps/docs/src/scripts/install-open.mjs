// Opens the install prompt in an agent. On a computer it tries the agent's own app first,
// through its documented deep link, and falls back to the website. On a phone it follows
// the plain https link, which the system hands to the installed app when there is one.

const APP_WAIT = 1500 // ms to see whether an app took over before opening the website

export function openInAgent(event, { app, web, appName, site }, report) {
  const plainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
  if (!plainClick || !window.matchMedia("(pointer: fine)").matches) return
  event.preventDefault()
  report(`Opening ${appName}…`)

  // A launched app, or the browser's own "open this app?" prompt, takes focus from the page.
  let handedOff = false
  const onBlur = () => { handedOff = true }
  const onHide = () => { if (document.hidden) handedOff = true }
  window.addEventListener("blur", onBlur)
  document.addEventListener("visibilitychange", onHide)

  // A hidden frame keeps this page in place when no app answers the link.
  const frame = document.createElement("iframe")
  frame.hidden = true
  document.body.append(frame)
  let refused = false
  try {
    frame.contentWindow.location.href = app
  } catch {
    // Firefox throws when nothing is registered for the scheme.
    refused = true
  }

  setTimeout(() => {
    window.removeEventListener("blur", onBlur)
    document.removeEventListener("visibilitychange", onHide)
    frame.remove()
    if (handedOff && !refused) {
      report("")
      return
    }
    report(`Opened ${site} instead.`)
    const tab = window.open(web, "_blank")
    if (tab) tab.opener = null
    else window.location.href = web
  }, refused ? 0 : APP_WAIT)
}
