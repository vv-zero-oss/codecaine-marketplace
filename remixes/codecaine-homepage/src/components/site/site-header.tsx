import { Link } from "@/lib/router";
import { GitHubIcon, LogoMark, XIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/design-system", label: "Transitions" },
  { href: "/shadcn", label: "shadcn/ui" },
] as const;

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="container-nav">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            href="/design-system"
            className="flex h-9 shrink-0 items-center gap-1 text-fg no-underline"
            aria-label="Transitions.dev home"
          >
            <span className="inline-flex size-6 items-center justify-center" aria-hidden>
              <LogoMark className="h-[20px] w-[18px]" />
            </span>
            <span className="hidden text-md font-medium tracking-display whitespace-nowrap sm:inline">
              Transitions<span className="text-fg-muted">.dev</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.href} className="nav-pill" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            className="btn btn-soft btn-pill"
            href="https://github.com/Jakubantalik/transitions.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">1.2k</span>
          </a>

          <a
            className="btn btn-icon btn-soft btn-pill"
            href="https://x.com/jakubantalik"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <XIcon />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
