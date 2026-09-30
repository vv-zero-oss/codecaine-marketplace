import { useGLTF } from "@react-three/drei"
import { useEffect, useLayoutEffect, useMemo } from "react"
import {
  Box3,
  Color,
  Group,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  Vector3,
  type Material,
} from "three"

import { createScreenTexture, type PhoneScreen } from "./screen-texture"

export const MODEL_URL = `${import.meta.env.BASE_URL}models/phone.glb`
export const DRACO_URL = `${import.meta.env.BASE_URL}draco/`

/** The colour of the phone's frame and back glass. `original` keeps the model's own. */
export type PhoneFinish = "original" | "titanium" | "deep-purple" | "graphite" | "silver" | "lilac" | "midnight"

const FINISHES: Record<Exclude<PhoneFinish, "original">, { rail: string; back: string }> = {
  titanium: { rail: "#8f8c87", back: "#a9a6a0" },
  "deep-purple": { rail: "#4a4152", back: "#5a5064" },
  graphite: { rail: "#4a4a4f", back: "#3b3b40" },
  silver: { rail: "#c9c9cd", back: "#e4e4e6" },
  lilac: { rail: "#b9a9cc", back: "#d7cce4" },
  midnight: { rail: "#2c2b33", back: "#1f1e25" },
}

/** How much of the display mesh the app fills; the rest is the black bezel. */
const BEZEL_X = 0.925
const BEZEL_Y = 0.962

const axis = (i: number) => new Vector3(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0)
const get = (v: Vector3, i: number) => (i === 0 ? v.x : i === 1 ? v.y : v.z)

function findByName(root: Object3D, pattern: RegExp): Object3D | undefined {
  let found: Object3D | undefined
  root.traverse((o) => {
    if (!found && pattern.test(o.name)) found = o
  })
  return found
}

/**
 * Works out how the model is oriented — its long side, its thin side and
 * which way the screen faces — and returns the rotation, offset and scale
 * that stand it upright, screen towards +Z, `height` units tall and centred
 * on the origin. Measured rather than hard-coded so a different phone model
 * dropped into `public/models/` still lands the same way.
 */
function normalise(scene: Object3D, height: number) {
  scene.updateMatrixWorld(true)
  const box = new Box3().setFromObject(scene)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  const order = [0, 1, 2].sort((a, b) => get(size, b) - get(size, a))
  const [long, , thin] = order

  const screen = findByName(scene, /^Screen/)
  const lens = findByName(scene, /^Camera_Lens/)
  const screenCenter = screen ? new Box3().setFromObject(screen).getCenter(new Vector3()) : center
  const lensCenter = lens ? new Box3().setFromObject(lens).getCenter(new Vector3()) : center
  const front = Math.sign(get(screenCenter, thin) - get(center, thin)) || 1
  const up = Math.sign(get(lensCenter, long) - get(center, long)) || 1

  const y = axis(long).multiplyScalar(up)
  const z = axis(thin).multiplyScalar(front)
  const x = new Vector3().crossVectors(y, z)
  // Rows are the new axes: this maps model space onto upright phone space.
  const basis = new Matrix4().makeBasis(x, y, z).transpose()
  const quaternion = new Quaternion().setFromRotationMatrix(basis)
  const scale = height / get(size, long)
  return { quaternion, offset: center.clone().negate(), scale }
}

/**
 * One phone from the model the page ships in `public/models/`, with a live
 * app screen laid over its display.
 *
 * The model is loaded once (Draco-compressed, decoded locally from
 * `public/draco/`) and cloned per phone, so two phones can wear different
 * screens and finishes.
 */
