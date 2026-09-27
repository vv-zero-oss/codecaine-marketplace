/**
 * The editor's chrome icons, ported from canvas `src/editor/ui/icons.tsx`.
 *
 * Only the wrapper and the glyphs the ported components draw: the same
 * Hugeicons drawings, under the same names, at the editor's 16px on a 1.5px
 * stroke. Hugeicons puts `stroke-width` on every path, so a Tailwind
 * `stroke-[…]` class does nothing — pass `strokeWidth` as a prop instead.
 */
import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowUpIcon as HgArrowUp,
  ChevronDownIcon as HgChevronDown,
  ChevronRightIcon as HgChevronRight,
  CircleCheckIcon as HgCircleCheck,
  CopyIcon as HgCopy,
  CrosshairIcon as HgCrosshair,
  FrameIcon as HgFrame,
  AppWindowIcon as HgAppWindow,
  MonitorPlayIcon as HgMonitorPlay,
  InfoIcon as HgInfo,
  MicIcon as HgMic,
  MicOffIcon as HgMicOff,
  ParagraphIcon as HgParagraph,
  SparklesIcon as HgSparkles,
  TriangleAlertIcon as HgTriangleAlert,
  XIcon as HgX,
} from "@hugeicons/core-free-icons";

/** Everything `HugeiconsIcon` takes except the drawing itself. */
type EditorIconProps = Omit<HugeiconsProps, "icon" | "altIcon">;

function editorIcon(glyph: IconSvgElement) {
  return function EditorIcon(props: EditorIconProps) {
    return <HugeiconsIcon icon={glyph} size={16} strokeWidth={1.5} aria-hidden {...props} />;
  };
}

// ── Layer types ────────────────────────────────────────────────────
export const FrameIcon = editorIcon(HgFrame);
export const WebpageIcon = editorIcon(HgAppWindow);
export const LiveProjectIcon = editorIcon(HgMonitorPlay);

// ── Chrome ─────────────────────────────────────────────────────────
export const ChevronIcon = editorIcon(HgChevronDown);
export const ChevronRightIcon = editorIcon(HgChevronRight);
export const CloseIcon = editorIcon(HgX);
export const DuplicateIcon = editorIcon(HgCopy);
export const TextContentIcon = editorIcon(HgParagraph);
export const InfoIcon = editorIcon(HgInfo);
export const MissingFontIcon = editorIcon(HgTriangleAlert);

// ── The assistant ──────────────────────────────────────────────────
export const AiIcon = editorIcon(HgSparkles);
export const AiDoneIcon = editorIcon(HgCircleCheck);
export const SendIcon = editorIcon(HgArrowUp);
export const MicIcon = editorIcon(HgMic);
export const MicOffIcon = editorIcon(HgMicOff);
export const LocateIcon = editorIcon(HgCrosshair);
