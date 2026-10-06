import { asset } from "@/lib/media";
import { Link, usePathname } from "@/lib/router";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/brand", label: "Design system" },
  { href: "/shadcn", label: "shadcn/ui" },
] as const;

/** The design-system pages' header: the mark back to the homepage, the two
 *  system pages, and the theme toggle. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="w-full">
      <div className="container-nav">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            href="/"
            className="flex h-9 shrink-0 items-center gap-1.5 text-fg no-underline"
            aria-label="Codecaine home"
          >
            <img className="size-6" src={asset("landing/codecaine-pup.png")} alt="" width={24} height={24} />
            <span className="hidden text-md font-medium tracking-display whitespace-nowrap sm:inline">
              Codecaine<span className="text-fg-muted"> DS</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                className="nav-pill"
                href={item.href}
                aria-current={pathname === item.href || (item.href === "/brand" && pathname === "/design-system") ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link className="btn btn-soft btn-pill" href="/">
            Homepage
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
