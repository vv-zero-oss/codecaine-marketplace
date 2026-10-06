
import { useState } from "react";
import { cn } from "@/lib/utils";

/** The house switch: `aria-checked` drives both the track fill and the knob. */
export function ToggleSwitch({
  defaultChecked = false,
  label,
  className,
  onCheckedChange,
}: {
  defaultChecked?: boolean;
  label: string;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cn("switch", className)}
      onClick={() => { setChecked((value) => { onCheckedChange?.(!value); return !value; }); }}
    />
  );
}
