/** Pexels photography. `photo(id, width)` is the CDN url; credit lives in the footer. */
export const photo = (id: number, width = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

export const PHOTOS = {
  runner: 38011335,
  cyclist: 5807934,
  breakfast: 4099231,
  surfer: 18382607,
  hiker: 35847515,
  yoga: 38248390,
  jogger: 4719948,
  friends: 8910376,
  swimmer: 6012277,
  stretch: 7746167,
  hiker2: 38532899,
  runner2: 10615656,
  jogger2: 7870262,
  friends2: 12896324,
} as const
