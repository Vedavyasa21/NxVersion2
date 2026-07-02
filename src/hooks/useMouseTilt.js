import { useEffect, useRef } from 'react'

/**
 * Returns a smoothed mouse position in normalised device coords (-1 .. 1).
 * Used by the 3D scene for parallax tilt. The smoothing factor avoids
 * jitter while still feeling responsive.
 *
 * @param {number} smoothing 0..1, higher = smoother (more lag). 0.12 is a good middle.
 */
export default function useMouseTilt(smoothing = 0.12) {
  const ref = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      ref.current.tx = x
      ref.current.ty = y
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Smoothly interpolate toward target every frame; consumer can read .current
  // inside a useFrame loop and copy to refs.
  useEffect(() => {
    let raf
    const tick = () => {
      const r = ref.current
      r.x += (r.tx - r.x) * smoothing
      r.y += (r.ty - r.y) * smoothing
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [smoothing])

  return ref
}
