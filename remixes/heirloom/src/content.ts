/** Words and photographs for the page. Photography: Pexels (see the footer). */
const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.jpg`

export const NAV = [
  { label: "Founders", href: "/founders" },
  { label: "Membership", href: "/membership" },
  { label: "Journal", href: "/journal" },
  { label: "Manifesto", href: "/manifesto" },
]

export const HERO_SLIDES = [
  { src: photo("hero-piano"), alt: "A man at a grand piano in a sunlit living room" },
  { src: photo("hero-plans"), alt: "An architect leaning over rolled plans on a timber table" },
  { src: photo("hero-studio"), alt: "A singer in headphones in a recording studio" },
  { src: photo("hero-sea"), alt: "The deck of a sailboat on open water" },
]

export const PROGRAMS = [
  {
    image: photo("card-founders"),
    alt: "A man gazing thoughtfully out of a window",
    tag: "Founders",
    title: "Not just another fund",
    body: "We bring capital, storytelling, a network and hard-won judgement to the founders we believe in, from the first cheque to the long middle.",
    cta: "For founders",
    href: "/founders",
  },
  {
    image: photo("card-members"),
    alt: "A woman singing into a studio microphone",
    tag: "Athletes, artists & entrepreneurs",
    title: "Invest beside the best",
    body: "Members co-invest in the same private deals our partners back, in rooms that are otherwise closed to the public.",
    cta: "For members",
    href: "/membership",
  },
]

export const COLLAGE = [
  { kind: "call", image: photo("call-one"), alt: "Amira Haddad on a video call", tag: "Series A", name: "Amira Haddad", role: "CEO & co-founder of Loomwell" },
  {
    kind: "quote",
    tag: "Series A",
    quote: "You are the rare investors who actually move things. Every introduction you made was one we would never have got alone.",
    author: "Founder",
  },
  { kind: "quote", tag: "Seed", quote: "Already an eleven out of ten.", author: "Founder" },
  { kind: "call", image: photo("call-two"), alt: "Tobias Reuter on a video call", tag: "Seed", name: "Tobias Reuter", role: "CEO & co-founder of Plinth" },
] as const

export const STATS = [
  { tag: "Circle", value: 240, suffix: "+", label: "Operators and makers" },
  { tag: "Wins", value: 25, suffix: "+", label: "Champions and laureates" },
  { tag: "Exits", value: 1.2, prefix: "$", suffix: "bn", decimals: 1, label: "Enterprise value created" },
  { tag: "Capital", value: 85, prefix: "$", suffix: "m", label: "Committed to ventures" },
]

export const CIRCLE = [
  "Northfield FC",
  "Aldwych Records",
  "Kestrel Racing",
  "Halden Sailing",
  "Marlowe Studios",
  "Tern Athletics",
  "Verity Opera",
  "Oakhurst Cricket",
  "Pinewood Court",
  "Sable & Finch",
]

export const BANDS = [
  {
    id: "stories",
    image: photo("manifesto"),
    alt: "An architect studying a design at a desk",
    eyebrow: "We believe in",
    before: "Backing founders who",
    accent: "bend reality.",
    cta: "Read our manifesto",
    href: "/manifesto",
  },
  {
    id: "manifesto",
    image: photo("sketch"),
    alt: "A hand sketching with a pencil on paper",
    eyebrow: "",
    before: "People who think impossible is an",
    accent: "opinion.",
    cta: "Meet the founders",
    href: "/founders",
  },
]

export const FOOTER = [
  {
    title: "Heirloom",
    links: [
      { label: "Home", href: "/" },
      { label: "Manifesto", href: "/manifesto" },
      { label: "Brand guidelines", href: "/brand" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "For founders", href: "/founders" },
      { label: "Membership", href: "/membership" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Stories",
    links: [
      { label: "Journal", href: "/journal" },
      { label: "Portfolio", href: "/founders" },
      { label: "Newsletter", href: "/journal" },
    ],
  },
]

/* ——— Founders ——————————————————————————————————————————————————————————— */

export const STAGES = ["All", "Seed", "Series A", "Growth"] as const
export type Stage = Exclude<(typeof STAGES)[number], "All">

export const PORTFOLIO: {
  name: string
  company: string
  stage: Stage
  sector: string
  line: string
  year: number
  image: string
  alt: string
}[] = [
  { name: "Ines Varga", company: "Hollow Oak", stage: "Seed", sector: "Climate", line: "Timber housing that stores more carbon than it took to build.", year: 2025, image: photo("portrait-ines"), alt: "A person in dark clothes in a dim, moody room" },
  { name: "Marguerite Lowe", company: "Ledgerline", stage: "Series A", sector: "Fintech", line: "Bookkeeping for the self-employed that closes the month on its own.", year: 2023, image: photo("portrait-marguerite"), alt: "A woman in glasses and a grey suit against a dark backdrop" },
  { name: "Kofi Mensah", company: "Lanewise", stage: "Growth", sector: "Sport", line: "Training science from Olympic pools, for every club swimmer.", year: 2021, image: photo("portrait-kofi"), alt: "A swimmer in a cap and goggles, lit from one side" },
  { name: "Elias Brandt", company: "Low End", stage: "Seed", sector: "Music", line: "Royalties paid weekly, to every player on the record.", year: 2026, image: photo("portrait-elias"), alt: "A man with a double bass in a dark studio" },
  { name: "Rafael Osei", company: "Nightjar", stage: "Series A", sector: "Media", line: "A studio for documentaries that take five years to make.", year: 2024, image: photo("portrait-rafael"), alt: "A bearded man in red light against black" },
  { name: "Sena Aydin", company: "Commonroom", stage: "Growth", sector: "Education", line: "Small, in-person schools for adults changing careers.", year: 2020, image: photo("portrait-sena"), alt: "A woman in a white shirt and waistcoat, hands together" },
]

export const FOUNDER_STEPS = [
  { title: "A first conversation", body: "Forty minutes with a partner, not an associate. No deck required; bring the problem you cannot stop thinking about." },
  { title: "A week of diligence", body: "We talk to your customers and your references, and tell you what we heard — the hard parts included." },
  { title: "A cheque and a circle", body: "From $250k at seed to $5m in growth rounds, with introductions to the members who can move your next year." },
  { title: "The long middle", body: "A partner on call, a story told well, and a seat at the table we keep for the decade, not the quarter." },
]

/* ——— Membership ————————————————————————————————————————————————————————— */

export const BENEFITS = [
  { title: "Private deal flow", body: "Co-invest beside our partners in the same rounds, on the same terms, from $25k." },
  { title: "Dinners, not conferences", body: "Twelve tables a year, never more than fourteen seats, in the cities members live in." },
  { title: "An office that answers", body: "Tax, estate and philanthropy advice from people who have handled careers like yours." },
  { title: "A say in what we back", body: "Members sit on our quarterly founder panels and vote on the circle fund's final pick." },
]

export const TIERS = [
  {
    name: "Circle",
    price: "$12k",
    period: "a year",
    note: "For members making their first private investments.",
    features: ["Co-invest from $25k per deal", "Four member dinners a year", "Quarterly portfolio letter", "Access to the Journal archive"],
    featured: false,
  },
  {
    name: "Patron",
    price: "$36k",
    period: "a year",
    note: "For members who want to sit closest to the work.",
    features: ["Everything in Circle", "First allocation on every round", "All twelve member dinners", "A named partner as your contact", "Founder panel seat"],
    featured: true,
  },
  {
    name: "Founding",
    price: "By invitation",
    period: "",
    note: "For families placing a share of their office with ours.",
    features: ["Everything in Patron", "Full family-office services", "Estate and philanthropy planning", "A vote on the circle fund"],
    featured: false,
  },
]

export const FAQ = [
  { q: "Who can become a member?", a: "Accredited investors who have built something of their own — on a pitch, a stage, a court or a company. Every application is read by a partner, and most new members are introduced by an existing one." },
  { q: "How much do I need to invest?", a: "Nothing beyond the membership itself. Each deal is offered to you individually, from $25k, and you decide deal by deal. Many members invest in three or four a year." },
  { q: "What fees do you charge on deals?", a: "No management fee on co-investments. We take a 10% carry on profits, and only once your capital has been returned in full." },
  { q: "Can my family office join instead of me?", a: "Yes. Founding membership is held by a family or an office, and covers up to four named people who may attend dinners and receive allocations." },
  { q: "How long does an application take?", a: "About three weeks: a call with a partner, a dinner as a guest, and a decision in writing. We say no kindly and with reasons." },
]

/* ——— Journal ———————————————————————————————————————————————————————————— */

export const JOURNAL_TOPICS = ["All", "Essays", "Founders", "Craft", "Letters"] as const
export type JournalTopic = Exclude<(typeof JOURNAL_TOPICS)[number], "All">

export const ARTICLES: {
  title: string
  dek: string
  topic: JournalTopic
  author: string
  date: string
  read: string
  image: string
  alt: string
}[] = [
  { title: "The case for slow money", dek: "Why the best businesses we have backed took ten years to look obvious, and what that asks of the people funding them.", topic: "Essays", author: "Odalys Fernsby", date: "Oct 14, 2026", read: "9 min", image: photo("journal-window"), alt: "A single lit window in a dark townhouse facade" },
  { title: "A carpenter's rule for hiring", dek: "Ines Varga on measuring twice before the first ten hires.", topic: "Founders", author: "Ines Varga", date: "Oct 02, 2026", read: "6 min", image: photo("journal-carpenter"), alt: "A craftsman's hand cutting fine detail into wood" },
  { title: "What clay teaches about patience", dek: "Notes from a weekend with the potters our members back.", topic: "Craft", author: "Rafael Osei", date: "Sep 21, 2026", read: "5 min", image: photo("journal-clay"), alt: "Hands shaping a clay pot" },
  { title: "Letter to members, autumn", dek: "Three new founders, one exit, and a vineyard we said no to.", topic: "Letters", author: "The partners", date: "Sep 09, 2026", read: "7 min", image: photo("journal-vineyard"), alt: "Bare vines silhouetted against a dusk sky" },
  { title: "Stairs, not elevators", dek: "On building a company one floor at a time.", topic: "Essays", author: "Marguerite Lowe", date: "Aug 28, 2026", read: "8 min", image: photo("journal-stairs"), alt: "An old stone staircase in low light" },
  { title: "Inside the reading room", dek: "The forty books our partners hand to every founder.", topic: "Craft", author: "Sena Aydin", date: "Aug 12, 2026", read: "4 min", image: photo("members-library"), alt: "A library of wooden shelves around tiered seating" },
]

/* ——— Manifesto —————————————————————————————————————————————————————————— */

export const PRINCIPLES = [
  { title: "We back people, then ideas.", body: "Markets move and plans change. The founder who can hear the market change is the only thing we are really underwriting." },
  { title: "Patience is a strategy.", body: "Our capital has no fund clock. We will hold for fifteen years if that is what the work needs, and we never push a sale to make a vintage look good." },
  { title: "Tell the truth early.", body: "Bad news is cheapest on the day it is found. We give it plainly, and we ask for it the same way." },
  { title: "Craft over noise.", body: "We would rather back one beautifully made thing than ten loud ones. Quality compounds, the same way capital does." },
  { title: "Money should be useful.", body: "Every dollar we place should leave something behind: a company, a skill, a building, a body of work that outlives the return on it." },
  { title: "Keep the room small.", body: "A circle stops being one past a certain size. We say no to members and to founders so that yes still means something." },
]

export const SIGNATORIES = [
  { name: "Odalys Fernsby", role: "Founding partner" },
  { name: "Theo Marchetti", role: "Partner, founders" },
  { name: "Amara Okafor", role: "Partner, members" },
]

/* ——— Contact ———————————————————————————————————————————————————————————— */

export const ENQUIRIES = [
  { value: "founder", label: "I'm a founder", hint: "Raising, or about to" },
  { value: "member", label: "I'd like to join", hint: "Membership enquiries" },
  { value: "press", label: "Press & other", hint: "Everything else" },
] as const

export const OFFICES = [
  { city: "London", address: "14 Lowndes Mews, SW1X 8DB", hours: "Mon–Fri, 9–6" },
  { city: "Lisbon", address: "Rua das Flores 72, 1200-195", hours: "Mon–Fri, 9–6" },
  { city: "New York", address: "41 Bond Street, NY 10012", hours: "Mon–Fri, 9–6" },
]

export const INBOXES = [
  { label: "Founders", email: "founders@heirloom.example" },
  { label: "Members", email: "members@heirloom.example" },
  { label: "Press", email: "press@heirloom.example" },
]

/* ——— Page heroes ———————————————————————————————————————————————————————— */

export const PAGE_HEROES = {
  founders: { image: photo("founders-hero"), alt: "An artist standing by tall windows in a cluttered studio" },
  membership: { image: photo("members-hero"), alt: "A long table set for dinner, lit by candles in a dark room" },
  journal: { image: photo("journal-hero"), alt: "A person reading at a desk by a window at night" },
  manifesto: { image: photo("manifesto-hero"), alt: "Mountain peaks wrapped in cloud at dusk" },
  contact: { image: photo("contact-hero"), alt: "A room at night, lit warmly among plants" },
}

export const MANIFESTO_ASIDE = { image: photo("manifesto-arch"), alt: "An arched wooden double door in a pale wall" }
export const MANIFESTO_BAND = { image: photo("manifesto-alps"), alt: "Cloud rolling over alpine peaks" }
