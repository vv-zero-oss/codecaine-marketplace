/**
 * Magic Cast's island and its toolbar button, ported from the canvas editor:
 *
 *   - `MagicCastPill` — `src/editor/magiccast/magic-cast/magic-cast.tsx`'s
 *     `MagicCast`, mounted the way the always-on-top overlay bar mounts it
 *     (`ShareOverlay.tsx`'s `Bar`): the recording state with mute, interact,
 *     draw and stop all wired, and the processing state the in-editor island
 *     shows after Stop (`MagicCastButton.tsx`'s `InEditorIsland`).
 *   - `MagicCastButton` — the 28px chip on the toolbar, `MagicCastButton.tsx`.
 *
 * What changed to fit a static page, and nothing else:
 *   - The theme registry (`design-tokens.ts` / `theme-context.tsx`) is gone:
 *     the editor only ever resolves its `dark` theme, so `useTheme()` is a
 *     fixed object whose colours are the `--color-ed-cast-*` tokens in
 *     editor-tokens.css. The glow's `${accent}${glowAlpha}` hex suffix ("22")
 *     is the same 13% written as a `color-mix`.
 *   - The recording's controls take no handlers; which ones are pressed comes
 *     from props (`muted`, `drawing`, `interacting`).
 *   - `elapsed` is the already formatted string (the real one formats seconds
 *     with `formatTime`, to the same `mm:ss`).
 *   - `state` names the four things a page acts out. `recording`/`paused` are
 *     the real `recording` state; `paused` is that state with the mic level at
 *     rest (the editor has no pause — a silent take is what it looks like).
 *     `transcribing` and `done` are the real `processing` state at its
 *     `transcribe` and `done` stages. `intro`/`processing` pass through as-is.
 *   - The `onclipboard` state (unreachable in the editor) and the `compact`
 *     variant (unused there) are left out.
 *   - `framer-motion` is `motion/react`, the same library under its new name.
 *   - `GLOBAL_STYLE_CSS`'s text-swap rules live in editor-tokens.css rather
 *     than in a `<style>` inside the island.
 */
import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { BorderBeam } from "border-beam";
import { cn } from "@/lib/utils";
import { ScreenShareIcon } from "./toolbar-icons";

export type MagicCastPillState =
  | "recording"
  | "paused"
  | "transcribing"
  | "done"
  | "intro"
  | "processing";

type IslandState = "intro" | "recording" | "processing";
export type ProcessingStage = "remux" | "probe" | "audio" | "transcribe" | "frames" | "settle" | "done";

/* The island's theme — the editor's `dark` theme, on tokens. */
const theme = {
  colors: {
    surface: "var(--color-ed-cast-surface)",
    surfaceHover: "var(--color-ed-cast-surface-hover)",
    textPrimary: "var(--color-ed-cast-text)",
    textSecondary: "var(--color-ed-cast-text-secondary)",
    emphasis: "var(--color-ed-cast-emphasis)",
    onEmphasis: "var(--color-ed-cast-on-emphasis)",
    danger: "var(--color-ed-cast-danger)",
    dangerBg: "var(--color-ed-cast-danger-bg)",
    accent: "var(--color-ed-cast-accent)",
  },
  font: {
    family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif',
    size: { xs: 10, sm: 11, md: 12.5, lg: 13, xl: 15, xxl: 20 },
    weight: { regular: 400, medium: 500, semibold: 600 },
  },
  radius: { sm: 6, md: 12, lg: 20, pill: 999 },
  shadow: { card: "var(--shadow-ed-cast-card)" },
};

const SPRING = {
  island: { type: "spring", stiffness: 380, damping: 34, mass: 0.9 },
} as const;

const SIZES: Record<IslandState, { w: number; h: number; r: number }> = {
  intro: { w: 336, h: 40, r: 20 },
  recording: { w: 420, h: 50, r: 25 },
  processing: { w: 280, h: 40, r: 20 },
};

const GLOW: Record<IslandState, number> = { intro: 0.55, recording: 0.7, processing: 0.45 };

const swap = {
  initial: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
  transition: { duration: 0.17, ease: [0.32, 0.72, 0, 1] },
} as const;

/* ------------------------------------------------------------------ *
 * 1D value noise — correlated neighbours read as a voice, not an EQ.
 * ------------------------------------------------------------------ */
const hash = (n: number): number => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};
const noise = (x: number): number => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
};
const fbm = (x: number): number =>
  noise(x) * 0.6 + noise(x * 2.1 + 11.3) * 0.3 + noise(x * 4.7 + 27.7) * 0.1;
