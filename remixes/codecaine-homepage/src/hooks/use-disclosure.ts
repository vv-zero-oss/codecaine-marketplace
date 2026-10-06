
import { useCallback, useEffect, useRef, useState } from "react";
import { durationMs } from "@/lib/motion";

/**
 * Open/close state for anything that animates out before it unmounts visually.
 *
 * Returns `closing` alongside `open` so the consumer can hold the exit class
 * for exactly one `--duration-fast` — the same contract every `.m-*` recipe in
 * src/styles/components.css expects. No duration is written here; it is read from the
 * token so retiming the system stays a one-line change in theme.css.
 */
export function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial);
  const [closing, setClosing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const show = useCallback(() => {
    clear();
    setClosing(false);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen((wasOpen) => {
      if (!wasOpen) return wasOpen;
      setClosing(true);
      clear();
      timer.current = setTimeout(() => setClosing(false), durationMs("fast"));
      return false;
    });
  }, []);

  const toggle = useCallback(() => {
    setOpen((wasOpen) => {
      clear();
      if (wasOpen) {
        setClosing(true);
        timer.current = setTimeout(() => setClosing(false), durationMs("fast"));
        return false;
      }
      setClosing(false);
      return true;
    });
  }, []);

  useEffect(() => clear, []);

  return { open, closing, show, hide, toggle };
}
