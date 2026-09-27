import { useEffect, useRef } from "react"
import * as THREE from "three"

import { token } from "@/lib/tokens"
import { cn } from "@/lib/utils"

/**
 * A live three.js scene — the "3D Canvas" element on the board. A torus knot
 * that is either matte coral or violet glass, turning at `speed`. Changing the
 * props changes the running scene (material swapped, spin eased), which is the
 * whole point of the scene it sits in: you ask, and it changes while it runs.
 *
 * Renders only while on screen.
 */
export function ThreeObject({
  look = "matte",
  speed = 1,
  className,
}: {
  look?: "matte" | "glass"
  speed?: number
  className?: string
}) {
  const host = useRef<HTMLDivElement>(null)
  const state = useRef({ look, speed })
  state.current = { look, speed }

  useEffect(() => {
    const el = host.current
    if (!el) return
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    el.appendChild(renderer.domElement)
    renderer.domElement.style.display = "block"

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 7)

    const color = (name: string) => new THREE.Color(token(name))
    scene.add(new THREE.HemisphereLight(color("art-cream"), color("art-bg"), 1.4))
    const key = new THREE.DirectionalLight(color("art-cream"), 2.4)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.PointLight(color("art-cyan"), 30, 20)
    rim.position.set(-4, -2, 2)
    scene.add(rim)

    const geometry = new THREE.TorusKnotGeometry(1.1, 0.36, 220, 32)
    const matte = new THREE.MeshStandardMaterial({ color: color("art-coral"), roughness: 0.55, metalness: 0.1 })
    const glass = new THREE.MeshPhysicalMaterial({
      color: color("art-violet"),
      roughness: 0.08,
      metalness: 0,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.4,
      clearcoat: 1,
      iridescence: 0.6,
    })
    const mesh = new THREE.Mesh(geometry, matte)
    scene.add(mesh)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(el)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let spin = state.current.speed
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // Ease toward the asked-for speed so a change reads as the scene responding.
      spin += (state.current.speed - spin) * Math.min(1, dt * 3)
      mesh.material = state.current.look === "glass" ? glass : matte
      if (visible) {
        if (!reduce) {
          mesh.rotation.x += dt * 0.5 * spin
          mesh.rotation.y += dt * 0.8 * spin
        }
        renderer.render(scene, camera)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      geometry.dispose()
      matte.dispose()
      glass.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} aria-hidden className={cn("size-full", className)} />
}
