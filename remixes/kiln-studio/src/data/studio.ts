/** The studio itself: places, people, process, recognition and open roles. */

export const STUDIOS = [
  { city: "Lisbon", country: "PT", timeZone: "Europe/Lisbon", address: "Rua da Cerâmica 14, 1200-091", photo: 29320945 },
  { city: "Montréal", country: "CA", timeZone: "America/Toronto", address: "5445 av. de Gaspé, H2T 3B2", photo: 9866569 },
] as const

export const EMAIL = "hello@kiln.studio"
export const CAREERS_EMAIL = "work@kiln.studio"

export const TEAM = [
  { name: "Inês Calado", role: "Founder, Creative Director", city: "Lisbon", photo: 13548627, fact: "Throws pots on Sundays. Badly, she says." },
  { name: "Theo Marchand", role: "Founder, Technology Director", city: "Montréal", photo: 31528817, fact: "Has written a shader for every room he's lived in." },
  { name: "Amara Okafor", role: "Head of Strategy", city: "Lisbon", photo: 34673103, fact: "Reads the brief backwards first. It works." },
  { name: "Joon Park", role: "Lead Creative Technologist", city: "Montréal", photo: 36057215, fact: "Builds the prototype before the deck." },
  { name: "Saoirse Byrne", role: "Design Director", city: "Lisbon", photo: 35725749, fact: "Keeps a drawer of every type specimen since 2009." },
  { name: "Mateus Rocha", role: "Head of Production", city: "Lisbon", photo: 10500054, fact: "Can ship a twelve-metre neon wall in a van." },
  { name: "Léa Fontaine", role: "3D & Motion Lead", city: "Montréal", photo: 6431139, fact: "Renders in her head, then on the farm." },
  { name: "Kwame Asante", role: "Engineering Lead", city: "Montréal", photo: 7148717, fact: "Thinks 60fps is a minimum, not a goal." },
]

export const PROCESS = [
  {
    step: "Spark",
    weeks: "Week 1–2",
    title: "We find the one sentence.",
    body: "Workshops, research, a lot of listening. We leave with a single line everyone agrees on — what has to be true for this to work.",
  },
  {
    step: "Shape",
    weeks: "Week 2–5",
    title: "We build the idea, not a deck.",
    body: "Prototypes from day three. Things you can hold, play, click or walk through, so the decision is made on the real thing.",
  },
  {
    step: "Fire",
    weeks: "Week 5–14",
    title: "We make it, properly.",
    body: "Design, engineering, 3D and production in one room. No hand-offs, no relay race — the people who imagined it ship it.",
  },
  {
    step: "Glaze",
    weeks: "Launch and after",
    title: "We stay for the part after launch.",
    body: "We tune it live, measure what it did, and write it all down so your team can keep it running without us.",
  },
]

export const AWARDS = [
  { year: 2026, award: "Site of the Day", body: "Interactive Design Awards", project: "Night Signal" },
  { year: 2025, award: "Gold, Experiential", body: "European Design Prize", project: "Flock" },
  { year: 2025, award: "Grand Prix, Innovation", body: "Lisbon Creative Festival", project: "Second Sight" },
  { year: 2024, award: "Silver, Craft in Film", body: "Northern Light Awards", project: "Soft Power" },
  { year: 2024, award: "Best Product Launch", body: "Product Design Review", project: "Glasshouse" },
  { year: 2023, award: "Studio of the Year", body: "Interactive Design Awards", project: "—" },
  { year: 2023, award: "Gold, Service Design", body: "European Design Prize", project: "Hold Please" },
]

export const VALUES = [
  { title: "Make it real early", body: "A prototype ends more arguments than a meeting." },
  { title: "One room", body: "Strategy, design and engineering sit together, every day." },
  { title: "Craft is the strategy", body: "People feel the last 5%, even when they can't name it." },
  { title: "Leave it better", body: "Everything we make, we document for the team who keeps it." },
]

export type Department = "Design" | "Engineering" | "Strategy" | "Production"

