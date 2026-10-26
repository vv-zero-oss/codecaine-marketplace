/**
 * Photography, all from Pexels (https://www.pexels.com) — credited in the
 * footer. `pexels(id, width)` asks Pexels' CDN for a compressed copy at the
 * width the layout needs.
 */
export function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const PHOTOS = {
  lecture: 8197558,
  clinic: 7579823,
  cafe: 36766001,
  studio: 31213674,
  whiteboard: 17724731,
  walking: 3894354,
  team: [5308640, 13214672, 35681211, 16160801, 7752822, 14950779],
} as const
