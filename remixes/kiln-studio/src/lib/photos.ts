/**
 * Photography is Pexels, served from its own CDN at the size each slot
 * needs. Credited in the footer and the README.
 */
export function pexels(id: number, width = 800, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}
