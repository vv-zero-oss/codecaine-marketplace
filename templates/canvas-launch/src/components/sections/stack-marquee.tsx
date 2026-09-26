/*
 * The stacks a framed project can be running, as a slow marquee. Logos are
 * SVGL's (public/logos/), set in one ink so the row reads as a single strip.
 */
const STACK: { logo: string; name: string; wordmark?: boolean }[] = [
  { logo: "nextjs_logo_light.svg", name: "Next.js", wordmark: true },
  { logo: "vite.svg", name: "Vite" },
  { logo: "react_wordmark_light.svg", name: "React", wordmark: true },
  { logo: "astro-wordmark-light.svg", name: "Astro", wordmark: true },
  { logo: "svelte.svg", name: "Svelte" },
  { logo: "nuxt-wordmark-light.svg", name: "Nuxt", wordmark: true },
  { logo: "vue.svg", name: "Vue" },
  { logo: "remix_wordmark_light.svg", name: "Remix", wordmark: true },
  { logo: "tailwindcss-wordmark.svg", name: "Tailwind CSS", wordmark: true },
  { logo: "angular.svg", name: "Angular" },
  { logo: "solidjs.svg", name: "Solid" },
  { logo: "storybook.svg", name: "Storybook" },
]

export function StackMarquee() {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <ul className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {[...STACK, ...STACK].map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= STACK.length}
            className="flex h-8 shrink-0 items-center gap-2 px-[clamp(20px,2.4vw,34px)] text-[19px] font-semibold tracking-[-0.02em] text-ink"
          >
            <img
              src={`/logos/${item.logo}`}
              alt={item.wordmark ? item.name : ""}
              className={item.wordmark ? "h-[22px] w-auto brightness-0 dark:invert" : "size-[22px] brightness-0 dark:invert"}
            />
            {!item.wordmark && <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
