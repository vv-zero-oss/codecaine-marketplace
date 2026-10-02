# Meridian — Health Coach

A landing page for a connected health-coach app, built so the product is on the page and **usable**: every phone and the watch is a pure-CSS device frame around a live React screen, not a screenshot.

## What you can do on it

| Section | Try |
| --- | --- |
| Hero | Tap Strain / Sleep / Recovery, change 7D / 14D / 30D, drag across the chart, switch tabs; press the watch crown to change its face. |
| Start the day | Scrub the heart-rate chart, tap a sleep stage, switch HRV / RHR / Resp. |
| Records | Tap provider tiles to connect them; filter and expand records inside the phone. |
| Intelligence | Pick a coaching voice (Friend, Guardian, Data nerd) — the chat answers in it. Log meals, toggle check-ins, expand sources, run the workout timer. |
| And that's not all | An accordion that drives the phone: biological age, cycle, a lifting log, a journal. It auto-advances and stops when you hover. |
| Privacy | Tap each promise to read what it means. |

## Device mockups

`src/components/device/` — `PhoneFrame` (three finishes, status bar, island) and `WatchFrame` (case, band, a crown that is a real button). The screen is laid out at a fixed logical size (390 × 844 / 198 × 242) and scaled to the frame, so anything inside stays clickable. Screens live in `src/components/screens/`.

Why not an off-the-shelf frame? Magic UI's iPhone takes an image or video; pure-CSS frames such as Velora UI's and Opensource UI's iPhone accept children but not a scaled live screen. This one is the same idea with scaling and a watch.

## Editor-ready

`Reveal`, `Marquee`, `Floating`, `CountUp` and `Ring` (`src/components/motion/`) take scalar props only. Hidden states are registered with `useCanvasAction`: **Mobile menu**, **Coach voice: next**, **Feature: next**.

## Credits

Photography from [Pexels](https://www.pexels.com). Apple glyph from Iconify (`simple-icons:apple`). Icons from Lucide.
