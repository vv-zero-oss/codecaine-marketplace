/**
 * Every word on the site, in one place.
 *
 * Overtime is a long-read sports quarterly, and this is its twelfth issue:
 * eighty-four athletes across eight sports, each photographed and each asked
 * the same question — what does it cost to keep going? The magazine, its
 * writers and every athlete in it are invented for this remix. Replace them
 * with your own, and the grid, the list, the gallery and every profile follow.
 */

import { ARCHIVE, PORTRAITS, SESSIONS, type Sex, type Sport } from "@/photos"

export const project = {
  name: "Overtime",
  issue: "Issue 12",
  tagline: "The long-read sports quarterly",
  intro:
    "Eighty-four athletes, eight sports, one question: what does it cost to keep going after the whistle? Overtime, issue twelve.",
  since: "2019",
  credits: "Photographs courtesy of Pexels",
}

/** A Pexels photo at a given size. `fit=crop` keeps the grid square. */
export function pexels(id: number, width: number, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const categories: Sport[] = ["Boxing", "Basketball", "Cycling", "Track", "Football", "Rugby", "Swimming", "Tennis"]
export type Category = Sport

/**
 * Each sport's accent: the glow behind its profiles and the dot beside its
 * name. The values are CSS tokens (`--color-sport-*` in `index.css`), so a
 * sport is recoloured in one place.
 */
export const sportAccent: Record<Sport, string> = {
  Boxing: "var(--color-sport-boxing)",
  Basketball: "var(--color-sport-basketball)",
  Cycling: "var(--color-sport-cycling)",
  Track: "var(--color-sport-track)",
  Football: "var(--color-sport-football)",
  Rugby: "var(--color-sport-rugby)",
  Swimming: "var(--color-sport-swimming)",
  Tennis: "var(--color-sport-tennis)",
}

export interface Person {
  /** 1-based, the number printed beside the portrait. */
  number: number
  slug: string
  name: string
  first: string
  /** Position, weight class or event. */
  role: string
  category: Sport
  born: string
  bornOn: string
  club: string
  /** The years of their career, "2009 – 2024" or "2016 – now". */
  years: string
  age: number
  photo: number
  photographer: string
  writer: string
  headline: string
  story: string[]
  archive: { photo: number; photographer: string; caption: string }[]
}

const MEN = [
  "Mateo Arrieta", "Kwame Oduya", "Luca Ferrand", "Dario Kessler", "Jonah Achterberg", "Ilias Moreau", "Tomás Réka",
  "Emre Vannucci", "Noah Lindqvist", "Sami Okonkwo", "Rafa Delacroix", "Viktor Hale", "Andile Mbeki", "Oskar Brandt",
  "Leo Castellano", "Yusuf Adeyemi", "Marco Salvi", "Theo Marchand", "Ezra Kowalczyk", "Nico Albrecht", "Julian Osei",
  "Bastien Roux", "Mika Halvorsen", "Aaron Dufresne", "Kofi Mensah", "Pablo Iturbe", "Lars Engström", "Dmitri Sokol",
  "Idris Balogun", "Felix Aranda", "Hugo Rinaldi", "Samuel Achebe", "Ruben Vos", "Anton Weiss", "Omar Benali",
  "Tobias Kaur", "Elias Mora", "Kenji Arai", "Callum Reyes", "Joaquín Palma", "Adrien Faure", "Malik Diallo",
  "Stefan Novak", "Iker Zubiri", "Gabriel Tenório", "Ronan Keane", "Victor Ilunga", "Lorenzo Pini", "Nils Aaberg",
  "Chidi Nwosu", "Mathis Leclerc", "Diego Solano", "Arjun Mehta", "Florian Baum", "Tariq Haddad", "Enzo Moretti",
  "Kai Nakamura", "Bruno Salgado", "Petr Hollan",
]

const WOMEN = [
  "Maya Okafor", "Lena Vasquez", "Ines Marchetti", "Sofia Lindgren", "Amara Diop", "Clara Weiland", "Noor Haddad",
  "Elena Rusu", "Zoe Adebayo", "Freya Holm", "Lucía Paredes", "Hana Sato", "Imani Brooks", "Nadia Petrov",
  "Ava Kristiansen", "Rosa Delgado", "Yara Bensaid", "Julia Szabo", "Priya Anand", "Mira Castellanos",
  "Teodora Ilic", "Chiara Bellini", "Aisha Kamara", "Signe Nyberg", "Valentina Cruz",
]

const PLACES = [
  "Marseille", "Lagos", "Rotterdam", "Porto", "Kraków", "Accra", "Bilbao", "Naples", "Gothenburg", "Leeds",
  "Montreal", "Osaka", "Nairobi", "Valencia", "Belgrade", "São Paulo", "Cork", "Lyon", "Durban", "Turin",
]

const WRITERS = [
  "Ines Varga", "Theo Lindqvist", "Amaya Rourke", "Jonas Petrakis", "Sade Olumide", "Marek Holub",
  "Clémence Aubry", "Rafael Duarte", "Nia Castellanos", "Ewan McCrae", "Leila Farouk", "Otto Brandvold",
]

/** Per sport: the roles an athlete might hold, the clubs, and three ways a profile can go. */
const SPORTS: Record<Sport, { roles: string[]; clubs: string[]; headlines: string[]; stories: ((n: string) => string[])[] }> = {
  Boxing: {
    roles: ["Middleweight", "Lightweight", "Super-welterweight"],
    clubs: ["Dockside Boxing Club", "Rue Ardente Gym", "Northgate ABC"],
    headlines: ["Twelve rounds with the quiet", "The gym at six a.m.", "What the corner sees"],
    stories: [
      (n) => [
        `${n} trains in a gym with no windows and one rule written above the ring: nobody talks about the last fight. "The last fight is gone," ${n} says, wrapping a hand in the same pattern as every morning for eleven years. "You only get to talk about the next one."`,
        `The record reads nineteen wins and two losses, and ${n} can describe both losses round by round. "The wins, I don't remember so well," ${n} admits. "The losses taught me where my feet go when I'm tired. That's worth more than a belt."`,
      ],
      (n) => [
        `At six every morning, before the city is awake, ${n} runs the harbour wall and back — eight kilometres, the same route since the first amateur bout. The run is not training, ${n} insists. "It's where I decide if I still want this."`,
        `So far the answer has always been yes. ${n} has one title fight left on the contract and no plan beyond it, which is, apparently, the plan. "When I stop, I want to stop the way you stop a car. Not the way you crash one."`,
      ],
      (n) => [
        `Every boxer, ${n} says, fights two opponents: the one across the ring and the one in the mirror at the weigh-in. For ${n} the second has always been harder — three kilos to lose in a week, every week, for most of a career.`,
        `What keeps ${n} going is the corner: the same trainer since fourteen, who says less in a minute between rounds than most people say in an hour. "He never tells me I'm winning," ${n} says. "He tells me what to do next. That's better."`,
      ],
    ],
  },
  Basketball: {
    roles: ["Point guard", "Shooting guard", "Power forward"],
    clubs: ["Harbour Lights BC", "Olympia Norte", "Westside Comets"],
    headlines: ["Five hundred shots before breakfast", "The court at the end of the street", "The pass nobody sees"],
    stories: [
      (n) => [
        `${n} takes five hundred shots a day and writes down every miss. The notebook is in its fourth year and the handwriting is getting smaller. "I don't write the makes," ${n} says. "The makes don't tell you anything."`,
        `This season the notebook says ${n} is shooting forty-one percent from three, the best in the league. ${n} shrugs at the number. "Next season somebody will guard me like they read it. So I have to be better than what's written."`,
      ],
      (n) => [
        `The court where ${n} learned the game is still there, at the end of a street that has changed its name twice. The rims are chain nets, the lines are painted by hand, and on a summer evening there are forty people waiting for next.`,
        `${n} goes back every off-season and plays pickup until someone recognises the jump shot. "Then it's over," ${n} laughs. "Then everybody wants to guard me, and nobody wants to pass."`,
      ],
      (n) => [
        `Coaches call ${n} the best passer they have never been able to put in a highlight reel. The best passes, ${n} explains, are the ones that make somebody else look good, and the camera is always on the somebody else.`,
        `"I count assists the way other people count points," ${n} says. "If the whole team scores ten, that's a better night for me than if I score thirty and we lose." It is, by any measure, a minority view in the league. It is also why ${n} keeps getting signed.`,
      ],
    ],
  },
  Cycling: {
    roles: ["Climber", "Domestique", "Time-trialist"],
    clubs: ["Équipe Littoral", "Team Serra Alta", "Nordvind Racing"],
    headlines: ["Nine thousand metres of climbing", "The rider nobody films", "Racing the clock alone"],
    stories: [
      (n) => [
        `${n} climbs for a living. On the queen stage last summer that meant nine thousand metres of ascent in one day, and a descent in the rain that ${n} still dreams about. "Going up is suffering," ${n} says. "Going down is fear. I prefer the suffering."`,
        `Weight is everything on a climb, and ${n} weighs everything: the bottle, the food in the pocket, the socks. "People think we are crazy," ${n} says. "They are right. But on a twenty percent ramp, crazy is fast."`,
      ],
      (n) => [
        `A domestique rides so somebody else can win. ${n} has done it for nine seasons — fetching bottles, closing gaps, sitting in the wind at the front of the bunch for four hours so the leader doesn't have to.`,
        `${n} has never won a professional race and does not expect to. "My name is on nothing," ${n} says, "and it's in every result." When the leader won the national title in June, the first person he hugged past the line was ${n}.`,
      ],
      (n) => [
        `A time trial is the loneliest race in cycling: one rider, one clock, forty kilometres and nobody to hide behind. ${n} loves it for exactly that reason. "Nobody helps you, and nobody gets in your way."`,
        `${n} rides with no music and no radio, only a number on the screen that says how much power is left. "At the end I'm empty," ${n} says. "If I cross the line with anything left, I rode it wrong."`,
      ],
    ],
  },
  Track: {
    roles: ["100m / 200m", "400m hurdles", "800m"],
    clubs: ["Stadion Athletic Club", "Harriers Sud", "Lakeside Track Club"],
    headlines: ["Ten seconds, twelve years", "Ten hurdles and a long wait", "The last two hundred metres"],
    stories: [
      (n) => [
        `The race lasts eleven seconds. The preparation has lasted twelve years. ${n} has done the arithmetic, and says it's the best trade ever made. "Twelve years for eleven seconds," ${n} says. "And I'd do it again for ten."`,
        `On the start line ${n} thinks of nothing, which takes practice. "If you think about the gun, you're late. If you think about the finish, you're slow. You have to be empty, like a room before the party."`,
      ],
      (n) => [
        `${n} runs the 400 metres hurdles, which coaches call the hardest event on the track: a flat-out sprint that turns into a test of how you count strides with no oxygen left. ${n} counts in a language no one else on the team speaks.`,
        `The ninth hurdle is where races are lost, ${n} says. "Everybody is fine at the first. At the ninth your legs are asking questions. You need an answer ready."`,
      ],
      (n) => [
        `${n} runs the 800 metres, two laps that ask for a sprinter's speed and a distance runner's patience at the same time. The first lap is tactics. The second, ${n} says, is character.`,
        `"In the last two hundred metres everybody is in pain," ${n} says. "The question is only who is more curious about what happens if they keep going." ${n} has been curious for nine seasons, and has two national titles to show for it.`,
      ],
    ],
  },
  Football: {
    roles: ["Centre-back", "Midfielder", "Winger"],
    clubs: ["FC Vento", "Atlético Riba", "Union Kaiserhof"],
    headlines: ["Ninety minutes of reading the game", "The engine in midfield", "The touchline and the crowd"],
    stories: [
      (n) => [
        `${n} plays centre-back and says the best games are the ones nobody talks about afterwards. "If people remember what I did, something went wrong," ${n} says. "A good defender is invisible. You see only the attacker who didn't score."`,
        `${n} watches every opponent's last five matches, twice. The second time the sound is off. "You see how they move when they're tired," ${n} says. "That's when they tell you what they'll do."`,
      ],
      (n) => [
        `Last season ${n} ran thirteen kilometres a game, more than anyone else in the league. The number embarrasses ${n} a little. "Running is not the job," ${n} says. "Arriving is the job. I just arrive a lot."`,
        `${n} came through the academy at nine and has never played for another club. The captain's armband came last year, and with it the habit of staying on the pitch until every teammate has gone in.`,
      ],
      (n) => [
        `On the wing, ${n} plays with the crowd a metre away. They shout advice, abuse and, once, a marriage proposal. "You hear everything," ${n} says. "You learn to hear it like the weather."`,
        `${n}'s best goal came from a corner of the pitch where the stand is closest, with the whole block on its feet before the ball crossed the line. "I didn't celebrate," ${n} says. "I didn't have to. They did it for me."`,
      ],
    ],
  },
  Rugby: {
    roles: ["Flanker", "Fly-half", "Prop"],
    clubs: ["Old Quay RFC", "Stade Marin", "Northfield Rovers"],
    headlines: ["Eighty minutes in the dark", "The kick to win it", "The front row"],
    stories: [
      (n) => [
        `${n} plays openside flanker, a position that asks you to arrive at every breakdown before anyone else and leave after everyone else. In a good game, ${n} makes twenty tackles. In a great one, ${n} can't remember any of them.`,
        `"Rugby is eighty minutes of decisions made while someone is sitting on you," ${n} says. "You make them anyway. The ones you get wrong, you fix at the next ruck."`,
      ],
      (n) => [
        `${n} has kicked for goal in front of fifty thousand people with the match on the line and says the stadium goes quiet in a way that no other silence does. "It's not quiet," ${n} says. "It's held breath. You can feel it on your neck."`,
        `The routine never changes: four steps back, two across, one look at the posts, none at the crowd. ${n} practises it every day, on an empty pitch, with the same silence imagined.`,
      ],
      (n) => [
        `${n} plays prop, in the front row of the scrum, where the game is decided by weight, angles and a kind of patience that doesn't show on television. "People see us push," ${n} says. "They don't see us think."`,
        `${n} has played two hundred matches for the same club and knows every groundsman by name. "They look after the grass," ${n} says. "We're the ones who ruin it. The least you can do is say thank you."`,
      ],
    ],
  },
  Swimming: {
    roles: ["200m freestyle", "100m butterfly", "Open water 10km"],
    clubs: ["Aquatica Club", "Piscina Levante", "Baltic Swim Team"],
    headlines: ["Four hours a day, face down", "The wall and the turn", "Ten kilometres in open water"],
    stories: [
      (n) => [
        `${n} spends four hours a day with a face in the water, which works out to more than a thousand hours a year of staring at a black line on the bottom of a pool. "People ask what I think about," ${n} says. "I think about the next length. Then the next."`,
        `The pool opens at five. ${n} has been in it at five for eleven years, and describes the first dive of the morning as "the only cold thing I love."`,
      ],
      (n) => [
        `In the 100 butterfly, ${n} says, the race is won at the wall. A good turn gains a tenth; a great one gains three. ${n} practises turns more than strokes and can do them, blindfolded, to within a hand of the wall.`,
        `"Swimming is the only sport where you can't hear the crowd," ${n} says. "You come up at the end and there's all this noise, and you have no idea who it's for until you look at the board."`,
      ],
      (n) => [
        `${n} swims ten kilometres in open water — rivers, lakes, once a harbour with a ferry passing too close for comfort. There are no lanes, no walls and, some days, no visibility at all.`,
        `"In a pool you race the clock," ${n} says. "Out there you race the water. The water always wins, but it lets some of us finish first."`,
      ],
    ],
  },
  Tennis: {
    roles: ["Singles", "Doubles specialist", "Singles"],
    clubs: ["Club de Tenis Mar", "Lawn Club Hohenfeld", "Riverside Racquet Club"],
    headlines: ["Alone for three hours", "Two people, one side of the net", "Forty weeks on the road"],
    stories: [
      (n) => [
        `Tennis is the loneliest team sport, ${n} says: a coach, a physio, a family in the stands, and none of them allowed to help once the match begins. "For three hours it's you and a ball. You find out who you talk to when nobody talks back."`,
        `${n}'s best win came in a third-set tiebreak after saving four match points. "I don't remember any of them," ${n} says. "I remember tying my shoe before the last one. That's all."`,
      ],
      (n) => [
        `${n} plays doubles, and has had the same partner for six years — longer, ${n} points out, than most marriages on the tour. They communicate between points in hand signals only the two of them understand.`,
        `"In singles you can be stubborn," ${n} says. "In doubles you have to be generous. Every ball you take is a ball your partner doesn't get to play."`,
      ],
      (n) => [
        `${n} spent forty weeks on the road last year, in thirty-one cities, and saw most of them only from a hotel window and a court. "People think it's glamorous," ${n} says. "It's airports. The glamour is ninety minutes on a Tuesday afternoon."`,
        `What makes it worth it, ${n} says, is the moment in a rally when both players stop thinking and just play. "It lasts maybe twelve shots. Then someone misses. But for twelve shots you are both the best you have ever been."`,
      ],
    ],
  },
}

const ARCHIVE_CAPTIONS = ["1968", "1974", "1979", "1983", "1988", "1992", "1996", "2001"]

/** A small deterministic shuffle, so the grid mixes the sports the same way on every load. */
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
  const order = shuffle(PORTRAITS, 11)
  const names: Record<Sex, string[]> = { m: MEN.slice(), f: WOMEN.slice() }
  const seen: Record<string, number> = {}
  const rand = seeded(23)

  return order.map(([photo, photographer, sex, sport], index) => {
    const name = names[sex].shift() ?? `Athlete ${index + 1}`
    const first = name.split(" ")[0]
    const kind = SPORTS[sport]
    const variant = (seen[sport] = (seen[sport] ?? -1) + 1) % kind.stories.length
    const year = 1984 + Math.floor(rand() * 20)
    const month = 1 + Math.floor(rand() * 12)
    const day = 1 + Math.floor(rand() * 28)
    const start = year + 16 + Math.floor(rand() * 4)
    const retired = rand() < 0.3
    const archivePick = [ARCHIVE[index % ARCHIVE.length], ARCHIVE[(index + 7) % ARCHIVE.length]]

    return {
      number: index + 1,
      slug: slugify(name),
      name,
      first,
      role: kind.roles[variant],
      category: sport,
      born: PLACES[Math.floor(rand() * PLACES.length)],
      bornOn: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`,
      club: kind.clubs[Math.floor(rand() * kind.clubs.length)],
      years: retired ? `${start} – ${Math.min(2025, start + 8 + Math.floor(rand() * 8))}` : `${start} – now`,
      age: 2026 - year,
      photo,
      photographer,
      writer: WRITERS[index % WRITERS.length],
      headline: kind.headlines[variant],
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

/** The writers of the issue, with who each of them profiled. */
export const writers = WRITERS.map((name) => ({
  name,
  people: people.filter((person) => person.writer === name),
})).sort((a, b) => a.name.localeCompare(b.name))

export const sessions = SESSIONS.map(([photo, photographer]) => ({ photo, photographer }))

export const about = {
  title: "About the issue",
  body: [
    "Overtime started in 2019 as a printed quarterly for people who read the sports pages from the back: the profiles, the long interviews, the pieces about what happens after the result. Twelve issues later it is still printed, still quarterly, and still about the part of sport that happens when the cameras have gone.",
    "For this issue, twelve writers and six photographers spent a season with eighty-four athletes across eight sports — boxers and swimmers, cyclists and centre-backs, sprinters and doubles partners. We asked every one of them the same question: what does it cost to keep going?",
    "Nobody answered it the same way. Each profile here is one of those answers, printed beside a portrait made on the day we met, and a frame or two from the archive of their sport.",
    "Read them in any order. Drag the grid, open the list, or let the gallery run. The season is long, and there is no final whistle here.",
  ],
  quote: "The result lasts a second. The work lasts a career.",
}
