/**
 * Every photograph on the site, from Pexels. `photo` builds a sized,
 * compressed URL from the id; the footer credits each photographer.
 */

export const PHOTOS = {
  team: { id: 7413864, by: "RDNE Stock project", alt: "A sales team gathered around a desk, talking through a plan" },
  call: { id: 34225007, by: "Julio Lopez", alt: "An account executive on a video call with headphones, mid-conversation" },
  board: { id: 7698826, by: "Yan Krukau", alt: "Colleagues reviewing numbers together at a whiteboard" },
  laptop: { id: 4925864, by: "Roman Odintsov", alt: "A founder working on a laptop in a café, coffee beside him" },
} as const

export type PhotoKey = keyof typeof PHOTOS

export function photo(key: PhotoKey, width = 1400) {
  const { id } = PHOTOS[key]
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const PHOTOGRAPHERS = [...new Set(Object.values(PHOTOS).map((p) => p.by))]
