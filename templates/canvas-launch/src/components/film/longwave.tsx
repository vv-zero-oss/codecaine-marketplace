import type * as React from "react"
import { Headphones, Heart, Home, Library, MoreHorizontal, Pause, Play, Plus, Search, SkipBack, SkipForward, Compass, ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

/*
 * Longwave — the sample app the film builds: a small radio-and-records player,
 * desktop and phone. It is drawn in three states so a scene can watch it being
 * made: `empty` (the frame is there, nothing in it), `wire` (the layout is
 * blocked out, outlined in the editor's blue) and `full` (the real screen).
 * Cover art is gradients from the art tokens, so no image has to load.
 */

export type Build = "empty" | "wire" | "full"
export type Screen = "home" | "explore" | "library" | "m-home" | "m-album" | "m-library"

export const SCREEN_SIZE: Record<Screen, { w: number; h: number; title: string }> = {
  home: { w: 560, h: 350, title: "Home" },
  explore: { w: 560, h: 350, title: "Explore" },
  library: { w: 560, h: 350, title: "Library" },
  "m-home": { w: 180, h: 380, title: "Mobile - Home" },
  "m-album": { w: 180, h: 380, title: "Mobile - Album" },
  "m-library": { w: 180, h: 380, title: "Mobile - Library" },
}

const COVERS = [
  "from-art-1 to-art-5",
  "from-art-3 to-art-4",
  "from-art-8 to-art-7",
  "from-art-2 to-art-6",
  "from-art-5 to-art-6",
  "from-art-1 to-art-3",
]

export const ALBUMS = [
  { title: "Low Tide Hours", artist: "Mara Ellis" },
  { title: "Porchlight", artist: "The Hollows" },
  { title: "North Radio", artist: "Ines Vale" },
  { title: "Slow Signal", artist: "Kōda" },
  { title: "Paper Boats", artist: "June Arden" },
  { title: "Driftwood", artist: "Sol Mirez" },
]

/** A block of the layout: outlined in wire mode, real in full. */
function B({
  build,
  className,
  children,
  style,
}: {
  build: Build
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}) {
  if (build === "empty") return null
  if (build === "wire") return <div className={cn("rounded-[2px] outline outline-1 -outline-offset-1 outline-ed-accent/80", className)} style={style} />
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export function Cover({ i, className }: { i: number; className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden bg-gradient-to-br", COVERS[i % COVERS.length], className)}>
      <span className="absolute -right-1/4 -bottom-1/4 size-3/4 rounded-full bg-app-light/15" />
    </span>
  )
}

export function LongwaveScreen({ screen, build = "full", className }: { screen: Screen; build?: Build; className?: string }) {
  const size = SCREEN_SIZE[screen]
  return (
    <div
      className={cn("relative overflow-hidden text-app-ink", build === "empty" ? "bg-ed-field" : "bg-app-bg", className)}
      style={{ width: size.w, height: size.h }}
    >
      {screen === "home" && <DesktopHome build={build} />}
      {screen === "explore" && <DesktopExplore build={build} />}
      {screen === "library" && <DesktopLibrary build={build} />}
      {screen === "m-home" && <MobileHome build={build} />}
      {screen === "m-album" && <MobileAlbum build={build} />}
      {screen === "m-library" && <MobileLibrary build={build} />}
    </div>
  )
}

function Sidebar({ build, active }: { build: Build; active: string }) {
  return (
    <B build={build} className="absolute inset-y-0 left-0 w-[128px] border-r border-app-line bg-app-panel p-3 text-[9px]">
      <p className="mb-4 flex items-center gap-1.5 text-[11px] font-semibold">
        <Headphones className="size-3.5" strokeWidth={2} /> Longwave
      </p>
      {[
        ["Home", Home],
        ["Explore", Compass],
        ["My Library", Library],
      ].map(([label, Icon]) => {
        const I = Icon as typeof Home
        return (
          <p key={label as string} className={cn("mb-1 flex items-center gap-1.5 rounded-[4px] px-1.5 py-1", active === label ? "bg-app-raised text-app-ink" : "text-app-muted")}>
            <I className="size-3" strokeWidth={2} />
            {label as string}
          </p>
        )
      })}
      <p className="mt-4 mb-1.5 flex items-center justify-between text-[7px] tracking-wider text-app-muted uppercase">
        Your stations <Plus className="size-2.5" />
      </p>
      {["Late Night Drive", "Sunday Records", "Rain on Glass"].map((s) => (
        <p key={s} className="py-0.5 text-app-muted">
          {s}
        </p>
      ))}
    </B>
  )
}

function Topbar({ build }: { build: Build }) {
  return (
    <B build={build} className="absolute top-2.5 right-3 left-[140px] flex h-5 items-center justify-end gap-2">
      <span className="flex h-5 w-40 items-center gap-1 rounded-full bg-app-raised px-2 text-[8px] text-app-muted">
        <Search className="size-2.5" /> Search records, stations…
      </span>
      <Cover i={3} className="size-5 rounded-full" />
    </B>
  )
}

function Player({ build }: { build: Build }) {
  return (
    <B build={build} className="absolute inset-x-0 bottom-0 flex h-9 items-center gap-2 border-t border-app-line bg-app-panel px-3 text-[8px]">
      <Cover i={0} className="size-6 rounded-[3px]" />
      <span>
        <b className="block font-medium">Low Tide Hours</b>
        <span className="text-app-muted">Mara Ellis</span>
      </span>
      <span className="mx-auto flex items-center gap-2.5 text-app-muted">
        <SkipBack className="size-3" />
        <span className="grid size-5 place-items-center rounded-full bg-app-ink text-app-bg">
          <Pause className="size-2.5 fill-current" strokeWidth={0} />
        </span>
        <SkipForward className="size-3" />
      </span>
      <span className="h-0.5 w-16 rounded-full bg-app-raised">
        <span className="block h-full w-2/3 rounded-full bg-app-accent" />
      </span>
    </B>
  )
}

function DesktopHome({ build }: { build: Build }) {
  return (
    <>
      <Sidebar build={build} active="Home" />
      <Topbar build={build} />
      <B build={build} className="absolute top-10 left-[140px] h-3 w-24">
        <p className="text-[12px] font-semibold">Good evening</p>
      </B>
      <B build={build} className="absolute top-[60px] right-3 left-[140px] grid h-[118px] grid-cols-5 gap-2">
        {ALBUMS.slice(0, 5).map((a, i) => (
          <div key={a.title}>
            <Cover i={i} className="aspect-square rounded-[4px]" />
            <p className="mt-1 truncate text-[7.5px] font-medium">{a.title}</p>
            <p className="truncate text-[7px] text-app-muted">{a.artist}</p>
          </div>
        ))}
      </B>
      <B build={build} className="absolute top-[190px] left-[140px] h-3 w-24">
        <p className="text-[10px] font-semibold">Recently played</p>
      </B>
      <B build={build} className="absolute top-[208px] right-3 left-[140px] h-[92px] space-y-1">
        {ALBUMS.slice(1, 5).map((a, i) => (
          <div key={a.title} className="flex items-center gap-2 rounded-[4px] bg-app-panel px-1.5 py-1 text-[8px]">
            <Cover i={i + 2} className="size-4 rounded-[2px]" />
            <span className="flex-1 truncate">{a.title}</span>
            <span className="text-app-muted">{a.artist}</span>
            <span className="w-8 text-right text-app-muted">{3 + i}:1{i}</span>
          </div>
        ))}
      </B>
      <Player build={build} />
    </>
  )
}

function DesktopExplore({ build }: { build: Build }) {
  const genres = ["Ambient", "Folk", "Jazz", "Electronic", "Soul", "Classical", "Lo-fi", "World"]
  return (
    <>
      <Sidebar build={build} active="Explore" />
      <Topbar build={build} />
      <B build={build} className="absolute top-10 left-[140px] h-3 w-24">
        <p className="text-[12px] font-semibold">Browse genres</p>
      </B>
      <B build={build} className="absolute top-[60px] right-3 left-[140px] grid h-[110px] grid-cols-4 gap-2">
        {genres.map((g, i) => (
          <span key={g} className={cn("relative overflow-hidden rounded-[5px] bg-gradient-to-br p-1.5 text-[8px] font-semibold", COVERS[i % 6])}>
            {g}
          </span>
        ))}
      </B>
      <B build={build} className="absolute top-[182px] left-[140px] h-3 w-24">
        <p className="text-[10px] font-semibold">New records</p>
      </B>
      <B build={build} className="absolute top-[200px] right-3 left-[140px] grid h-[100px] grid-cols-6 gap-2">
        {ALBUMS.map((a, i) => (
          <div key={a.title}>
            <Cover i={i + 3} className="aspect-square rounded-[4px]" />
            <p className="mt-1 truncate text-[7px]">{a.title}</p>
          </div>
        ))}
      </B>
      <Player build={build} />
    </>
  )
}

function DesktopLibrary({ build }: { build: Build }) {
  return (
    <>
      <Sidebar build={build} active="My Library" />
      <Topbar build={build} />
      <B build={build} className="absolute top-10 left-[140px] flex h-4 gap-1.5 text-[8px]">
        {["All", "Stations", "Records", "Artists"].map((t, i) => (
          <span key={t} className={cn("rounded-full px-2 py-0.5", i === 0 ? "bg-app-ink text-app-bg" : "bg-app-raised text-app-muted")}>
            {t}
          </span>
        ))}
      </B>
      <B build={build} className="absolute top-[66px] right-3 left-[140px] h-[240px] space-y-1">
        {[...ALBUMS, ...ALBUMS.slice(0, 2)].map((a, i) => (
          <div key={i} className="flex items-center gap-2 border-b border-app-line py-1 text-[8px]">
            <span className="w-3 text-app-muted">{i + 1}</span>
            <Cover i={i} className="size-4 rounded-[2px]" />
            <span className="flex-1 truncate">{a.title}</span>
            <span className="w-20 truncate text-app-muted">{a.artist}</span>
            <Heart className={cn("size-2.5", i % 3 === 0 ? "fill-app-accent text-app-accent" : "text-app-muted")} />
          </div>
        ))}
      </B>
      <Player build={build} />
    </>
  )
}

function StatusBar({ build }: { build: Build }) {
  return (
    <B build={build} className="absolute inset-x-3 top-2 flex h-3 items-center justify-between text-[8px] font-semibold">
      <span>9:41</span>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1 rounded-[1px] bg-app-ink" />
        ))}
      </span>
    </B>
  )
}

