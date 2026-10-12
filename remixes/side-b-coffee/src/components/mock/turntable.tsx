import { useCanvasAction } from "@canvas/react"

import { TRACKS, radio, useRadio } from "@/lib/radio"
import { cn } from "@/lib/utils"

/**
 * The bar's turntable, and it plays. Press the platter (or the start
 * button) and the tonearm swings in over 600ms, the record spins up at
 * 33⅓, and the shop radio starts the record on the platter. Lift it and the
 * arm swings home and the platter coasts to a stop.
 *
 * The spin is a CSS animation (paused, not removed, so the record stops
 * where it is instead of snapping back), so the editor's Motion switch and
 * reduced motion both hold it still.
 */
export function Turntable({ className }: { className?: string }) {
  const { playing, trackIndex } = useRadio()
  const track = TRACKS[trackIndex]
  useCanvasAction("Needle down", (next) => ((next ?? !playing) ? radio.play(trackIndex) : radio.pause()), {
    on: playing,
    group: "Listening bar",
  })

  return (
    <div className={cn("relative aspect-[5/4] w-full select-none", className)}>
      <svg viewBox="0 0 500 400" className="h-full w-full" role="img" aria-label={`Turntable — ${playing ? "playing" : "stopped"}: ${track.title}`}>
        <defs>
          <linearGradient id="tt-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-wood)" />
            <stop offset="1" stopColor="var(--color-wood-deep)" />
          </linearGradient>
          <radialGradient id="tt-vinyl">
            <stop offset="0.3" stopColor="var(--color-vinyl-hi)" />
            <stop offset="1" stopColor="var(--color-vinyl-lo)" />
          </radialGradient>
        </defs>
        {/* plinth */}
        <rect x="10" y="14" width="480" height="372" rx="18" fill="url(#tt-wood)" />
        <rect x="10" y="14" width="480" height="372" rx="18" fill="none" stroke="var(--color-cocoa)" strokeOpacity="0.15" />
        <rect x="24" y="28" width="452" height="344" rx="10" fill="var(--color-deck)" />
        {/* platter */}
        <circle cx="200" cy="200" r="158" fill="var(--color-chrome-mid)" />
        <circle cx="200" cy="200" r="150" fill="var(--color-vinyl)" />
        {/* the record */}
        <g
          className="animate-spin-record"
          style={{ transformBox: "fill-box", transformOrigin: "center", animationPlayState: playing ? "running" : "paused" }}
        >
          <circle cx="200" cy="200" r="146" fill="url(#tt-vinyl)" />
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx="200" cy="200" r={62 + i * 6} fill="none" stroke="var(--color-white)" strokeOpacity={i % 3 === 0 ? 0.08 : 0.035} />
          ))}
          <path d="M200 54 A146 146 0 0 1 330 130" fill="none" stroke="var(--color-white)" strokeOpacity="0.14" strokeWidth="18" />
          <circle cx="200" cy="200" r="50" fill={track.label} />
          <circle cx="200" cy="200" r="50" fill="none" stroke={track.sleeve} strokeWidth="5" />
          <text x="200" y="186" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="14" fill="var(--color-ink)">side b</text>
          <text x="200" y="220" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.6" letterSpacing="0.6" fill="var(--color-ink)">
            {track.title.toUpperCase().split(" (")[0].slice(0, 22)}
          </text>
          <text x="200" y="229" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="4.6" letterSpacing="0.5" fill="var(--color-ink)" opacity="0.75">
            {track.artist.toUpperCase().slice(0, 26)}
          </text>
          <circle cx="200" cy="200" r="4" fill="var(--color-chrome)" />
        </g>
        {/* the button that is the record: press to drop the needle */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="transparent"
          className="cursor-pointer"
          onClick={() => radio.toggle()}
          role="button"
          aria-label={playing ? "Lift the needle" : "Drop the needle"}
        />
        {/* tonearm */}
        <circle cx="410" cy="74" r="26" fill="var(--color-chrome)" />
        <circle cx="410" cy="74" r="12" fill="var(--color-chrome-low)" />
        <g
          style={{
            transformOrigin: "410px 74px",
            transform: `rotate(${playing ? 26 : 0}deg)`,
            transition: "transform 600ms var(--ease-in-out-strong)",
          }}
        >
          <path d="M410 74 L414 250 Q414 280 392 300" fill="none" stroke="var(--color-chrome-hi)" strokeWidth="7" strokeLinecap="round" />
          <rect x="378" y="292" width="26" height="34" rx="4" transform="rotate(38 391 309)" fill="var(--color-chrome)" />
          <rect x="400" y="40" width="20" height="26" rx="3" fill="var(--color-chrome-low)" />
        </g>
        {/* speed + start */}
        <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-chrome)">
          <text x="380" y="352">33⅓</text>
          <circle cx="446" cy="348" r="4" fill={playing ? "var(--color-honey)" : "var(--color-chrome-off)"} />
        </g>
        <g onClick={() => radio.toggle()} className="cursor-pointer" role="button" aria-label="Start / stop">
          <rect x="44" y="330" width="62" height="26" rx="4" fill={playing ? "var(--color-rust)" : "var(--color-chrome-off)"} />
          <text x="75" y="347" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--color-page)">
            {playing ? "STOP" : "START"}
          </text>
        </g>
      </svg>
    </div>
  )
}
