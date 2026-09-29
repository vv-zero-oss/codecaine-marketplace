/**
 * Every word and every photograph on the page, in one place.
 *
 * Photography is from Pexels (https://www.pexels.com), credited in the footer.
 */

export function photo(id: number, width = 1920) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const brand = {
  name: "Luna Residence",
  word: ["Luna", "Residence"],
  town: "Altea",
  region: ["Costa", "Blanca"],
}

export const nav = {
  primary: { label: ["Choose", "a residence"], href: "#residences" },
  secondary: [
    { label: "Book a viewing", href: "#contact" },
    { label: "Contact", href: "#contact" },
  ],
}

export const hero = {
  left: "A home",
  right: "For every season",
  image: photo(16901482, 2400),
  modes: [
    { id: "day", label: "By day" },
    { id: "night", label: "By night" },
  ],
} as const

export const notes = {
  image: photo(26859066, 2400),
  cta: "View available residences",
  points: [
    {
      id: "stone",
      x: 58,
      y: 45,
      title: "Built in limestone",
      body: "Hand-dressed limestone walls were chosen because they weather gracefully: each summer the façades turn a shade warmer instead of older.",
    },
    {
      id: "air",
      x: 27,
      y: 38,
      title: "Light & air",
      body: "Deep terraces and planted pergolas pull the evening breeze through every home and keep the midday sun off the glass.",
    },
    {
      id: "water",
      x: 75,
      y: 70,
      title: "Water at the centre",
      body: "A saltwater pool sits at the heart of the gardens, so every residence opens onto the same quiet view.",
    },
  ],
}

export const reasonsIntro = {
  image: photo(36676879, 2400),
  arc: ["Three", "reasons", "to", "choose", "Luna"],
  tagline: ["A home to live in —", "and to come back to"],
}

export const reasons = [
  {
    title: "A real-life address",
    images: [photo(6010269, 1200), photo(31304207, 1200)],
    body: "Ten minutes from the old town, five from the marina and a short walk to the sea — Luna sits where the Costa Blanca is lived in all year, not only in August.",
  },
  {
    title: "Made to last",
    images: [photo(32226004, 1200), photo(28586222, 1200)],
    body: "Limestone, oak and lime plaster, chosen for how they will look in thirty years. Architecture that settles into the coast rather than competing with it.",
  },
  {
    title: "A small community",
    images: [photo(17086149, 1200), photo(30820133, 1200)],
    body: "Twenty-two homes behind one gate, arranged around gardens instead of corridors, so neighbours stay neighbours and privacy stays private.",
  },
]

export const reasonsFooter = ["Designed as a village,", "not a block"]

export const quote = {
  image: photo(28586234, 2400),
  text: "We replaced corridors with garden paths — so Luna feels less like a building and more like a handful of private houses on one hill",
  by: ["The design studio", "Luna Residence"],
}

export const story = {
  bloom: photo(10364567, 1400),
  bloomAlt: photo(15210283, 1400),
  concept: {
    eyebrow: "The idea",
    title:
      "Luna Residence is a gated enclave of twenty-two homes, shaped around privacy, slow mornings and the light of the Mediterranean",
    body: "Drawn from the whitewashed villages of the Marina Alta, the project pairs clean contemporary lines with warm stone, native planting and rooms that open straight onto the terrace.",
  },
  mile: { lines: ["The", "slow", "coast"], country: "Spain", image: photo(24807127, 1600) },
  between: {
    title: "Between Altea and Calpe",
    body: "Beaches, coves, golf and the old-town squares are all a short drive away, yet the gardens stay quiet. Every essential is close by, so life here is planned around staying — not commuting.",
  },
  coast: {
    lines: ["The sea you pictured", "yours", "by summer"],
    stops: [
      { name: "Alicante airport", time: "50 min" },
      { name: "Benidorm", time: "15 min" },
      { name: "Altea", time: "5 min" },
      { name: "Luna", time: "" },
      { name: "Calpe", time: "10 min" },
      { name: "Jávea", time: "30 min" },
    ],
  },
}

