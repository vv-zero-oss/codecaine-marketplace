import { createContext, useContext } from "react"

/** Whether the preloader has lifted. The hero holds its entrance until then,
 *  so the page's first motion is seen rather than played under the curtain. */
export const LoadedContext = createContext(true)

export function useLoaded() {
  return useContext(LoadedContext)
}
