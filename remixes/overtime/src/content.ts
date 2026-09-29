/**
 * Every word on the site, in one place.
 *
 * Harbour Voices is an oral-history archive: eighty-four people who worked the
 * port of Vela between the fifties and the nineties, each photographed and
 * each telling one story in their own words. Vela and everyone in it are
 * invented for this remix — replace them with your own archive, and the
 * grid, the list, the gallery and every story page follow.
 */

import { ARCHIVE, PORTRAITS, SESSIONS, type Sex } from "@/photos"

export const project = {
  name: "Harbour Voices",
  city: "Vela",
  tagline: "Portraits from the port of Vela",
  intro:
    "Between 1950 and 1990 the port of Vela moved a country's cargo by hand. These are the people who did it, in their own words.",
  since: "2023",
  credits: "Photographs courtesy of Pexels",
}

/** A Pexels photo at a given size. `fit=crop` keeps the grid square. */
export function pexels(id: number, width: number, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const categories = [
  "Dock Stories",
  "Net Stories",
  "Kitchen Stories",
  "Market Stories",
  "Night Shift Stories",
  "Ferry Stories",
  "Workshop Stories",
  "Song Stories",
] as const

export type Category = (typeof categories)[number]

export interface Person {
  /** 1-based, the number printed beside the portrait. */
  number: number
  slug: string
  name: string
  first: string
  trade: string
  category: Category
  born: string
  bornOn: string
  quay: string
  years: string
  age: number
  photo: number
  photographer: string
  recordedBy: string
  story: string[]
  archive: { photo: number; photographer: string; caption: string }[]
}

const MEN = [
  "Anselmo Duarte Rivas", "Teodoro Brancato", "Iñigo Salvat Ferrer", "Mateu Colom", "Rafael Ondarra",
  "Emilio Castaño Vidal", "Nuno Alvarenga", "Bartolo Mazzei", "Ciro Esposito Lanza", "Felipe Arrieta",
  "Gaspar Lluch", "Octavio Serrano Mir", "Lázaro Quintana", "Hilario Bengoa", "Aurelio Pardal",
  "Damián Otxoa", "Silvio Pagano", "Joaquim Barros", "Evaristo Llano", "Tomeu Vicens",
  "Arturo Belda Soto", "Crispín Morales", "Gennaro Amato", "Leandro Faria", "Fermín Urrutia",
  "Baltasar Ruiz Nieto", "Paco Almela", "Amadeo Rossi", "Sebastián Iriarte", "Vicente Borrás",
  "Horacio Mendes", "Marcelino Oliva", "Reinaldo Soler", "Toni Garau", "Ignazio Ferraro",
  "Adolfo Cerdán", "Benigno Rey", "Martí Riera Pons", "Salvatore Greco", "Joaquín Beltrán",
  "Florencio Aznar", "Lucio Carvalho", "Eusebio Landa", "Oriol Mas", "Pascual Ibarra",
  "Rodrigo Seixas", "Casimiro Vela", "Nicanor Tur", "Ramiro Castelo", "Wenceslao Pujol",
  "Abel Nogueira", "Dionisio Sarasola", "Enzo Marchetti", "Tadeo Valls", "Gregorio Lema",
]

const WOMEN = [
  "Amparo Salinas", "Rosalía Brandão", "Teresa Mir Ordóñez", "Carmela Russo", "Pilar Echeverría",
  "Maruxa Freire", "Nieves Albiol", "Concetta Lombardi", "Remedios Garcés", "Filomena Sousa",
  "Inmaculada Roig", "Adela Quirós", "Margalida Ferrà", "Esperanza Cid", "Lucía Arrom",
  "Sabina Costa", "Dolores Aguirre", "Graziella Monti", "Montserrat Vives", "Benedita Rocha",
  "Aurora Tomàs", "Chelo Maragall", "Ismena Duarte", "Julita Echave", "Paloma Seoane",
  "Vicenta Llobet", "Carolina Pires", "Mercè Adrover", "Rosaria Bellini", "Eulalia Terán",
  "Fina Castellví", "Regina Macedo", "Asunción Ferrán", "Nunzia Caruso",
]

const QUAYS = ["North Mole", "Salt Quay", "Pier Four", "The Old Basin", "Coal Wharf", "Ferry Steps", "Fish Market Quay"]
const PLACES = [
  "Lower Town, Vela", "Salt Street, Vela", "Cabo Rhei", "Arrano", "Santa Irene", "Vela", "Porto Laz",
  "The Barrio Alto, Vela", "Isla Morena", "Castell de Mar", "San Telmo, Vela", "Riba d'Or",
]

const RECORDERS = [
  "Alba Quesada", "Joan Ferrer Mas", "Irene Lobo", "Marco Taddei", "Nadia Cruz Pellicer", "Hugo Almeida",
  "Clara Busquets", "Tomás Ederra", "Laia Oms", "Pietro Canale", "Sara Nunes", "Unai Goikoetxea",
  "Mireia Serra", "Bruno Lacerda", "Olivia Monfort", "Diego Vallejo",
]

/** What each kind of story is about, and three ways a person told it. */
const TRADES: Record<Category, { trades: string[]; stories: ((first: string) => string[])[] }> = {
  "Dock Stories": {
    trades: ["Stevedore", "Crane driver", "Tally clerk"],
    stories: [
      (n) => [
        `${n} learned the docks from the ground up — first a sack of coffee on each shoulder, then a crane cab forty feet over the water. "You never lift with your back," ${n} told us. "You lift with the man next to you."`,
        `For thirty-one years the whistle at six decided the day. ${n} remembers the winter of the big strike, when nobody unloaded a thing for eleven days and the whole quay ate from one pot. "We were poorer that month than any other," ${n} said, "and we laughed more."`,
      ],
      (n) => [
        `${n} counted everything that came off a ship: crates, barrels, bales, once a racehorse. The tally books are still in a drawer at home, the pencil marks gone soft with time.`,
        `"The numbers had to agree before anyone went home," ${n} said. "If they did not, you counted again in the dark." ${n} still counts the steps on the way up from the harbour, out of habit, and still gets two hundred and twelve.`,
      ],
      (n) => [
        `${n} started at fourteen, carrying water to the gangs on Pier Four, and stayed until the containers came and the gangs went. "One morning there were ninety of us on the quay," ${n} said. "The next year, there were nine."`,
        `What ${n} misses is not the work. It is the noise — the shouting, the chains, the radio someone always had going in the tally hut. "Now it is so quiet down there you can hear the gulls argue."`,
      ],
    ],
  },
  "Net Stories": {
    trades: ["Fisherman", "Net mender", "Boat hand"],
    stories: [
      (n) => [
        `${n} went out on the family boat before the sun came up, every day from the age of nine. The boat was called Esperança and leaked from the same plank for twenty years; nobody ever fixed it, because it never got worse.`,
        `"The sea is not your friend and not your enemy," ${n} said. "It is your boss." ${n} still walks to the end of the North Mole every morning to read the water, and still knows by eight whether it would have been a good day.`,
      ],
      (n) => [
        `${n} mended nets on the Salt Quay for forty years, in the same spot, with the same wooden needle. The knots are faster than the eye can follow; ${n} tied one for us while talking and did not look down once.`,
        `"A net is only holes, held together by a little bit of string," ${n} said. "Like a family." The needle is going to a granddaughter, who has promised to learn.`,
      ],
      (n) => [
        `${n} worked the night boats for sardine, when the lamps went out on the water and the whole bay looked like a second town. Some nights the catch was so heavy the boat sat an inch from going under.`,
        `${n} was in the water once, in the storm of 1971, for most of an hour. "I was not afraid," ${n} said. "I was angry. I had just bought new boots." The boots, somehow, were saved too.`,
      ],
    ],
  },
  "Kitchen Stories": {
    trades: ["Canteen cook", "Galley cook", "Café owner"],
    stories: [
      (n) => [
        `${n} ran the dockers' canteen for twenty-two years: soup at five, stew at noon, and nobody paid on Fridays until the wages came. There was a slate by the door with every name on it, and ${n} says it was always wiped clean by Monday.`,
        `"Hungry men tell you everything," ${n} said. ${n} knew who was getting married, who was ill, who was about to leave for the north, usually before their families did.`,
      ],
      (n) => [
        `${n} cooked on a coastal freighter, in a galley the size of a wardrobe, for a crew of eleven who complained about everything except the bread. The recipe for the bread was never written down; ${n} made it for us, from memory, without weighing a thing.`,
        `"On a ship the cook is the second captain," ${n} said. "The first one decides where you go. The second one decides if you are happy when you get there."`,
      ],
      (n) => [
        `${n} opened a café on Ferry Steps with two tables, a borrowed coffee machine and a sign painted by a neighbour. It opened at four in the morning, for the first shift, and closed when the last boat was in.`,
        `The café is still there, under a different name. ${n} goes in some mornings and sits at the table by the window, and the new owners, who know exactly who ${n} is, never let the coffee be paid for.`,
      ],
    ],
  },
  "Market Stories": {
    trades: ["Fish seller", "Auctioneer", "Ice seller"],
    stories: [
      (n) => [
        `${n} sold fish at the market under the arches from the age of twelve, standing on a crate to see over the counter. By sixteen, ${n}'s voice carried the length of the hall, and the other sellers complained that nobody could hear them.`,
        `"You sell the fish with your eyes before your hands," ${n} told us. The scale ${n} used for fifty years hangs in the kitchen at home now, still accurate to the gram.`,
      ],
      (n) => [
        `${n} ran the dawn auction at the fish market, where a whole boat's catch was sold in the time it takes to boil an egg. The prices were shouted, the bids were a raised finger, and a wrong cough could buy you a crate of octopus.`,
        `"I never once got it wrong," ${n} said, and then, after a moment: "I got it wrong twice." Both times, it turned out, in the buyer's favour.`,
      ],
      (n) => [
        `${n} delivered ice to the boats before there were fridges on board — blocks as big as a door, dragged on a cart through the streets at four in the morning, dripping a line back to the ice house.`,
        `"The whole summer my hands were cold and my back was hot," ${n} said. Children would follow the cart for the chips that fell off it, and ${n} always made sure a few more fell than needed to.`,
      ],
    ],
  },
  "Night Shift Stories": {
    trades: ["Night watchman", "Lighthouse keeper", "Pilot boat hand"],
    stories: [
      (n) => [
        `${n} was the night watchman on the Coal Wharf for nineteen years, with a lamp, a flask and a dog called Moreno who was braver than any man on the quay.`,
        `"At night the port talks to itself," ${n} said. The ropes creak, the hulls knock, the water slaps the steps. ${n} learned every sound, and knew within a minute when one of them was wrong.`,
      ],
      (n) => [
        `${n} kept the light at the end of the North Mole — winding the clockwork, polishing the lens, writing the weather in a book every three hours, all night, every night, for twenty-six years.`,
        `"Nobody thanks a lighthouse," ${n} said. "It is only noticed when it goes out." It went out once, for four minutes, in 1968. ${n} still remembers the exact time.`,
      ],
      (n) => [
        `${n} crewed the pilot boat that went out in any weather to meet the big ships and put a pilot on board. Climbing a rope ladder up the side of a moving hull in the dark was, ${n} says, "the easy part."`,
        `The hard part was the waiting — hours in the cabin with the radio hissing, listening for a call sign. ${n} learned to sleep sitting up and wake at the first word.`,
      ],
    ],
  },
  "Ferry Stories": {
    trades: ["Ferry deckhand", "Ticket seller", "Ferry captain"],
    stories: [
      (n) => [
        `${n} crossed the bay four times a day for thirty years, on a ferry that everyone in Vela called La Vieja even when it was new. ${n} knew the regulars by name, by their coats, and by what they carried.`,
        `"I watched a whole town grow up on that deck," ${n} said. Children who crossed to school came back as teachers. Couples who met on the crossing came back with prams.`,
      ],
      (n) => [
        `${n} sold ferry tickets from a wooden booth on Ferry Steps, through a window the size of a book. The booth had a stove, a radio and a view of the whole bay, and ${n} says it was the best office in the country.`,
        `The tickets were printed on card, in four colours, and ${n} kept one of each from every year. The collection fills two shoeboxes and ${n} can tell you the price of a crossing in any year you name.`,
      ],
      (n) => [
        `${n} started as a deckhand and ended as the captain of the evening crossing. The last ferry of the night was the one people remembered: dockers going home, couples, and once a brass band with all its instruments.`,
        `"I never lost anyone overboard," ${n} said, "but I lost a lot of hats." There is a spot in the middle of the bay where, ${n} swears, there must be a hundred of them on the bottom.`,
      ],
    ],
  },
  "Workshop Stories": {
    trades: ["Boatbuilder", "Welder", "Rope maker"],
    stories: [
      (n) => [
        `${n} built wooden boats in the yard behind the Old Basin, by eye, from drawings made in chalk on the floor. Each one took a winter. ${n} can still say where every one of them ended up, and which are still afloat.`,
        `"Wood remembers everything you do to it," ${n} said. "Metal forgives you. Wood never does." There are fourteen of ${n}'s boats still in the water, and one in a museum.`,
      ],
      (n) => [
        `${n} welded hulls in the dry dock, inside the ship, in the heat and the dark, with a mask and a lamp and a radio playing to keep from going mad.`,
        `"You are closer to the ship than the captain ever is," ${n} said. When a ship ${n} had worked on came back into port years later, ${n} would go down to the quay and put a hand on its side.`,
      ],
      (n) => [
        `${n} made rope in the long shed on Salt Street, walking backwards down a two-hundred-metre floor while the strands twisted in front. By the end of a day ${n} had walked the length of the port three times, backwards.`,
        `"Every ship in Vela was tied up with our rope," ${n} said. The shed is apartments now. ${n} lives in one of them, on the floor where the walk used to end.`,
      ],
    ],
  },
  "Song Stories": {
    trades: ["Accordionist", "Choir leader", "Tavern singer"],
    stories: [
      (n) => [
        `${n} worked the cranes by day and played the accordion by night in the taverns along the quay, for tips, drinks and once, memorably, a live chicken.`,
        `"Dockers do not dance," ${n} said. "Until the third song." ${n} still plays every Sunday in the square, and the tunes are the same ones the whole port used to know.`,
      ],
      (n) => [
        `${n} led the fishermen's choir for twenty years — forty voices, no sheet music, and rehearsals in the net loft because it was the only room big enough.`,
        `The choir sang at weddings, launches and, far too often, at funerals. "We sang the sea songs so nobody would forget them," ${n} said. ${n} sang one for us, and did not need to stop once to remember the words.`,
      ],
      (n) => [
        `${n} sang in the tavern on the corner of the Salt Quay every Saturday for thirty years. The songs were about the sea, about leaving, about coming back, and nearly everyone listening had done all three.`,
        `"A good song is a letter to someone who is not in the room," ${n} said. The tavern closed in 1994; ${n} still has the key and has never been asked for it back.`,
      ],
    ],
  },
}

const ARCHIVE_CAPTIONS = ["1952", "1958", "1961", "1964", "1967", "1970", "1973", "1976"]

/** A small deterministic shuffle, so the grid mixes the portraits the same way on every load. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function shuffle<T>(items: T[], seed: number) {
  const out = items.slice()
  const rand = seeded(seed)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function build(): Person[] {
  const order = shuffle(PORTRAITS, 7)
  const names: Record<Sex, string[]> = { m: MEN.slice(), f: WOMEN.slice() }
  const rand = seeded(19)

  return order.map(([photo, photographer, sex], index) => {
    const name = names[sex].shift() ?? `Unnamed ${index + 1}`
    const first = name.split(" ")[0]
    const category = categories[index % categories.length]
    const kind = TRADES[category]
    const variant = Math.floor(index / categories.length) % kind.stories.length
    const year = 1928 + Math.floor(rand() * 26)
    const month = 1 + Math.floor(rand() * 12)
    const day = 1 + Math.floor(rand() * 28)
    const start = year + 14 + Math.floor(rand() * 6)
    const span = 18 + Math.floor(rand() * 22)
    const archivePick = [ARCHIVE[index % ARCHIVE.length], ARCHIVE[(index + 7) % ARCHIVE.length]]

    return {
      number: index + 1,
      slug: slugify(name),
      name,
      first,
      trade: kind.trades[variant],
      category,
      born: PLACES[Math.floor(rand() * PLACES.length)],
      bornOn: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`,
      quay: QUAYS[index % QUAYS.length],
      years: `${start} – ${start + span}`,
      age: 2024 - year,
      photo,
      photographer,
      recordedBy: RECORDERS[index % RECORDERS.length],
      story: kind.stories[variant](first),
      archive: archivePick.map(([id, by], i) => ({
        photo: id,
        photographer: by,
        caption: ARCHIVE_CAPTIONS[(index + i * 3) % ARCHIVE_CAPTIONS.length],
      })),
    }
  })
}

export const people = build()

export function findPerson(slug: string) {
  return people.find((person) => person.slug === slug)
}

/** The volunteers who recorded the stories, with who each one sat down with. */
export const recorders = RECORDERS.map((name) => ({
  name,
  people: people.filter((person) => person.recordedBy === name),
})).sort((a, b) => a.name.localeCompare(b.name))

export const sessions = SESSIONS.map(([photo, photographer]) => ({ photo, photographer }))

export const about = {
  title: "About the project",
  body: [
    "Harbour Voices began with a box of photographs found in the harbour master's office when it was cleared out in 2023: hundreds of faces, almost none of them named. We set out to find out who they were, and found that many of them were still here, living a few streets from the water.",
    "Over two years, sixteen volunteers sat down with eighty-four people who worked the port of Vela between 1950 and 1990 — stevedores, net menders, cooks, ferry crews, rope makers, singers. We asked each of them for one story. Not a life, not a history: one story, the one they would want remembered.",
    "Each story is paired with a portrait taken on the day we met, and with a picture or two from their own family albums. The stories are printed here as they were told, trimmed for length but not for voice.",
    "The port of Vela still works, with a fraction of the people and none of the noise. This archive is for the rest of it: the whistles, the shouting, the songs, and the names.",
  ],
  quote: "A town is only the people who carried it.",
}
