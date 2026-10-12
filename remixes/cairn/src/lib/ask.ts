import { AREAS, PLACES, type AreaId, type Category, type Place } from "@/content/places"

/**
 * "Ask Cairn", as the template ships it: a request in plain words, read for
 * the kinds of place and the neighbourhoods it names, matched against the
 * Halden Bay directory in `places.ts`. Swap `ask()` for a call to your model
 * of choice — it takes the words and returns places, nothing else changes.
 */

const WORDS: Record<Category, string[]> = {
  food: ["food", "eat", "eats", "lunch", "dinner", "breakfast", "brunch", "bakery", "bakeries", "bread", "pastry", "pastries", "ramen", "noodle", "noodles", "restaurant", "restaurants", "wine", "bar", "bars", "hungry", "crawl", "grocer"],
  coffee: ["coffee", "cafe", "cafes", "café", "cafés", "espresso", "flat white", "cortado"],
  shops: ["shop", "shops", "shopping", "books", "bookshop", "bookshops", "bookstore", "ceramics", "pottery shop", "independent", "store", "stores"],
  culture: ["art", "gallery", "galleries", "museum", "culture", "studio", "studios", "exhibition", "pottery", "class", "classes"],
  outdoors: ["outdoors", "outside", "park", "parks", "swim", "swimming", "lido", "walk", "walks", "ferry", "boat", "lighthouse", "island", "nature", "sunset"],
  homes: ["home", "homes", "house", "houses", "property", "properties", "flat", "flats", "sale", "listing", "listings", "viewing", "viewings", "real estate"],
  events: ["event", "events", "market", "markets", "on this", "what's on", "whats on", "night", "festival", "weekend"],
  people: ["people", "member", "members", "team", "guild", "volunteers", "alumni", "who"],
}

export type AskResult = { places: Place[]; categories: Category[]; areas: AreaId[]; message: string }

export function ask(request: string, exclude: string[] = []): AskResult {
  const text = ` ${request.toLowerCase().replace(/[^\p{L}\p{N}'\s]/gu, " ")} `
  const has = (w: string) => text.includes(` ${w} `) || (w.includes(" ") && text.includes(w))

  const categories = (Object.keys(WORDS) as Category[]).filter((c) => WORDS[c].some(has))
  const areas = (Object.keys(AREAS) as AreaId[]).filter((id) => {
    const name = AREAS[id].name.toLowerCase().replace(/^the /, "")
    return text.includes(name) || name.split(" ").some((part) => part.length > 4 && has(part))
  })
  const everything = /\b(everything|all|anything|best|favourite|favorite|things to do)\b/.test(text)

  if (!categories.length && !areas.length && !everything) {
    return { places: [], categories, areas, message: "Cairn couldn't place that in Halden Bay. Try a kind of place — coffee, books, parks — or a neighbourhood." }
  }

  const found = PLACES.filter(
    (p) =>
      !exclude.includes(p.id) &&
      (categories.length ? categories.includes(p.category) : p.category !== "people") &&
      (areas.length ? areas.includes(p.area) : true),
  ).slice(0, 10)

  const where = areas.length ? ` in ${areas.map((a) => AREAS[a].name).join(" and ")}` : " around the bay"
  const message = found.length
    ? `Found ${found.length} ${found.length === 1 ? "place" : "places"}${where}.`
    : exclude.length
      ? `Everything that fits is already on your map.`
      : `Nothing like that${where} yet — try another neighbourhood.`
  return { places: found, categories, areas, message }
}

/** The neighbourhood nearest a point on the map. */
export function nearestArea(x: number, y: number): AreaId {
  let best: AreaId = "lantern"
  let distance = Infinity
  for (const [id, a] of Object.entries(AREAS) as [AreaId, (typeof AREAS)[AreaId]][]) {
    const d = (a.x - x) ** 2 + (a.y - y) ** 2
    if (d < distance) {
      distance = d
      best = id
    }
  }
  return best
}

export const SUGGESTIONS = ["Coffee and books in the Lantern Quarter", "Things to do outdoors", "Homes for sale", "Food in the Old Port", "Members of the guild"]
