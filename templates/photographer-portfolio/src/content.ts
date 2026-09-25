/**
 * Every word and picture on the site, in one place.
 *
 * The photographs are Picsum placeholders keyed by a seed, so the same seed is
 * always the same picture and the layout never shifts between reloads. Replace
 * `photo()` calls with paths under `public/` (`"/photos/harbour-01.jpg"`) when
 * the real work goes in — nothing else needs to change.
 */

export const photo = (seed: string, width = 1200, height = 1500) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`

export const studio = {
  name: "Mara Ellison",
  tagline: "Photography",
  location: "Lisbon & travelling",
  email: "studio@maraellison.com",
  phone: "+351 912 000 000",
  instagram: "@maraellison",
}

export const navigation = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export type Category = "Weddings" | "Portraits" | "Editorial" | "Travel"
export const categories: Category[] = ["Weddings", "Portraits", "Editorial", "Travel"]

export interface Gallery {
  slug: string
  title: string
  category: Category
  location: string
  year: number
  cover: string
  summary: string
  photos: { src: string; caption: string; wide?: boolean }[]
}

const series = (seed: string, count: number, caption: string) =>
  Array.from({ length: count }, (_, index) => ({
    src: index % 3 === 0 ? photo(`${seed}-${index}`, 1800, 1200) : photo(`${seed}-${index}`),
    caption: `${caption} ${String(index + 1).padStart(2, "0")}`,
    wide: index % 3 === 0,
  }))

export const galleries: Gallery[] = [
  {
    slug: "sintra-in-september",
    title: "Sintra in September",
    category: "Weddings",
    location: "Sintra, Portugal",
    year: 2026,
    cover: photo("sintra-cover"),
    summary: "Ana and Tomás, a palace garden, and a fog that lifted exactly at the vows.",
    photos: series("sintra", 7, "Sintra"),
  },
  {
    slug: "the-bakers-of-alfama",
    title: "The Bakers of Alfama",
    category: "Editorial",
    location: "Lisbon, Portugal",
    year: 2026,
    cover: photo("alfama-cover"),
    summary: "Four a.m. to first light with a family that has made the same bread for ninety years.",
    photos: series("alfama", 6, "Alfama"),
  },
  {
    slug: "north-atlantic",
    title: "North Atlantic",
    category: "Travel",
    location: "Faroe Islands",
    year: 2025,
    cover: photo("faroe-cover"),
    summary: "Eleven days of weather, sheep and very long light.",
    photos: series("faroe", 7, "Faroe"),
  },
  {
    slug: "studio-portraits",
    title: "Studio Portraits",
    category: "Portraits",
    location: "Lisbon studio",
    year: 2025,
    cover: photo("studio-cover"),
    summary: "One window, one backdrop, and people who said they hate having their picture taken.",
    photos: series("studio", 6, "Portrait"),
  },
  {
    slug: "douro-harvest",
    title: "Douro Harvest",
    category: "Editorial",
    location: "Douro Valley, Portugal",
    year: 2025,
    cover: photo("douro-cover"),
    summary: "The vindima at Quinta do Vale, for Wine & Table magazine.",
    photos: series("douro", 6, "Douro"),
  },
  {
    slug: "a-small-wedding-in-comporta",
    title: "A Small Wedding in Comporta",
    category: "Weddings",
    location: "Comporta, Portugal",
    year: 2024,
    cover: photo("comporta-cover"),
    summary: "Twenty-two guests, a rice field and a long table at dusk.",
    photos: series("comporta", 7, "Comporta"),
  },
]

export const services = [
  {
    name: "Portrait session",
    price: "€450",
    detail: "Two hours, one or two locations, 40 edited images.",
    includes: ["Pre-shoot call", "Studio or on location", "Online gallery for a year", "Print release"],
  },
  {
    name: "Wedding day",
    price: "€3,200",
    detail: "Getting ready to the first dance, and nothing staged in between.",
    includes: ["Up to ten hours", "Second photographer", "400+ edited images", "Printed album"],
    featured: true,
  },
  {
    name: "Editorial & brand",
    price: "From €1,400",
    detail: "Stories for magazines and the people who make things.",
    includes: ["Half or full day", "Usage licence", "48-hour selects", "Retouching"],
  },
]

export const faqs = [
  {
    question: "How far ahead should we book?",
    answer: "Weddings usually nine to twelve months ahead; portraits two or three weeks. Ask anyway — there are often gaps.",
  },
  {
    question: "Do you travel?",
    answer: "Yes. Anywhere in Portugal is included, and further afield is travel at cost with no day fee for travel days.",
  },
  {
    question: "When do we get the photographs?",
    answer: "A sneak peek within a week, the full gallery in six to eight weeks for weddings and two weeks for everything else.",
  },
  {
    question: "Can we have the raw files?",
    answer: "No — the edit is half of the photograph. You do get every image that makes the edit, in full resolution.",
  },
]

export const testimonials = [
  {
    quote: "We forgot she was there, and then we saw the pictures and remembered every second of the day.",
    name: "Ana & Tomás",
    context: "Wedding, Sintra",
  },
  {
    quote: "The only portraits of me I have ever wanted to show anyone.",
    name: "Inês Carvalho",
    context: "Portrait session",
  },
  {
    quote: "Mara found the story before we'd finished explaining it.",
    name: "Wine & Table",
    context: "Editorial commission",
  },
]

export const press = ["Kinfolk", "Wine & Table", "Monocle", "Condé Nast Traveller", "The Guardian"]
