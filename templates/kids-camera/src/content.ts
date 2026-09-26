/**
 * Every word and picture on the page, in the order the page tells it.
 *
 * The story: a small studio has made Lumo, a pocket camera for children with
 * no screen on it. The page walks a parent from "what is it" to "why a device
 * at all" to "what happens to the pictures" to "who made it", and asks for an
 * email twice — once in the header, once where the story has earned it.
 *
 * Photographs are from Pexels (https://www.pexels.com). A photo is its Pexels
 * id; `pexels()` turns that into the CDN address the Pexels API itself hands
 * back. `query` is the search each one was chosen from, kept so a picture can
 * be swapped for another of the same tone.
 */

export type Photo = {
  /** Pexels photo id, or `null` while the slot has not been filled. */
  id: number | null
  alt: string
  query: string
  /** Where the subject sits, for `object-position`. */
  focus?: string
}

export function pexels(id: number, width: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export const brand = {
  studio: ["little", "light", "studio"],
  studioName: "Littlelight Studio",
  product: "Lumo",
  email: "hello@littlelight.studio",
}

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Journal", href: "#journal" },
  { label: "Instagram", href: "#instagram" },
]

export const newsletterPill = {
  label: "Get the field notes",
  href: "#field-notes",
}

export const hero = {
  lines: ["Small hands,", "big pictures"],
  intro: "Lumo is a pocket camera for children. It keeps what they notice, the moment they notice it.",
  photo: {
    id: null,
    alt: "A child eating breakfast at a long wooden table in a sunlit family kitchen",
    query: "family kitchen morning child table",
    focus: "50% 60%",
  } satisfies Photo,
}

export const noticing = {
  text: "Children see further than what is in front of them. Lumo keeps the world the way they found it, before anyone tells them what it should be.",
  photos: [
    { id: null, alt: "A father lifting a child up in the air outdoors", query: "father lifting child summer" },
    { id: null, alt: "A beach seen through an open car door", query: "beach through car window" },
    { id: null, alt: "Two small figures running under a garden sprinkler", query: "kids running sprinkler" },
    { id: null, alt: "A grandmother and a child sitting in the back of a car", query: "grandmother child car" },
    { id: null, alt: "A child mid-jump in a doorway at home", query: "child jumping doorway home" },
    { id: null, alt: "A child's hand reaching into a rock pool", query: "child hand rock pool" },
    { id: null, alt: "A toddler with foamy hair in the bath", query: "toddler bath hair" },
    { id: null, alt: "Long shadows of a family walking on a warm wall", query: "family shadows wall sunset" },
    { id: null, alt: "Two children squeezed into the back seat of a car", query: "kids back seat car" },
    { id: null, alt: "A boy looking through a glass of water", query: "boy looking through glass" },
    { id: null, alt: "A red autumn leaf held against the sky", query: "child holding autumn leaf" },
    { id: null, alt: "A small boot stepping into a puddle", query: "child boot puddle" },
  ] satisfies Photo[],
}

export const throughTheirEyes = {
  label: "Through their eyes",
  before: {
    caption: "What we notice",
    body: "A walk to school. A zebra crossing, a car waiting, a toy along for the ride.",
    photo: {
      id: null,
      alt: "A girl crossing the street holding a small stuffed toy",
      query: "girl crossing street stuffed toy",
      focus: "50% 40%",
    } satisfies Photo,
  },
  after: {
    caption: "What they notice, kept with Lumo",
    body: "The same walk holds a whole world. Lumo turns what they caught into a story, so we get to walk inside it too.",
    photo: {
      id: null,
      alt: "A child hugging a giant plush creature in the middle of the street",
      query: "child hugging giant teddy bear",
      focus: "50% 40%",
    } satisfies Photo,
  },
  closing:
    "Lumo starts outside. Children gather light, textures and small discoveries as they wander, with no screen to stop at. Later, what they gathered becomes a story the whole family can open.",
}

export const principles = [
  {
    label: "Why a device",
    title: "Hands before feeds.",
    body: "We believe in things you can hold. A shutter, some weight, one job done well. Lumo keeps children in the moment, not in a scroll.",
  },
  {
    label: ["One camera,", "one companion app"],
    title: "Catch it. Turn it over.",
    body: "Lumo takes what caught their eye. Studio, the app beside it, asks what else it might be. On their own, or with you.",
  },
]

export const product = {
  before: "Meet",
  after: "Lumo",
  photo: {
    id: null,
    alt: "A small toy camera with two round lenses resting on a warm sand-coloured surface",
    query: "retro toy camera beige background",
    focus: "50% 50%",
  } satisfies Photo,
  play: "Watch the film",
}

export const uses = [
  {
    label: "Tell",
    caption: "A story to read together. On screen, printed, or bound into a book.",
    photo: { id: null, alt: "A parent reading to a child in bed by string lights", query: "mother reading bedtime story child" } satisfies Photo,
    size: "large" as const,
  },
  {
    label: "Hear",
    caption: "A bedtime story, told by Lumo or in Studio.",
    photo: { id: null, alt: "A child in headphones curled up on a sofa", query: "child headphones sofa" } satisfies Photo,
    size: "small" as const,
  },
  {
    label: "Draw",
    caption: "Scenes, characters, stickers and drawings, so the story keeps going.",
    photo: { id: null, alt: "Two children drawing together at a table", query: "children drawing together table" } satisfies Photo,
    size: "medium" as const,
  },
]

export const fieldNotes = {
  lines: ["Get the", "field notes"],
  body: "A few dozen Lumos exist so far, with families we know and trust. More are coming. Sign up to follow what we build, learn and get wrong.",
  placeholder: "Your email address",
  submit: "Sign up",
  done: "Thank you. The first note is on its way.",
}

export const makers = {
  title: "Three makers. One slow idea.",
  people: [
    {
      name: "Ines Varga",
      bio: "Ines designs objects families keep. Her screen-free music box sits in over 200,000 homes, and her last speaker sold out in an afternoon.",
      photo: { id: null, alt: "A stone portrait bust on a pale background", query: "stone bust sculpture portrait" } satisfies Photo,
    },
    {
      name: "Tomás Reyes",
      bio: "Tomás has spent fifteen years between design and engineering, first at a toy studio, then running his own. He builds software that widens what a child can do without deciding it for them.",
      photo: { id: null, alt: "A clay portrait bust on a pale background", query: "clay bust sculpture head" } satisfies Photo,
    },
    {
      name: "Noor Haddad",
      bio: "Noor builds the systems underneath. She designs the layer that gives attention back to the child instead of taking it, after a decade building payments infrastructure.",
      photo: { id: null, alt: "A carved portrait head on a plinth", query: "carved head sculpture plinth" } satisfies Photo,
    },
  ],
}

export const doodle = {
  prompt: "Leave a drawing for the wall. It stays here until you wipe it.",
  clear: "Wipe the drawing",
  colors: [
    { name: "Black", token: "var(--crayon-black)" },
    { name: "Red", token: "var(--crayon-red)" },
    { name: "Blue", token: "var(--crayon-blue)" },
    { name: "Green", token: "var(--crayon-green)" },
    { name: "Yellow", token: "var(--crayon-yellow)" },
  ],
}

export const footer = {
  links: [
    { label: "Home", href: "#top" },
    { label: "Journal", href: "#journal" },
  ],
  credit: "Photographs from Pexels",
}
