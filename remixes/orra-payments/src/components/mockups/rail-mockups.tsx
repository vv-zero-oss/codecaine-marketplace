import { Nfc, Snowflake, Eye, Settings2, X } from "lucide-react"

import { PAYMENT_MARKS } from "@/components/brand-marks"
import { OrraCard } from "@/components/mockups/orra-card"
import { PaymentTile } from "@/components/mockups/payment-tile"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

const LEDGER = [
  { name: "Ceramic supply co.", amount: "−€186.40" },
  { name: "Harbour Freight", amount: "−€42.80" },
  { name: "Studio rent", amount: "−€1,200.00" },
  { name: "Packaging Direct", amount: "−€129.00" },
  { name: "Card refund", amount: "+€58.99" },
]

/** A phone showing the business account: the card, three controls, a ledger. */
export function LedgerPhone() {
  return (
    <div className="w-[190px] rounded-[30px] bg-night p-1.5 shadow-device ring-1 ring-white/15 sm:w-[200px]">
      <div className="overflow-hidden rounded-[25px] bg-paper px-3 pt-3 pb-4 text-ink">
        <div className="flex justify-between px-1 text-[8px] font-medium">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-full bg-night" />
          <span>100%</span>
        </div>
        <p className="mt-2 text-center text-[9px] font-medium">Cards</p>
        <OrraCard finish="iris" className="mt-2 w-full! rounded-[10px] [&>span:first-child]:text-[16px]" />
        <div className="mt-3 grid grid-cols-3 text-center text-[7px] text-ink-2">
          {[
            { Icon: Eye, label: "Details" },
            { Icon: Snowflake, label: "Freeze" },
            { Icon: Settings2, label: "Limits" },
          ].map(({ Icon, label }) => (
            <span key={label} className="flex flex-col items-center gap-0.5">
              <Icon className="size-2.5" strokeWidth={1.6} />
              {label}
            </span>
          ))}
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {LEDGER.map((row) => (
            <li key={row.name} className="flex items-center gap-2 text-[8px]">
              <span className="size-4 rounded-[4px] bg-surface-3" />
              <span className="flex-1 truncate">{row.name}</span>
              <span className="tabular-nums">{row.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** A phone tucked in an apron pocket, mid-payment. */
export function TapPocket() {
  return (
    <>
      <img src={pexels(PHOTOS.apron, 900)} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute top-[42%] left-1/2 w-[46%] -translate-x-1/2 rotate-[8deg] rounded-[22px] bg-night p-1 shadow-device">
        <div className="flex aspect-[9/12] flex-col items-center justify-center gap-1 rounded-[18px] bg-paper text-ink">
          <Nfc className="size-7" strokeWidth={1.3} />
          <span className="text-[9px] text-ink-3">Hold your card to pay</span>
          <span className="text-2xl tracking-[-0.03em] tabular-nums">€25.95</span>
        </div>
      </div>
    </>
  )
}

const OPTIONS = ["11%", "13%", "16%", "21%"]
const BARS = [54, 32, 8, 70, 72]

/** The funding offer: pick an amount and a repayment rate, see the cost. */
export function FundingOffer() {
  return (
    <div className="grid w-[92%] grid-cols-1 overflow-hidden rounded-md bg-paper text-ink shadow-pop sm:grid-cols-[1fr_0.9fr]">
      <div className="relative p-6 text-[11px]">
        <X className="absolute top-3 right-3 size-3 text-ink-3 sm:right-auto sm:left-3" />
        <p className="text-[14px]">Choose your offer</p>
        <p className="mt-4 text-ink-3">Amount</p>
        <p className="mt-1.5 border-b border-line pb-1.5 tabular-nums">
          EUR <span className="ml-3">12,000</span>
        </p>
        <div className="relative mt-4 h-1 rounded-full bg-surface-3">
          <span className="absolute inset-y-0 left-0 w-[22%] rounded-full bg-ink" />
          <span className="absolute top-1/2 left-[22%] size-3 -translate-1/2 rounded-full border-2 border-ink bg-paper" />
        </div>
        <p className="mt-5 text-ink-3">Repaid from daily sales</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {OPTIONS.map((option, index) => (
            <span
              key={option}
              className={cn("rounded-[5px] border px-2 py-1.5 tabular-nums", index === 0 ? "border-ink" : "border-line text-ink-2")}
            >
              {option}
            </span>
          ))}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-y-1 tabular-nums">
          <dt className="text-ink-3">Advance</dt>
          <dd className="text-right">€12,000</dd>
          <dt className="text-ink-3">Fixed fee</dt>
          <dd className="text-right">€1,080</dd>
          <dt className="text-ink-3">Total to repay</dt>
          <dd className="text-right">€13,080</dd>
        </dl>
        <span className="mt-4 flex h-8 items-center justify-center rounded-[6px] bg-espresso text-ink-inverse">Accept offer</span>
        <span className="mt-1.5 flex h-8 items-center justify-center rounded-[6px] bg-surface-2">Not now</span>
      </div>
      <div className="hidden items-end justify-around gap-3 bg-surface p-6 sm:flex">
        {BARS.map((height, index) => (
          <span key={index} className="flex h-40 w-5 flex-col justify-end rounded-[4px] bg-surface-3">
            <span className="rounded-[4px] bg-mint/80" style={{ height: `${height}%` }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/** A hosted payment link, open on the customer's side. */
export function PaymentLinkCard() {
  const methods = PAYMENT_MARKS.filter((mark) => ["applepay", "klarna", "paypal"].includes(mark.id))
  return (
    <div className="w-[78%] rounded-xl bg-paper p-5 text-ink shadow-pop">
      <p className="text-[11px] text-ink-3">Terra Vessel</p>
      <p className="mt-1 text-[26px] tracking-[-0.03em] tabular-nums">€64.00</p>
      <p className="text-[11px] text-ink-3">Two stoneware mugs, glazed</p>
      <div className="mt-4 flex flex-col gap-2">
        {methods.map((mark) => (
          <span key={mark.id} className="flex items-center gap-2.5 rounded-lg border border-line p-1.5 pr-3 text-[12px]">
            <PaymentTile mark={mark} className="w-8 rounded-[7px] shadow-none sm:w-8" />
            {mark.name}
          </span>
        ))}
      </div>
      <span className="mt-4 flex h-9 items-center justify-center rounded-lg bg-cocoa text-[12px] text-ink-inverse">Pay €64.00</span>
    </div>
  )
}
