/**
 * Every word and picture on the site, in one place.
 *
 * The storyline: Ines Marlowe is an independent product engineer who has
 * spent eighteen years building products for founders, banks, campaigns and
 * studios. The home page says who she is, shows the work, proves it with the
 * people she did it for, and hands over to the archive, the story, and a way
 * to get in touch.
 */

export type Tone = "lime" | "pink" | "orange" | "sun" | "mint" | "violet"

/** A Pexels photograph by id, at the width asked for. */
export function pexels(id: number, width = 800) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const PERSON = {
  name: "Ines Marlowe",
  email: "hello@inesmarlowe.studio",
  city: "Lisbon",
  intro:
    "I’m Ines Marlowe. For eighteen years I’ve designed, built and led products that move money, votes and whole industries. Lately I build with AI, and I bring it to teams who want it to be useful.",
  based: "Based in Lisbon. Working everywhere.",
}

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Now", href: "/about#now" },
  { label: "Brand", href: "/brand" },
  { label: "Contact", href: "/contact" },
]

export const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Read.cv", href: "https://read.cv" },
  { label: "Bluesky", href: "https://bsky.app" },
]

/** What a project card shows in its frame. */
export type Media =
  | { kind: "avatars" }
  | { kind: "pay" }
  | { kind: "photo"; id: number; alt: string }
  | { kind: "lock" }
  | { kind: "wordmark"; word: string; sub: string }

export type Project = {
  slug: string
  title: string
  sector: string
  tone: Tone
  year: string
  role: string
  team: string
  summary: string
  lede: string
  body: string[]
  media: Media
  cover: { id: number; alt: string }
  stats: { value: number; prefix?: string; suffix?: string; label: string }[]
  press: { headline: string; outlet: string }[]
}

