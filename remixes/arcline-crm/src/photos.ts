/**
 * Every photograph on the page, from Pexels. `src` builds a sized, compressed
 * URL from the photo id; `credit` is what the footer lists.
 */

export const PHOTOS = {
  band: { id: 12604727, by: "Steve A Johnson", alt: "Low-poly ridges in coral and teal, folding across the frame" },
  cubes: { id: 29738260, by: "Steve A Johnson", alt: "Translucent red cubes floating over a pale floor" },
  sculpture: { id: 36025200, by: "Mahmoud Ramadan", alt: "A folded, glowing sculpture turning against a deep navy background" },
  film: { id: 9436715, by: "Rodion Kutsaiev", alt: "Three open cubes holding metallic spheres on a lilac gradient" },
  signal: { id: 28553432, by: "Steve A Johnson", alt: "A black sphere suspended in swirling orange and pink" },
  stripes: { id: 29376745, by: "Steve A Johnson", alt: "Striped shapes and a coral cube drifting over a peach ground" },
  garden: { id: 26975404, by: "Steve A Johnson", alt: "Pink geometric shell with clusters of orange spheres on green" },
  orb: { id: 29008324, by: "Steve A Johnson", alt: "A segmented pink and lilac sphere on a mint background" },
} as const

export type PhotoKey = keyof typeof PHOTOS

export function photo(key: PhotoKey, width = 1600) {
  const { id } = PHOTOS[key]
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const PHOTOGRAPHERS = [...new Set(Object.values(PHOTOS).map((p) => p.by))]
