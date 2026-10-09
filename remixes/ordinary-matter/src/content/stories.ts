import { PHOTOS } from "@/lib/photos"

export type Trade = "Ceramics" | "Wood" | "Textile" | "Image" | "Homes" | "Garden"

export const TRADES: Trade[] = ["Ceramics", "Wood", "Textile", "Image", "Homes", "Garden"]

export type Story = {
  slug: string
  name: string
  /** What they make, or where — the second half of the caption. */
  role: string
  place: string
  trade: Trade
  volume: 1 | 2 | 3 | "Online"
  photo: number
  /** A second photo, of the room or the work. */
  detail: number
  dek: string
  quote: string
  body: string[]
  minutes: number
}

/** The people. Every story opens in the reader from any page. */
export const STORIES: Story[] = [
  {
    slug: "ines-teo-marchetti",
    name: "Inés & Teo Marchetti",
    role: "Casa Lenta",
    place: "Valparaíso, CL",
    trade: "Homes",
    volume: 3,
    photo: PHOTOS.kitchenCouple,
    detail: PHOTOS.midcenturyRoom,
    dek: "A cook and a furniture restorer, a house on a hill, and a kitchen table that has never been finished.",
    quote: "We stopped buying things for the house. Now the house tells us what it is missing, and usually it is nothing.",
    body: [
      "The kitchen came first. Before there was a bed upstairs, there was a table downstairs — a slab of reclaimed elm Teo found behind a boatyard, still smelling faintly of diesel. They ate on it, argued on it, and for one winter slept under a blanket beside it while the roof was redone.",
      "Inés cooks from the market rather than from recipes. Teo restores chairs nobody else would bother with. Between them, the house fills slowly, one considered object a season, and the rooms keep the patience of the people who made them.",
    ],
    minutes: 9,
  },
  {
    slug: "saoirse-lennox",
    name: "Saoirse Lennox",
    role: "Ceramicist",
    place: "Bristol, UK",
    trade: "Ceramics",
    volume: 3,
    photo: PHOTOS.ceramicistApron,
    detail: PHOTOS.wheelMono,
    dek: "Slab-built tableware from a converted dairy, and the case for making the same plate four hundred times.",
    quote: "The first hundred are for my hands. The next three hundred are for whoever eats off them.",
    body: [
      "Saoirse rolls clay the way some people knead bread: without looking, mid-conversation, by feel. Her studio is a former dairy with a drain in the floor and a kiln that ticks for a day after every firing.",
      "She makes one shape a year. This year it is a shallow plate with a thumb-pressed rim, and the slight variation between them — a thicker edge here, a pooled glaze there — is the whole point.",
    ],
    minutes: 7,
  },
  {
    slug: "matthias-ekdahl",
    name: "Matthias Ekdahl",
    role: "Joiner",
    place: "Gothenburg, SE",
    trade: "Wood",
    volume: 2,
    photo: PHOTOS.carpenter,
    detail: PHOTOS.planer,
    dek: "Hand-cut joinery, no screws, and a workshop that runs on the light from one north-facing window.",
    quote: "A joint that fits does not need explaining. A joint that doesn't, nobody wants to hear about.",
    body: [
      "Matthias learned to cut dovetails from his grandfather and to sell them from nobody. For a decade he built kitchens for other people's showrooms before opening a workshop of his own under a bakery.",
      "Everything is made to order, and the waiting list is long because he refuses to hire faster than he can teach. The offcuts become spoons, then kindling, then — in winter — heat for the shop.",
    ],
    minutes: 8,
  },
  {
    slug: "emre-kaya",
    name: "Emre Kaya",
    role: "Photographer",
    place: "Istanbul, TR",
    trade: "Image",
    volume: 3,
    photo: PHOTOS.cameraMan,
    detail: PHOTOS.library,
    dek: "Shooting a city on expired film, one roll a week, and printing only what still surprises him a year later.",
    quote: "I wait a year before I look at the negatives. By then I've forgotten what I wanted, and I can see what I got.",
    body: [
      "Emre's apartment is mostly shelves: of books, of film canisters, of contact sheets in shoeboxes labelled by month. He photographs the same three streets near the ferry terminal, over and over, in every season.",
      "He prints in a bathroom darkroom with the window taped over, and the prints that survive his year-long rule end up pinned along the hallway until someone asks for one.",
    ],
    minutes: 6,
  },
  {
    slug: "maren-holt",
    name: "Maren Holt",
    role: "Weaver",
    place: "Bergen, NO",
    trade: "Textile",
    volume: 2,
    photo: PHOTOS.weaverHands,
    detail: PHOTOS.loom,
    dek: "Wool from three neighbouring farms, dyed with what grows along the fjord, woven on a loom older than her house.",
    quote: "The loom keeps time better than I do. I just try not to interrupt it.",
    body: [
      "Maren's loom came from a schoolhouse that closed in the seventies, in pieces, with no instructions. Rebuilding it took a summer. Learning it took the next five.",
      "Her blankets take a month each. She keeps a notebook of every colour — the lichen, the birch bark, the onion skins from the café down the road — so that no two are dyed the same way twice.",
    ],
    minutes: 8,
  },
  {
    slug: "theo-lindqvist",
    name: "Theo Lindqvist",
    role: "Writer",
    place: "Copenhagen, DK",
    trade: "Homes",
    volume: "Online",
    photo: PHOTOS.readerWindow,
    detail: PHOTOS.mirrorDesk,
    dek: "A novelist's flat with no television, one good chair, and a window that faces the harbour.",
    quote: "I moved the chair to the window and the book finally started. That was the whole renovation.",
    body: [
      "Theo writes in the mornings and reads in the afternoons, in the same chair, which has migrated around the flat for six years looking for the right light.",
      "The flat holds almost nothing that isn't used daily. The exception is a shelf of first editions he cannot afford to read and cannot bear to sell.",
    ],
    minutes: 5,
  },
  {
    slug: "hamid-rezaei",
    name: "Hamid Rezaei",
    role: "Potter",
    place: "Isfahan, IR",
    trade: "Ceramics",
    volume: 1,
    photo: PHOTOS.potterWheel,
    detail: PHOTOS.clayArtisan,
    dek: "A fourth-generation potter throwing water jars on a kick-wheel, in a courtyard his family has worked since 1931.",
    quote: "My grandfather's thumbprint is still on the wheel. I put mine beside it every morning.",
    body: [
      "The courtyard is shared by three workshops and one fig tree, and in summer everything happens in the tree's shade. Hamid throws in the cool of the morning and trims in the afternoon heat, when the clay is leather-hard.",
      "His jars keep water cold through evaporation, a technique older than any of the buildings around him. He sells most of them to neighbours, and a few, reluctantly, to us.",
    ],
    minutes: 10,
  },
  {
    slug: "sari-wibowo",
    name: "Sari Wibowo",
    role: "Plant photographer",
    place: "Yogyakarta, ID",
    trade: "Image",
    volume: 3,
    photo: PHOTOS.plantsCamera,
    detail: PHOTOS.vinylStudio,
    dek: "A greenhouse turned studio, where the subjects grow a few millimetres between every frame.",
    quote: "Plants are the most patient sitters. They just need you to be patient back.",
    body: [
      "Sari photographs the same forty plants every week and has done for three years, building a slow archive of growth, rot and recovery.",
      "The studio is warm, wet and loud with insects. Her cameras live in sealed boxes with rice; her prints live in the only dry room, which is also her bedroom.",
    ],
    minutes: 6,
  },
  {
    slug: "nalu-kahale",
    name: "Nalu Kahale",
    role: "Board shaper",
    place: "Hilo, HI",
    trade: "Wood",
    volume: 3,
    photo: PHOTOS.boards,
    detail: PHOTOS.houseboats,
    dek: "Hollow wooden surfboards, built rib by rib from storm-felled trees, in a shed that floods twice a year.",
    quote: "Every board starts as a tree somebody else gave up on.",
    body: [
      "Nalu's shed is stacked to the rafters with blanks, ribs and finished boards waiting for owners. He works only with wood that has already fallen — after storms, from clearings, from a neighbour's yard.",
      "A board takes six weeks. He rides each one before he sells it, and keeps a ledger of where every one of them has been.",
    ],
    minutes: 7,
  },
  {
    slug: "leyla-aydin",
    name: "Leyla Aydın",
    role: "Grower & florist",
    place: "Bodrum, TR",
    trade: "Garden",
    volume: 2,
    photo: PHOTOS.bougainvillea,
    detail: PHOTOS.teacup,
    dek: "A cutting garden on a terraced hillside, and arrangements that are mostly about what to leave out.",
    quote: "I grow three times what I need so I can choose the one stem that is a little wrong.",
    body: [
      "Leyla's terraces were olive groves until her father's generation; now they hold dahlias, wild fennel and a stubborn bougainvillea that predates everyone.",
      "She sells at the Saturday market and arranges for two restaurants. The arrangements are spare: one branch, a few heads, a lot of air.",
    ],
    minutes: 5,
  },
  {
    slug: "ada-wren",
    name: "Ada Wren",
    role: "Portraitist",
    place: "Lisbon, PT",
    trade: "Image",
    volume: 1,
    photo: PHOTOS.filmPortrait,
    detail: PHOTOS.handwriting,
    dek: "Black-and-white portraits made in one sitting, one roll, and a long conversation beforehand.",
    quote: "The photograph happens in the last ten minutes. The first two hours are tea.",
    body: [
      "Ada shoots only in her sitters' homes, never her own, and never the same day she meets them. The first visit is for talking; the second, a week later, is for the camera.",
      "She develops in batches on Sundays. The portraits that make it into her archive come with a handwritten note from the sitter, which she files beside the negative.",
    ],
    minutes: 6,
  },
  {
    slug: "joaquin-varela",
    name: "Joaquín Varela",
    role: "Professor of drawing",
    place: "San Sebastián, ES",
    trade: "Homes",
    volume: 2,
    photo: PHOTOS.elderReader,
    detail: PHOTOS.commode,
    dek: "Forty years of teaching drawing, a house full of former students' gifts, and a sketchbook for every year.",
    quote: "Teaching is just drawing slowly enough that somebody else can watch.",
    body: [
      "Joaquín retired from the academy last spring and has not stopped drawing for a day. His house is a museum nobody curated: a chair from one student, a bowl from another, a door painted by a class of first-years in 1988.",
      "The sketchbooks fill a whole wall, one spine per year. He can find any day in under a minute.",
    ],
    minutes: 7,
  },
]

