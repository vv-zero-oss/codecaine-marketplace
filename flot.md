# flot — open issues

## Fonts are installed from npm instead of linked from Google Fonts

**Status:** open. The fix will be done separately.

### What happens

`canvas-launch` does not start. Vite shows its error overlay in the framed
project:

```
[plugin:vite:import-analysis] Failed to resolve import
"@fontsource-variable/onest/index.css" from "src/main.tsx". Does the file exist?

templates/canvas-launch/src/main.tsx:11:7
   9 | import App from "./App";
  10 | import "@fontsource-variable/inter/opsz.css";
  11 | import "@fontsource-variable/onest/index.css";
     |       ^
  12 | import "@fontsource/roboto-mono/400.css";
  13 | import "@fontsource/roboto-mono/500.css";
```

The template loads its fonts as `@fontsource` / `@fontsource-variable` npm
packages. `@fontsource-variable/onest` is not installed (or does not have that
entry point), so the import fails and the page never renders. Any font
package missing from `node_modules` breaks the whole template like this.

`templates/kids-camera` does the same thing (`@fontsource-variable/hanken-grotesk`
and `@fontsource-variable/newsreader` in `src/index.css` and `package.json`).

### The rule

**Every font a template uses is a Google Font, loaded online from Google
Fonts.** No font is installed offline through npm.

- Pick fonts from the Google Fonts directory (https://fonts.google.com).
- Link them from `fonts.googleapis.com` in `index.html`:

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Onest:wght@100..900&family=Roboto+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
  ```

  (or an `@import url("https://fonts.googleapis.com/css2?…")` at the top of
  `src/index.css`).
- Request only the families, axes and weights the template actually uses, and
  keep `display=swap`.
- The family names still go in as tokens in `@theme` (`--font-sans`,
  `--font-mono`, …), with a system fallback stack after them.
- No `@fontsource/*` or `@fontsource-variable/*` dependencies in
  `package.json`, and no font imports in `src/main.tsx` or `src/index.css`
  that point at `node_modules`.

### To fix

1. `canvas-launch`: remove the four `@fontsource` imports from
   `src/main.tsx` and their dependencies from `package.json`; link Inter,
   Onest and Roboto Mono from Google Fonts as above.
2. `kids-camera`: the same for Hanken Grotesk and Newsreader.
3. Check every other template (and `sdk-scaffold`) for `@fontsource`.
4. Add the rule to `CLAUDE.md` section 5 ("Fonts") and the `template-building`
   skill in the canvas repository, so new templates follow it.
5. Bump each changed template's `version` / `updated`, `npm run build`, and
   commit what it writes.
