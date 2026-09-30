/**
 * Every word and every photograph on the site, in one place.
 *
 * Photography is from Pexels (https://www.pexels.com), loaded from its CDN by
 * photo id — `photo(id, width)` asks for a compressed copy at the width a slot
 * needs.
 */

export function photo(id: number, width = 1200, height?: number) {
  const size = height ? `&w=${width}&h=${height}&fit=crop` : `&w=${width}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`
}

export const STUDIO = {
  name: "Kerfuffle",
  tagline: "Animation, video & social content",
  street: "Havenkade 42",
  postcode: "3011 WR",
  city: "Rotterdam",
  email: "hello@kerfuffle.studio",
  phone: "+31 10 204 88 17",
  phoneHref: "tel:+31102048817",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
}

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "What we do", href: "/what-we-do" },
]

/** The pictures the hero drops under the pointer, in order. */
export const TRAIL = [10458835, 7683650, 3062541, 29708294, 27516565, 7862718, 32435746, 36025195, 30215324, 5580064].map(
  (id) => photo(id, 480, 360),
)

export const CLIENTS = [
  { name: "Northdrop", style: "font-display font-black italic tracking-tight" },
  { name: "HALVE MAAN", style: "font-display font-black tracking-[0.2em]" },
  { name: "loopwise", style: "font-sans font-extrabold lowercase" },
  { name: "Brugman & Co", style: "font-serif italic text-[1.35em]" },
  { name: "OPAL", style: "font-display font-black tracking-[0.35em]" },
  { name: "fizzkit", style: "font-bubble text-[1.35em]" },
  { name: "Stadsarchief", style: "font-serif uppercase tracking-wide" },
  { name: "VOLTA", style: "font-display font-black italic" },
]

export type ServiceKey = "animation" | "video" | "social"

export const SERVICES: {
  key: ServiceKey
  title: string
  short: string
  eyebrow: string
  body: string
  color: "blue" | "pink" | "orange"
  image: number
  points: string[]
}[] = [
  {
    key: "animation",
    title: "Animation",
    short: "2D, 3D and motion graphics that stick in your head.",
    eyebrow: "Hard to explain? Easy to show.",
    body: "A technical product, a tangled process, a story nobody has quite put into words yet — that is exactly where we like to start. We turn the complicated into pictures people understand, remember and pass on: explainers, product films, brand loops and characters with a bit of cheek.",
    color: "blue",
    image: 29708294,
    points: ["2D & character animation", "3D product visuals", "Motion design systems", "Explainers & brand loops"],
  },
  {
    key: "video",
    title: "Video",
    short: "Your story, in moving pictures.",
    eyebrow: "Lights, camera, fewer meetings.",
    body: "From a one-day shoot to a campaign film, we write it, shoot it and cut it in-house. One crew from concept to colour grade means fewer handovers and a film that still sounds like you by the time it goes live.",
    color: "pink",
    image: 3062541,
    points: ["Concept & scripting", "Shoots with our own crew", "Edit, grade & sound", "Cut-downs for every channel"],
  },
  {
    key: "social",
    title: "Social",
    short: "Social content that makes people stop scrolling.",
    eyebrow: "Nothing is too small to scroll past.",
    body: "Social is our playing field. We make content for the feed people actually watch: vertical, fast, native to the platform and made to be shared. Formats, series and always-on content that keep your brand in the conversation.",
    color: "orange",
    image: 1035103,
    points: ["Platform-native formats", "Series & always-on content", "Creator-style shoots", "Monthly content sprints"],
  },
]

export type Case = {
  slug: string
  client: string
  title: string
  services: ServiceKey[]
  image: number
  color: "blue" | "pink" | "orange" | "red" | "green" | "yellow" | "lilac" | "mint"
  year: number
  summary: string
  challenge: string
  statement: [string, string]
  outcome: string
  gallery: number[]
}

