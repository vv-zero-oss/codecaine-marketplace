/**
 * An assistant run, as the editor draws it — ported from canvas
 * `src/editor/ai/` (`AiRunChip.tsx`, `AiRunOverlay.tsx`, `AiHoldNotice.tsx`,
 * `AiToast.tsx`) and the two pieces of `src/editor/ui/` they are made of
 * (`RunChip.tsx`, `LoadingState.tsx`).
 *
 * What changed to fit a static page, and nothing else:
 *   - The store is gone: each component takes the run's words as props.
 *   - `LoadingState`'s clock is the `elapsed` prop rather than its own
 *     interval, so a page can drive it; its Surfer variant is left out.
 *   - `AiRunRing` fills its positioned parent instead of being placed by the
 *     camera; the ring grows 2.5px past each side as the overlay grows it
 *     (`width + 5`), and the shine sits inside at the parent's own size.
 *   - The ring, shine and loader keyframes are the editor's own CSS, in
 *     editor-tokens.css, reading `--color-ed-*`.
 *   - Colours are tokens: `text-white` → `text-ed-on-accent` on the coloured
 *     chips and `text-ed-toolbar-ink` on the toast (the toast is the toolbar's
 *     dark chrome); `bg-black/20` → `bg-ed-ink/20`. Tailwind's `shadow-sm` is
 *     `shadow-ed-sm`. The toast's `animate-in` entrance (tw-animate-css, not
 *     installed here) is left to the page.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AiDoneIcon, AiIcon, CloseIcon, LocateIcon, MissingFontIcon } from "./icons";

/* ------------------------------------------------------------------ *
 * LoadingState — the pixel grid, the shimmering label and the clock.
 * ------------------------------------------------------------------ */
const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3),
    c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

export function LoaderGrid({
  delays = chevron,
  dur = 650,
  round = false,
}: {
  delays?: (number | null)[];
  dur?: number;
  round?: boolean;
}) {
  return (
    <span aria-hidden data-loader-grid className="grid shrink-0 grid-cols-[repeat(3,4px)] gap-[1.5px]">
      {delays.map((delay, index) => (
        <span
          key={index}
          className={`size-[4px] bg-ed-text ${round ? "rounded-full" : "rounded-[1px]"}`}
          style={{
            opacity: delay === null ? 0.07 : 0.15,
            animation: delay === null ? "none" : `pixel-on ${dur}ms ease-in-out ${delay}ms infinite`,
          }}
        />
      ))}
    </span>
  );
}

export function LoadingState({ label, elapsed }: { label: string; elapsed: string }) {
  return (
    <div role="status" className="flex w-fit min-w-0 items-center gap-2.5">
      <LoaderGrid />
      <span
        data-shimmer-label
        className="min-w-0 truncate bg-clip-text text-[13px] font-medium text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-ed-text-tertiary) 35%, var(--color-ed-text) 50%, var(--color-ed-text-tertiary) 65%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-text 1.4s linear infinite",
        }}
      >
        {label}
      </span>
      <span className="shrink-0 font-mono text-[12px] text-ed-text-tertiary tabular-nums">{elapsed}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * RunChip — the shape a job wears beside a layer's name.
 * ------------------------------------------------------------------ */
type RunChipTone = "ai" | "busy" | "warning" | "done";

const TONES: Record<RunChipTone, string> = {
  ai: "border border-ed-border bg-ed-panel text-ed-text-secondary",
  busy: "bg-ed-accent text-ed-on-accent",
  warning: "bg-ed-warning text-ed-on-accent",
  done: "bg-ed-ai-soft text-ed-ai",
};

function RunChip({
  content,
  icon,
  label,
  tone,
  cancel,
  cancelLabel,
  variant,
}: {
  content?: ReactNode;
  icon: ReactNode;
  label: string;
  tone: RunChipTone;
  cancel: boolean;
  cancelLabel: string;
  variant: "panel" | "canvas";
}) {
  return (
    <span
      className={cn(
        "flex h-[18px] shrink-0 items-center gap-1 rounded-sm pr-0.5 pl-1.5",
        "text-3xs leading-none font-medium whitespace-nowrap",
        variant === "canvas" ? "shadow-ed-sm" : "min-w-0 max-w-[55%]",
        TONES[tone]
      )}
    >
      {content ?? (
        <>
          <span className="flex size-3 shrink-0 items-center justify-center" aria-hidden>
            {icon}
          </span>
          <span className="truncate">{label}</span>
        </>
      )}
      {cancel && (
        <button
          type="button"
          aria-label={cancelLabel}
          title={cancelLabel}
          className="flex size-[15px] items-center justify-center rounded-3xs hover:bg-ed-ink/20"
        >
          <CloseIcon className="size-2.5" />
        </button>
      )}
    </span>
  );
}

