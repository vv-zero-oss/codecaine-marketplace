
import { useEffect, useRef, useState, type ReactNode } from "react";
import { photo } from "@/lib/media";
import { Link } from "@/lib/router";

/* -- Data ------------------------------------------------------------------ */

type Card = {
  id: string;
  title: string;
  body: string;
  measure: "wide" | "mid" | "narrow";
  Visual: () => ReactNode;
};

const CARDS: Card[] = [
  {
    id: "ideate",
    title: "Explore directions with the agent",
    body: "Ask for three takes on a hero, then push the one you like. Each variation is a real layer in your project, built from your own components and tokens.",
    measure: "wide",
    Visual: IdeateVisual,
  },
  {
    id: "responsive",
    title: "Responsive, without the redraw",
    body: "Say “make this work on tablet and phone.” The agent restacks columns, steps type down and recrops images in your CSS, so every breakpoint ships from the same code.",
    measure: "wide",
    Visual: ResponsiveVisual,
  },
  {
    id: "reference",
    title: "From a screenshot to a working section",
    body: "Paste an image or a link and the agent lays out a section in your project to match it, using your type, colours and spacing rather than copying someone else's.",
    measure: "narrow",
    Visual: FooterVisual,
  },
  {
    id: "interactions",
    title: "Interactions, described rather than wired",
    body: "A sticky header, a mega menu, a carousel. Describe the behaviour and the agent writes the component, with its open and closed states on the board for you to style.",
    measure: "mid",
    Visual: MenuVisual,
  },
  {
    id: "canvas",
    title: "Pages, icons and posts on one board",
    body: "Whatever the agent makes stays editable by hand: select it, nudge it, change its font in the inspector. You are never stuck re-prompting for a one-pixel fix.",
    measure: "narrow",
    Visual: SocialVisual,
  },
];

/**
 * "Ideas faster, code that stays yours" — five feature cards beside a
 * sticky agent panel. As each card reaches the middle of the viewport it
 * fades in from down-left and the panel plays that card's conversation.
 * JS only sets `data-seen` / `data-active` and the stage scale; every
 * duration, curve and distance is in src/styles/landing.css.
 */
