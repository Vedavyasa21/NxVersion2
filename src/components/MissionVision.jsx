import { motion } from 'framer-motion'
import { fadeUp, stagger, sectionViewport } from '../lib/motion.js'

export default function MissionVision() {
  return (
    <section id="mission" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-16"
        >
          {/* Mission */}
          <motion.div variants={fadeUp} className="relative">
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-accent/30" aria-hidden />
            <div className="pl-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Our mission
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-paper sm:text-4xl lg:text-[2.75rem]">
                Help ambitious brands become{' '}
                <span className="text-accent">category leaders</span> through
                intelligent marketing, creative storytelling, and AI-powered
                execution.
              </h2>
            </div>
          </motion.div>

          {/* Mobile divider */}
          <div
            className="lg:hidden h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }}
            aria-hidden
          />

          {/* Vision */}
          <motion.div variants={fadeUp} className="relative">
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-accent/30" aria-hidden />
            <div className="pl-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Our vision
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-paper sm:text-4xl lg:text-[2.75rem]">
                To become India's leading AI-powered branding and social media
                agency that combines{' '}
                <span className="text-accent">creativity, strategy,</span> and{' '}
                <span className="text-accent">technology</span>.
              </h2>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
