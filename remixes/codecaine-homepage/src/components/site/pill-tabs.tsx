
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sliding-pill tabs. One absolutely-positioned pill tweens `translate` + `width`
 * (both compositor-friendly), so the cost is the same whether there are three
 * tabs or thirty. The transition itself is declared on `.tabs-pill`.
 *
 * The first placement is measured without a transition so the pill doesn't fly
 * in from 0 on mount.
 */
export function PillTabs({
  tabs,
  defaultValue,
  className,
  onValueChange,
}: {
  tabs: readonly string[];
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]);
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const move = useCallback((animate: boolean) => {
    const pill = pillRef.current;
    const el = listRef.current?.querySelector<HTMLButtonElement>('.tab[aria-selected="true"]');
    if (!pill || !el) return;
    if (!animate) pill.style.transition = "none";
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.translate = `${el.offsetLeft}px 0`;
    if (!animate) requestAnimationFrame(() => { pill.style.transition = ""; });
  }, []);

  useLayoutEffect(() => { move(false); }, [move]);
  useEffect(() => { move(true); }, [active, move]);

  useEffect(() => {
    const onResize = () => move(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [move]);

  return (
    <div ref={listRef} className={cn("tabs", className)} role="tablist">
      <span ref={pillRef} className="tabs-pill" aria-hidden />
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          className="tab"
          aria-selected={tab === active}
          onClick={() => { setActive(tab); onValueChange?.(tab); }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