export const PROJECTS: Project[] = [
  {
    slug: "crowdline",
    title: "Crowdline",
    sector: "Community",
    tone: "pink",
    year: "2024",
    role: "Fractional CTO",
    team: "Four engineers, one designer",
    summary: "Rebuilt the network 300,000 creatives use to find their next job.",
    lede: "Crowdline had outgrown the code it launched on. I led the rebuild, hired the team that owns it now, and shipped it without a day of downtime.",
    body: [
      "The old platform was one server and a lot of goodwill. Profiles took four seconds to load and the search could not tell a set designer from a set of designs. We moved it, piece by piece, onto a stack the team could reason about.",
      "The part people noticed was matching: a feed that puts the right brief in front of the right person the week they are free. Applications per brief went up by more than half in the first quarter.",
    ],
    media: { kind: "avatars" },
    cover: { id: 7432863, alt: "A man in a striped shirt smiling in a studio" },
    stats: [
      { value: 300, suffix: "k", label: "creatives on the network" },
      { value: 56, suffix: "%", label: "more applications per brief" },
      { value: 0, label: "hours of downtime in the move" },
      { value: 9, label: "engineers hired" },
    ],
    press: [
      { headline: "The network creatives actually use to get hired", outlet: "Kiln Weekly" },
      { headline: "How Crowdline rebuilt without switching off", outlet: "Stackpost" },
    ],
  },
  {
    slug: "tapwise",
    title: "Tapwise",
    sector: "Fintech",
    tone: "lime",
    year: "2023",
    role: "Product lead",
    team: "Six engineers, two designers",
    summary: "A pay-by-bank button that sits beside the card wallets at checkout.",
    lede: "Card fees eat a small shop’s margin. Tapwise lets a customer pay straight from their bank in two taps — I designed the flow and led the team that shipped it to 2,000 merchants.",
    body: [
      "The hard part of paying by bank is the moment you leave the shop for your banking app. We made that hand-off feel like one motion: the button, the bank, a thumbprint, and back to a receipt.",
      "Merchants saved an average of 1.4% on every sale. Checkout abandonment fell by a third against the card flow it sat beside.",
    ],
    media: { kind: "pay" },
    cover: { id: 4199524, alt: "A hand paying with a phone at a card terminal" },
    stats: [
      { value: 2000, suffix: "+", label: "merchants live" },
      { value: 1.4, suffix: "%", label: "saved on every sale" },
      { value: 33, suffix: "%", label: "fewer abandoned checkouts" },
      { value: 2, label: "taps from basket to paid" },
    ],
    press: [
      { headline: "The button that could undercut card fees", outlet: "Ledger & Line" },
      { headline: "Pay-by-bank finally feels like tapping a card", outlet: "Checkout Daily" },
    ],
  },
  {
    slug: "open-floor",
    title: "Open Floor",
    sector: "Policy",
    tone: "orange",
    year: "2025",
    role: "Campaign technologist",
    team: "A coalition of 900 founders",
    summary: "The campaign that got founders in front of lawmakers, and got a law changed.",
    lede: "Startup employees across Europe were being taxed on shares they could not sell. Open Floor gave nine hundred founders one voice — and gave lawmakers the numbers they needed to act.",
    body: [
      "Founders had been complaining about share-option tax for a decade, one blog post at a time. We built a single place to sign, a live map of support by country, and a briefing tool that turned the coalition’s data into one page a minister could read in the car.",
      "Within a year, four countries changed their rules. The campaign’s site is still the reference the press links to when it covers the subject.",
    ],
    media: { kind: "photo", id: 29708270, alt: "A speaker on stage in front of a crowd" },
    cover: { id: 29708260, alt: "A speaker delivering a talk at a corporate event" },
    stats: [
      { value: 900, suffix: "+", label: "founders demanding change" },
      { value: 4, label: "countries changed their rules" },
      { value: 7, prefix: "€", suffix: "bn", label: "more in employees’ hands" },
      { value: 12, label: "months from launch to law" },
    ],
    press: [
      { headline: "€7 billion more into the hands of startup employees", outlet: "Tessera Tech" },
      { headline: "Four countries loosen rules on share options", outlet: "The Signal" },
      { headline: "How a founder coalition out-lobbied the lobbyists", outlet: "Parcel Post" },
      { headline: "Europe’s startups catch up on employee ownership", outlet: "Tessera Tech" },
    ],
  },
  {
    slug: "vaultline",
    title: "Vaultline",
    sector: "Banking",
    tone: "sun",
    year: "2022",
    role: "Head of product engineering",
    team: "Twelve engineers",
    summary: "A bank account for freelancers that sets tax aside before you can spend it.",
    lede: "Freelancers get paid in lumps and taxed in arrears. Vaultline puts the tax in a locked pot the moment money lands, so April stops being a surprise.",
    body: [
      "We worked out the tax on each payment as it arrived and moved it out of sight. The pot unlocks when the bill is due, and not before.",
      "Sixty thousand freelancers opened an account in the first year. Nine in ten of them paid their tax on time, many for the first time.",
    ],
    media: { kind: "lock" },
    cover: { id: 4226270, alt: "Paying at a terminal with a phone" },
    stats: [
      { value: 60, suffix: "k", label: "accounts in year one" },
      { value: 91, suffix: "%", label: "paid their tax on time" },
      { value: 3, label: "screens to open an account" },
      { value: 14, label: "days to regulator sign-off" },
    ],
    press: [{ headline: "The bank account that pays your tax for you", outlet: "Ledger & Line" }],
  },
  {
    slug: "cadence-lab",
    title: "Cadence Lab",
    sector: "Sport & health",
    tone: "mint",
    year: "2021",
    role: "Lead engineer",
    team: "Three engineers, a sports scientist",
    summary: "Training plans that change with how the rider actually slept.",
    lede: "Cadence Lab reads a rider’s sleep, heart rate and last ride, and rewrites tomorrow’s session before they wake up. I built the engine and the app it lives in.",
    body: [
      "Most plans are written in January and ignored by March. Ours adjusts every night, and tells you why it did.",
      "Riders on adaptive plans finished 40% more of their sessions than riders on fixed ones.",
    ],
    media: { kind: "photo", id: 5807613, alt: "Cyclists racing on an open road" },
    cover: { id: 5807633, alt: "A group of cyclists riding through a forest" },
    stats: [
      { value: 40, suffix: "%", label: "more sessions finished" },
      { value: 25, suffix: "k", label: "riders training daily" },
      { value: 6, label: "data sources per rider" },
      { value: 1, label: "plan, rewritten nightly" },
    ],
    press: [{ headline: "The training app that knows you slept badly", outlet: "Fieldhouse" }],
  },
  {
    slug: "halden-homes",
    title: "Halden Homes",
    sector: "Property",
    tone: "violet",
    year: "2020",
    role: "Product and brand engineering",
    team: "A studio of five",
    summary: "Renting, moving in and fixing things, all from one app.",
    lede: "Halden builds apartment blocks for renting, not selling. I led the product that lets residents find a flat, sign for it, move in and report a leak without phoning anyone.",
    body: [
      "We treated the building as the product: the app knows your flat, your keys, your parcels and your neighbours’ events.",
      "Repairs reported through the app were fixed in two days on average, against nine by phone.",
    ],
    media: { kind: "wordmark", word: "Halden", sub: "Homes" },
    cover: { id: 18153132, alt: "White apartment facades" },
    stats: [
      { value: 4200, label: "residents on the app" },
      { value: 2, label: "days to fix a repair" },
      { value: 11, label: "buildings" },
      { value: 97, suffix: "%", label: "signed digitally" },
    ],
    press: [{ headline: "The landlord app residents actually like", outlet: "Parcel Post" }],
  },
]

