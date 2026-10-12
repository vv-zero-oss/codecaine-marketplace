import { useEffect, useState } from "react"

import { InsidersDialog } from "@/components/site/insiders-dialog"
import { ContrailMark } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import { FOOTER, OFFICES } from "@/content/site"
import { Link } from "@/lib/router"

/** A city's local time, ticking once a minute. */
export function useLocalTime(tz: string) {
  const format = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tz])
  return time
}

/** One office: the city and its time now, on a little dial whose hand points
 *  at the hour. */
function OfficeClock({ city, tz }: { city: string; tz: string }) {
  const time = useLocalTime(tz)
  const [h, m] = time.split(":").map(Number)
  const angle = ((h % 12) + m / 60) * 30
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 36 36" className="size-9 rounded-[10px] shadow-(--shadow-card)" aria-hidden>
        <rect width={36} height={36} rx={10} fill="var(--color-map-sea)" />
        <circle cx={18} cy={18} r={11} fill="var(--color-map-land)" />
        <line x1={18} y1={18} x2={18} y2={10} stroke="var(--color-ink)" strokeWidth={2} strokeLinecap="round" transform={`rotate(${angle} 18 18)`} />
        <circle cx={18} cy={18} r={2} fill="var(--color-ink)" />
      </svg>
      <span className="leading-tight">
        <span className="block font-medium text-ink">{city}</span>
        <span className="block font-mono text-[12px] text-ink-3 tabular-nums">{time}</span>
      </span>
    </span>
  )
}

export function SiteFooter() {
  return (
    <footer data-theme="day" className="bg-panel pt-20 pb-10 text-[15px]">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <div>
            <ContrailMark className="size-12" />
            <p className="mt-5 max-w-[26ch] text-ink-2">The flight tracker that tells you first — and tells you why.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER.map((col) => (
              <div key={col.title}>
                <p className="font-semibold text-ink">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href === "#insiders" ? (
                        <InsidersDialog>
                          <button type="button" className="inline-flex min-h-8 items-center text-ink-2 transition-colors duration-(--duration-hover) hover:text-ink">
                            {link.label}
                          </button>
                        </InsidersDialog>
                      ) : (
                        <Link href={link.href} className="inline-flex min-h-8 items-center text-ink-2 transition-colors duration-(--duration-hover) hover:text-ink">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6 border-t border-line-strong pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-ink-3">
            © 2026 Contrail Labs. Photography from{" "}
            <a href="https://www.pexels.com" className="underline decoration-line-strong underline-offset-2 hover:text-ink">Pexels</a>. Maps from Natural Earth.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-ink-2">
            <span>Made with care in</span>
            {OFFICES.map((o) => (
              <OfficeClock key={o.city} city={o.city} tz={o.tz} />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
