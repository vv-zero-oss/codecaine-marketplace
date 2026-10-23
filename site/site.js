// The two things the generated pages do in the browser. Nothing here is
// needed to read a page: without it every card shows and the buttons are
// plain links.

// Search and category chips: hide the cards that do not match. Each card
// carries the words it answers to in data-search and its categories in
// data-categories, written by scripts/site.mjs.
const search = document.querySelector("[data-search-input]")
const bands = [...document.querySelectorAll("[data-band]")]
const chosen = new Map()

function filter() {
  const needle = (search?.value ?? "").trim().toLowerCase()
  for (const band of bands) {
    const category = chosen.get(band) ?? ""
    let shown = 0
    for (const card of band.querySelectorAll("[data-card]")) {
      const match =
        (!needle || card.dataset.search.includes(needle)) &&
        (!category || card.dataset.categories.split("|").includes(category))
      card.hidden = !match
      if (match) shown++
    }
    const empty = band.querySelector("[data-empty]")
    if (empty) empty.hidden = shown > 0
    // A kind with nothing matching folds away while searching, so a search
    // reads as one list of answers rather than four headings over nothing.
    band.hidden = !!needle && shown === 0
  }
}

search?.addEventListener("input", filter)
for (const band of bands) {
  for (const chip of band.querySelectorAll("[data-chip]")) {
    chip.addEventListener("click", () => {
      chosen.set(band, chip.dataset.chip)
      for (const other of band.querySelectorAll("[data-chip]")) other.setAttribute("aria-pressed", String(other === chip))
      filter()
    })
  }
}
// ⌘K / Ctrl+K and "/" put the caret in the search.
document.addEventListener("keydown", (event) => {
  if (!search) return
  const typing = event.target instanceof HTMLElement && event.target.closest("input, textarea, [contenteditable]")
  if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") || (event.key === "/" && !typing)) {
    event.preventDefault()
    search.focus()
    search.select()
  }
})

// "Open in Codecaine" is a codecaine:// link the desktop app answers. A
// browser says nothing when no app is registered for the scheme, so if the
// page is still in front a moment later, say what to do instead.
for (const link of document.querySelectorAll("[data-open-app]")) {
  link.addEventListener("click", () => {
    const note = document.getElementById(link.dataset.openApp)
    let left = false
    const away = () => (left = true)
    window.addEventListener("blur", away, { once: true })
    document.addEventListener("visibilitychange", away, { once: true })
    setTimeout(() => {
      window.removeEventListener("blur", away)
      document.removeEventListener("visibilitychange", away)
      if (!left && note) note.classList.add("shown")
    }, 1600)
  })
}