export const PROOF = "120+ projects. 12 sectors. Three time zones."

/** Clients, set as type — each a wordmark in its own voice. */
export const CLIENTS = [
  { name: "Halden", style: "font-light uppercase tracking-[0.32em]" },
  { name: "Parcel & Co", style: "font-medium italic tracking-tight" },
  { name: "Orbit Bank", style: "font-semibold tracking-tight", mark: "orbit" },
  { name: "KILN", style: "font-semibold tracking-[0.2em]" },
  { name: "tessera", style: "font-semibold lowercase tracking-tighter text-[1.35em]" },
  { name: "Fieldhouse", style: "font-medium tracking-tight", mark: "field" },
  { name: "Moss Radio", style: "font-normal tracking-wide", mark: "radio" },
  { name: "LUMA / ARTS", style: "font-light tracking-[0.18em]" },
] as const

export const TESTIMONIALS = [
  {
    quote: "Ines has the rare habit of finding the one thing that matters and then making it ten times better than anyone asked for.",
    name: "Priya Castell",
    role: "Founder, Crowdline",
  },
  {
    quote: "She turned a policy fight into something a minister could read in the car. We would not have won without it.",
    name: "Tomás Reyes",
    role: "Coalition lead, Open Floor",
  },
  {
    quote: "The calmest person in any room, and the one who ships. Every engineer she hired for us is still here.",
    name: "Hannah Okoye",
    role: "CEO, Vaultline",
  },
  {
    quote: "We came for a checkout button. We left with a product our merchants tell their friends about.",
    name: "Jonas Brekke",
    role: "COO, Tapwise",
  },
  {
    quote: "Ines builds like a designer and designs like an engineer. You stop noticing where one ends.",
    name: "Aiko Tan",
    role: "Director, Halden Homes",
  },
]

