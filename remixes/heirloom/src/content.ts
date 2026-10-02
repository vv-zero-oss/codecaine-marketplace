/** Words and photographs for the page. Photography: Pexels (see the footer). */
const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.jpg`

export const NAV = [
  { label: "Founders", href: "#founders" },
  { label: "Membership", href: "#membership" },
  { label: "Stories", href: "#stories" },
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
    href: "#founders",
  },
  {
    image: photo("card-members"),
    alt: "A woman singing into a studio microphone",
    tag: "Athletes, artists & entrepreneurs",
    title: "Invest beside the best",
    body: "Members co-invest in the same private deals our partners back, in rooms that are otherwise closed to the public.",
    cta: "For members",
    href: "#membership",
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
  },
  {
    id: "manifesto",
    image: photo("sketch"),
    alt: "A hand sketching with a pencil on paper",
    eyebrow: "",
    before: "People who think impossible is an",
    accent: "opinion.",
    cta: "Meet the founders",
  },
]

export const FOOTER = [
  { title: "Heirloom", links: ["About", "Manifesto", "Careers", "Press"] },
  { title: "Work with us", links: ["For founders", "Membership", "Partners", "Contact"] },
  { title: "Stories", links: ["Journal", "Founders", "Films", "Newsletter"] },
]
