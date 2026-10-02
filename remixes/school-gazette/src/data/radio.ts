/** What each station on the school radio says. Plain data: the radio component reads it. */
export type Station = {
  id: "morning" | "sport" | "clubs" | "canteen"
  freq: number
  name: string
  slot: string
  lines: string[]
}

export const STATIONS: Station[] = [
  {
    id: "morning",
    freq: 89.5,
    name: "Morning Brief",
    slot: "08:10 · Form rooms",
    lines: [
      "Good morning, Marlowe. It is Thursday, and the bell is on time for once.",
      "Year 11 mock timetables are pinned outside the hall. Check yours before first break.",
      "The library opens at 7:45 with free toast. Quiet study upstairs, loud study downstairs.",
      "Lost: one blue scarf, one violin bow. Found: both, in the same corridor, somehow.",
    ],
  },
  {
    id: "sport",
    freq: 93.1,
    name: "Sports Desk",
    slot: "12:40 · Touchline",
    lines: [
      "First XI won 3–1 on Tuesday. Mara Idowu scored twice and then apologised to the keeper.",
      "Netball trials are Friday, 4pm, sports hall. Bring trainers and a friend.",
      "Cross-country sign-up closes tonight. The course is flat, the mud is not.",
      "House points: Heron are ahead. Check the scoreboard further down the page.",
    ],
  },
  {
    id: "clubs",
    freq: 97.4,
    name: "Clubs & Societies",
    slot: "13:15 · Noticeboard",
    lines: [
      "Chess Club has moved to Room 14 and has a new rule: no taking back moves, ever.",
      "The Robotics team needs two more drivers before the regional heat. No experience needed.",
      "Drama is casting for the winter play. Auditions are Monday, and nobody has to sing.",
      "Radio Club meets in the basement. Yes, that is where this broadcast comes from.",
    ],
  },
  {
    id: "canteen",
    freq: 102.2,
    name: "Canteen Report",
    slot: "11:55 · Dinner hall",
    lines: [
      "Today’s hot dish is mushroom pie. The vegetarian option is also mushroom pie.",
      "Fresh apples at the till, 20p each, funded by last term’s bake sale. Thank you, bakers.",
      "Reusable bottles refill free at the new fountain by the gym. The old one is still broken.",
      "Cookie coupon on the back page of this issue. First come, first crumbed.",
    ],
  },
]

export const DIAL_MIN = 88
export const DIAL_MAX = 108
