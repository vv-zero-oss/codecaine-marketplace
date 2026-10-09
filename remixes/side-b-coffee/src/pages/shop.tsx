import { useCallback, useState } from "react"

import { BrewGuide } from "@/components/sections/shop/brew-guide"
import { CoffeeQuiz } from "@/components/sections/shop/coffee-quiz"
import { ShopHero } from "@/components/sections/shop/shop-hero"
import { ShopShelf } from "@/components/sections/shop/shop-shelf"
import { COFFEES } from "@/content/products"

/**
 * The shop, as a story: here's the shelf (and how full it is), find what
 * you're after, not sure? let the shelf pick, then — once it's home — how
 * to brew it.
 */
export function ShopPage() {
  const [count, setCount] = useState({ n: COFFEES.length, kind: "coffees" })
  const onCount = useCallback((n: number, kind: string) => setCount({ n, kind }), [])
  return (
    <>
      <ShopHero count={count.n} kind={count.kind} />
      <ShopShelf onCount={onCount} />
      <CoffeeQuiz />
      <BrewGuide />
    </>
  )
}
