import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import * as THREE from "three"

import { createSketchMaterial } from "@/components/three/sketch-material"
import { LOOKS, pexels } from "@/content"
import { cn } from "@/lib/utils"
import { cubic, duration, ease, prefersReducedMotion } from "@/lib/tokens"

THREE.ColorManagement.enabled = false

type Rect = { x0: number; y0: number; x1: number; y1: number }

/** Everything the render loop owns. Held in one ref for the component's
 *  lifetime, so the editor's SDK can find the renderer and the loop. */
type Stage = {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  group: THREE.Group
  meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>[]
  slot: number[]
  from: number[]
  slideStart: number
  frame: number
  width: number
  height: number
  pointer: { x: number; y: number; inside: boolean }
  tilt: { x: number; y: number }
  box: { t: number; dir: 0 | 1 | -1; start: number; cx: number; cy: number; worn: number }
}

const photo = (id: number) => pexels(id, 800, 1200)

/**
 * TryOnStage — the hero's WebGL carousel.
 *
 * Five outfits stand in a shallow arc, each drawn as a pencil sketch by a
 * shader. Hover the one in front and a selection box opens from the cursor
 * (330ms, ease-out, as measured off the reference) with the photo — the real
 * garment — inside it, and a prompt types itself beside it. Press the arrow
 * and the whole look is "tried on". The arrows turn the carousel over 640ms.
 *
 * Every knob is a scalar prop the editor can override: `index`, `tilt`,
 * `spacing`, `lineWeight`, `boxWidth`, `boxHeight` and `autoplay`.
 */
