import { AtSign, Mail } from "lucide-react"

import { Doodle } from "@/components/mock/doodles"
import { Marquee } from "@/components/motion/marquee"
import { Logo } from "@/components/site/logo"
import { MusicPlayer } from "@/components/site/now-playing"
import { CAFES, CONTACT, INSTA } from "@/content/site"
import { photo } from "@/lib/photos"
import { Link } from "@/lib/router"

const COLUMNS = [
  { title: "Shop", links: [["Coffee", "/shop"], ["Subscriptions", "/subscribe"], ["Merch", "/shop?filter=merch"], ["Gift a bag", "/subscribe"]] },
  { title: "Side B", links: [["Our story", "/story"], ["The bars", "/story#bars"], ["Wholesale", "/#wholesale"], ["Brand guidelines", "/brand"]] },
] as const

/**
 * The footer is a cream card set in a rust frame: the stacked wordmark,
 * two columns of links, the shop radio (it plays), the bars' addresses —
 * then a strip of photos from the bars drifting past under a speech bubble,
 * and a cocoa line with the small print and the photo credits.
 */
export function SiteFooter() {
  return (
    <footer className="bg-rust px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="grid gap-10 rounded-(--radius-panel) bg-panel p-6 shadow-(--shadow-card) sm:p-8 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:gap-8 lg:p-10">
        <div className="flex flex-col justify-between gap-10">
          <Logo stacked />
          <div className="space-y-3">
            <span className="type-label inline-block rounded-(--radius-chip) bg-cocoa px-1.5 py-0.5 text-[11px] text-page">Visit us</span>
            <div className="grid gap-6 text-[15px] text-ink sm:grid-cols-2">
              {CAFES.map((cafe) => (
                <p key={cafe.id}>
                  {cafe.name}
                  <br />
                  <span className="text-ink-2">{cafe.street}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 content-between gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="type-label text-[12.5px] text-ink">{col.title}</p>
              <ul className="mt-3 space-y-1.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-[15px] text-ink-2 transition-colors hover:text-rust">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 flex flex-wrap items-center gap-4 text-[15px] text-ink-2">
            <a href="#instagram" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-rust">
              <AtSign className="size-4" /> {CONTACT.instagram}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-rust">
              <Mail className="size-4" /> {CONTACT.email}
            </a>
          </div>
        </div>

        <MusicPlayer />
      </div>

      <div id="instagram" className="flex items-center gap-4 py-5">
        <div className="hidden shrink-0 items-center gap-2 pl-2 text-page sm:flex">
          <Doodle name="cup" className="w-16 text-page" />
          <span className="type-label relative rounded-[50%] bg-page px-5 py-3 text-center text-[10.5px] leading-tight text-rust">
            Follow us
            <br />
            on the 'gram
          </span>
        </div>
        <Marquee speed={70} className="min-w-0 flex-1 [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
          {INSTA.map((id) => (
            <a key={id} href="#instagram" className="mr-3 block size-[104px] shrink-0 overflow-hidden rounded-(--radius-chip) sm:size-[120px]">
              <img src={photo(id, 300)} alt="A moment from the bars" loading="lazy" className="size-full object-cover transition-transform duration-500 ease-(--ease-out-strong) hover:scale-105" />
            </a>
          ))}
        </Marquee>
      </div>

      <div className="-mx-2 flex flex-wrap items-center justify-between gap-2 bg-cocoa px-4 py-3 font-mono text-[11px] tracking-[0.08em] text-page/80 uppercase sm:-mx-4 sm:px-6">
        <span>© 2026 Side B Coffee</span>
        <span className="normal-case tracking-normal">Photography from Pexels · Type from Google Fonts</span>
      </div>
    </footer>
  )
}