export const CASES: Case[] = [
  {
    slug: "halve-maan",
    client: "Halve Maan FC",
    title: "A season in ninety seconds",
    services: ["video", "social"],
    image: 38471099,
    color: "red",
    year: 2026,
    summary: "The season-ticket campaign for a club that sells out on feeling, not on stats.",
    challenge: "Season tickets were selling slower than the club's following suggested. Fans loved the club; they just weren't being asked in the right place, at the right moment. We went looking for that moment in the stands.",
    statement: ["Loud on matchday.", "Louder online."],
    outcome: "A ninety-second film, twenty-four cut-downs and a matchday series that ran all season.",
    gallery: [30215324, 38471099, 11489970],
  },
  {
    slug: "fizzkit",
    client: "Fizzkit",
    title: "Sweets with a mouth on them",
    services: ["animation", "social"],
    image: 7862718,
    color: "pink",
    year: 2026,
    summary: "A cast of animated sweets that took over a brand's feed — and then its packaging.",
    challenge: "Fizzkit's products were bright, loud and fun. Its feed was none of those things. We gave every sweet a face, a voice and an opinion, and let them run the account.",
    statement: ["Not to be missed.", "Worth sharing."],
    outcome: "Eight characters, a weekly series and a packaging refresh built from the same cast.",
    gallery: [7862718, 10458835, 36025195],
  },
  {
    slug: "volta",
    client: "Volta",
    title: "Quiet car, loud launch",
    services: ["video"],
    image: 27639784,
    color: "blue",
    year: 2025,
    summary: "A night shoot for an electric roadster that makes almost no sound.",
    challenge: "How do you film speed when the car is silent? We shot after dark in an empty car park and let light, reflections and sound design do the shouting.",
    statement: ["Zero decibels.", "All attention."],
    outcome: "A launch film, a 3D turntable and a set of social loops for the reveal week.",
    gallery: [27639784, 5993641, 29909645],
  },
  {
    slug: "loopwise",
    client: "Loopwise",
    title: "The app, explained in shapes",
    services: ["animation"],
    image: 29708294,
    color: "orange",
    year: 2025,
    summary: "A 3D explainer for a planning tool that is hard to describe and easy to love.",
    challenge: "Loopwise does a lot, and every screenshot made it look like it did too much. We built a small world of shapes that click together the way the product does.",
    statement: ["Complicated inside.", "Simple on screen."],
    outcome: "A 60-second explainer, onboarding loops and a motion kit for the product team.",
    gallery: [29708294, 10458835, 36025195],
  },
  {
    slug: "stadsarchief",
    client: "Stadsarchief",
    title: "Old stories, new feeds",
    services: ["social", "animation"],
    image: 5993641,
    color: "mint",
    year: 2025,
    summary: "A city archive on social, one forgotten document at a time.",
    challenge: "Millions of documents and nobody under forty reading them. We picked one odd little story a week and animated it into something you'd send to a friend.",
    statement: ["Dusty archive.", "Fresh stories."],
    outcome: "A weekly series with a six-times jump in average watch time.",
    gallery: [5993641, 17085581, 29909645],
  },
  {
    slug: "brugman",
    client: "Brugman & Co",
    title: "Light for long evenings",
    services: ["video", "social"],
    image: 29909645,
    color: "yellow",
    year: 2025,
    summary: "An autumn campaign for a lighting brand, shot in a single dark room.",
    challenge: "Lamps are hard to film: switch them on and everything else disappears. We built a set around the glow and let the product light its own film.",
    statement: ["Lights down.", "Glow up."],
    outcome: "One campaign film, twelve product loops and a still series for print.",
    gallery: [29909645, 5993641, 19102538],
  },
  {
    slug: "pawsome",
    client: "Pawsome",
    title: "A very good boy",
    services: ["social"],
    image: 7683650,
    color: "yellow",
    year: 2024,
    summary: "A dog-food brand's feed, handed over to its most photogenic customer.",
    challenge: "Pet food ads all look the same. We let one fluffy creator run the channel from the dog's eye view, and wrote the captions he would have written.",
    statement: ["Good boy.", "Great reach."],
    outcome: "Always-on content for twelve months and the brand's most-shared post ever.",
    gallery: [7683650, 7862718, 32435746],
  },
  {
    slug: "opal",
    client: "Opal",
    title: "Feel the room",
    services: ["video"],
    image: 30215324,
    color: "lilac",
    year: 2024,
    summary: "The aftermovie for a festival that did not want an aftermovie.",
    challenge: "Every festival film is fireworks and slow motion. Opal wanted the feeling of being in the crowd — so we filmed from inside it, handheld, all weekend.",
    statement: ["No slow motion.", "Just the moment."],
    outcome: "A three-minute film, artist cuts and a teaser for next year's line-up.",
    gallery: [30215324, 27516565, 11489970],
  },
  {
    slug: "northdrop",
    client: "Northdrop",
    title: "Four of a kind",
    services: ["animation", "video"],
    image: 7565486,
    color: "green",
    year: 2024,
    summary: "A card game launch told in four short films, one per suit.",
    challenge: "A game night is hard to sell in a thumbnail. We gave each suit its own short film and let the audience pick a favourite.",
    statement: ["Deal them in.", "Play it out."],
    outcome: "Four films, a trailer and an in-store loop for the launch.",
    gallery: [7565486, 5580064, 29708294],
  },
  {
    slug: "halfpipe",
    client: "Halfpipe Collective",
    title: "Concrete summer",
    services: ["video", "social"],
    image: 32435746,
    color: "blue",
    year: 2024,
    summary: "A summer series for a skate park run by the people who skate it.",
    challenge: "Their riders had better footage on their phones than any ad could buy. We built a format around it and kept our crew small enough to keep up.",
    statement: ["Unpolished.", "Unmissable."],
    outcome: "A ten-part series and a park that booked out its summer camp.",
    gallery: [32435746, 11489970, 30215324],
  },
  {
    slug: "neon-noodle",
    client: "Neon Noodle",
    title: "Open late",
    services: ["social", "animation"],
    image: 27516565,
    color: "pink",
    year: 2023,
    summary: "A late-night noodle bar with a feed that glows as bright as its sign.",
    challenge: "Their best hours are after midnight, when nobody is posting. We made a nightly drop that goes live when the kitchen gets busy.",
    statement: ["Open late.", "Posted later."],
    outcome: "A nightly series and animated menu boards for the restaurant.",
    gallery: [27516565, 15789322, 7862718],
  },
  {
    slug: "red-corner",
    client: "Red Corner",
    title: "Round one",
    services: ["video"],
    image: 5580064,
    color: "red",
    year: 2023,
    summary: "A boxing gym's opening film, shot in the week before the doors opened.",
    challenge: "No members yet, no ring, no story — just a pair of gloves and a coach with a plan. So that is what we filmed.",
    statement: ["Gloves on.", "Doors open."],
    outcome: "A launch film and a founding-member campaign that sold out in a week.",
    gallery: [5580064, 7565486, 32435746],
  },
]

