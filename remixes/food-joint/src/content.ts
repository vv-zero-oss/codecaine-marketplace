/**
 * Every word, photograph and film on the page, in the order the page tells it.
 *
 * The story: Oakbird is a fried-chicken room. The page goes from the appetite
 * (the hero) to what makes it different (the oak), to what you can order, to
 * how a bird gets to the plate, to what people say, and ends where a hungry
 * visitor wants to end: a table booked and the address.
 *
 * Photographs and films are from Pexels (https://www.pexels.com). A photo is
 * its Pexels id; `pexels()` turns that into the CDN address the Pexels API
 * hands back. A film carries the file address the API returned and the id of
 * its poster frame. `query` is the search each one came from, kept so it can
 * be swapped for another of the same tone.
 */

export type Photo = {
  id: number
  alt: string
  query: string
  /** Where the subject sits, for `object-position`. */
  focus?: string
}

export type Film = {
  id: number
  /** The 960px file: every slot the page plays a film in is smaller than that
   *  on a 1x screen, and a film is heavy. */
  src: string
  poster: string
  alt: string
  query: string
}

export function pexels(id: number, width: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

function film(id: number, file: string, poster: string, alt: string, query: string): Film {
  return {
    id,
    src: `https://videos.pexels.com/video-files/${id}/${file}`,
    poster: `https://images.pexels.com/videos/${id}/${poster}?auto=compress&cs=tinysrgb&w=1200`,
    alt,
    query,
  }
}

export const brand = {
  name: "Oakbird",
  tagline: "Fried chicken, finished over oak",
  address: ["41 Kiln Street", "Eastside"],
  phone: "(555) 014-2290",
  email: "tables@oakbird.example",
  instagram: "@oakbird.kitchen",
}

export const nav = [
  { label: "Menu", href: "#menu" },
  { label: "The oak", href: "#oak" },
  { label: "Visit", href: "#visit" },
]

export const cta = { label: "Book a table", href: "#book" }

export const films = {
  embers: film(5610288, "5610288-sd_960_540_25fps.mp4", "burn-burning-camp-fire-campfire-5610288.jpeg", "Split oak burning down to glowing embers", "firewood burning"),
  chop: film(11265662, "11265662-sd_960_540_25fps.mp4", "chopped-woods-woodcutter-woods-11265662.jpeg", "A log split with one swing of an axe", "wood chopping"),
  grill: film(18679023, "18679023-sd_960_540_24fps.mp4", "ahumado-ahumados-asado-asados-18679023.jpeg", "Oak logs catching on a grill", "wood fire grill"),
  fryer: film(4813410, "4813410-sd_960_540_30fps.mp4", "pexels-photo-4813410.jpeg", "A basket of fries lowered into hot oil", "deep fryer"),
  dredge: film(8626671, "8626671-sd_960_540_25fps.mp4", "pexels-photo-8626671.jpeg", "A cook shaking flour off their hands", "chef cooking"),
  fry: film(34438330, "14592141_960_540_30fps.mp4", "chicken-fry-34438330.jpeg", "Chicken spitting in a pan of hot oil", "frying chicken"),
  fire: film(16834816, "16834816-sd_960_540_30fps.mp4", "asado-barbearia-fireplay-16834816.jpeg", "Meat hanging beside an open wood fire", "wood fire grill"),
  sauce: film(5789851, "5789851-sd_960_540_25fps.mp4", "pexels-photo-5789851.jpeg", "Dark glaze drizzled over a tray of food", "pouring sauce"),
}

export const preloader = {
  /** Flicked through while the page loads, like a menu board turning over. */
  photos: [
    { id: 12118977, alt: "Fried chicken on a yellow table", query: "fried chicken" },
    { id: 9045144, alt: "Sliced pickles in a metal bowl", query: "pickles" },
    { id: 39059532, alt: "Golden fries, close up", query: "french fries" },
    { id: 6941026, alt: "Glazed wings with a red chilli", query: "hot wings" },
    { id: 10935114, alt: "Hands around a fried chicken sandwich", query: "fried chicken burger" },
  ] satisfies Photo[],
  line: "Heating the oil",
}

export const hero = {
  status: "Open tonight till 11",
  title: ["Eat", "loud"],
  photo: {
    id: 12118977,
    alt: "A pile of crackling fried chicken on a bright yellow table",
    query: "fried chicken",
    focus: "50% 45%",
  } satisfies Photo,
}

export const ticker = {
  words: ["Crunch", "Oak smoke", "Pickle brine", "Hot honey", "Double dredged", "Fried to order"],
  photos: [
    { id: 8998353, alt: "Craggy fried chicken crust", query: "crispy fried chicken close up" },
    { id: 9045144, alt: "Sliced pickles", query: "pickles" },
    { id: 39059532, alt: "Fries", query: "french fries" },
  ] satisfies Photo[],
}

/** The statement is a sentence with pictures set into it. A string is words;
 *  an object is the picture that sits in the line at that point. */
export type StatementPart =
  | string
  | { shape: "pill" | "circle" | "burst"; photo?: Photo; film?: Film }

export const statement: StatementPart[] = [
  "We brine every bird for a whole day",
  { shape: "pill", photo: { id: 9462573, alt: "Jars of pickles in brine", query: "pickles" } },
  "dredge it twice, fry it hard, then hang it over",
  { shape: "pill", film: films.embers },
  "split oak for two minutes. The smoke gets in the crust. The pickles",
  { shape: "circle", photo: { id: 9045144, alt: "Sliced pickles", query: "pickles" } },
  "stay ice cold.",
]

export type MenuItem = {
  name: string
  note: string
  price: string
  /** 0–3 flames. */
  heat: number
  photo: Photo
  tag?: string
}

export const menu = {
  eyebrow: "The menu",
  title: ["Pick a", "pile"],
  intro:
    "Everything is fried to order, so give it twelve minutes. Heat runs from none to a lot — ask and we'll pull it back.",
  tabs: [
    {
      id: "birds",
      label: "Birds",
      items: [
        { name: "The half bird", note: "Breast, thigh, leg and wing, oak-finished, honey on the side", price: "22", heat: 1, tag: "House", photo: { id: 27831789, alt: "Fried chicken cooling on a rack", query: "fried chicken" } },
        { name: "Hot honey thighs", note: "Three boneless thighs, chilli honey, pickled shallot", price: "16", heat: 2, photo: { id: 9872916, alt: "Golden fried chicken on paper", query: "fried chicken" } },
        { name: "Oak wings", note: "Eight wings, smoked then fried, blue-cheese dip", price: "14", heat: 3, photo: { id: 6941026, alt: "Glazed chicken wings with a chilli", query: "hot wings" } },
        { name: "Tenders & dip", note: "Four tenders, buttermilk ranch, lemon", price: "13", heat: 0, photo: { id: 33254639, alt: "A pile of crisp chicken tenders", query: "crispy fried chicken close up" } },
      ],
    },
    {
      id: "sandwiches",
      label: "Sandwiches",
      items: [
        { name: "The Oakbird", note: "Thigh, slaw, pickles, oak mayo, potato bun", price: "15", heat: 1, tag: "Order this", photo: { id: 10935114, alt: "Hands holding a fried chicken sandwich", query: "fried chicken burger" } },
        { name: "Slaw & sauce", note: "Breast, red slaw, mustard sauce, long roll", price: "14", heat: 1, photo: { id: 19585045, alt: "Chicken sandwich with slaw and sauce", query: "chicken sandwich" } },
        { name: "Pickle back", note: "Pickle-brined thigh, dill butter, extra pickles", price: "15", heat: 0, photo: { id: 2874990, alt: "Crispy chicken sandwich with lettuce", query: "chicken sandwich" } },
        { name: "The loud one", note: "Double thigh, ghost-pepper glaze, cooling ranch", price: "17", heat: 3, photo: { id: 20003227, alt: "Chicken sandwiches on an orange tray", query: "fried chicken burger" } },
      ],
    },
    {
      id: "sides",
      label: "Sides",
      items: [
        { name: "Dripping fries", note: "Twice cooked, oak salt", price: "6", heat: 0, photo: { id: 39059532, alt: "Golden fries, close up", query: "french fries" } },
        { name: "House pickles", note: "Dill, garlic, a little chilli, served ice cold", price: "5", heat: 1, photo: { id: 9045144, alt: "Sliced pickles in a bowl", query: "pickles" } },
        { name: "Red slaw", note: "Red cabbage, apple, buttermilk", price: "5", heat: 0, photo: { id: 29930364, alt: "A plate of slaw on a red and orange backdrop", query: "coleslaw" } },
        { name: "Waffle & honey", note: "Malted waffle, whipped honey butter", price: "7", heat: 0, photo: { id: 37794977, alt: "Fried chicken with waffles and slaw", query: "coleslaw" } },
      ],
    },
    {
      id: "drinks",
      label: "Drinks",
      items: [
        { name: "Smoked lemonade", note: "Lemons charred over the oak, a pinch of salt", price: "5", heat: 0, tag: "House", photo: { id: 18490285, alt: "Lemonade poured over ice among lemons", query: "lemonade" } },
        { name: "Thick shake", note: "Vanilla, salted caramel or burnt honey", price: "7", heat: 0, photo: { id: 6463660, alt: "A row of loaded milkshakes", query: "milkshake" } },
        { name: "Pickle fizz", note: "Brine, soda, lime, ice — trust us", price: "5", heat: 0, photo: { id: 8679431, alt: "Bright soft drinks in plastic cups", query: "lemonade" } },
      ],
    },
  ] satisfies { id: string; label: string; items: MenuItem[] }[],
  footnote: "Gluten-free fry on Mondays. Tell us about allergies — the fryer is shared.",
}

export const oak = {
  eyebrow: "The difference",
  word: "Oak",
  title: "Two minutes over split oak",
  body:
    "Gas is faster. We don't care. After the fryer, every bird hangs over a bed of oak embers — the fat renders, the crust tightens and the smoke gets into every crag. You'll hear it before you taste it.",
  scenes: [
    { title: "Tuesdays, we split it", note: "Seasoned oak, a cord a week, split out back.", film: films.chop, shape: "arch" as const },
    { title: "Every night, we burn it", note: "Lit at four, embers by six, glowing till close.", film: films.grill, shape: "blob" as const },
    { title: "Every order, we fry it", note: "Twelve minutes, never under a heat lamp.", film: films.fryer, shape: "pill" as const },
  ],
}

export const process = {
  eyebrow: "Start to finish",
  title: "How a bird gets to you",
  steps: [
    { n: "01", title: "Brine", time: "24 hours", body: "Pickle brine, buttermilk, garlic and a lot of salt. It's why the meat stays juicy under the crunch.", photo: { id: 9462571, alt: "Two jars of pickles on a board", query: "pickles" } as Photo },
    { n: "02", title: "Dredge", time: "Twice", body: "Seasoned flour, a dip back in the brine, then flour again — that's where the craggy bits come from.", film: films.dredge },
    { n: "03", title: "Fry", time: "12 minutes", body: "Hot, clean oil, changed every morning. Loud, spitting, and never rushed.", film: films.fry },
    { n: "04", title: "Oak", time: "2 minutes", body: "Hung over the embers until the crust tightens and the smoke settles in.", film: films.fire },
    { n: "05", title: "Sauce", time: "To order", body: "Hot honey, oak mayo, or nothing at all. Then the pickles, cold.", film: films.sauce },
  ],
}

export const reviews = {
  eyebrow: "Word of mouth",
  title: "People keep coming back",
  hint: "Go on, move them around",
  items: [
    { quote: "I heard the crust from across the room. Then I ordered a second half bird.", name: "Priya", detail: "came for lunch, stayed for dinner", tone: "cream" as const },
    { quote: "The pickle fizz sounds wrong and is extremely right.", name: "Marcus", detail: "regular since week one", tone: "lavender" as const },
    { quote: "Smoky, crunchy, and somehow not greasy. My kids asked for it on their birthday.", name: "Lena", detail: "party of six", tone: "orange" as const },
    { quote: "Best thing on the street. Book ahead on Fridays.", name: "Tom", detail: "lives round the corner", tone: "lime" as const },
  ],
}

export const room = {
  eyebrow: "The room",
  title: "Loud in the best way",
  body: "Forty seats, a long counter facing the fire, and a record player that only goes up. Walk-ins welcome at the counter; tables are better booked.",
  photos: [
    { id: 14590691, alt: "A warm dining room with wooden tables", query: "restaurant interior", shape: "arch" as const },
    { id: 9961871, alt: "Friends laughing over dinner", query: "friends eating", shape: "circle" as const },
    { id: 13971183, alt: "Cooks working the line beside the fire", query: "chef kitchen", shape: "burst" as const },
    { id: 27177294, alt: "Three friends sharing plates outdoors", query: "friends eating", shape: "pill" as const },
  ],
}

export const booking = {
  eyebrow: "Save a seat",
  title: ["Book a", "table"],
  intro: "Tables for up to eight. For more, email us and we'll clear the long bench.",
  times: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  submit: "Book it",
  success: {
    title: "You're in",
    body: (name: string, size: number, time: string) =>
      `${name ? `${name}, a` : "A"} table for ${size} at ${time} is held. We'll text to confirm — bring an appetite.`,
    again: "Book another",
  },
  photo: { id: 13869876, alt: "A dining room under a wooden ceiling", query: "restaurant interior" } satisfies Photo,
}

export const visit = {
  hours: [
    { days: "Mon – Thu", time: "17:00 – 22:00" },
    { days: "Fri – Sat", time: "12:00 – 23:00" },
    { days: "Sunday", time: "12:00 – 21:00" },
  ],
}

export const footer = {
  wordmarkPhoto: { id: 8998353, alt: "", query: "crispy fried chicken close up", focus: "50% 50%" } satisfies Photo,
  links: [
    { label: "Menu", href: "#menu" },
    { label: "The oak", href: "#oak" },
    { label: "Book", href: "#book" },
    { label: "Instagram", href: "#top" },
  ],
  credit: "Photographs and films from Pexels",
  creditHref: "https://www.pexels.com",
  legal: "© Oakbird Kitchen",
}
