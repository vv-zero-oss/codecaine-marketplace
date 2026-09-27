/**
 * The floating tool palette, ported from canvas `src/editor/toolbar/`
 * (`Toolbar.tsx`, `ModeSwitcher.tsx`, `groups.ts`, `tools.ts`) with its glyphs
 * from `toolbar-icons.tsx` (copied whole beside this file).
 *
 * What changed to fit a static page, and nothing else:
 *   - The groups are the table `buildToolGroups()` builds from the element
 *     registry, written out: the registry is the editor's, and its labels are
 *     what the table below holds.
 *   - Shortcuts are the registry's bindings formatted the Apple way
 *     (`formatBinding(…, true)`), since a page cannot ask the platform.
 *   - Base UI's `Menu` is replaced by its rendered markup: `openGroup` draws a
 *     group's menu open above its slot, with the current tool ticked, instead
 *     of a portal the page would have to click open. Tooltips are left off.
 *   - Colours are tokens: `text-white` → `text-ed-toolbar-ink`,
 *     `bg-white/10` → `bg-ed-toolbar-ink/10`, `text-white/50` →
 *     `text-ed-toolbar-ink/50`; `--ed-border-width-lg` is its 3px.
 *   - Magic Cast is drawn when `magicCast` is set (the editor draws it only in
 *     the desktop app).
 */
import { cn } from "@/lib/utils";
import { MagicCastButton } from "./magic-cast-pill";
import {
  ButtonToolIcon,
  CanvasSceneToolIcon,
  ChoicesToolIcon,
  DesignModeIcon,
  EllipseToolIcon,
  EmbedToolIcon,
  FormToolIcon,
  FrameToolIcon,
  HandToolIcon,
  HorizontalStackToolIcon,
  ImageToolIcon,
  ImportUrlToolIcon,
  InputToolIcon,
  InteractModeIcon,
  LinkToolIcon,
  LiveProjectToolIcon,
  MoveIcon,
  PenToolIcon,
  RectangleToolIcon,
  ScaleToolIcon,
  StackToolIcon,
  TextToolIcon,
  ToolCheckIcon,
  ToolChevronIcon,
  VideoToolIcon,
  WebsiteToolIcon,
  type ToolbarIcon,
} from "./toolbar-icons";

export interface ToolEntry {
  /** What the editor's `toolMode` becomes; "select" stands for its `null`. */
  tool: string;
  label: string;
  Icon: ToolbarIcon;
  shortcut?: string;
}

export interface ToolGroup {
  id: string;
  label: string;
  entries: ToolEntry[];
}

/** `buildToolGroups()` for the built-in element set. */
export const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "pointer",
    label: "Pointer tools",
    entries: [
      { tool: "select", label: "Move", Icon: MoveIcon, shortcut: "V" },
      { tool: "scale", label: "Scale", Icon: ScaleToolIcon, shortcut: "K" },
      { tool: "hand", label: "Hand tool", Icon: HandToolIcon },
    ],
  },
  {
    id: "page",
    label: "Page tools",
    entries: [
      { tool: "liveproject", label: "Live project", Icon: LiveProjectToolIcon },
      { tool: "webpage", label: "Webpage", Icon: WebsiteToolIcon, shortcut: "W" },
    ],
  },
  {
    id: "frame",
    label: "Frame tools",
    entries: [
      { tool: "frame", label: "Frame", Icon: FrameToolIcon, shortcut: "F" },
      { tool: "section", label: "Vertical stack", Icon: StackToolIcon, shortcut: "S" },
      { tool: "hstack", label: "Horizontal stack", Icon: HorizontalStackToolIcon },
    ],
  },
  {
    id: "shape",
    label: "Shape tools",
    entries: [
      { tool: "rectangle", label: "Rectangle", Icon: RectangleToolIcon, shortcut: "R" },
      { tool: "ellipse", label: "Ellipse", Icon: EllipseToolIcon, shortcut: "O" },
      { tool: "button", label: "Button", Icon: ButtonToolIcon, shortcut: "B" },
      { tool: "link", label: "Link", Icon: LinkToolIcon, shortcut: "L" },
      { tool: "form", label: "Form", Icon: FormToolIcon },
      { tool: "input", label: "Input", Icon: InputToolIcon },
      { tool: "inputgroup", label: "Choices", Icon: ChoicesToolIcon },
    ],
  },
  {
    id: "text",
    label: "Text tool",
    entries: [{ tool: "text", label: "Text", Icon: TextToolIcon, shortcut: "T" }],
  },
  {
    id: "media",
    label: "Media tools",
    entries: [
      { tool: "image", label: "Image", Icon: ImageToolIcon, shortcut: "I" },
      { tool: "video", label: "Video", Icon: VideoToolIcon },
      { tool: "embed", label: "Embed", Icon: EmbedToolIcon },
      { tool: "canvas", label: "3D Canvas", Icon: CanvasSceneToolIcon },
      { tool: "import-url", label: "Import URL", Icon: ImportUrlToolIcon },
    ],
  },
  {
    id: "pen",
    label: "Pen tool",
    entries: [{ tool: "pen", label: "Pen", Icon: PenToolIcon, shortcut: "P" }],
  },
];

