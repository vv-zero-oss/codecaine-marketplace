import { PHOTOS } from "@/lib/photos"

export const SITE = {
  name: "Ordinary Matter",
  short: "O",
  tagline: "The lives, spaces and stories of people who make things by hand.",
  email: "letters@ordinarymatter.press",
}

export const NAV = [
  { label: "Stories", href: "/stories" },
  { label: "Volumes", href: "/#volume" },
  { label: "About", href: "/about" },
  { label: "Index", href: "/stories#index" },
  { label: "Shop", href: "/shop" },
]

export const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Newsletter", href: "/#letters" },
  { label: "Brand", href: "/brand" },
]

/** How a story gets made — the pinned chapters on the home page. */
export const PROCESS = [
  {
    n: "01",
    word: "Find",
    title: "We hear about someone from someone.",
    body: "Nobody in these pages applied. Every story starts with a reader, a maker or a neighbour telling us about a person we should meet — and a year of letters before we ask to visit.",
    photo: PHOTOS.handwriting,
  },
  {
    n: "02",
    word: "Stay",
    title: "Three days, no schedule.",
    body: "We arrive with one writer and one photographer and stay long enough to become boring. The best conversations happen on the third morning, over the second coffee.",
    photo: PHOTOS.cabinLamp,
  },
  {
    n: "03",
    word: "Listen",
    title: "Recorded, then transcribed by hand.",
    body: "Hours of tape become a few thousand words. The maker reads every draft, corrects every fact and keeps the final say over every sentence in their own voice.",
    photo: PHOTOS.sunReader,
  },
  {
    n: "04",
    word: "Print",
    title: "Uncoated paper, sewn, bound in cloth.",
    body: "Film is scanned at full resolution, laid out over a season and printed in a single run. Then we post one copy to every person in it before anyone else sees it.",
    photo: PHOTOS.floorCup,
  },
]

export const PULL_QUOTE =
  "We make slow books about people who make things — because the things last longer when you know who made them, and why."

/** The about page's timeline, pinned beside the photographs. */
export const TIMELINE = [
  { year: "2019", title: "A stapled zine", body: "Forty copies, photocopied at a library, handed out at a ceramics fair. Twelve people wrote back.", photo: PHOTOS.letters },
  { year: "2021", title: "Volume 1, Making Room", body: "Homes made slowly by the people who live in them. The first printing sold out in nine weeks.", photo: PHOTOS.commode },
  { year: "2023", title: "Volume 2, Slow Hands", body: "On apprenticeship and the decades it takes to learn a craft. A second printing in cloth and kraft.", photo: PHOTOS.potterWheel },
  { year: "2024", title: "Stories, online", body: "Shorter visits between volumes, published here for free and read by fifty thousand people a month.", photo: PHOTOS.studioLoft },
  { year: "2026", title: "Volume 3, Salt & Timber", body: "Twelve makers at the water's edge, and the first volume printed entirely on recycled cotton stock.", photo: PHOTOS.houseboats },
]

export const PRINCIPLES = [
  { title: "Nobody pays to be in it.", body: "No sponsored stories, no gifted products, no affiliate links. The makers are never charged and always paid for their time." },
  { title: "The maker has the last word.", body: "Every person reads their story before print and can change anything said in their own voice." },
  { title: "Fewer, slower, better.", body: "One volume every two years. A story every few weeks online. Nothing on a schedule that would hurry a visit." },
  { title: "Made to be kept.", body: "Sewn bindings, uncoated paper, cloth covers. A book that will still open flat in fifty years." },
]

/** The masthead, the way a magazine prints it. */
export const MASTHEAD = [
  { role: "Editor", name: "Clementine Arkwright" },
  { role: "Photography", name: "Joaquín Ferreyra" },
  { role: "Design", name: "Mei Tanaka-Holm" },
  { role: "Words", name: "Obi Nwankwo" },
  { role: "Production", name: "Ruth Ambrose" },
  { role: "Letters", name: "Pascal Duverne" },
]
