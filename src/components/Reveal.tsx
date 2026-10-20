import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { observeReveal } from '../lib/reveal-observer'

let motionPreference: MediaQueryList | undefined
function getMotionPreference() {
  return (motionPreference ??= window.matchMedia('(prefers-reduced-motion: reduce)'))
}
function subscribeMotionPreference(notify: () => void) {
  const preference = getMotionPreference()
  preference.addEventListener('change', notify)
  return () => preference.removeEventListener('change', notify)
}
function reducedMotionSnapshot() {
  return getMotionPreference().matches
}
function serverMotionSnapshot() {
  return true
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'left',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'left' | 'right'
}) {
  const element = useRef<HTMLDivElement>(null)
  const reduced = useSyncExternalStore(
    subscribeMotionPreference,
    reducedMotionSnapshot,
    serverMotionSnapshot,
  )
  const opacity = useMotionValue(1)
  const offset = useMotionValue(0)
  // Individual translate composes with existing hover transforms on cards.
  const translate = useTransform(offset, (value) => (value === 0 ? 'none' : `${value}px 0px`))

  useLayoutEffect(() => {
    const node = element.current
    if (!node) return
    let visible = true
    let disposed = false
    let stopAnimations = () => {}
    const hiddenOffset = direction === 'left' ? -64 : 64

    function reveal(show: boolean, immediately = false) {
      if (disposed || (!show && node!.contains(document.activeElement))) return
      if (visible === show && !immediately) return
      visible = show
      node!.dataset.revealState = show ? 'visible' : 'hidden'
      stopAnimations()
      if (immediately) {
        opacity.set(show ? 1 : 0)
        offset.set(show ? 0 : hiddenOffset)
        // Keyboard focus must never wait for an animation frame or stagger delay.
        node!.style.opacity = show ? '1' : '0'
        node!.style.translate = show ? 'none' : `${hiddenOffset}px 0px`
        return
      }
      const transition = {
        duration: show ? 0.72 : 0.64,
        delay: show ? Math.min(Math.max(delay, 0), 0.24) : 0,
        ease: [0.22, 1, 0.36, 1] as const,
      }
      const fade = animate(opacity, show ? 1 : 0, transition)
      const slide = animate(offset, show ? 0 : hiddenOffset, transition)
      stopAnimations = () => {
        fade.stop()
        slide.stop()
      }
    }
    function insideEntryBand() {
      const bounds = node!.getBoundingClientRect()
      return (
        bounds.width > 0 &&
        bounds.height > 0 &&
        bounds.bottom >= 24 &&
        bounds.top <= window.innerHeight - 24
      )
    }
    function outsideExitBand() {
      const bounds = node!.getBoundingClientRect()
      return (
        bounds.width === 0 ||
        bounds.height === 0 ||
        bounds.bottom <= -24 ||
        bounds.top >= window.innerHeight + 24
      )
    }
    function enter() {
      // Validate current geometry: observer notifications can be stale after a fast scroll.
      if (insideEntryBand()) reveal(true)
    }
    function leave() {
      if (outsideExitBand()) reveal(false)
    }
    function focusIn() {
      reveal(true, true)
    }
    function focusOut() {
      queueMicrotask(() => {
        if (!disposed) leave()
      })
    }

    if (reduced || typeof IntersectionObserver === 'undefined') {
      reveal(true, true)
      return
    }
    reveal(false, true)
    if (insideEntryBand()) reveal(true)
    const unsubscribe = observeReveal(node, { enter, leave })
    node.addEventListener('focusin', focusIn)
    node.addEventListener('focusout', focusOut)
    return () => {
      disposed = true
      unsubscribe()
      stopAnimations()
      node.removeEventListener('focusin', focusIn)
      node.removeEventListener('focusout', focusOut)
      opacity.set(1)
      offset.set(0)
    }
  }, [delay, direction, offset, opacity, reduced])

  return (
    <motion.div
      ref={element}
      className={className}
      data-reveal={direction}
      initial={false}
      style={{ opacity, translate }}
    >
      {children}
    </motion.div>
  )
}
