interface RevealCallbacks {
  enter: () => void
  leave: () => void
}

const subscriptions = new Map<HTMLElement, RevealCallbacks>()
let entryObserver: IntersectionObserver | null = null
let exitObserver: IntersectionObserver | null = null

function createObservers() {
  // Horizontal room keeps the slide itself from crossing an observation boundary.
  entryObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) subscriptions.get(entry.target as HTMLElement)?.enter()
      }
    },
    { rootMargin: '-24px 120px -24px 120px', threshold: 0 },
  )
  exitObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) subscriptions.get(entry.target as HTMLElement)?.leave()
      }
    },
    { rootMargin: '24px 120px 24px 120px', threshold: 0 },
  )
}

export function observeReveal(element: HTMLElement, callbacks: RevealCallbacks): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    callbacks.enter()
    return () => {}
  }

  if (!entryObserver || !exitObserver) createObservers()
  subscriptions.set(element, callbacks)
  entryObserver?.observe(element)
  exitObserver?.observe(element)

  return () => {
    // A replaced subscription must survive cleanup from an earlier registration.
    if (subscriptions.get(element) !== callbacks) return
    subscriptions.delete(element)
    entryObserver?.unobserve(element)
    exitObserver?.unobserve(element)

    if (subscriptions.size === 0) {
      entryObserver?.disconnect()
      exitObserver?.disconnect()
      entryObserver = null
      exitObserver = null
    }
  }
}
