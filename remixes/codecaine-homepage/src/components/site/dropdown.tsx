
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@/hooks/use-disclosure";

type Origin = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type TriggerState = {
  expanded: boolean;
  toggle: () => void;
  menuId: string;
};

type DropdownProps = {
  children: ReactNode;
  renderTrigger: (state: TriggerState) => ReactNode;
  className?: string;
  menuClassName?: string;
  role?: "menu" | "listbox";
  origin?: Origin;
  /** Close when a `.menu-item` inside is clicked. Matches the original page. */
  closeOnItemClick?: boolean;
};

/**
 * Anchored menu surface.
 *
 * Motion contract: this component only toggles `is-open` / `is-closing`; every
 * duration, curve, pre-scale and transform-origin lives in the `.m-dropdown`
 * recipe in src/styles/components.css. It scales from the trigger's own corner rather
 * than from its center, so the surface reads as coming out of the button.
 */
export function Dropdown({
  children,
  renderTrigger,
  className,
  menuClassName,
  role = "menu",
  origin,
  closeOnItemClick = true,
}: DropdownProps) {
  const { open, closing, hide, toggle } = useDisclosure();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) hide();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, hide]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {renderTrigger({ expanded: open, toggle, menuId })}
      <div
        id={menuId}
        role={role}
        aria-hidden={!open}
        data-origin={origin}
        className={cn("menu m-dropdown", open && "is-open", closing && "is-closing", menuClassName)}
        onClick={(event) => {
          if (closeOnItemClick && (event.target as HTMLElement).closest(".menu-item")) hide();
        }}
      >
        {children}
      </div>
    </div>
  );
}
