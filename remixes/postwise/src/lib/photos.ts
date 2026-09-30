/**
 * Photography from Pexels (https://www.pexels.com), by photo id. The
 * photographers are credited in the footer.
 */
export function pexels(id: number, width = 800, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const avatar = (id: number) => pexels(id, 96, 96)
