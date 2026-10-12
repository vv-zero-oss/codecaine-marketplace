import type { PHOTO } from "@/lib/photos"

/**
 * Everything Truant sells and says, in one place. Pages read from here, so a
 * coffee added to `COFFEES` turns up in the shop, the taste map, the
 * subscription builder, the menu and the origin map at once.
 */

export type SeriesId = "recess" | "detour" | "field" | "latebell"

export type Series = {
  id: SeriesId
  name: string
  short: string
  /** What the series tastes like, in a line. */
  line: string
  body: string
  photo: keyof typeof PHOTO
  photoAlt: string
}

export const SERIES: Series[] = [
  {
    id: "recess",
    name: "Recess Series",
    short: "Recess",
    line: "Bright, juicy, a little loud.",
    body: "Light roasts that keep every bit of fruit the farm grew into them. Recess coffees are for filter and for people who like their cup to talk back — they pull lovely as espresso too, if you give them a longer ratio and a minute of patience.",
    photo: "autumnWalk",
    photoAlt: "Two people and a dog walking a leaf-covered forest track",
  },
  {
    id: "detour",
    name: "Detour Series",
    short: "Detour",
    line: "Warm, round, easy to love.",
    body: "Roasted for sweetness and body without a scorched note anywhere. Brown sugar, cocoa, baked fruit — the cup you make on a slow Saturday and then make again, because the first one went too fast.",
    photo: "sunsetLake",
    photoAlt: "A lake at sunset, the sky and its reflection burning orange",
  },
  {
    id: "field",
    name: "Field Trip Series",
    short: "Field Trip",
    line: "Tiny lots. Gone when they're gone.",
    body: "The rarest coffees our producer partners send us: a single terrace, an experimental ferment, forty kilos and no more. We roast each one in small batches the week it lands, and when the drum is empty, it's over until next harvest.",
    photo: "fogCliffs",
    photoAlt: "Sea cliffs half-hidden in fog above a grey, churning cove",
  },
  {
    id: "latebell",
    name: "Late Bell Series",
    short: "Late Bell",
    line: "Dark, sweet, built for milk.",
    body: "Our deepest roasts, taken right to the edge and pulled before they turn bitter. Molasses, dark chocolate, a long smoky finish. Late Bell is what we drink by the fire, and what our cafés pour under oat milk.",
    photo: "campfire",
    photoAlt: "Friends around a campfire, enamel mugs of coffee in hand",
  },
]

export const seriesById = Object.fromEntries(SERIES.map((s) => [s.id, s])) as Record<SeriesId, Series>

export type Process = "Washed" | "Natural" | "Honey" | "Anaerobic" | "Wet-hulled" | "Decaf"

export type Coffee = {
  id: string
  name: string
  series: SeriesId
  country: string
  region: string
  producer: string
  process: Process
  varietal: string
  altitude: string
  notes: [string, string, string]
  /** 12 oz bag price, dollars. */
  price: number
  /** 0–10, for the taste map. */
  sweetness: number
  body: number
  /** 1 light – 5 dark. */
  roast: number
  /** Latitude / longitude of the farm, for the origin map. */
  lat: number
  lon: number
  isNew?: boolean
  limited?: number
}

