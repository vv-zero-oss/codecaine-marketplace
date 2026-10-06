
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@/hooks/use-disclosure";

/**
 * The modal demo, contained in its own stage so it never covers the page.
 *
 * Opens at `--duration-medium` from `--motion-scale-lg` (0.96), closes at
 * `--duration-fast` back to the same scale — dismissal reads as instant while
 * the open still feels deliberate. Both live in the `.m-modal` / `.m-scrim`
 * recipes; this component only flips `is-open` / `is-closing`.
 *
 * A modal is not anchored to a trigger, so its transform-origin stays centered.
 */
export function ModalDemo({ trigger }: { trigger: (open: () => void) => React.ReactNode }) {
  const { open, closing, show, hide } = useDisclosure();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  return (
    <>
      {trigger(show)}
      <div className="relative mt-5 grid h-[220px] place-items-center overflow-hidden rounded-xl bg-surface-sunken shadow-hairline">
        <span className="type-caption">Modal stage</span>
        <div
          className={cn("m-scrim", open && "is-open", closing && "is-closing")}
          onClick={hide}
          aria-hidden
        />
        <div
          className={cn(
            "m-modal absolute z-10 w-[288px] rounded-2xl bg-surface p-5 shadow-modal",
            open && "is-open",
            closing && "is-closing",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Discard edits?"
          aria-hidden={!open}
        >
          <h4 className="type-heading">Discard edits?</h4>
          <p className="type-caption mt-1.5">
            Your timing changes for “Menu dropdown” haven’t been written to source.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" className="btn btn-sm btn-soft" onClick={hide}>
              Cancel
            </button>
            <button type="button" className="btn btn-sm btn-danger" onClick={hide}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
