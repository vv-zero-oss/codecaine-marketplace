const FEATURES = [
  {
    title: "Import Anything...",
    body: "We are out to build a truly open canvas you can import all types of multimedia files PDF, CSV, HTML, Doc and even Live website",
    video: "https://framerusercontent.com/assets/MkRqx95luhv3HrzWUVBPk3lbk.mp4",
  },
  {
    title: "@mention your anything on the board",
    body: "Refer anything that you would like too",
    video: "https://framerusercontent.com/assets/jqYjBn39McfA2B8VkBvj3Ca2U0.mp4",
  },
  {
    title: "Leave comments",
    body: "Take notes upon saving so you'll never forget the context in the future.",
    video: "https://framerusercontent.com/assets/DpMFb4zuxQzqPqM9HQtesX9P6AE.mp4",
  },
];

/** "Design tool that works along" — three feature cards, one clip each. */
export function Features() {
  return (
    <section className="lp-section lp-container" aria-labelledby="lp-features-title">
      <h2 id="lp-features-title" className="lp-h2">
        Design tool that works along
      </h2>
      <ul className="lp-cards">
        {FEATURES.map((f) => (
          <li key={f.title} className="lp-card">
            <div className="lp-card-media">
              <video src={f.video} autoPlay muted loop playsInline aria-hidden />
            </div>
            <div className="lp-card-meta">
              <h3 className="lp-h3">{f.title}</h3>
              <p className="lp-body">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
