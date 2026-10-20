import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'

const INTRO_DURATION_MS = 4000
const SESSION_KEY = 'markdev-introduced'

export default function Introduction({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return !sessionStorage.getItem(SESSION_KEY)
    } catch {
      return false
    }
  })
  const overlay = useRef<HTMLDivElement>(null)
  const skip = useRef<HTMLButtonElement>(null)
  const shownInitially = useRef(visible)

  const dismiss = useCallback(() => {
    setVisible(false)
    try {
      sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      /* Storage is optional. */
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      onComplete()
      if (shownInitially.current) {
        document.getElementById('main-content')?.focus({ preventScroll: true })
      }
      return
    }
    // Animation completion owns the ID handoff; this only guards interrupted CSS animations.
    const fallback = window.setTimeout(dismiss, INTRO_DURATION_MS + 250)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handlePreference = () => {
      if (preference.matches) dismiss()
    }
    preference.addEventListener('change', handlePreference)
    return () => {
      window.clearTimeout(fallback)
      preference.removeEventListener('change', handlePreference)
    }
  }, [visible, dismiss, onComplete])

  useLayoutEffect(() => {
    if (!visible) return
    const surface = overlay.current
    if (!surface) return
    skip.current?.focus({ preventScroll: true })
    const preventScroll = (event: WheelEvent) => event.preventDefault()
    const keepFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !surface.contains(event.target)) {
        skip.current?.focus({ preventScroll: true })
      }
    }
    surface.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('focusin', keepFocus)
    return () => {
      surface.removeEventListener('wheel', preventScroll)
      document.removeEventListener('focusin', keepFocus)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={overlay}
      className="introduction introduction-aperture"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to MarkDev"
      style={{ '--intro-duration': `${INTRO_DURATION_MS}ms` } as CSSProperties}
      onKeyDown={(event) => {
        event.stopPropagation()
        if (event.key === 'Escape') dismiss()
        if (event.key === 'Tab') {
          event.preventDefault()
          skip.current?.focus({ preventScroll: true })
        }
        if (
          ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key) ||
          ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')
        ) {
          event.preventDefault()
        }
      }}
    >
      <div
        className="intro-aperture-hole"
        aria-hidden="true"
        onAnimationEnd={(event) => {
          if (event.animationName === 'intro-aperture-open') dismiss()
        }}
      />
      <div className="intro-aperture-ring" aria-hidden="true" />
      <span className="intro-index">PERSONAL PORTFOLIO / {new Date().getFullYear()}</span>
      <div className="intro-branding">
        <p className="intro-wordmark">
          mark<span>.dev</span>
        </p>
        <p className="intro-caption">A little curiosity. A lot of possibilities.</p>
      </div>
      <button ref={skip} type="button" onClick={dismiss} className="intro-skip">
        Skip introduction <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
