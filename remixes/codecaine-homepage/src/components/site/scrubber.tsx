
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "./icons";

/**
 * A slider and a number readout sharing one box.
 *
 * Drag resolution is 1ms so the fill tracks the cursor exactly; on release the
 * value snaps to `step` and the fill's own width transition (250ms, house
 * curve — declared on `.scrubber-fill`) tweens it onto the grid. The width
 * transition is suppressed mid-drag so the fill never lags the pointer.
 */
export function Scrubber({
  label,
  min = 0,
  max = 1000,
  step = 25,
  defaultValue,
  stepperLabel,
  className,
}: {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
  stepperLabel?: string;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const valueFromX = useCallback(
    (clientX: number, grid: number) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const ratio = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      const raw = min + ratio * (max - min);
      setValue(Math.max(min, Math.min(max, Math.round(raw / grid) * grid)));
    },
    [min, max],
  );

  const onPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    setDragging(true);
    if (fillRef.current) fillRef.current.style.transition = "background-color var(--duration-micro) ease";
    valueFromX(event.clientX, 1);

    const move = (moveEvent: PointerEvent) => valueFromX(moveEvent.clientX, 1);
    const up = (upEvent: PointerEvent) => {
      setDragging(false);
      if (fillRef.current) fillRef.current.style.transition = "";
      valueFromX(upEvent.clientX, step);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const percent = (Math.min(Math.max((value - min) / (max - min), 0), 1) * 100).toFixed(4);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        ref={rootRef}
        className={cn("scrubber", dragging && "is-dragging")}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(value)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            event.preventDefault();
            setValue((v) => Math.max(min, v - step));
          }
          if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            event.preventDefault();
            setValue((v) => Math.min(max, v + step));
          }
        }}
      >
        <div ref={fillRef} className="scrubber-fill" style={{ width: `${percent}%` }} />
        <div className="scrubber-track" onPointerDown={onPointerDown} />
        <span className="scrubber-label">{label}</span>
        <span className="scrubber-value">{Math.round(value)}</span>
        <span className="scrubber-thumb" />
      </div>
      <button type="button" className="scrubber-stepper" aria-label={stepperLabel ?? `${label} presets`}>
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