export const ABOUT = {
  intro:
    "I’ve been building for eighteen years across engineering, design and strategy — usually the person deciding what gets built. I started in music and museums, ran my own studio for nine years, and now work with a handful of founders at a time.",
  stats: [
    { value: 18, suffix: "+", label: "years building products" },
    { value: 120, suffix: "+", label: "projects shipped" },
    { value: 9, label: "years running Lowlight Studio" },
    { value: 6, suffix: "+", label: "years — the longest partnership" },
  ],
  sections: [
    {
      id: "leadership",
      title: "Leadership",
      body: "Founders bring me in at the top — as a fractional CTO, a head of product, or the person they call before the board meeting. I set up the first architecture at a fashion marketplace, ran the rebuild at Crowdline, and hired the teams that run both today.",
    },
    {
      id: "consulting",
      title: "Consulting",
      body: "Banks, campaigns and property groups hire me for the projects they cannot get wrong. I work inside their teams, not beside them, and leave behind people who know how the thing works.",
    },
    {
      id: "studio",
      title: "The studio",
      body: "From 2012 to 2021 I ran Lowlight, a studio of up to fourteen people making products for museums, broadcasters and founders. We shipped over eighty projects and never missed a launch.",
    },
    {
      id: "now",
      title: "Now",
      body: "I’m building small AI tools that make teams faster at the dull parts of their job, and taking on two new partners for next year.",
    },
  ],
  photos: [
    { id: 17724731, alt: "Two people planning on a whiteboard" },
    { id: 7495613, alt: "A team around a whiteboard" },
    { id: 16307279, alt: "A desk with a tablet and keyboard" },
    { id: 8132973, alt: "Musicians recording in a studio" },
    { id: 9329044, alt: "Visitors in a museum gallery" },
  ],
}

export const CONTACT = {
  title: "Contact",
  body: "The fastest way to reach me is email. If you’re building something and want a second pair of hands — or a first one — I’d like to hear about it.",
}

/** Headshots for the Crowdline card and the testimonials. */
export const FACES = [38670596, 6311668, 39567150, 12895422, 7432863, 6102841, 5334146, 7561905, 14950779, 39842834, 12311572, 34305916, 9092311, 16762656, 15946547, 13375591, 37148308, 30124371]

/** The archive: every project, for the table on /work. */
const SECTORS = ["Technology", "Fintech", "Creative & Design", "Property", "Policy", "Media", "Health", "Education", "Retail", "Charity", "Hospitality", "Sport"]
const PLACES = ["Portugal", "UK", "Spain", "Germany", "Netherlands", "USA", "France", "Norway"]
const CLIENT_NAMES = [
  "Crowdline", "Tapwise", "Open Floor", "Vaultline", "Cadence Lab", "Halden Homes", "Parcel & Co", "Orbit Bank", "Kiln", "Tessera",
  "Fieldhouse", "Moss Radio", "Luma Arts", "Northpier", "Saltmarsh", "Greyhound Press", "Lowtide", "Brightwork", "Ferro", "Atlas Foods",
  "Juniper Health", "Oakline", "Cobalt Bikes", "Seabird", "Harbour Trust", "Folio Books", "Quill", "Linden School", "Marlow & Finch", "Paper Kites",
  "Rookery", "Tidewater", "Velvet Room", "Wren Museum", "Yardley", "Zinc", "Ember Radio", "Hollow Oak", "Kestrel", "Lark",
]
const PROJECT_NAMES = [
  "Network rebuild", "Pay-by-bank", "Campaign platform", "Tax pots", "Adaptive plans", "Resident app", "Shipping portal", "Mobile banking", "Magazine site", "Design system",
  "Booking engine", "Live radio app", "Ticketing", "Harbour guide", "Member portal", "Archive", "Tide tables", "Hiring tool", "Online shop", "Ordering",
  "Patient app", "Brand site", "Bike configurator", "Newsletter", "Donations", "Reading app", "Writing tool", "Parent portal", "Wine club", "Kite shop",
  "Collections", "Visitor app", "Club nights", "Museum guide", "Wholesale", "Metal pricing", "Podcast app", "Cabin bookings", "Bird survey", "Music store",
]

export const ARCHIVE = CLIENT_NAMES.map((client, i) => {
  const project = PROJECTS.find((p) => p.title === client)
  return {
    year: project?.year ?? String(2026 - Math.floor(i / 2.4)),
    client,
    project: PROJECT_NAMES[i],
    sector: project?.sector ?? SECTORS[(i * 5) % SECTORS.length],
    location: PLACES[(i * 3) % PLACES.length],
    slug: project?.slug,
  }
}).sort((a, b) => Number(b.year) - Number(a.year))