export type EditorMode = "design" | "interact";

const MODES: Array<{ value: EditorMode; label: string; Icon: ToolbarIcon }> = [
  { value: "design", label: "Design", Icon: DesignModeIcon },
  { value: "interact", label: "Interact", Icon: InteractModeIcon },
];

/** Item box and gap: the slider travels one of these per step. */
const ITEM = 28;
const GAP = 2;

export interface ToolbarProps {
  /** The armed tool — a `tool` from `TOOL_GROUPS`; "select" by default. */
  activeTool?: string;
  mode?: EditorMode;
  /** A group id (`pointer`, `page`, `frame`, `shape`, `text`, `media`, `pen`)
   *  whose menu is drawn open. */
  openGroup?: string;
  /** The tool the open menu's pointer is over. */
  highlightedTool?: string;
  /** What each group's slot shows when its tool is not armed — the last one
   *  taken from it. Keyed by group id. */
  chosen?: Partial<Record<string, string>>;
  /** Draw Magic Cast's button, as the desktop app does. */
  magicCast?: boolean;
  magicCastActive?: boolean;
  className?: string;
}

export function Toolbar({
  activeTool = "select",
  mode = "design",
  openGroup,
  highlightedTool,
  chosen = {},
  magicCast = true,
  magicCastActive = false,
  className,
}: ToolbarProps) {
  return (
    <div
      data-no-pan=""
      className={cn(
        "ed-toolbar-surface flex h-11 cursor-default select-none items-center rounded-full px-2",
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        {TOOL_GROUPS.map((group) => (
          <ToolSlot
            key={group.id}
            group={group}
            current={currentEntry(group, activeTool, chosen[group.id])}
            activeTool={activeTool}
            open={openGroup === group.id}
            highlightedTool={highlightedTool}
          />
        ))}
      </div>

      {magicCast && <MagicCastButton active={magicCastActive} />}

      <span className="mx-1 h-7 w-px bg-ed-toolbar-divider" aria-hidden />

      <ModeSwitcher mode={mode} />
    </div>
  );
}

function currentEntry(group: ToolGroup, activeTool: string, remembered: string | undefined): ToolEntry {
  const armed = group.entries.find((entry) => entry.tool === activeTool);
  if (armed) return armed;
  return group.entries.find((entry) => entry.tool === remembered) ?? group.entries[0];
}

function ToolSlot({
  group,
  current,
  activeTool,
  open,
  highlightedTool,
}: {
  group: ToolGroup;
  current: ToolEntry;
  activeTool: string;
  open: boolean;
  highlightedTool?: string;
}) {
  const active = group.entries.some((entry) => entry.tool === activeTool);
  return (
    <div className="flex items-center">
      <ToolButton entry={current} active={active} />
      {group.entries.length > 1 && (
        <span className="relative -ml-0.5 flex">
          <button
            type="button"
            aria-label={group.label}
            aria-haspopup="menu"
            aria-expanded={open}
            data-popup-open={open ? "" : undefined}
            className={cn(
              "flex h-7 w-3.5 items-center justify-center rounded-full text-ed-toolbar-ink transition-colors",
              "hover:bg-ed-toolbar-ink/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ed-toolbar-ink",
              "data-[popup-open]:bg-ed-toolbar-ink/10"
            )}
          >
            <ToolChevronIcon className="icon-toolbar-chevron" />
          </button>
          {open && <ToolMenu group={group} current={current} highlightedTool={highlightedTool} />}
        </span>
      )}
    </div>
  );
}

function ToolButton({ entry, active }: { entry: ToolEntry; active: boolean }) {
  return (
    <button
      type="button"
      aria-label={entry.label}
      aria-pressed={active}
      className={cn(
        "flex size-7 items-center justify-center rounded-full border-[3px] border-transparent text-ed-toolbar-ink",
        "transition-colors focus-visible:border-ed-toolbar-ink focus-visible:outline-none",
        active ? "bg-ed-toolbar-accent" : "hover:bg-ed-toolbar-ink/10"
      )}
    >
      <entry.Icon />
    </button>
  );
}

/** The menu a slot's chevron opens: above the bar, aligned to the slot's
 *  start, 12px off it — the editor's `side="top" align="start" sideOffset={12}`. */
function ToolMenu({
  group,
  current,
  highlightedTool,
}: {
  group: ToolGroup;
  current: ToolEntry;
  highlightedTool?: string;
}) {
  return (
    <div className="absolute bottom-full left-0 z-10 mb-3 outline-none">
      <div role="menu" className="ed-toolbar-surface min-w-40 rounded-toolbar p-2 text-ed-toolbar-ink outline-none">
        <div role="group">
          {group.entries.map((entry) => {
            const checked = entry.tool === current.tool;
            const highlighted = entry.tool === highlightedTool;
            return (
              <div
                key={entry.tool}
                role="menuitemradio"
                aria-checked={checked}
                data-highlighted={highlighted ? "" : undefined}
                className={cn(
                  "flex h-8 cursor-default select-none items-center gap-2 rounded-2xs pr-2 pl-1 text-ed-shell outline-none",
                  "data-[highlighted]:bg-ed-toolbar-accent"
                )}
              >
                <span
                  data-unchecked={checked ? undefined : ""}
                  className="flex size-4 shrink-0 items-center justify-center data-[unchecked]:invisible"
                >
                  <ToolCheckIcon className="size-4" />
                </span>
                <entry.Icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{entry.label}</span>
                {entry.shortcut && <span className="shrink-0 pl-4 text-ed-toolbar-ink/50">{entry.shortcut}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** The mode switch on the right of the bar: one chip sliding between modes. */
export function ModeSwitcher({ mode }: { mode: EditorMode }) {
  const index = Math.max(0, MODES.findIndex((entry) => entry.value === mode));
  return (
    <div
      role="radiogroup"
      aria-label="Editor mode"
      className="relative flex h-8 items-center gap-0.5 rounded-full bg-ed-toolbar-active-bg p-0.5"
    >
      <span
        aria-hidden
        className="ed-toolbar-slider absolute size-7 rounded-full transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${index * (ITEM + GAP)}px)` }}
      />
      {MODES.map(({ value, label, Icon }) => {
        const active = value === mode;
        return (
          <label key={value} className="relative z-10 flex size-7 items-center justify-center">
            <input
              type="radio"
              value={value}
              checked={active}
              readOnly
              aria-label={label}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <Icon
              className={cn(
                "transition-colors",
                active ? "text-ed-toolbar-accent-text" : "text-ed-toolbar-ink/70"
              )}
            />
          </label>
        );
      })}
    </div>
  );
}
