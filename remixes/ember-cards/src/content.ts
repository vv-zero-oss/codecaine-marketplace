/**
 * Every word on the page, in the order a visitor meets it. The story: a
 * card for every purchase (hero) → what you get (perks) → why it is safe and
 * simple (highlights) → it works abroad (coverage) → people like it
 * (testimonials) → the questions left (FAQ) → get one (CTA).
 */

export const BRAND = "Ember"

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "How it works", href: "#how" },
  { label: "Security", href: "#security" },
  { label: "Stories", href: "#story" },
  { label: "Pricing", href: "#pricing" },
]

export const HERO = {
  eyebrow: "Now issuing in 40+ countries",
  title: "One card per purchase.\nZero exposure.",
  blurb: "Create unlimited virtual cards for $0/mo.\nLock one to a shop, or burn it after checkout.",
  cta: "Get a card",
}

export const PERKS = [
  { icon: "cards", title: "Unlimited cards\nin a single tap" },
  { icon: "globe", title: "Spend in 150+\ncurrencies" },
  { icon: "flame", title: "Freeze or burn\nanytime" },
] as const

export const PERKS_NOTE = "*Subject to our Fair Use policy"

export const HIGHLIGHTS = {
  title: "Every checkout,\na brand-new number.",
  blurb: "Your first card is ready in 4 seconds.\nAccepted anywhere cards are.",
  items: [
    {
      tone: "mint",
      title: "Free",
      body: "No monthly fee, no card fees,\nand no surprises at the till.",
    },
    {
      tone: "sky",
      title: "Instant",
      body: "Tap once for a fresh number. Paste it\ninto any checkout and pay.",
    },
    {
      tone: "lilac",
      title: "Private",
      body: "Shops only ever see a stand-in number.\nYour real details stay at home.",
    },
  ],
} as const

export const COVERAGE = {
  eyebrow: "Pay like a local",
  title: "Paying abroad?\nConsider it local.",
  blurb: "Spend in 150+ currencies at the real exchange rate,\nwith no foreign transaction fees.",
  countries: [
    { code: "fr", name: "France" },
    { code: "de", name: "Germany" },
    { code: "mx", name: "Mexico" },
    { code: "jp", name: "Japan" },
    { code: "br", name: "Brazil" },
    { code: null, name: "150+ More" },
    { code: "ca", name: "Canada" },
    { code: "gb", name: "UK" },
    { code: "sg", name: "Singapore" },
    { code: "ae", name: "UAE" },
  ],
} as const

export const TESTIMONIALS = {
  title: "People switched. They stayed.",
  items: [
    { quote: "“Subscriptions finally can’t\novercharge me”", author: "maya.builds" },
    { quote: "“I burn a card after every\nsingle online order”", author: "devonk_" },
    { quote: "“The only money app I\nactually enjoy opening”", author: "lena.travels" },
  ],
}

export const FAQ = {
  eyebrow: "FAQs",
  title: "Got questions?\nWe’ve got answers.",
  items: [
    {
      q: "What is Ember?",
      a: "Ember is a free app that makes virtual debit cards on demand. Each card has its own number, limit and rules, so one leaked number never exposes your bank account.",
    },
    {
      q: "Where can I spend with Ember?",
      a: "Anywhere that takes card payments online or in-app, in more than 150 currencies. Add a card to your phone’s wallet to tap and pay in shops too.",
    },
    {
      q: "Is Ember safe to use online?",
      a: "Yes. Merchants only see a stand-in number, every payment needs your approval above a limit you set, and funds are held with a regulated partner bank.",
    },
    {
      q: "Does it work with my phone’s wallet?",
      a: "Yes. Any Ember card can be added to your phone’s wallet in one tap, and removed just as fast.",
    },
    {
      q: "How much does it cost?",
      a: "Nothing. Cards, top-ups and foreign spending are free. We earn a small fee from the shop, never from you.",
    },
    {
      q: "Can I close a card anytime?",
      a: "Anytime. Freeze a card to pause it, or burn it and the number is gone for good. Your other cards keep working.",
    },
  ],
}

export const CTA = {
  title: "Get your first card\nin 60 seconds",
  steps: ["Download the app", "Verify your ID", "Start spending"],
  timed: "Timed it: 58s",
  priceTitle: "Unlimited cards,\none price.",
  price: "$0",
  priceNote: "Per month",
  button: "Get a card",
}

export const FOOTER = {
  columns: [
    { title: "Product", links: ["Home", "Cards", "Security", "Pricing"] },
    { title: "Legal", links: ["Terms", "Card agreement", "Privacy"] },
    { title: "Social", links: ["X", "Instagram"] },
  ],
  legal: "Ember is a financial technology company, not a bank. Photography and video from Pexels.",
}

export const MANIFESTO = {
  eyebrow: "Why Ember",
  text: "Your card number was never meant to live in a hundred databases. Ember gives every shop its own number, so a leak anywhere is a shrug, not a crisis.",
  accent: "own,shrug",
}

export const STEPS = {
  eyebrow: "How it works",
  title: "Four taps to\nsleeping soundly.",
  items: [
    { title: "Create", body: "Tap + and a new card exists. Name it after the shop, the trip or the subscription it is for.", tag: "Ready in 4 seconds" },
    { title: "Lock", body: "The first shop to charge it owns it. Anyone else who tries is declined, instantly.", tag: "Locked to Streamly" },
    { title: "Limit", body: "Set a cap per month or per payment. A price rise you never agreed to simply bounces.", tag: "$15 per month" },
    { title: "Burn", body: "Done with it? Burn it. The number is gone for good and nothing else you own is touched.", tag: "Burned · 0 exposure" },
  ],
} as const

export const USES = {
  eyebrow: "One app, every habit",
  title: "A card for each corner\nof your life.",
  items: [
    { key: "streaming", title: "Subscriptions", body: "Cap each one at its price.", last4: "4821", rule: "Locked · $15/mo" },
    { key: "online", title: "Online shopping", body: "A single-use number per checkout.", last4: "9034", rule: "Burns after use" },
    { key: "travel", title: "Travel", body: "A card per trip, in the local currency.", last4: "6630", rule: "EUR · 14 days" },
    { key: "groceries", title: "Groceries", body: "A weekly budget that holds itself.", last4: "1907", rule: "$120 / week" },
    { key: "coffee", title: "Tap to pay", body: "Add any card to your phone’s wallet.", last4: "3148", rule: "In wallet" },
    { key: "freelance", title: "Freelance tools", body: "Keep business spend apart, automatically.", last4: "5572", rule: "Team · 3 people" },
  ],
} as const

export const STORY = {
  eyebrow: "Customer story",
  quote: "“We gave each other a card for the trip. When we got home, we burned them both.”",
  author: "Ama & Kofi",
  place: "Using Ember since 2025 · Lisbon",
  poster: "videos/testimonial-poster.jpg",
  video: "videos/testimonial.mp4",
}
