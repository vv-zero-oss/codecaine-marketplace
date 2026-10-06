import type { ReactNode } from "react";

/**
 * One labelled slot in the gallery. Uses the house `.card` and type roles, so
 * the page documenting shadcn is itself built from the design system.
 */
export function Demo({
  name,
  note,
  children,
  className,
}: {
  name: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="card-flat flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="type-label">{name}</h3>
        {note && <span className="type-meta">{note}</span>}
      </div>
      <div className={className ?? "flex flex-wrap items-center gap-2"}>{children}</div>
    </div>
  );
}

export function DemoGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="type-title">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}
