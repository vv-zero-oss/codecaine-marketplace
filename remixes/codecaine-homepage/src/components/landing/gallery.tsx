import { photo } from "@/lib/media";
import { Link } from "@/lib/router";
import { GalleryClock } from "./gallery-clock";

type Shot = { src: string; alt: string; shape: "wide" | "tall" };

const wide = (id: number, alt: string): Shot => ({ shape: "wide", src: photo(id, 1400), alt });
const tall = (id: number, alt: string): Shot => ({ shape: "tall", src: photo(id, 600), alt });

/* Two rows, alternating a desktop-shaped shot and a phone-shaped one. */
const ROWS: Shot[][] = [
  [
    wide(3637943, "A studio site led by a white geometric facade"),
    tall(38290948, "A fashion label's mobile lookbook"),
    wide(29939683, "An architecture practice's black and white portfolio"),
    tall(9121191, "A colourful editorial on a phone"),
    wide(11991914, "A gallery site with a white wall against blue sky"),
    tall(26274788, "A model agency's mobile profile page"),
  ],
  [
    tall(6611418, "A ceramics shop on a phone"),
    wide(3137084, "A dark landing page for a property developer"),
    tall(19432557, "A magazine's mobile cover story"),
    wide(21327037, "A minimal site for a design studio"),
    tall(34301756, "A pottery studio's class schedule on a phone"),
    wide(5818753, "A grayscale portfolio for an engineering firm"),
  ],
];

/**
 * "Built on the canvas" — two endless rows of site shots running in opposite
 * directions. On top of the drift, each row is pushed sideways by the page's
 * scroll and the header rises in as the section enters; all three are CSS
 * (src/styles/landing.css), the scroll ones on a view() timeline.
 */
export function Gallery() {
  return (
    <section className="lp-gallery" aria-labelledby="lp-gallery-title">
      <header className="lp-gallery-head">
        <h2 id="lp-gallery-title" className="lp-gallery-title">
          Built on the canvas
        </h2>
        <Link className="lp-gallery-cta" href="/features">
          See what it does
        </Link>
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
