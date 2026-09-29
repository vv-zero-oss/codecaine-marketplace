/**
 * The infinite grid, drawn with WebGL.
 *
 * Why not DOM: the grid is endless in every direction and moves every frame
 * while it is dragged. As DOM, that is a hundred absolutely-positioned images
 * re-laid-out sixty times a second, and downscaled portraits shimmer when
 * zoomed out. Here every portrait is one textured quad with mipmaps, so a
 * zoomed-out grid stays clean and panning is a matter of changing two numbers.
 * The captions are drawn on a 2D canvas laid over it, so the type stays crisp
 * at every zoom.
 *
 * The world is one tile of `COLUMNS × ROWS` portraits repeated forever; odd
 * columns sit `OFFSET` lower, which is what gives the grid its stagger. Every
 * measurement is in "design pixels" at a 1716px-wide screen and scaled by
 * `unit` for the window it runs in.
 */

import { pexels, type Person } from "@/content"

export const COLUMNS = 12
export const ROWS = 7
const PITCH_X = 270
const PITCH_Y = 295
const OFFSET = 70
const TILE = 138
const CAPTION = 11

/** The intro's diamond: 13 tiles on a 111px lattice, 83px each. */
const CLUSTER_PITCH = 111
const CLUSTER_TILE = 83
const DIAMOND: [number, number][] = [
  [0, -2],
  [-1, -1],
  [1, -1],
  [0, 0],
  [-1, 1],
  [0, 2],
  [0, -1],
  [1, 1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [-2, 0],
  [2, 0],
]

const ZOOM_MIN = 0.45
const ZOOM_MAX = 1.9

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeOutBack = (t: number) => {
  const c = 1.4
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2)
}
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const mod = (n: number, m: number) => ((n % m) + m) % m
/** Frame-rate-independent approach factor: `k` is the share covered per 60fps frame. */
const approach = (k: number, dt: number) => 1 - Math.pow(1 - k, dt * 60)

interface TextureSlot {
  texture: WebGLTexture | null
  state: "idle" | "loading" | "ready" | "failed"
  loadedAt: number
}

interface VisibleTile {
  person: number
  /** Screen rectangle, CSS pixels. */
  x: number
  y: number
  size: number
  alpha: number
  key: string
}

export interface GridOptions {
  people: Person[]
  /** Whether a person passes the current filters. */
  matches: (person: Person) => boolean
  onOpen: (person: Person) => void
  onHover?: (person: Person | null) => void
  /** The intro reached the burst ("burst") or finished ("live"). */
  onPhase?: (phase: "burst" | "live") => void
  reducedMotion: boolean
}

type Phase =
  | { name: "waiting" }
  | { name: "cluster"; start: number; order: VisibleTile[] }
  | { name: "burst"; start: number; from: Map<string, { x: number; y: number; size: number }> }
  | { name: "live" }
  | { name: "leaving"; start: number; seeds: Map<string, number>; done: () => void }

const VERTEX = `
attribute vec2 a_unit;
uniform vec4 u_rect;
uniform vec2 u_viewport;
varying vec2 v_uv;
void main() {
  vec2 px = u_rect.xy + a_unit * u_rect.zw;
  vec2 clip = (px / u_viewport) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  v_uv = a_unit;
}`

const FRAGMENT = `
precision mediump float;
uniform sampler2D u_texture;
uniform float u_ready;
uniform float u_alpha;
uniform float u_mute;
uniform vec3 u_placeholder;
varying vec2 v_uv;
void main() {
  vec3 color = mix(u_placeholder, texture2D(u_texture, v_uv).rgb, u_ready);
  float grey = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(color, vec3(grey), u_mute);
  gl_FragColor = vec4(color * u_alpha, u_alpha);
}`

export class GridRenderer {
  private gl: WebGLRenderingContext
  private ctx: CanvasRenderingContext2D
  private program: WebGLProgram
  private uniforms: Record<string, WebGLUniformLocation | null> = {}
  private textures: TextureSlot[]
  private frame = 0
  private last = 0
  private width = 0
  private height = 0
  private dpr = 1
  private unit = 1

  /** Camera, in world design pixels: the world point at the centre of the screen. */
  private camera = { x: 0, y: 0, zoom: 1 }
  private target = { x: 0, y: 0, zoom: 1 }

