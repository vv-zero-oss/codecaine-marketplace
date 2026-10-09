/**
 * Every photograph and clip on the site, from Pexels — one place to swap
 * them. `photo(id, width)` builds a resized URL off Pexels' CDN.
 */
export function photo(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const PHOTOS = {
  // Bar & counter
  barInterior: 1137745,
  barChalkboard: 32935240,
  latteTable: 29599050,
  matcha: 911810,
  pourOverCup: 4425744,
  pourKettle: 14679166,
  espressoPull: 13005987,
  // Roastery
  greenScoop: 4820813,
  roasterAtWork: 4820732,
  roasterPanel: 4820819,
  drumBeans: 4820676,
  roastedBeans: 4820673,
  kraftBags: 37539928,
  bagShelf: 28458009,
  // Farm
  cherriesBasket: 13802103,
  cherriesHands: 34411040,
  pickerSmile: 7125452,
  greenHands: 8002412,
  dryingBeds: 30658831,
  // Records
  turntable: 6521626,
  spinningRecord: 12488666,
  crateDig: 15303870,
  crates: 13125962,
  crateShop: 36150855,
  slimCrate: 6827324,
  // People & places
  bartender: 38296410,
  beanie: 2115776,
  regular: 6321942,
  friendsTalk: 8937482,
  friendsTable: 36729801,
  storefrontTree: 8700655,
  streetNight: 35792768,
  cornerDusk: 10623540,
} as const

export const VIDEOS = {
  roast: {
    src: "https://videos.pexels.com/video-files/6280333/6280333-hd_1280_720_25fps.mp4",
    poster: "https://images.pexels.com/videos/6280333/black-coffee-coffee-beans-coffee-business-coffee-lover-6280333.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  record: {
    src: "https://videos.pexels.com/video-files/7202468/7202468-hd_1920_1080_30fps.mp4",
    poster: "https://images.pexels.com/videos/7202468/pexels-photo-7202468.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
} as const
