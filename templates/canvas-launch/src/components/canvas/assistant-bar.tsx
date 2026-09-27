/**
 * The assistant on a selection, ported from canvas `src/editor/agent/`:
 * `AssistantPill.tsx` (the button beside the selection's corner),
 * `AssistantBar.tsx` (the bar it opens under the selection) and
 * `MentionMenu.tsx` (the `@` list), with the mention's written form from
 * `mentions.ts` (`mentionToken`, `subtitleOf`).
 *
 * What changed to fit a static page, and nothing else:
 *   - Every hook is gone (placement, width pinning, mentions, dictation):
 *     the bar is drawn where it is put, in the state its props describe.
 *   - The `<textarea>` is a `<div>` with the textarea's classes, so `value`
 *     can hold a `MentionChip`. The real box holds plain text, and a mention
 *     in it IS plain text — `@` and the layer's name with its spaces taken
 *     out — so that is what `MentionChip` renders; `kind` only feeds the
 *     menu's subtitle, as the node's type does there.
 *   - Typing pins the bar to the width it had idle (`typingWidth`); here that
 *     width is the `width` prop, defaulting to the idle bar's own.
 *   - `attachments` has no counterpart in the editor — its bar carries no
 *     pictures. They are drawn as a row of 28px thumbnails before the text,
 *     on the bar's own chip shape and hairline, so the page can show one.
 *   - `sending` is the bar's `busy` state for a typed request ("Applying
 *     changes…").
 *   - Tailwind's `shadow-sm` is `shadow-ed-sm`; shadcn's `bg-popover` is the
 *     panel it resolves to (`bg-ed-panel`); `rounded-md` is canvas's 8px.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AiIcon,
  ChevronRightIcon,
  DuplicateIcon,
  MicIcon,
  MicOffIcon,
  SendIcon,
  TextContentIcon,
} from "./icons";

/** The reference's curve, kept exactly. */
const EASE = "cubic-bezier(0.23,1,0.32,1)";
const INSET = 8;
const CONTROL = 32;
const IDLE_BOX = 146;
const LINE = 18;
const BOX_PAD = 10;
const MAX_LINES = 5;
/** The idle bar's width — box, mic, the two jobs and the chevron. */
const IDLE_WIDTH = 414;

/* ------------------------------------------------------------------ *
 * The pill
 * ------------------------------------------------------------------ */

/**
 * "Ask the assistant" — the grey outlined button the editor pins beside the
 * selection's top-right corner. `active` draws its hovered state.
 */
