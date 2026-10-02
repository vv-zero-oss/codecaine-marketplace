/**
 * Sprites, drawn as text. One character is one pixel; `.` is empty.
 * Letters map to the palette each sprite names — token colours, never hex.
 */
export type Sprite = { rows: string[]; palette: Record<string, string> }

const c = (token: string) => `var(--color-${token})`

export const SPRITES = {
  shield: {
    rows: [
      "wwwwwwwwwwww",
      "waaaaaaaaaaw",
      "waaaaaiaaaaw",
      "waaaaiiaaaaw",
      "waaaiiiiaaaw",
      "waaaaiiaaaaw",
      "waaaaiiaaaaw",
      "waaaaaaaaaaw",
      ".waaaaaaaaw.",
      ".waaaaaaaaw.",
      "..waaaaaaw..",
      "...waaaaw...",
      "....wwww....",
    ],
    palette: { w: c("fg"), a: c("accent"), i: c("sky-5") },
  },
  plane: {
    rows: [
      "......ww......",
      "......ww......",
      ".....wwww.....",
      "wwwwwwwwwwwwww",
      "wwwwwwwwwwwwww",
      ".....wwww.....",
      "......ww......",
      "....wwwwww....",
    ],
    palette: { w: c("fg") },
  },
  heart: {
    rows: [
      ".rr...rr.",
      "rrrr.rrrr",
      "rrrrrrrrr",
      "rrrrrrrrr",
      ".rrrrrrr.",
      "..rrrrr..",
      "...rrr...",
      "....r....",
    ],
    palette: { r: c("bad") },
  },
  bug: {
    rows: [
      "..g....g..",
      "...g..g...",
      "..gggggg..",
      ".gg.gg.gg.",
      "gggggggggg",
      "g.gggggg.g",
      "g.gggggg.g",
      "..gggggg..",
      ".g..gg..g.",
      "g........g",
    ],
    palette: { g: c("good") },
  },
  eye: {
    rows: [
      "....wwwwww....",
      "..ww......ww..",
      ".w...pppp...w.",
      "w...pppppp...w",
      "w...ppbbpp...w",
      ".w...pppp...w.",
      "..ww......ww..",
      "....wwwwww....",
    ],
    palette: { w: c("fg"), p: c("accent"), b: c("bg") },
  },
  key: {
    rows: [
      ".yyy........",
      "yy.yy.......",
      "y...yyyyyyyy",
      "yy.yy..y.y.y",
      ".yyy........",
    ],
    palette: { y: c("warn") },
  },
  bolt: {
    rows: [
      "....yy",
      "...yy.",
      "..yy..",
      ".yyyyy",
      "...yy.",
      "..yy..",
      ".yy...",
      "yy....",
    ],
    palette: { y: c("warn") },
  },
  lock: {
    rows: [
      "..wwww..",
      ".w....w.",
      ".w....w.",
      "wwwwwwww",
      "waaaaaaw",
      "waaabaaw",
      "waaabaaw",
      "waaaaaaw",
      "wwwwwwww",
    ],
    palette: { w: c("fg"), a: c("accent"), b: c("bg") },
  },
  coin: {
    rows: [
      "..yyyy..",
      ".yyyyyy.",
      "yyyoooyy",
      "yyyoyyyy",
      "yyyoooyy",
      "yyyyyoyy",
      "yyyoooyy",
      ".yyyyyy.",
      "..yyyy..",
    ],
    palette: { y: c("warn"), o: c("sky-5") },
  },
  cloud: {
    rows: [
      "......wwww........",
      "....wwwwwwww......",
      "..wwwwwwwwwwww.ww.",
      ".wwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwww",
    ],
    palette: { w: c("cloud") },
  },
  star: {
    rows: ["..w..", "..w..", "wwwww", "..w..", "..w.."],
    palette: { w: c("fg") },
  },
  globe: {
    rows: [
      "..bbbb..",
      ".bgbbbb.",
      "bgggbbbb",
      "bggbbgbb",
      "bbbbgggb",
      "bbbbbggb",
      ".bbbbgb.",
      "..bbbb..",
    ],
    palette: { b: c("accent"), g: c("good") },
  },
  mail: {
    rows: [
      "wwwwwwwwww",
      "wwa....awww",
      "w.wa..aw.w",
      "w..waaw..w",
      "w........w",
      "wwwwwwwwww",
    ],
    palette: { w: c("fg"), a: c("fg") },
  },
  chip: {
    rows: [
      ".w.w.w.w.",
      "wwwwwwwww",
      ".waaaaaw.",
      "wwaaaaaww",
      ".waaaaaw.",
      "wwaaaaaww",
      ".waaaaaw.",
      "wwwwwwwww",
      ".w.w.w.w.",
    ],
    palette: { w: c("fg"), a: c("accent") },
  },
} as const satisfies Record<string, Sprite>

export type SpriteName = keyof typeof SPRITES
