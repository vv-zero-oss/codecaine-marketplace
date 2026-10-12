/**
 * Photography from Pexels (https://www.pexels.com), by id, at the width a
 * slot needs. Credits are on /about and in the README.
 */
export function photo(id: number, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

/** A responsive srcset for the same photo. */
export function photoSet(id: number, widths = [480, 800, 1200, 1800]): string {
  return widths.map((w) => `${photo(id, w)} ${w}w`).join(", ")
}

export const PHOTOS = {
  // People at work and at home
  kitchenCouple: 7592324,
  ceramicistApron: 9304505,
  clayArtisan: 14124488,
  carpenter: 5710836,
  sawyer: 5974237,
  cameraMan: 25913214,
  filmPortrait: 27517594,
  boards: 39666041,
  planer: 5967744,
  readerWindow: 10121681,
  elderReader: 6972638,
  sunReader: 4573059,
  weaverHands: 6634689,
  potterWheel: 16386867,
  bougainvillea: 19248405,
  plantsCamera: 32664269,
  officeReader: 5292232,
  // Rooms and things
  midcenturyRoom: 36160464,
  commode: 5824590,
  mirrorDesk: 5825598,
  studioLoft: 4452602,
  vinylStudio: 4772158,
  houseboats: 11637648,
  canal: 29851053,
  aFrame: 19737859,
  cabinLamp: 31479802,
  handwriting: 6980533,
  letters: 9700837,
  teacup: 33489601,
  floorCup: 5010209,
  library: 1565245,
  loom: 6634735,
  wheelMono: 38428348,
  // The table the volumes are photographed on
  timber: 5225594,
} as const

export const PHOTOGRAPHERS = [
  "Miriam Alonso", "Mikhail Nilov", "Rohan Dewangan", "Anna Shvets", "Ono Kosuki", "Orhan Pergel",
  "Valeria Boltneva", "Lachlan Ross", "Ron Lach", "ArtHouse Studio", "Kaboompics", "Ardalan Hamedani",
  "Mihman Duğanlı", "Adit Prabowo", "Antoni Shkraba", "Yusuf P", "Charlotte May", "Vlada Karpovich",
  "Nataliya Vaitkevich", "David McElwee", "Daria Agafonova", "Jonathan Borba", "Pew Nguyen", "KoolShooters",
  "Nur Yilmaz", "İdil Ceren Çelikler", "Chasing Lyu", "Vika Glitter", "Anirban Das", "Tihomir Trifonov",
]
