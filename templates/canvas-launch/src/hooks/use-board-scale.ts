import { useViewport } from "@/hooks/use-viewport"

/**
 * How big a scene's diagram board is drawn: as large as the screen allows up
 * to 115%, leaving room for the headline above it, and never wider than the
 * screen with a 12px margin each side.
 */
export function useBoardScale(width: number) {
  const view = useViewport()
  return { view, scale: Math.min(1.15, (view.width - 24) / width, view.height / 800) }
}
