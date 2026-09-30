/**
 * Drape's words and pictures, kept out of the components that lay them out.
 *
 * Every photograph is from Pexels (credited in the footer), served from their
 * CDN at the size each place draws it. `crossOrigin` is set wherever a photo
 * is read back as pixels — the WebGL stage and the recolouring — which their
 * CDN allows.
 */

export function pexels(id: number, width: number, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const NAV = [
  {
    label: "Product",
    items: [
      { title: "Fitting room", body: "Try any piece on your own photo.", href: "#toolkit" },
      { title: "Colourways", body: "Every shade a piece comes in, on you.", href: "#controls" },
      { title: "Outfit builder", body: "Mix pieces from different shops.", href: "#features" },
    ],
  },
  {
    label: "For shops",
    items: [
      { title: "Try-on widget", body: "One script tag on a product page.", href: "#features" },
      { title: "Returns insight", body: "See which fits people doubt.", href: "#features" },
    ],
  },
  { label: "Stories", href: "#stories" },
  { label: "Pricing", href: "#faq" },
  { label: "FAQ", href: "#faq" },
] as const

/** The hero's carousel: one outfit per slide, drawn as a sketch until tried on. */
export const LOOKS = [
  { id: 20851458, name: "Long black coat", prompt: "Try the black coat on me" },
  { id: 6211660, name: "Quilted field jacket", prompt: "Try this jacket on me" },
  { id: 26100314, name: "Belted trench", prompt: "Try the trench on me" },
  { id: 33055634, name: "Wide-leg track pant", prompt: "Try these trousers on me" },
  { id: 7760002, name: "Oversized blazer", prompt: "Try the blazer on me" },
] as const

/** The model and garment the toolkit and the colour controls work on. */
export const MODEL = { front: 9775538, side: 9775547, garmentHue: 128 }

/** A colourway: the hue a garment is moved to, and how its saturation and
 *  lightness are scaled on the way. */
export type Colourway = { name: string; hue: number; sat: number; light: number }

export const COLOURWAYS: Colourway[] = [
  { name: "Mint", hue: 128, sat: 1, light: 1 },
  { name: "Clay", hue: 16, sat: 2.2, light: 0.78 },
  { name: "Mustard", hue: 40, sat: 2.4, light: 0.84 },
  { name: "Plum", hue: 318, sat: 0.75, light: 0.5 },
  { name: "Sky", hue: 206, sat: 1.6, light: 0.8 },
  { name: "Ink", hue: 222, sat: 1.1, light: 0.32 },
  { name: "Olive", hue: 66, sat: 0.9, light: 0.52 },
  { name: "Rose", hue: 346, sat: 1.6, light: 0.9 },
  { name: "Rust", hue: 12, sat: 1.4, light: 0.5 },
  { name: "Lilac", hue: 268, sat: 1.4, light: 0.86 },
  { name: "Forest", hue: 152, sat: 1.1, light: 0.4 },
  { name: "Sand", hue: 34, sat: 0.9, light: 0.9 },
  { name: "Cobalt", hue: 224, sat: 1.15, light: 0.5 },
  { name: "Berry", hue: 338, sat: 1.3, light: 0.56 },
  { name: "Teal", hue: 184, sat: 1.1, light: 0.55 },
  { name: "Butter", hue: 52, sat: 1.8, light: 1 },
]

export const STEPS = [
  {
    id: "snap",
    label: "Snap",
    title: "Start from a photo of you",
    body: "One full-length photo against any wall. Drape traces your shape and posture, and keeps it private to your account.",
  },
  {
    id: "dress",
    label: "Dress",
    title: "Put the piece on",
    body: "Paste a product link or pick from a shop. Drape drapes the fabric over your frame, folds and fall included.",
  },
  {
    id: "recolour",
    label: "Recolour",
    title: "See every colourway at once",
    body: "Sixteen shades of the same piece, on you, side by side. The one you'd reach for tends to be obvious.",
  },
  {
    id: "wear",
    label: "Wear it",
    title: "Check the fit, then decide",
    body: "Size advice from your measurements, a second angle, and a walk-through — before anything ships.",
  },
] as const

export const SHOPS = [
  { name: "Maison Ardent", font: "font-display font-semibold tracking-[0.2em] uppercase" },
  { name: "Lowfield", font: "font-script text-2xl" },
  { name: "NORR/SØ", font: "font-mono font-medium tracking-widest" },
  { name: "Petal & Pine", font: "font-display italic font-medium" },
  { name: "KITE", font: "font-display font-semibold tracking-[0.3em]" },
  { name: "Ossa Studio", font: "font-sans font-semibold tracking-tight" },
  { name: "Harlow Goods", font: "font-display font-medium tracking-[0.12em] uppercase" },
  { name: "tinder&ash", font: "font-mono lowercase" },
]

export const STORIES = [
  {
    id: 5920763,
    name: "Fit notes: Ines Carvalho",
    body: "A wedding guest who tried eleven dresses on in one evening, and returned none of them.",
  },
  {
    id: 27721748,
    name: "Fit notes: Theo Mensah",
    body: "Linen in a colour he'd never have picked off the rail — and now wears every week.",
  },
  {
    id: 8788701,
    name: "Fit notes: Yuna Park",
    body: "A first job, one blazer budget, and sixteen colourways to settle on the right one.",
  },
  {
    id: 30372298,
    name: "Fit notes: Lea Moreau",
    body: "Buying for a trip to Oslo from a flat in Lisbon, and getting the layers right.",
  },
  {
    id: 27460861,
    name: "Fit notes: Arjun Rao",
    body: "Shirts that fit his shoulders for once — found by size advice, not by returns.",
  },
] as const

export const FEATURES = [
  {
    id: 6347515,
    title: "Try on anything you find",
    body: "Paste a link from any shop. Drape reads the product photos and fits them to you.",
    tall: true,
  },
  {
    id: 1456733,
    title: "Shoes, bags and the rest",
    body: "Accessories sit where they would — on your feet, your shoulder, your wrist.",
  },
  {
    id: 35930596,
    title: "Fabric that behaves",
    body: "Knit stretches, linen creases, wool holds its shape. Drape knows the difference.",
  },
  {
    id: 5706277,
    title: "Build whole outfits",
    body: "Mix a coat from one shop with trousers from another and see them together.",
    tall: true,
  },
  {
    id: 36367484,
    title: "Size with confidence",
    body: "Your measurements, the brand's size chart and ten thousand fit reviews, in one answer.",
  },
  {
    id: 6347591,
    title: "Ask for a second opinion",
    body: "Share a look with friends and let them vote before you check out.",
  },
] as const

export const SCATTER = [
  { id: 1487703, className: "left-[2%] top-[8%] w-[22%] sm:w-[14%]", depth: 0.6 },
  { id: 19271377, className: "right-[3%] top-[4%] w-[26%] sm:w-[16%]", depth: 1 },
  { id: 5717971, className: "left-[6%] bottom-[6%] w-[24%] sm:w-[13%]", depth: 1.3 },
  { id: 7827450, className: "right-[8%] bottom-[10%] w-[20%] sm:w-[12%]", depth: 0.8 },
] as const

export const STRIP = [30466066, 36044003, 15526203, 12944791, 21897141, 5734462] as const

export const FAQS = [
  {
    q: "Do I need a special photo?",
    a: "No. A full-length photo in good light, against any plain-ish wall, is enough. Fitted clothes help Drape read your shape; you can add a second angle later.",
  },
  {
    q: "Which shops does it work with?",
    a: "Any shop with product photos. Paste a link and Drape does the rest; partner shops also show a Try it on button right on the product page.",
  },
  {
    q: "How accurate is the fit?",
    a: "Size advice matches the size people keep 91% of the time in our partner shops. Drape tells you when it isn't sure, rather than guessing.",
  },
  {
    q: "What happens to my photos?",
    a: "They stay in your account, encrypted, and are never used to train models. Delete them and they are gone from our servers within 24 hours.",
  },
  {
    q: "Is it free?",
    a: "Ten try-ons a month are free. Drape Plus is $6 a month for unlimited try-ons, colourways and outfit boards.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes — from Settings, in two clicks, with no emails asking you to reconsider.",
  },
] as const

export const FRIENDS = [
  { name: "Maya", color: "var(--mustard)", from: [-40, -30], to: [30, 20] },
  { name: "Jordan", color: "var(--clay)", from: [20, 30], to: [-20, -10] },
  { name: "Sam", color: "var(--sage)", from: [30, -20], to: [-30, 30] },
  { name: "Priya", color: "var(--plum)", from: [-20, 20], to: [40, -20] },
] as const

export const FOOTER = [
  { title: "Product", links: ["Fitting room", "Colourways", "Outfit builder", "Size advice", "Download"] },
  { title: "For shops", links: ["Try-on widget", "Returns insight", "Integrations", "Case studies"] },
  { title: "Company", links: ["About", "Careers", "Press", "Privacy", "Terms"] },
  { title: "Help", links: ["Support", "Photo tips", "Contact", "Status"] },
] as const
