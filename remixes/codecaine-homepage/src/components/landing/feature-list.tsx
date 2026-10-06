const ITEMS = [
  {
    title: "Works on your real code",
    body: "Edit the running app, not a copy of it. Changes land in your project's own source.",
  },
  {
    title: "Tokens, not values",
    body: "Colours, sizes and radii stay CSS variables, so every edit follows your design system.",
  },
  {
    title: "Import from the clipboard",
    body: "Paste a screenshot, a snippet or a live URL and keep working from there.",
  },
  {
    title: "Every state, every screen",
    body: "Design hover, focus and pressed states, and step through mobile, tablet and desktop.",
  },
  {
    title: "Agents on the board",
    body: "Ask for a change and watch it happen on the layer you pointed at.",
  },
  {
    title: "Comments in context",
    body: "Pin notes to the layer they're about, so the reason travels with the design.",
  },
];

/** "And everything else" — a grid of smaller, text-only features. */
export function FeatureList() {
  return (
    <section className="lp-section lp-container" aria-labelledby="lp-feature-list-title">
      <h2 id="lp-feature-list-title" className="lp-h2">
        And everything else
      </h2>
      <ul className="lp-cards">
        {ITEMS.map((item) => (
          <li key={item.title} className="lp-tile">
            <h3 className="lp-h3">{item.title}</h3>
            <p className="lp-body">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
