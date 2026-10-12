/**
 * What Side B sells: coffee by the bag, and the merch that pays for the
 * record budget. Every card, the shop's filters, quick view, the cart and
 * the subscription builder read from here.
 */

export type Roast = "Light" | "Medium" | "Dark"
export type LabelTone = "honey" | "sky" | "moss" | "lilac" | "ember" | "paper"

export type Coffee = {
  id: string
  name: string
  origin: string
  region: string
  producer: string
  process: "Washed" | "Natural" | "Honey" | "Decaf (sugarcane)"
  roast: Roast
  /** 0 = lightest, 1 = darkest — where the marker sits on the roast bar */
  roastLevel: number
  notes: string[]
  /** 1–5 */
  sweetness: number
  acidity: number
  complexity: number
  price: number
  label: LabelTone
  badge?: "new" | "limited" | "house"
  story: string
  pairsWith: string
}

export const COFFEES: Coffee[] = [
  {
    id: "side-b-blend",
    name: "Side B Blend",
    origin: "Colombia, Ethiopia",
    region: "Huila · Sidama",
    producer: "Two co-ops, one bag",
    process: "Washed",
    roast: "Medium",
    roastLevel: 0.52,
    notes: ["Caramel", "Orange peel", "Milk chocolate"],
    sweetness: 4,
    acidity: 3,
    complexity: 3,
    price: 19,
    label: "honey",
    badge: "house",
    story: "The one we pour all day at both bars. Round enough for a flat white, bright enough to drink black while the record runs out.",
    pairsWith: "Sunday-morning soul",
  },
  {
    id: "deep-cut",
    name: "Deep Cut",
    origin: "Guatemala",
    region: "Huehuetenango",
    producer: "Finca La Bolsa",
    process: "Washed",
    roast: "Dark",
    roastLevel: 0.84,
    notes: ["Stewed plum", "Molasses", "Cocoa nib"],
    sweetness: 4,
    acidity: 2,
    complexity: 3,
    price: 18,
    label: "paper",
    story: "Taken just past second crack for the people who like their coffee to have a bassline. Heavy, syrupy, built for milk.",
    pairsWith: "Dub, played loud",
  },
  {
    id: "liner-notes",
    name: "Liner Notes",
    origin: "Kenya",
    region: "Nyeri",
    producer: "Gakuyuini Factory",
    process: "Washed",
    roast: "Light",
    roastLevel: 0.2,
    notes: ["Blackcurrant", "Grapefruit", "Raw sugar"],
    sweetness: 3,
    acidity: 5,
    complexity: 4,
    price: 24,
    label: "moss",
    badge: "new",
    story: "Sparkling and a little rude. Brew it as a pour-over and read the small print — there is a lot going on.",
    pairsWith: "Afrobeat on a sunny step",
  },
  {
    id: "slow-fade",
    name: "Slow Fade",
    origin: "Ethiopia",
    region: "Guji",
    producer: "Hambela Alaka washing station",
    process: "Natural",
    roast: "Light",
    roastLevel: 0.28,
    notes: ["Blueberry", "Maple", "Cacao"],
    sweetness: 5,
    acidity: 3,
    complexity: 4,
    price: 23,
    label: "lilac",
    badge: "new",
    story: "Dried whole in the cherry for three weeks. Jammy, round and sweet enough to taste like a pancake stack.",
    pairsWith: "Late-night jazz",
  },
  {
    id: "needle-drop",
    name: "Needle Drop",
    origin: "Colombia",
    region: "Pitalito, Huila",
    producer: "Rosa Elena Muñoz",
    process: "Honey",
    roast: "Medium",
    roastLevel: 0.44,
    notes: ["Red apple", "Panela", "Toasted almond"],
    sweetness: 4,
    acidity: 3,
    complexity: 3,
    price: 21,
    label: "sky",
    story: "Rosa Elena's third harvest with us. Honey-processed, clean and endlessly drinkable — the coffee we bring to friends' houses.",
    pairsWith: "Cumbia, kitchen volume",
  },
  {
    id: "feedback-loop",
    name: "Feedback Loop",
    origin: "Brazil",
    region: "Cerrado Mineiro",
    producer: "Fazenda Pedra Branca",
    process: "Natural",
    roast: "Medium",
    roastLevel: 0.62,
    notes: ["Hazelnut", "Brown butter", "Dark cherry"],
    sweetness: 4,
    acidity: 2,
    complexity: 2,
    price: 17,
    label: "ember",
    story: "Our espresso. Thick, nutty, forgiving on a home machine and very kind to oat milk.",
    pairsWith: "Garage rock",
  },
  {
    id: "hidden-track",
    name: "Hidden Track",
    origin: "Panama",
    region: "Boquete",
    producer: "Finca Lérida",
    process: "Washed",
    roast: "Light",
    roastLevel: 0.16,
    notes: ["Jasmine", "Bergamot", "White peach"],
    sweetness: 4,
    acidity: 4,
    complexity: 5,
    price: 34,
    label: "paper",
    badge: "limited",
    story: "Forty kilos, once a year. Floral, tea-like and gone by the time the next pressing comes in.",
    pairsWith: "Ambient, headphones on",
  },
  {
    id: "b-side-decaf",
    name: "B-Side Decaf",
    origin: "Peru",
    region: "Cajamarca",
    producer: "Cooperativa Sol & Café",
    process: "Decaf (sugarcane)",
    roast: "Medium",
    roastLevel: 0.56,
    notes: ["Toffee", "Red grape", "Cocoa"],
    sweetness: 4,
    acidity: 2,
    complexity: 2,
    price: 18,
    label: "honey",
    story: "Decaffeinated with sugarcane, so it still tastes like coffee. The after-ten-o'clock record.",
    pairsWith: "Slowcore at midnight",
  },
]

