import { Environment, Lightformer } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useReducedMotion } from "motion/react"
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react"
import { MathUtils, type Group } from "three"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const deg = MathUtils.degToRad

/**
 * The WebGL canvas the phones render into, with studio lighting built from
 * light panels (no HDR download). R3F owns the render loop, and its store is
 * what the canvas editor's Motion switch pauses.
 */
export function PhoneStage({
  children,
  fov = 26,
  distance = 7,
  fitWidth = 0,
  className,
  label,
}: {
  children: ReactNode
  fov?: number
  distance?: number
  fitWidth?: number
  className?: string
  label: string
}) {
  // Only render while the stage is on screen: two WebGL loops running under
  // the rest of the page would cost battery for nothing.
  const box = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={box} className={cn("relative", className)} role="img" aria-label={label}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ fov, position: [0, 0, distance], near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <directionalLight position={[-4, -1, 3]} intensity={0.5} />
        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
            <Lightformer form="rect" intensity={1.5} position={[-5, 0, 2]} rotation-y={deg(90)} scale={[6, 4, 1]} />
            <Lightformer form="rect" intensity={1.5} position={[5, 0, 2]} rotation-y={deg(-90)} scale={[6, 4, 1]} />
            <Lightformer form="ring" color="#e7dbc0" intensity={2} position={[2, 2, -4]} scale={3} />
            <Lightformer form="rect" color="#b9c2cc" intensity={1} position={[0, -4, 2]} rotation-x={deg(-90)} scale={[8, 4, 1]} />
          </Environment>
          {children}
        </Suspense>
        <FitCamera distance={distance} fitWidth={fitWidth} />
      </Canvas>
    </div>
  )
}

/**
 * Backs the camera off on a narrow stage until `fitWidth` scene units fit
 * across it, so the phones are never cropped on a phone-sized screen.
 */
function FitCamera({ distance, fitWidth }: { distance: number; fitWidth: number }) {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    if (!("fov" in camera)) return
    const halfFov = MathUtils.degToRad(camera.fov / 2)
    const aspect = size.width / Math.max(size.height, 1)
    const needed = fitWidth > 0 ? fitWidth / 2 / (Math.tan(halfFov) * aspect) : 0
    camera.position.z = Math.max(distance, needed)
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size, distance, fitWidth, invalidate])
  return null
}

/**
 * Moves its children with the page: a turn as the stage scrolls through the
 * viewport (the reference repo's scroll-driven camera, as a gentle rotation),
 * a lean towards the pointer, and a slow idle float. All three ease towards
 * their target every frame, so nothing snaps. Still under reduced motion and
 * while the page is being designed in the editor.
 */
export function PhoneRig({
  children,
  scrollSpin = 14,
  followPointer = true,
  pointerStrength = 6,
  float = true,
  floatAmount = 0.05,
  baseRotateY = 0,
  baseRotateZ = 0,
}: {
  children: ReactNode
  scrollSpin?: number
  followPointer?: boolean
  pointerStrength?: number
  float?: boolean
  floatAmount?: number
  baseRotateY?: number
  baseRotateZ?: number
}) {
  const group = useRef<Group>(null)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduce || designing
  const pointer = useRef({ x: 0, y: 0 })
  const progress = useRef(0)
  const element = useThree((s) => s.gl.domElement)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => {
      const rect = element.getBoundingClientRect()
      const vh = window.innerHeight
      // -1 as the stage enters from below, 0 centred, 1 as it leaves at the top.
      progress.current = MathUtils.clamp((vh / 2 - (rect.top + rect.height / 2)) / vh, -1, 1)
    }
    onScroll()
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [element])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = still ? 0 : progress.current
    const px = still || !followPointer ? 0 : pointer.current.x
    const py = still || !followPointer ? 0 : pointer.current.y
    const targetY = deg(baseRotateY + p * scrollSpin + px * pointerStrength)
    const targetX = deg(p * scrollSpin * 0.35 + py * pointerStrength * 0.5)
    const targetZ = deg(baseRotateZ)
    const k = 1 - Math.exp(-delta * 4)
    g.rotation.y = MathUtils.lerp(g.rotation.y, targetY, k)
    g.rotation.x = MathUtils.lerp(g.rotation.x, targetX, k)
    g.rotation.z = MathUtils.lerp(g.rotation.z, targetZ, k)
    g.position.y = still || !float ? 0 : Math.sin(t * 0.9) * floatAmount
  })

  return (
    <group ref={group} rotation={[0, deg(baseRotateY), deg(baseRotateZ)]}>
      {children}
    </group>
  )
}
