/**
 * The events, communities and categories every page draws from — one list,
 * so a run club on the home page is the same run club in Discover.
 */

export type CategoryId = "tech" | "food" | "ai" | "arts" | "climate" | "fitness" | "wellness" | "crypto"

/** A poster's look: a photo with type over it, or flat colour with a mark. */
export type PosterStyle = {
  /** Pexels photo id, when the poster is a photograph. */
  photo?: number
  /** The big word(s) on the poster. */
  title: string
  /** Small line under the title. */
  kicker?: string
  /** Typeface treatment. */
  type: "block" | "script" | "serif" | "outline"
  /** Ground colour (flat posters) and ink colour. */
  ground: string
  ink: string
  /** Where the title sits. */
  place: "top" | "center" | "bottom"
  /** A Lucide icon name for flat posters. */
  mark?: "flame" | "sparkles" | "heart" | "music" | "book" | "code" | "leaf" | "dice"
}

export type FeteEvent = {
  id: string
  name: string
  host: string
  category: CategoryId
  city: string
  venue: string
  /** ISO date. */
  date: string
  time: string
  price: number
  capacity: number
  going: number
  poster: PosterStyle
  blurb: string
}

export const CATEGORIES: { id: CategoryId; label: string; icon: string; tint: string; count: number }[] = [
  { id: "tech", label: "Tech", icon: "keyboard", tint: "text-cat-tech", count: 4210 },
  { id: "food", label: "Food & Drink", icon: "soup", tint: "text-cat-food", count: 2980 },
  { id: "ai", label: "AI", icon: "brain", tint: "text-cat-ai", count: 3640 },
  { id: "arts", label: "Arts & Culture", icon: "palette", tint: "text-cat-arts", count: 2215 },
  { id: "climate", label: "Climate", icon: "earth", tint: "text-cat-climate", count: 860 },
  { id: "fitness", label: "Fitness", icon: "footprints", tint: "text-cat-fitness", count: 1930 },
  { id: "wellness", label: "Wellness", icon: "flower", tint: "text-cat-wellness", count: 1405 },
  { id: "crypto", label: "Crypto", icon: "bitcoin", tint: "text-cat-crypto", count: 1120 },
]

export const CITIES = ["Everywhere", "Lisbon", "Brooklyn", "Mexico City", "Seoul", "Melbourne", "Berlin"] as const