export function AgentShowcase() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-card]"));
    const wells = Array.from(list.querySelectorAll<HTMLElement>(".lp-agent-well"));

    // Reveal once, as the card's top passes three quarters of the viewport.
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-seen", "");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    // The card crossing the middle band drives the panel.
    const focus = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(cards.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    cards.forEach((c) => {
      reveal.observe(c);
      focus.observe(c);
    });

    // Each visual is drawn on a 910px frame and scaled to fit.
    const fit = new ResizeObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        const frame = Number.parseFloat(getComputedStyle(el).getPropertyValue("--lp-agent-stage-w"));
        el.style.setProperty("--lp-agent-stage-scale", String(Math.min(1, e.contentRect.width / frame)));
      }
    });
    wells.forEach((w) => fit.observe(w));

    return () => {
      reveal.disconnect();
      focus.disconnect();
      fit.disconnect();
    };
  }, []);

  return (
    <section className="lp-agent" aria-labelledby="lp-agent-title">
      <header className="lp-gallery-head">
        <h2 id="lp-agent-title" className="lp-gallery-title lp-agent-title">
          Ideas faster. Code that stays yours.
        </h2>
        <Link className="lp-gallery-cta" href="/brand">
          See the system
        </Link>
      </header>

      <div className="lp-agent-body">
        <ol ref={listRef} className="lp-agent-cards">
          {CARDS.map((card, i) => (
            <li
              key={card.id}
              id={`agent-${card.id}`}
              className="lp-agent-card"
              data-card
              data-seen={i === 0 ? "" : undefined}
              data-active={i === active ? "" : undefined}
            >
              <div className="lp-agent-well" data-kind={card.id}>
                <div className="lp-agent-stage">
                  <card.Visual />
                </div>
              </div>
              <div className="lp-agent-caption" data-measure={card.measure}>
                <h3 className="lp-agent-caption-title">{card.title}</h3>
                <p className="lp-agent-caption-body">{card.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <AgentPanel active={active} />
      </div>
    </section>
  );
}

/* -- Sticky panel ---------------------------------------------------------- */

function AgentPanel({ active }: { active: number }) {
  const states = [
    <Chat
      key="ideate"
      prompt={
        <>
          <Chip icon={<FrameIcon />}>Hero</Chip> Show me three directions for the hero on the home page.
        </>
      }
      thinking={false}
      reply="Here are three takes for Northline: a misty full-bleed photo, a split panel, and a centred headline over the ridge. Shall I apply one?"
    />,
    <Chat
      key="responsive"
      prompt={
        <>
          <Chip icon={<FrameIcon />}>Desktop</Chip> Make this page work on tablet and phone.
        </>
      }
      reply="Done. On tablet the hero keeps its split and the nav folds into a menu; on phone the photo moves above the headline."
    />,
    <Chat
      key="reference"
      prompt={<>Build a footer laid out like this screenshot.</>}
      attachment={photo(17753331, 112, 112)}
      reply="Your footer is in: six columns and a legal row, in your own type and colours."
      followUp="Want me to fill in the real links?"
    />,
    <Chat
      key="interactions"
      prompt={
        <>
          Add a sticky header with a menu of the main pages, and use{" "}
          <Chip icon={<FileIcon />}>vase.jpg</Chip> in it
        </>
      }
      reply="The header now sticks as you scroll, and its menu opens onto your key pages with the image beside them."
      followUp="Should it go on every page?"
    />,
    <Inspector key="canvas" />,
  ];

  return (
    <aside className="lp-agent-panel" aria-label="Agent">
      <div className="lp-agent-states">
        {states.map((state, i) => (
          <div
            key={i}
            className="lp-agent-state"
            data-active={i === active ? "" : undefined}
            data-kind={i === states.length - 1 ? "inspector" : "chat"}
            aria-hidden={i !== active || undefined}
            inert={i !== active}
          >
            {state}
          </div>
        ))}
      </div>
      <Composer />
    </aside>
  );
}

function Chat({
  prompt,
  attachment,
  thinking = true,
  reply,
  followUp,
}: {
  prompt: ReactNode;
  attachment?: string;
  thinking?: boolean;
  reply: string;
  followUp?: string;
}) {
  return (
    <div className="lp-agent-chat">
      <div className="lp-agent-bubble lp-agent-beat" data-beat="0">
        <p className="lp-agent-prompt">{prompt}</p>
        {attachment && (
          <img className="lp-agent-attach" src={attachment} alt="The screenshot attached to the message" />
        )}
        <button type="button" className="lp-agent-copy" aria-label="Copy message">
          <CopyIcon />
        </button>
      </div>
      <div className="lp-agent-answer">
        {thinking ? (
          <p className="lp-agent-think lp-agent-beat" data-beat="1">
            <span className="lp-agent-think-live">Thinking...</span>
            <span className="lp-agent-think-done">
              Thought <span>32s</span>
            </span>
          </p>
        ) : (
          <p className="lp-agent-think lp-agent-beat" data-beat="1">
            <span className="lp-agent-think-static">
              Thought <span>32s</span>
            </span>
          </p>
        )}
        {thinking && (
          <p className="lp-agent-plan lp-agent-beat" data-beat="2">
            <PlanIcon />
            <span>Created a design plan</span>
            <span className="lp-agent-plan-time">2s</span>
          </p>
        )}
        <p className="lp-agent-reply lp-agent-beat" data-beat={thinking ? "3" : "2"}>
          {reply}
        </p>
        {followUp && (
          <p className="lp-agent-reply lp-agent-beat" data-beat="4">
            {followUp}
          </p>
        )}
      </div>
    </div>
  );
}

function Composer() {
  return (
    <form className="lp-agent-composer" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="lp-agent-input" className="lp-agent-sr">
        Message the agent
      </label>
      <textarea id="lp-agent-input" className="lp-agent-input" rows={3} placeholder="Ask for changes…" />
      <div className="lp-agent-composer-bar">
        <button type="button" className="lp-agent-model" aria-label="Model: Claude Sonnet">
          Claude Sonnet
          <ChevronIcon />
        </button>
        <div className="lp-agent-keys">
          <button type="button" className="lp-agent-key" aria-label="Attach a file">
            <PlusIcon />
          </button>
          <button type="button" className="lp-agent-key" aria-label="Mention a layer">
            <AtIcon />
          </button>
          <button type="submit" className="lp-agent-key" aria-label="Send">
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </form>
  );
}

/** The fifth card's panel: the text inspector the agent's edits land in. */
function Inspector() {
  return (
    <div className="lp-agent-inspector">
      <div className="lp-agent-section">
        <p>Styles</p>
        <PlusIcon />
      </div>
      <Field label="Opacity">
        <span className="lp-agent-field" data-size="half">
          1
        </span>
        <span className="lp-agent-slider" aria-hidden>
          <span className="lp-agent-slider-knob" />
        </span>
      </Field>
      <Field label="Visible">
        <span className="lp-agent-field lp-agent-segments" data-size="full">
          <span className="lp-agent-segment" data-on="">
            Yes
          </span>
          <span className="lp-agent-segment">No</span>
        </span>
      </Field>
      <div className="lp-agent-section">
        <p>Text</p>
        <PlusIcon />
      </div>
      <Field label="Styles">
        <span className="lp-agent-field" data-size="full" data-swatch="none">
          <span className="lp-agent-swatch" />
          <span className="lp-agent-placeholder">Select…</span>
        </span>
      </Field>
      <Field label="Content">
        <span className="lp-agent-field" data-size="full">
          Quiet ridges, cle…
        </span>
      </Field>
      <Field label="Font">
        <span className="lp-agent-field" data-size="full">
          Inter
          <ChevronIcon />
        </span>
      </Field>
      <Field label="Weight">
        <span className="lp-agent-field" data-size="full">
          450
          <ChevronIcon />
        </span>
      </Field>
      <Field label="Color">
        <span className="lp-agent-field" data-size="full" data-swatch="white">
          <span className="lp-agent-swatch" />
          White
        </span>
      </Field>
      <Field label="Size">
        <span className="lp-agent-field" data-size="half">
          28
        </span>
        <span className="lp-agent-field" data-size="half">
          Px
          <ChevronIcon />
        </span>
      </Field>
      <Field label="Letter">
        <span className="lp-agent-field" data-size="half">
          -0.045
        </span>
        <span className="lp-agent-field" data-size="half">
          PX
          <ChevronIcon />
        </span>
      </Field>
      <Field label="Line">
        <span className="lp-agent-field" data-size="half">
          28
        </span>
        <span className="lp-agent-field" data-size="half">
          Px
          <ChevronIcon />
        </span>
      </Field>
      <Field label="Align">
        <span className="lp-agent-field lp-agent-segments" data-size="full">
          <span className="lp-agent-segment">
            <AlignIcon lines={[10, 6, 8]} />
          </span>
          <span className="lp-agent-segment" data-on="">
            <AlignIcon lines={[10, 6, 8]} center />
          </span>
          <span className="lp-agent-segment">
            <AlignIcon lines={[10, 6, 8]} right />
          </span>
          <span className="lp-agent-divider" />
          <span className="lp-agent-segment">
            <AlignIcon lines={[10, 10, 10]} />
          </span>
        </span>
      </Field>
      <Field label="Variable">
        <span className="lp-agent-field" data-size="full" data-swatch="accent">
          <span className="lp-agent-swatch" />
          Enabled
          <ChevronIcon />
        </span>
      </Field>
      <Field label="OpenType">
        <span className="lp-agent-field" data-size="full" data-swatch="accent">
          <span className="lp-agent-swatch" />
          Enabled
          <ChevronIcon />
        </span>
      </Field>
      <Field label="OpenType">
        <span className="lp-agent-field" data-size="full" data-swatch="none">
          <span className="lp-agent-swatch" />
          <span className="lp-agent-placeholder">Add…</span>
        </span>
      </Field>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="lp-agent-row">
      <p className="lp-agent-row-label">{label}</p>
      <div className="lp-agent-row-control">{children}</div>
    </div>
  );
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="lp-agent-chip">
      {icon}
      {children}
    </span>
  );
}

/* -- Visuals: each is drawn on the 910 × 473 frame ------------------------- */

function Select() {
  return <span className="lp-agent-select" aria-hidden />;
}

function IdeateVisual() {
  const shots = [
    { src: photo(10786346, 1400), alt: "Hero direction: misty ridges at dawn" },
    { src: photo(11089921, 900), alt: "Hero direction: blue ridges under fog" },
    { src: photo(34639397, 900), alt: "Hero direction: peaks in cloud" },
  ];
  return (
    <div className="lp-agent-ideate">
      {shots.map((s, i) => (
        <figure key={i} className="lp-agent-shot" data-i={i}>
          <img src={s.src} alt={s.alt} loading="lazy" decoding="async" />
          <Select />
        </figure>
      ))}
    </div>
  );
}

function ResponsiveVisual() {
  const devices = [
    {
      name: "Tablet",
      width: "810",
      kind: "tablet",
      src: photo(10786346, 840, 740),
      alt: "The hero at tablet width",
    },
    {
      name: "Phone",
      width: "390",
      kind: "phone",
      src: photo(10786346, 480, 740),
      alt: "The hero at phone width",
    },
  ];
  return (
    <div className="lp-agent-devices">
      {devices.map((d) => (
        <figure key={d.kind} className="lp-agent-device" data-kind={d.kind}>
          <figcaption className="lp-agent-device-bar">
            <span className="lp-agent-dots" aria-hidden>
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i} style={{ ["--i" as string]: i }} />
              ))}
            </span>
            <span className="lp-agent-device-name">{d.name}</span>
            <span className="lp-agent-device-width">{d.width}</span>
            <span className="lp-agent-device-key" aria-hidden />
          </figcaption>
          <img src={d.src} alt={d.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}

const FOOTER_COLUMNS = [
  { title: "Company", links: ["About", "News", "Culture", "Careers", "Security"] },
  { title: "Legal", links: ["Accessibility", "Privacy policy", "Terms of use"] },
  { title: "Trips", links: ["Guided hikes", "Huts", "Early season", "Private", "Gear"] },
  { title: "Resources", links: ["Trail notes", "Route guides", "Packing lists"] },
  { title: "Social", links: ["Instagram", "LinkedIn", "X"] },
  { title: "Support", links: ["Contact", "Transfer account", "Help centre", "Compare plans"] },
];

function FooterVisual() {
  return (
    <div className="lp-agent-footer">
      <div className="lp-agent-footer-cols">
        {FOOTER_COLUMNS.map((col, i) => (
          <div key={col.title} className="lp-agent-footer-col" data-i={i}>
            <p className="lp-agent-footer-title">{col.title}</p>
            {col.links.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <Select />
          </div>
        ))}
      </div>
      <div className="lp-agent-footer-base">
        <p className="lp-agent-footer-mark">Northline</p>
        <div className="lp-agent-footer-legal">
          <p>©2026 Northline Outdoors. All rights reserved.</p>
          <p>Legal disclosures</p>
        </div>
      </div>
    </div>
  );
}

const MENU_COLUMNS = [
  ["About", "News", "Blog", "Careers"],
  ["Hikes", "Huts", "Early season", "Private", "Gear"],
  ["Contact", "Transfers", "Help centre", "Compare"],
];

function MenuVisual() {
  return (
    <div className="lp-agent-menu">
      <div className="lp-agent-menu-nav">
        <p>Northline®</p>
        <p className="lp-agent-menu-tab" data-i="0">
          Product
        </p>
        <p className="lp-agent-menu-tab" data-i="1">
          Support
        </p>
      </div>
      <div className="lp-agent-menu-body">
        {MENU_COLUMNS.map((col, c) => (
          <ul key={c} className="lp-agent-menu-col">
            {col.map((l, i) => (
              <li key={l} style={{ ["--i" as string]: c + i }}>
                {l}
              </li>
            ))}
          </ul>
        ))}
        <figure className="lp-agent-menu-media">
          <img
            src={photo(15028227, 600, 600)}
            alt="A ceramic vase on a dark ground"
            loading="lazy"
            decoding="async"
          />
          <figcaption>How it works</figcaption>
        </figure>
      </div>
    </div>
  );
}

function SocialVisual() {
  const assets = [
    { src: photo(29286722, 430, 600), selected: false },
    { src: photo(9304545, 430, 600), selected: true },
    { src: photo(15122652, 430, 600), selected: false },
  ];
  return (
    <div className="lp-agent-social">
      <div className="lp-agent-assets">
        {assets.map((a, i) => (
          <figure key={i} className="lp-agent-asset" data-selected={a.selected ? "" : undefined}>
            <figcaption>Social Asset {i + 1}</figcaption>
            <div className="lp-agent-asset-frame">
              <img src={a.src} alt={`Social post ${i + 1}`} loading="lazy" decoding="async" />
              {a.selected && <span className="lp-agent-asset-pick" aria-hidden />}
            </div>
          </figure>
        ))}
      </div>
      <div className="lp-agent-zoom" aria-hidden>
        <span className="lp-agent-zoom-key" />
        <span className="lp-agent-zoom-level">100%</span>
      </div>
    </div>
  );
}

/* -- Icons (currentColor, sized by CSS) ----------------------------------- */

function FrameIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="lp-agent-icon">
      <path d="M3.5 1v10M8.5 1v10M1 3.5h10M1 8.5h10" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="lp-agent-icon">
      <path d="M2.5 1.5h4.5l2.5 2.5v6.5h-7z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
function PlanIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="lp-agent-icon">
      <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="lp-agent-icon-sm">
      <path d="M4 4h6v6H4zM2 8V2h6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg viewBox="0 0 8 8" aria-hidden className="lp-agent-icon-xs">
      <path d="M1 3l3 2.6L7 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="lp-agent-icon-sm">
      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function AtIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="lp-agent-icon-sm">
      <circle cx="5" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M6.8 5v.8a1.4 1.4 0 002.4 0V5A4.2 4.2 0 105 9.2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="lp-agent-icon-sm">
      <path d="M5 8.5v-7M1.8 4.6L5 1.4l3.2 3.2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AlignIcon({ lines, center, right }: { lines: number[]; center?: boolean; right?: boolean }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="lp-agent-icon-sm">
      {lines.map((w, i) => {
        const x = center ? (10 - w) / 2 : right ? 10 - w : 0;
        return <path key={i} d={`M${x} ${2 + i * 3}h${w}`} stroke="currentColor" strokeWidth="1.2" />;
      })}
    </svg>
  );
}