function MobileHome({ build }: { build: Build }) {
  return (
    <>
      <StatusBar build={build} />
      <B build={build} className="absolute top-8 right-3 left-3 flex h-4 items-center justify-between">
        <p className="flex items-center gap-1 text-[10px] font-semibold">
          <Headphones className="size-3" strokeWidth={2} /> Longwave
        </p>
        <Cover i={3} className="size-4 rounded-full" />
      </B>
      <B build={build} className="absolute top-16 left-3 h-4 w-28">
        <p className="text-[13px] font-semibold">Good evening</p>
      </B>
      <B build={build} className="absolute top-[88px] right-3 left-3 grid h-[150px] grid-cols-2 gap-2">
        {ALBUMS.slice(0, 4).map((a, i) => (
          <div key={a.title}>
            <Cover i={i} className="aspect-square rounded-[5px]" />
            <p className="mt-0.5 truncate text-[7px]">{a.title}</p>
          </div>
        ))}
      </B>
      <B build={build} className="absolute top-[252px] right-3 left-3 h-[80px] space-y-1">
        {ALBUMS.slice(2, 5).map((a, i) => (
          <div key={a.title} className="flex items-center gap-1.5 text-[7.5px]">
            <Cover i={i + 3} className="size-5 rounded-[3px]" />
            <span className="flex-1 truncate">{a.title}</span>
            <MoreHorizontal className="size-2.5 text-app-muted" />
          </div>
        ))}
      </B>
      <B build={build} className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-around border-t border-app-line bg-app-panel text-app-muted">
        <Home className="size-3 text-app-ink" />
        <Compass className="size-3" />
        <Library className="size-3" />
      </B>
    </>
  )
}

