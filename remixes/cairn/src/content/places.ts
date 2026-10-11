import { BookOpen, Coffee, Home, Landmark, type LucideIcon, Sparkles, Trees, User, UtensilsCrossed } from "lucide-react"

/**
 * Halden Bay — the made-up harbour city every map on the site is drawn
 * over. Coordinates are in the map's own 1200 × 800 space (see
 * `components/map/map-base.tsx`), so a place lands on the same street on
 * every map, at every zoom.
 */

export type Category = "food" | "coffee" | "shops" | "culture" | "outdoors" | "homes" | "events" | "people"

export const CATEGORIES: Record<Category, { label: string; icon: LucideIcon; color: string }> = {
  food: { label: "Food", icon: UtensilsCrossed, color: "var(--color-pin-food)" },
  coffee: { label: "Coffee", icon: Coffee, color: "var(--color-pin-coffee)" },
  shops: { label: "Shops", icon: BookOpen, color: "var(--color-pin-shops)" },
  culture: { label: "Culture", icon: Landmark, color: "var(--color-pin-culture)" },
  outdoors: { label: "Outdoors", icon: Trees, color: "var(--color-pin-outdoors)" },
  homes: { label: "Homes", icon: Home, color: "var(--color-pin-homes)" },
  events: { label: "Events", icon: Sparkles, color: "var(--color-pin-events)" },
  people: { label: "People", icon: User, color: "var(--color-pin-people)" },
}

export type AreaId = "fernhill" | "north-heads" | "lantern" | "old-port" | "millrace" | "terraces" | "south-common" | "gull-island"

/** Neighbourhoods, with the point their label sits on. A place typed into
 *  the spreadsheet with only a neighbourhood lands near here. */
export const AREAS: Record<AreaId, { name: string; x: number; y: number }> = {
  fernhill: { name: "Fernhill", x: 210, y: 395 },
  "north-heads": { name: "North Heads", x: 330, y: 110 },
  lantern: { name: "Lantern Quarter", x: 545, y: 255 },
  "old-port": { name: "Old Port", x: 800, y: 375 },
  millrace: { name: "Millrace", x: 300, y: 610 },
  terraces: { name: "The Terraces", x: 650, y: 650 },
  "south-common": { name: "South Common", x: 925, y: 690 },
  "gull-island": { name: "Gull Island", x: 1000, y: 195 },
}

export type Place = {
  id: string
  name: string
  category: Category
  area: AreaId
  x: number
  y: number
  /** Pexels photo id */
  photo: number
  blurb: string
  /** A date, an opening time, a price — whatever the second line is */
  detail?: string
}

