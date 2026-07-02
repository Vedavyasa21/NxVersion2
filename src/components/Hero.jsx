import { Component, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'
import SceneFallback from './three/SceneFallback.jsx'
import useWebGL from '../hooks/useWebGL.js'
import { fadeUp, stagger } from '../lib/motion.js'

// Lazy-load the R3F canvas. This keeps the initial JS bundle lean — the 3D
// scene is only fetched once the user actually scrolls to / hovers the hero.
const HeroScene = lazy(() => import('./three/HeroScene.jsx'))

/**
 * Error boundary scoped to the 3D canvas. If R3F or WebGL throws at runtime
 * (driver crash, context loss, etc.) we swap to the static fallback instead
 * of white-screening the whole page.
 */
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    // Surface to the console for debugging without breaking the page.
    console.warn('[HeroScene] falling back to static:', err?.message)
  }
  render() {
    if (this.state.failed) return <SceneFallback />
    return this.props.children
  }
}

// Defined outside the component so it doesn't get a new function identity
// every render (which would unmount/remount the whole 3D tree).
function SceneSlot({ webgl }) {
  if (webgl === null) return <SceneFallback />
  if (!webgl) return <SceneFallback />
  return (
    <SceneBoundary>
      <Suspense fallback={<SceneFallback />}>
        <HeroScene webgl />
      </Suspense>
    </SceneBoundary>
  )
}

export default function Hero() {
  const webgl = useWebGL()
  const { scrollY } = useScroll()
  // Parallax: as the user scrolls past the hero, the 3D object drifts up and
  // scales down slightly — gives a sense of depth without being distracting.
  const y = useTransform(scrollY, [0, 800], [0, -120])
  const scale = useTransform(scrollY, [0, 800], [1, 0.85])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <section
      id="top"
      className="relative isolate min-h-[80vh] overflow-hidden pt-32 pb-24 sm:min-h-screen sm:pt-40 sm:pb-32"
    >
      {/* 3D scene — positioned to the right on desktop, full-width background on mobile. */}
      <motion.div
        style={{ y, scale, opacity }}
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
      >
        <div className="absolute inset-y-0 right-0 w-1/2 lg:w-[55%] h-full">
          <SceneSlot webgl={webgl} />
        </div>
      </motion.div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6 sm:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink/60"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          AI-first social media agency
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-tightest text-ink"
        >
          Where Strategy
          <br />
          Meets{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Intelligence</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-2 -z-0 h-3 bg-accent/15"
            />
          </span>
          .
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl"
        >
          AI-powered social media marketing for brands that want to grow
          faster, look better, and sell more.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <MagneticButton as="link" href="#contact" variant="primary">
            Book a Call
          </MagneticButton>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-accent"
          >
            Explore our work
            <span
              aria-hidden
              className="block h-px w-8 bg-current transition-all group-hover:w-12"
            />
          </a>
        </motion.div>

        {/* Mobile 3D — smaller, behind content, simplified. */}
        <div className="md:hidden mt-16 -mx-6 h-80 relative">
          <SceneSlot webgl={webgl} />
        </div>
      </motion.div>
    </section>
  )
}
