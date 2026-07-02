// Shared Framer Motion variants — keeps animations consistent across sections.

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren: 0.05 },
  },
})

// Section-level reveal — once, when 30% of the section is in view.
export const sectionViewport = { once: true, amount: 0.3 }
export const cardViewport = { once: true, amount: 0.4 }
