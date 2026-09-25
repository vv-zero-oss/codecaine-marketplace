import { BrandLogo } from "@/components/blocks/brand-logo"
import { Wordmark } from "@/components/blocks/wordmark"
import { brand, footer } from "@/content"

/** The dark, rounded slab the page ends on, inset from the window edge. */
export function Footer() {
  return (
    <footer className="p-2 sm:p-3">
      <div className="rounded-footer bg-footer px-6 pt-14 pb-8 text-white sm:px-10 lg:px-16 lg:pt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[10rem_1fr]">
          <Wordmark name={brand.name} className="text-white" />
          <nav className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] text-white/40">{col.title}</p>
                <ul className="mt-3 grid gap-1">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-flex min-h-8 items-center text-[13px] text-white/85 transition-colors duration-150 hover:text-white max-md:min-h-11"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 lg:mt-28">
          <a
            href="#"
            className="pressable inline-flex h-10 w-fit items-center gap-2 rounded-md bg-black px-3 ring-1 ring-white/25 hover:ring-white/50"
          >
            <BrandLogo name="apple" className="size-5 invert" />
            <span className="leading-none">
              <span className="block text-[8px]">{footer.appStore.small}</span>
              <span className="block text-[14px] font-semibold tracking-[-0.01em]">{footer.appStore.big}</span>
            </span>
          </a>
          <p className="text-[11px] text-white/40">
            {footer.copyright} {footer.credit}
          </p>
        </div>
      </div>
    </footer>
  )
}
