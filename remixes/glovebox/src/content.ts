/**
 * Glovebox — every word and every piece of media on the page.
 *
 * Photography and footage are from Pexels (credited in the footer). Videos
 * are the 1280px renditions for full-bleed frames and 960px for the blurred
 * cards, where detail is thrown away anyway.
 */

const video = (id: number, file: string) => `https://videos.pexels.com/video-files/${id}/${file}`
const poster = (id: number) =>
  `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`
export const photo = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const media = {
  hero: { src: video(6529461, "6529461-hd_1280_720_30fps.mp4"), poster: poster(6529461) },
  policies: { src: video(30917277, "13220515_960_540_60fps.mp4"), poster: poster(30917277) },
  loop: { src: video(4336922, "4336922-sd_960_540_24fps.mp4"), poster: poster(4336922) },
  answers: { src: video(8104351, "8104351-sd_960_540_25fps.mp4"), poster: poster(8104351) },
  closing: { src: video(38009138, "16130837_1280_720_24fps.mp4"), poster: poster(38009138) },
  story: { src: video(3683320, "3683320-hd_1280_720_25fps.mp4"), poster: poster(3683320) },
}

export const heroTicker = [
  { icon: "refresh", text: "Renewed the Outback, saved $312" },
  { icon: "file", text: "Filed a windscreen claim" },
  { icon: "user", text: "Added Sam as a named driver" },
  { icon: "search", text: "Compared 41 renewal quotes" },
  { icon: "calendar", text: "Booked the Civic's repair for Tuesday" },
] as const

export const faqs = [
  {
    q: "What can Glovebox do for me?",
    a: "It keeps every car insurance policy you hold in one place, reads the fine print for you, shops your renewals weeks before they're due, and files and chases claims. You get a short note when something needs a decision, and nothing when it doesn't.",
  },
  {
    q: "How do I get started?",
    a: "Enter your email, then connect your insurer or forward a policy document. Glovebox reads it in about a minute and builds your garage: cars, drivers, cover, excess and every date that matters.",
  },
  {
    q: "Do I have to switch insurers?",
    a: "No. Glovebox works with the policy you already have. It only suggests a switch when a like-for-like quote saves you money, and it never moves your cover without your say-so.",
  },
  {
    q: "What still needs me?",
    a: "Anything that's a real choice: accepting a new quote, adding a driver, or confirming the details of an accident. Glovebox prepares everything, so each one is a single tap.",
  },
  {
    q: "How long does setup take?",
    a: "Most households are set up in under five minutes. Fleets of up to 50 vehicles usually take an afternoon, with a person from our team on hand to help.",
  },
  {
    q: "What does Glovebox cost?",
    a: "Free for one car. Households with more cars pay $4 a month, and small fleets are priced per vehicle. Most members save more than a year's fee at their first renewal.",
  },
  {
    q: "Is my data secure?",
    a: "Your documents are encrypted at rest and in transit, and we never sell your data or share it with an insurer without asking first. We're SOC 2 Type II audited every year.",
  },
] as const

export const footerColumns = [
  { title: "Company", links: ["About", "Careers", "Journal"] },
  { title: "Socials", links: ["Instagram", "X", "LinkedIn"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
] as const
