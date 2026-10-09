/** Page copy and data. Components take their words from here or from props. */

export const NAV = [
  { label: "Product", href: "#product" },
  { label: "Resources", href: "#platform" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#cta" },
]

export const CUSTOMERS = [
  { name: "Montara", style: "font-sans font-semibold tracking-tight" },
  { name: "bounce", style: "font-sans font-bold lowercase" },
  { name: "HAIRBURST", style: "font-sans font-extrabold tracking-tighter" },
  { name: "alkry", style: "font-serif italic font-medium" },
  { name: "Voyado", style: "font-sans font-semibold" },
  { name: "JUNZ", style: "font-mono font-medium tracking-widest" },
  { name: "instabase", style: "font-sans font-medium tracking-tight" },
  { name: "Kestrel", style: "font-serif font-medium" },
]

export const BENTO = [
  { title: "Built on metrics", body: "No more dashboards. With Fathom, data teams ship governed metrics that power all your analysis and reporting.", art: "bricks", tone: "peach" },
  { title: "Powered by AI", body: "", art: "gears", tone: "grey" },
  { title: "Designed for engagement", body: "", art: "rocket", tone: "grey" },
] as const

export const ENGAGE_TABS = [
  { id: "explore", label: "Explore", body: "Ask complex questions and get deep, reliable insights. All powered by governed metrics." },
  { id: "reports", label: "Reports", body: "Turn any answer into a live report. Pin charts, add commentary and share a link." },
  { id: "drill", label: "Drill down", body: "Click any number to see what moved it. Break a metric apart by region, plan or cohort." },
  { id: "targets", label: "Targets", body: "Set goals on any metric and follow progress with alerts that explain themselves." },
  { id: "maps", label: "Maps", body: "See the same metrics on a map. Compare territories, stores and teams at a glance." },
]

export const PLATFORM_TABS = [
  { id: "semantic", label: "Semantic platform", body: "Define metrics, dimensions and entities and power all of your analysis and reporting with governed building blocks." },
  { id: "api", label: "Fathom API", body: "Query any governed metric over REST or SQL. One definition, every tool that needs it." },
  { id: "catalog", label: "Metrics catalog", body: "A searchable home for every metric: owners, lineage, freshness and who is using it." },
  { id: "code", label: "Define in code", body: "Write metrics as code, review them in pull requests and ship them with your pipeline." },
]

export const PLATFORM_FEATURES = [
  { icon: "users", title: "Fine-grained permissions", body: "Control who can access metrics and row-level data." },
  { icon: "clock", title: "Smart caching", body: "Offload your data warehouse. Instant responses for users." },
  { icon: "plug", title: "dbt + Cube integrations", body: "Seamless integrations to extend your semantic layer." },
]

export const SOURCES = ["BigQuery", "Databricks", "Snowflake", "Redshift", "Postgres"]
export const OUTPUTS = ["Chat", "Explore", "Reports", "API", "Integrations", "Agents"]

export const STORIES = [
  {
    company: "Voi",
    quote: "I have never seen BI adoption like this. Half the company asks Fathom a question before they open a ticket.",
    byline: "Why Voi switched from legacy BI to Fathom",
    name: "Marta Lindqvist",
    role: "Head of Data, Voi",
    photo: "/photos/18969806.jpg",
    video: "/video/8631874.mp4",
    poster: "/video/8631874.jpg",
  },
  {
    company: "Junz",
    quote: "Our finance team stopped waiting on analysts. Month-end questions are answered by lunchtime, with sources attached.",
    byline: "How Junz closes the books two days faster",
    name: "Dev Raman",
    role: "VP Finance, Junz",
    photo: "/photos/14816709.jpg",
    video: "/video/6248593.mp4",
    poster: "/video/6248593.jpg",
  },
  {
    company: "Kestrel",
    quote: "One definition of revenue, finally. The arguments in our Monday review turned into decisions.",
    byline: "Kestrel aligns 400 people on one metric layer",
    name: "Amara Okafor",
    role: "COO, Kestrel",
    photo: "/photos/27086922.jpg",
    video: "/video/10444089.mp4",
    poster: "/video/10444089.jpg",
  },
]

export const USE_CASES = [
  { tag: "Finance", title: "Close the books with answers, not exports", body: "Variance, cash and forecast questions resolve against the same governed revenue definition, with every source one click away.", stat: "−2 days", statLabel: "to month-end close", tone: "peach" },
  { tag: "Product", title: "See what shipped move the needle", body: "Tie a launch to activation, retention and revenue without a ticket to the data team.", stat: "+18%", statLabel: "week-4 activation", tone: "lilac" },
  { tag: "Growth", title: "Find the segment that is quietly growing", body: "Ask in plain words, drill into any number, and hand the finding to a teammate with the context attached.", stat: "3.4×", statLabel: "faster to first insight", tone: "sky" },
] as const

export const TRIO = [
  { title: "Answers you can trust", body: "Fathom is powered by your semantic model and answers reflect governed metrics.", art: "table" },
  { title: "Generate reports", body: "Turn any chat into a shareable report, ready to share, edit and build on.", art: "report" },
  { title: "Support teams where they work", body: "Agents across your stack work from the same governed layer, through Fathom's API and MCP.", art: "agents" },
] as const

export const FOOTER = [
  { title: "Explore", links: ["Overview", "Explore & analyze", "Semantic platform", "Pricing", "Download", "Databases", "Integrations"] },
  { title: "Resources", links: ["Help center", "API reference", "Blog", "Product updates", "Security", "DPA", "Terms of service"] },
  { title: "Company", links: ["About", "Customer stories", "Careers"] },
  { title: "Contact", links: ["hello@fathom.example", "Support", "Book a demo", "LinkedIn", "YouTube"] },
]
