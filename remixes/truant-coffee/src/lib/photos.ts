/**
 * Photography from Pexels (https://www.pexels.com), by photo id. Pexels is
 * credited in the footer.
 */
export function pexels(id: number, width = 1200, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

/** Every photograph on the site, by what it is for. */
export const PHOTO = {
  hero: 5523174,
  cafeRed: 3421871,
  mugSmile: 19678620,
  fogCliffs: 4581101,
  rockIslet: 17677810,
  sunsetLake: 7540722,
  duskLake: 18134874,
  autumnWalk: 19021762,
  forestFriends: 939328,
  rails: 7263751,
  rooftopForest: 12560851,
  rooftop: 32435818,
  sipper: 2419686,
  chemex: 5851726,
  pour: 2616172,
  kayaks: 29311667,
  canoe: 7263721,
  boat: 6231561,
  picker: 7125452,
  raking: 35091562,
  sorting: 30658831,
  roaster: 4820655,
  drum: 4820676,
  cafe: 18235143,
  barista: 29647355,
  campfire: 8659567,
  moka: 6861142,
  skater: 4663832,
  doorway: 7519646,
  lakeCanoe: 33944113,
  cherries: 37306877,
} as const

export const photo = (key: keyof typeof PHOTO, width?: number, height?: number) => pexels(PHOTO[key], width, height)

/** Dollars, the way a receipt writes them. */
export function money(value: number, cents = true) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })
}