export const EVENTS: FeteEvent[] = [
  {
    id: "dawn-run",
    name: "Dawn Patrol 5K",
    host: "Riverside Striders",
    category: "fitness",
    city: "Brooklyn",
    venue: "Pier 3 lawn",
    date: "2026-10-17",
    time: "06:30",
    price: 0,
    capacity: 120,
    going: 94,
    poster: { title: "LET'S\nRUN", type: "block", ground: "#2d7fd3", ink: "#f3ff8c", place: "bottom", photo: 5965907 },
    blurb: "Easy pace, coffee after, nobody left behind. Bring a friend who swears they hate running.",
  },
  {
    id: "cocktail-hour",
    name: "Cocktail Hour, Volume 9",
    host: "The Late Shift",
    category: "food",
    city: "Lisbon",
    venue: "Rua do Século 14",
    date: "2026-10-18",
    time: "19:00",
    price: 28,
    capacity: 60,
    going: 57,
    poster: { title: "Cocktail Hour", kicker: "Join us & have fun", type: "serif", ground: "#15392b", ink: "#f2e7c6", place: "top", photo: 29748124 },
    blurb: "Three bartenders, three rounds, one long table. Low lights, good ice, better company.",
  },
  {
    id: "keynote-night",
    name: "Open Mic: Founders",
    host: "Small Rooms",
    category: "tech",
    city: "Berlin",
    venue: "Hallesches Haus",
    date: "2026-10-21",
    time: "18:30",
    price: 0,
    capacity: 200,
    going: 168,
    poster: { title: "", type: "block", ground: "#160c1c", ink: "#ffffff", place: "bottom", photo: 13430016 },
    blurb: "Ten founders, five minutes each, no slides allowed. Stories of what nearly didn't work.",
  },
  {
    id: "supper-club",
    name: "Long Table Supper",
    host: "Neighbours Eat",
    category: "food",
    city: "Melbourne",
    venue: "A backyard in Fitzroy",
    date: "2026-10-19",
    time: "18:00",
    price: 45,
    capacity: 24,
    going: 22,
    poster: { title: "", type: "block", ground: "#3a2c22", ink: "#ffffff", place: "bottom", photo: 4809147 },
    blurb: "Twenty-four strangers, six courses, one very long table under the lemon tree.",
  },
  {
    id: "handshake",
    name: "Humans + Robots",
    host: "Signal Path",
    category: "ai",
    city: "Seoul",
    venue: "Seongsu Warehouse",
    date: "2026-10-24",
    time: "14:00",
    price: 15,
    capacity: 300,
    going: 241,
    poster: { title: "HUMANS\n+ ROBOTS", kicker: "for the win", type: "block", ground: "#ffd23f", ink: "#1a1a1a", place: "top", mark: "sparkles" },
    blurb: "A day of demos where the robot does the boring half and you do the interesting one.",
  },
  {
    id: "workshop",
    name: "Sketch & Sip Workshop",
    host: "Loose Lines",
    category: "arts",
    city: "Mexico City",
    venue: "Casa Roma, 2º piso",
    date: "2026-10-20",
    time: "17:00",
    price: 20,
    capacity: 30,
    going: 26,
    poster: { title: "WORKSHOP", type: "block", ground: "#b4a7f5", ink: "#16121f", place: "bottom", mark: "sparkles" },
    blurb: "Pens, paper and a glass of something. No talent required, only curiosity.",
  },
  {
    id: "poker-night",
    name: "Poker Night",
    host: "Felt & Friends",
    category: "food",
    city: "Brooklyn",
    venue: "Back room, Lucky's",
    date: "2026-10-23",
    time: "20:00",
    price: 10,
    capacity: 40,
    going: 31,
    poster: { title: "Poker\nNight", type: "script", ground: "#1d2b25", ink: "#ffffff", place: "top", photo: 3370381 },
    blurb: "Friendly stakes, real chips, snacks on the house. Beginners get a cheat sheet.",
  },
  {
    id: "breathe",
    name: "Breathe: Sunday Reset",
    host: "Slow Mornings",
    category: "wellness",
    city: "Lisbon",
    venue: "Jardim da Estrela",
    date: "2026-10-25",
    time: "09:00",
    price: 12,
    capacity: 50,
    going: 38,
    poster: { title: "BREATHE", type: "outline", ground: "#e7d8cc", ink: "#ffffff", place: "top", photo: 14102390 },
    blurb: "An hour of breathwork in the park, then tea. Mats provided, phones optional.",
  },
  {
    id: "pizza-party",
    name: "Pizza & Pitches",
    host: "Builders' Table",
    category: "tech",
    city: "Brooklyn",
    venue: "Gowanus Loft",
    date: "2026-10-22",
    time: "18:00",
    price: 0,
    capacity: 150,
    going: 133,
    poster: { title: "PIZZA", type: "block", ground: "#f7d34a", ink: "#1b1b1b", place: "center", photo: 3944311 },
    blurb: "Bring a three-minute pitch, leave with a slice and five new collaborators.",
  },
  {
    id: "hack-night",
    name: "Hack Night 042",
    host: "Night Compilers",
    category: "ai",
    city: "Berlin",
    venue: "Factory Görlitzer",
    date: "2026-10-30",
    time: "19:00",
    price: 0,
    capacity: 180,
    going: 177,
    poster: { title: "HACK\nNIGHT", kicker: "Where your crazy ideas become reality", type: "block", ground: "#191a3d", ink: "#ff8ad8", place: "bottom", photo: 6424590 },
    blurb: "Six hours, unlimited coffee, one demo at midnight. Teams form at the door.",
  },
  {
    id: "book-talk",
    name: "Book Talk: Slow Fiction",
    host: "Margins",
    category: "arts",
    city: "Melbourne",
    venue: "Readings Carlton",
    date: "2026-10-27",
    time: "19:30",
    price: 0,
    capacity: 45,
    going: 29,
    poster: { title: "BOOK\nTALK", type: "block", ground: "#ff5a3c", ink: "#ffe14d", place: "center", mark: "book" },
    blurb: "Not a book club — a reading party. Bring what you're reading, swap a page.",
  },
  {
    id: "rooftop",
    name: "Golden Hour Rooftop",
    host: "Upstairs Society",
    category: "food",
    city: "Mexico City",
    venue: "Terraza Condesa",
    date: "2026-10-31",
    time: "17:30",
    price: 18,
    capacity: 90,
    going: 82,
    poster: { title: "golden\nhour", type: "script", ground: "#c9a67e", ink: "#ffffff", place: "bottom", photo: 6760872 },
    blurb: "Spritzes, a DJ who plays only records, and the best sunset in the city.",
  },
  {
    id: "garden-day",
    name: "Plant a Street",
    host: "Green Block Collective",
    category: "climate",
    city: "Berlin",
    venue: "Neukölln Kiez",
    date: "2026-10-26",
    time: "10:00",
    price: 0,
    capacity: 80,
    going: 47,
    poster: { title: "PLANT\nA STREET", type: "block", ground: "#2e7d32", ink: "#eaffc9", place: "top", photo: 26614518 },
    blurb: "Gloves, bulbs and a map of every bare tree pit on the block. Lunch for volunteers.",
  },
  {
    id: "night-cinema",
    name: "Films Under Stars",
    host: "Open Air Reels",
    category: "arts",
    city: "Seoul",
    venue: "Haneul Park lawn",
    date: "2026-10-28",
    time: "19:00",
    price: 8,
    capacity: 400,
    going: 312,
    poster: { title: "UNDER\nSTARS", type: "outline", ground: "#1c2433", ink: "#ffffff", place: "top", photo: 35069835 },
    blurb: "A double feature on the grass. Blankets welcome, popcorn sold by the scoop.",
  },
  {
    id: "clay-studio",
    name: "First Clay",
    host: "Wheel House",
    category: "arts",
    city: "Lisbon",
    venue: "Atelier Graça",
    date: "2026-11-02",
    time: "11:00",
    price: 35,
    capacity: 12,
    going: 12,
    poster: { title: "first\nclay", type: "serif", ground: "#7a5c46", ink: "#fff3e6", place: "top", photo: 10111544 },
    blurb: "Your first pot, on a real wheel, with someone patient beside you. You keep the bowl.",
  },
  {
    id: "dance-floor",
    name: "Records Only",
    host: "Vinyl Sundays",
    category: "food",
    city: "Seoul",
    venue: "Basement 3, Itaewon",
    date: "2026-11-01",
    time: "22:00",
    price: 15,
    capacity: 250,
    going: 198,
    poster: { title: "RECORDS\nONLY", type: "block", ground: "#2a1a4a", ink: "#ff8f6b", place: "bottom", photo: 2240772 },
    blurb: "Four DJs, two decks, zero laptops. Dance until the lights come up.",
  },
  {
    id: "chain-talk",
    name: "Onchain, Explained Slowly",
    host: "Block by Block",
    category: "crypto",
    city: "Lisbon",
    venue: "LX Factory, Room 2",
    date: "2026-11-04",
    time: "18:30",
    price: 0,
    capacity: 120,
    going: 64,
    poster: { title: "SLOW\nCHAIN", type: "block", ground: "#6d3fd1", ink: "#e9ff70", place: "center", mark: "code" },
    blurb: "No hype, no tickers. An hour on how it actually works, with diagrams on paper.",
  },
  {
    id: "fireworks",
    name: "Harbour Lights",
    host: "City Nights",
    category: "arts",
    city: "Melbourne",
    venue: "Docklands promenade",
    date: "2026-11-05",
    time: "20:30",
    price: 0,
    capacity: 2000,
    going: 1640,
    poster: { title: "HARBOUR\nLIGHTS", type: "outline", ground: "#0f1318", ink: "#ffd23f", place: "bottom", photo: 1503520 },
    blurb: "Fireworks over the water at half eight. Food trucks from six.",
  },
]

