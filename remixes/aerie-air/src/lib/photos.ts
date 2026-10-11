/**
 * Every photograph on the site, from Pexels (https://www.pexels.com), with
 * its photographer for the credits. Served from `public/photos/`, sized to
 * 1800px wide.
 */
export type Photo = { src: string; alt: string; by: string; url: string }

const BASE = import.meta.env.BASE_URL

export const photos = {
  "cabin-dusk": { src: `${BASE}photos/cabin-dusk.jpg`, alt: "A passenger in silhouette at a cabin window, the city below gold at sunset", by: "Chantal Lenting", url: "https://www.pexels.com/photo/aerial-view-of-lisbon-at-sunset-from-airplane-34022421/" },
  "window-glow": { src: `${BASE}photos/window-glow.jpg`, alt: "A cabin window lit orange by the setting sun", by: "Myburgh Roux", url: "https://www.pexels.com/photo/photography-of-airplane-window-during-dusk-735236/" },
  "window-city": { src: `${BASE}photos/window-city.jpg`, alt: "A coastal city seen through a cabin window in late light", by: "Diana Titenko", url: "https://www.pexels.com/photo/city-and-sea-viewed-from-plane-10408333/" },
  "cabin-smile": { src: `${BASE}photos/cabin-smile.jpg`, alt: "A passenger in sunglasses smiling out of a cabin window", by: "Francois Joubert", url: "https://www.pexels.com/photo/luxurious-private-jet-experience-with-businessman-30462811/" },
  "cabin-calm": { src: `${BASE}photos/cabin-calm.jpg`, alt: "A passenger in headphones working on a laptop in a quiet cabin", by: "cottonbro studio", url: "https://www.pexels.com/photo/man-in-white-sweater-sitting-on-couch-using-macbook-6700139/" },
  "towers-up": { src: `${BASE}photos/towers-up.jpg`, alt: "Looking straight up between towers into a blue sky with clouds", by: "Tanita Lupa", url: "https://www.pexels.com/photo/modern-skyscrapers-against-a-dramatic-sky-in-frankfurt-39802694/" },
  "towers-glass": { src: `${BASE}photos/towers-glass.jpg`, alt: "Glass towers converging against a clear blue sky", by: "Miguel Moreira", url: "https://www.pexels.com/photo/skyward-view-of-downtown-chicago-skyscrapers-30640729/" },
  "trench-turn": { src: `${BASE}photos/trench-turn.jpg`, alt: "A woman in a trench coat glancing back over her shoulder", by: "Anh Nguyen", url: "https://www.pexels.com/photo/back-view-of-woman-in-trench-coat-on-street-in-city-20867424/" },
  "trench-walk": { src: `${BASE}photos/trench-walk.jpg`, alt: "A traveller in a trench coat checking her phone on a platform", by: "Zeki Okur", url: "https://www.pexels.com/photo/woman-waiting-at-train-station-platform-31952810/" },
  "trench-back": { src: `${BASE}photos/trench-back.jpg`, alt: "A traveller in a beige trench coat seen from behind", by: "Zeki Okur", url: "https://www.pexels.com/photo/woman-in-beige-trench-coat-at-train-station-31952817/" },
  "pad-rooftop": { src: `${BASE}photos/pad-rooftop.jpg`, alt: "A rooftop landing pad high above the city under a heavy sky", by: "Milind Shah", url: "https://www.pexels.com/photo/people-on-helipad-on-roof-4733359/" },
  "pad-garden": { src: `${BASE}photos/pad-garden.jpg`, alt: "A round landing pad in a ring of green, seen from above", by: "Imdad Sayyed", url: "https://www.pexels.com/photo/aerial-view-of-helipad-in-pune-india-32630749/" },
  "pad-aerial": { src: `${BASE}photos/pad-aerial.jpg`, alt: "A rooftop landing pad seen from directly overhead", by: "K", url: "https://www.pexels.com/photo/aerial-view-of-buildings-in-an-urban-area-11815925/" },
  "city-haze": { src: `${BASE}photos/city-haze.jpg`, alt: "A city spread under a dramatic sunset sky", by: "Andres Idda Bianchi", url: "https://www.pexels.com/photo/dramatic-cityscape-at-sunset-with-cloudy-sky-34514051/" },
  "city-sunset": { src: `${BASE}photos/city-sunset.jpg`, alt: "Towers at sunset, seen from above", by: "\u5468\u8d5b \u738b", url: "https://www.pexels.com/photo/aerial-view-of-a-modern-city-at-sunset-14075142/" },
  "river-gold": { src: `${BASE}photos/river-gold.jpg`, alt: "A river winding through the city at dusk, gold light on the water", by: "Irina Iriser", url: "https://www.pexels.com/photo/bird-s-eye-photography-of-high-rise-building-1209749/" },
  "river-pink": { src: `${BASE}photos/river-pink.jpg`, alt: "A pink sunset over a river city", by: "Taylor Hunt", url: "https://www.pexels.com/photo/drone-photography-of-city-during-dawn-13425345/" },
  "wing-dusk": { src: `${BASE}photos/wing-dusk.jpg`, alt: "A wing over the evening sky", by: "K", url: "https://www.pexels.com/photo/an-airplane-wing-is-seen-at-sunset-28321126/" },
  "wing-pink": { src: `${BASE}photos/wing-pink.jpg`, alt: "A wing above clouds in a pink sunset", by: "Pavel Podshivalov", url: "https://www.pexels.com/photo/plane-wing-and-a-pink-sky-8691356/" },
  "hangar": { src: `${BASE}photos/hangar.jpg`, alt: "An aircraft in a bright, clean hangar", by: "K", url: "https://www.pexels.com/photo/gray-plane-inside-hangar-2382848/" },
  "engineer": { src: `${BASE}photos/engineer.jpg`, alt: "A technician wiring a power control panel", by: "mickael ange konan", url: "https://www.pexels.com/photo/female-technician-working-on-electrical-control-panel-34526423/" },
  "motor-hands": { src: `${BASE}photos/motor-hands.jpg`, alt: "Hands adjusting a small electric motor on a white bench", by: "ThisIsEngineering", url: "https://www.pexels.com/photo/engineer-designing-equipment-3861953/" },
  "clouds": { src: `${BASE}photos/clouds.jpg`, alt: "Tall white cumulus clouds in a deep blue sky", by: "Nothing Ahead", url: "https://www.pexels.com/photo/clouds-in-the-sky-8726326/" },
  "traffic": { src: `${BASE}photos/traffic.jpg`, alt: "Gridlocked traffic seen from above", by: "Ehsan Haque", url: "https://www.pexels.com/photo/traffic-jam-on-three-lines-17625866/" },
  "cockpit": { src: `${BASE}photos/cockpit.jpg`, alt: "The view through a cockpit window above the clouds", by: "Nikita  Grishin", url: "https://www.pexels.com/photo/first-person-view-of-airplane-cockpit-10070371/" },
  "briefcase": { src: `${BASE}photos/briefcase.jpg`, alt: "A commuter's stride, briefcase in hand", by: "Barbara Olsen", url: "https://www.pexels.com/photo/a-person-carrying-a-bag-while-walking-7870052/" },
} satisfies Record<string, Photo>

export type PhotoName = keyof typeof photos
