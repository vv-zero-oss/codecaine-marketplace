import { cn } from "@/lib/utils"

/**
 * The logo, twice: a link in the header, plain text in the footer.
 *
 * Both render the same mark and the same word, and the element each one is the
 * root of differs — which is what `as` is deciding. `scaffold/` writes the two
 * out longhand, five hundred lines apart.
 */
export function Wordmark({ href, className }: { href?: string; className?: string }) {
  const content = (
    <>
      <span className="size-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600" />
      Quartz
    </>
  )
  const shared = cn("flex items-center gap-2 font-semibold tracking-tight", className)
  if (href) {
    return (
      <a href={href} className={shared}>
        {content}
      </a>
    )
  }
  return <span className={shared}>{content}</span>
}