export function PhoneModel({
  screen = "wallet",
  holder = "Nora Lindqvist",
  last4 = "4821",
  spent = "$1,284",
  finish = "titanium",
  height = 2,
  ...props
}: {
  screen?: PhoneScreen
  holder?: string
  last4?: string
  spent?: string
  finish?: PhoneFinish
  height?: number
} & React.ComponentProps<"group">) {
  const { scene } = useGLTF(MODEL_URL, DRACO_URL)

  const phone = useMemo(() => {
    const clone = scene.clone(true)
    const owned: Material[] = []
    clone.traverse((o) => {
      const mesh = o as Mesh
      if (!mesh.isMesh) return
      mesh.castShadow = false
      mesh.receiveShadow = false
      const material = mesh.material as Material
      // Own copies, so a finish on one phone leaves the other alone.
      const copy = material.clone() as MeshPhysicalMaterial
      // The model was authored for a path-traced viewer: a mirror-polished,
      // iridescent frame there is a shimmering, aliased one in a plain WebGL
      // renderer. Brushed a little and without the rainbow, it reads right.
      if ("iridescence" in copy) copy.iridescence = 0
      if (/Side_Rails/.test(copy.name)) copy.roughness = 0.45
      if (/Back_Glass/.test(copy.name)) copy.roughness = 0.4
      mesh.material = copy
      owned.push(copy)
    })
    const { quaternion, offset, scale } = normalise(clone, height)
    const screenMesh = findByName(clone, /^Screen/)
    return { clone, owned, quaternion, offset, scale, screenMesh }
  }, [scene, height])

  // Where the display is, in the upright frame: the overlay sits on it.
  const overlay = useMemo(() => {
    const wrapper = new Group()
    const inner = new Group()
    inner.position.copy(phone.offset)
    wrapper.quaternion.copy(phone.quaternion)
    wrapper.scale.setScalar(phone.scale)
    const probe = phone.clone.clone(true)
    inner.add(probe)
    wrapper.add(inner)
    wrapper.updateMatrixWorld(true)
    const target = findByName(probe, /^Screen/)
    const box = new Box3().setFromObject(target ?? probe)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    return { width: size.x, height: size.y, center, front: box.max.z }
  }, [phone])

  const texture = useMemo(
    () => createScreenTexture({ screen, holder, last4, spent }),
    [screen, holder, last4, spent],
  )
  useEffect(() => () => texture.dispose(), [texture])

  const screenMaterial = useMemo(
    () => new MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false }),
    [texture],
  )
  useEffect(() => () => screenMaterial.dispose(), [screenMaterial])

  // The model's own display goes black underneath the overlay, and its
  // glass cover is dropped: the overlay is the display now, and a second
  // transparent layer over it only flickers against the frame.
  useLayoutEffect(() => {
    phone.screenMesh?.traverse((o) => {
      const mesh = o as Mesh
      if (mesh.isMesh) mesh.material = new MeshBasicMaterial({ color: "#050505" })
    })
    const glass = findByName(phone.clone, /^Glass_Cover/)
    if (glass) glass.visible = false
  }, [phone])

  // Frame and back glass take the finish.
  useLayoutEffect(() => {
    if (finish === "original") return
    const tone = FINISHES[finish]
    const originals = new Map<Material, Color>()
    phone.clone.traverse((o) => {
      const mesh = o as Mesh
      if (!mesh.isMesh) return
      const material = mesh.material as MeshStandardMaterial | MeshPhysicalMaterial
      const name = material.name
      const colour = /Side_Rails/.test(name) ? tone.rail : /Back_Glass/.test(name) ? tone.back : null
      if (!colour || !material.color) return
      originals.set(material, material.color.clone())
      material.color.set(colour)
    })
    return () => originals.forEach((c, m) => (m as MeshStandardMaterial).color.copy(c))
  }, [phone, finish])

  useEffect(() => () => phone.owned.forEach((m) => m.dispose()), [phone])

  return (
    <group {...props}>
      <group quaternion={phone.quaternion} scale={phone.scale}>
        <primitive object={phone.clone} position={phone.offset} />
      </group>
      <mesh position={[overlay.center.x, overlay.center.y, overlay.front + 0.002]} material={screenMaterial} renderOrder={2}>
        <planeGeometry args={[overlay.width * BEZEL_X, overlay.height * BEZEL_Y]} />
      </mesh>
    </group>
  )
}

useGLTF.preload(MODEL_URL, DRACO_URL)
