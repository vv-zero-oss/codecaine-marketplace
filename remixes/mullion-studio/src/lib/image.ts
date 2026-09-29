/** A Pexels photo at the size it is drawn, cropped server-side. */
export function photo(id: number, w: number, h = w, dpr = 2) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${Math.round(w * dpr)}&h=${Math.round(h * dpr)}`
}
