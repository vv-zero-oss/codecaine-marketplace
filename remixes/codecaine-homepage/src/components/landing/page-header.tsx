import type { ReactNode } from "react";

/**
 * The opening block of an inner page: headline, lede and, optionally, its
 * actions. Same rhythm as the landing hero, without the mark.
 */
export function PageHeader({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="lp-hero lp-container lp-container-text" aria-labelledby={id}>
      <div className="lp-hero-block">
        <div className="lp-hero-text">
          <h1 id={id} className="lp-display">
            {title}
          </h1>
          <p className="lp-lede">{lede}</p>
        </div>
        {children && <div className="lp-ctas">{children}</div>}
      </div>
    </section>
  );
}
