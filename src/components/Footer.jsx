const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Contact', href: '#contact' },
]

// <!-- TODO: asset — replace with real social URLs once accounts are live -->
const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'YouTube', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* Decorative amber glow — top-right corner */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-[0.06] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)',
        }}
      />

      {/* Top accent gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }} />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            {/* <!-- TODO: asset — replace inline wordmark with real logo SVG --> */}
            <a
              href="#top"
              className="font-display text-2xl font-semibold tracking-tightest text-paper"
            >
              Nxvora<span className="text-accent">.</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-paper/50">
              AI-powered social media marketing for brands that want to grow
              faster, look better, and sell more.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-paper/30">
                Sitemap
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-paper/50 transition-colors duration-300 hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-paper/30">
                Contact
              </p>
              <ul className="space-y-3 text-sm text-paper/50">
                <li>
                  <a
                    href="mailto:ishhmediax@gmail.com"
                    className="transition-colors duration-300 hover:text-accent"
                  >
                    ishhmediax@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919311591913"
                    className="transition-colors duration-300 hover:text-accent"
                  >
                    +91 9311591913
                  </a>
                </li>
                <li className="text-paper/40">Gurgaon, Delhi-NCR</li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-paper/30">
                Social
              </p>
              <ul className="space-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="text-sm text-paper/50 transition-colors duration-300 hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-paper/30">
            © {year} Nxvora. All rights reserved.
          </p>
          <p className="text-xs text-paper/30">
            Built with intent in Delhi-NCR.
          </p>
        </div>
      </div>
    </footer>
  )
}
