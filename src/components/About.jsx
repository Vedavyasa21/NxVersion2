import { motion } from 'framer-motion'
import { fadeUp, stagger, sectionViewport } from '../lib/motion.js'

const STATS = [
  { value: '50+', label: 'Brands scaled' },
  { value: '3×', label: 'Avg. growth rate' },
  { value: '24/7', label: 'AI-powered ops' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      {/* Top divider */}
      <div className="section-divider" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-28 sm:pt-36">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
            >
              About Nxvora
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              We build growth systems,
              <br className="hidden sm:block" /> not just posts.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70"
            >
              Nxvora is a modern, AI-first social media marketing agency based
              in Gurgaon, Delhi-NCR. We help brands build stronger digital
              presence through strategic social media management, AI-powered
              content creation, performance marketing, and brand storytelling —
              building complete growth systems, not just posting content.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              className="mt-12 flex flex-wrap gap-10 sm:gap-16"
            >
              {STATS.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="group">
                  <p className="font-display text-4xl font-bold tracking-tightest text-ink sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-ink/50">{s.label}</p>
                  <div className="mt-3 h-0.5 w-8 rounded-full bg-accent/30 transition-all duration-500 group-hover:w-12 group-hover:bg-accent" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — dark visual card */}
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink"
            >
              {/* Ambient glow inside card */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[80px] transition-opacity duration-700 group-hover:opacity-50"
                style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)' }}
              />

              <div className="absolute inset-0 flex flex-col justify-between p-8 relative z-10">
                {/* Top label */}
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-xs uppercase tracking-[0.2em] text-paper/50">
                    Gurgaon · Delhi-NCR
                  </span>
                </div>

                {/* Amber dot grid */}
                <div
                  className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2"
                  aria-hidden
                >
                  <div
                    className="h-full w-full opacity-40"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, #D4A017 1.2px, transparent 1.6px)',
                      backgroundSize: '14px 14px',
                      maskImage:
                        'radial-gradient(circle at center, black 0%, transparent 70%)',
                      WebkitMaskImage:
                        'radial-gradient(circle at center, black 0%, transparent 70%)',
                    }}
                  />
                </div>

                {/* Corner decorative accent */}
                <div className="absolute top-0 right-0 h-20 w-20" aria-hidden>
                  <div className="absolute top-0 right-0 h-px w-12 bg-accent/40" />
                  <div className="absolute top-0 right-0 w-px h-12 bg-accent/40" />
                </div>

                {/* Bottom text */}
                <div className="space-y-1">
                  <p className="font-display text-2xl tracking-tightest text-paper">
                    Strategy × AI
                  </p>
                  <p className="text-sm text-paper/50">
                    Where creativity compounds into growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
