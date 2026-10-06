
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Two-or-three-way segmented control. No pill — the selected segment fills. */
export function Segmented({
  options,
  defaultValue,
  className,
  onValueChange,
}: {
  options: readonly string[];
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}) {
  const [active, setActive] = useState(defaultValue ?? options[0]);
  return (
    <div className={cn("seg", className)} role="tablist">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          className="seg-btn"
          aria-selected={option === active}
          onClick={() => { setActive(option); onValueChange?.(option); }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
