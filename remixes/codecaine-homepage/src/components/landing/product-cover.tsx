import { COVER_CLIP } from "@/lib/media";

/**
 * The product demo: a grey well with the recording rising out of its bottom
 * edge. The well's aspect ratio and the video's inset are tokens, so it
 * scales as one piece instead of sitting at a fixed size.
 */
export function ProductCover() {
  return (
    <div className="lp-container" data-canvas-ignore>
      <figure id="hero-layer" className="lp-cover">
        <video
          className="lp-cover-media"
          src={COVER_CLIP.src}
          poster={COVER_CLIP.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label="A designer working on a layout"
        />
      </figure>
    </div>
  );
}