export const TEAM = [
  { name: "Idris", role: "Founder / Creative director", line: "Has the idea before the brief is finished.", image: 20159168 },
  { name: "Noor", role: "Founder / Art director", line: "Understands what you mean and what you actually mean.", image: 17085581 },
  { name: "Milo", role: "2D/3D animator", line: "Makes, cuts and animates until it clicks.", image: 18414321 },
  { name: "Sanne", role: "Creative producer", line: "Knows exactly what you need, and makes it happen.", image: 10697580 },
  { name: "Joss", role: "Director / Editor", line: "Cuts every film twice: once long, once right.", image: 5738290 },
  { name: "Ravi", role: "Social strategist", line: "Reads the comments so you don't have to.", image: 16779580 },
  { name: "Wren", role: "Motion designer", line: "Will animate the loading bar if you let her.", image: 7431562 },
]

export const FAQ = [
  {
    q: "What does a project with Kerfuffle cost?",
    a: "Most social sprints start around €4,500 a month; a produced film or animation usually lands between €12,000 and €45,000. After a first call we send a fixed quote, so there are no surprises halfway through.",
  },
  {
    q: "How fast can you turn something around?",
    a: "A social format can go live within two weeks of kick-off. A campaign film or a longer animation typically takes six to ten weeks from script to final grade.",
  },
  {
    q: "Do you only work with big brands?",
    a: "No. We work with clubs, archives, start-ups and brands you know. What they share is a story worth telling and the nerve to tell it a little differently.",
  },
  {
    q: "Can you work with our in-house team?",
    a: "Happily. We regularly plug into marketing and design teams — as the whole crew, or just the animation or editing part of it.",
  },
  {
    q: "Where are you based?",
    a: "In a former harbour warehouse in Rotterdam. We shoot all over the Netherlands and Belgium, and further when the story needs it.",
  },
]

export const STICKERS = [
  { text: "No fluff!", tone: "blue" as const },
  { text: "Less talk, more frames", tone: "green" as const },
  { text: "Made in Rotterdam", tone: "red" as const },
  { text: "Pixel pushers", tone: "pink" as const },
  { text: "Hot off the timeline", tone: "orange" as const },
  { text: "KF", tone: "emblem" as const },
  { text: "Always in motion", tone: "yellow" as const },
]
