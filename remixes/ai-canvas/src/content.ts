/**
 * Every word and every picture on the page, in one place.
 *
 * The product is Boundless, an AI canvas: prompt, sketch and edit pages on an
 * endless canvas, then publish them live. Rename it here and it is renamed
 * everywhere. Photography is from Pexels; `pexels()` asks its CDN for the
 * size a slot needs.
 */

export const brand = {
  name: "Boundless",
  year: 2026,
}

export interface Photo {
  id: number
  src: string
  alt: string
  by: string
}

/** A Pexels image at a given width, compressed. */
export function pexels(photo: Photo, width: number): string {
  return `${photo.src}?auto=compress&cs=tinysrgb&w=${Math.round(width)}`
}

/** Moody objects, renders, portraits and rooms: what people pin to a canvas. */
export const photos: Photo[] = [
  { id: 18069160, src: "https://images.pexels.com/photos/18069160/pexels-photo-18069160.png", alt: "A captivating abstract 3D geometric design featuring soft pastel colors and a digital render style.", by: "Google DeepMind" },
  { id: 34769279, src: "https://images.pexels.com/photos/34769279/pexels-photo-34769279.jpeg", alt: "Dynamic 3D rendering of geometric shapes with striking red light accents.", by: "Rostislav Uzunov" },
  { id: 9999717, src: "https://images.pexels.com/photos/9999717/pexels-photo-9999717.jpeg", alt: "3D rendered abstract twisted loop on a vibrant blue gradient background.", by: "Steve A Johnson" },
  { id: 12089403, src: "https://images.pexels.com/photos/12089403/pexels-photo-12089403.jpeg", alt: "A modern abstract hallway featuring glowing red geometric lights, creating a vivid, conceptual atmosphere.", by: "Yusuf P" },
  { id: 11255271, src: "https://images.pexels.com/photos/11255271/pexels-photo-11255271.jpeg", alt: "A detailed image of a crumpled blue fabric texture perfect for background use.", by: "Seamlesstextures" },
  { id: 2123666, src: "https://images.pexels.com/photos/2123666/pexels-photo-2123666.jpeg", alt: "Expressive abstract painting in vibrant blues and greens with textured acrylic strokes.", by: "Steve A Johnson" },
  { id: 32541183, src: "https://images.pexels.com/photos/32541183/pexels-photo-32541183.jpeg", alt: "Elegant minimalist abstract bust sculptures displayed on a wooden shelf, perfect for modern decor.", by: "BOB oj" },
  { id: 29904622, src: "https://images.pexels.com/photos/29904622/pexels-photo-29904622.jpeg", alt: "Elegant ceramic vase with minimalist design highlighted by warm sunlight against a brown background.", by: "Tiarra Sorte" },
  { id: 29913707, src: "https://images.pexels.com/photos/29913707/pexels-photo-29913707.jpeg", alt: "Elegant white marble sculpture of a man's bust displayed on a museum wall in Istanbul.", by: "Ersan Yılmaz" },
  { id: 18535941, src: "https://images.pexels.com/photos/18535941/pexels-photo-18535941.jpeg", alt: "Dramatic low light portrait of a man with high contrast shadows.", by: "Yiğit  KARAALİOĞLU" },
  { id: 38511544, src: "https://images.pexels.com/photos/38511544/pexels-photo-38511544.jpeg", alt: "A striking studio portrait of a tattooed woman with piercings, exuding confidence.", by: "image149 studio" },
  { id: 37213367, src: "https://images.pexels.com/photos/37213367/pexels-photo-37213367.jpeg", alt: "Close-up of a vibrant red dahlia with a striking yellow center, showcasing floral beauty.", by: "Audrey Bory" },
  { id: 20954403, src: "https://images.pexels.com/photos/20954403/pexels-photo-20954403.jpeg", alt: "A detailed close-up of a purple and white flower in full bloom, showcasing its delicate petals.", by: "Petr Ganaj" },
  { id: 189379, src: "https://images.pexels.com/photos/189379/pexels-photo-189379.jpeg", alt: "A detailed macro photography of a vibrant pink coneflower bloom, showcasing nature's beauty.", by: "Jessica Lewis 🦋 thepaintedsquare" },
  { id: 16951262, src: "https://images.pexels.com/photos/16951262/pexels-photo-16951262.jpeg", alt: "Elegant minimalist bedroom featuring a cozy bed and wooden floor.", by: "Moises Arias" },
  { id: 36573009, src: "https://images.pexels.com/photos/36573009/pexels-photo-36573009.jpeg", alt: "Sleek espresso machine in a luxurious kitchen setting in Meishan, Sichuan, China.", by: "Gatsby Yang" },
  { id: 37201014, src: "https://images.pexels.com/photos/37201014/pexels-photo-37201014.jpeg", alt: "Abstract view of modern building architecture with geometric symmetry and minimalist design elements.", by: "Leo Willians" },
  { id: 34968620, src: "https://images.pexels.com/photos/34968620/pexels-photo-34968620.jpeg", alt: "Abstract minimalist facade with circles and lines creating a modern geometric pattern.", by: "Simeon Galabov" },
  { id: 20487289, src: "https://images.pexels.com/photos/20487289/pexels-photo-20487289.jpeg", alt: "Vintage computer setup with CRT monitor, keyboard, and flower pot on a dark background.", by: "Paul Seling" },
  { id: 14134163, src: "https://images.pexels.com/photos/14134163/pexels-photo-14134163.jpeg", alt: "Monochrome display of diverse wooden shapes captured in grayscale for artistic texture exploration.", by: "Malcolm Garret" },
  { id: 29619503, src: "https://images.pexels.com/photos/29619503/pexels-photo-29619503.jpeg", alt: "A walnut suspended in the air over a pile of walnut shells against a dark background.", by: "Vural Yavas" },
  { id: 15028227, src: "https://images.pexels.com/photos/15028227/pexels-photo-15028227.jpeg", alt: "Close-up of a uniquely shaped ceramic vase on a dark backdrop, showcasing its elegant design.", by: "Vural Yavas" },
  { id: 39199677, src: "https://images.pexels.com/photos/39199677/pexels-photo-39199677.jpeg", alt: "Decorative white ceramic pitcher with ornate details on a dark contrasting background.", by: "William Finn" },
  { id: 34687010, src: "https://images.pexels.com/photos/34687010/pexels-photo-34687010.jpeg", alt: "Symmetrical arrangement of black forks reflected on a glassy surface with a textured backdrop.", by: "Valentin Ivantsov" },
  { id: 18069860, src: "https://images.pexels.com/photos/18069860/pexels-photo-18069860.png", alt: "Digital artwork showcasing an abstract representation of AI with vibrant colors and flowing forms.", by: "Google DeepMind" },
  { id: 8168562, src: "https://images.pexels.com/photos/8168562/pexels-photo-8168562.png", alt: "Dynamic abstract pattern featuring undulating geometric shapes with a dark textured background.", by: "Giuseppe DiDio" },
  { id: 20493158, src: "https://images.pexels.com/photos/20493158/pexels-photo-20493158.jpeg", alt: "Abstract art featuring blue and purple smears creating a dynamic vertical pattern.", by: "Robert Clark" },
  { id: 33763662, src: "https://images.pexels.com/photos/33763662/pexels-photo-33763662.png", alt: "Artistic bouquet of wheat, purple, and yellow flowers against a dark background.", by: "Neil Yonamine" },
  { id: 10481464, src: "https://images.pexels.com/photos/10481464/pexels-photo-10481464.jpeg", alt: "Minimalist blue and white geometric abstract artwork with shadow play.", by: "Vlado Paunovic" },
  { id: 18069231, src: "https://images.pexels.com/photos/18069231/pexels-photo-18069231.png", alt: "A colorful abstract 3D render depicting AI concepts with dynamic shapes and vibrant colors.", by: "Google DeepMind" },
  { id: 28767808, src: "https://images.pexels.com/photos/28767808/pexels-photo-28767808.jpeg", alt: "Modern geometric sculptures rising from a grassy field against a vibrant blue sky.", by: "Q. Hưng Phạm" },
  { id: 14063089, src: "https://images.pexels.com/photos/14063089/pexels-photo-14063089.jpeg", alt: "Close-up view of a stylish yellow keyboard with gray keys on a textured surface.", by: "Dave Chia" },
  { id: 19203689, src: "https://images.pexels.com/photos/19203689/pexels-photo-19203689.jpeg", alt: "Detailed close-up of a dramatic tropical leaf, highlighting textures and patterns.", by: "Diana ✨" },
  { id: 16265718, src: "https://images.pexels.com/photos/16265718/pexels-photo-16265718.jpeg", alt: "Vibrant green leaves against a dark background, captured in a close-up vertical shot.", by: "Doğu Tuncer" },
  { id: 19210852, src: "https://images.pexels.com/photos/19210852/pexels-photo-19210852.jpeg", alt: "Close-up of dark green tropical leaves with a moody tone, showcasing nature's intricate details.", by: "Fredrik Solli Wandem" },
  { id: 30375548, src: "https://images.pexels.com/photos/30375548/pexels-photo-30375548.jpeg", alt: "Moody close-up of a palm leaf with dramatic lighting against a dark background, highlighting its texture.", by: "Fernando Capetillo" },
  { id: 7946638, src: "https://images.pexels.com/photos/7946638/pexels-photo-7946638.jpeg", alt: "A minimalist photograph showcasing the elegance of black fabric folded in soft layers against a white background.", by: "Hanna Pad" },
  { id: 4938321, src: "https://images.pexels.com/photos/4938321/pexels-photo-4938321.jpeg", alt: "Close-up view of luxurious pleated fabric with intricate patterns.", by: "https://kaboompics.com/" },
  { id: 8465947, src: "https://images.pexels.com/photos/8465947/pexels-photo-8465947.jpeg", alt: "Close-up of elegant white fabric with smooth folds and texture details.", by: "Davis  Vidal" },
  { id: 29217565, src: "https://images.pexels.com/photos/29217565/pexels-photo-29217565.jpeg", alt: "Close-up of vibrant green fabric folds creating an abstract artistic pattern.", by: "Olga Kovalski" },
  { id: 37120055, src: "https://images.pexels.com/photos/37120055/pexels-photo-37120055.jpeg", alt: "Two clear glasses casting artistic shadows on a surface, illuminated by light.", by: "Ramesh Kambattan" },
  { id: 14723650, src: "https://images.pexels.com/photos/14723650/pexels-photo-14723650.jpeg", alt: "Elegant arrangement of various glasses filled with water, showcasing minimalist aesthetics.", by: "Daria Voronkov" },
  { id: 8145716, src: "https://images.pexels.com/photos/8145716/pexels-photo-8145716.jpeg", alt: "A stylish arrangement of amber and clear glassware, casting shadows on a white surface.", by: "cottonbro studio" },
  { id: 8145720, src: "https://images.pexels.com/photos/8145720/pexels-photo-8145720.jpeg", alt: "Sophisticated arrangement of glassware casting artistic shadows on a white surface.", by: "cottonbro studio" },
  { id: 28988956, src: "https://images.pexels.com/photos/28988956/pexels-photo-28988956.jpeg", alt: "Minimalist setup featuring natural skincare products with pebbles, ideal for eco-friendly themes.", by: "Nastia Ligrain" },
  { id: 940299, src: "https://images.pexels.com/photos/940299/pexels-photo-940299.jpeg", alt: "A minimalist photo featuring a balancing glass and bottle with a white background, showcasing creativity.", by: "Toa Heftiba Şinca" },
  { id: 8128067, src: "https://images.pexels.com/photos/8128067/pexels-photo-8128067.jpeg", alt: "Elegant flat lay of cosmetic products with crystals, perfect for beauty and skincare themes.", by: "Ron Lach" },
  { id: 34159010, src: "https://images.pexels.com/photos/34159010/pexels-photo-34159010.jpeg", alt: "A minimalist image of three skincare product bottles on a white surface, emphasizing cleanliness and simplicity.", by: "Anhelina Vasylyk" },
  { id: 5226087, src: "https://images.pexels.com/photos/5226087/pexels-photo-5226087.jpeg", alt: "A mesmerizing full moon surrounded by a vast, dark night sky, perfect for mobile wallpaper.", by: "Ahmet Polat" },
  { id: 17860193, src: "https://images.pexels.com/photos/17860193/pexels-photo-17860193.jpeg", alt: "A captivating view of the gibbous moon shining through dark clouds in the night sky over Rio de Janeiro.", by: "Daniel Olivier" },
  { id: 10902142, src: "https://images.pexels.com/photos/10902142/pexels-photo-10902142.jpeg", alt: "A stark image of a crescent moon set against a black night sky.", by: "Roger Verkade" },
  { id: 375114, src: "https://images.pexels.com/photos/375114/pexels-photo-375114.jpeg", alt: "Captivating image of the moon shining brightly in a clear deep blue night sky.", by: "George Becker" },
  { id: 16971320, src: "https://images.pexels.com/photos/16971320/pexels-photo-16971320.jpeg", alt: "Artistic concept of neon sign reading 'DREAM' in a blurred setting with dark ambiance.", by: "El gringo photo" },
  { id: 30903758, src: "https://images.pexels.com/photos/30903758/pexels-photo-30903758.jpeg", alt: "Colorful abstract geometric patterns in bright neon lights creating a dynamic visual effect.", by: "Landiva  Weber" },
  { id: 4204934, src: "https://images.pexels.com/photos/4204934/pexels-photo-4204934.jpeg", alt: "Abstract neon lights form vivid patterns in a Singapore night scene, emphasizing urban vibrancy.", by: "Stacey Koenitz" },
  { id: 13800328, src: "https://images.pexels.com/photos/13800328/pexels-photo-13800328.jpeg", alt: "Abstract long exposure of orange and blue light streaks on a dark background.", by: "Mahdi Bafande" },
  { id: 30608991, src: "https://images.pexels.com/photos/30608991/pexels-photo-30608991.jpeg", alt: "Colorful abstract light art with vibrant hues of green and red, creating a dynamic visual.", by: "Landiva  Weber" },
  { id: 16470392, src: "https://images.pexels.com/photos/16470392/pexels-photo-16470392.jpeg", alt: "Bold and colorful acrylic painting with dynamic textures and vivid colors.", by: "Steve A Johnson" },
  { id: 1774301, src: "https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg", alt: "Vibrant abstract painting featuring textured white and red acrylic brushstrokes.", by: "Steve A Johnson" },
  { id: 30455944, src: "https://images.pexels.com/photos/30455944/pexels-photo-30455944.jpeg", alt: "Dynamic abstract art featuring expressive red brushstrokes, perfect for modern decor.", by: "Landiva  Weber" },
  { id: 9319226, src: "https://images.pexels.com/photos/9319226/pexels-photo-9319226.jpeg", alt: "Intricately carved marble statue under a decorative dome in Vatican Museums, Rome.", by: "Diana Biris" },
  { id: 19450161, src: "https://images.pexels.com/photos/19450161/pexels-photo-19450161.jpeg", alt: "Marble sculpture of Laocoön and his sons at Vatican Museum, depicting a dramatic scene.", by: "Sirbu 126" },
  { id: 7051461, src: "https://images.pexels.com/photos/7051461/pexels-photo-7051461.jpeg", alt: "Stunning marble sculpture of Laocoön and His Sons in a museum setting.", by: "Gu Bra" },
  { id: 35551877, src: "https://images.pexels.com/photos/35551877/pexels-photo-35551877.jpeg", alt: "Intricate classical columns displayed in a museum's grand interior.", by: "Poetarojo ." },
  { id: 34921744, src: "https://images.pexels.com/photos/34921744/pexels-photo-34921744.jpeg", alt: "A stylish woman in a black dress strikes a confident pose against a dark background.", by: "DAVID  BARAHONA" },
  { id: 31589335, src: "https://images.pexels.com/photos/31589335/pexels-photo-31589335.jpeg", alt: "Studio portrait of a young male model in a striped sweater, Hamburg.", by: "Tim Diercks" },
  { id: 7945547, src: "https://images.pexels.com/photos/7945547/pexels-photo-7945547.jpeg", alt: "Young woman with dark hair in bun in white oversize blouse and trousers resting on floor near gray background looking at camera", by: "Карина  Каржавина" },
  { id: 33847264, src: "https://images.pexels.com/photos/33847264/pexels-photo-33847264.jpeg", alt: "Confident woman in a black leather jacket sitting on a stool against a neutral backdrop.", by: "Sandi Yudha" },
  { id: 11556402, src: "https://images.pexels.com/photos/11556402/pexels-photo-11556402.jpeg", alt: "Two vintage posters leaning against a corrugated wall with distinct shadows.", by: "Kseniya Kopna" },
  { id: 3747264, src: "https://images.pexels.com/photos/3747264/pexels-photo-3747264.jpeg", alt: "Discover creativity with an open book showing vintage posters, surrounded by artistic supplies and headphones.", by: "Polina Zimmerman" },
  { id: 18386912, src: "https://images.pexels.com/photos/18386912/pexels-photo-18386912.jpeg", alt: "Vintage movie posters displayed indoors, showcasing retro film art and decor.", by: "Necip Duman" },
  { id: 35877406, src: "https://images.pexels.com/photos/35877406/pexels-photo-35877406.jpeg", alt: "Spiral staircase adorned with colorful vintage posters in an artistic indoor setting.", by: "Barkalı" },
]

