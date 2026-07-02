import { motion } from 'framer-motion'
import { fadeUp, stagger, sectionViewport } from '../lib/motion.js'

// Short, hard-hitting value props. The point of the section is to make the
// "AI-first" claim concrete — each line is a concrete capability.
const PROPS = [
  {
    label: '01',
    title: 'Faster execution',
    body: 'AI-augmented production that compresses weeks of work into days, without losing craft.',
  },
  {
    label: '02',
    title: 'Data-driven creative',
    body: 'Concepts rooted in real audience signal — every decision has a measurable reason.',
  },
  {
    label: '03',
    title: 'Scalable content systems',
    body: 'Playbooks, prompts and pipelines that compound, so output quality rises as volume grows.',
  },
  {
    label: '04',
    title: 'Category-leading strategy',
    body: 'We don\'t chase trends. We help you define the category, then own it.',
  },
]

export default function WhyAI() {
  return (
    <section className="relative bg-offwhite py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mb-16 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
          >
            Why AI-first
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl"
          >
            The unfair advantages of an
            <br className="hidden sm:block" /> AI-native agency.
          </motion.h2>
          {/* Animated accent line */}
          <motion.div
            variants={fadeUp}
            className="mt-6 accent-line-animated w-24"
          />
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/5 bg-ink/5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROPS.map((p) => (
            <motion.li
              key={p.title}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden bg-paper p-10 transition-all duration-500 ease-out-expo hover:bg-accent"
            >
              {/* Left accent bar */}
              <div
                className="absolute inset-y-0 left-0 w-[2px] bg-accent/20 transition-all duration-500 group-hover:bg-paper/40 group-hover:w-[3px]"
                aria-hidden
              />

              {/* Large faded number */}
              <span
                className="absolute -top-2 right-4 font-display text-7xl font-bold text-ink/[0.04] transition-colors duration-500 group-hover:text-paper/[0.12] select-none"
                aria-hidden
              >
                {p.label}
              </span>

              <span className="mb-8 font-display text-sm tracking-tightest text-accent transition-colors duration-500 group-hover:text-paper/70">
                {p.label}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tightest text-ink transition-colors duration-500 group-hover:text-paper">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-paper/80">
                {p.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
