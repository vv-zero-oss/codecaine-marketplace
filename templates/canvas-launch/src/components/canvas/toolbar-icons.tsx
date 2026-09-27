/**
 * The canvas toolbar's glyphs.
 *
 * A set of its own rather than the chrome icons in `ui/icons.tsx`: the toolbar
 * is drawn from a design that specifies these exact outlines, in a hairline
 * filled style rather than a stroked one.
 *
 * Three sizes, each answering to the box it sits in:
 *
 * - The tools and the mode switch are both drawn at 20, so a glyph reads the
 *   same height wherever it sits on the bar — a tool's 28px chip and the mode
 *   switch's 28px chip now match, and there is no reason left for their
 *   glyphs not to.
 * - The two glyphs that are neither stay small: the menu's tick is set in a
 *   list where 16 is the row's measure, and the chevron is drawn at the 12 its
 *   handle is wide — an affordance beside a tool rather than one of them.
 *
 * Every path is filled with `currentColor`, so a button's own text colour
 * decides the glyph's — which is what lets one icon read as white on the blue
 * active chip, and as dimmed white beside it.
 *
 * Tools this editor has that the reference sheet does not cover — a webpage, a
 * live project, media, a stack — borrow Hugeicons' outline at a hairline weight,
 * which lands close enough to the drawn set to sit in the same row.
 */
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import {
  BoxIcon as HgBox,
  CircleIcon as HgCircle,
  CodeIcon as HgCode,
  CopyLinkIcon as HgCopyLink,
  CursorEdit02Icon as HgCursorEdit02,
  DropdownFieldTypeIcon as HgDropdownFieldType,
  FrameIcon as HgFrame,
  GlobeIcon as HgGlobe,
  GroupItemsIcon as HgGroupItems,
  HandIcon as HgHand,
  ImagePlusIcon as HgImagePlus,
  InputCursorTextIcon as HgInputCursorText,
  InternetIcon as HgInternet,
  Layout2ColumnIcon as HgLayout2Column,
  Layout2RowIcon as HgLayout2Row,
  LinkIcon as HgLink,
  ListChecksIcon as HgListChecks,
  MousePointer01Icon as HgMousePointer01,
  MousePointerClickIcon as HgMousePointerClick,
  PenTool02Icon as HgPenTool02,
  SaveIcon as HgSave,
  ScalingIcon as HgScaling,
  ShapesIcon as HgShapes,
  SquareIcon as HgSquare,
  TypeIcon as HgType,
  VideoIcon as HgVideo,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export type ToolbarIcon = ComponentType<{ className?: string }>;

/** How big a tool's glyph is drawn on the bar. */
const TOOL_SIZE = 20;

/** The mode switch's glyphs. Same size as `TOOL_SIZE` — see the note above. */
const MODE_SIZE = 20;

/** The menu's tick, at the measure of the row it sits in. */
const CHROME_SIZE = 16;

/** The chevron, at the width of the handle it is drawn in.
 *
 *  Declared rather than left to the flex box to squash: the handle is 14px
 *  wide and an SVG asking for a different number in it was being shrunk or
 *  stretched to fit anyway, which meant the number here described nothing
 *  that was ever painted — and left the real size resting on a shrink rule
 *  rather than on a decision.
 *
 *  This alone used to be the whole story, and it wasn't enough: the chevron
 *  reads as a sliver in the corner of the sheet's 24x24 grid (see the crop on
 *  `ToolChevronIcon` below), so scaling `size` against that full square
 *  mostly scaled empty canvas. The crop is what makes this number finally
 *  land on the ink. */
const CHEVRON_SIZE = 14;

/** Every glyph this file produces carries this, sheet-drawn or borrowed
 *  alike, so a stylesheet can size or otherwise target "the toolbar's icons"
 *  as one group instead of chasing each `ToolbarIcon`'s own className. */
const ICON_CLASS = "icon-toolbar";

/** Wraps a path from the design sheet as a glyph, drawn on the sheet's own
 *  24px grid. `evenodd` is the sheet's default; the few paths drawn as one
 *  closed outline say so.
 *
 *  `viewBox` defaults to the sheet's full 24x24 — every tool glyph is drawn
 *  to use most of that square, so `size` scales a shape that already fills
 *  its box. The chevron below is the one path that doesn't: it overrides
 *  `viewBox` to a tight crop of just its own mark, because scaling a 24x24
 *  canvas that the ink barely touches scales the empty canvas, not the ink. */
function sheetIcon(
  path: string,
  rule: "evenodd" | "nonzero" = "evenodd",
  size = TOOL_SIZE,
  viewBox = "0 0 24 24"
): ToolbarIcon {
  return function SheetIcon({ className }: { className?: string }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        aria-hidden
        focusable="false"
        className={cn(ICON_CLASS, className)}
      >
        <path fill="currentColor" fillRule={rule} clipRule={rule} d={path} />
      </svg>
    );
  };
}

