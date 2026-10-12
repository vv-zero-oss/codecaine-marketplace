import type { PHOTO } from "@/lib/photos"

/**
 * The field notes: one chapter per trip, with what we paid. Prices are
 * dollars per pound of green coffee, free on board, against the commodity
 * reference the same week. Truant and its producers are fictional.
 */
export type Origin = {
  id: string
  country: string
  region: string
  coffeeIds: string[]
  lat: number
  lon: number
  title: string
  story: string
  photo: keyof typeof PHOTO
  photoAlt: string
  paid: number
  since: number
}

export const C_MARKET = 2.1

export const ORIGINS: Origin[] = [
  {
    id: "ethiopia",
    country: "Ethiopia",
    region: "Guji, Hambela",
    coffeeIds: ["half-day-4"],
    lat: 5.8,
    lon: 38.9,
    title: "Drying beds at 2,100 metres",
    story: "Buku Abel turns its naturals every forty minutes for three weeks, by hand, on raised beds you can see from the road. We arrived the year the station built a second row, and have bought the top lot every harvest since.",
    photo: "cherries",
    photoAlt: "Red coffee cherries drying on wooden raised beds",
    paid: 5.4,
    since: 2019,
  },
  {
    id: "kenya",
    country: "Kenya",
    region: "Nyeri, Othaya",
    coffeeIds: ["hall-pass"],
    lat: -0.42,
    lon: 36.95,
    title: "A co-op that cups everything",
    story: "Gura's 1,400 members deliver cherry the same afternoon it's picked, and the factory manager cups every day's lot before it's sold. We buy the AA from the second fortnight, when the SL28 is at its most blackcurrant.",
    photo: "sorting",
    photoAlt: "A farmer sorting coffee beans under drying racks",
    paid: 6.1,
    since: 2020,
  },
  {
    id: "colombia",
    country: "Colombia",
    region: "Huila, Pitalito",
    coffeeIds: ["the-long-way", "snow-day"],
    lat: 1.85,
    lon: -76.05,
    title: "The Ortiz family's long way",
    story: "Three generations, eleven hectares, and a fermentation tank Mauricio built out of an old milk cooler. The Long Way is their washed Caturra — the first coffee we ever roasted, and still the one we drink most.",
    photo: "picker",
    photoAlt: "A smiling harvester picking ripe coffee cherries",
    paid: 4.6,
    since: 2017,
  },
  {
    id: "guatemala",
    country: "Guatemala",
    region: "Huehuetenango",
    coffeeIds: ["scenic-route"],
    lat: 15.32,
    lon: -91.47,
    title: "Above the dry winds",
    story: "Warm air from Mexico keeps frost off these slopes, which is why coffee grows here at 1,800 metres. The Chojil growers share a wet mill and a truck, and split everything we pay above the floor between them.",
    photo: "raking",
    photoAlt: "A man raking coffee beans across a drying patio",
    paid: 4.2,
    since: 2021,
  },
  {
    id: "panama",
    country: "Panama",
    region: "Boquete, Volcán Barú",
    coffeeIds: ["field-trip-9"],
    lat: 8.78,
    lon: -82.44,
    title: "Forty kilos of Gesha",
    story: "Alto Quiel's top terrace gives forty kilos a year if the wind is kind. It is the most expensive coffee we buy by a distance, and the one Field Trip exists for.",
    photo: "fogCliffs",
    photoAlt: "Sea cliffs disappearing into fog",
    paid: 24,
    since: 2023,
  },
  {
    id: "sumatra",
    country: "Sumatra",
    region: "Aceh, Gayo",
    coffeeIds: ["last-bell"],
    lat: 4.6,
    lon: 96.85,
    title: "The women of Ketiara",
    story: "A cooperative founded and run by women, wet-hulling the way Gayo always has. Last Bell's cedar and molasses come from the process as much as the roast.",
    photo: "drum",
    photoAlt: "Roasted coffee beans turning in a roaster's cooling tray",
    paid: 4.4,
    since: 2022,
  },
]

export const PRODUCERS = [
  { name: "Mauricio Ortiz", place: "Finca La Esperanza, Colombia", quote: "They taste every lot before they price it. Most buyers taste the price first.", photo: "picker" as const },
  { name: "Nilda Huamán Tocto", place: "San Ignacio, Peru", quote: "Truant paid for the anaerobic tanks before they'd tasted what came out of them.", photo: "sorting" as const },
  { name: "Abel Tesfaye Dube", place: "Buku Abel station, Ethiopia", quote: "Six harvests. The same people at the table every time — that's the whole thing.", photo: "cherries" as const },
  { name: "Dani Okafor", place: "Head roaster, Duluth", quote: "If a curve isn't good enough to print on the bag, the batch isn't good enough to sell.", photo: "roaster" as const },
]
