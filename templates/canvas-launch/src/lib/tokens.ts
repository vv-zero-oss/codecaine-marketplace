/**
 * Reads a colour token at runtime, for the few things drawn outside CSS (a
 * canvas, a WebGL material). They still take their colours from the variables
 * in index.css — nothing here hard-codes one.
 */
export function token(name: string, el: Element = document.documentElement) {
  return getComputedStyle(el).getPropertyValue(`--color-${name}`).trim()
}