export const ROLES: {
  id: string
  title: string
  department: Department
  city: "Lisbon" | "Montréal" | "Either"
  type: "Full-time" | "Freelance"
  summary: string
  youll: string[]
  youhave: string[]
}[] = [
  {
    id: "senior-creative-technologist",
    title: "Senior Creative Technologist",
    department: "Engineering",
    city: "Montréal",
    type: "Full-time",
    summary: "Prototype the impossible in a week, then make it run at 60fps on a phone.",
    youll: ["Lead the build on two or three projects a year", "Prototype in the first week of every brief", "Pair with designers daily"],
    youhave: ["WebGL, Three.js or a game engine you love", "Shipped work people outside the industry used", "Patience for the last 5%"],
  },
  {
    id: "design-director",
    title: "Design Director",
    department: "Design",
    city: "Lisbon",
    type: "Full-time",
    summary: "Set the bar for type, motion and craft across the studio.",
    youll: ["Run the design team of eight", "Own the craft on every project that leaves the studio", "Present to clients alongside strategy"],
    youhave: ["Ten years making brands and products", "A portfolio with as much motion as print", "A habit of making the people around you better"],
  },
  {
    id: "3d-artist",
    title: "3D Artist",
    department: "Design",
    city: "Either",
    type: "Freelance",
    summary: "Model, light and render objects people want to reach out and touch.",
    youll: ["Build hero assets for campaigns and products", "Work in real-time engines and offline renderers", "Light things beautifully"],
    youhave: ["Blender, Houdini or Cinema 4D", "An eye for materials", "Comfort working to a real-time budget"],
  },
  {
    id: "frontend-engineer",
    title: "Front-end Engineer",
    department: "Engineering",
    city: "Lisbon",
    type: "Full-time",
    summary: "Build sites and apps that feel like objects, not pages.",
    youll: ["Build interfaces with React and TypeScript", "Own performance and accessibility", "Turn motion specs into code"],
    youhave: ["Three years shipping product UI", "Taste in motion and type", "Care for people using a keyboard or a screen reader"],
  },
  {
    id: "strategist",
    title: "Strategist",
    department: "Strategy",
    city: "Montréal",
    type: "Full-time",
    summary: "Find the one sentence a project hangs on — and defend it.",
    youll: ["Lead research and workshops", "Write briefs people want to read", "Measure what we made after launch"],
    youhave: ["Four years in brand, product or culture strategy", "A short way with words", "Curiosity about how things are made"],
  },
  {
    id: "producer",
    title: "Producer",
    department: "Production",
    city: "Lisbon",
    type: "Full-time",
    summary: "Make sure the twelve-metre neon wall arrives on time, and lit.",
    youll: ["Run budgets, schedules and suppliers", "Keep the team calm the week before launch", "Run physical builds and shoots"],
    youhave: ["Five years producing digital and physical work", "A spreadsheet you're proud of", "Unflappability"],
  },
]

export const PERKS = [
  { title: "Four-day studio weeks in August", body: "The whole studio, both cities." },
  { title: "Kiln Fridays", body: "One afternoon a month to make anything that isn't client work." },
  { title: "A learning budget", body: "€2,000 a year, for anything that makes your craft sharper." },
  { title: "Swap a studio", body: "Spend up to a month in the other city, flights on us." },
  { title: "Health, properly", body: "Private health cover for you and anyone you live with." },
  { title: "Real equipment", body: "The machine you need, chosen by you, upgraded every three years." },
]

export const LIFE_PHOTOS = [
  { id: 23471215, alt: "Four people laughing on set in a white photo studio" },
  { id: 12767729, alt: "A photographer preparing a white backdrop under studio lights" },
  { id: 9889178, alt: "Two people filming with a camera rig in front of a blue wall" },
  { id: 9866568, alt: "Photographers on a shoot crouched around a model on a red floor" },
  { id: 909256, alt: "Tools hung neatly on a pegboard in the workshop" },
  { id: 30499654, alt: "A dim workshop with long tables and tools" },
]
