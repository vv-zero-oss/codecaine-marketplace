import { HeroFilm } from "@/components/motion/hero-film"
import { brand, film } from "@/content"

/** The opening: the film, the wordmark, and the fold into the header. */
export function HomeHero() {
  return <HeroFilm src={film.src} poster={film.poster} wordmark={brand.wordmark} tagline={brand.tagline} />
}
