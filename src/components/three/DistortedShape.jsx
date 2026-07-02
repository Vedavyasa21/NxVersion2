import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/*
 * Compact 3D simplex noise implementation.
 * Based on Stefan Gustavson's simplex noise.
 * Generates smooth, organic, non-repeating distortion for the liquid-metal effect.
 */
const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
]

const PERM = new Uint8Array(512)
;(function initPerm() {
  const p = [
    151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,
    140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,
    247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,
    57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,
    74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,
    60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,
    65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,
    200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,
    52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,
    207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,
    119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
    129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,
    218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,
    81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,
    184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,
    222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,
  ]
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255]
})()

function dot3(g, x, y, z) {
  return g[0] * x + g[1] * y + g[2] * z
}

function simplex3D(x, y, z) {
  const F3 = 1 / 3
  const G3 = 1 / 6
  const s = (x + y + z) * F3
  const i = Math.floor(x + s)
  const j = Math.floor(y + s)
  const k = Math.floor(z + s)
  const t = (i + j + k) * G3
  const X0 = i - t
  const Y0 = j - t
  const Z0 = k - t
  const x0 = x - X0
  const y0 = y - Y0
  const z0 = z - Z0

  let i1, j1, k1, i2, j2, k2
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1 }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1 }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1 }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1 }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
  }

  const x1 = x0 - i1 + G3
  const y1 = y0 - j1 + G3
  const z1 = z0 - k1 + G3
  const x2 = x0 - i2 + 2 * G3
  const y2 = y0 - j2 + 2 * G3
  const z2 = z0 - k2 + 2 * G3
  const x3 = x0 - 1 + 3 * G3
  const y3 = y0 - 1 + 3 * G3
  const z3 = z0 - 1 + 3 * G3

  const ii = i & 255
  const jj = j & 255
  const kk = k & 255

  let n0 = 0, n1 = 0, n2 = 0, n3 = 0

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
  if (t0 > 0) { t0 *= t0; n0 = t0 * t0 * dot3(GRAD3[PERM[ii + PERM[jj + PERM[kk]]] % 12], x0, y0, z0) }

  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
  if (t1 > 0) { t1 *= t1; n1 = t1 * t1 * dot3(GRAD3[PERM[ii + i1 + PERM[jj + j1 + PERM[kk + k1]]] % 12], x1, y1, z1) }

  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
  if (t2 > 0) { t2 *= t2; n2 = t2 * t2 * dot3(GRAD3[PERM[ii + i2 + PERM[jj + j2 + PERM[kk + k2]]] % 12], x2, y2, z2) }

  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
  if (t3 > 0) { t3 *= t3; n3 = t3 * t3 * dot3(GRAD3[PERM[ii + 1 + PERM[jj + 1 + PERM[kk + 1]]] % 12], x3, y3, z3) }

  return 32 * (n0 + n1 + n2 + n3)
}

/**
 * Liquid-metal blob — the hero 3D object.
 *
 * Uses an icosahedron (detail=4 ≈ 2562 verts) deformed each frame with 3D
 * simplex noise so the surface ripples organically like molten metal.
 *
 * Material: high-metalness, low-roughness physical with amber/gold tint
 * (#D4A017), designed to catch the studio environment reflections.
 *
 * Animations:
 *   - Slow continuous noise-driven surface distortion (organic, non-repeating)
 *   - Gentle auto-rotation on X/Y
 *   - Subtle mouse-following parallax tilt
 */
export default function DistortedShape({ mouse }) {
  const meshRef = useRef()
  // Track auto-rotation separately so it doesn't fight the mouse parallax.
  const autoRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    // === Rotation ===
    // Auto-rotation — slow, ambient. Track in a separate ref so
    // the mouse parallax can layer on top cleanly.
    autoRotation.current.x += delta * 0.08
    autoRotation.current.y += delta * 0.14

    // Mouse parallax — subtle tilt that follows the cursor. Not literal
    // tracking — just a gentle lean toward the pointer.
    const tx = mouse?.current?.x ?? 0
    const ty = mouse?.current?.y ?? 0
    const parallaxX = -ty * 0.3
    const parallaxY = tx * 0.3

    // Combine auto-rotation + parallax for final orientation.
    mesh.rotation.x = autoRotation.current.x + parallaxX
    mesh.rotation.y = autoRotation.current.y + parallaxY

    // === Vertex displacement ===
    const geom = mesh.geometry
    const pos = geom.attributes.position
    const time = state.clock.elapsedTime

    // Cache original vertex positions on first frame.
    if (!mesh.userData.orig) {
      mesh.userData.orig = new Float32Array(pos.array)
    }
    const orig = mesh.userData.orig
    if (!orig) return

    const count = pos.count
    const arr = pos.array

    // Frequency — higher = more detailed ripples. Speed multiplies time for
    // animation velocity. Both are tuned so the blob looks organic without
    // feeling frantic on a mid-range laptop.
    const freq = 1.6
    const speed = 0.35
    const amp = 0.35

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ox = orig[i3]
      const oy = orig[i3 + 1]
      const oz = orig[i3 + 2]

      // Sample simplex noise at two slightly offset frequencies and blend
      // for richer detail without needing a higher subdivision.
      const n1 = simplex3D(
        ox * freq + time * speed,
        oy * freq,
        oz * freq,
      )
      const n2 = simplex3D(
        ox * freq * 2.2 + time * speed * 1.3 + 100,
        oy * freq * 2.2,
        oz * freq * 2.2,
      )
      const blended = n1 * 0.65 + n2 * 0.35

      // Displacement factor: 1.0 + noise * amplitude — vertices push outward
      // or pull inward, creating the liquid ripple effect.
      const factor = 1.0 + blended * amp

      arr[i3] = ox * factor
      arr[i3 + 1] = oy * factor
      arr[i3 + 2] = oz * factor
    }

    pos.needsUpdate = true
    geom.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} castShadow={false} receiveShadow={false}>
      {/* Icosahedron with detail=4 gives ~2562 vertices — enough for organic
          ripples without choking mid-range GPUs. The base radius is slightly
          reduced because the noise pushes vertices outward. */}
      <icosahedronGeometry args={[1.1, 4]} />
      <meshPhysicalMaterial
        color="#D4A017"
        metalness={1.0}
        roughness={0.06}
        envMapIntensity={2.8}
        clearcoat={0.3}
        clearcoatRoughness={0.15}
        emissive="#D4A017"
        emissiveIntensity={0.12}
      />
    </mesh>
  )
}