  private pointers = new Map<number, { x: number; y: number }>()
  private drag: { x: number; y: number; moved: number; time: number; vx: number; vy: number } | null = null
  private pinch: { distance: number; zoom: number } | null = null
  private hovered: string | null = null
  private hoverAmount = new Map<string, number>()
  private muteAmount: Float32Array
  private visible: VisibleTile[] = []
  private phase: Phase = { name: "waiting" }
  private labels = 1
  private dirty = true
  private font = "monospace"
  private ink = "#161616"

  constructor(
    private canvas: HTMLCanvasElement,
    private overlay: HTMLCanvasElement,
    private options: GridOptions,
  ) {
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: true, alpha: true })
    const ctx = overlay.getContext("2d")
    if (!gl || !ctx) throw new Error("WebGL is not available")
    this.gl = gl
    this.ctx = ctx
    this.program = this.createProgram()
    this.textures = options.people.map(() => ({ texture: null, state: "idle", loadedAt: 0 }))
    this.muteAmount = new Float32Array(options.people.length).fill(0)

    // Start in the middle of the world, so the first screen is surrounded on
    // every side and nothing about the repeat shows.
    this.camera.x = this.target.x = (COLUMNS * PITCH_X) / 2
    this.camera.y = this.target.y = (ROWS * PITCH_Y) / 2

    this.resize()
    this.bind()
    this.frame = requestAnimationFrame(this.tick)
  }

  // ─── Public ────────────────────────────────────────────────────────────

  /** The intro: tiles pop into a diamond at the centre, then burst out to the grid. */
  playIntro() {
    if (this.options.reducedMotion) {
      this.phase = { name: "live" }
      this.dirty = true
      return
    }
    const tiles = this.layout()
    const cx = this.width / 2
    const cy = this.height / 2
    const nearest = tiles
      .slice()
      .sort((a, b) => Math.hypot(a.x + a.size / 2 - cx, a.y + a.size / 2 - cy) - Math.hypot(b.x + b.size / 2 - cx, b.y + b.size / 2 - cy))
      .slice(0, DIAMOND.length)
    // Warm their textures first: the diamond should never show a grey square.
    for (const tile of nearest) this.load(tile.person)
    this.phase = { name: "cluster", start: performance.now(), order: nearest }
    this.labels = 0
    this.dirty = true
  }

  /** Skip whatever intro is running and show the grid. */
  finishIntro() {
    const wasIntro = this.phase.name === "cluster" || this.phase.name === "burst"
    this.phase = { name: "live" }
    if (wasIntro) this.options.onPhase?.("live")
    this.labels = 1
    this.dirty = true
  }

  /** Every tile fades out, in a scattered order, before the page changes. */
  leave(done: () => void) {
    if (this.options.reducedMotion) {
      done()
      return
    }
    const seeds = new Map<string, number>()
    for (const tile of this.visible) seeds.set(tile.key, Math.random())
    this.phase = { name: "leaving", start: performance.now(), seeds, done }
    this.dirty = true
  }

  refilter() {
    this.dirty = true
  }

  zoomBy(factor: number) {
    this.target.zoom = clamp(this.target.zoom * factor, ZOOM_MIN, ZOOM_MAX)
    this.dirty = true
  }

  panBy(dx: number, dy: number) {
    this.target.x += dx / (this.unit * this.target.zoom)
    this.target.y += dy / (this.unit * this.target.zoom)
    this.dirty = true
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.width = rect.width
    this.height = rect.height
    for (const c of [this.canvas, this.overlay]) {
      c.width = Math.round(rect.width * this.dpr)
      c.height = Math.round(rect.height * this.dpr)
    }
    // 1 at 1716px wide; smaller screens get smaller tiles, never below 0.62.
    this.unit = clamp(rect.width / 1716, 0.62, 1.1)
    this.restyle()
  }

  /** Re-read the caption font and ink from the CSS tokens (after fonts load). */
  restyle() {
    const root = getComputedStyle(document.documentElement)
    this.font = root.getPropertyValue("--font-mono").trim() || "monospace"
    this.ink = root.getPropertyValue("--color-ink").trim() || "#161616"
    this.dirty = true
  }

  destroy() {
    cancelAnimationFrame(this.frame)
    this.unbind()
    for (const slot of this.textures) if (slot.texture) this.gl.deleteTexture(slot.texture)
    this.gl.deleteProgram(this.program)
  }

  // ─── Setup ─────────────────────────────────────────────────────────────

  private createProgram() {
    const gl = this.gl
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader")
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW)
    const location = gl.getAttribLocation(program, "a_unit")
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)

    for (const name of ["u_rect", "u_viewport", "u_texture", "u_ready", "u_alpha", "u_mute", "u_placeholder"]) {
      this.uniforms[name] = gl.getUniformLocation(program, name)
    }
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    return program
  }

  private load(index: number) {
    const slot = this.textures[index]
    if (slot.state !== "idle") return
    slot.state = "loading"
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.decoding = "async"
    // 512² is a power of two, which WebGL 1 needs for mipmaps, and sharp
    // enough for a 138px tile on a 2x screen zoomed in.
    image.src = pexels(this.options.people[index].photo, 512, 512)
    image
      .decode()
      .then(() => {
        const gl = this.gl
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        const pot = image.naturalWidth === 512 && image.naturalHeight === 512
        if (pot) {
          gl.generateMipmap(gl.TEXTURE_2D)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        } else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        const aniso = gl.getExtension("EXT_texture_filter_anisotropic")
        if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 4)
        slot.texture = texture
        slot.state = "ready"
        slot.loadedAt = performance.now()
        this.dirty = true
      })
      .catch(() => {
        slot.state = "failed"
      })
  }

  // ─── Input ─────────────────────────────────────────────────────────────

  private bind() {
    const c = this.overlay
    c.addEventListener("pointerdown", this.onDown)
    c.addEventListener("pointermove", this.onMove)
    c.addEventListener("pointerup", this.onUp)
    c.addEventListener("pointercancel", this.onUp)
    c.addEventListener("pointerleave", this.onLeave)
    c.addEventListener("wheel", this.onWheel, { passive: false })
  }

  private unbind() {
    const c = this.overlay
    c.removeEventListener("pointerdown", this.onDown)
    c.removeEventListener("pointermove", this.onMove)
    c.removeEventListener("pointerup", this.onUp)
    c.removeEventListener("pointercancel", this.onUp)
    c.removeEventListener("pointerleave", this.onLeave)
    c.removeEventListener("wheel", this.onWheel)
  }

  private point(event: PointerEvent | WheelEvent) {
    const rect = this.overlay.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  private onDown = (event: PointerEvent) => {
    if (this.phase.name !== "live") {
      if (this.phase.name === "cluster" || this.phase.name === "burst") this.finishIntro()
      else return
    }
    this.overlay.setPointerCapture(event.pointerId)
    const p = this.point(event)
    this.pointers.set(event.pointerId, p)
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()]
      this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: this.target.zoom }
      this.drag = null
      return
    }
    this.drag = { x: p.x, y: p.y, moved: 0, time: performance.now(), vx: 0, vy: 0 }
  }

  private onMove = (event: PointerEvent) => {
    const p = this.point(event)
    if (this.pointers.has(event.pointerId)) this.pointers.set(event.pointerId, p)

    if (this.pinch && this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      this.zoomAround((a.x + b.x) / 2, (a.y + b.y) / 2, clamp((this.pinch.zoom * distance) / this.pinch.distance, ZOOM_MIN, ZOOM_MAX))
      return
    }

    if (this.drag) {
      const now = performance.now()
      const dx = p.x - this.drag.x
      const dy = p.y - this.drag.y
      const dt = Math.max(1, now - this.drag.time)
      this.drag.moved += Math.hypot(dx, dy)
      // Velocity in screen px per ms, smoothed so one jittery sample does not fling.
      this.drag.vx = this.drag.vx * 0.6 + (dx / dt) * 0.4
      this.drag.vy = this.drag.vy * 0.6 + (dy / dt) * 0.4
      this.drag.x = p.x
      this.drag.y = p.y
      this.drag.time = now
      const scale = this.unit * this.target.zoom
      this.target.x -= dx / scale
      this.target.y -= dy / scale
      // While dragging, the camera follows closely; the glide comes on release.
      this.camera.x += (this.target.x - this.camera.x) * 0.5
      this.camera.y += (this.target.y - this.camera.y) * 0.5
      if (this.drag.moved > 6) this.setHover(null)
      this.overlay.style.cursor = this.drag.moved > 6 ? "grabbing" : this.overlay.style.cursor
      this.dirty = true
      return
    }

    if (event.pointerType === "mouse") this.setHover(this.hit(p.x, p.y))
  }

  private onUp = (event: PointerEvent) => {
    this.pointers.delete(event.pointerId)
    if (this.pinch) {
      if (this.pointers.size < 2) this.pinch = null
      return
    }
    const drag = this.drag
    this.drag = null
    if (!drag) return
    const p = this.point(event)
    if (drag.moved <= 6) {
      const key = this.hit(p.x, p.y)
      const tile = this.visible.find((t) => t.key === key)
      if (tile) this.options.onOpen(this.options.people[tile.person])
      return
    }
    // Inertia: carry on in the direction of the throw for ~ a third of a second.
    if (!this.options.reducedMotion && performance.now() - drag.time < 80) {
      const scale = this.unit * this.target.zoom
      this.target.x -= (drag.vx * 320) / scale
      this.target.y -= (drag.vy * 320) / scale
    }
    this.overlay.style.cursor = event.pointerType === "mouse" && this.hit(p.x, p.y) ? "pointer" : "grab"
    this.dirty = true
  }

  private onLeave = () => {
    if (!this.drag) this.setHover(null)
  }

  private onWheel = (event: WheelEvent) => {
    event.preventDefault()
    if (this.phase.name === "cluster" || this.phase.name === "burst") this.finishIntro()
    const p = this.point(event)
    const lines = event.deltaMode === 1 ? 16 : 1
    if (event.ctrlKey || event.metaKey) {
      // Pinch on a trackpad arrives as ctrl + wheel.
      this.zoomAround(p.x, p.y, clamp(this.target.zoom * Math.exp(-event.deltaY * lines * 0.01), ZOOM_MIN, ZOOM_MAX))
      return
    }
    this.panBy(event.deltaX * lines, event.deltaY * lines)
  }

  /** Zoom so the world point under (sx, sy) stays under it. */
  private zoomAround(sx: number, sy: number, zoom: number) {
    const before = this.toWorld(sx, sy, this.target)
    this.target.zoom = zoom
    const after = this.toWorld(sx, sy, this.target)
    this.target.x += before.x - after.x
    this.target.y += before.y - after.y
    this.dirty = true
  }

  private toWorld(sx: number, sy: number, cam = this.camera) {
    const scale = this.unit * cam.zoom
    return { x: cam.x + (sx - this.width / 2) / scale, y: cam.y + (sy - this.height / 2) / scale }
  }

  private hit(x: number, y: number) {
    for (let i = this.visible.length - 1; i >= 0; i--) {
      const t = this.visible[i]
      if (t.alpha > 0.5 && x >= t.x && x <= t.x + t.size && y >= t.y && y <= t.y + t.size) return t.key
    }
    return null
  }

  private setHover(key: string | null) {
    if (key === this.hovered) return
    this.hovered = key
    this.overlay.style.cursor = key ? "pointer" : "grab"
    const tile = key ? this.visible.find((t) => t.key === key) : null
    this.options.onHover?.(tile ? this.options.people[tile.person] : null)
    this.dirty = true
  }

  // ─── Layout ────────────────────────────────────────────────────────────

  /** Every tile on screen right now, at its resting grid position. */
  private layout(cam = this.camera): VisibleTile[] {
    const scale = this.unit * cam.zoom
    const halfW = this.width / 2 / scale
    const halfH = this.height / 2 / scale
    const x0 = Math.floor((cam.x - halfW - TILE) / PITCH_X)
    const x1 = Math.ceil((cam.x + halfW) / PITCH_X)
    const y0 = Math.floor((cam.y - halfH - TILE - OFFSET) / PITCH_Y)
    const y1 = Math.ceil((cam.y + halfH + CAPTION * 2) / PITCH_Y)
    const tiles: VisibleTile[] = []
    for (let i = x0; i <= x1; i++) {
      for (let j = y0; j <= y1; j++) {
        const wx = i * PITCH_X
        const wy = j * PITCH_Y + (mod(i, 2) === 1 ? OFFSET : 0)
        tiles.push({
          person: mod(i, COLUMNS) + mod(j, ROWS) * COLUMNS,
          x: (wx - cam.x) * scale + this.width / 2,
          y: (wy - cam.y) * scale + this.height / 2,
          size: TILE * scale,
          alpha: 1,
          key: `${i}:${j}`,
        })
      }
    }
    return tiles
  }

  // ─── Frame ─────────────────────────────────────────────────────────────

  private tick = (now: number) => {
    this.frame = requestAnimationFrame(this.tick)
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60
    this.last = now

    // Ease the camera toward where input has sent it.
    const k = this.options.reducedMotion ? 1 : approach(0.085, dt)
    const kz = this.options.reducedMotion ? 1 : approach(0.12, dt)
    const moving =
      Math.abs(this.target.x - this.camera.x) > 0.01 ||
      Math.abs(this.target.y - this.camera.y) > 0.01 ||
      Math.abs(this.target.zoom - this.camera.zoom) > 0.0001
    if (moving) {
      this.camera.x += (this.target.x - this.camera.x) * k
      this.camera.y += (this.target.y - this.camera.y) * k
      this.camera.zoom += (this.target.zoom - this.camera.zoom) * kz
      this.dirty = true
    }

    // Filters dim what does not match; hover lifts the tile under the pointer.
    const people = this.options.people
    const km = approach(0.14, dt)
    for (let i = 0; i < people.length; i++) {
      const want = this.options.matches(people[i]) ? 0 : 1
      const d = want - this.muteAmount[i]
      if (Math.abs(d) > 0.002) {
        this.muteAmount[i] += d * km
        this.dirty = true
      } else this.muteAmount[i] = want
    }
    for (const [key, value] of this.hoverAmount) {
      const want = key === this.hovered ? 1 : 0
      const next = value + (want - value) * approach(0.2, dt)
      if (Math.abs(next - want) < 0.002) {
        if (want === 0) this.hoverAmount.delete(key)
        else this.hoverAmount.set(key, 1)
      } else {
        this.hoverAmount.set(key, next)
        this.dirty = true
      }
    }
    if (this.hovered && !this.hoverAmount.has(this.hovered)) {
      this.hoverAmount.set(this.hovered, 0)
      this.dirty = true
    }

    const animating = this.phase.name !== "live" && this.phase.name !== "waiting"
    const fading = this.textures.some((s) => s.state === "ready" && now - s.loadedAt < 450)
    if (!this.dirty && !animating && !fading) return
    this.dirty = false
    this.draw(now)
  }

  private draw(now: number) {
    let tiles = this.layout()
    let labels = this.labels

    const phase = this.phase
    if (phase.name === "waiting") {
      tiles = []
      labels = 0
    } else if (phase.name === "cluster") {
      const t = now - phase.start
      const step = 140
      const pop = 260
      const cx = this.width / 2
      const cy = this.height / 2
      const pitch = CLUSTER_PITCH * this.unit
      const size = CLUSTER_TILE * this.unit
      tiles = []
      // A tile pops at its turn, or when its picture arrives if that is later:
      // the diamond never shows an empty square.
      let last = 0
      phase.order.forEach((tile, index) => {
        const slot = this.textures[tile.person]
        const readyAt = slot.state === "ready" ? slot.loadedAt - phase.start : slot.state === "failed" ? 0 : Infinity
        const at = Math.max(index * step, readyAt)
        last = Math.max(last, at)
        const local = clamp((t - at) / pop, 0, 1)
        if (local <= 0) return
        const [gx, gy] = DIAMOND[index]
        const s = size * (0.55 + 0.45 * easeOutBack(local))
        tiles.push({
          ...tile,
          x: cx + gx * pitch - s / 2,
          y: cy + gy * pitch - s / 2,
          size: s,
          alpha: Math.min(1, local * 2),
        })
      })
      labels = 0
      // Hold the finished diamond for a beat, then burst.
      // (A picture that never loads stops holding the diamond up after 4s.)
      if ((last !== Infinity && t > last + pop + 520) || t > 4000) {
        const from = new Map<string, { x: number; y: number; size: number }>()
        phase.order.forEach((tile, index) => {
          const [gx, gy] = DIAMOND[index]
          from.set(tile.key, { x: cx + gx * pitch - size / 2, y: cy + gy * pitch - size / 2, size })
        })
        this.phase = { name: "burst", start: now, from }
        this.options.onPhase?.("burst")
      }
    } else if (phase.name === "burst") {
      const t = clamp((now - phase.start) / 1100, 0, 1)
      const e = easeOutExpo(t)
      const cx = this.width / 2
      const cy = this.height / 2
      tiles = tiles.map((tile) => {
        const start = phase.from.get(tile.key)
        if (start) {
          return {
            ...tile,
            x: start.x + (tile.x - start.x) * e,
            y: start.y + (tile.y - start.y) * e,
            size: start.size + (tile.size - start.size) * e,
          }
        }
        // Tiles that were not in the diamond fly out from the centre with it,
        // arriving a touch later so the diamond reads as the source.
        const late = easeOutExpo(clamp((t - 0.08) / 0.92, 0, 1))
        const s0 = tile.size * 0.3
        return {
          ...tile,
          x: cx - s0 / 2 + (tile.x - cx + s0 / 2) * late,
          y: cy - s0 / 2 + (tile.y - cy + s0 / 2) * late,
          size: s0 + (tile.size - s0) * late,
          alpha: clamp(late * 1.6, 0, 1),
        }
      })
      labels = clamp((t - 0.55) / 0.45, 0, 1)
      this.labels = labels
      if (t >= 1) this.finishIntro()
    } else if (phase.name === "leaving") {
      const t = (now - phase.start) / 520
      tiles = tiles.map((tile) => {
        const seed = phase.seeds.get(tile.key) ?? Math.random()
        return { ...tile, alpha: 1 - clamp((t - seed * 0.55) / 0.3, 0, 1) }
      })
      labels = clamp(1 - t * 2.5, 0, 1)
      if (t >= 1.05) {
        const done = phase.done
        this.phase = { name: "waiting" }
        done()
      }
    }

    // Hover: the tile grows slightly around its centre.
    tiles = tiles.map((tile) => {
      const h = this.hoverAmount.get(tile.key)
      if (!h) return tile
      const grow = tile.size * 0.045 * h
      return { ...tile, x: tile.x - grow / 2, y: tile.y - grow / 2, size: tile.size + grow }
    })

    this.visible = tiles
    for (const tile of tiles) this.load(tile.person)
    this.render(tiles, labels, now)
  }

  private render(tiles: VisibleTile[], labels: number, now: number) {
    const gl = this.gl
    const dpr = this.dpr
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform2f(this.uniforms.u_viewport, this.canvas.width, this.canvas.height)
    gl.uniform3f(this.uniforms.u_placeholder, 0.953, 0.953, 0.953)
    gl.uniform1i(this.uniforms.u_texture, 0)
    gl.activeTexture(gl.TEXTURE0)

    for (const tile of tiles) {
      if (tile.alpha <= 0.001) continue
      if (tile.x > this.width || tile.y > this.height || tile.x + tile.size < 0 || tile.y + tile.size < 0) continue
      const slot = this.textures[tile.person]
      const ready = slot.state === "ready" ? clamp((now - slot.loadedAt) / 420, 0, 1) : 0
      const mute = this.muteAmount[tile.person]
      gl.bindTexture(gl.TEXTURE_2D, slot.texture)
      gl.uniform1f(this.uniforms.u_ready, ready)
      gl.uniform1f(this.uniforms.u_mute, mute)
      gl.uniform1f(this.uniforms.u_alpha, tile.alpha * (1 - mute * 0.88))
      gl.uniform4f(this.uniforms.u_rect, tile.x * dpr, tile.y * dpr, tile.size * dpr, tile.size * dpr)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    // Captions: "12 .   Name" above each tile, number left, name right-aligned.
    const ctx = this.ctx
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, this.width, this.height)
    const scale = this.unit * this.camera.zoom
    // Never below 9px while the grid is at or near its resting zoom (phones),
    // and hidden once zoomed out past where a caption could be read.
    const fontSize = this.camera.zoom >= 0.8 ? Math.max(9, CAPTION * scale) : CAPTION * scale
    if (labels <= 0 || fontSize < 6.5) return
    ctx.font = `400 ${fontSize}px ${this.font}`
    ctx.textBaseline = "alphabetic"
    ctx.fillStyle = this.ink
    for (const tile of tiles) {
      const alpha = tile.alpha * labels * (1 - this.muteAmount[tile.person] * 0.8)
      if (alpha <= 0.01) continue
      const person = this.options.people[tile.person]
      const y = tile.y - 6 * scale
      const number = `${person.number} .`
      ctx.globalAlpha = alpha
      ctx.textAlign = "left"
      ctx.fillText(number, tile.x, y)
      const room = tile.size - ctx.measureText(number).width - fontSize
      ctx.textAlign = "right"
      ctx.fillText(fit(ctx, person.name, room), tile.x + tile.size, y)
    }
    ctx.globalAlpha = 1
  }
}

/** Truncate with an ellipsis to fit `room` px, measuring with the current font. */
function fit(ctx: CanvasRenderingContext2D, text: string, room: number) {
  if (ctx.measureText(text).width <= room) return text
  let out = text
  while (out.length > 1 && ctx.measureText(`${out}…`).width > room) out = out.slice(0, -1)
  return `${out.trimEnd()}…`
}
