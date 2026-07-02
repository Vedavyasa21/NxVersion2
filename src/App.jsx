import { Component } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import MissionVision from './components/MissionVision.jsx'
import WhyAI from './components/WhyAI.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

/**
 * Top-level error boundary. If anything below throws during render we show
 * the actual error message in dev (so debugging is one glance) and a clean
 * branded fallback in production.
 */
class AppBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[Nxvora] render error:', error, info)
  }
  render() {
    if (this.state.error) {
      const isDev = import.meta.env.DEV
      return (
        <div className="min-h-screen flex items-center justify-center bg-paper px-6">
          <div className="max-w-2xl text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Nxvora
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tightest text-ink">
              {isDev ? 'Render error (dev mode)' : 'Something went off-script.'}
            </h1>
            <p className="mt-4 text-sm text-ink/60">
              {isDev
                ? 'Full error is shown below. Check the browser console for the stack trace.'
                : 'Please refresh the page. If the problem persists, email ishhmediax@gmail.com.'}
            </p>
            {isDev && (
              <pre className="mt-6 max-h-96 overflow-auto rounded-lg border border-ink/10 bg-offwhite p-4 text-xs leading-relaxed text-ink/80">
                {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
              </pre>
            )}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <AppBoundary>
      <div className="min-h-screen bg-paper text-ink">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <MissionVision />
          <WhyAI />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppBoundary>
  )
}
