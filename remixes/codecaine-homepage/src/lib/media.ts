/**
 * Every photo and clip on the marketing pages, from Pexels
 * (https://www.pexels.com — free to use, credited in the README).
 *
 * One place, so a remix swaps its imagery here rather than hunting through
 * components. `photo()` asks Pexels' CDN for a compressed rendition at the
 * width the slot needs.
 */

/** A Pexels photo at `w` px wide (and cropped to `h` when given). */
export function photo(id: number, w: number, h?: number): string {
  const size = h ? `&w=${w}&h=${h}&fit=crop` : `&w=${w}`;
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${size}`;
}

/** A Pexels clip's 1280×720 rendition and its poster frame (`poster` is the
 *  frame's file name, which Pexels names per clip). */
function clip(id: number, fps: number, poster = `pexels-photo-${id}.jpeg`) {
  return {
    src: `https://videos.pexels.com/video-files/${id}/${id}-hd_1280_720_${fps}fps.mp4`,
    poster: `https://images.pexels.com/videos/${id}/${poster}?auto=compress&cs=tinysrgb&w=1280`,
  };
}

/** Under the hero on /features: a designer working on screen. */
export const COVER_CLIP = clip(7204567, 24, "adult-business-coffee-composition-7204567.jpeg");

/** One clip per feature card, in card order. */
export const FEATURE_CLIPS = {
  import: clip(3248135, 25, "free-video-3248135.jpg"),
  mention: clip(7610989, 30),
  comments: clip(7989707, 25),
};

/** Public file under `public/`, resolved against Vite's base so it works from
 *  any folder the built site is served from. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
