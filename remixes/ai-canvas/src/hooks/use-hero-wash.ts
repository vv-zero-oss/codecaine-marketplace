import { createContext, useContext } from "react"
import { motionValue, type MotionValue } from "motion/react"

/**
 * How far the hero has washed from night to paper, 0 → 1. The hero writes it;
 * the header reads it to switch from its dark face to its light one.
 */
export const HeroWashContext = createContext<MotionValue<number>>(motionValue(1))

export function useHeroWash() {
  return useContext(HeroWashContext)
}
