/**
 * Photography from Pexels (https://www.pexels.com), by photo id. Pexels is
 * credited in the footer.
 */
export function pexels(id: number, width = 800, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const avatar = (id: number, size = 120) => pexels(id, size, size)

export const PHOTOS = {
  storm: 8964499,
  stormCity: 9970485,
  towerDusk: 9827845,
  tarmacDusk: 11047521,
  wingSunset: 3274832,
  windowSunset: 735236,
  coast: 11738405,
  coastTown: 20286941,
  terminal: 19246011,
  terminalWalk: 30037153,
  lounge: 1381415,
  nightContrail: 981899,
  team: 30688593,
  teamDesk: 10375908,
  teamLounge: 8067881,
  passport: 7310015,
} as const

/** Portraits for avatars and the team. */
export const PEOPLE = [3872330, 39219514, 3868929, 7563495, 12871465, 9727699, 37159572, 31853119, 17589635, 18740031, 28831258, 36763563] as const
