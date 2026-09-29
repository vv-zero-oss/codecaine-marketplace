/**
 * The page's words, kept out of the components that lay them out.
 *
 * Identical to what `scaffold/src/App.tsx` holds at the top of the file. The
 * two pages render the same document; the difference between them is who
 * renders it, which is the only thing being demonstrated here.
 */

export const LOGOS = ["Northwind", "Lumen", "Aperture", "Vertex", "Kestrel", "Halcyon"]

/** The icons are path data rather than markup so this file stays free of JSX.
 *  Every one of them draws with the same stroke, so `FeatureCard` supplies it. */
export const FEATURES = [
  {
    title: "Ship on every merge",
    body: "Preview environments spin up per branch and tear themselves down when the branch does.",
    icon: "M4 12h16M12 4v16",
  },
  {
    title: "Rollbacks that mean it",
    body: "Every deploy is a checkpoint. Step back to the last good state without a rebuild.",
    icon: "M4 12a8 8 0 1 0 3-6.2M4 4v5h5",
  },
  {
    title: "Budgets, not dashboards",
    body: "Set a number for the thing you care about and hear about it only when it moves.",
    icon: "M3 17l5-5 4 4 8-8",
  },
  {
    title: "Traces by default",
    body: "Every request carries its own story. Tail sampling applied at write time, not read time.",
    icon: "M4 6h16M4 12h10M4 18h6",
  },
]

export const INTEGRATIONS = [
  "GitHub",
  "Linear",
  "Slack",
  "PagerDuty",
  "Datadog",
  "Sentry",
  "Vercel",
  "Stripe",
]

export const STATS = [
  { value: "99.99%", label: "Median uptime across all regions" },
  { value: "42ms", label: "p50 edge response, worldwide" },
  { value: "8,400", label: "Teams shipping on Quartz" },
]

export const TESTIMONIALS = [
  {
    quote:
      "We deleted three internal tools the week we moved. The one that replaced them is the one nobody has had to think about since.",
    name: "Priya Raman",
    role: "Staff Engineer, Northwind",
  },
  {
    quote:
      "The rollback story is the whole product for us. Two clicks, and the incident is a postmortem instead of an outage.",
    name: "Tomás Oliveira",
    role: "Head of Platform, Kestrel",
  },
]

export const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    blurb: "For the project that is still an idea.",
    features: ["1 project", "Preview environments", "Community support"],
    featured: false,
  },
  {
    name: "Team",
    price: "$28",
    cadence: "per seat / month",
    blurb: "For a team that ships more than once a week.",
    features: [
      "Unlimited projects",
      "Preview environments",
      "Rollbacks and checkpoints",
      "Traces with 30-day retention",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    cadence: "annual",
    blurb: "For when procurement gets involved.",
    features: ["SSO and SCIM", "Audit log export", "Dedicated region", "99.99% SLA"],
    featured: false,
  },
]

export const FAQS = [
  {
    q: "Can I bring my own cloud?",
    a: "Yes. Quartz runs in your account on Enterprise, and we keep the control plane on ours.",
  },
  {
    q: "What happens when I hit the plan limit?",
    a: "Nothing breaks. You get a note, and the overage is billed at the same per-seat rate.",
  },
  {
    q: "Do you have a migration path from our current setup?",
    a: "There is an importer for the three most common ones, and a person for everything else.",
  },
]

export const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Features", "Pricing", "Changelog"] },
  { heading: "Company", links: ["About", "Careers", "Blog"] },
  { heading: "Legal", links: ["Privacy", "Terms", "DPA"] },
]
