
import { Link } from "@/lib/router";
import { useEffect, useId, useRef, useState } from "react";

/**
 * The site header: a home tile + "Menu" pill on the left, the account links
 * on the right, and a dark four-column mega menu under them.
 *
 * Copied one to one from kobbe.io's header — structure, copy, spacing and
 * behaviour. "Menu" toggles the panel; Escape, a click outside it, or
 * following a link closes it. Every value is an `--lp-nav-*` token in
 * src/styles/landing.css.
 */

type NavItem = { label: string; href: string; description: string; external?: boolean };
type Chip = { label: string; href: string; icon: string };
type ChipGroup = { title: string; seeAll: string; items: Chip[] };

const PRODUCT: NavItem[] = [
  { label: "All features", href: "/features", description: "Overview, funnels, revenue, privacy, and more." },
  {
    label: "Read the docs",
    href: "/docs",
    description: "Guides for setup, tracking, and dashboards, plus every installation and revenue guide.",
    external: true,
  },
  { label: "Changelog", href: "/changelog", description: "New features and fixes as they ship.", external: true },
  {
    label: "Raycast extension",
    href: "/docs/raycast",
    description: "Live visitors in your menu bar, dashboards one keystroke away.",
  },
];

const DOCS: NavItem[] = [
  { label: "Add the tracker", href: "/docs/add-the-tracker", description: "Copy the snippet and verify pageviews." },
  { label: "Funnels", href: "/docs/funnels", description: "See where visitors drop off step by step." },
  { label: "Conversions", href: "/docs/conversions", description: "Track goals without wiring every click." },
  { label: "Realtime visitors", href: "/docs/realtime-visitors", description: "Watch live traffic and recent events." },
  { label: "Custom events", href: "/docs/custom-events", description: "Track clicks, signups, downloads, and purchases." },
  { label: "UTM campaigns", href: "/docs/utm-campaigns", description: "Traffic and conversions per marketing campaign." },
  { label: "Bot filtering", href: "/docs/bot-filtering", description: "How bots, scrapers, and headless browsers get dropped." },
  { label: "Search Console", href: "/docs/search-console", description: "Google search queries and clicks beside your traffic." },
  { label: "Web Vitals", href: "/docs/performance-web-vitals", description: "Real-user performance by page, device, and country." },
  { label: "Traffic alerts", href: "/docs/traffic-alerts", description: "Email alerts when traffic spikes or drops." },
];

const ICONS = `${import.meta.env.BASE_URL}landing/integrations`;

const GROUPS: ChipGroup[] = [
  {
    title: "Installation guides",
    seeAll: "/docs/installation-guides",
    items: [
      { label: "Astro", href: "/docs/install-astro", icon: "astro" },
      { label: "Framer", href: "/docs/install-framer", icon: "framer" },
      { label: "Lovable", href: "/docs/install-lovable", icon: "lovable" },
      { label: "Next.js", href: "/docs/install-nextjs", icon: "nextjs" },
      { label: "Shopify", href: "/docs/install-shopify", icon: "shopify" },
      { label: "Vercel v0", href: "/docs/install-vercel-v0", icon: "v0" },
      { label: "Vue.js", href: "/docs/install-vue", icon: "vue" },
      { label: "Webflow", href: "/docs/install-webflow", icon: "webflow" },
    ],
  },
  {
    title: "Revenue attribution",
    seeAll: "/docs/revenue-attribution",
    items: [
      { label: "Creem", href: "/docs/revenue-attribution-creem", icon: "creem" },
      { label: "Mollie", href: "/docs/revenue-attribution-mollie", icon: "mollie" },
      { label: "Paddle", href: "/docs/revenue-attribution-paddle", icon: "paddle" },
      { label: "Polar", href: "/docs/revenue-attribution-polar", icon: "polar" },
      { label: "RevenueCat", href: "/docs/revenue-attribution-revenuecat", icon: "revenuecat" },
      { label: "Shopify", href: "/docs/revenue-attribution-shopify", icon: "shopify" },
      { label: "Stripe", href: "/docs/revenue-attribution-stripe", icon: "stripe" },
      { label: "Whop", href: "/docs/revenue-attribution-whop", icon: "whop" },
    ],
  },
  {
    title: "Import your data",
    seeAll: "/docs/import-analytics-data",
    items: [
      { label: "DataFast", href: "/docs/import-from-datafast", icon: "datafast" },
      { label: "Fathom", href: "/docs/import-from-fathom", icon: "fathom" },
      { label: "Plausible", href: "/docs/import-from-plausible", icon: "plausible" },
      { label: "Umami", href: "/docs/import-from-umami", icon: "umami" },
    ],
  },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // A link inside the panel was followed: put the panel away.
  const close = () => setOpen(false);

  return (
    <header className="lp-nav">
      <div ref={barRef} className="lp-nav-bar">
        <div className="lp-nav-group">
          <Link className="lp-nav-home" href="/" aria-label="Codecaine home">
            <img src={`${import.meta.env.BASE_URL}landing/codecaine-pup.png`} alt="" width={18} height={18} />
          </Link>
          <button
            ref={triggerRef}
            type="button"
            className="lp-nav-item lp-nav-item-lead"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        <div className="lp-nav-group">
          <a className="lp-nav-item lp-nav-item-first lp-nav-optional" href="/pricing">
            Pricing
          </a>
          <a className="lp-nav-item lp-nav-optional" href="/demo">
            Live demo
          </a>
          <a className="lp-nav-item lp-nav-optional" href="/signin">
            Sign in
          </a>
          <a className="lp-nav-cta" href="/signup">
            Try free for 15 days
          </a>
        </div>

        <nav
          id={panelId}
          className="lp-nav-panel"
          aria-label="Primary"
          hidden={!open}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) close();
          }}
        >
          <div className="lp-nav-cols">
            <div className="lp-nav-col">
              <p className="lp-nav-heading">Product</p>
              <ul className="lp-nav-links">
                {PRODUCT.map((link) => (
                  <li key={link.href}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp-nav-col lp-nav-col-wide">
              <p className="lp-nav-heading">Docs</p>
              <ul className="lp-nav-links lp-nav-links-grid">
                {DOCS.map((link) => (
                  <li key={link.href}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp-nav-col lp-nav-col-stack">
              {GROUPS.map((group) => (
                <div key={group.title}>
                  <div className="lp-nav-group-head">
                    <p className="lp-nav-heading">{group.title}</p>
                    <a className="lp-nav-see-all" href={group.seeAll}>
                      See all
                    </a>
                  </div>
                  <ul className="lp-nav-chips">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <a className="lp-nav-chip" href={item.href}>
                          <img src={`${ICONS}/${item.icon}.svg`} alt="" width={16} height={16} loading="lazy" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ link }: { link: NavItem }) {
  return (
    <a className="lp-nav-link" href={link.href}>
      <span className="lp-nav-link-title">
        {link.label}
        {link.external && <ArrowUpRight />}
      </span>
      <span className="lp-nav-link-desc">{link.description}</span>
    </a>
  );
}

function ArrowUpRight() {
  return (
    <svg className="lp-nav-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
