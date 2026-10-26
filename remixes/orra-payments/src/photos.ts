/**
 * Photography, all from Pexels (https://www.pexels.com) — credited in the
 * footer. `pexels(id, width)` asks Pexels' CDN for a compressed copy at the
 * width the layout needs.
 */
export function pexels(id: number, width = 1600) {
  const file = SLUGS[id] ?? `pexels-photo-${id}.jpeg`
  return `https://images.pexels.com/photos/${id}/${file}?auto=compress&cs=tinysrgb&w=${width}`
}

/** Older Pexels photos keep their original file name rather than `pexels-photo-<id>`. */
const SLUGS: Record<number, string> = {
  1747: "light-abstract-fire-heat.jpg",
}

export const PHOTOS = {
  counter: 11344562,
  online: 5699374,
  warehouse: 4483938,
  studio: 7857531,
  cycles: 31452612,
  pottery: 9982090,
  longTable: 8841608,
  bakery: 7447281,
  florist: 6764299,
  apron: 8176607,
  ember: 1747,
  team: [5308640, 13214672, 35681211, 16160801, 7752822, 14950779],
} as const
