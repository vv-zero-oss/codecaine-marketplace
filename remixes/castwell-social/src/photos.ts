/**
 * Every photograph on the site, from Pexels. `photo` builds a sized,
 * compressed URL from the id; the footer credits each photographer.
 */
export const PHOTOS = {
  vlogKitchen: { id: 8357669, by: "Ron Lach", alt: "A creator filming a cooking video on her phone in a sunny kitchen" },
  vlogStreet: { id: 7243103, by: "Blue Bird", alt: "A vlogger leaning towards a phone on a tripod before recording in town" },
  ringLight: { id: 9413650, by: "Sasha Kim", alt: "A young woman recording with a smartphone and ring light at home" },
  serum: { id: 8101534, by: "Polina Tankilevitch", alt: "A serum bottle with a dropper casting soft shadows" },
  skincare: { id: 34159010, by: "Anhelina Vasylyk", alt: "Three skincare bottles on a white surface" },
  mug: { id: 18904688, by: "Nuriye Çayhan", alt: "A rustic ceramic cup of coffee on a desk" },
  latte: { id: 34255748, by: "Yasin Onuş", alt: "A barista serving a latte with latte art" },
  runner: { id: 38693226, by: "VANNGO Ng", alt: "An athlete running a night race under city lights" },
  shoe: { id: 32145212, by: "Kenneth Surillo", alt: "A runner tying a training shoe on a reflective floor" },
  poke: { id: 4828100, by: "Polina Tankilevitch", alt: "Overhead shot of poke bowls with salmon and avocado" },
  lake: { id: 27667695, by: "Nanda Gopal Lakshman", alt: "A turquoise alpine lake between mountains" },
  hiker: { id: 4777178, by: "Gantas Vaičiulėnas", alt: "A hiker by a mountain lake reflecting the peaks" },
  street: { id: 33821594, by: "Manish Jain", alt: "A model posing on a city street in autumn clothes" },
  red: { id: 1377452, by: "Godisable Jacob", alt: "A woman in a red dress on urban steps" },
  maya: { id: 12903198, by: "Mizuno K", alt: "Portrait of a smiling woman at an office desk" },
  theo: { id: 7432863, by: "August de Richelieu", alt: "Portrait of a smiling man in a striped shirt" },
  ines: { id: 34334403, by: "Maryam Talepoor", alt: "Portrait of a woman with curly hair in soft light" },
  dev: { id: 31052395, by: "Huy Nguyễn", alt: "Portrait of a young man with curly hair and glasses" },
  team: { id: 3183125, by: "fauxels", alt: "A marketing team around a laptop reviewing a presentation" },
} as const

export type PhotoKey = keyof typeof PHOTOS

export function photo(key: PhotoKey, width = 900) {
  const { id } = PHOTOS[key]
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const PHOTOGRAPHERS = [...new Set(Object.values(PHOTOS).map((p) => p.by))]
