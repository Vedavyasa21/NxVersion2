import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import DistortedShape from './DistortedShape.jsx'
import SceneFallback from './SceneFallback.jsx'

/**
 * R3F <Canvas> wrapper. We:
 *   - cap DPR for perf,
 *   - use drei's <Environment preset="studio" /> for rich metallic reflections,
 *   - fall back to a static gradient if WebGL isn't available.
 *
 * The environment map is lazy-loaded by drei and won't block rendering.
 */
export default function HeroScene({ webgl = true }) {
  // Shared ref the shape reads each frame for parallax tilt.
  const mouse = useRef({ x: 0, y: 0 })

  // Track mouse at the window level for parallax. Proper cleanup on unmount.
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!webgl) return <SceneFallback />

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        // Cap DPR at 2 — going higher barely helps on retina and tanks perf.
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = 1 // THREE.LinearToneMapping
          gl.toneMappingExposure = 1.2
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        {/* Environment map for reflections — "studio" gives clean, soft
            highlights that make the metallic amber blob read like polished
            metal/liquid gold. */}
        <Environment preset="studio" />

        {/* Three-point lighting — warm tones complement the amber material. */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#FFE4A0" />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#D4A017" />
        <pointLight position={[0, -3, 2]} intensity={0.3} color="#F5C542" />

        <DistortedShape mouse={mouse} />
      </Canvas>
    </div>
  )
}