export function storyBySlug(slug: string | null | undefined): Story | undefined {
  return STORIES.find((s) => s.slug === slug)
}

/** The right half of the home page: the people in the current volume. */
export const HERO_SLIDES = ["ines-teo-marchetti", "saoirse-lennox", "matthias-ekdahl", "emre-kaya", "theo-lindqvist", "sari-wibowo", "maren-holt"]
  .map((slug) => storyBySlug(slug)!)

/** The left half: dispatches — features, visits and photo essays. */
export type Dispatch = {
  title: string
  summary: string
  photo?: number
  /** "volume" renders the live book on the timber instead of a photo. */
  kind: "volume" | "photo"
  href: string
  ratio: "portrait" | "landscape" | "square"
}

export const DISPATCHES: Dispatch[] = [
  {
    title: "Salt & Timber, Volume 3",
    summary: "Introducing our third volume: twelve people who build by hand on the edge of the sea, printed on uncoated stock and bound in cloth.",
    kind: "volume",
    href: "/shop",
    ratio: "portrait",
  },
  {
    title: "Found Objects: a Studio Visit",
    summary: "An afternoon in a shared studio where nothing is thrown away and everything is waiting to become something.",
    photo: PHOTOS.studioLoft,
    kind: "photo",
    href: "/stories",
    ratio: "landscape",
  },
  {
    title: "A Weekend at the A-Frame",
    summary: "Two days, one stove, no signal: a cabin built by a family of carpenters, three summers in a row.",
    photo: PHOTOS.aFrame,
    kind: "photo",
    href: "/stories",
    ratio: "portrait",
  },
  {
    title: "Letters Kept",
    summary: "Why the makers in this volume still write by hand — and the letters they agreed to let us read.",
    photo: PHOTOS.letters,
    kind: "photo",
    href: "/stories",
    ratio: "square",
  },
  {
    title: "Photographs from the Canal",
    summary: "Personal photographs from a week spent on a moored houseboat, waiting for the light to come back.",
    photo: PHOTOS.canal,
    kind: "photo",
    href: "/stories",
    ratio: "landscape",
  },
]
