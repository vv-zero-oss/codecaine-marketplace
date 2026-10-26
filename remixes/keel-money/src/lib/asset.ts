/** A file in `public/`, from wherever the site is served — the dev server's
 *  root, or a folder like `demos/keel-money/` once it is built. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}
