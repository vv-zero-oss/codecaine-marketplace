import { PHOTOS } from "@/lib/photos"

/** The cloth a volume is bound in — each one a token in index.css. */
export type Cloth = "cloth" | "moss" | "clay" | "kraft"

export type Volume = {
  number: 1 | 2 | 3
  title: string
  subtitle: string
  year: number
  cloth: Cloth
  pages: number
}

export const VOLUMES: Volume[] = [
  { number: 1, title: "Making Room", subtitle: "On homes made slowly", year: 2021, cloth: "cloth", pages: 248 },
  { number: 2, title: "Slow Hands", subtitle: "On learning a craft for life", year: 2023, cloth: "clay", pages: 272 },
  { number: 3, title: "Salt & Timber", subtitle: "On making at the water's edge", year: 2026, cloth: "moss", pages: 296 },
]

export type ProductKind = "book" | "set" | "prints" | "subscription" | "notebook"

export type Product = {
  id: string
  name: string
  kind: ProductKind
  price: number
  /** One line under the name, in small caps. */
  note: string
  description: string
  volume?: 1 | 2 | 3
  /** Cloth editions a book comes in; the first is the default. */
  editions?: Cloth[]
  photos?: number[]
  badge?: "New" | "Last copies" | "Members"
  details: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "vol-3",
    name: "Volume 3 — Salt & Timber",
    kind: "book",
    price: 58,
    note: "296 pages · cloth-bound · shipping now",
    description: "Twelve people who build by hand on the edge of the sea: a board shaper, a weaver, a photographer of plants, a couple restoring a house on a hill. Told over three days with each of them, photographed on film.",
    volume: 3,
    editions: ["moss", "cloth"],
    badge: "New",
    details: ["296 pages, 180 photographs", "Uncoated 150gsm, sewn binding", "Cloth cover, debossed", "24 × 30 cm"],
  },
  {
    id: "vol-2",
    name: "Volume 2 — Slow Hands",
    kind: "book",
    price: 52,
    note: "272 pages · second printing",
    description: "On learning a craft for life — the apprenticeships, the false starts and the decades it takes for a hand to know what it is doing.",
    volume: 2,
    editions: ["clay", "kraft"],
    details: ["272 pages, 164 photographs", "Uncoated 150gsm, sewn binding", "Cloth cover with kraft band", "24 × 30 cm"],
  },
  {
    id: "vol-1",
    name: "Volume 1 — Making Room",
    kind: "book",
    price: 48,
    note: "248 pages · first edition",
    description: "Where it began: homes made slowly by the people who live in them, from a courtyard in Isfahan to a single-chair flat in Copenhagen.",
    volume: 1,
    editions: ["cloth"],
    badge: "Last copies",
    details: ["248 pages, 150 photographs", "Uncoated 140gsm, sewn binding", "Cloth cover, foil title", "24 × 30 cm"],
  },
  {
    id: "set",
    name: "The Three Volumes, slipcased",
    kind: "set",
    price: 142,
    note: "All three · timber slipcase",
    description: "Volumes 1 to 3 in a slipcase made from offcuts by a joiner from Volume 2. Each case is numbered; the grain is never the same twice.",
    details: ["Volumes 1, 2 and 3", "Solid oak slipcase, oiled", "Numbered edition of 400", "Saves $16 on the three"],
  },
  {
    id: "prints",
    name: "Field Prints, set of four",
    kind: "prints",
    price: 64,
    note: "Archival pigment · 20 × 25 cm",
    description: "Four photographs from the Volume 3 visits, printed on cotton rag and signed on the back by the photographer.",
    photos: [PHOTOS.houseboats, PHOTOS.loom, PHOTOS.teacup, PHOTOS.cabinLamp],
    details: ["Four prints, 20 × 25 cm", "Cotton rag, 308gsm", "Signed on the reverse", "Packed flat between board"],
  },
  {
    id: "subscription",
    name: "Annual membership",
    kind: "subscription",
    price: 120,
    note: "Each new volume · the letters · 10% off",
    description: "Every new volume posted before it goes on sale, the quarterly letter from the field, and ten percent off everything else, for as long as you stay.",
    badge: "Members",
    details: ["The next volume, before release", "Four letters a year, by post", "10% off the shop", "Pause or cancel any time"],
  },
  {
    id: "notebook",
    name: "The Visit Notebook",
    kind: "notebook",
    price: 24,
    note: "128 pages · dot grid · lay-flat",
    description: "The same notebook our editors carry on every visit: dot-grid, lay-flat, with a pocket for the receipts and the pressed leaves.",
    editions: ["kraft", "moss"],
    details: ["128 pages, 5mm dot grid", "Lay-flat thread binding", "Rear pocket", "A5"],
  },
]

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

/** Shipping is free over this subtotal — the bag shows how far there is to go. */
export const FREE_SHIPPING = 100

/** The spreads inside Volume 3, as the open book on the home page shows them. */
export type Spread = { folio: number; kicker: string; quote: string; body: string; photo: number; caption: string }

export const SPREADS: Spread[] = [
  {
    folio: 14,
    kicker: "Inés & Teo Marchetti",
    quote: "“We stopped buying things for the house. Now the house tells us what it is missing, and usually it is nothing.”",
    body: "The kitchen came first. Before there was a bed upstairs there was a table downstairs — a slab of reclaimed elm found behind a boatyard, still smelling faintly of diesel. They ate on it, argued on it, and for one winter slept beside it while the roof was redone.",
    photo: PHOTOS.midcenturyRoom,
    caption: "The front room, late afternoon.",
  },
  {
    folio: 62,
    kicker: "Nalu Kahale",
    quote: "“Every board starts as a tree somebody else gave up on.”",
    body: "The shed is stacked to the rafters with blanks, ribs and finished boards waiting for owners. He works only with wood that has already fallen — after storms, from clearings, from a neighbour's yard — and rides each board before he lets it go.",
    photo: PHOTOS.boards,
    caption: "Boards waiting for owners.",
  },
  {
    folio: 118,
    kicker: "Maren Holt",
    quote: "“The loom keeps time better than I do. I just try not to interrupt it.”",
    body: "The loom came from a schoolhouse that closed in the seventies, in pieces, with no instructions. Rebuilding it took a summer. Learning it took the next five. Each blanket takes a month, and no two are dyed the same way twice.",
    photo: PHOTOS.loom,
    caption: "Warp threads, the second week.",
  },
  {
    folio: 204,
    kicker: "Emre Kaya",
    quote: "“I wait a year before I look at the negatives. By then I can see what I got.”",
    body: "He photographs the same three streets near the ferry terminal, over and over, in every season, and prints in a bathroom darkroom with the window taped over. The prints that survive end up pinned along the hallway.",
    photo: PHOTOS.library,
    caption: "The hallway archive.",
  },
]
