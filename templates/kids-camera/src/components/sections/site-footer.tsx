import { Container } from "@/components/ui/container"
import { brand, footer } from "@/content"

export function SiteFooter() {
  return (
    <footer className="bg-paper pt-2 pb-5">
      <Container className="grid grid-cols-2 items-center gap-y-2 text-ui text-ink md:grid-cols-3">
        <p>
          {brand.studioName}
          <span className="block text-muted md:ml-3 md:inline">{footer.credit}</span>
        </p>
        <a href={`mailto:${brand.email}`} className="order-3 col-span-2 underline-offset-4 md:order-none md:col-span-1 md:text-center [@media(hover:hover)]:hover:underline">
          {brand.email}
        </a>
        <nav aria-label="Footer" className="flex justify-end gap-6">
          {footer.links.map((link) => (
            <a key={link.label} href={link.href} className="underline-offset-4 [@media(hover:hover)]:hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