/** The two product shots, framed on the canvas and in the product section. */
export const mockups = {
  light: { src: "mockups/canvas-light.webp", alt: "The Boundless canvas: a restaurant site laid out as desktop and mobile frames, with the layers panel open on the left and the design panel on the right." },
  dark: { src: "mockups/canvas-dark.webp", alt: "The Boundless canvas in dark mode, with an agent prompt open over a reviews section." },
  published: { src: "mockups/published.webp", alt: "The restaurant site as published: a fried-chicken photograph under huge green type.", url: "oakbird.site" },
}

export const nav = {
  links: [
    { label: "Product", href: "#live" },
    { label: "Agents", href: "#system" },
  ],
  prompt: "Ask Boundless to build…",
  login: { label: "Log in", href: "#start" },
  signup: { label: "Sign up", href: "#start" },
}

export const hero = {
  badge: "Introducing agents on the canvas",
  titleTop: "Build anything",
  titleBottom: "on an open canvas",
  lede: "Prompt, sketch and ship. Pages, apps and ideas, live.",
  cta: { label: "Start building", href: "#start" },
}

/** The white scenes, in the order they are read. */
export const scenes = {
  opening: { first: "Great work isn't prompted.", second: "It's shaped." },
  scatter: { first: "Frame by frame.", second: "Prompt by prompt." },
  problem: { first: "But most tools stop at the mockup.", second: "They were built to hand off, not to ship." },
  manifesto: ["Boundless", "is", "where", "ideas", "go live."],
  free: { first: "Where your ideas can run free.", before: "And every frame", after: "evolves." },
  place: {
    first: "Boundless is a place",
    second: "to begin. To build.",
    third: "A place where",
    fourth: "ideas come alive.",
  },
  cta: { title: "Come build with us.", label: "Get started", href: "#start" },
}

