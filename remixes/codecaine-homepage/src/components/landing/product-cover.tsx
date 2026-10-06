/**
 * The product demo: a grey well with the recording rising out of its bottom
 * edge. The well's aspect ratio and the video's inset are tokens, so it
 * scales as one piece instead of sitting at a fixed size.
 */
export function ProductCover() {
  return (
    <div className="lp-container">
      <figure id="hero-layer" className="lp-cover">
        <video
          className="lp-cover-media"
          src="https://framerusercontent.com/assets/TcvHfVe9bKWL2Gwru24KshXLEno.mp4"
          poster="https://framerusercontent.com/images/ARMKwbXsfo5M0Z7swIQNL0cwvlo.webp?width=3840&height=2560"
          autoPlay
          muted
          loop
          playsInline
          aria-label="The canvas editing a live app"
        />
      </figure>
    </div>
  );
}
