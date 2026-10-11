/**
 * Photography from Pexels (https://www.pexels.com), by photo id. Pexels is
 * credited in the footer.
 */
export function pexels(id: number, width = 800, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const thumb = (id: number) => pexels(id, 160, 160)
export const avatar = (id: number) => pexels(id, 120, 120)

/** The sky photographs the product shots float on. */
export const SKIES = {
  lavender: 7450367,
  blush: 5312872,
  candy: 9396534,
  dusk: 614115,
} as const
