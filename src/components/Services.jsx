import { motion } from 'framer-motion'
import { fadeUp, stagger, sectionViewport, cardViewport } from '../lib/motion.js'

// Thin, single-stroke icons — keeps the section minimal and on-brand.
// <!-- TODO: asset — swap for a Lucide / Phosphor icon set when ready -->
const ICONS = {
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  perf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  story: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H7l-3 3z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
}

const SERVICES = [
  {
    num: '01',
    icon: ICONS.social,
    title: 'Social Media Management',
    desc: 'End-to-end strategy, scheduling, community and reputation — done with surgical precision.',
  },
  {
    num: '02',
    icon: ICONS.ai,
    title: 'AI-Powered Content Creation',
    desc: 'Static, motion and copy that look bespoke — produced at the speed of intent.',
  },
  {
    num: '03',
    icon: ICONS.perf,
    title: 'Performance Marketing',
    desc: 'Paid social and search, optimised in real time against the metrics that move revenue.',
  },
  {
    num: '04',
    icon: ICONS.story,
    title: 'Brand Storytelling',
    desc: 'A clear, ownable narrative that turns audiences into advocates and buyers.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-offwhite py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              What we do
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
              Services built for brands
              <br className="hidden sm:block" /> that intend to lead.
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-base text-ink/60 sm:text-right"
          >
            Four tightly-integrated disciplines. One compounding growth system.
          </motion.p>
        </motion.div>

        {/* Gradient divider */}
        <div className="mb-12 h-px" style={{ background: 'linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2), transparent)' }} />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              viewport={cardViewport}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/5 bg-paper p-8 transition-all duration-500 ease-out-expo hover:shadow-accent-glow hover:border-accent/30"
            >
              {/* Left accent border on hover */}
              <div
                className="absolute inset-y-0 left-0 w-[3px] bg-accent scale-y-0 origin-top transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                aria-hidden
              />

              {/* Large faded number */}
              <span
                className="absolute top-4 right-5 font-display text-6xl font-bold text-ink/[0.04] transition-colors duration-500 group-hover:text-accent/[0.12] select-none"
                aria-hidden
              >
                {s.num}
              </span>

              {/* Icon */}
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                <span className="block h-5 w-5">{s.icon}</span>
              </div>

              <h3 className="font-display text-xl font-semibold tracking-tightest text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {s.desc}
              </p>
              <div className="mt-auto pt-8 flex items-center gap-1.5 text-xs font-medium text-ink/40 transition-colors duration-300 group-hover:text-accent">
                <span>Learn more</span>
                <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