export const residences = {
  aerial: photo(38986912, 2400),
  types: [
    {
      name: "Garden + lower level",
      bedrooms: "3",
      area: "168 — 196",
      body: "A walled garden, a private lower level and a door straight onto the pool lawn.",
      cta: "Explore garden homes",
      image: photo(38097930, 1400),
    },
    {
      name: "Sea-view first floor",
      bedrooms: "2",
      area: "104 — 132",
      body: "Single-level living wrapped by a deep terrace that faces the bay.",
      cta: "Explore first-floor homes",
      image: photo(26747978, 1400),
    },
    {
      name: "Penthouse + solarium",
      bedrooms: "3",
      area: "188 — 240",
      body: "A duplex crowned by a rooftop solarium, an outdoor kitchen and a plunge pool.",
      cta: "Explore penthouses",
      image: photo(24807127, 1400),
    },
  ],
  statement:
    "Homes range from 104 to 240 m², in single-level and duplex layouts, each with a generous terrace or a rooftop solarium.",
}

export const amenities = [
  {
    name: "Gated entrance",
    caption: "One quiet gate, a concierge lodge and gardens that belong only to residents",
    image: photo(30820133, 2400),
  },
  {
    name: "Saltwater pool",
    caption: "A saltwater pool, a shallow children's pool and sun terraces facing west",
    image: photo(28586227, 2400),
  },
  {
    name: "Spa & sauna",
    caption: "A cedar sauna, steam room and treatment suite beneath the gardens",
    image: photo(36077580, 2400),
  },
  {
    name: "Native gardens",
    caption: "Olive, carob and rosemary planted to need little water and give a lot of shade",
    image: photo(16959786, 2400),
  },
  {
    name: "Rooftop solariums",
    caption: "Private roof terraces with outdoor showers and a view that runs to Ifach rock",
    image: photo(32226004, 2400),
  },
]

export const space = {
  lines: ["The", "space", "to"],
  script: "Live in",
  images: [photo(15210283, 1200), photo(24807127, 1600), photo(38097930, 1000)],
  statement: "Every detail is chosen to make a home that feels calm, easy and good to come back to",
  specs:
    "Underfloor heating in every room. Zoned climate control. Motorised aluminium shutters. Wiring ready for home automation and quiet, efficient heat pumps.",
  upgrades: ["Private jacuzzi", "EV charging point", "Solar panels"],
  interior: photo(26747978, 2400),
}

export const architecture = {
  word: "Architecture",
  image: photo(31068011, 2400),
  text: "Luna pairs clean contemporary lines with the warmth and texture of the Mediterranean",
  by: ["By the design studio", "Architecture & landscape"],
}

export const credits = {
  tagline: ["A place to live — to return to", "year after year"],
  items: [
    { title: "Developer", body: "Casa Luna Developments, building on the Costa Blanca since 1998." },
    { title: "Sales & marketing", body: "An in-house team at the sales office in Altea, open six days a week." },
    { title: "Licence granted", sup: "2026", body: "Building licence granted and works under way; first keys in spring 2028." },
  ],
  bloom: photo(10364567, 1400),
}

export const seaViews = {
  lines: ["Open", "sea views"],
  sub: "From every rooftop",
  image: photo(24807127, 2400),
  cta: "View available residences",
}

export const contact = {
  strip: photo(17086149, 2000),
  phone: "+34 (965) 120-480",
  tel: "+34965120480",
  office: "Sales office",
  address: ["Avenida del Mar 14, 03590", "Altea, Alicante, Spain"],
  legal: ["Luna Residence.", "©2026 All rights reserved"],
  links: ["Privacy policy", "Terms of use"],
  credit: ["Photography", "Pexels"],
}
