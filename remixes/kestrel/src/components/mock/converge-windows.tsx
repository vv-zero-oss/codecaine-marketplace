import type * as React from "react"
import { FileText, Folder, Mail, Plane, Search } from "lucide-react"

import { PEOPLE } from "@/content/home-story"
import { cn } from "@/lib/utils"

/**
 * The scattered tools of the "before" picture — each a small, real window
 * built from markup, so it scales crisply and the editor can restyle it.
 */

function Chrome({ title, className, children }: { title: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-(--radius-card) bg-raised shadow-(--shadow-float) ring-1 ring-line", className)}>
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-panel px-2.5">
        <span className="size-2 rounded-full bg-ink-4/60" />
        <span className="size-2 rounded-full bg-ink-4/60" />
        <span className="size-2 rounded-full bg-ink-4/60" />
        <span className="ml-2 truncate text-[10.5px] text-ink-3">{title}</span>
      </div>
      {children}
    </div>
  )
}

const ROWS = [
  ["10/02", "Lunch – client", "Meals", "118.20", "?"],
  ["10/03", "Uber to SFO", "Travel", "64.10", "Y"],
  ["10/03", "Flight SFO-JFK", "Travel", "412.80", "?"],
  ["10/05", "Figma seats", "Software", "540.00", "Y"],
  ["10/06", "Hotel 2 nts", "Lodging", "688.00", "N"],
  ["10/07", "Team dinner", "Meals", "302.45", "?"],
  ["10/08", "Office chairs", "Equip.", "1,190.00", "Y"],
]

