import { Link } from "@/lib/router";
import { asset } from "@/lib/media";

/**
 * The opening block: mark, headline, lede and the two pill CTAs.
 */
export function Hero() {
  return (
    <section className="lp-hero lp-container lp-container-text" aria-labelledby="lp-hero-title">
      <div className="lp-hero-block">
        <img className="lp-logo" src={asset("landing/codecaine-pup.png")} alt="Codecaine" width={88} height={88} />
        <div className="lp-hero-text">
          <h1 id="lp-hero-title" className="lp-display">
            Start with what you already have
          </h1>
          <p className="lp-lede">The canvas for your real code.</p>
        </div>
        <div className="lp-ctas">
          <Link className="lp-btn lp-btn-primary" href="/features">
            Start designing
            <span className="lp-btn-shine" aria-hidden />
          </Link>
          <Link className="lp-btn lp-btn-outline" href="/brand">
            See the design system
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ArrowRight() {
  return (
    <svg className="lp-btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M16.495 9.823H3.5M10.226 3.5l5.898 6.32-5.898 6.319"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
