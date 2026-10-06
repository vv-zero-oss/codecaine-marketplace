import { FEATURE_CLIPS } from "@/lib/media";

const FEATURES = [
  {
    title: "Import anything",
    body: "Drop a PDF, a CSV, a doc, an HTML file or a live website onto the board and keep designing from it.",
    video: FEATURE_CLIPS.import,
  },
  {
    title: "@mention anything on the board",
    body: "Point the agent at a layer, a page or a file by name, and it works on exactly that.",
    video: FEATURE_CLIPS.mention,
  },
  {
    title: "Leave comments",
    body: "Pin a note to the layer it is about, so the reason behind a change is still there next month.",
    video: FEATURE_CLIPS.comments,
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
              <video src={f.video.src} poster={f.video.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden />
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
