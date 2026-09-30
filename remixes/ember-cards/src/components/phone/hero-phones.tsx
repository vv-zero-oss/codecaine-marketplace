import { MathUtils } from "three"

import { PhoneModel, type PhoneFinish } from "./phone-model"
import { PhoneRig, PhoneStage } from "./phone-stage"

const deg = MathUtils.degToRad

/**
 * The hero's pair of phones — the wallet in front, the card list leaning in
 * behind it — rendered live in 3D. They turn a little as the page scrolls,
 * lean towards the pointer and float, all from scalar props the editor can
 * change.
 */
export function HeroPhones({
  holder = "Nora Lindqvist",
  last4 = "4821",
  spent = "$1,284",
  finish = "titanium",
  tilt = 8,
  spread = 0.54,
  scrollSpin = 16,
  followPointer = true,
  float = true,
  className,
}: {
  holder?: string
  last4?: string
  spent?: string
  finish?: PhoneFinish
  tilt?: number
  spread?: number
  scrollSpin?: number
  followPointer?: boolean
  float?: boolean
  className?: string
}) {
  return (
    <PhoneStage className={className} fov={24} distance={8} fitWidth={spread * 2 + 1.75} label="The Ember app on two phones: the wallet and the list of cards">
      <PhoneRig scrollSpin={scrollSpin} followPointer={followPointer} float={float}>
        <PhoneModel
          screen="cards"
          holder={holder}
          last4={last4}
          spent={spent}
          finish={finish}
          height={2.75}
          position={[spread, 0.12, -0.55]}
          rotation={[deg(-4), deg(-16), deg(tilt * 0.6)]}
        />
        <PhoneModel
          screen="wallet"
          holder={holder}
          last4={last4}
          spent={spent}
          finish={finish}
          height={2.75}
          position={[-spread, -0.04, 0.2]}
          rotation={[deg(-4), deg(14), deg(tilt)]}
        />
      </PhoneRig>
    </PhoneStage>
  )
}