export const findEvent = (id: string) => EVENTS.find((e) => e.id === id)

/** The posters orbiting the hero, by event id and where each one floats.
 *  x/y are % of the hero; depth sets parallax and size. */
export const HERO_POSTERS: { id: string; x: number; y: number; size: number; depth: number; tilt: number }[] = [
  { id: "book-talk", x: 30, y: 2, size: 128, depth: 0.9, tilt: -2 },
  { id: "keynote-night", x: 21, y: 15, size: 96, depth: 0.5, tilt: 3 },
  { id: "pizza-party", x: 74, y: 3, size: 104, depth: 0.7, tilt: 4 },
  { id: "supper-club", x: 75, y: 18, size: 108, depth: 0.6, tilt: -3 },
  { id: "dawn-run", x: 5, y: 30, size: 76, depth: 0.35, tilt: -4 },
  { id: "handshake", x: 89, y: 30, size: 92, depth: 0.8, tilt: 3 },
  { id: "cocktail-hour", x: 11, y: 50, size: 116, depth: 1, tilt: -2 },
  { id: "workshop", x: 74, y: 48, size: 88, depth: 0.55, tilt: 5 },
  { id: "hack-night", x: 80, y: 66, size: 104, depth: 0.85, tilt: -3 },
  { id: "rooftop", x: 0, y: 75, size: 92, depth: 0.45, tilt: 3 },
  { id: "poker-night", x: 26, y: 78, size: 104, depth: 0.95, tilt: -4 },
  { id: "breathe", x: 57, y: 85, size: 132, depth: 0.65, tilt: 2 },
]

