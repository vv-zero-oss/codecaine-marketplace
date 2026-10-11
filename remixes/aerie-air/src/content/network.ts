/**
 * The launch network — every vertiport, where it sits on the schematic map
 * (0–100 on both axes), and how long the same trip takes by road at rush
 * hour. Flight time and fare are worked out from the distance, so every
 * mockup that quotes a trip quotes the same one.
 */
export type Vertiport = {
  id: string
  code: string
  name: string
  area: string
  x: number
  y: number
  opens: string
}

export const VERTIPORTS: Vertiport[] = [
  { id: "harbour", code: "HBR", name: "Harbour Pier", area: "Waterfront", x: 22, y: 64, opens: "Spring 2027" },
  { id: "midtown", code: "MDT", name: "Midtown Roof", area: "Financial district", x: 47, y: 46, opens: "Spring 2027" },
  { id: "airport", code: "INT", name: "International", area: "Terminal 2, level 6", x: 86, y: 74, opens: "Spring 2027" },
  { id: "northgate", code: "NGT", name: "Northgate Yards", area: "Rail quarter", x: 54, y: 14, opens: "Autumn 2027" },
  { id: "riverside", code: "RVS", name: "Riverside Park", area: "East bank", x: 70, y: 38, opens: "Autumn 2027" },
  { id: "stadium", code: "STD", name: "Stadium Deck", area: "Southside", x: 40, y: 86, opens: "2028" },
]

/** Straight-line distance between two pads, in km (the map is ~40km across). */
export function distanceKm(a: Vertiport, b: Vertiport) {
  return Math.hypot(a.x - b.x, a.y - b.y) * 0.4
}

export type Trip = { km: number; flightMin: number; roadMin: number; fare: number; savedMin: number }

/** One trip, priced: 3 minutes on the pad, 290 km/h in the air, a road
 *  that crawls at 19 km/h at rush hour plus 8 minutes to park, and a fare
 *  that starts at 49 and adds 4.2 a kilometre. */
export function quote(from: Vertiport, to: Vertiport): Trip {
  const km = distanceKm(from, to)
  const flightMin = Math.max(5, Math.round(3 + (km / 290) * 60))
  const roadMin = Math.round(8 + (km * 1.35 / 19) * 60)
  const fare = Math.round((49 + km * 4.2) / 5) * 5
  return { km, flightMin, roadMin, fare, savedMin: roadMin - flightMin }
}

export function vertiport(id: string) {
  return VERTIPORTS.find((v) => v.id === id) ?? VERTIPORTS[0]
}

/** Departure slots for the booking mockups: every 15 minutes from 07:00. */
export const SLOTS = Array.from({ length: 16 }, (_, i) => {
  const minutes = 7 * 60 + i * 15
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
})

export function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number)
  const total = h * 60 + m + minutes
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}
