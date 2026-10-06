import { useEffect, useId, useRef, useState } from "react";
import { useCanvasAction } from "@canvas/react";
import { asset } from "@/lib/media";
import { Link } from "@/lib/router";

/**
 * The site header: a home tile + "Menu" pill on the left, the main links on
 * the right, and a dark three-column mega menu under them.
 *
 * "Menu" toggles the panel; Escape, a click outside it, or following a link
 * closes it. Every value is an `--lp-nav-*` token in src/styles/landing.css.
 */

type NavItem = { label: string; href: string; description: string };
type Chip = { label: string; href: string; icon: string };
type ChipGroup = { title: string; seeAll: string; items: Chip[] };

const PRODUCT: NavItem[] = [
  { label: "All features", href: "/features", description: "Editing real code, tokens, imports, agents and comments." },
  { label: "Design system", href: "/brand", description: "Every token, type step, shadow and motion curve, live." },
  { label: "Components", href: "/shadcn", description: "The shadcn/ui set, rendered through the same tokens." },
];

const GUIDES: NavItem[] = [
  { label: "Open a project", href: "/features", description: "Point the canvas at a folder and start editing." },
  { label: "Import anything", href: "/features", description: "PDFs, CSVs, docs, HTML and live sites on the board." },
  { label: "Work with the agent", href: "/features", description: "Ask for directions, breakpoints and interactions." },
  { label: "Tokens, not values", href: "/brand", description: "How edits stay on your CSS variables." },
  { label: "Comments", href: "/features", description: "Pin the reason for a change to the layer it touched." },
  { label: "Every state", href: "/brand", description: "Design hover, focus, open and pressed states." },
];

const ICONS = "landing/integrations";

const GROUPS: ChipGroup[] = [
  {
    title: "Works with",
    seeAll: "/features",
    items: [
      { label: "Next.js", href: "/features", icon: "nextjs" },
      { label: "Astro", href: "/features", icon: "astro" },
      { label: "Vue.js", href: "/features", icon: "vue" },
      { label: "Shopify", href: "/features", icon: "shopify" },
      { label: "Webflow", href: "/features", icon: "webflow" },
    ],
  },
  {
    title: "Bring a project from",
    seeAll: "/features",
    items: [
      { label: "Lovable", href: "/features", icon: "lovable" },
      { label: "Vercel v0", href: "/features", icon: "v0" },
    ],
  },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  useCanvasAction("Menu", (next) => setOpen(next ?? !open), { on: open, group: "Site nav" });

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
            <img src={asset("landing/codecaine-pup.png")} alt="" width={18} height={18} />
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
          <Link className="lp-nav-item lp-nav-item-first lp-nav-optional" href="/features">
            Features
          </Link>
          <Link className="lp-nav-item lp-nav-optional" href="/brand">
            Design system
          </Link>
          <Link className="lp-nav-item lp-nav-optional" href="/shadcn">
            Components
          </Link>
          <Link className="lp-nav-cta" href="/features">
            Start designing
          </Link>
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
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp-nav-col lp-nav-col-wide">
              <p className="lp-nav-heading">Guides</p>
              <ul className="lp-nav-links lp-nav-links-grid">
                {GUIDES.map((link) => (
                  <li key={link.label}>
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
                    <Link className="lp-nav-see-all" href={group.seeAll}>
                      See all
                    </Link>
                  </div>
                  <ul className="lp-nav-chips">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <Link className="lp-nav-chip" href={item.href}>
                          <img src={asset(`${ICONS}/${item.icon}.svg`)} alt="" width={16} height={16} loading="lazy" />
                          {item.label}
                        </Link>
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
    <Link className="lp-nav-link" href={link.href}>
      <span className="lp-nav-link-title">{link.label}</span>
      <span className="lp-nav-link-desc">{link.description}</span>
    </Link>
  );
}
