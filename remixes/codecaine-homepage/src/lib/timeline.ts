/** The demo timeline's rows, as data — geometry in percent, never in pixels. */
export const TIMELINE_ROWS = [
  { id: "transform", badge: "Menu surface", property: "transform", left: 0, width: 25, selected: true },
  { id: "opacity", badge: "Menu surface", property: "opacity", left: 0, width: 25, selected: false },
  { id: "rotate", badge: "Caret", property: "rotate", left: 5, width: 25, selected: false },
] as const;

/** Ruler stops across one second of the demo track. */
export const TIMELINE_RULER = [
  { at: 0, label: "0s" },
  { at: 25, label: null },
  { at: 50, label: "0.5s" },
  { at: 75, label: null },
  { at: 100, label: "1s" },
] as const;