/** The live-pages walk: one step per screen of scroll. */
export const live = {
  eyebrow: "The canvas is the product",
  title: "Every frame is a live page",
  steps: [
    {
      title: "Prompt a page onto the canvas",
      body: "Describe it. An agent lays out the frames, desktop and mobile, with real content and your fonts.",
      status: "Generating 2 frames",
      version: "draft",
    },
    {
      title: "Shape it like a design file",
      body: "Drag, restyle, nudge a token. Every change is the page itself, not a picture of it.",
      status: "Editing Hero · 3 layers",
      version: "v0.9",
    },
    {
      title: "Publish it straight from the frame",
      body: "One click and the frame you are looking at is a site on your domain. No handoff, no rebuild.",
      status: "Your page is live",
      version: "v1.0",
    },
  ],
}

/** People and agents on one canvas. */
export const together = {
  before: "Not just cursors on a canvas",
  after: "People and agents, side by side",
  cursors: [
    { name: "Maya", agent: false },
    { name: "Layout agent", agent: true },
    { name: "Theo", agent: false },
    { name: "Copy agent", agent: true },
    { name: "Ines", agent: false },
    { name: "Sam", agent: false },
    { name: "Review agent", agent: true },
    { name: "Jun", agent: false },
  ],
}

/** The agent that works from your design system. */
export const system = {
  title: "AI that knows your design system",
  prompt: "Create a primary button",
  result: "Get started",
  tokens: [
    { name: "primary", kind: "colour" },
    { name: "on-primary", kind: "colour" },
    { name: "radius-pill", kind: "radius" },
    { name: "Inter / Medium", kind: "type" },
  ],
}

export const footer = {
  groups: [
    {
      title: "Connect",
      links: [
        { label: "X", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "Discord", href: "#" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Photos: Pexels", href: "https://www.pexels.com" },
      ],
    },
  ],
}