export type AiRunState = "running" | "waiting" | "done";

/**
 * What the assistant is doing to a layer, and the way to stop it — beside the
 * frame's name on the board (`canvas`) or its row in the layers panel.
 */
export function AiRunChip({
  label,
  elapsed,
  state,
  variant = "canvas",
}: {
  /** The assistant's own words for the run — "Rewriting hero". */
  label: string;
  /** The clock beside it while it works — "4.2s". */
  elapsed: string;
  state: AiRunState;
  variant?: "panel" | "canvas";
}) {
  const working = state === "running";
  const waiting = state === "waiting";
  const done = state === "done";
  const shown = done ? "Done" : waiting ? "Needs input" : label;
  return (
    <RunChip
      variant={variant}
      tone={waiting ? "warning" : done ? "done" : "ai"}
      content={working ? <LoadingState label={shown} elapsed={elapsed} /> : undefined}
      icon={waiting ? <MissingFontIcon className="size-3" /> : <AiDoneIcon className="size-3" />}
      label={shown}
      cancel={!done}
      cancelLabel="Cancel the AI request"
    />
  );
}

/**
 * The band of light travelling round a frame the assistant is holding, and the
 * sheen crossing it; the amber breathing rim while the run waits on an answer.
 * Fills its positioned parent — put it in the frame's box.
 */
export function AiRunRing({ state, className }: { state: "running" | "waiting"; className?: string }) {
  const waiting = state === "waiting";
  return (
    <>
      <div
        aria-hidden
        data-ai-phase={waiting ? "needs-input" : "working"}
        className={cn(
          "pointer-events-none absolute -inset-[2.5px] rounded-3xs",
          waiting ? "ed-ai-ring-waiting" : "ed-ai-ring",
          className
        )}
      />
      {!waiting && <div aria-hidden className="ed-ai-shine pointer-events-none absolute inset-0 rounded-3xs" />}
    </>
  );
}

/**
 * The line across the top of the inspector while the assistant holds the
 * layer it is showing.
 */
export function AiHoldNotice({
  state = "running",
  label,
  message,
}: {
  state?: "running" | "waiting";
  /** The run's own words, lower-cased after "working on this layer — ". */
  label?: string;
  /** What a waiting run asked. */
  message?: string;
}) {
  const waiting = state === "waiting";
  return (
    <div
      role="status"
      className={
        "flex shrink-0 items-start gap-2 border-b px-3 py-2 text-2xs leading-[1.45] " +
        (waiting
          ? "border-ed-border bg-ed-warning/10 text-ed-warning"
          : "border-ed-border bg-ed-ai-soft text-ed-ai")
      }
    >
      <span className="mt-px flex size-3.5 shrink-0 items-center justify-center" aria-hidden>
        {waiting ? <MissingFontIcon className="size-3.5" /> : <AiIcon className="size-3.5" />}
      </span>
      <span className="min-w-0">
        {waiting
          ? (message ?? "The assistant is waiting on an answer for this layer.")
          : `The assistant is working on this layer${label ? ` — ${label.toLowerCase()}` : ""}.`}{" "}
        <span className="opacity-80">
          Nothing here can be changed until it lets go. Cancel it from the layer&rsquo;s name.
        </span>
      </span>
    </div>
  );
}

/**
 * What a run says when it stops — above the toolbar. `action` draws the
 * Locate button a waiting run offers.
 */
export function AiToast({
  state,
  message,
  action,
  className,
}: {
  state: "waiting" | "done";
  message?: string;
  /** The button's words — "Locate" in the editor. Only a waiting run has one. */
  action?: string;
  className?: string;
}) {
  const asking = state === "waiting";
  const text = message ?? (asking ? "The assistant needs an answer" : "The assistant finished this layer");
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "ed-toast pointer-events-none",
        "flex h-8 max-w-[520px] items-center gap-2 rounded-toast pr-1 pl-3",
        "text-2xs font-control text-ed-toolbar-ink",
        className
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center",
          asking ? "text-ed-warning" : "text-ed-ai-glow"
        )}
        aria-hidden
      >
        {asking ? <MissingFontIcon className="size-4" /> : <AiDoneIcon className="size-4" />}
      </span>
      <span className="truncate">{text}</span>
      {asking && action && (
        <button
          type="button"
          className={cn(
            "pointer-events-auto ml-1 flex h-6 shrink-0 items-center gap-1 rounded-input px-2",
            "text-2xs font-medium text-ed-toolbar-ink/85",
            "bg-ed-toolbar-ink/10 hover:bg-ed-toolbar-ink/20 hover:text-ed-toolbar-ink"
          )}
        >
          <LocateIcon className="size-3.5" />
          {action}
        </button>
      )}
    </div>
  );
}
