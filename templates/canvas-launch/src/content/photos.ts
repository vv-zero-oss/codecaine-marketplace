/**
 * Every photograph and clip on the page, from Pexels (https://www.pexels.com),
 * with its photographer for the credits in the footer. Files are saved into
 * `public/photos/` so the page never depends on a third-party host at runtime.
 */
export type Photo = { src: string; alt: string; by: string; url: string }
export type Clip = Photo & { video: string }

/** The film: people at their screens, lit by them. */
export const FILM: Clip[] = []

/** Seen through the mark's window above the waitlist. */
export const WINDOW: Photo[] = []
