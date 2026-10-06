
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { durationMs } from "@/lib/motion";
import { CheckIcon } from "./icons";

const TOAST_EVENT = "ds:toast";
/** How long a toast is legible before it starts leaving. Not a motion token — it's a dwell, not a duration. */
const DWELL_MS = 1800;

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

type ToastState = { id: number; message: string; closing: boolean };

/**
 * One toast at a time, mounted once at the root.
 *
 * Enter/exit are CSS animations on `.toast` (`toast-in` / `toast-out`) — they
 * leave the way they entered, and the exit runs at `--duration-slow` so a toast
 * that has already been read doesn't vanish abruptly.
 */
export function ToastHost() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    let dwell: ReturnType<typeof setTimeout>;
    let remove: ReturnType<typeof setTimeout>;

    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      const id = Date.now();
      clearTimeout(dwell);
      clearTimeout(remove);
      setToast({ id, message, closing: false });
      dwell = setTimeout(() => setToast((t) => (t?.id === id ? { ...t, closing: true } : t)), DWELL_MS);
      remove = setTimeout(
        () => setToast((t) => (t?.id === id ? null : t)),
        DWELL_MS + durationMs("slow") + durationMs("micro"),
      );
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(dwell);
      clearTimeout(remove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[200] -translate-x-1/2"
      aria-live="polite"
    >
      {toast && (
        <div key={toast.id} className={cn("toast", toast.closing && "is-closing")}>
          <span className="flex size-4 text-fg">
            <CheckIcon className="size-4" />
          </span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
