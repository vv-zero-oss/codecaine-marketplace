import { MathUtils } from "three"

import { PhoneModel, type PhoneFinish } from "./phone-model"
import { PhoneRig, PhoneStage } from "./phone-stage"

const deg = MathUtils.degToRad

/** The single phone that leans across the sign-up band, turning as it scrolls by. */
export function CtaPhone({
  holder = "Nora Lindqvist",
  last4 = "4821",
  spent = "$1,284",
  finish = "titanium",
  tilt = -14,
  scrollSpin = 18,
  followPointer = true,
  className,
}: {
  holder?: string
  last4?: string
  spent?: string
  finish?: PhoneFinish
  tilt?: number
  scrollSpin?: number
  followPointer?: boolean
  className?: string
}) {
  return (
    <PhoneStage className={className} fov={24} distance={7.2} fitWidth={2} label="The Ember wallet on a phone">
      <PhoneRig scrollSpin={scrollSpin} followPointer={followPointer} float={false} baseRotateZ={tilt}>
        <PhoneModel
          screen="wallet"
          holder={holder}
          last4={last4}
          spent={spent}
          finish={finish}
          height={2.55}
          rotation={[deg(-6), deg(-10), 0]}
        />
      </PhoneRig>
    </PhoneStage>
  )
}