export function AssistantPill({ active = false, className }: { active?: boolean; className?: string }) {
  return (
    <button
      type="button"
      data-assistant-pill
      aria-label="Ask the assistant"
      className={cn(
        "flex size-6 items-center justify-center rounded-full border border-ed-border " +
          "bg-ed-panel text-ed-text-secondary shadow-ed-sm transition-colors " +
          "hover:border-ed-border-strong hover:text-ed-text",
        active && "border-ed-border-strong text-ed-text",
        className
      )}
    >
      <AiIcon className="size-4" />
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Mentions
 * ------------------------------------------------------------------ */

/** `mentionToken`: the layer's name as it goes into the request. */
export function mentionToken(name: string): string {
  const cleaned = name.replace(/\s+/g, "");
  return `@${cleaned || "layer"}`;
}

/**
 * A mentioned layer inside the bar's text. The editor writes it into the
 * sentence as plain text — `@HeroCard` — and so does this.
 */
export function MentionChip({ name }: { name: string; kind?: string }) {
  return <span data-mention>{mentionToken(name)}</span>;
}

export interface MentionItem {
  name: string;
  /** The layer's type — the first half of the row's subtitle. */
  kind: string;
  /** Its text, when it has some — the second half. */
  detail?: string;
}

/** `subtitleOf`: the type and the text, joined, capped at 60 characters. */
function subtitleOf(item: MentionItem): string | undefined {
  const parts = [item.kind, item.detail?.trim()].filter(
    (part): part is string => typeof part === "string" && part.length > 0
  );
  const line = parts.join(" · ");
  return line ? (line.length > 60 ? `${line.slice(0, 59)}…` : line) : undefined;
}

/**
 * The rows `@` opens. Absolutely positioned, as in the editor — pass a
 * `className` to place it (the bar puts it at `top-full left-0 mt-2 w-[248px]`).
 */
export function MentionMenu({
  items,
  active,
  className,
}: {
  items: readonly MentionItem[];
  active: number;
  /** What has been typed after the `@`. The editor ranks by it and does not
   *  print it; the caller filters `items`. */
  query?: string;
  className?: string;
}) {
  return (
    <div
      data-assistant-mentions
      role="listbox"
      className={cn(
        "ed-scrollbar absolute z-10 max-h-[172px] overflow-y-auto rounded-shell",
        "bg-ed-panel py-1 shadow-ed-popover",
        className
      )}
    >
      <div className="px-2 py-1 text-3xs leading-4 font-medium tracking-wide text-ed-text-tertiary">Layers</div>
      {items.map((item, index) => {
        const subtitle = subtitleOf(item);
        return (
          <button
            key={`${item.name}-${index}`}
            type="button"
            role="option"
            aria-selected={index === active}
            className={cn(
              "flex w-full items-center gap-2 px-2 py-1 text-left",
              index === active ? "bg-ed-hover text-ed-text" : "text-ed-text"
            )}
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-2xs leading-4">{item.name}</span>
              {subtitle && <span className="block truncate text-3xs leading-4 text-ed-text-tertiary">{subtitle}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The bar
 * ------------------------------------------------------------------ */

type BarJob = "variations" | "content";
const JOBS: Array<{ action: BarJob; title: string; Icon: typeof DuplicateIcon }> = [
  { action: "variations", title: "Variations", Icon: DuplicateIcon },
  { action: "content", title: "Content", Icon: TextContentIcon },
];

export interface AssistantBarProps {
  /** What is written in the box — text, and `MentionChip`s in it. Empty or
   *  absent is the idle bar with its jobs. */
  value?: ReactNode;
  placeholder?: string;
  /** Pictures going with the request, drawn as thumbnails before the text. */
  attachments?: { src: string; alt: string }[];
  /** The mic dictating into the box. */
  listening?: boolean;
  /** The request on its way — the bar's posting state. */
  sending?: boolean;
  /** The `@` menu open under the bar. */
  mentions?: { items: readonly MentionItem[]; active: number; query?: string };
  /** The width the bar is pinned to while a sentence is written. */
  width?: number;
  className?: string;
}

export function AssistantBar({
  value,
  placeholder = "Describe your idea",
  attachments = [],
  listening = false,
  sending = false,
  mentions,
  width = IDLE_WIDTH,
  className,
}: AssistantBarProps) {
  const typing = value !== undefined && value !== null && value !== "" && value !== false;
  const pinned = !sending && typing ? width : null;
  const boxWidth = pinned ? pinned - INSET - CONTROL * 2 : IDLE_BOX;

  return (
    <div data-assistant-bar className={cn("relative w-fit", className)}>
      <div
        className={cn(
          "flex min-h-9 w-fit max-w-[calc(100vw-48px)] items-start justify-center gap-0.5",
          "overflow-hidden rounded-[18px] border border-ed-border bg-ed-panel p-1",
          "text-ed-text shadow-ed-popover"
        )}
        style={pinned ? { width: pinned } : undefined}
      >
        <div
          className="flex w-fit shrink-0 items-start justify-center gap-0.5"
          style={pinned ? { width: pinned - INSET } : undefined}
        >
          {sending && (
            <span className="inline-flex h-7 items-center gap-2 px-2.5 text-xs whitespace-nowrap text-ed-text-secondary">
              <span
                className="size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-ed-border-strong border-t-ed-text-secondary [animation-duration:700ms]"
                aria-hidden
              />
              Applying changes…
            </span>
          )}

          {!sending && (
            <>
              <div
                className="flex min-w-0 items-start gap-0.5 overflow-hidden transition-[max-width,opacity,transform] duration-400"
                style={{ maxWidth: boxWidth + CONTROL, transitionTimingFunction: EASE }}
              >
                <form
                  className="flex min-h-7 shrink-0 items-start transition-[width] duration-400"
                  style={{ width: boxWidth, transitionTimingFunction: EASE }}
                  onSubmit={(event) => event.preventDefault()}
                >
                  {attachments.length > 0 && (
                    <span className="flex shrink-0 items-center gap-1 py-0 pl-1" data-assistant-attachments>
                      {attachments.map((picture) => (
                        <img
                          key={picture.src}
                          src={picture.src}
                          alt={picture.alt}
                          className="size-7 shrink-0 rounded-ed-chip border border-ed-border object-cover"
                        />
                      ))}
                    </span>
                  )}
                  <div
                    data-assistant-composer
                    role="textbox"
                    aria-label={placeholder}
                    className={cn(
                      "w-full min-w-0 resize-none overflow-y-auto bg-transparent py-[5px] pr-2.5 pl-3 break-words whitespace-pre-wrap",
                      "text-xs leading-[18px] text-ed-text outline-none"
                    )}
                    style={{ minHeight: LINE + BOX_PAD, maxHeight: LINE * MAX_LINES + BOX_PAD }}
                  >
                    {typing ? value : <span className="text-ed-text-tertiary">{placeholder}</span>}
                  </div>
                </form>

                <button
                  type="button"
                  data-assistant-mic={listening ? "on" : "off"}
                  aria-label={listening ? "Stop dictating" : "Dictate the request"}
                  aria-pressed={listening}
                  title={listening ? "Stop dictating" : "Dictate the request"}
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
                    listening
                      ? "animate-pulse bg-ed-ink text-ed-panel"
                      : "text-ed-text-tertiary hover:bg-ed-hover hover:text-ed-text"
                  )}
                >
                  {listening ? <MicOffIcon className="size-3.5" /> : <MicIcon className="size-3.5" />}
                </button>
              </div>

              <div
                className="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,transform] duration-400"
                style={{
                  maxWidth: typing ? 0 : 224,
                  opacity: typing ? 0 : 1,
                  transform: typing ? "translateX(-8px)" : "translateX(0)",
                  visibility: typing ? "hidden" : "visible",
                  transitionTimingFunction: EASE,
                }}
              >
                <span className="mx-1 h-4 w-px shrink-0 bg-ed-border-strong" />
                {JOBS.map(({ action, title, Icon }) => (
                  <button
                    key={action}
                    type="button"
                    data-assistant-action={action}
                    className={cn(
                      "flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs whitespace-nowrap",
                      "text-ed-text transition-[background-color,transform] duration-150 hover:bg-ed-hover active:scale-[0.96]"
                    )}
                  >
                    <Icon className="size-3.5 text-ed-text-secondary" />
                    {title}
                  </button>
                ))}
                <span className="mx-0.5 h-4 w-px shrink-0 bg-ed-border" />
                <button
                  type="button"
                  data-assistant-more
                  aria-label="Show more jobs"
                  aria-expanded={false}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-ed-text transition-[background-color,transform] duration-200 hover:bg-ed-hover active:scale-[0.96]"
                >
                  <span className="flex">
                    <ChevronRightIcon className="size-3.5" />
                  </span>
                </button>
              </div>

              <div
                className="flex min-w-0 items-start overflow-hidden transition-[max-width,opacity,transform] duration-400"
                style={{
                  maxWidth: typing ? 30 : 0,
                  opacity: typing ? 1 : 0,
                  transform: typing ? "scale(1)" : "scale(0.88)",
                  visibility: typing ? "visible" : "hidden",
                  transitionTimingFunction: EASE,
                }}
              >
                <button
                  type="button"
                  data-assistant-send
                  aria-label="Send the request"
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    "bg-ed-ink text-ed-panel transition-[opacity,transform] duration-200 active:scale-[0.94]",
                    "disabled:cursor-default disabled:opacity-40"
                  )}
                >
                  <SendIcon className="size-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {mentions && (
        <MentionMenu
          items={mentions.items}
          active={mentions.active}
          query={mentions.query}
          className="top-full left-0 mt-2 w-[248px]"
        />
      )}
    </div>
  );
}
