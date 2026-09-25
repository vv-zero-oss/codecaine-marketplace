import { Container } from "@/components/ui/container"
import { navigation, studio } from "@/content"
import { Link } from "@/router"

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-ink/10">
      <Container className="grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">{studio.name}</p>
          <p className="mt-2 text-sm text-ink-600">{studio.location}</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm text-ink-600">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-sm text-ink-600 md:items-end">
          <a href={`mailto:${studio.email}`} className="hover:text-ink">{studio.email}</a>
          <span>{studio.phone}</span>
          <span>{studio.instagram}</span>
        </div>
      </Container>
      <Container className="pb-10 text-xs text-ink-400">
        © {new Date().getFullYear()} {studio.name}. All photographs are the photographer's own.
      </Container>
    </footer>
  )
}
