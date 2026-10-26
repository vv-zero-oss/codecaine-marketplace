import { Globe } from "lucide-react"

import { SOCIAL_MARKS } from "@/components/brand-marks"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wordmark } from "@/components/ui/wordmark"
import { FOOTER, LANGUAGES, LEGAL } from "@/content"
import { Link } from "@/lib/router"

/** Five link columns, social marks, a language picker, legal links and credits. */
export function SiteFooter() {
  return (
    <footer className="pt-20 pb-12 text-[14.5px] sm:pt-24">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {FOOTER.map((column, index) => (
            <div key={index} className="flex flex-col gap-10">
              {column.groups.map((group) => (
                <FooterGroup key={group.title} title={group.title} links={group.links} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <Eyebrow className="mb-4">Social</Eyebrow>
            <ul className="flex gap-1">
              {SOCIAL_MARKS.map((mark) => (
                <li key={mark.id}>
                  <a
                    href={mark.href}
                    aria-label={mark.name}
                    className="-ml-2.5 inline-flex size-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-(--duration-fast) first:ml-0 hover:bg-surface hover:text-ink sm:size-10"
                  >
                    <svg viewBox="0 0 24 24" className="size-[17px]" aria-hidden dangerouslySetInnerHTML={{ __html: mark.body }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <LanguagePicker />
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13.5px] text-ink-2">
          <Wordmark className="mr-2 text-lg text-ink" />
          <span>© 2026 Orra Payments B.V.</span>
          {LEGAL.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-ink">
              {item}
            </a>
          ))}
        </div>
        <p className="mt-8 max-w-5xl text-[13px] leading-relaxed text-ink-4">
          Orra Payments B.V. is the fictional company this template is written for. Replace this paragraph with your
          own licensing and regulatory disclosure. Photography from{" "}
          <a href="https://www.pexels.com" className="underline underline-offset-2 hover:text-ink-2">
            Pexels
          </a>
          ; payment and social marks from Simple Icons.
        </p>
      </Container>
    </footer>
  )
}

export function FooterGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <Eyebrow className="mb-4">{title}</Eyebrow>
      <ul className="flex flex-col gap-1.5">
        {links.map((link) => (
          <li key={link}>
            {link === "Brand guidelines" ? (
              <Link href="/brand" className="text-ink transition-colors hover:text-ember-deep">
                {link}
              </Link>
            ) : (
              <a href="#" className="text-ink transition-colors hover:text-ember-deep">
                {link}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LanguagePicker() {
  return (
    <div className="w-full sm:w-64">
      <Eyebrow className="mb-4">Location and language</Eyebrow>
      <Select defaultValue="English">
        <SelectTrigger aria-label="Language" className="h-11 w-full rounded-md border-line-strong text-[15px] sm:h-9">
          <span className="flex items-center gap-2.5">
            <Globe className="size-4 text-ink-3" strokeWidth={1.5} />
            <SelectValue />
          </span>
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
