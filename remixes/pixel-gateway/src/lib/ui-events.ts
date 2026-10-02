/** Tiny cross-component channel: any button can ask the header to open a dialog. */
export type DialogName = "login" | "demo" | "command"
const EVENT = "pixelkeep:dialog"

export function openDialog(name: DialogName) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: name }))
}

export function onDialog(handler: (name: DialogName) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<DialogName>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
