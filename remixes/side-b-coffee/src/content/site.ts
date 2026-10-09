import { PHOTOS } from "@/lib/photos"

/** Navigation, the journal, the two bars and the people — the site's copy. */

export const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Our story", href: "/story" },
  { label: "Brand", href: "/brand" },
] as const

export const SHOP_MENU = [
  { label: "All coffee", href: "/shop", blurb: "Eight coffees, roasted every Tuesday" },
  { label: "Single origins", href: "/shop?filter=single", blurb: "One farm, one lot, one record" },
  { label: "Merch", href: "/shop?filter=merch", blurb: "Totes, tees, mugs and a slipmat" },
  { label: "Subscriptions", href: "/subscribe", blurb: "Fresh bags every other week" },
] as const

export type Post = {
  id: string
  kicker: string
  date: string
  title: string
  emoji?: "note" | "disc" | "bean" | "mic"
  excerpt: string
  cta: string
  photo: number
  tone: "honey" | "rust" | "ember" | "sky"
  /** what the label does: read the post, play the rotation, or save a seat */
  action: "read" | "listen" | "rsvp"
  body: string[]
}

export const POSTS: Post[] = [
  {
    id: "rosa-elena",
    action: "read",
    body: [
      "We flew into Neiva in June and drove the rest of the way with a cooler full of cheese bread. Rosa Elena met us at the gate with her son Julián, who now runs the wet mill.",
      "This year they built raised beds for honey processing: the cherry is pulped, but the sticky mucilage stays on while it dries. It's slower and riskier, and it gives Needle Drop that red-apple sweetness.",
      "We've committed to buying the whole lot for the next three harvests, at a price agreed before the first cherry was picked.",
    ],
    kicker: "Producer visit",
    date: "09.18.2026",
    title: "Three harvests with Rosa Elena",
    emoji: "bean",
    excerpt: "Pitalito in June: honey-process drying beds, a new pulper, and the lot that became Needle Drop.",
    cta: "Read more",
    photo: PHOTOS.cherriesHands,
    tone: "ember",
  },
  {
    id: "autumn-rotation",
    action: "listen",
    body: [
      "Every season we pull twelve records from the wall and keep them by the turntable until the clocks change. This autumn it leans warm: soul, a little jazz, one ambient record for the quiet hour.",
      "Press play below and the shop radio will run through the house rotation — the same loop we keep going behind the bar between records.",
    ],
    kicker: "In the crate",
    date: "09.30.2026",
    title: "The autumn rotation",
    emoji: "disc",
    excerpt: "Twelve records we're playing behind the bar until the clocks change. Side two of the third one is the whole point.",
    cta: "Listen now",
    photo: PHOTOS.spinningRecord,
    tone: "honey",
  },
  {
    id: "listening-hours",
    action: "rsvp",
    body: [
      "Every Thursday from 7 p.m. at Elm Street we play one album, start to finish, on the big speakers. No phones, no talking during the songs, plenty of talking in between.",
      "Filter coffee is half price while the needle is down, and there's decaf for the late crowd. Twenty-four seats; the rest is standing room.",
    ],
    kicker: "Events",
    date: "10.02.2026",
    title: "Thursday listening hours",
    emoji: "note",
    excerpt: "Phones down, one album, start to finish, on the big speakers. Filter coffee is half price while the needle's down.",
    cta: "Save a seat",
    photo: PHOTOS.crateDig,
    tone: "rust",
  },
  {
    id: "new-roaster",
    action: "read",
    body: [
      "Our old roaster did fifteen kilos a batch. That meant roasting big, guessing demand, and selling coffee that had been sitting.",
      "The new one does five. We roast every Tuesday to the orders that came in over the weekend, taste every batch, and ship it the same afternoon. Fresher coffee, less waste, a slightly busier Tuesday.",
    ],
    kicker: "Roastery",
    date: "10.05.2026",
    title: "Why we bought a smaller roaster",
    emoji: "bean",
    excerpt: "Five kilos at a time means we can roast to order on Tuesday and have it on your porch by Friday.",
    cta: "Read more",
    photo: PHOTOS.roasterPanel,
    tone: "sky",
  },
  {
    id: "meet-theo",
    action: "read",
    body: [
      "Theo started washing cups at Elm Street seven years ago because he wanted first dibs on the record bin. He now runs the bar, trains every new barista, and still has first dibs.",
      "His order: a cortado with Feedback Loop, and whatever's on side B of the record playing.",
    ],
    kicker: "Bar stories",
    date: "10.08.2026",
    title: "Meet Theo, head of the Elm Street bar",
    emoji: "mic",
    excerpt: "\"I came for the records and stayed for the espresso machine.\" Seven years, one spilled crate, zero regrets.",
    cta: "Read more",
    photo: PHOTOS.bartender,
    tone: "ember",
  },
]

export type Cafe = {
  id: string
  name: string
  street: string
  city: string
  photo: number
  /** opening hours, 24h, by weekday 0 = Sunday */
  hours: [number, number][]
  note: string
}

export const CAFES: Cafe[] = [
  {
    id: "pressing-plant",
    name: "The Pressing Plant",
    street: "210 Foundry Lane",
    city: "Roastery & bar",
    photo: PHOTOS.cornerDusk,
    hours: [[8, 16], [7, 18], [7, 18], [7, 18], [7, 21], [7, 21], [8, 18]],
    note: "Where we roast. Watch the drum turn from the counter, Tuesday and Friday mornings.",
  },
  {
    id: "elm-street",
    name: "Elm Street Listening Bar",
    street: "48 Elm Street",
    city: "Bar & record shop",
    photo: PHOTOS.storefrontTree,
    hours: [[9, 15], [7, 17], [7, 17], [7, 17], [7, 22], [7, 22], [8, 17]],
    note: "Six hundred records, one big pair of speakers, and an espresso machine older than our baristas.",
  },
]

export const INSTA = [
  PHOTOS.storefrontTree,
  PHOTOS.friendsTalk,
  PHOTOS.crates,
  PHOTOS.latteTable,
  PHOTOS.streetNight,
  PHOTOS.beanie,
  PHOTOS.crateShop,
  PHOTOS.bagShelf,
  PHOTOS.regular,
  PHOTOS.espressoPull,
  PHOTOS.slimCrate,
  PHOTOS.friendsTable,
  PHOTOS.cornerDusk,
  PHOTOS.matcha,
]

export const CONTACT = {
  email: "hello@sidebcoffee.co",
  instagram: "@sidebcoffee",
}
