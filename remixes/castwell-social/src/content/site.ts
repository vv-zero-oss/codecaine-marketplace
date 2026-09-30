export type NavGroup = {
  label: string
  items: { title: string; href: string; description: string }[]
}

export const NAV: (NavGroup | { label: string; href: string })[] = [
  { label: "Platform", href: "/" },
  {
    label: "AI Team",
    items: [
      { title: "AI Marketing Manager", href: "/marketing-manager", description: "Plans the month, briefs the work, reports on Friday." },
      { title: "Copy & caption agent", href: "/marketing-manager#agents", description: "Drafts every post in your voice, per channel." },
      { title: "Community agent", href: "/marketing-manager#agents", description: "Answers comments and DMs, escalates the rest." },
    ],
  },
  {
    label: "Create",
    items: [
      { title: "AI Video Studio", href: "/video-studio", description: "Turn a brief or a link into vertical video." },
      { title: "Templates", href: "/video-studio#templates", description: "Reels, Shorts, ads and explainers, on-brand." },
      { title: "Resize & repurpose", href: "/video-studio#workflow", description: "One edit, every aspect ratio." },
    ],
  },
  {
    label: "Publish",
    items: [
      { title: "Scheduler", href: "/scheduler", description: "One calendar for every channel and every market." },
      { title: "Best-time engine", href: "/scheduler#best-time", description: "Posts land when your audience is awake." },
      { title: "Approvals", href: "/scheduler#approvals", description: "Nothing ships without the right sign-off." },
    ],
  },
  { label: "Pricing", href: "/pricing" },
]

export const FOOTER_COLUMNS = [
  {
    title: "Meet the AI team",
    links: [
      { label: "AI Marketing Manager", href: "/marketing-manager" },
      { label: "Caption agent", href: "/marketing-manager#agents" },
      { label: "Video producer agent", href: "/video-studio" },
      { label: "Community agent", href: "/marketing-manager#agents" },
      { label: "Insights agent", href: "/marketing-manager#agents" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Unified inbox", href: "/#how-it-works" },
      { label: "AI Video Studio", href: "/video-studio" },
      { label: "Scheduler", href: "/scheduler" },
      { label: "Approvals", href: "/scheduler#approvals" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Security", href: "/pricing#faq" },
      { label: "Press room", href: "/" },
    ],
  },
  {
    title: "Channels",
    links: [
      { label: "Instagram", href: "/#channels" },
      { label: "TikTok", href: "/#channels" },
      { label: "YouTube Shorts", href: "/#channels" },
      { label: "LinkedIn", href: "/#channels" },
      { label: "X and Threads", href: "/#channels" },
    ],
  },
  {
    title: "Knowledge base",
    links: [
      { label: "Blog", href: "/#insights" },
      { label: "Playbooks", href: "/#insights" },
      { label: "Case studies", href: "/#outcomes" },
      { label: "Webinars", href: "/#insights" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Talk to sales", href: "/pricing" },
      { label: "Support", href: "/pricing#faq" },
      { label: "Newsletter", href: "/#insights" },
    ],
  },
]