function MobileAlbum({ build }: { build: Build }) {
  return (
    <>
      <StatusBar build={build} />
      <B build={build} className="absolute top-8 right-3 left-3 flex h-4 items-center justify-between text-[9px] font-semibold">
        <ChevronLeft className="size-3" />
        Low Tide Hours
        <MoreHorizontal className="size-3" />
      </B>
      <B build={build} className="absolute top-[58px] right-4 left-4 aspect-square">
        <Cover i={0} className="size-full rounded-[6px]" />
      </B>
      <B build={build} className="absolute top-[214px] right-4 left-4 h-7">
        <p className="text-[12px] font-semibold">Low Tide Hours</p>
        <p className="text-[8px] text-app-muted">Mara Ellis · 11 songs</p>
      </B>
      <B build={build} className="absolute top-[252px] right-4 left-4 flex h-7 items-center justify-center gap-4">
        <SkipBack className="size-3" />
        <span className="grid size-7 place-items-center rounded-full bg-app-accent text-app-bg">
          <Play className="size-3 fill-current" strokeWidth={0} />
        </span>
        <SkipForward className="size-3" />
      </B>
      <B build={build} className="absolute top-[292px] right-4 left-4 h-[70px] space-y-1.5">
        {["Harbour Lights", "Salt & Static", "Low Tide Hours"].map((t, i) => (
          <p key={t} className="flex justify-between text-[7.5px]">
            <span>
              {i + 1}. {t}
            </span>
            <span className="text-app-muted">3:4{i}</span>
          </p>
        ))}
      </B>
    </>
  )
}

function MobileLibrary({ build }: { build: Build }) {
  return (
    <>
      <StatusBar build={build} />
      <B build={build} className="absolute top-8 right-3 left-3 flex h-4 items-center justify-between">
        <p className="text-[13px] font-semibold">Your Library</p>
        <Search className="size-3" />
      </B>
      <B build={build} className="absolute top-[58px] right-3 left-3 flex h-4 gap-1 text-[7px]">
        {["Stations", "Records", "Artists"].map((t, i) => (
          <span key={t} className={cn("rounded-full px-1.5 py-0.5", i === 0 ? "bg-app-ink text-app-bg" : "bg-app-raised text-app-muted")}>
            {t}
          </span>
        ))}
      </B>
      <B build={build} className="absolute top-[84px] right-3 left-3 h-[260px] space-y-1.5">
        {ALBUMS.map((a, i) => (
          <div key={a.title} className="flex items-center gap-1.5 text-[7.5px]">
            <Cover i={i} className="size-7 rounded-[3px]" />
            <span className="flex-1">
              <b className="block truncate font-medium">{a.title}</b>
              <span className="text-app-muted">{a.artist}</span>
            </span>
          </div>
        ))}
      </B>
    </>
  )
}
