/**
 * Static fallback when WebGL is unavailable (or for very low-power devices).
 * Also used as the Suspense/loading placeholder while the 3D scene lazy-loads.
 * Mimics the mood of the 3D object — a soft amber/gold glow on white — without
 * any GPU work.
 */
export default function SceneFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Main glow — large, warm amber radial. */}
      <div
        className="h-80 w-80 rounded-full opacity-70 blur-3xl animate-pulse"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #F5C542 0%, #D4A017 35%, rgba(212,160,23,0) 70%)',
          animationDuration: '3s',
        }}
      />
      {/* Secondary smaller highlight for depth. */}
      <div
        className="absolute h-44 w-44 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 70% 70%, #F5C542 0%, rgba(212,160,23,0) 70%)',
        }}
      />
    </div>
  )
}
