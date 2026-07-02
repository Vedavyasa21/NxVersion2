import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'
import { fadeUp, stagger, sectionViewport } from '../lib/motion.js'

// Contact details — copy is locked, exactly as provided in the brief.
const WHATSAPP = '+91 9311591913'
const EMAIL = 'ishhmediax@gmail.com'
const LOCATION = 'Gurgaon, Delhi-NCR'

const whatsappHref = `https://wa.me/919311591913`
const emailHref = `mailto:${EMAIL}`

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }} />

      {/* Atmospheric amber glow behind heading */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, #F5C542 30%, transparent 70%)' }}
      />

      {/* Animated concentric rings */}
      <div className="ring-pulse h-48 w-48" style={{ animationDelay: '0s' }} aria-hidden />
      <div className="ring-pulse h-80 w-80" style={{ animationDelay: '1s' }} aria-hidden />
      <div className="ring-pulse h-[28rem] w-[28rem]" style={{ animationDelay: '2s' }} aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Let's talk
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl lg:text-7xl"
          >
            Let&apos;s build your
            <br />
            <span className="text-accent">category-leading</span> brand.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink/70"
          >
            Tell us about your brand and what you want to become. We&apos;ll
            come back within one business day with a sharp first take.
          </motion.p>

          {/* CTAs with subtle backdrop */}
          <motion.div
            variants={fadeUp}
            className="mt-12 inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-ink/5 bg-offwhite/60 px-8 py-6 backdrop-blur-sm"
          >
            <MagneticButton as="link" href={whatsappHref} variant="primary">
              WhatsApp · {WHATSAPP}
            </MagneticButton>
            <MagneticButton as="link" href={emailHref} variant="secondary">
              {EMAIL}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-col items-center gap-2 text-sm text-ink/50"
          >
            <p className="inline-flex items-center gap-2 font-display text-base text-ink">
              {/* Map pin icon */}
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 2c-3.3 0-6 2.7-6 6 0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z" />
                <circle cx="10" cy="8" r="2" />
              </svg>
              {LOCATION}
            </p>
            <p>By appointment, Monday–Saturday.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