export function SpreadsheetWindow() {
  return (
    <Chrome title="Receipts_Q3_FINAL (2).xlsx" className="w-[300px]">
      <div className="h-1 bg-signal-green/70" />
      <table className="w-full font-mono text-[9.5px] text-ink-2">
        <thead>
          <tr className="bg-panel text-ink-3">
            {["Date", "Description", "Cat.", "Amount", "OK?"].map((h) => (
              <th key={h} className="border-r border-b border-line px-1.5 py-1 text-left font-normal last:border-r-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row[1]}>
              {row.map((cell, i) => (
                <td key={i} className={cn("border-r border-b border-line px-1.5 py-[3px] whitespace-nowrap last:border-r-0", i === 4 && cell === "?" && "bg-signal-amber-soft text-signal-amber")}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Chrome>
  )
}

export function InboxWindow() {
  return (
    <div className="relative">
      <Chrome title="Inbox — finance@" className="w-[270px]">
        <ul className="divide-y divide-line">
          {[
            ["Lena Sato", "Re: Re: Re: flight receipt??", true],
            ["AP Robot", "Invoice #88213 overdue", true],
            ["Jonah Bell", "which cost centre for the offsite", false],
            ["Card Bank", "Statement is ready", false],
          ].map(([from, subject, unread]) => (
            <li key={subject as string} className="flex items-start gap-2 px-3 py-2">
              <Mail className={cn("mt-0.5 size-3 shrink-0", unread ? "text-signal-blue" : "text-ink-4")} />
              <span className="min-w-0">
                <span className={cn("block truncate text-[11px]", unread ? "font-medium text-ink" : "text-ink-2")}>{from}</span>
                <span className="block truncate text-[10.5px] text-ink-3">{subject}</span>
              </span>
            </li>
          ))}
        </ul>
      </Chrome>
      <span className="absolute -top-2.5 -right-2.5 rounded-full bg-signal-red px-2 py-0.5 font-mono text-[11px] font-medium text-page shadow-(--shadow-card)">4,212</span>
    </div>
  )
}

export function PolicyPdfWindow() {
  return (
    <Chrome title="Expense_Policy_v7.pdf" className="w-[220px]">
      <div className="bg-panel-deep p-3">
        <div className="rounded-sm bg-raised p-3 shadow-(--shadow-xs)">
          <p className="font-serif text-[12px] text-ink">Company Travel Policy</p>
          <p className="text-[8px] text-ink-3">Last updated March 2019</p>
          <div className="mt-2 space-y-1">
            {[92, 80, 96, 70, 88, 60, 94, 76, 84, 52].map((w, i) => (
              <div key={i} className="h-[3px] rounded-full bg-ink-4/50" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="mt-2 text-[8px] text-ink-2">4.2 Flights over six (6) hours may, at the discretion of…</p>
        </div>
      </div>
    </Chrome>
  )
}

export function CardFormWindow() {
  return (
    <div className="w-[230px] rounded-(--radius-card) bg-raised p-3.5 shadow-(--shadow-float) ring-1 ring-line">
      {[
        ["Card number", "•••• •••• •••• 4417"],
        ["Expiry", "08 / 28"],
        ["Security code", "•••"],
        ["Mother’s maiden name", "••••••••"],
      ].map(([label, value]) => (
        <div key={label} className="mb-2 last:mb-0">
          <p className="text-[10px] text-ink-2">{label}</p>
          <p className="mt-0.5 rounded-[4px] px-2 py-1 font-mono text-[10px] text-ink-3 ring-1 ring-line">{value}</p>
        </div>
      ))}
    </div>
  )
}

export function ChatBubbleWindow() {
  return (
    <div className="flex items-center gap-2.5 rounded-(--radius-card) bg-raised py-2.5 pr-4 pl-2.5 shadow-(--shadow-float) ring-1 ring-line">
      <img src={PEOPLE.jonah.photo} alt="" className="size-8 rounded-full object-cover" />
      <span>
        <span className="block text-[11px] text-ink-3">Jonah</span>
        <span className="block text-[14px] whitespace-nowrap text-ink">Is this flight in policy?</span>
      </span>
    </div>
  )
}

export function FlightWindow() {
  return (
    <Chrome title="Book a trip" className="w-[300px]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2 text-[10.5px] text-ink-2">
        <Plane className="size-3 text-ink-3" />
        SFO → JFK · Tue Oct 14
        <Search className="ml-auto size-3 text-ink-3" />
      </div>
      {[
        ["07:05", "Aerolinea", "Economy", "$412"],
        ["09:40", "Coastline", "Business", "$1,284"],
        ["13:15", "Northjet", "Economy", "$389"],
      ].map(([time, carrier, cabin, price]) => (
        <div key={time} className="flex items-center gap-3 border-b border-line px-3 py-1.5 text-[10.5px] last:border-0">
          <span className="font-mono text-ink">{time}</span>
          <span className="text-ink-2">{carrier}</span>
          <span className="text-ink-3">{cabin}</span>
          <span className="ml-auto font-mono text-ink">{price}</span>
        </div>
      ))}
    </Chrome>
  )
}

export function FolderWindow() {
  return (
    <div className="flex w-[120px] flex-col items-center gap-1.5 text-center">
      <span className="grid size-14 place-items-center rounded-(--radius-card) bg-signal-blue-soft text-signal-blue shadow-(--shadow-card)">
        <Folder className="size-7" strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />
      </span>
      <span className="font-mono text-[10.5px] text-ink-2">[UNPAID] invoices</span>
      <span className="flex items-center gap-1 text-[10px] text-ink-3"><FileText className="size-3" /> 37 files</span>
    </div>
  )
}

export function PayrollWindow() {
  return (
    <Chrome title="Payroll — October run" className="w-[260px]">
      <div className="px-3 py-2">
        <p className="text-[12px] font-medium text-ink">Reimbursements to add</p>
        <p className="text-[10px] text-ink-3">Due to payroll by Oct 27 · 11 pending</p>
      </div>
      {[
        ["P. Raman", "412.80", "missing"],
        ["J. Bell", "86.40", "ok"],
        ["L. Sato", "1,032.00", "missing"],
      ].map(([name, amt, state]) => (
        <div key={name} className="flex items-center gap-2 border-t border-line px-3 py-1.5 text-[10.5px]">
          <span className="text-ink-2">{name}</span>
          <span className="ml-auto font-mono text-ink">${amt}</span>
          <span className={cn("rounded-[3px] px-1 text-[9px]", state === "ok" ? "bg-signal-green-soft text-signal-green" : "bg-signal-red-soft text-signal-red")}>
            {state === "ok" ? "ready" : "no receipt"}
          </span>
        </div>
      ))}
    </Chrome>
  )
}