const smoothstep = (a: number, b: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const LEVEL_GAIN = 2.6;

function Waveform({
  count = 28,
  color,
  height = 22,
  width = 3,
  gain = 1,
  gap,
  className = "",
  getLevel,
}: {
  count?: number;
  color: string;
  height?: number;
  width?: number;
  gain?: number;
  gap?: number;
  className?: string;
  getLevel?: () => number;
}) {
  const barGap = gap ?? width * 0.85;
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const level = useRef(new Float32Array(count));
  const gainRef = useRef(gain);
  gainRef.current = gain;
  const reduce = useReducedMotion();
  const rest = width;

  const taper = useRef(
    Array.from({ length: count }, (_, i) => Math.pow(Math.sin((Math.PI * (i + 0.5)) / count), 0.65))
  );

  useAnimationFrame((t) => {
    if (reduce) return;
    const energy = getLevel
      ? Math.max(0, Math.min(1, getLevel() * LEVEL_GAIN)) * gainRef.current
      : Math.max(0, fbm(t * 0.0045) * 1.5 - 0.18) *
        (0.12 + 0.88 * smoothstep(0.3, 0.48, fbm(t * 0.0011 + 50))) *
        gainRef.current;

    for (let i = 0; i < count; i++) {
      const el = bars.current[i];
      if (!el) continue;
      const shape = fbm(i * 0.44 + t * 0.0034);
      const target = Math.min(1, energy * (0.3 + shape * 1.15) * taper.current[i]);
      const prev = level.current[i];
      const k = target > prev ? 0.4 : 0.11;
      const v = (level.current[i] = prev + (target - prev) * k);
      el.style.height = `${(rest + (height - rest) * v).toFixed(2)}px`;
      el.style.opacity = String(0.5 + v * 0.5);
    }
  });

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ height, gap: barGap }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            bars.current[i] = el;
          }}
          style={{
            width,
            flexShrink: 0,
            height: reduce ? rest + (height - rest) * taper.current[i] * 0.6 : rest,
            borderRadius: 999,
            background: color,
            opacity: 0.5,
            willChange: "height",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Glyphs + small parts
 * ------------------------------------------------------------------ */
function MicGlyph({ color, size = 13, muted = false }: { color: string; size?: number; muted?: boolean }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 14 16" fill="none">
      <rect x="4.5" y="1" width="5" height="8.5" rx="2.5" fill={color} />
      <path d="M2 7.2v.8a5 5 0 0 0 10 0v-.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 13v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {muted && <path d="M1.5 1.5l11 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}

function IconButton({
  label,
  active,
  danger,
  pressed,
  children,
  size = 28,
}: {
  label: string;
  active?: boolean;
  danger?: boolean;
  pressed?: boolean;
  children: ReactNode;
  size?: number;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className="flex items-center justify-center transition-colors"
      style={{
        width: size,
        height: size,
        borderRadius: theme.radius.pill,
        flexShrink: 0,
        background: active ? theme.colors.emphasis : danger ? theme.colors.dangerBg : theme.colors.surfaceHover,
        color: active ? theme.colors.onEmphasis : danger ? theme.colors.danger : theme.colors.textPrimary,
      }}
    >
      {children}
    </button>
  );
}

function CloseIcon({ c = "currentColor" }: { c?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 1l8 8M9 1l-8 8" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon({ c = "currentColor", s = 11 }: { c?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 12 10" fill="none">
      <path d="M1 5.2l3.2 3.3L11 1.3" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PencilIcon({ c = "currentColor", s = 12 }: { c?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none">
      <path
        d="M8.1 1.4l2.5 2.5M1.2 8.8l6.1-6.1a1 1 0 0 1 1.4 0l1.2 1.2a1 1 0 0 1 0 1.4l-6.1 6.1-3 .6.4-3.2z"
        stroke={c}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CursorIcon({ c = "currentColor", s = 12 }: { c?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none">
      <path d="M1.5 1.5l3.5 8.5 1.3-3.7 3.7-1.3-8.5-3.5z" fill={c} stroke={c} strokeWidth="0.6" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Intro — the resting state while the capture is being acquired.
 * Shown on one line (the editor cycles four; a page drives its own).
 * ------------------------------------------------------------------ */
function IntroContent({ accent, line }: { accent: string; line: string }) {
  return (
    <div className="flex h-full items-center gap-2.5 px-4" style={{ overflow: "hidden" }}>
      <span
        className="t-text-swap"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0, flex: "1 1 auto" }}
      >
        <span style={{ display: "inline-flex", flexShrink: 0 }}>
          <MicGlyph color={accent} size={13} />
        </span>
        <span
          style={{
            fontSize: theme.font.size.md,
            fontWeight: theme.font.weight.medium,
            color: theme.colors.textPrimary,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
            flex: "1 1 auto",
          }}
        >
          {line}
        </span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Recording — the live capture, every control wired as the overlay bar
 * wires them.
 * ------------------------------------------------------------------ */
function RecordingContent({
  accent,
  elapsed,
  drawActive,
  interactActive,
  muted,
  getLevel,
  notice,
}: {
  accent: string;
  elapsed: string;
  drawActive?: boolean;
  interactActive?: boolean;
  muted?: boolean;
  getLevel?: () => number;
  notice?: string | null;
}) {
  const btn = 26;
  return (
    <div className="flex h-full flex-col justify-center gap-1 px-3.5 py-2">
      <div className="flex items-center gap-2.5">
        <IconButton label="Discard recording" danger size={btn}>
          <CloseIcon />
        </IconButton>

        <motion.span
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.86, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 8, height: 8, borderRadius: 999, background: accent, flexShrink: 0 }}
        />
        <span
          style={{
            fontSize: theme.font.size.md,
            fontWeight: theme.font.weight.medium,
            color: theme.colors.textPrimary,
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum"',
            minWidth: 38,
          }}
        >
          {elapsed}
        </span>

        <Waveform className="flex-1" count={26} color={accent} height={16} width={2} gain={1.2} getLevel={getLevel} />

        <div className="flex items-center gap-1.5">
          <IconButton
            label={muted ? "Unmute microphone" : "Mute microphone"}
            danger={muted}
            pressed={!!muted}
            size={btn}
          >
            <MicGlyph color="currentColor" size={12} muted={muted} />
          </IconButton>
          <IconButton
            label={interactActive ? "Stop interacting with the page" : "Interact with the page"}
            active={interactActive}
            pressed={!!interactActive}
            size={btn}
          >
            <CursorIcon s={11} />
          </IconButton>
          <IconButton label="Draw on screen" active={drawActive} pressed={!!drawActive} size={btn}>
            <PencilIcon s={11} />
          </IconButton>
          <IconButton label="Stop and transcribe" active size={btn}>
            <CheckIcon c={theme.colors.onEmphasis} s={11} />
          </IconButton>
        </div>
      </div>
      {notice && (
        <div
          className="max-w-[260px] px-0.5 text-2xs leading-snug"
          style={{ color: theme.colors.textSecondary }}
          role="status"
        >
          {notice}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Processing — the copy is the progress indicator.
 * ------------------------------------------------------------------ */
const PROCESSING_LABEL: Record<ProcessingStage, string> = {
  remux: "Preparing the video…",
  probe: "Reading the video…",
  audio: "Extracting audio…",
  transcribe: "Transcribing your narration…",
  frames: "Picking key moments…",
  settle: "Finishing up…",
  done: "Done",
};

function useSwap<T>(
  value: T,
  { duration = 150, reduce = false }: { duration?: number; reduce?: boolean } = {}
): [RefObject<HTMLSpanElement | null>, T] {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(value);
  const prevValue = useRef(value);

  useLayoutEffect(() => {
    if (prevValue.current === value) return;
    prevValue.current = value;
    const el = ref.current;
    if (!el || reduce) {
      setShown(value);
      return;
    }
    el.classList.add("is-exit");
    const id = setTimeout(() => {
      setShown(value);
      el.classList.add("is-enter-start");
      el.classList.remove("is-exit");
      void el.offsetWidth;
      el.classList.remove("is-enter-start");
    }, duration);
    return () => clearTimeout(id);
  }, [value, duration, reduce]);

  return [ref, shown];
}

function ProcessingContent({ accent, stage }: { accent: string; stage: ProcessingStage }) {
  const reduce = useReducedMotion();
  const spin = 16;
  const [textRef, shownStage] = useSwap(stage, { duration: 150, reduce: !!reduce });

  return (
    <div className="flex h-full items-center gap-3 px-4">
      <div className="relative" style={{ width: spin, height: spin, flexShrink: 0 }}>
        <motion.span
          className="absolute inset-0"
          style={{
            borderRadius: theme.radius.pill,
            border: `1.5px solid ${accent}`,
            borderTopColor: "transparent",
            borderRightColor: "transparent",
          }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <span
        ref={textRef}
        className="t-text-swap"
        style={{
          fontSize: theme.font.size.md,
          fontWeight: theme.font.weight.medium,
          color: theme.colors.textPrimary,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {PROCESSING_LABEL[shownStage]}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The island
 * ------------------------------------------------------------------ */
const SILENT = () => 0;

export interface MagicCastPillProps {
  state: MagicCastPillState;
  /** The recording's clock, already formatted — "00:14". */
  elapsed: string;
  muted?: boolean;
  drawing?: boolean;
  interacting?: boolean;
  /** The stage for `state="processing"`; `transcribing`/`done` set their own. */
  stage?: ProcessingStage;
  /** The line `state="intro"` shows. */
  introLine?: string;
  /** The mic-died / long-recording warning under the recording row. */
  notice?: string | null;
  /** Real 0..1 mic loudness; the decorative noise curve when absent. */
  getLevel?: () => number;
  className?: string;
}

export function MagicCastPill({
  state: requested,
  elapsed,
  muted,
  drawing,
  interacting,
  stage,
  introLine = "Say what you want to build",
  notice,
  getLevel,
  className,
}: MagicCastPillProps) {
  const state: IslandState =
    requested === "recording" || requested === "paused"
      ? "recording"
      : requested === "intro"
        ? "intro"
        : "processing";
  const processingStage: ProcessingStage =
    requested === "transcribing" ? "transcribe" : requested === "done" ? "done" : (stage ?? "remux");
  const level = requested === "paused" ? SILENT : getLevel;

  const baseSize = SIZES[state];
  const size = state === "recording" && notice ? { ...baseSize, h: baseSize.h + 30 } : baseSize;
  const accent = theme.colors.accent;
  const cfg = { ...size, accent, glow: GLOW[state] };

  const radius = useSpring(cfg.r, SPRING.island);
  const [beamRadius, setBeamRadius] = useState(cfg.r);
  useLayoutEffect(() => radius.set(cfg.r), [cfg.r, radius]);
  useMotionValueEvent(radius, "change", (v) => {
    const r = Math.round(v);
    setBeamRadius((prev) => (prev === r ? prev : r));
  });

  const label = { intro: "Ready to record", recording: "Recording", processing: "Processing" }[state];

  return (
    <BorderBeam
      size="md"
      colorVariant="ocean"
      theme="dark"
      duration={2.6}
      saturation={2}
      brightness={1.6}
      borderRadius={beamRadius}
      active
      className={className}
      style={{ display: "inline-flex", borderRadius: beamRadius }}
    >
      <motion.div
        animate={{ width: cfg.w, height: cfg.h, borderRadius: cfg.r }}
        initial={false}
        transition={SPRING.island}
        role="status"
        aria-live="polite"
        aria-label={label}
        style={{
          background: theme.colors.surface,
          overflow: "hidden",
          position: "relative",
          boxShadow: theme.shadow.card,
          WebkitFontSmoothing: "antialiased",
          fontFamily: theme.font.family,
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: cfg.glow }}
          transition={{ duration: 0.35 }}
          style={{
            background: `radial-gradient(120% 160% at 50% 130%, color-mix(in srgb, ${cfg.accent} 13%, transparent), transparent 70%)`,
          }}
        />

        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={state} {...swap} className="h-full">
            {state === "intro" && <IntroContent accent={cfg.accent} line={introLine} />}
            {state === "recording" && (
              <RecordingContent
                accent={cfg.accent}
                elapsed={elapsed}
                drawActive={drawing}
                interactActive={interacting}
                muted={muted}
                getLevel={level}
                notice={notice}
              />
            )}
            {state === "processing" && <ProcessingContent accent={cfg.accent} stage={processingStage} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </BorderBeam>
  );
}

/**
 * The toolbar's Magic Cast chip, with the divider the toolbar draws before it.
 * Blue while a capture runs — the toolbar's own accent, as the editor has it.
 */
export function MagicCastButton({
  active = false,
  divider = true,
}: {
  active?: boolean;
  /** The rule the toolbar draws before the button. */
  divider?: boolean;
}) {
  const label = active
    ? "Magic Cast: recording — click to stop"
    : "Magic Cast — record your screen and narration for the assistant";
  return (
    <>
      {divider && <span className="mx-1 h-7 w-px bg-ed-toolbar-divider" aria-hidden />}
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        className={cn(
          "flex size-7 items-center justify-center rounded-full border-[3px] border-transparent",
          "transition-colors focus-visible:border-ed-toolbar-ink focus-visible:outline-none",
          active ? "bg-ed-toolbar-accent text-ed-toolbar-ink" : "text-ed-toolbar-ink hover:bg-ed-toolbar-ink/10"
        )}
      >
        <ScreenShareIcon />
      </button>
    </>
  );
}
