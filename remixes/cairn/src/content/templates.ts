import type { MapTheme } from "@/components/map/map-base"

/**
 * The template gallery. Each template is a real map — a theme, a view and a
 * list of places from `places.ts` — so the same object renders the card,
 * the preview and the studio it opens in.
 */

export type TemplateKind = "Events" | "Directories" | "Travel" | "Property" | "Community"

export type MapTemplate = {
  id: string
  title: string
  /** The list's heading inside the map, as a reader sees it */
  heading: string
  summary: string
  intro: string
  kind: TemplateKind
  theme: MapTheme
  placeIds: string[]
  /** Map view: centre in map space and zoom (1 = the whole bay) */
  view: { x: number; y: number; zoom: number }
  cover: number
  uses: number
}

export const TEMPLATES: MapTemplate[] = [
  {
    id: "event-map",
    title: "Event map",
    heading: "This month in the bay",
    summary: "A guide to what's on near you",
    intro: "Every market, opening and late night this month — tap one for the time and the way there.",
    kind: "Events",
    theme: "paper",
    placeIds: ["farmers", "swap", "night-market", "room-eleven", "salt-house", "wheelhouse"],
    view: { x: 620, y: 470, zoom: 1.35 },
    cover: 27173521,
    uses: 12840,
  },
  {
    id: "business-directory",
    title: "Local business directory",
    heading: "Shop the Lantern Quarter",
    summary: "Directory for local businesses",
    intro: "The independent shops, bakers and bars that make the quarter worth the walk.",
    kind: "Directories",
    theme: "harbour",
    placeIds: ["ferrol", "second-shelf", "noodle", "room-eleven", "pilot", "cellar", "kiln"],
    view: { x: 640, y: 330, zoom: 1.5 },
    cover: 37267653,
    uses: 9310,
  },
  {
    id: "member-directory",
    title: "Member directory",
    heading: "Who's in the guild",
    summary: "Share members, people, profiles",
    intro: "Show where your members, alumni or volunteers are — and what they do.",
    kind: "Community",
    theme: "meadow",
    placeIds: ["amara", "lena", "tomas", "idris", "oskar"],
    view: { x: 560, y: 400, zoom: 1.15 },
    cover: 39598425,
    uses: 6125,
  },
  {
    id: "food-crawl",
    title: "Food crawl",
    heading: "Eat your way round",
    summary: "A route for hungry afternoons",
    intro: "Six stops, one afternoon, no bad bites. Start at the bakery, finish at the wine bar.",
    kind: "Travel",
    theme: "paper",
    placeIds: ["ferrol", "noodle", "greengrocer", "bowl", "cellar", "pilot"],
    view: { x: 560, y: 440, zoom: 1.2 },
    cover: 23964123,
    uses: 15502,
  },
  {
    id: "open-houses",
    title: "Open houses",
    heading: "Viewings this weekend",
    summary: "Listings, prices and viewing times",
    intro: "Three homes open to view on Saturday. Prices are guide prices.",
    kind: "Property",
    theme: "harbour",
    placeIds: ["two-gables", "brick-row", "glasshouse"],
    view: { x: 450, y: 420, zoom: 1.05 },
    cover: 30580640,
    uses: 4218,
  },
  {
    id: "weekend-away",
    title: "A weekend away",
    heading: "Two days in Halden Bay",
    summary: "An itinerary friends can follow",
    intro: "Swim, climb a lighthouse, eat well and catch the last water taxi back.",
    kind: "Travel",
    theme: "dusk",
    placeIds: ["lido", "ferry", "lighthouse", "fernhill-park", "salt-house", "cellar"],
    view: { x: 700, y: 400, zoom: 1.05 },
    cover: 693751,
    uses: 8770,
  },
]

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id)
