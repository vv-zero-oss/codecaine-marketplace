import type * as React from "react"

/** An underlined text link with an arrow — the page's tertiary action. */
export function ArrowLink({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group/link inline-flex items-center gap-1 text-[17px] text-fg underline decoration-line-button underline-offset-[6px] transition-colors hover:decoration-fg md:text-[21px]"
    >
      {children}
      <span aria-hidden className="transition-transform duration-200 ease-out-quint group-hover/link:translate-x-1">
        →
      </span>
    </a>
  )
}