export function TryOnStage({
  index: initialIndex = 0,
  tilt = 4,
  spacing = 0.4,
  lineWeight = 1,
  boxWidth = 0.62,
  boxHeight = 0.5,
  autoplay = false,
  className,
}: {
  index?: number
  /** Degrees the arc leans towards the pointer. */
  tilt?: number
  /** Distance between looks, as a share of the stage's width. */
  spacing?: number
  /** Pencil pressure: above 1 is darker, below is lighter. */
  lineWeight?: number
  /** The reveal box, as a share of the front look's width and height. */
  boxWidth?: number
  boxHeight?: number
  autoplay?: boolean
  className?: string
}) {
  const host = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const stage = useRef<Stage | null>(null)
  const [index, setIndex] = useState(initialIndex)
  const [open, setOpen] = useState(false)
  const [worn, setWorn] = useState(false)
  const [typed, setTyped] = useState(0)
  const { designing } = useCanvasDesignMode()
  const look = LOOKS[((index % LOOKS.length) + LOOKS.length) % LOOKS.length]

  useEffect(() => setIndex(initialIndex), [initialIndex])

  // The loop reads this rather than the state, so it never restarts.
  const wornRef = useRef(false)
  const props = useRef({ tilt, spacing, lineWeight, boxWidth, boxHeight })
  props.current = { tilt, spacing, lineWeight, boxWidth, boxHeight }

  /* ── Set up three.js once ─────────────────────────────────────────── */
  useEffect(() => {
    const element = host.current
    if (!element) return
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.className = "absolute inset-0 size-full"
    element.prepend(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 10, 5000)
    const group = new THREE.Group()
    scene.add(group)

    const styles = getComputedStyle(document.documentElement)
    const ink = new THREE.Color(styles.getPropertyValue("--ink").trim() || "#1b1612")
    const paper = new THREE.Color(styles.getPropertyValue("--linen").trim() || "#eee8df")

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin("anonymous")
    const meshes = LOOKS.map((item) => {
      const texture = loader.load(photo(item.id), () => {
        material.uniforms.uReady.value = 1
      })
      texture.colorSpace = THREE.NoColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      const material = createSketchMaterial(texture)
      material.uniforms.uInk.value = ink
      material.uniforms.uPaper.value = paper
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.5), material)
      group.add(mesh)
      return mesh
    })

    const s: Stage = {
      renderer,
      scene,
      camera,
      group,
      meshes,
      slot: LOOKS.map((_, i) => i),
      from: LOOKS.map((_, i) => i),
      slideStart: -1,
      frame: 0,
      width: 1,
      height: 1,
      pointer: { x: 0, y: 0, inside: false },
      tilt: { x: 0, y: 0 },
      box: { t: 0, dir: 0, start: 0, cx: 0, cy: 0, worn: 0 },
    }
    stage.current = s

    const resize = () => {
      const { width, height } = element.getBoundingClientRect()
      s.width = Math.max(1, width)
      s.height = Math.max(1, height)
      renderer.setSize(s.width, s.height, false)
      camera.aspect = s.width / s.height
      // One world unit is one CSS pixel at z = 0.
      camera.position.z = s.height / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      camera.near = camera.position.z / 20
      camera.far = camera.position.z * 20
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(element)

    const slideEase = cubic(ease.inOut)
    const boxOpen = cubic(ease.out)
    const corner = new THREE.Vector3()

    const loop = (now: number) => {
      s.frame = requestAnimationFrame(loop)
      const { tilt: lean, spacing: gap, lineWeight: weight, boxWidth: bw, boxHeight: bh } = props.current
      const reduced = prefersReducedMotion()
      const n = LOOKS.length
      const mobile = s.width < 640
      const lookH = Math.min(s.height * (mobile ? 0.5 : 0.66), s.width * (mobile ? 1.05 : 0.55))
      const lookW = lookH / 1.5

      // Carousel: each mesh eases from its old slot to its new one.
      const p = s.slideStart < 0 || reduced ? 1 : Math.min(1, (now - s.slideStart) / duration.slide)
      const eased = slideEase(p)
      meshes.forEach((mesh, i) => {
        let from = s.from[i]
        let to = s.slot[i]
        // Wrap around the short way, so the look leaving one edge enters the other.
        if (to - from > n / 2) from += n
        if (from - to > n / 2) from -= n
        const k = from + (to - from) * eased
        const wrapped = ((k + n / 2) % n + n) % n - n / 2
        const a = Math.abs(wrapped)
        mesh.position.set(wrapped * s.width * (mobile ? 0.62 : gap), (mobile ? -0.02 : 0.02) * s.height, -a * 180)
        mesh.rotation.y = -wrapped * 0.22
        const scale = lookW * (1 - Math.min(a, 1.5) * 0.12)
        mesh.scale.set(scale, scale, 1)
        mesh.material.uniforms.uOpacity.value = THREE.MathUtils.clamp(1.9 - a, 0, 1)
        mesh.material.uniforms.uWeight.value = weight
        mesh.material.uniforms.uTexel.value.set(1 / (scale * 1.4), 1 / (scale * 1.5 * 1.4))
        mesh.renderOrder = 10 - Math.round(a * 2)
      })

      // Lean towards the pointer, damped.
      const tx = s.pointer.inside && !reduced ? s.pointer.y * lean : 0
      const ty = s.pointer.inside && !reduced ? s.pointer.x * lean : 0
      s.tilt.x += (tx - s.tilt.x) * 0.06
      s.tilt.y += (ty - s.tilt.y) * 0.06
      group.rotation.x = THREE.MathUtils.degToRad(s.tilt.x)
      group.rotation.y = THREE.MathUtils.degToRad(s.tilt.y)
      group.updateMatrixWorld()

      // The front look's rectangle on screen, from its projected corners.
      const front = meshes.find((_, i) => s.slot[i] === 0)!
      const rect: Rect = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity }
      for (const [cx, cy] of [[-0.5, -0.75], [0.5, -0.75], [-0.5, 0.75], [0.5, 0.75]]) {
        corner.set(cx, cy, 0).applyMatrix4(front.matrixWorld).project(camera)
        const x = (corner.x * 0.5 + 0.5) * s.width
        const y = (0.5 - corner.y * 0.5) * s.height
        rect.x0 = Math.min(rect.x0, x)
        rect.x1 = Math.max(rect.x1, x)
        rect.y0 = Math.min(rect.y0, y)
        rect.y1 = Math.max(rect.y1, y)
      }

      // The selection box: opens from the cursor, follows it, closes to its centre.
      const b = s.box
      const span = b.dir === 1 ? duration.reveal : duration.dismiss
      const bp = reduced ? 1 : Math.min(1, (now - b.start) / span)
      const openness = b.dir === 1 ? boxOpen(bp) : b.dir === -1 ? 1 - boxOpen(bp) : b.t
      if (b.dir !== 0 && bp >= 1) {
        b.t = b.dir === 1 ? 1 : 0
        b.dir = 0
      }
      const w = (rect.x1 - rect.x0) * bw
      const h = (rect.y1 - rect.y0) * bh
      const px = s.pointer.inside ? s.pointer.x * 0.5 * s.width + s.width / 2 : (rect.x0 + rect.x1) / 2
      const py = s.pointer.inside ? s.pointer.y * 0.5 * s.height + s.height / 2 : (rect.y0 + rect.y1) / 2
      b.cx += (THREE.MathUtils.clamp(px, rect.x0 + w / 2, rect.x1 - w / 2) - b.cx) * (b.t === 0 && b.dir === 1 && bp < 0.05 ? 1 : 0.18)
      b.cy += (THREE.MathUtils.clamp(py, rect.y0 + h / 2, rect.y1 - h / 2) - b.cy) * (b.t === 0 && b.dir === 1 && bp < 0.05 ? 1 : 0.18)
      b.worn += ((wornRef.current ? 1 : 0) - b.worn) * (reduced ? 1 : 0.12)
      if (!Number.isFinite(b.cx) || !Number.isFinite(b.cy)) {
        b.cx = (rect.x0 + rect.x1) / 2
        b.cy = (rect.y0 + rect.y1) / 2
      }
      const lerp = (x: number, y: number) => x + (y - x) * b.worn
      let box: Rect = {
        x0: lerp(b.cx - (w / 2) * openness, rect.x0),
        x1: lerp(b.cx + (w / 2) * openness, rect.x1),
        y0: lerp(b.cy - (h / 2) * openness, rect.y0),
        y1: lerp(b.cy + (h / 2) * openness, rect.y1),
      }
      if (openness <= 0.001 && b.worn < 0.001) box = { x0: 0, y0: 0, x1: 0, y1: 0 }

      const dpr = renderer.getPixelRatio()
      for (const mesh of meshes) {
        const u = mesh.material.uniforms.uBox.value as THREE.Vector4
        if (mesh === front) u.set(box.x0 * dpr, (s.height - box.y1) * dpr, box.x1 * dpr, (s.height - box.y0) * dpr)
        else u.set(0, 0, 0, 0)
      }

      const node = boxRef.current
      if (node) {
        const visible = box.x1 - box.x0 > 2
        node.style.opacity = visible ? "1" : "0"
        node.style.transform = `translate(${box.x0}px, ${box.y0}px)`
        node.style.width = `${Math.max(0, box.x1 - box.x0)}px`
        node.style.height = `${Math.max(0, box.y1 - box.y0)}px`
      }

      renderer.render(scene, camera)
    }
    s.frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(s.frame)
      observer.disconnect()
      meshes.forEach((mesh) => {
        mesh.geometry.dispose()
        mesh.material.uniforms.uMap.value.dispose()
        mesh.material.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
      stage.current = null
    }
  }, [])

  /* ── Carousel position → slots ────────────────────────────────────── */
  useEffect(() => {
    const s = stage.current
    if (!s) return
    const n = LOOKS.length
    const at = ((index % n) + n) % n
    s.from = s.meshes.map((_, i) => {
      // Where each mesh is right now, so a second click mid-slide carries on.
      return s.slot[i]
    })
    s.slot = LOOKS.map((_, i) => {
      let k = i - at
      if (k > n / 2) k -= n
      if (k < -n / 2) k += n
      return k
    })
    s.slideStart = performance.now()
    wornRef.current = false
    setWorn(false)
    closeBox()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  /* ── The box ──────────────────────────────────────────────────────── */
  const openBox = useCallback(() => {
    const s = stage.current
    if (!s || s.box.t === 1 || s.box.dir === 1) return
    s.box.start = performance.now()
    s.box.dir = 1
    setOpen(true)
  }, [])
  const closeBox = useCallback(() => {
    const s = stage.current
    if (!s || (s.box.t === 0 && s.box.dir !== 1)) return
    s.box.start = performance.now()
    s.box.dir = -1
    s.box.t = 1
    setOpen(false)
  }, [])

  // Typewriter for the prompt, 32ms a character once the box has opened.
  useEffect(() => {
    if (!open) {
      setTyped(0)
      return
    }
    if (prefersReducedMotion()) {
      setTyped(look.prompt.length)
      return
    }
    let i = 0
    const start = window.setTimeout(function tick() {
      i += 1
      setTyped(i)
      if (i < look.prompt.length) timer = window.setTimeout(tick, 32)
    }, duration.reveal * 0.6)
    let timer = start
    return () => window.clearTimeout(timer)
  }, [open, look.prompt])

  // Autoplay, held still while the look is being designed or hovered.
  useEffect(() => {
    if (!autoplay || designing || open || prefersReducedMotion()) return
    const id = window.setInterval(() => setIndex((i) => i + 1), 4200)
    return () => window.clearInterval(id)
  }, [autoplay, designing, open])

  const setWornBoth = (next: boolean) => {
    wornRef.current = next
    setWorn(next)
  }

  useCanvasAction("Try-on box", (next) => ((next ?? !open) ? openBox() : closeBox()), { on: open, group: "Hero" })
  useCanvasAction(
    "Look tried on",
    (next) => {
      const value = next ?? !wornRef.current
      if (value) openBox()
      setWornBoth(value)
    },
    { on: worn, group: "Hero" },
  )
  useCanvasAction("Next look", () => setIndex((i) => i + 1), { group: "Hero" })

  const onPointer = (event: React.PointerEvent) => {
    const s = stage.current
    const element = host.current
    if (!s || !element) return
    const bounds = element.getBoundingClientRect()
    s.pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    s.pointer.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
    s.pointer.inside = true
    if (event.pointerType !== "mouse") return
    // Open when over the front look (the middle third of the stage).
    const overFront = Math.abs(s.pointer.x) < 0.24 && Math.abs(s.pointer.y) < 0.62
    if (overFront) openBox()
    else if (!wornRef.current) closeBox()
  }

  return (
    <div
      ref={host}
      className={cn("relative touch-pan-y select-none", className)}
      onPointerMove={onPointer}
      onPointerLeave={() => {
        if (stage.current) stage.current.pointer.inside = false
        if (!wornRef.current) closeBox()
      }}
      onClick={(event) => {
        // Touch has no hover: a tap on the front look opens the box.
        if ((event.nativeEvent as PointerEvent).pointerType === "mouse") return
        if (open) closeBox()
        else openBox()
      }}
    >
      {/* The selection box, placed by the render loop every frame. */}
      <div
        ref={boxRef}
        aria-hidden={!open}
        className="pointer-events-none absolute top-0 left-0 z-10 border border-clay opacity-0"
      >
        {[
          "-top-[4px] -left-[4px]",
          "-top-[4px] -right-[4px]",
          "-bottom-[4px] -left-[4px]",
          "-right-[4px] -bottom-[4px]",
        ].map((position) => (
          <span key={position} className={cn("absolute size-[7px] border border-clay bg-paper", position)} />
        ))}
        <TryOnPrompt
          text={look.prompt.slice(0, typed)}
          full={look.prompt}
          visible={open}
          worn={worn}
          onSubmit={() => setWornBoth(!worn)}
        />
      </div>

      <CarouselArrow side="left" onClick={() => setIndex((i) => i - 1)} />
      <CarouselArrow side="right" onClick={() => setIndex((i) => i + 1)} />
      <p className="sr-only" aria-live="polite">
        {look.name}
        {worn ? ", tried on" : ""}
      </p>
    </div>
  )
}

/** The prompt pill that sits on the selection box's right edge. */
export function TryOnPrompt({
  text,
  full,
  visible,
  worn,
  onSubmit,
  className,
}: {
  className?: string
  text: string
  full: string
  visible: boolean
  worn: boolean
  onSubmit: () => void
}) {
  return (
    <div
      className={cn(
        "pointer-events-auto absolute top-1/2 left-[46%] flex h-10 w-[min(15rem,70vw)] -translate-y-1/2 items-center gap-2 rounded-md bg-espresso py-1 pr-1 pl-3 text-[13px] text-cream shadow-float transition-[opacity,transform] duration-[var(--dur-reveal)] ease-(--ease-out)",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-2 opacity-0",
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate">
        {worn ? "Fitted — size M, regular" : text || " "}
        {!worn && text.length < full.length ? (
          <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-caret bg-cream" />
        ) : null}
      </span>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onSubmit()
        }}
        aria-label={worn ? "Show the sketch again" : full}
        className="flex size-8 shrink-0 items-center justify-center rounded-[5px] bg-clay text-paper transition-[background-color,transform] duration-150 hover:bg-clay-hover active:scale-[0.94]"
      >
        {worn ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
      </button>
    </div>
  )
}

export function CarouselArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      aria-label={side === "left" ? "Previous look" : "Next look"}
      className={cn(
        "absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink-3 transition-[color,background-color,transform] duration-150 hover:bg-ink/5 hover:text-ink active:scale-[0.92]",
        side === "left" ? "left-[calc(50%-min(21vw,300px))] max-sm:left-2" : "right-[calc(50%-min(21vw,300px))] max-sm:right-2",
      )}
    >
      <Icon className="size-4" strokeWidth={1.5} />
    </button>
  )
}
