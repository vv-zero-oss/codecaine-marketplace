/**
 * The icon set the page uses, lifted verbatim from the original markup.
 * Every path is `currentColor` / `stroke-width: 1.5–1.6` so icons inherit the
 * text token of whatever control they sit in — no icon carries a color.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 18 20.2947" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0L12.5409 1.99176L11.5604 3.73491L10 2.8572V5.14735H8V2.8572L6.43962 3.73491L5.45909 1.99176L9 0ZM14.3613 3.01571L18 5.0625V9.14735H16V7.3794L14.0359 8.51337L13.0359 6.78132L14.9804 5.65867L13.3807 4.75886L14.3613 3.01571ZM4.61925 4.75887L3.01961 5.65867L4.9641 6.78132L3.9641 8.51337L2 7.3794L2 9.14735H0L1.54972e-06 5.0625L3.63873 3.01572L4.61925 4.75887ZM2 11.1473V12.9153L3.9641 11.7813L4.9641 13.5134L3.01961 14.636L4.61925 15.5358L3.63873 17.279L3.57628e-07 15.2322V11.1473H2ZM18 11.1473V15.2322L14.3613 17.279L13.3807 15.5358L14.9804 14.636L13.0359 13.5134L14.0359 11.7813L16 12.9153V11.1473H18ZM10 15.1473V17.4375L11.5604 16.5598L12.5409 18.3029L9 20.2947L5.45908 18.3029L6.43961 16.5598L8 17.4375V15.1473H10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0981 9.51337L10 10.7247V13.1474H8V10.7247L5.90192 9.51337L6.90192 7.78132L9 8.99265L11.0981 7.78132L12.0981 9.51337Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 17" fill="currentColor" aria-hidden {...props}>
      <path d="M12.4041 1.39726H14.6953L9.69087 7.2591L15.5781 15.2368H10.9696L7.35741 10.3996L3.22921 15.2368H0.934687L6.28641 8.96575L0.642598 1.39726H5.36795L8.62962 5.81859L12.4041 1.39726ZM11.5992 13.8329H12.8682L4.67667 2.72798H3.31359L11.5992 13.8329Z" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M13.5 9.2A5.5 5.5 0 016.8 2.5a5.5 5.5 0 106.7 6.7z" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth={1.4} />
      <path
        d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1M12.9 12.9l-1.1-1.1M4.2 4.2L3.1 3.1"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M4.5 6.5L8 10l3.5-3.5" {...stroke} />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M6 4l4 4-4 4" {...stroke} strokeWidth={1.5} />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M4 8.43l2.46 2.76L12 4.97" {...stroke} strokeWidth={1.5} />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M8.67 9.33l-2-2M10.01 2.33v-1M12.63 3.37l.71-.7M12.63 8.67l.71.7M7.34 3.37l-.71-.7M13.67 6h1M4.09 13.91l6.16-6.16c.26-.26.39-.4.44-.55a.7.7 0 000-.41c-.05-.16-.18-.29-.44-.55l-.5-.5c-.26-.26-.39-.39-.54-.44a.7.7 0 00-.41 0c-.16.05-.29.18-.55.44L2.09 11.9c-.27.27-.4.4-.45.55a.7.7 0 000 .41c.05.16.18.29.44.55l.5.5c.26.26.39.39.54.44.14.04.28.04.41 0 .16-.05.29-.18.55-.44z"
        {...stroke}
      />
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth={1.6} />
      <path
        d="M12.5 9.8a1 1 0 00.2.6l.04.04a1.2 1.2 0 11-1.7 1.7l-.04-.04a1 1 0 00-1.1-.2 1 1 0 00-.6.92v.1a1.2 1.2 0 11-2.42 0v-.06a1 1 0 00-.65-.9 1 1 0 00-1.1.2l-.04.05a1.2 1.2 0 11-1.71-1.71l.04-.04a1 1 0 00.2-1.1 1 1 0 00-.91-.6h-.11a1.2 1.2 0 010-2.43h.06a1 1 0 00.9-.65 1 1 0 00-.2-1.1l-.05-.04a1.2 1.2 0 111.71-1.71l.04.04a1 1 0 001.1.2h.05a1 1 0 00.6-.91v-.11a1.2 1.2 0 012.42 0v.06a1 1 0 00.6.9 1 1 0 001.1-.2l.04-.05a1.2 1.2 0 111.71 1.71l-.04.04a1 1 0 00-.2 1.1v.05a1 1 0 00.92.6h.1a1.2 1.2 0 010 2.42h-.06a1 1 0 00-.9.6z"
        {...stroke}
      />
    </svg>
  );
}

export function DotsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <circle cx="8" cy="3.3" r="1.3" />
      <circle cx="8" cy="8" r="1.3" />
      <circle cx="8" cy="12.7" r="1.3" />
    </svg>
  );
}

export function CaretIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M4 6l4 4 4-4" {...stroke} />
    </svg>
  );
}

export function CollapseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M4 6.5L8 10l4-3.5" {...stroke} />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M5.6 5.6V3.92c0-.67 0-1.01.13-1.26.12-.23.3-.41.53-.53.26-.13.6-.13 1.27-.13h4.56c.67 0 1.01 0 1.26.13.23.12.42.3.53.53.13.26.13.6.13 1.26v4.56c0 .67 0 1.01-.13 1.26-.12.23-.3.42-.53.53-.26.13-.6.13-1.26.13H10.4M3.92 14h4.56c.67 0 1.01 0 1.26-.13.23-.12.42-.3.53-.53.13-.26.13-.6.13-1.26V7.52c0-.67 0-1.01-.13-1.26a1.2 1.2 0 00-.53-.53c-.26-.13-.6-.13-1.26-.13H3.92c-.67 0-1.01 0-1.26.13-.23.12-.42.3-.53.53-.13.26-.13.6-.13 1.26v4.56c0 .67 0 1.01.13 1.26.12.23.3.42.53.53.26.13.6.13 1.26.13z"
        {...stroke}
        strokeWidth={1.5}
      />
    </svg>
  );
}

export function RescanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M9.2 12.75s.52-.07 2.67-2.18a5.09 5.09 0 000-7.64 5.1 5.1 0 00-2.67-1.45M9.2 9.15v3.6h3.67M6.76.75s-.52.07-2.67 2.18a5.09 5.09 0 000 7.64 5.1 5.1 0 002.67 1.45M6.76 4.35V.75H3.1"
        {...stroke}
        strokeWidth={1.5}
      />
    </svg>
  );
}
