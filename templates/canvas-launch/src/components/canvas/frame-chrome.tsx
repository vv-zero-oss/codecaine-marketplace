/**
 * A frame's chrome on the board, ported from canvas `src/editor/capture/`:
 *
 *   - `FrameTitle` — `FrameTitles.tsx`: the name strip above a top-level
 *     frame (18px, or 22px for a page's control box, `frame-title.ts`), and
 *     the unsaved-changes dot a live project's name carries.
 *   - `Selection` — `SelectionOverlay.tsx` and `ResizeHandles.tsx`: the 1.5px
 *     outline, the size chip under it and the eight handles.
 *
 * What changed to fit a static page, and nothing else:
 *   - The camera is gone. The title is laid out in flow above its frame (4px
 *     gap, 10px for a page — `FRAME_TITLE_GAP` and the page metrics), and the
 *     selection is an overlay filling whatever it wraps.
 *   - The size is a string the page writes ("124 × 40").
 *   - `tone="state"` is the pink a pseudo-state draws; `tone="page"` and
 *     `tone="live"` are the page chrome (purple; dashed for a live project) with
 *     its larger chip and 10px handles; `tone="ai"` is the teal of a held layer
 *     (which draws no handles).
 *   - Tailwind's `shadow-sm` on the handles is `shadow-ed-sm`;
 *     `--ed-border-width-thin` is its 1.5px.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FrameKind = "frame" | "webpage" | "live";

export function FrameTitle({
  name,
  selected = false,
  kind = "frame",
  unsaved = 0,
  className,
}: {
  name: string;
  selected?: boolean;
  kind?: FrameKind;
  /** A live project's count of changes not yet in its code — the dot. */
  unsaved?: number;
  className?: string;
}) {
  const chrome = kind !== "frame";
  return (
    <div
      data-frame-title
      className={cn(
        "flex w-full items-center overflow-hidden whitespace-nowrap",
        chrome
          ? "mb-[10px] h-[22px] text-ed-shell leading-none font-medium text-ed-page-chrome"
          : "mb-[4px] h-[18px] rounded-t-[3px] px-2 text-2xs leading-none font-medium " +
              (selected ? "bg-ed-accent text-ed-on-accent" : "text-ed-text-secondary"),
        className
      )}
      title="Drag to move this frame"
    >
      <span className="truncate">{name}</span>
      {unsaved > 0 && (
        <span
          role="img"
          aria-label={unsaved === 1 ? "1 unsaved change" : `${unsaved} unsaved changes`}
          className="ml-1.5 size-1.5 shrink-0 rounded-full bg-current"
        />
      )}
    </div>
  );
}

const HANDLES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const;

/** Where each handle's centre sits, as a fraction of the box. */
const AT: Record<(typeof HANDLES)[number], [number, number]> = {
  n: [50, 0],
  s: [50, 100],
  e: [100, 50],
  w: [0, 50],
  ne: [100, 0],
  nw: [0, 0],
  se: [100, 100],
  sw: [0, 100],
};

export type SelectionTone = "accent" | "state" | "page" | "live" | "ai";

export function Selection({
  label,
  size,
  tone = "accent",
  handles = true,
  children,
  className,
}: {
  /** The layer's name, first in the chip (a page's chip shows only its size). */
  label: string;
  /** "124 × 40". */
  size: string;
  tone?: SelectionTone;
  handles?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const chrome = tone === "page" || tone === "live";
  const line =
    tone === "ai"
      ? "outline-ed-ai"
      : tone === "state"
        ? "outline-ed-state"
        : chrome
          ? "outline-ed-page-chrome"
          : "outline-ed-accent";
  const chip =
    tone === "ai" ? "bg-ed-ai" : tone === "state" ? "bg-ed-state" : chrome ? "bg-ed-page-chrome" : "bg-ed-accent";
  const border = tone === "state" ? "border-ed-state" : chrome ? "border-ed-page-chrome" : "border-ed-accent";
  const dashed = tone === "live" ? " outline-dashed" : "";
  const handleSize = chrome ? 10 : 8;

  return (
    <div className={cn("relative", className)}>
      {children}
      <div
        data-selection
        className={`pointer-events-none absolute inset-0 outline outline-[1.5px]${dashed} ${line}`}
      >
        <span
          data-size-chip={chrome ? tone : "layer"}
          className={
            `absolute left-1/2 flex -translate-x-1/2 items-center whitespace-nowrap ${chip} text-ed-on-accent ` +
            (chrome
              ? "top-full mt-3.5 gap-2 rounded-ed-chip px-2.5 py-1 text-xs leading-4 font-semibold"
              : "top-full mt-1.5 gap-1.5 rounded-3xs px-1.5 py-0.5 text-3xs leading-4 font-medium")
          }
        >
          {!chrome && <span>{label}</span>}
          <span className={chrome ? undefined : "opacity-75"}>{size}</span>
        </span>
      </div>
      {handles &&
        tone !== "ai" &&
        HANDLES.map((handle) => (
          <div
            key={handle}
            data-resize-handle={handle}
            className={`pointer-events-none absolute rounded-4xs border-[1.5px] bg-ed-handle shadow-ed-sm ${border}`}
            style={{
              left: `calc(${AT[handle][0]}% - ${handleSize / 2}px)`,
              top: `calc(${AT[handle][1]}% - ${handleSize / 2}px)`,
              width: handleSize,
              height: handleSize,
            }}
          />
        ))}
    </div>
  );
}