export const COFFEES: Coffee[] = [
  {
    id: "half-day-4",
    name: "Half Day #4",
    series: "recess",
    country: "Ethiopia",
    region: "Guji, Hambela",
    producer: "Buku Abel washing station",
    process: "Natural",
    varietal: "Heirloom 74158",
    altitude: "2,100 m",
    notes: ["Strawberry jam", "Bergamot", "Cacao nib"],
    price: 22,
    sweetness: 8,
    body: 4,
    roast: 1,
    lat: 5.8,
    lon: 38.9,
    isNew: true,
  },
  {
    id: "hall-pass",
    name: "Hall Pass",
    series: "recess",
    country: "Kenya",
    region: "Nyeri, Othaya",
    producer: "Gura Farmers Cooperative",
    process: "Washed",
    varietal: "SL28, SL34, Ruiru 11",
    altitude: "1,850 m",
    notes: ["Blackcurrant", "Pink grapefruit", "Cane sugar"],
    price: 21,
    sweetness: 6,
    body: 5,
    roast: 1,
    lat: -0.42,
    lon: 36.95,
    isNew: true,
  },
  {
    id: "free-period",
    name: "Free Period",
    series: "recess",
    country: "Burundi",
    region: "Kayanza",
    producer: "Gakenke hill smallholders",
    process: "Honey",
    varietal: "Red Bourbon",
    altitude: "1,900 m",
    notes: ["Red apple", "Hibiscus", "Honey"],
    price: 20,
    sweetness: 7,
    body: 4,
    roast: 2,
    lat: -2.92,
    lon: 29.63,
  },
  {
    id: "the-long-way",
    name: "The Long Way",
    series: "detour",
    country: "Colombia",
    region: "Huila, Pitalito",
    producer: "Finca La Esperanza, the Ortiz family",
    process: "Washed",
    varietal: "Caturra, Castillo",
    altitude: "1,750 m",
    notes: ["Panela", "Baked plum", "Milk chocolate"],
    price: 19,
    sweetness: 8,
    body: 6,
    roast: 3,
    lat: 1.85,
    lon: -76.05,
  },
  {
    id: "back-road",
    name: "Back Road",
    series: "detour",
    country: "Brazil",
    region: "Alta Mogiana",
    producer: "Fazenda Santa Clara",
    process: "Honey",
    varietal: "Yellow Catuaí",
    altitude: "1,150 m",
    notes: ["Peanut brittle", "Cocoa", "Caramel"],
    price: 17,
    sweetness: 7,
    body: 7,
    roast: 3,
    lat: -20.45,
    lon: -47.4,
  },
  {
    id: "scenic-route",
    name: "Scenic Route",
    series: "detour",
    country: "Guatemala",
    region: "Huehuetenango",
    producer: "Asociación Chojil growers",
    process: "Washed",
    varietal: "Bourbon, Typica",
    altitude: "1,800 m",
    notes: ["Toffee", "Orange peel", "Almond"],
    price: 19,
    sweetness: 7,
    body: 6,
    roast: 3,
    lat: 15.32,
    lon: -91.47,
  },
  {
    id: "field-trip-9",
    name: "Field Trip No. 9",
    series: "field",
    country: "Panama",
    region: "Boquete, Volcán Barú",
    producer: "Finca Alto Quiel",
    process: "Natural",
    varietal: "Gesha",
    altitude: "1,700 m",
    notes: ["Jasmine", "White peach", "Earl grey"],
    price: 38,
    sweetness: 9,
    body: 3,
    roast: 1,
    lat: 8.78,
    lon: -82.44,
    limited: 64,
  },
  {
    id: "field-trip-10",
    name: "Field Trip No. 10",
    series: "field",
    country: "Peru",
    region: "Cajamarca, San Ignacio",
    producer: "Nilda Huamán Tocto",
    process: "Anaerobic",
    varietal: "Pink Bourbon",
    altitude: "1,950 m",
    notes: ["Raspberry", "Rum raisin", "Dark honey"],
    price: 29,
    sweetness: 9,
    body: 5,
    roast: 2,
    lat: -5.15,
    lon: -79.0,
    isNew: true,
    limited: 120,
  },
  {
    id: "last-bell",
    name: "Last Bell",
    series: "latebell",
    country: "Sumatra",
    region: "Aceh, Gayo highlands",
    producer: "Ketiara women's cooperative",
    process: "Wet-hulled",
    varietal: "Ateng, Tim Tim",
    altitude: "1,500 m",
    notes: ["Molasses", "Cedar", "Dark chocolate"],
    price: 18,
    sweetness: 5,
    body: 9,
    roast: 5,
    lat: 4.6,
    lon: 96.85,
  },
  {
    id: "snow-day",
    name: "Snow Day",
    series: "latebell",
    country: "Colombia",
    region: "Caldas",
    producer: "Sugarcane-process decaf, Manizales",
    process: "Decaf",
    varietal: "Castillo",
    altitude: "1,600 m",
    notes: ["Fudge", "Black cherry", "Graham cracker"],
    price: 19,
    sweetness: 7,
    body: 8,
    roast: 4,
    lat: 5.07,
    lon: -75.52,
  },
]

export const coffeeById = Object.fromEntries(COFFEES.map((c) => [c.id, c])) as Record<string, Coffee>

/** Bag sizes, with what each costs against the 12 oz price. */
export const SIZES = [
  { id: "12oz", grams: 340, ounces: 12, factor: 1 },
  { id: "2lb", grams: 907, ounces: 32, factor: 2.4 },
  { id: "5lb", grams: 2268, ounces: 80, factor: 5.4 },
] as const
export type SizeId = (typeof SIZES)[number]["id"]

export const GRINDS = ["Whole bean", "Filter", "Espresso", "French press"] as const
export type Grind = (typeof GRINDS)[number]

export const FREE_SHIPPING = 45
export const PROMO_CODE = "TRUANT15"

export const PLACES = [
  {
    name: "The Roastery Bar",
    kind: "Roastery & espresso bar",
    address: "4 Harbor Row, Duluth MN",
    hours: "Mon–Sun · 7 to 4",
    note: "The drum runs Tuesdays and Thursdays. Come and smell it.",
    photo: "roaster" as const,
  },
  {
    name: "Canal Park Window",
    kind: "Walk-up window",
    address: "Pier 2, Canal Park",
    hours: "Daily · 6:30 to 2",
    note: "Coffee to go, a bench and the lift bridge going up.",
    photo: "cafe" as const,
  },
  {
    name: "Up North Cabin",
    kind: "Seasonal café",
    address: "Grand Marais, on the harbour",
    hours: "May–Oct · Thu to Sun",
    note: "Two hours up the shore. Worth every minute of the drive.",
    photo: "lakeCanoe" as const,
  },
]
