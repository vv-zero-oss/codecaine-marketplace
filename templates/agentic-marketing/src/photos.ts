/**
 * The photographs, all from Pexels (https://www.pexels.com). Each one is
 * served from Pexels' own CDN at the size the layout needs; swap `id` for
 * another Pexels photo id to change a picture.
 */

export type Photo = {
  id: number
  alt: string
  photographer: string
  /** Pexels' `avg_color`, painted behind the image while it loads */
  tone: string
}

export function pexels(photo: Photo, width: number) {
  return `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export function pexelsSrcSet(photo: Photo, widths: number[]) {
  return widths.map((w) => `${pexels(photo, w)} ${w}w`).join(", ")
}

export const photos = {
  honey: { id: 0, alt: "", photographer: "", tone: "#6b4a2b" },
  researchA: { id: 0, alt: "", photographer: "", tone: "#a88b6a" },
  researchB: { id: 0, alt: "", photographer: "", tone: "#8a8f86" },
  researchC: { id: 0, alt: "", photographer: "", tone: "#5f6f55" },
  creativeA: { id: 0, alt: "", photographer: "", tone: "#6f6a4a" },
  creativeB: { id: 0, alt: "", photographer: "", tone: "#b8c4cc" },
  creativeC: { id: 0, alt: "", photographer: "", tone: "#7b8a6a" },
  creativeD: { id: 0, alt: "", photographer: "", tone: "#d8d0c4" },
  event: { id: 0, alt: "", photographer: "", tone: "#1b1a14" },
} satisfies Record<string, Photo>
