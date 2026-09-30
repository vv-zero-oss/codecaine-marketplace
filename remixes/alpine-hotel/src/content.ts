/**
 * Every word and image on the page, in one place.
 *
 * Photographs and films are from Pexels (https://www.pexels.com), by id.
 */

export function photo(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export function film(id: number, file: string, poster: string) {
  return {
    src: `https://videos.pexels.com/video-files/${id}/${file}`,
    poster: `https://images.pexels.com/videos/${id}/${poster}?auto=compress&cs=tinysrgb&w=1280`,
  }
}

export const hotel = {
  name: "Arven",
  full: "Hotel Arven",
  since: "1911",
  place: "Zermatt, Valais",
  altitude: "1,620 m",
  address: "Winkelmattenweg 41, 3920 Zermatt, Switzerland",
  phone: "+41 27 966 41 00",
  email: "stay@arven.ch",
}

export const nav = [
  { label: "Seasons", href: "#seasons" },
  { label: "A day", href: "#day" },
  { label: "Rooms & rates", href: "#rooms" },
  { label: "Around", href: "#around" },
  { label: "Arriving", href: "#arriving" },
  { label: "Questions", href: "#faq" },
]

export const cover = {
  issue: "Winter 2026/27 · opens 29 November",
  title: "The last house before the lifts.",
  lede: "Thirty-two rooms of larch and stone at the top of Zermatt, kept by the same family since 1911. Two hundred metres from the Sunnegga funicular; twenty-five minutes from the glacier.",
  image: photo(19244970, 1600),
  imageAlt: "Autumn larches and chalets along the river, with the Matterhorn at the head of the valley",
  caption: "The valley road below the house, late October.",
}

export const house = {
  title: "Four generations, one staircase.",
  paragraphs: [
    "Arven was built in 1911 as a six-room guesthouse for climbers waiting on the weather. The stone ground floor and the larch staircase are the originals; the rest has been rebuilt twice, by hand, by the family who still runs it.",
    "It is not a resort. There is one lounge with a fire, one small restaurant, a sauna, and a pool that looks straight up the valley. Most guests come back; a few have kept the same room for thirty winters.",
  ],
  image: photo(715623, 1100),
  imageAlt: "A timber chalet with green shutters in falling snow",
  caption: "The east wing in January.",
  facts: [
    { value: "32", label: "rooms" },
    { value: "1911", label: "first guests" },
    { value: "200 m", label: "to the funicular" },
  ],
}

export const seasons = {
  title: "Open twice a year. Closed twice a year.",
  lede: "The lifts keep their own calendar, and so do we.",
  film: film(9113102, "9113102-hd_1280_720_30fps.mp4", "drone-4k-switzerland-matterhorn-mountain-background-snowy-mountain-9113102.jpeg"),
  overlay: "The Matterhorn, twenty-five minutes up.",
  cards: [
    { dates: "29 Nov – 19 Apr", title: "Winter", note: "360 km of runs from the door, Italy included." },
    { dates: "13 Jun – 11 Oct", title: "Summer", note: "400 km of marked trails; the Five Lakes walk starts at Sunnegga." },
    { dates: "May & November", title: "Closed", note: "The lifts stop for maintenance. The house rests too." },
  ],
}

export const firstTracks = {
  lineOne: "First",
  lineTwo: "tracks",
  film: film(6943040, "6943040-sd_960_540_30fps.mp4", "4k-resolution-board-mountain-ski-6943040.jpeg"),
}

export const day = {
  title: "A winter day, as it usually goes.",
  lede: "Nothing here is compulsory. It is simply the order the house runs in.",
  rows: [
    { time: "07:15", what: "The ski room opens", note: "Boots warmed overnight, skis waxed and standing by the door." },
    { time: "07:30", what: "Breakfast", note: "Rye from the village bakery, alpine butter, eggs as you like them." },
    { time: "08:00", what: "First funicular to Sunnegga", note: "Two hundred metres from the door — four minutes on foot." },
    { time: "12:30", what: "Lunch at Findeln", note: "A hamlet of old barns on the run home. We book the table." },
    { time: "16:00", what: "Sauna, steam room and pool", note: "Cake and tea in the lounge while the light goes." },
    { time: "19:30", what: "Dinner in the Stübli", note: "Twelve tables. Raclette on Thursdays, fondue any night you ask." },
    { time: "22:30", what: "The bar closes", note: "The night porter doesn't. Ask him about tomorrow's weather." },
  ],
}

export type Room = {
  id: string
  name: string
  size: string
  beds: string
  view: string
  sleeps: number
  winter: number
  summer: number
  image: string
  alt: string
}

export const rooms: Room[] = [
  { id: "pine", name: "Pine room", size: "20 m²", beds: "Double or twin", view: "Village", sleeps: 2, winter: 340, summer: 260, image: photo(30070551, 900), alt: "Larch-panelled bedroom with a checked blanket and a window onto trees" },
  { id: "attic", name: "Attic loft", size: "34 m²", beds: "King + day bed", view: "Valley", sleeps: 3, winter: 480, summer: 360, image: photo(17399352, 900), alt: "A-frame attic bedroom with a wall of glass over the valley" },
  { id: "corner", name: "Corner room", size: "28 m²", beds: "King", view: "Matterhorn", sleeps: 2, winter: 540, summer: 410, image: photo(30070550, 900), alt: "Warm timber bedroom with a window onto the mountains" },
  { id: "summit", name: "Summit suite", size: "62 m²", beds: "King + twin room", view: "Matterhorn", sleeps: 4, winter: 880, summer: 640, image: photo(5271922, 900), alt: "Timber suite with a wall of windows and a telescope" },
]

export const ratesNote =
  "Per room, per night, for two guests. Breakfast, the spa and the station car are included. Local tax CHF 3.50 per adult per night. Minimum stay: two nights; four over Christmas and New Year."

export type Spot = {
  id: string
  name: string
  how: "foot" | "lift"
  time: string
  detail: string
  /** Position on the drawn map, in its 0–100 coordinate space. */
  x: number
  y: number
  image: string
  alt: string
}

export const spots: Spot[] = [
  { id: "sunnegga", name: "Sunnegga funicular", how: "foot", time: "4 min", detail: "Underground railway to the Five Lakes and the Rothorn runs.", x: 60, y: 60, image: photo(36635792, 600), alt: "A skier on a bright piste" },
  { id: "church", name: "Old church & cemetery", how: "foot", time: "7 min", detail: "Where the first climbers are buried. Quiet at any hour.", x: 40, y: 72, image: photo(36800236, 600), alt: "Chalet roofs with the Matterhorn behind" },
  { id: "hinterdorf", name: "Hinterdorf barns", how: "foot", time: "9 min", detail: "Sixteenth-century larch barns on stone stilts.", x: 33, y: 55, image: photo(33824427, 600), alt: "Old wooden barns along a narrow lane" },
  { id: "gorge", name: "Gorner Gorge", how: "foot", time: "18 min", detail: "Wooden walkways fixed to the walls of the gorge. June to October.", x: 24, y: 88, image: photo(23476895, 600), alt: "Walkways in a narrow rock gorge" },
  { id: "gornergrat", name: "Gornergrat", how: "lift", time: "33 min", detail: "Cog railway to 3,089 m and the full ring of peaks.", x: 80, y: 20, image: photo(35093470, 600), alt: "Red cog train crossing snow below high peaks" },
  { id: "riffelsee", name: "Riffelsee", how: "lift", time: "40 min", detail: "The lake the postcards are taken from. Get off at Rotenboden.", x: 66, y: 34, image: photo(29734975, 600), alt: "The Matterhorn reflected in a still lake" },
  { id: "glacier", name: "Glacier Palace", how: "lift", time: "45 min", detail: "Three cable cars to 3,883 m, and tunnels cut into the ice.", x: 26, y: 12, image: photo(12993579, 600), alt: "Visitors in a blue-lit tunnel in glacier ice" },
]

/** Where the house sits on the drawn map. */
export const home = { x: 52, y: 70 }

export const included = [
  "Breakfast, until 10:30",
  "Spa: sauna, steam room, 16 m pool",
  "Electric car to and from the station",
  "Ski room with boot warmers",
  "Tea and cake in the lounge, from 16:00",
  "Wi-Fi, and a proper desk in every room",
]

export const onRequest = [
  { what: "Dinner in the Stübli", price: "CHF 78" },
  { what: "Mountain guide, full day", price: "CHF 480" },
  { what: "Ski school pick-up, per child", price: "CHF 25" },
  { what: "Dog, per night", price: "CHF 30" },
  { what: "Late check-out until 16:00", price: "CHF 90" },
]

export const routes = [
  { from: "Zürich HB", via: "change at Visp", time: "3 h 15", every: "hourly" },
  { from: "Geneva Airport", via: "change at Visp", time: "3 h 40", every: "hourly" },
  { from: "Milan Centrale", via: "change at Brig or Visp", time: "3 h 30", every: "every 2 h" },
  { from: "Täsch car terminal", via: "shuttle train", time: "12 min", every: "every 20 min" },
]

export const quotes = [
  { quote: "Same room, fourteenth winter. They had the extra pillow on the bed before we asked.", who: "M. & H. Brunner, Basel" },
  { quote: "The porter told us the wind would drop by ten. It did. Best day of the trip.", who: "Tomás R., Madrid" },
  { quote: "Boots warm every morning. That is all I will say, and it is enough.", who: "Clara S., Zürich" },
]

export const faqs = [
  { q: "Zermatt is car-free — how do I get my luggage up?", a: "Take the train to Zermatt, or park in Täsch and ride the shuttle train. Our electric car meets every train if you tell us which one; the driver takes the bags, and you can walk up the hill or ride along." },
  { q: "Can I ski back to the door?", a: "Almost. The Sunnegga run ends at the funicular, two hundred metres from us. On good snow the Winkelmatten path brings you to the garden gate." },
  { q: "What is your cancellation policy?", a: "Free until 14 days before arrival in winter and 7 days in summer. After that we charge the first night; if we can re-let the room, we refund it." },
  { q: "Are children and dogs welcome?", a: "Both. Cots and extra beds are free under six. Dogs stay in the Pine rooms for CHF 30 a night and are welcome in the lounge, not the Stübli." },
  { q: "Is there a restaurant, or do we eat in the village?", a: "The Stübli serves dinner six nights a week (closed Mondays). Zermatt has over a hundred restaurants; the front desk will book whichever you like." },
]

export const footer = {
  links: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Press", href: "#" },
    { label: "Work with us", href: "#" },
  ],
}