export const UPCOMING_MAJOR = [
  { name: "Lisbon Design Week", dates: "Oct 14 – 19", city: "Lisbon", mark: "LDW", ground: "#14422f", ink: "#c9f5d9" },
  { name: "Seoul Builders Summit", dates: "Oct 22 – 24", city: "Seoul", mark: "SBS", ground: "#ffe1ea", ink: "#c4307c" },
  { name: "Night Markets Festival", dates: "Oct 29 – Nov 2", city: "Mexico City", mark: "NM", ground: "#131517", ink: "#ffd23f" },
  { name: "Open Source Weekend", dates: "Nov 7 – 9", city: "Berlin", mark: "</>", ground: "#e6f1fa", ink: "#0072c4" },
  { name: "Harbour Lights", dates: "Nov 5", city: "Melbourne", mark: "HL", ground: "#fbf1df", ink: "#b5501c" },
]

export const COMMUNITIES = [
  { name: "Riverside Striders", blurb: "Easy-pace morning runs in eleven cities, coffee included at every finish line.", members: 18400, mark: "footprints", ground: "#dff0ff", ink: "#2d7fd3" },
  { name: "Margins", blurb: "Not a book club. A reading party — read with friends, then talk about it over wine.", members: 9200, mark: "book-open", ground: "#131517", ink: "#ffe14d" },
  { name: "Night Compilers", blurb: "The friendliest hack nights going: teams form at the door, demos at midnight.", members: 26100, mark: "code-xml", ground: "#f3ecff", ink: "#6d3fd1" },
  { name: "Loose Lines", blurb: "Drawing evenings for people who stopped drawing at nine. Pens and wine provided.", members: 7300, mark: "pen-tool", ground: "#ffe4ea", ink: "#c4307c" },
  { name: "Upstairs Society", blurb: "Rooftops, records and golden hours, in whichever city has the best sunset this week.", members: 14900, mark: "sun", ground: "#fff3d6", ink: "#b06f00" },
  { name: "Green Block Collective", blurb: "Neighbours planting the street they live on, one tree pit at a time.", members: 5600, mark: "sprout", ground: "#e5f3eb", ink: "#2e7d32" },
  { name: "Slow Mornings", blurb: "Breathwork, tea and quiet company before the weekend gets loud.", members: 8800, mark: "wind", ground: "#e2f2f3", ink: "#2f7f86" },
]

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts)

export const priceLabel = (price: number) => (price === 0 ? "Free" : `$${price}`)
