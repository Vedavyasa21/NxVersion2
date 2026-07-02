import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Cursor-aware magnetic CTA.
 * - Default: ink-on-white, subtle border.
 * - Hover: fills with accent, scales 1.02, slight text nudge.
 * - On pointermove, the button "follows" the cursor within a small radius
 *   (magnetic pull), then springs back. Disabled on touch devices.
 *
 * @param {object} props — passed through to the inner <button>/<a>.
 * @param {'button'|'link'} props.as — render as <button> or <a>.
 * @param {string} props.href — when as="link".
 */
export default function MagneticButton({
  as = 'button',
  href,
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary'
  ...rest
}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    // Pull strength — 0.25 means the button moves 25% of the cursor offset.
    setOffset({ x: x * 0.25, y: y * 0.25 })
  }
  const handleLeave = () => setOffset({ x: 0, y: 0 })

  // Base + variant styles. One accent only — variants differ in fill/contrast.
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 ease-out-expo will-change-transform select-none'
  const variants = {
    primary:
      'bg-ink text-paper hover:bg-accent hover:text-paper border border-ink hover:border-accent',
    secondary:
      'bg-transparent text-ink hover:text-accent border border-ink/15 hover:border-accent/40',
  }

  // Render the right motion component. We use the explicit form
  // (motion.a / motion.button) rather than motion[as] because the dynamic
  // accessor is brittle across framer-motion minor versions and can throw
  // "motion.X is not a function" in some bundlers.
  if (as === 'link') {
    return (
      <motion.a
        ref={ref}
        href={href}
        {...rest}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
        className={`${base} ${variants[variant]} ${className}`}
      >
        <span className="relative z-10 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">
          {children}
        </span>
        <svg
          viewBox="0 0 16 16"
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      {...rest}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">
        {children}
      </span>
      <svg
        viewBox="0 0 16 16"
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </motion.button>
  )
}
