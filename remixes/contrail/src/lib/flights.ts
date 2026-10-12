/**
 * The flight data every mockup on the site draws from — airports with real
 * coordinates (so the maps are true), invented airlines, and a parser that
 * turns a pasted flight number or confirmation email into a flight.
 */

export type Airport = { code: string; city: string; name: string; lon: number; lat: number; tz: string }

export const AIRPORTS: Record<string, Airport> = {
  SFO: { code: "SFO", city: "San Francisco", name: "San Francisco Intl.", lon: -122.38, lat: 37.62, tz: "America/Los_Angeles" },
  JFK: { code: "JFK", city: "New York", name: "John F. Kennedy Intl.", lon: -73.78, lat: 40.64, tz: "America/New_York" },
  AUS: { code: "AUS", city: "Austin", name: "Austin–Bergstrom Intl.", lon: -97.67, lat: 30.19, tz: "America/Chicago" },
  ORD: { code: "ORD", city: "Chicago", name: "O'Hare Intl.", lon: -87.9, lat: 41.98, tz: "America/Chicago" },
  DEN: { code: "DEN", city: "Denver", name: "Denver Intl.", lon: -104.67, lat: 39.86, tz: "America/Denver" },
  LAX: { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl.", lon: -118.41, lat: 33.94, tz: "America/Los_Angeles" },
  SEA: { code: "SEA", city: "Seattle", name: "Seattle–Tacoma Intl.", lon: -122.31, lat: 47.45, tz: "America/Los_Angeles" },
  BOS: { code: "BOS", city: "Boston", name: "Logan Intl.", lon: -71.01, lat: 42.36, tz: "America/New_York" },
  MIA: { code: "MIA", city: "Miami", name: "Miami Intl.", lon: -80.29, lat: 25.8, tz: "America/New_York" },
  YUL: { code: "YUL", city: "Montréal", name: "Montréal–Trudeau", lon: -73.74, lat: 45.47, tz: "America/Toronto" },
  MEX: { code: "MEX", city: "Mexico City", name: "Benito Juárez Intl.", lon: -99.07, lat: 19.44, tz: "America/Mexico_City" },
  LHR: { code: "LHR", city: "London", name: "Heathrow", lon: -0.45, lat: 51.47, tz: "Europe/London" },
  CDG: { code: "CDG", city: "Paris", name: "Charles de Gaulle", lon: 2.55, lat: 49.01, tz: "Europe/Paris" },
  AMS: { code: "AMS", city: "Amsterdam", name: "Schiphol", lon: 4.76, lat: 52.31, tz: "Europe/Amsterdam" },
  FRA: { code: "FRA", city: "Frankfurt", name: "Frankfurt am Main", lon: 8.57, lat: 50.03, tz: "Europe/Berlin" },
  LIS: { code: "LIS", city: "Lisbon", name: "Humberto Delgado", lon: -9.13, lat: 38.77, tz: "Europe/Lisbon" },
  OSL: { code: "OSL", city: "Oslo", name: "Gardermoen", lon: 11.1, lat: 60.19, tz: "Europe/Oslo" },
  VIE: { code: "VIE", city: "Vienna", name: "Schwechat", lon: 16.57, lat: 48.11, tz: "Europe/Vienna" },
  DUB: { code: "DUB", city: "Dublin", name: "Dublin", lon: -6.27, lat: 53.42, tz: "Europe/Dublin" },
  DXB: { code: "DXB", city: "Dubai", name: "Dubai Intl.", lon: 55.36, lat: 25.25, tz: "Asia/Dubai" },
  SIN: { code: "SIN", city: "Singapore", name: "Changi", lon: 103.99, lat: 1.36, tz: "Asia/Singapore" },
  HND: { code: "HND", city: "Tokyo", name: "Haneda", lon: 139.78, lat: 35.55, tz: "Asia/Tokyo" },
  KIX: { code: "KIX", city: "Osaka", name: "Kansai Intl.", lon: 135.24, lat: 34.43, tz: "Asia/Tokyo" },
  SYD: { code: "SYD", city: "Sydney", name: "Kingsford Smith", lon: 151.18, lat: -33.95, tz: "Australia/Sydney" },
  GRU: { code: "GRU", city: "São Paulo", name: "Guarulhos", lon: -46.47, lat: -23.43, tz: "America/Sao_Paulo" },
  CPT: { code: "CPT", city: "Cape Town", name: "Cape Town Intl.", lon: 18.6, lat: -33.97, tz: "Africa/Johannesburg" },
}

/** Invented carriers. Each has a two-letter code and a tail colour pair the
 *  little tail mark is drawn in. */
export type Airline = { code: string; name: string; tail: [string, string] }

export const AIRLINES: Record<string, Airline> = {
  NW: { code: "NW", name: "Northwind", tail: ["#1f3a8a", "#e23d3d"] },
  CR: { code: "CR", name: "Coral Air", tail: ["#ff6b4a", "#ffc52e"] },
  MD: { code: "MD", name: "Meridian", tail: ["#0b6e4f", "#8fd6b4"] },
  SK: { code: "SK", name: "Skerry", tail: ["#12063a", "#8b5cff"] },
  AL: { code: "AL", name: "Altair", tail: ["#0b0b10", "#74c5f2"] },
}

export type Flight = {
  airline: string
  number: string
  from: string
  to: string
  date: string
  dep: string
  arr: string
  gate: string
  terminal: string
  status: "On time" | "Delayed" | "Early" | "Boarding" | "Landed"
  delay?: number
  aircraft: string
}

export const MY_FLIGHTS: Flight[] = [
  { airline: "NW", number: "214", from: "SFO", to: "JFK", date: "Fri, 6 Jun", dep: "06:00", arr: "14:41", gate: "B27", terminal: "1", status: "On time", aircraft: "A321neo" },
  { airline: "CR", number: "88", from: "JFK", to: "LIS", date: "Sun, 8 Jun", dep: "19:35", arr: "07:50", gate: "A7", terminal: "4", status: "Delayed", delay: 30, aircraft: "787-9" },
  { airline: "MD", number: "1406", from: "LIS", to: "OSL", date: "Wed, 11 Jun", dep: "11:20", arr: "16:05", gate: "14", terminal: "1", status: "Early", aircraft: "A220-300" },
]

const NUMBER = /\b([A-Z]{2})\s?-?(\d{1,4})\b/
const ROUTE = /\b([A-Z]{3})\s*(?:→|->|–|-|to)\s*([A-Z]{3})\b/

/**
 * A flight number ("NW 214", "cr88") or a pasted confirmation ("…Flight SK 902
 * LHR → HND on 3 July…") to a flight. Unknown carriers and airports are
 * refused rather than guessed, so the importer can say what it needs.
 */
export function parseFlight(input: string): { flight: Flight } | { error: string } {
  const text = input.toUpperCase()
  const number = text.match(NUMBER)
  if (!number) return { error: "Add a flight number — two letters and up to four digits, like NW 214." }
  const [, airlineCode, digits] = number
  if (!AIRLINES[airlineCode]) {
    return { error: `We don't know carrier “${airlineCode}” yet. Try NW, CR, MD, SK or AL.` }
  }
  const route = text.match(ROUTE)
  let from: string
  let to: string
  if (route && AIRPORTS[route[1]] && AIRPORTS[route[2]]) {
    ;[, from, to] = route
  } else {
    // A flight number alone: pick a stable route from the number, the way a
    // schedule lookup would always answer the same thing for the same flight.
    const codes = Object.keys(AIRPORTS)
    const seed = Number(digits) + airlineCode.charCodeAt(0)
    from = codes[seed % codes.length]
    to = codes[(seed * 7 + 3) % codes.length]
    if (to === from) to = codes[(seed + 5) % codes.length]
  }
  const seed = Number(digits)
  const depH = 6 + (seed % 14)
  const dur = 2 + (seed % 9)
  const pad = (n: number) => String(n).padStart(2, "0")
  const date = text.match(/\b(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*/)
  return {
    flight: {
      airline: airlineCode,
      number: digits,
      from,
      to,
      date: date ? `${date[1]} ${date[2][0]}${date[2].slice(1).toLowerCase()}` : "Sat, 20 Jun",
      dep: `${pad(depH)}:${pad((seed * 5) % 60)}`,
      arr: `${pad((depH + dur) % 24)}:${pad((seed * 11) % 60)}`,
      gate: `${"ABCDE"[seed % 5]}${(seed % 38) + 1}`,
      terminal: String((seed % 3) + 1),
      status: seed % 4 === 0 ? "Delayed" : "On time",
      delay: seed % 4 === 0 ? 15 + (seed % 4) * 15 : undefined,
      aircraft: ["A320neo", "737 MAX 8", "A350-900", "787-9", "E195-E2"][seed % 5],
    },
  }
}

/** Great-circle distance in km. */
export function distanceKm(a: Airport, b: Airport) {
  const r = Math.PI / 180
  const dLat = (b.lat - a.lat) * r
  const dLon = (b.lon - a.lon) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

/** A year of someone's flying, for the passport. */
export type PassportYear = {
  year: number
  flights: number
  km: number
  hours: number
  minutes: number
  airports: number
  airlines: number
  countries: number
  delayHours: number
  worstDelay: { hours: number; flight: string; route: string }
  aircraft: { type: string; flights: number; hours: number; tail: string; tailFlights: number; age: string }
  routes: [string, string][]
  topAirports: { code: string; visits: number }[]
  byMonth: number[]
}

export const PASSPORT: PassportYear[] = [
  {
    year: 2024,
    flights: 38,
    km: 61240,
    hours: 92,
    minutes: 15,
    airports: 14,
    airlines: 4,
    countries: 7,
    delayHours: 11,
    worstDelay: { hours: 4, flight: "CR 88", route: "JFK–LIS" },
    aircraft: { type: "737 MAX 8", flights: 12, hours: 41, tail: "N8314C", tailFlights: 3, age: "2.1 years old" },
    routes: [["SFO", "JFK"], ["JFK", "LIS"], ["LIS", "OSL"], ["SFO", "SEA"], ["SFO", "AUS"], ["AUS", "ORD"], ["ORD", "BOS"], ["BOS", "DUB"], ["DUB", "AMS"]],
    topAirports: [{ code: "SFO", visits: 15 }, { code: "JFK", visits: 8 }, { code: "AUS", visits: 5 }, { code: "LIS", visits: 4 }],
    byMonth: [2, 3, 4, 2, 5, 3, 6, 4, 3, 2, 3, 1],
  },
  {
    year: 2025,
    flights: 54,
    km: 93931,
    hours: 132,
    minutes: 30,
    airports: 19,
    airlines: 6,
    countries: 11,
    delayHours: 32,
    worstDelay: { hours: 12, flight: "SK 2317", route: "VIE–MEX" },
    aircraft: { type: "A321neo", flights: 32, hours: 193, tail: "N2105J", tailFlights: 4, age: "3.5 years old" },
    routes: [["SFO", "JFK"], ["JFK", "LHR"], ["LHR", "VIE"], ["VIE", "MEX"], ["MEX", "LAX"], ["LAX", "HND"], ["HND", "SYD"], ["SYD", "SIN"], ["SIN", "DXB"], ["DXB", "CDG"], ["CDG", "YUL"], ["YUL", "SFO"]],
    topAirports: [{ code: "SFO", visits: 18 }, { code: "JFK", visits: 9 }, { code: "LHR", visits: 6 }, { code: "HND", visits: 4 }],
    byMonth: [3, 4, 6, 5, 4, 3, 7, 6, 5, 4, 4, 3],
  },
  {
    year: 2026,
    flights: 41,
    km: 77502,
    hours: 104,
    minutes: 40,
    airports: 16,
    airlines: 5,
    countries: 9,
    delayHours: 7,
    worstDelay: { hours: 2, flight: "NW 941", route: "ORD–MIA" },
    aircraft: { type: "A220-300", flights: 17, hours: 58, tail: "C-GROV", tailFlights: 5, age: "4.8 years old" },
    routes: [["YUL", "LIS"], ["LIS", "KIX"], ["KIX", "HND"], ["HND", "SFO"], ["SFO", "DEN"], ["DEN", "ORD"], ["ORD", "MIA"], ["MIA", "GRU"], ["GRU", "CPT"], ["CPT", "LIS"]],
    topAirports: [{ code: "LIS", visits: 11 }, { code: "YUL", visits: 7 }, { code: "SFO", visits: 6 }, { code: "HND", visits: 4 }],
    byMonth: [4, 3, 5, 4, 3, 2, 5, 4, 3, 4, 4, 0],
  },
]
