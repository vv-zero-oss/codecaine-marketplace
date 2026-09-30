/**
 * Every word and every picture on the site, in one place.
 *
 * Titles use a small markup the `MixedTitle` component reads: words wrapped in
 * underscores are set in the display italic, the rest in capitals — `_where_
 * PATTERN _meets_ PATIENCE`. Photographs are from Pexels.
 */

/** A Pexels photograph at a given width. */
export function px(id: number, w = 1200, ext: "jpeg" | "png" = "jpeg") {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=${w}`
}

export const brand = {
  name: "Aurel",
  wordmark: "AUREL",
  tagline: "_the_ HOUSE _of_ SLOW TAILORING",
  city: "Lisbon",
  email: "atelier@aurel.house",
  phone: "+351 21 000 0420",
  address: ["Rua das Flores 41", "1200-193 Lisbon"],
}

export const film = {
  src: "https://videos.pexels.com/video-files/31941990/13606806_1080_1920_30fps.mp4",
  poster: "https://images.pexels.com/videos/31941990/fashion-new-31941990.jpeg?auto=compress&cs=tinysrgb&w=1600",
}

export const nav = [
  { label: "Home", href: "/", image: px(39325164, 900) },
  { label: "Collection", href: "/collection", image: px(38164214, 900) },
  { label: "Atelier", href: "/atelier", image: px(4622423, 900) },
  { label: "Journal", href: "/journal", image: px(9509647, 900) },
  { label: "House", href: "/house", image: px(11911863, 900) },
  { label: "Appointments", href: "/appointments", image: px(5490969, 900) },
]

export const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Newsletter", href: "/house" },
]

export const legal = [
  { label: "Accessibility", href: "/house" },
  { label: "Terms & Conditions", href: "/house" },
  { label: "Privacy Policy", href: "/house" },
  { label: "Shipping & Returns", href: "/appointments" },
]

/* ---------------------------------------------------------------- Home */

export const home = {
  piece: {
    image: px(9563072, 1600),
    alt: "A woman seen from behind in a pale, open-backed silk gown tied at the waist, in black and white",
    first: "YOUR MOST _considered_ PIECE",
    second: "DESERVES TO LAST _for years._",
    lead: "Aurel is a house of ready-to-wear and made-to-measure, cut in one atelier and sold in one room.",
    body: "Every garment is drafted by hand in Lisbon, sewn by the same twelve people, and finished to be worn for a decade rather than a season. We make fewer pieces, in better cloth, and we mend what we make.",
    cta: "Book _a_ FITTING",
  },
  craft: {
    eyebrow: "_the_ SPIRIT _of_ AUREL",
    title: "_where_ PATTERN _meets_ PATIENCE",
    image: px(38164214, 2000),
    alt: "A model in a white vest and black trousers leaning on a white plinth against a burnt-orange wall",
  },
  sweep: "_From_ SKETCH, _to_ TOILE, _to_ YOU.",
  wardrobe: {
    eyebrow: "_a_ WARDROBE BUILT _for_ DECADES",
    title: "_so_ THAT IT BECOMES YOURS.",
    large: { src: px(20817754, 1400), alt: "A woman in a long black coat dress against a pale wall, in black and white" },
    small: [
      { src: px(11823983, 900), alt: "A model in burnt orange silk against a matching backdrop" },
      { src: px(36624450, 900), alt: "A figure in a long trench coat walking away, in black and white" },
    ],
    heading: "Worn often. Never worn out.",
    body: "A good coat learns the shape of your shoulders. We cut in natural cloth that softens instead of wearing thin, sew seams wide enough to be let out, and keep every pattern on file — so the piece you buy this year can be altered, relined or remade for as long as you want to wear it.",
    cta: "Discover _the_ ATELIER",
    detail: { src: px(10973607, 700), alt: "A woman in a black coat standing in a pool of warm light" },
    quote: "“Fashion asks you to keep up. We would rather you kept the coat.”",
    by: "INÊS AUREL VALE",
    role: "_founder of_ AUREL",
  },
  archive: {
    eyebrow: "_your_ WARDROBE",
    title: "_will_ OUTLIVE _every_ TREND.",
    cta: "Explore _the_ JOURNAL",
    images: [
      { src: px(6053887, 500), alt: "A brass lamp on a side table in a dim room" },
      { src: px(18448147, 500), alt: "A draped marble figure in a museum" },
      { src: px(31034512, 500), alt: "White fabric falling in soft folds" },
      { src: px(9668972, 500), alt: "A model in an orange shirt dress beside a studio light" },
      { src: px(12380200, 500), alt: "A pleated lampshade over a gilded stand" },
      { src: px(4622423, 500), alt: "A tailor chalking a garment on a form" },
      { src: px(15253823, 500), alt: "A marble bust against a deep red wall" },
      { src: px(36701535, 500), alt: "A woman wrapped in golden drapes" },
      { src: px(8850650, 500), alt: "Ivory cloth crumpled in low light" },
      { src: px(36231970, 500), alt: "A crystal sconce glowing amber" },
      { src: px(20788961, 500), alt: "A woman in a beige suit lit in red" },
      { src: px(19817703, 500), alt: "Two carved figures in warm stone" },
      { src: px(2974113, 500), alt: "A tape measure over the shoulder of a dress form" },
      { src: px(7588065, 500), alt: "A portrait of a woman with bold earrings" },
      { src: px(36085031, 500), alt: "A wall lamp beside an ornate frame" },
      { src: px(30550128, 500), alt: "Grey silk in long ripples" },
      { src: px(12379867, 500), alt: "A Roman bust in a colonnade" },
      { src: px(31699396, 500), alt: "A woman in a white suit in a dim hallway" },
      { src: px(6461323, 500), alt: "A black dress form and a tape measure" },
      { src: px(27116559, 500), alt: "A woman in a heavy jacket, looking back, in black and white" },
    ],
  },
  verse: {
    lines: [
      ["A COAT", "IS A LETTER"],
      ["TO THE PERSON", "YOU WILL BE,"],
      ["SEALED", "IN WOOL"],
      ["AND OPENED", "EVERY"],
      ["WINTER", "AFTER."],
    ],
    by: "_from the_ AUREL NOTEBOOK",
  },
  closing: {
    title: "Your wardrobe deserves a fitting",
    body: "We would be glad to cut it with you.",
    cta: "Book _a_ FITTING",
  },
}

/* ---------------------------------------------------------- Collection */

export type Product = {
  slug: string
  name: string
  line: string
  category: "Outerwear" | "Dresses" | "Tailoring" | "Knit"
  price: number
  cloth: string
  colour: string
  images: { src: string; alt: string }[]
  description: string
  sizes: string[]
}

export const products: Product[] = [
  {
    slug: "ember-column-dress",
    name: "Ember Column Dress",
    line: "_the_ EMBER",
    category: "Dresses",
    price: 1480,
    cloth: "Silk faille, Como",
    colour: "Burnt orange",
    images: [
      { src: px(39325164, 1400), alt: "A model in a burnt-orange column dress against an orange backdrop" },
      { src: px(39325161, 1400), alt: "The same dress, seen closer, with long white opera gloves" },
    ],
    description: "A floor-length column cut on the straight grain, so the faille falls without clinging. Invisible side zip, a deep hem you can let down, and a lining of washed silk.",
    sizes: ["34", "36", "38", "40", "42"],
  },
  {
    slug: "vale-overcoat",
    name: "Vale Overcoat",
    line: "_the_ VALE",
    category: "Outerwear",
    price: 2150,
    cloth: "Double-faced cashmere, Biella",
    colour: "Night",
    images: [
      { src: px(10973607, 1400), alt: "A woman in a long black overcoat standing in warm light" },
      { src: px(19120504, 1400), alt: "A woman in a black overcoat, close, against a dark studio wall" },
    ],
    description: "Our house coat. Unlined, hand-closed double-faced cashmere that weighs almost nothing and holds a sharp shoulder for years. Cut long, to the calf.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "atelier-trench",
    name: "Atelier Trench",
    line: "_the_ ATELIER",
    category: "Outerwear",
    price: 1890,
    cloth: "Waxed cotton gabardine",
    colour: "Graphite",
    images: [
      { src: px(36624450, 1400), alt: "A figure in a long trench coat seen from behind, in black and white" },
      { src: px(20828196, 1400), alt: "A woman in a trench holding a fan in a pale studio" },
    ],
    description: "A trench without the hardware: no epaulettes, no buckles, one hidden storm flap. Gabardine that sheds rain and a raglan sleeve that layers over tailoring.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "plinth-waistcoat",
    name: "Plinth Waistcoat",
    line: "_the_ PLINTH",
    category: "Tailoring",
    price: 640,
    cloth: "Tropical wool, Yorkshire",
    colour: "Chalk",
    images: [
      { src: px(38164214, 1400), alt: "A model in a white waistcoat leaning on a white plinth against an orange wall" },
      { src: px(31699396, 1400), alt: "A woman in a white suit in a dim hallway" },
    ],
    description: "A long, collarless waistcoat that works alone or under the Vale. Horn buttons, a curved hem, and a back belt you can take in by two sizes.",
    sizes: ["34", "36", "38", "40", "42"],
  },
  {
    slug: "sienna-slip",
    name: "Sienna Slip",
    line: "_the_ SIENNA",
    category: "Dresses",
    price: 890,
    cloth: "Sand-washed charmeuse",
    colour: "Sienna",
    images: [
      { src: px(11823983, 1400), alt: "A model in a sienna silk slip against an orange backdrop" },
      { src: px(36701535, 1400), alt: "A woman wrapped in golden drapes" },
    ],
    description: "Cut on the bias and finished with French seams throughout. Adjustable straps with silk loops, and a length that sits just above the ankle.",
    sizes: ["34", "36", "38", "40", "42"],
  },
  {
    slug: "noir-evening-jacket",
    name: "Noir Evening Jacket",
    line: "_the_ NOIR",
    category: "Tailoring",
    price: 1320,
    cloth: "Wool grain de poudre",
    colour: "Black",
    images: [
      { src: px(20817754, 1400), alt: "A woman in a black tailored dress coat against a pale wall" },
      { src: px(15835238, 1400), alt: "A woman holding the collar of a black jacket, in black and white" },
    ],
    description: "A single-button evening jacket with a narrow shawl lapel faced in silk. Half-canvassed by hand, so it shapes to you rather than to a hanger.",
    sizes: ["34", "36", "38", "40", "42"],
  },
  {
    slug: "saffron-knit",
    name: "Saffron Knit",
    line: "_the_ SAFFRON",
    category: "Knit",
    price: 520,
    cloth: "Baby alpaca, Arequipa",
    colour: "Saffron",
    images: [
      { src: px(9668972, 1400), alt: "A model in a saffron dress beside a studio lamp" },
      { src: px(18540397, 1400), alt: "A model in sheer black against an orange backdrop" },
    ],
    description: "A long rib knit that doubles as a dress or a tunic over trousers. Fully fashioned, so every seam is linked by hand rather than cut and overlocked.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "grain-knit-coat",
    name: "Grain Knit Coat",
    line: "_the_ GRAIN",
    category: "Knit",
    price: 780,
    cloth: "Undyed merino, Portugal",
    colour: "Oat",
    images: [
      { src: px(20788961, 1400), alt: "A woman in an oat-coloured knit coat lit in red" },
      { src: px(27116559, 1400), alt: "A woman in a heavy jacket looking back, in black and white" },
    ],
    description: "A knitted coat with the structure of a tailored one: a taped shoulder, set-in sleeves and patch pockets that do not sag. Undyed, so it ages into its colour.",
    sizes: ["XS", "S", "M", "L"],
  },
]

export const collection = {
  eyebrow: "_the_ AUTUMN / WINTER EDIT",
  title: "_eight_ PIECES, _made to be_ KEPT.",
  intro: "One collection a year, cut in small runs and restocked only when the cloth is right. Each piece can be altered at the atelier for as long as you own it.",
  categories: ["All", "Outerwear", "Dresses", "Tailoring", "Knit"] as const,
  indexTitle: "_the_ INDEX",
}

export const productDetails = [
  { title: "Composition", body: "Natural fibres only, woven in mills we visit each year. Threads, interlinings and buttons are listed on the care label, so a tailor anywhere can mend the piece." },
  { title: "Fit & measurements", body: "Cut true to size with room through the shoulder. Every seam carries two centimetres of allowance, so the atelier can let it out or take it in later." },
  { title: "Care", body: "Brush after wearing and rest it for a day between wears. Dry clean sparingly. Bring it to us once a year and we will press and check it at no charge." },
  { title: "Delivery & returns", body: "Complimentary delivery in Europe in three to five days, wrapped in cloth rather than plastic. Returns are free within thirty days." },
]

/* ------------------------------------------------------------- Atelier */

export const atelier = {
  eyebrow: "_the_ ATELIER",
  title: "_twelve_ PAIRS _of_ HANDS, ONE ROOM.",
  intro: "Everything Aurel sells is cut and sewn above the shop on Rua das Flores. Five steps, the same people, no subcontractors — and you are welcome to watch.",
  steps: [
    { number: "01", name: "Sketch", title: "_a_ LINE _on_ PAPER", body: "Each piece starts as a pencil drawing at full scale. We draw the proportion before we choose the cloth, so the cloth serves the line.", image: px(5830661, 1400), alt: "A tailor cutting fabric with shears on a long bench" },
    { number: "02", name: "Toile", title: "_a_ DRAFT _in_ CALICO", body: "The first garment is always calico. It is fitted, marked, unpicked and redrawn until the pattern is right — sometimes six times.", image: px(4622423, 1400), alt: "A tailor adjusting a garment pinned to a dress form" },
    { number: "03", name: "Cut", title: "_by_ HAND, _by_ GRAIN", body: "Cloth is laid single-ply and cut with shears, one piece at a time, matching the grain so a coat hangs straight for as long as it lasts.", image: px(18181981, 1400), alt: "A vintage sewing machine with cloth under the needle" },
    { number: "04", name: "Fit", title: "_on_ YOU, _not_ A FORM", body: "Made-to-measure clients come in twice: once for a basted fitting, once for the finished piece. Ready-to-wear is altered here, free, within a year.", image: px(2974113, 1400), alt: "A tape measure draped over the shoulder of a white dress form" },
    { number: "05", name: "Finish", title: "_the_ LAST HOUR", body: "Buttonholes are sewn by hand, hems are blind-stitched, and every piece is pressed and inspected by the person who cut it.", image: px(6660930, 1400), alt: "A seamstress working at a sewing machine by the window" },
  ],
  stats: [
    { value: 12, suffix: "", label: "people in the atelier" },
    { value: 38, suffix: "h", label: "to make one Vale coat" },
    { value: 1, suffix: "", label: "room, above the shop" },
    { value: 10, suffix: "yr", label: "of free alterations" },
  ],
  hands: { src: px(16120717, 2000), alt: "A tailor sewing at a bench seen through the atelier window" },
}

/* ------------------------------------------------------------- Journal */

export const journal = {
  eyebrow: "_the_ JOURNAL",
  title: "NOTES _from_ ROOM FORTY-ONE",
  intro: "Stories from the atelier, the mills and the people who wear what we make. Scroll sideways — it reads like a contact sheet.",
  features: [
    { slug: "a-coat-in-thirty-eight-hours", kicker: "Atelier", title: "A coat in thirty-eight hours", excerpt: "We followed one Vale overcoat from the first chalk line to the last buttonhole.", image: px(9509647, 1600), alt: "A model in black walking across a pale set scattered with dried grass" },
    { slug: "the-white-room", kicker: "Collection", title: "The white room", excerpt: "Why the autumn collection was shot on a set with nothing in it but a plinth.", image: px(10619460, 1600), alt: "Models in white suits in a brick-walled studio" },
    { slug: "cloth-that-ages-well", kicker: "Mills", title: "Cloth that ages well", excerpt: "A morning in Biella with the family who weaves our double-faced cashmere.", image: px(31034512, 1600), alt: "White fabric falling in soft folds" },
    { slug: "portraits-of-regulars", kicker: "People", title: "Portraits of regulars", excerpt: "Six clients, six coats, the oldest one now eleven winters old.", image: px(34426767, 1600), alt: "A group of models in sculptural outfits in a pale studio" },
    { slug: "the-evening-edit", kicker: "Collection", title: "The evening edit", excerpt: "Four pieces for the nights that ask for more — and the mornings after.", image: px(17055571, 1600, "png"), alt: "Models in long evening gowns in a dim room" },
  ],
  entries: [
    { date: "Sep 2026", kicker: "Atelier", title: "How we let out a seam" },
    { date: "Aug 2026", kicker: "Mills", title: "Undyed merino, and why it changes colour" },
    { date: "Jul 2026", kicker: "People", title: "A tailor's first year at Aurel" },
    { date: "Jun 2026", kicker: "House", title: "The shop, rearranged for summer" },
    { date: "May 2026", kicker: "Care", title: "Resting a coat between wears" },
  ],
}

/* --------------------------------------------------------------- House */

export const house = {
  eyebrow: "_the_ HOUSE",
  title: "_a_ SHOP _above_ A WORKROOM.",
  intro: "Aurel opened in 2014 as a single tailor with a lease on the top floor of Rua das Flores 41. The shop downstairs came later, when clients started asking to see where their coats were made.",
  image: { src: px(11911863, 2000), alt: "A pale shop interior with garments on rails and reflections in the glass" },
  timeline: [
    { year: "2014", title: "One tailor, one lease", body: "Inês Vale takes the top floor and begins making coats to order for friends." },
    { year: "2016", title: "The first toile wall", body: "Every pattern ever drafted goes up on the wall in calico. It now covers three rooms." },
    { year: "2019", title: "A shop downstairs", body: "The ground floor opens as a shop, with a staircase straight to the workroom." },
    { year: "2022", title: "Alterations for life", body: "Every piece we sell becomes eligible for free alterations for ten years." },
    { year: "2026", title: "Twelve pairs of hands", body: "The atelier is twelve people. We intend to keep it that size." },
  ],
  values: [
    { title: "Fewer pieces", body: "One collection a year. Nothing is made to fill a rail." },
    { title: "Natural cloth", body: "Wool, silk, linen, cashmere and cotton — fibres a tailor can mend." },
    { title: "Mended here", body: "Bring anything we made back to us. We will look after it." },
  ],
  gallery: [
    { src: px(10689371, 1200), alt: "Dresses in warm tones hanging on a rail in a bright shop" },
    { src: px(8386651, 1200), alt: "A bright shop with pastel garments and a tall green plant" },
    { src: px(5531541, 1200), alt: "A boutique with a glass counter and warm lighting" },
  ],
  letters: {
    title: "Letters _from the_ HOUSE",
    body: "Four letters a year: the new collection, a visit to a mill, and whatever the atelier is making. Nothing else.",
  },
}

/* -------------------------------------------------------- Appointments */

export const appointments = {
  eyebrow: "_book_ AN APPOINTMENT",
  title: "_come_ TO THE HOUSE.",
  intro: "Fittings, alterations and made-to-measure consultations happen in the workroom, with the tailor who will cut your piece. Appointments last an hour; there is always coffee.",
  image: { src: px(5490969, 1400), alt: "A shop assistant adjusting a garment on a rail" },
  kinds: [
    { value: "fitting", label: "Ready-to-wear fitting" },
    { value: "measure", label: "Made-to-measure consultation" },
    { value: "alteration", label: "Alteration or repair" },
    { value: "private", label: "Private viewing of the collection" },
  ],
  hours: [
    ["Tuesday – Friday", "10:00 – 19:00"],
    ["Saturday", "10:00 – 17:00"],
    ["Sunday – Monday", "By appointment"],
  ],
  faq: [
    { q: "How long does made-to-measure take?", a: "Eight to ten weeks from the first consultation, with two fittings in between. We can work faster for a date, if you tell us early." },
    { q: "Can I book from abroad?", a: "Yes. Many clients come to Lisbon once and do the second fitting by video, with a basted garment sent ahead." },
    { q: "Do you alter pieces you didn’t make?", a: "Only when the cloth and construction make it worthwhile. Bring it in and we will be honest with you." },
    { q: "Is there a charge for the appointment?", a: "No. A made-to-measure deposit is taken only once you choose the cloth." },
  ],
}
