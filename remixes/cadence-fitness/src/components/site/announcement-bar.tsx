import { ChevronRight, X } from "lucide-react"

/**
 * The Spruce strip above everything: one line about what is new, and a way to
 * make it go away. The App owns whether it is showing, since the header sits
 * lower while it is.
 */
export function AnnouncementBar({
  message = "New: a recovery score on your wrist every morning",
  href = "#features",
  onDismiss,
}: {
  message?: string
  href?: string
  onDismiss?: () => void
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-(--banner-height) items-center justify-center bg-action-banner px-12 text-linen-mist">
      <a
        href={href}
        className="group inline-flex items-center gap-1 truncate text-[14px] font-medium tracking-[-0.005em] hover:text-white/90"
      >
        {message}
        <ChevronRight className="size-3.5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5" strokeWidth={2.6} />
      </a>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1.5 grid size-9 place-items-center rounded-(--radius-button) text-white/90 transition-colors hover:bg-white/12 hover:text-white active:scale-[0.94]"
      >
        <X className="size-4" strokeWidth={2.4} />
      </button>
    </div>
  )
}
