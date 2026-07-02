import { useEffect, useState } from 'react'

/**
 * Detects WebGL support so the hero can fall back gracefully on devices
 * where the 3D scene cannot render.
 *
 * Returns `null` while we probe (lazy-loaded R3F stays paused), then
 * `true` / `false` once detected. Using `null` rather than `true` as the
 * default prevents a flash of the 3D scene on devices that will end up
 * falling back.
 */
export default function useWebGL() {
  const [supported, setSupported] = useState(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
