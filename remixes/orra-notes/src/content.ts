/**
 * Every word on the home page, in the order a visitor meets it.
 *
 * The story: Orra is an AI note-taker that sits in on your meetings, calls
 * and conversations — so you can take part instead of typing. The hero says
 * what it is; the team names say who uses it; the feature index lists
 * everything it does; the cards show the two ways it listens (in your call
 * apps, in the room), then the shared memory notes land in, then the
 * workspace where they turn into work. Customers prove it, privacy gets its
 * own pitch, support answers "what if I'm stuck", and the CTA asks for the
 * first meeting.
 */
import {
  AudioLines,
  CheckSquare,
  Languages,
  LayoutTemplate,
  MessageSquareText,
  Search,
  Share2,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react"

import { PHOTOS } from "@/photos"

export const NAV = [
  { label: "Product", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Customers", href: "#customers" },
  { label: "Resources", href: "/brand" },
  { label: "Pricing", href: "#pricing" },
]

export type HeroScene = {
  id: string
  tab: string
  line: string
  /** The note the device frame shows for this scene. */
  title: string
  time: string
  transcript: { speaker: number; text: string }[]
  chips: { icon: "record" | "check" | "list" | "sparkle"; text: string }[]
}

export const HERO = {
  banner: "New: ask questions across every meeting you’ve had",
  eyebrow: "Taking notes in 2 million meetings a week",
  bullets: [
    "Joins Zoom, Meet and Teams — or records in the room",
    "A summary the moment the meeting ends",
    "Action items with owners and due dates",
    "Search a year of conversations in a second",
  ],
  lead: "AI notes for", // the first line; the second rotates with the scene
  body: "Orra listens to your meetings, calls and conversations, then hands you the summary, the decisions and who owes what — so you can take part instead of taking notes.",
  primary: "Try it free",
  secondary: "Book a demo",
  scenes: [
    {
      id: "meetings",
      tab: "Meetings",
      line: "every meeting",
      title: "Weekly product review",
      time: "32:14",
      transcript: [
        { speaker: 0, text: "Onboarding v2 tested well — I think we ship on the fourteenth." },
        { speaker: 1, text: "Agreed. I’ll send the deck to sales today." },
        { speaker: 2, text: "Then I’ll take the pricing page copy." },
      ],
      chips: [
        { icon: "record", text: "Recording — 32:14" },
        { icon: "sparkle", text: "Summary ready the moment you stop" },
        { icon: "list", text: "4 action items assigned" },
      ],
    },
    {
      id: "calls",
      tab: "Calls",
      line: "every call",
      title: "Halden check-in",
      time: "18:02",
      transcript: [
        { speaker: 3, text: "Per-seat pricing is fine, but we need annual billing." },
        { speaker: 0, text: "Understood — I’ll confirm terms before your March renewal." },
      ],
      chips: [
        { icon: "check", text: "Joined Zoom, Meet and Teams — no bot" },
        { icon: "sparkle", text: "Follow-up email drafted" },
      ],
    },
    {
      id: "interviews",
      tab: "Interviews",
      line: "every interview",
      title: "Interview — senior designer",
      time: "41:37",
      transcript: [
        { speaker: 1, text: "Walk me through a project you’d redo." },
        { speaker: 4, text: "Our checkout. We shipped the flow before we’d tested it on phones." },
      ],
      chips: [{ icon: "check", text: "Transcript in 31 languages, speakers labelled" }],
    },
    {
      id: "ideas",
      tab: "Ideas",
      line: "every idea",
      title: "Spring launch workshop",
      time: "56:20",
      transcript: [
        { speaker: 2, text: "What if the launch is a week of tiny releases?" },
        { speaker: 5, text: "One feature a day, each with its own recap." },
      ],
      chips: [
        { icon: "sparkle", text: "Workshop turned into a brief" },
        { icon: "list", text: "12 ideas sorted into 3 themes" },
      ],
    },
  ] satisfies HeroScene[],
}

export const TEAMS: { name: string; style: "serif" | "spaced" | "heavy" | "mono" | "script" | "round" }[] = [
  { name: "Halden", style: "spaced" },
  { name: "Terra Vessel", style: "serif" },
  { name: "oak+ash", style: "round" },
  { name: "LONG TABLE", style: "heavy" },
  { name: "quillwork", style: "script" },
  { name: "FIELDBLOOM", style: "spaced" },
  { name: "Northwind", style: "heavy" },
  { name: "pellow", style: "round" },
  { name: "Atelier Vos", style: "serif" },
  { name: "SUNDAY/LABS", style: "mono" },
]

export const FEATURES: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Meeting notes", icon: MessageSquareText, href: "#capture" },
  { label: "Live transcription", icon: AudioLines, href: "#capture" },
  { label: "AI summaries", icon: Sparkles, href: "#workspace" },
  { label: "Action items", icon: CheckSquare, href: "#workspace" },
  { label: "Search everything", icon: Search, href: "#memory" },
  { label: "Speaker labels", icon: Users, href: "#capture" },
  { label: "31 languages", icon: Languages, href: "#capture" },
  { label: "Note templates", icon: LayoutTemplate, href: "#workspace" },
  { label: "Share and export", icon: Share2, href: "#rail" },
  { label: "Integrations", icon: Workflow, href: "#capture" },
]

export const CAPTURE = {
  calls: {
    eyebrow: "On your calls",
    title: "Works in every call app — and sends notes where you work",
    link: "See integrations",
  },
  room: {
    eyebrow: "In the room",
    title: "Record on your phone, laptop or desk — no bot, no setup",
    link: "See the apps",
  },
}

export const MEMORY = {
  eyebrow: "Shared memory",
  title: "One searchable memory for everything your team discussed",
  points: [
    "Every meeting filed to the right project on its own",
    "Search a year of conversations in under a second",
    "Share the summary without sharing the recording",
  ],
  link: "See how memory works",
}

export const WORKSPACE = {
  eyebrow: "The Orra workspace",
  title: "Stop taking notes, start taking part",
  body: "Summaries, decisions and follow-ups appear as you talk — and Orra turns them into tickets, emails and CRM updates when you’re done.",
  tabs: [
    {
      id: "summary",
      label: "Summaries",
      body: "A clear recap of every meeting — the context, what was decided and what’s still open — in the template your team already uses.",
    },
    {
      id: "actions",
      label: "Action items",
      body: "Orra hears “I’ll send that over” and turns it into a task with an owner and a date, then reminds them before it slips.",
    },
    {
      id: "assistant",
      label: "Ask Orra",
      badge: "Beta",
      body: "Ask anything about past conversations in plain words — “what did the client say about pricing?” — and get the answer with the moment it was said.",
    },
  ],
}

export const CUSTOMERS = {
  eyebrow: "Customers",
  title: "Made for teams that talk all day. Free for everyone.",
  stories: [
    {
      brand: "Halden University",
      style: "spaced" as const,
      photo: PHOTOS.lecture,
      alt: "A lecturer teaches a full university class",
      quote: "Students stopped scribbling and started asking questions. The lecture notes are better than mine ever were.",
      person: "Dr. Jonas Halden, senior lecturer",
    },
    {
      brand: "Terra Clinic",
      style: "serif" as const,
      photo: PHOTOS.clinic,
      alt: "A doctor talks with a patient in a bright consulting room",
      quote: "I look at my patients now, not my keyboard. The visit summary is waiting by the time they’ve left the room.",
      person: "Mireille Faure, GP at Terra Clinic",
    },
    {
      brand: "Long Table",
      style: "heavy" as const,
      photo: PHOTOS.cafe,
      alt: "Two consultants talk over coffee in a café",
      quote: "Every client conversation lands in the CRM with the next step attached. Our follow-up rate went from patchy to perfect.",
      person: "Tomás Rivera, partner at Long Table Advisory",
    },
    {
      brand: "quillwork",
      style: "script" as const,
      photo: PHOTOS.studio,
      alt: "A podcast microphone on a boom arm in a quiet studio",
      quote: "We search two hundred episodes for a single quote in seconds. Show notes write themselves.",
      person: "Ana Petrov, producer at quillwork",
    },
    {
      brand: "FIELDBLOOM",
      style: "spaced" as const,
      photo: PHOTOS.whiteboard,
      alt: "Two people plan a project at a whiteboard",
      quote: "Product reviews used to end with ‘who’s writing this up?’ Now nobody has to, and nothing gets lost.",
      person: "Lea Hoffmann, head of product at Fieldbloom",
    },
  ],
}

export const SECURITY = {
  title: "Private by default. Never used to train anyone’s model.",
  body: "Recordings are encrypted from the moment they start, stored in the region you choose and deleted on the schedule you set. Your conversations are yours — not training data, not ours to read.",
  link: "Read our security overview",
  mcp: {
    title: "Bring your notes to your agents through MCP",
    body: "Let Claude, Cursor or your own agents search and cite your meetings — only within the workspaces and scopes you grant.",
  },
}

export const SUPPORT = {
  title: "Real people, whenever you need them",
  body: "Stuck before a big meeting? Our team answers fast, in your language, and helps you set Orra up the way your team works.",
  stats: [
    { kind: "rating" as const, value: 4.8, note: "4.8 on review sites from 12,000 teams" },
    { kind: "text" as const, title: "Around the clock", note: "Chat any hour, in nine languages" },
    { kind: "text" as const, title: "Onboarding included", note: "A specialist sets up teams of 20+" },
  ],
}

export const CTA = {
  title: "Let Orra take notes in your next meeting — free",
  primary: "Try it free",
  secondary: "Book a demo",
  aside: {
    title: "Free for 20 meetings a month",
    body: "No credit card, no meeting bot, cancel any time.",
    link: "See pricing",
  },
}

export const RAIL = [
  { id: "mobile", label: "Orra for iPhone and Android", kind: "library" as const },
  { id: "anywhere", label: "Record anywhere", kind: "walk" as const },
  { id: "recap", label: "Meeting recaps", kind: "recap" as const, wide: true },
  { id: "share", label: "Share links", kind: "share" as const },
]

export const FOOTER = [
  {
    groups: [
      {
        title: "Product",
        links: [
          "Meeting notes",
          "Live transcription",
          "AI summaries",
          "Action items",
          "Ask Orra",
          "Templates",
          "Mobile apps",
          "Desktop app",
          "Integrations",
          "What’s new",
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Teams",
        links: ["Sales", "Product and engineering", "Recruiting", "Customer success"],
      },
    ],
  },
  {
    groups: [
      { title: "Industries", links: ["Education", "Healthcare", "Consulting", "Media"] },
      { title: "Programmes", links: ["Partners", "Students", "Startups"] },
    ],
  },
  {
    groups: [
      { title: "Developers", links: ["Changelog", "API reference", "MCP server", "Webhooks", "Status"] },
      { title: "Resources", links: ["Guides", "Brand guidelines", "Customer stories", "Templates", "Webinars"] },
    ],
  },
  {
    groups: [
      { title: "Support", links: ["Help centre", "Contact support", "Book a demo", "Trust centre"] },
      { title: "Company", links: ["About", "Pricing", "Careers", "Security", "Press"] },
    ],
  },
]

export const LEGAL = ["Terms", "Privacy", "Responsible disclosure", "DPA", "Imprint", "Cookies"]

export const LANGUAGES = ["English", "Deutsch", "Français", "Nederlands", "Español", "Italiano", "Polski", "Português", "Svenska"]
