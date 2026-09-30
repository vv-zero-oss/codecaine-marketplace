/**
 * Overtime — issue twelve of a long-read sports quarterly, as four views of
 * the same eighty-four athletes:
 *
 *   /             the grid: every portrait on an endless, draggable sheet (WebGL)
 *   /list         the same people as a list, at night
 *   /gallery      each portrait full screen, one after another
 *   /story/:slug  one person: their story, their portrait, their album
 *   /about        the project, and the volunteers who recorded it
 *   /brand        the style guide: tokens, type, motion and every component
 *
 * Every word is in `content.ts`; every photograph id is in `photos.ts`.
 */

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"

import { findPerson } from "@/content"
import { ease } from "@/lib/motion"
import { matchPath, usePathname } from "@/lib/router"
import { AboutPage } from "@/pages/about-page"
import { BrandPage } from "@/pages/brand-page"
import { GalleryPage } from "@/pages/gallery-page"
import { GridPage } from "@/pages/grid-page"
import { ListPage } from "@/pages/list-page"
import { StoryPage } from "@/pages/story-page"

const INDEXES = ["/", "/list", "/gallery", "/about", "/brand"]

export default function App() {
  const pathname = usePathname()
  // Where CLOSE on a story goes: the index view the visitor came from.
  const lastIndex = useRef("/")
  if (INDEXES.includes(pathname)) lastIndex.current = pathname

  useEffect(() => {
    const story = matchPath("/story/:slug", pathname)
    const person = story ? findPerson(story.slug) : null
    document.title = person
      ? `${person.name}, ${person.category} — Overtime`
      : pathname === "/brand"
        ? "Brand guidelines — Overtime"
        : "Overtime — 84 athletes, issue 12"
  }, [pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: ease.outQuart }}
        data-canvas-ignore
      >
        {page(pathname, lastIndex.current)}
      </motion.div>
    </AnimatePresence>
  )
}

function page(pathname: string, back: string) {
  if (pathname === "/list") return <ListPage pathname={pathname} />
  if (pathname === "/gallery") return <GalleryPage pathname={pathname} />
  if (pathname === "/about") return <AboutPage pathname={pathname} />
  if (pathname === "/brand") return <BrandPage pathname={pathname} />
  const story = matchPath("/story/:slug", pathname)
  const person = story ? findPerson(story.slug) : undefined
  if (person) return <StoryPage person={person} back={back} />
  return <GridPage pathname="/" />
}
