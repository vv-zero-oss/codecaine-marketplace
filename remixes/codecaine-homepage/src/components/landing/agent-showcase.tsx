
import { useEffect, useRef, useState, type ReactNode } from "react";

const FR = "https://framerusercontent.com/images";

/* -- Data, in the reference's own order and words ------------------------- */

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
    title: "The agent iterates & ideates with you",
    body: "Refine a section, explore layout directions, or ask for ideas you haven’t thought of yet. The agent responds to feedback in real time, generating new variations until the design feels right.",
    measure: "wide",
    Visual: IdeateVisual,
  },
  {
    id: "responsive",
    title: "Make any design responsive",
    body: "Ask the agent to “Make this responsive for tablet and phone.” It adapts your layouts across breakpoints, adjusting stacks, type sizes, spacing, and image crops until everything works.",
    measure: "wide",
    Visual: ResponsiveVisual,
  },
  {
    id: "reference",
    title: "Turn references into editable web designs",
    body: "Drop in images or share a URL and the agent uses it as a starting point. The layout, style, and feel of your reference, brought directly onto the canvas.",
    measure: "narrow",
    Visual: FooterVisual,
  },
  {
    id: "interactions",
    title: "Complex interactions, done in seconds",
    body: "Sticky navbars, animated menus, interactive carousels, just describe what you want. The agent handles the wiring so you can focus on the design, not the how-to.",
    measure: "mid",
    Visual: MenuVisual,
  },
  {
    id: "canvas",
    title: "Sites, icons, social assets. All on freeform canvas.",
    body: "From websites to icons, every change the agent makes is fully editable. Move it, restyle it, tweak it by hand. You’re never stuck in a prompt loop.",
    measure: "narrow",
    Visual: SocialVisual,
  },
];

/**
 * "Faster ideas. Better designs. Still yours." — five feature cards beside a
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

    // Each visual is drawn on the reference's 910px frame and scaled to fit.
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
          Faster ideas. Better designs. Still yours.
        </h2>
        <a className="lp-gallery-cta" href="https://www.framer.com/ai/">
          Design with AI
        </a>
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
          <Chip icon={<FrameIcon />}>Hero Section</Chip> Give me a couple layout variations of the hero section of my
          front page.
        </>
      }
      thinking={false}
      reply="I created three hero variations for Parallel: a split dark panel, a full-bleed image, and a centered scenic layout. Want me to apply one?"
    />,
    <Chat
      key="responsive"
      prompt={
        <>
          <Chip icon={<FrameIcon />}>Desktop</Chip> Help me update my design so it is responsive across tablet and phone
          breakpoints.
        </>
      }
      reply="I’ve made your design responsive. On tablet the split hero stays with the nav collapsed into a Menu; on phone the image stacks above the headline."
    />,
    <Chat
      key="reference"
      prompt={<>Design a footer using this screenshot as a visual reference.</>}
      attachment={`${FR}/AcRkaX89tSlg8QFsu52TuZguPN4.png?width=112&height=112`}
      reply="I’ve designed a footer based on your screenshot, matching its layout, columns, and spacing while keeping your site’s styling."
      followUp="Want me to tweak any of the links?"
    />,
    <Chat
      key="interactions"
      prompt={
        <>
          Create a sticky navbar component. Use my most important pages as links. Include{" "}
          <Chip icon={<FileIcon />}>video.mp4</Chip>
        </>
      }
      reply="I’ve created a sticky navbar component linking your key pages, so it stays in view as visitors scroll."
      followUp="Want me to add it across the rest of your pages?"
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
          <img className="lp-agent-attach" src={attachment} alt="Design agents chat interface image" />
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
        <button type="button" className="lp-agent-model" aria-label="Model: GPT 6 Sol">
          GPT 6 Sol
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
          Investing on autop…
        </span>
      </Field>
      <Field label="Font">
        <span className="lp-agent-field" data-size="full">
          Geist
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
    { src: `${FR}/NGJAnJajvBrK1SEEjxh78Qdg.jpg?width=2400&height=1600`, alt: "Hero design preview" },
    { src: `${FR}/cfgKNHtptOS5ZoQgFRDgaMANZjY.jpg?width=1314&height=876`, alt: "Hero design preview" },
    { src: `${FR}/guwqpIEPe9mN4oB7W9fnkOtof6k.jpg?width=1314&height=876`, alt: "Hero design preview" },
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
      src: `${FR}/B4VMaVxB1JPQso8jLQz1cNveGM.jpg?width=840&height=740`,
      alt: "Hero design preview made in Framer",
    },
    {
      name: "Phone",
      width: "390",
      kind: "phone",
      src: `${FR}/g4ErSWqFZvLB29rfknyH1Xg0.jpg?width=480&height=740`,
      alt: "Mobile design preview made in Framer",
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
  { title: "Product", links: ["Invest", "Portfolios", "Early access", "Advisor", "Learn"] },
  { title: "Resources", links: ["Market insights", "Investment guides", "Planning tools"] },
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
        <img
          className="lp-agent-footer-mark"
          src={`${FR}/c1Bn3kHyoBzB7TfAgrqwOnYgfc.png?width=3504&height=709`}
          alt="Framer logo mark"
          loading="lazy"
          decoding="async"
        />
        <div className="lp-agent-footer-legal">
          <p>©2026 Parallel Investing. All rights reserved.</p>
          <p>Legal disclosures</p>
        </div>
      </div>
    </div>
  );
}

const MENU_COLUMNS = [
  ["About", "News", "Blog", "Careers"],
  ["Invest", "Portfolios", "Early access", "Advisor", "Learn"],
  ["Contact", "Transfers", "Help centre", "Compare"],
];

function MenuVisual() {
  return (
    <div className="lp-agent-menu">
      <div className="lp-agent-menu-nav">
        <p>Parallel®</p>
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
            src={`${FR}/UBF85ytILrra5y9lutZNqB9ZveQ.png?width=1024&height=1024`}
            alt="Interaction menu preview image"
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
    { src: `${FR}/OqeBYmv5CfLeKUcIyR5AfOkJtso.jpg?width=430&height=600`, selected: false },
    { src: `${FR}/9e6mQgfVJqEUmm9HZdfFpQiNFw.jpg?width=430&height=600`, selected: true },
    { src: `${FR}/WcJqN5pRdus9rQEBbbjOjpBUNIs.jpg?width=430&height=600`, selected: false },
  ];
  return (
    <div className="lp-agent-social">
      <div className="lp-agent-assets">
        {assets.map((a, i) => (
          <figure key={i} className="lp-agent-asset" data-selected={a.selected ? "" : undefined}>
            <figcaption>Social Asset {i + 1}</figcaption>
            <div className="lp-agent-asset-frame">
              <img src={a.src} alt="Design exploration in Framer" loading="lazy" decoding="async" />
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
