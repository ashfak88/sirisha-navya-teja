import { useEffect, useRef } from 'react'
import Page from './Page.jsx'
import Credit from './Credit.jsx'
import { bodyClass, bodyStyle, scripts } from './legacy.js'

// The original page scripts expect to run while the page loads: replay DOMContentLoaded / load for them.
const shimReady = () => {
  const d = document.addEventListener.bind(document), w = window.addEventListener.bind(window)
  document.addEventListener = (t, f, o) => (t === 'DOMContentLoaded' ? setTimeout(() => f(new Event(t)), 0) : d(t, f, o))
  window.addEventListener = (t, f, o) => (t === 'load' || t === 'DOMContentLoaded' ? setTimeout(() => f(new Event(t)), 0) : w(t, f, o))
  return () => { document.addEventListener = d; window.addEventListener = w }
}
const run = (s) =>
  new Promise((resolve) => {
    const el = document.createElement('script')
    if (s.src) { el.src = s.src.startsWith('http') || s.src.startsWith('/') ? s.src : '/' + s.src; el.async = false; el.onload = el.onerror = resolve }
    else el.text = s.code
    document.body.appendChild(el)
    if (!s.src) resolve()
  })

export default function App() {
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    if (bodyClass) document.body.className = bodyClass
    if (bodyStyle) document.body.style.cssText = bodyStyle
    const restore = shimReady()
    ;(async () => {
      for (const s of scripts) await run(s)
      setTimeout(restore, 500)
    })()
  }, [])
  return (
    <>
      <Page />
      <div style={{ background: '#f2ddbb', padding: '14px 0 26px', textAlign: 'center', fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(60,50,40,.6)', fontFamily: "sans-serif" }}>
        <Credit />
      </div>
    </>
  )
}
