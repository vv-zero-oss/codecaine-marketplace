/**
 * Every word and image on the page, in one place.
 *
 * Photographs and films are from Pexels (https://www.pexels.com), by id. A
 * photo is served at the width it is drawn at; a film at 960 or 1280 wide.
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
  name: "arven.",
  full: "Hotel Arven",
  place: "Zermatt, Switzerland",
  altitude: "1,620 m",
  address: "Winkelmattenweg 41, 3920 Zermatt",
  phone: "+41 27 966 41 00",
  email: "stay@arven.ch",
}

export const nav = [
  { label: "Rooms", href: "#rooms" },
  { label: "The valley", href: "#valley" },
  { label: "Nearby", href: "#nearby" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
]

export const hero = {
  title: "Sleep above the clouds",
  lede: "Thirty-two rooms of larch and stone at the top of Zermatt.",
  ledeTwo: "Ski out at nine, sauna at four, the Matterhorn in every window.",
  image: photo(19244970, 2000),
  imageAlt: "Autumn larches and chalets along the river, with the Matterhorn above the valley",
}

export const valley = {
  eyebrow: "The valley",
  title: "Out the door, onto the mountain.",
  body: "Arven sits where the village ends and the pistes begin. Three ways to spend a day here — and a warm room at the end of each.",
  film: film(9113102, "9113102-hd_1280_720_30fps.mp4", "drone-4k-switzerland-matterhorn-mountain-background-snowy-mountain-9113102.jpeg"),
  cards: [
    { kicker: "Winter", title: "360 km of pistes", note: "Ski-in, ski-out from the Winkelmatten run" },
    { kicker: "Summer", title: "400 km of trails", note: "Guides leave from the lobby at 7:30" },
    { kicker: "Evening", title: "One very warm spa", note: "Sauna, steam and a pool facing the peak" },
  ],
}

export const firstTracks = {
  lineOne: "First",
  lineTwo: "tracks",
  caption: "The Sunnegga funicular opens at 8:00. Our ski room opens at 7:15, boots warm and waxed.",
  film: film(6943040, "6943040-sd_960_540_30fps.mp4", "4k-resolution-board-mountain-ski-6943040.jpeg"),
}

export type Room = {
  id: string
  name: string
  price: number
  note: string
  sleeps: number
  size: string
  image: string
  alt: string
  featured?: boolean
}

export const rooms: Room[] = [
  {
    id: "pine",
    name: "Pine room",
    price: 390,
    note: "Minimum 2 nights",
    sleeps: 2,
    size: "24 m²",
    image: photo(30070551, 900),
    alt: "Larch-panelled bedroom with a checked blanket and a window onto snowy trees",
  },
  {
    id: "attic",
    name: "Attic loft",
    price: 520,
    note: "Minimum 2 nights",
    sleeps: 3,
    size: "38 m²",
    image: photo(17399352, 900),
    alt: "A-frame attic bedroom with a wall of glass looking over the valley",
  },
  {
    id: "summit",
    name: "Summit suite",
    price: 880,
    note: "Minimum 3 nights",
    sleeps: 4,
    size: "62 m²",
    image: photo(5271922, 900),
    alt: "Timber suite with a wall of windows, a telescope and a view over the hills",
    featured: true,
  },
]

export type Spot = {
  name: string
  kind: "winter" | "summer" | "village"
  distance: string
  how: string
  image: string
  alt: string
  tall?: boolean
}

export const spots: Spot[] = [
  { name: "Riffelsee", kind: "summer", distance: "35 min", how: "Gornergrat Bahn, then a short walk", image: photo(29734975, 900), alt: "The Matterhorn mirrored in a still mountain lake", tall: true },
  { name: "Gornergrat", kind: "winter", distance: "33 min", how: "Cog railway from the village station", image: photo(35093470, 900), alt: "Red cog train crossing a snowfield below high peaks" },
  { name: "Glacier Palace", kind: "winter", distance: "45 min", how: "Three cable cars to 3,883 m", image: photo(12993579, 900), alt: "Visitors inside a blue-lit tunnel carved into glacier ice" },
  { name: "Bahnhofstrasse", kind: "village", distance: "6 min", how: "On foot, or our e-shuttle", image: photo(20058082, 900), alt: "Horse-drawn carriage on a street of timber chalets", tall: true },
  { name: "Gorner Gorge", kind: "summer", distance: "15 min", how: "Walk down past the church", image: photo(23476895, 900), alt: "Wooden walkways fixed to the walls of a narrow rock gorge", tall: true },
  { name: "Sunnegga", kind: "winter", distance: "4 min", how: "Funicular, 200 m from the door", image: photo(36635792, 900), alt: "Skier carving down a bright piste under a blue sky" },
  { name: "Hinterdorf", kind: "village", distance: "9 min", how: "Old larch barns on stone stilts", image: photo(33824427, 900), alt: "Old wooden barns along a narrow village lane" },
  { name: "Stellisee", kind: "summer", distance: "40 min", how: "Sunnegga, then the Five Lakes Walk", image: photo(32496417, 900), alt: "Alpine lake with rocks and the Matterhorn on a clear day" },
  { name: "Kirchbrücke", kind: "village", distance: "8 min", how: "The bridge for the classic view", image: photo(36800236, 900), alt: "Chalet roofs with the Matterhorn rising behind them" },
]

export const getting = [
  { title: "By train", body: "Zermatt is car-free. Swiss rail runs from Visp every 30 minutes; we meet you at the station." },
  { title: "By car", body: "Park at the Matterhorn Terminal in Täsch and take the 12-minute shuttle train up." },
  { title: "From Geneva or Zürich", body: "Around 3½ hours door to door by rail. We book the seats for you on request." },
]

export const services = [
  { icon: "ski", title: "Ski valet", body: "Boots warmed overnight, skis waxed and waiting at the door by 7:15." },
  { icon: "car", title: "Station e-shuttle", body: "Our electric car meets every train and takes your bags up the hill." },
  { icon: "mountain", title: "Mountain guides", body: "Certified guides for Hörnli, the Breithorn and gentler days on the Five Lakes." },
  { icon: "spa", title: "Larch spa", body: "Finnish sauna, steam room and a 16-metre pool facing the peak." },
  { icon: "fondue", title: "The Stübli", body: "Twelve tables, a fondue list, and raclette on the terrace in spring." },
  { icon: "kids", title: "Snow club", body: "Ski school pick-up and afternoon sledging for children from four." },
]

export const servicePhotos = [
  { src: photo(7598363, 900), alt: "Timber spa room lit warmly, with benches and a folded towel", label: "Larch spa" },
  { src: photo(37593666, 900), alt: "Cheese fondue in a red pot on a wooden table", label: "The Stübli" },
  { src: photo(28732830, 900), alt: "A small electric vehicle on a car-free village street", label: "Station e-shuttle" },
]

export const notes = [
  { quote: "We woke to the peak turning pink and forgot to get out of bed until the funicular was already running.", name: "Hanna & Luca", from: "Munich · Attic loft", image: photo(20763346, 600) },
  { quote: "The guide met us in the lobby at half seven with a thermos. Best day of the whole trip.", name: "Tomás", from: "Madrid · Pine room", image: photo(23417401, 600) },
  { quote: "Boots warm every morning. That is all I will say, and it is enough.", name: "Clara", from: "Zürich · Summit suite", image: photo(14855076, 600) },
]

export const quiet = {
  title: "Stay for the silence",
  lede: "No cars, no hurry. A fire in the lounge from four, and a book you meant to finish.",
  film: film(6985325, "6985325-sd_960_540_24fps.mp4", "after-bath-athletic-girl-bathing-beautiful-girl-6985325.jpeg"),
}

export const faqs = [
  { q: "When is the best time to come?", a: "Mid-December to April for skiing, late June to September for hiking. The glacier runs are open for summer skiing most of the year." },
  { q: "How do I get to the hotel?", a: "Zermatt is car-free. Come by train, or park in Täsch and take the shuttle train. Our electric shuttle meets you at the station — send us your arrival time." },
  { q: "What is included in the rate?", a: "Breakfast, the spa, the station shuttle, ski storage with boot warmers, and afternoon cake in the lounge. The local tourist tax is added at checkout." },
  { q: "Can I cancel or change my dates?", a: "Free cancellation until 14 days before arrival in winter and 7 days in summer. After that we charge the first night." },
  { q: "Are children and dogs welcome?", a: "Both. Cots and extra beds are free under six, and dogs stay for CHF 30 a night in the Pine rooms." },
]

export const cta = {
  title: "Your window seat is waiting.",
  subtitle: "Book direct — breakfast and the station shuttle are on us.",
}

export const footer = {
  links: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Press", href: "#" },
    { label: "Careers", href: "#" },
  ],
}
