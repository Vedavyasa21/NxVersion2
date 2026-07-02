import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Global error reporter — surfaces any uncaught error to a visible element on
// the page so a "white screen" is never silent. Removed automatically once
// the React tree takes over.
function showFatalError(message, stack) {
  let el = document.getElementById('__fatal_error')
  if (!el) {
    el = document.createElement('div')
    el.id = '__fatal_error'
    el.style.cssText =
      'position:fixed;inset:0;z-index:99999;background:#fff;color:#0a0a0a;padding:24px;font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;overflow:auto;white-space:pre-wrap;'
    document.body.appendChild(el)
  }
  el.textContent = 'FATAL: ' + message + '\n\n' + (stack || '')
}
window.addEventListener('error', (e) => {
  showFatalError(e.message || String(e.error), e.error?.stack)
})
window.addEventListener('unhandledrejection', (e) => {
  showFatalError(
    'Unhandled promise rejection: ' + (e.reason?.message || e.reason),
    e.reason?.stack,
  )
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
