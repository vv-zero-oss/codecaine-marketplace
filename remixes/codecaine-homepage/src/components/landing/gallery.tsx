import { GalleryClock } from "./gallery-clock";

const FR = "https://framerusercontent.com/images";

type Shot = { src: string; alt: string; shape: "wide" | "tall" };

/* The two rows, in the reference's own order: a desktop shot, then a phone. */
const ROWS: Shot[][] = [
  [
    { shape: "wide", src: `${FR}/QSALLMZz20lUztB4mySTDLq6mE.png?width=2800&height=1804`, alt: "Site image in 2026 Frontpage/Sites." },
    { shape: "tall", src: `${FR}/ordt7SZDaUEWKA368UbAGtdIno.png?width=884&height=1894`, alt: "Maggie Site" },
    { shape: "wide", src: `${FR}/a1daVaOmbl26jqNCw1Q0P3vhWZQ.png?width=2796&height=1808`, alt: "Midlife Engineering" },
    { shape: "tall", src: `${FR}/qgcb6nXCOIxXxk9CLxf9WOoOk.png?width=880&height=1806`, alt: "i-D Elle Fanning Site" },
    { shape: "wide", src: `${FR}/wVxwU0qi5YsLHBFbDaX8c3jTcU.png?width=3222&height=2078`, alt: "Website showcase preview made in Framer" },
    { shape: "tall", src: `${FR}/AfVrJxeJkkgPpnO71Nw1tpmiiyI.jpg?width=928&height=1846`, alt: "i-D Elle Fanning Site" },
  ],
  [
    { shape: "tall", src: `${FR}/RtheNIazFJm6EqfeKh66Bi7wyGI.png?width=880&height=1808`, alt: "Maggie Site" },
    { shape: "wide", src: `${FR}/CC3vnYoPhqbdIEFTrhc9At8bgWo.png?width=2874&height=1834`, alt: "Website showcase preview made in Framer" },
    { shape: "tall", src: `${FR}/YCWnviU2EZwsP64iysymO773I.png?width=880&height=1782`, alt: "Maggie Site" },
    { shape: "wide", src: `${FR}/wbyAS4r6FWaI1G1ena314OJs.png?width=2800&height=1804`, alt: "Website showcase preview made in Framer" },
    { shape: "tall", src: `${FR}/Y6F5zkargty3ahKr9VGtA83ujXU.png?width=880&height=1806`, alt: "Mobile website showcase preview made in Framer" },
    { shape: "wide", src: `${FR}/WDlxZ5aairNkZSH0cyHqAzB2w.png?width=3200&height=2072`, alt: "Website showcase preview made in Framer" },
  ],
];

/**
 * "Shipped with Framer" — two endless rows of site shots running in opposite
 * directions. On top of the drift, each row is pushed sideways by the page's
 * scroll and the header rises in as the section enters; all three are CSS
 * (src/styles/landing.css), the scroll ones on a view() timeline.
 */
export function Gallery() {
  return (
    <section className="lp-gallery" aria-labelledby="lp-gallery-title">
      <header className="lp-gallery-head">
        <h2 id="lp-gallery-title" className="lp-gallery-title">
          Shipped with Framer
        </h2>
        <a className="lp-gallery-cta" href="https://www.framer.com/community/gallery/">
          See Framer sites
        </a>
      </header>
      <div className="lp-gallery-rows">
        {ROWS.map((row, i) => (
          <div key={i} className="lp-gallery-row">
            {/* The row is rendered twice end-to-end; the copy is hidden from AT. */}
            <ul className="lp-gallery-track">
              {[...row, ...row].map((shot, j) => (
                <li
                  key={j}
                  className="lp-gallery-shot"
                  data-shape={shot.shape}
                  aria-hidden={j >= row.length || undefined}
                >
                  <img src={shot.src} alt={j >= row.length ? "" : shot.alt} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <GalleryClock />
    </section>
  );
}