export const PLACES: Place[] = [
  { id: "ferrol", name: "Ferrol Bakehouse", category: "food", area: "lantern", x: 572, y: 282, photo: 39784928, blurb: "Cardamom buns out of the oven at 6:40, gone by nine.", detail: "Opens 6:30am" },
  { id: "pilot", name: "Pilot Coffee Bar", category: "coffee", area: "old-port", x: 818, y: 352, photo: 1855214, blurb: "Eight seats facing the ferry slip. Order the cortado.", detail: "Opens 7am" },
  { id: "second-shelf", name: "Second Shelf Books", category: "shops", area: "lantern", x: 498, y: 305, photo: 37267653, blurb: "Used paperbacks by the metre and a cat called Ledger.", detail: "Tue–Sun" },
  { id: "paper-moon", name: "Paper Moon Books", category: "shops", area: "millrace", x: 338, y: 560, photo: 19377912, blurb: "Children's room upstairs, poetry in the stairwell.", detail: "Daily 10–7" },
  { id: "room-eleven", name: "Room Eleven", category: "culture", area: "lantern", x: 612, y: 222, photo: 7859041, blurb: "A one-room gallery that changes its show every six weeks.", detail: "Free entry" },
  { id: "salt-house", name: "Salt House Gallery", category: "culture", area: "old-port", x: 742, y: 404, photo: 9221307, blurb: "Paintings of the harbour, hung in the old customs hall.", detail: "Thu late" },
  { id: "swap", name: "Sunday Swap Market", category: "events", area: "millrace", x: 428, y: 618, photo: 33803666, blurb: "Radios, records and a man who fixes watches while you wait.", detail: "Sun · 9am" },
  { id: "noodle", name: "Noodle Lantern", category: "food", area: "lantern", x: 468, y: 212, photo: 23964123, blurb: "Twelve-hour broth, three kinds of noodle, no reservations.", detail: "From 5pm" },
  { id: "bowl", name: "Bowl & Broth", category: "food", area: "terraces", x: 694, y: 598, photo: 15085069, blurb: "Ramen counter that keeps a bowl back for the late shift.", detail: "Till 1am" },
  { id: "cellar", name: "Cellar Twelve", category: "food", area: "old-port", x: 868, y: 428, photo: 29455146, blurb: "Natural wine, tinned fish and a very good playlist.", detail: "Wed–Sat" },
  { id: "kiln", name: "Kiln & Co.", category: "shops", area: "fernhill", x: 246, y: 428, photo: 6611418, blurb: "Seconds shelf on Fridays — the glaze is the only flaw.", detail: "Fri–Sun" },
  { id: "wheelhouse", name: "Wheelhouse Pottery", category: "culture", area: "terraces", x: 604, y: 692, photo: 9304545, blurb: "Drop-in wheel sessions, aprons provided, mess expected.", detail: "Classes £28" },
  { id: "two-gables", name: "Two Gables", category: "homes", area: "fernhill", x: 152, y: 452, photo: 30580640, blurb: "Pair of new-build semis backing onto the park.", detail: "£640k" },
  { id: "brick-row", name: "Brick Row", category: "homes", area: "terraces", x: 742, y: 682, photo: 19516616, blurb: "Four-storey townhouse, south garden, original tiles.", detail: "£895k" },
  { id: "glasshouse", name: "The Glasshouse", category: "homes", area: "north-heads", x: 384, y: 146, photo: 1974596, blurb: "All windows and white render, ten minutes from the cliffs.", detail: "£1.2m" },
  { id: "farmers", name: "Harbour Farmers Market", category: "events", area: "old-port", x: 778, y: 318, photo: 27173521, blurb: "Forty stalls on the quay, first Saturday of every month.", detail: "Sat · 8am" },
  { id: "greengrocer", name: "Millrace Greengrocer", category: "food", area: "millrace", x: 252, y: 646, photo: 39390685, blurb: "Crates out on the pavement by seven, whatever the weather.", detail: "Mon–Sat" },
  { id: "fernhill-park", name: "Fernhill Park", category: "outdoors", area: "fernhill", x: 196, y: 236, photo: 12589510, blurb: "Forty acres of lawn, a bandstand and the best sunset bench.", detail: "Dawn–dusk" },
  { id: "lido", name: "South Common Lido", category: "outdoors", area: "south-common", x: 918, y: 662, photo: 37187012, blurb: "Heated to 24°, open every day the sun is.", detail: "May–Sep" },
  { id: "ferry", name: "Water Taxi", category: "outdoors", area: "old-port", x: 900, y: 330, photo: 38715564, blurb: "Seven minutes across the Narrows to Gull Island.", detail: "Every 20 min" },
  { id: "lighthouse", name: "Gull Island Light", category: "outdoors", area: "gull-island", x: 1012, y: 182, photo: 693751, blurb: "Climb the 112 steps for the whole bay at once.", detail: "Weekends" },
  { id: "night-market", name: "Lantern Night Market", category: "events", area: "lantern", x: 654, y: 470, photo: 11808088, blurb: "Street food and a brass band under strings of bulbs.", detail: "Fri · 6pm" },
  { id: "amara", name: "Amara Osei", category: "people", area: "lantern", x: 560, y: 196, photo: 39598425, blurb: "Type designer. Runs the Thursday letterpress club.", detail: "Design" },
  { id: "lena", name: "Lena Fischer", category: "people", area: "old-port", x: 836, y: 396, photo: 16046265, blurb: "Harbour pilot by day, choir alto by night.", detail: "Maritime" },
  { id: "tomas", name: "Tomás Vidal", category: "people", area: "terraces", x: 668, y: 626, photo: 36712860, blurb: "Architect restoring the Terraces one stair at a time.", detail: "Architecture" },
  { id: "idris", name: "Idris Haddad", category: "people", area: "millrace", x: 384, y: 588, photo: 12871465, blurb: "Teaches Arabic and makes the market's best coffee.", detail: "Education" },
  { id: "oskar", name: "Oskar Lind", category: "people", area: "fernhill", x: 272, y: 360, photo: 33542593, blurb: "Coaches the Sunday park run and anyone who asks.", detail: "Sport" },
]

export const placeById = (id: string) => PLACES.find((p) => p.id === id)
export const placesById = (ids: string[]) => ids.map(placeById).filter(Boolean) as Place[]