/** A STROKED glyph on the same 24px grid, at the weight the borrowed library
 *  outlines are drawn at.
 *
 *  One user, and it is here rather than redrawn as a filled sheet path because
 *  the glyph came with the feature: Magic Cast's screen-share mark is the same
 *  hand-normalised export the app it was ported from uses (see
 *  docs/magic-cast.md), and somebody who knows the feature there should
 *  recognise the button here. A stroke at 1.5 is what the library-borrowed
 *  tools beside it are already drawn at, so it sits in the row without
 *  reweighting. */
function strokedIcon(paths: string[], size = TOOL_SIZE): ToolbarIcon {
  return function StrokedIcon({ className }: { className?: string }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        focusable="false"
        className={cn(ICON_CLASS, className)}
      >
        {paths.map((d) => (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    );
  };
}

/** The library's outline at the weight the drawn glyphs are stroked at.
 *
 *  1.5 rather than the 1.25 these were borrowed at: a library stroke is
 *  measured on the 24px grid, so it thins with the glyph — under 24px, 1.25
 *  lands below a pixel and reads visibly lighter than the filled sheet icons
 *  beside it. 1.5 is the weight `ui/icons.tsx` draws the chrome's own 16px set
 *  at, and it holds up at the 24 the bar now draws.
 *
 *  `rotate` turns a glyph borrowed for a shape it wasn't drawn for — a plain
 *  CSS transform, so it costs nothing the renderer's own props don't already cover. */
function libraryIcon(
  glyph: IconSvgElement,
  size = TOOL_SIZE,
  rotate?: number
): ToolbarIcon {
  return function LibraryIcon({ className }: { className?: string }) {
    return (
      <HugeiconsIcon
        icon={glyph}
        size={size}
        strokeWidth={1.5}
        aria-hidden
        focusable="false"
        className={cn(ICON_CLASS, className)}
        style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      />
    );
  };
}

// ── Tools ──────────────────────────────────────────────────────────
export const MoveIcon = libraryIcon(HgMousePointer01);

export const FrameToolIcon = libraryIcon(HgFrame);

export const RectangleToolIcon = libraryIcon(HgSquare);

export const PenToolIcon = libraryIcon(HgPenTool02);

export const TextToolIcon = libraryIcon(HgType);

/** The chevron under each group's dropdown handle.
 *
 *  The mark itself only spans about x:9.6–14.4, y:11.1–13.9 of the sheet's
 *  24x24 grid — a sliver in the corner of the square everything else in this
 *  file is drawn to fill. Cropped to a box around just that mark (with a
 *  little breathing room) so `CHEVRON_SIZE` scales the chevron instead of
 *  the mostly-empty canvas around it. */
export const ToolChevronIcon = sheetIcon(
  "M9.646 11.146a.5.5 0 0 1 .708 0L12 12.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708",
  "evenodd",
  CHEVRON_SIZE,
  "8.25 10 7.5 5"
);

/** Sits in the menu against whichever tool the group currently holds. */
export const ToolCheckIcon = sheetIcon(
  "M20.354 6.646a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.708 0l-5-5a.5.5 0 0 1 .708-.708L10 16.293l9.646-9.647a.5.5 0 0 1 .708 0",
  "evenodd",
  CHROME_SIZE
);

/** Magic Cast (docs/magic-cast.md): a screen with a spark at its corner.
 *
 *  Not a plain "record" dot and not a bare monitor: the button does not record
 *  a video for the user to keep, it hands a narrated walkthrough to the
 *  assistant. The screen says what is captured and the spark says who it goes
 *  to — the same mark, path for path, as the app this feature was ported
 *  from, so the two are recognisably one feature. */
export const ScreenShareIcon = strokedIcon([
  "M18.4737 15.5215C18.4795 15.4928 18.5205 15.4928 18.5263 15.5215C18.8302 17.0081 19.9919 18.1698 21.4785 18.4737C21.5072 18.4795 21.5072 18.5205 21.4785 18.5263C19.9919 18.8302 18.8302 19.9919 18.5263 21.4785C18.5205 21.5072 18.4795 21.5072 18.4737 21.4785C18.1698 19.9919 17.0081 18.8302 15.5215 18.5263C15.4928 18.5205 15.4928 18.4795 15.5215 18.4737C17.0081 18.1698 18.1698 17.0081 18.4737 15.5215Z",
  "M3 7.5H20",
  "M12.5 20.5H10.5C6.72876 20.5 4.84315 20.5 3.67157 19.3284C2.5 18.1569 2.5 16.2712 2.5 12.5V10.5C2.5 6.72876 2.5 4.84315 3.67157 3.67157C4.84315 2.5 6.72876 2.5 10.5 2.5H12.5C16.2712 2.5 18.1569 2.5 19.3284 3.67157C20.5 4.84315 20.5 6.72876 20.5 10.5V12.5",
]);

/** The Save button, when a project writes itself only when asked.
 *
 *  Hugeicons' floppy, borrowed at the hairline weight the rest of the bar
 *  borrows at. Dated as an object and unmistakable as a mark — which is the
 *  whole job of a button that appears only in the mode where somebody has to
 *  find it without being told. */
export const SaveIcon = libraryIcon(HgSave);

export const HandToolIcon = libraryIcon(HgHand);
export const ScaleToolIcon = libraryIcon(HgScaling);
export const WebsiteToolIcon = libraryIcon(HgInternet);
/** Borrowed from the grouping tool rather than drawn for this: on its side,
 *  its two overlapping rectangles read as a frame reaching out to somebody
 *  else's page rather than a group of layers. */
export const LiveProjectToolIcon = libraryIcon(HgGroupItems, TOOL_SIZE, 90);
export const LinkToolIcon = libraryIcon(HgLink);
export const ImageToolIcon = libraryIcon(HgImagePlus);
export const VideoToolIcon = libraryIcon(HgVideo);
/** The two stacks read as the boxes they lay out: rows stacked down the glyph
 *  for a column, columns across it for a row. Which way a stack runs is the
 *  only thing separating the two tools, so it had better be the thing the
 *  glyphs differ in. */
export const StackToolIcon = libraryIcon(HgLayout2Row);
export const HorizontalStackToolIcon = libraryIcon(HgLayout2Column);
/** The ellipse, beside the library's own square for the rectangle: the pair
 *  differs in exactly the thing the two tools differ in. */
export const EllipseToolIcon = libraryIcon(HgCircle);
/** Same pair as the layers panel draws a button with, so the glyph you armed
 *  the tool by is the one the row afterwards shows. */
export const ButtonToolIcon = libraryIcon(HgCopyLink);
/** Somebody else's page, in a box of yours. Angle brackets rather than a
 *  screen: what you paste to make one is markup, or the address in it. */
export const EmbedToolIcon = libraryIcon(HgCode);
/** A canvas element. A cube: the tool draws a box a three.js scene runs in,
 *  and the same glyph names the layer in the panel afterwards. */
export const CanvasSceneToolIcon = libraryIcon(HgBox);
/** Importing a page off the web. A globe rather than an arrow into a box:
 *  what the tool asks for is an address, and what it reads is out there. It
 *  sits beside the Canvas tool because both put something on the page that
 *  is not drawn out of layers — the difference is that this one arrives as
 *  layers and stops being somebody else's the moment it lands. */
export const ImportUrlToolIcon = libraryIcon(HgGlobe);
/** A form and a field. Same pair as the layers panel draws them with, so the
 *  glyph you armed the tool by is the one the row afterwards shows. */
export const FormToolIcon = libraryIcon(HgDropdownFieldType);
export const InputToolIcon = libraryIcon(HgInputCursorText);
export const ChoicesToolIcon = libraryIcon(HgListChecks);
/** Stands in for an element the toolbar's layout doesn't name — one a
 *  plugin registered, most likely. Deliberately generic: it must not read
 *  as a tool it isn't. */
export const OtherToolIcon = libraryIcon(HgShapes);

// ── Modes ──────────────────────────────────────────────────────────
export const DrawModeIcon = sheetIcon(
  "M13.407 5.06c.61-.123 1.227-.079 1.657.343l.135.15c.277.361.316.79.208 1.204-.115.44-.397.887-.734 1.314-.68.86-1.74 1.829-2.748 2.76-1.031.952-2.01 1.867-2.606 2.662-.3.4-.466.724-.517.97-.044.21-.003.34.12.46l.065.052c.072.044.167.062.313.039.217-.034.505-.155.866-.378.72-.445 1.561-1.183 2.445-1.966.862-.763 1.768-1.571 2.57-2.076.4-.252.817-.457 1.221-.527.427-.074.87.002 1.223.346l.102.112c.22.271.296.593.266.918-.032.344-.183.684-.364.993-.363.617-.963 1.296-1.515 1.922-.574.651-1.1 1.251-1.403 1.767-.151.257-.218.449-.23.581-.01.106.012.163.072.22l.054.04c.074.038.214.062.474-.031.356-.128.853-.456 1.465-1.1a.5.5 0 0 1 .725.687c-.666.702-1.291 1.153-1.853 1.354-.535.192-1.08.173-1.485-.163l-.08-.071a1.23 1.23 0 0 1-.369-1.03c.033-.344.183-.684.364-.993.363-.617.964-1.297 1.516-1.923.574-.651 1.1-1.25 1.402-1.766.152-.258.22-.449.232-.581.007-.08-.004-.132-.035-.177l-.038-.045c-.07-.068-.162-.108-.353-.075-.213.037-.5.161-.858.388-.717.451-1.555 1.194-2.44 1.978-.862.764-1.774 1.57-2.584 2.07-.404.249-.826.45-1.237.514-.38.06-.767 0-1.095-.247l-.136-.118c-.402-.394-.502-.887-.399-1.38.097-.46.367-.923.696-1.363.663-.885 1.718-1.865 2.728-2.798 1.033-.954 2.023-1.862 2.642-2.645.31-.393.489-.71.55-.946.04-.152.028-.246-.017-.32l-.057-.069c-.082-.08-.284-.172-.76-.076-.468.094-1.091.352-1.863.803-1.537.898-3.552 2.496-5.893 4.786a.5.5 0 0 1-.699-.715c2.37-2.319 4.45-3.98 6.087-4.935.815-.476 1.55-.794 2.17-.92",
  "evenodd",
  MODE_SIZE
);

/** Design mode. Borrowed rather than drawn, same as Interact below: a
 *  pointer over a marquee is the one picture that already reads as "this
 *  selects and arranges", and the sheet has no glyph of its own for it. */
export const DesignModeIcon = libraryIcon(HgCursorEdit02, MODE_SIZE);

export const MotionModeIcon = sheetIcon(
  "M10.94 5.44a1.5 1.5 0 0 1 2.12 0l5.502 5.5a1.5 1.5 0 0 1 0 2.121l-5.501 5.502a1.5 1.5 0 0 1-2.121 0l-5.502-5.502a1.5 1.5 0 0 1 0-2.121zm1.414.706a.5.5 0 0 0-.707 0l-5.501 5.501a.5.5 0 0 0 0 .707l5.5 5.502a.5.5 0 0 0 .707 0l5.502-5.502a.5.5 0 0 0 0-.707zm-1.207 2.001a.5.5 0 0 1 .707 0l3.5 3.5a.5.5 0 0 1 0 .707l-3.5 3.5a.5.5 0 1 1-.707-.707l3.146-3.146-3.146-3.147a.5.5 0 0 1 0-.707m-2 2a.5.5 0 0 1 .707 0l1.5 1.5a.5.5 0 0 1 0 .707l-1.5 1.5a.5.5 0 1 1-.707-.707l1.146-1.146-1.146-1.147a.5.5 0 0 1 0-.707",
  "evenodd",
  MODE_SIZE
);

/** Interact mode. Borrowed rather than drawn: the sheet has no glyph for a
 *  mode it does not have, and a cursor with a press coming off it is the one
 *  picture everybody already reads as "this clicks". */
export const InteractModeIcon = libraryIcon(HgMousePointerClick, MODE_SIZE);

export const DevModeIcon = sheetIcon(
  "M13.631 6.018a.5.5 0 0 1 .367.513l-.016.1-3 11-.036.095a.5.5 0 0 1-.93-.358l3-11 .037-.095a.5.5 0 0 1 .578-.255M8.224 8.582a.501.501 0 0 1 .693.693l-.064.079L6.206 12l2.647 2.646a.5.5 0 1 1-.707.707l-3-3a.5.5 0 0 1 0-.707l3-3zm6.922.064a.5.5 0 0 1 .707 0l3 3a.5.5 0 0 1 0 .707l-3 3-.078.065a.5.5 0 0 1-.694-.693l.065-.079L17.792 12l-2.646-2.646a.5.5 0 0 1 0-.707",
  "nonzero",
  MODE_SIZE
);
