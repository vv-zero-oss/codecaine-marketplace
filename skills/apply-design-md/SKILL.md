---
name: apply-design-md
description: Apply a DESIGN.md design system to a web project — turn its colour, type, radius, spacing and component tokens into the project's theme and restyle components by its rules. Use when a project contains a DESIGN.md (or design-systems/<name>/DESIGN.md installed from the Codecaine marketplace) and the user asks to use, apply, follow or switch to that design system.
---

# Apply a DESIGN.md

A DESIGN.md has two halves, and both are the spec:

- **Frontmatter** (YAML between `---` lines): the tokens. `colors`, `typography`,
  `rounded`, `spacing`, `components`, and sometimes `dark` (overrides by token
  name for a dark theme). A value like `"{colors.primary}"` is a reference to
  another token, not a string.
- **Body** (Markdown): the rules — what each token is for, Do's and Don'ts, an
  Iteration Guide and Known Gaps. The rules decide *where* a token goes. A
  palette applied without them is the wrong design in the right colours.

## Steps

1. **Find it.** `DESIGN.md` at the project root, or `design-systems/<id>/DESIGN.md`
   when the canvas editor installed it from the marketplace. If there are
   several, ask which one.
2. **Read the whole file** before touching code — the Known Gaps section says
   which tokens were inferred and must not be treated as measured.
3. **Map tokens to the project's theme layer, once.**
   - Tailwind v4: an `@theme` block in the main stylesheet —
     `--color-<name>`, `--radius-<name>`, `--spacing-<name>`,
     `--font-<family>`, `--text-<name>` (+ `--text-<name>--line-height`,
     `--text-<name>--letter-spacing`, `--text-<name>--font-weight`).
   - Tailwind v3: `theme.extend` in `tailwind.config`.
   - Plain CSS: custom properties on `:root`, and the `dark` block under
     `@media (prefers-color-scheme: dark)` or the project's own dark selector.
   Keep the DESIGN.md token names so the file and the code can be read side by
   side. Resolve `{…}` references to the variable they point at, not to a copied
   hex value.
4. **Fonts.** Proprietary families (Airbnb Cereal, Söhne, UberMove, Noto IKEA…)
   cannot ship. Use the substitute the file's *Note on Font Substitutes* names,
   load it properly (Google Fonts link or `@fontsource/*`), and keep the
   weights and letter-spacing the file specifies.
5. **Restyle components from `components`.** Buttons, inputs, cards, badges,
   navbar and footer each have a recipe — background, text colour, radius,
   padding, border, shadow, typography. Apply it to the project's existing
   components; don't create parallel ones.
6. **Enforce the Don'ts.** They are the part most often broken: a weight the
   ladder leaves out, a gradient in a flat system, an accent used as a field
   colour, a synthesized dark theme where the file says there is none.
7. **Report** what was mapped, which fonts were substituted, and anything in
   the file that had no home in the project.

## Don't

- Don't paste hex values into components — reference the theme variables.
- Don't invent tokens the file lacks; say it is missing (Known Gaps usually
  already does).
- Don't present the result as the brand's official system. These files are
  references extracted from public marketing pages and are unaffiliated.
