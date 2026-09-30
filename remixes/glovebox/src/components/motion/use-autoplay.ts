import { useEffect } from "react"

/**
 * Plays a muted, looping video only while it is on screen and allowed to
 * move, and pauses it otherwise. Five videos decoding at once is what makes a
 * page like this stutter on a laptop; one or two is fine.
 */
export function useAutoplay(ref: React.RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!enabled) {
      video.pause()
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: "20% 0px" },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [ref, enabled])
}