export const SIZES = [
  { id: "12oz", label: "12 oz", multiplier: 1 },
  { id: "2lb", label: "2 lb", multiplier: 2.4 },
  { id: "5lb", label: "5 lb", multiplier: 5.4 },
] as const

export const GRINDS = ["Whole bean", "Espresso", "Pour-over", "French press"] as const

export type Merch = {
  id: string
  name: string
  kind: "tote" | "tee" | "mug" | "slipmat" | "pin" | "beanie"
  price: number
  blurb: string
  tone: LabelTone
}

export const MERCH: Merch[] = [
  { id: "crate-tote", name: "Crate Digger Tote", kind: "tote", price: 22, blurb: "Heavy canvas, fits twelve LPs or four bags of coffee. Screen-printed in the shop.", tone: "paper" },
  { id: "house-tee", name: "House Band Tee", kind: "tee", price: 32, blurb: "Garment-dyed olive, front and back print. Runs a little big, like the drummer.", tone: "moss" },
  { id: "diner-mug", name: "Late Set Mug", kind: "mug", price: 18, blurb: "Stoneware, twelve ounces, thick enough to keep a long-play warm.", tone: "ember" },
  { id: "slipmat", name: "Spin Cycle Slipmat", kind: "slipmat", price: 16, blurb: "Felt slipmat for your turntable, printed with our sun-and-grooves mark.", tone: "honey" },
  { id: "beanie", name: "Roaster's Beanie", kind: "beanie", price: 26, blurb: "Rib-knit merino in rust. What the roasting crew wears at 5 a.m.", tone: "ember" },
  { id: "pin", name: "Needle Pin", kind: "pin", price: 9, blurb: "Hard enamel, gold plate, rubber clutch. For the jacket that has seen things.", tone: "sky" },
]

export function findCoffee(id: string) {
  return COFFEES.find((coffee) => coffee.id === id)
}
export function findMerch(id: string) {
  return MERCH.find((item) => item.id === id)
}

export function money(n: number) {
  return `$${n.toFixed(2)}`
}
