import { useLayoutEffect, useRef } from 'react'
import { createLanyard, isLanyardSettled, resetLanyard, stepLanyard } from '../lib/lanyard-physics'
import type { Point } from '../lib/lanyard-physics'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function useLanyard(ready: boolean) {
  const stage = useRef<HTMLDivElement>(null)
  const rig = useRef<HTMLDivElement>(null)
  const cord = useRef<SVGSVGElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const surface = stage.current
    const mount = rig.current
    const ribbon = cord.current
    const badge = body.current
    const handle = card.current
    if (!surface || !mount || !ribbon || !badge || !handle) return

    const paths = [...ribbon.querySelectorAll<SVGPathElement>('[data-cord-path]')]
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = preference.matches
    let simulation = createLanyard(ribbon.clientHeight || 257)
    let frame = 0
    let previousTime = 0
    let elapsed = 0
    let visible = true
    let pointer: number | null = null
    let keyboardGrab = false
    let target: Point | null = null
    let grabOffset: Point = { x: 0, y: 0 }
    let anchor: Point = { x: 0, y: 0 }
    let limits = { left: -120, right: 120, top: 30, bottom: simulation.length }
    let disposed = false
    let geometry = ''
    let entrancePending = ready && !preference.matches
    let cardCorners: Point[] = []
    let viewportWidth = window.innerWidth

    function fitsViewport(angle: number, endX: number) {
      const radians = (angle * Math.PI) / 180
      return cardCorners.every((point) => {
        const x = anchor.x + endX + point.x * Math.cos(radians) - point.y * Math.sin(radians)
        return x >= 14 && x <= viewportWidth - 14
      })
    }

    function paint() {
      const points = simulation.points
      const center = mount!.clientWidth / 2
      let path = `M ${center + points[0].x} ${points[0].y}`
      for (let index = 0; index < points.length - 1; index++) {
        const before = points[Math.max(0, index - 1)]
        const start = points[index]
        const end = points[index + 1]
        const after = points[Math.min(points.length - 1, index + 2)]
        path += ` C ${center + start.x + (end.x - before.x) / 6} ${start.y + (end.y - before.y) / 6}, ${center + end.x - (after.x - start.x) / 6} ${end.y - (after.y - start.y) / 6}, ${center + end.x} ${end.y}`
      }
      paths.forEach((element) => element.setAttribute('d', path))
      const end = points[points.length - 1]
      let angle = preference.matches ? 0 : simulation.angle
      // Limit the visible rotation near an edge, including the card's lower corners.
      if (!fitsViewport(angle, end.x)) {
        let lower = 0
        let upper = 1
        for (let iteration = 0; iteration < 10; iteration++) {
          const portion = (lower + upper) / 2
          if (fitsViewport(angle * portion, end.x)) lower = portion
          else upper = portion
        }
        angle *= lower
      }
      badge!.style.transform = `translate3d(${end.x.toFixed(3)}px, ${(end.y - simulation.length).toFixed(3)}px, 0) rotate(${angle.toFixed(3)}deg)`
    }

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
      mount!.dataset.awake = 'false'
    }

    function staticPosition(position: Point) {
      simulation.points.forEach((point, index) => {
        const portion = index / (simulation.points.length - 1)
        point.x = position.x * portion
        point.y = position.y * portion
        simulation.previous[index] = { ...point }
      })
      simulation.angle = 0
      simulation.angularVelocity = 0
      paint()
    }

    function tick(time: number) {
      frame = 0
      if (disposed || !ready || !visible || document.hidden) return
      if (reduced !== preference.matches) {
        motionPreferenceChange()
        return
      }
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 1 / 30) : 1 / 60
      previousTime = time
      elapsed += delta
      if (preference.matches) {
        if (target) staticPosition(target)
        stop()
        return
      }
      stepLanyard(simulation, delta, target)
      paint()
      if (!target && (isLanyardSettled(simulation) || elapsed > 9)) {
        resetLanyard(simulation)
        paint()
        mount!.dataset.dragState = 'idle'
        stop()
        return
      }
      frame = requestAnimationFrame(tick)
    }

    function wake() {
      if (frame || disposed || !ready || !visible || document.hidden) return
      mount!.dataset.awake = 'true'
      previousTime = 0
      frame = requestAnimationFrame(tick)
    }

    function constrain(position: Point): Point {
      const x = clamp(position.x, limits.left, limits.right)
      const y = clamp(position.y, limits.top, limits.bottom)
      const distance = Math.hypot(x, y)
      const scale = Math.min(1, simulation.length / Math.max(distance, 1))
      return { x: x * scale, y: y * scale }
    }

    function setGrabbed(grabbed: boolean) {
      handle!.setAttribute('aria-pressed', String(grabbed))
      mount!.dataset.dragState = grabbed ? 'dragging' : 'settling'
    }

    function release(reset = false) {
      const captured = pointer
      pointer = null
      keyboardGrab = false
      target = null
      setGrabbed(false)
      if (captured !== null && handle!.hasPointerCapture(captured)) {
        handle!.releasePointerCapture(captured)
      }
      elapsed = 0
      if (reset || preference.matches || !visible || document.hidden) {
        stop()
        resetLanyard(simulation)
        paint()
        mount!.dataset.dragState = 'idle'
      } else wake()
    }

    function measure() {
      const bounds = mount!.getBoundingClientRect()
      const area = surface!.getBoundingClientRect()
      const length = ribbon!.clientHeight || 257
      const signature = `${bounds.width}:${area.width}:${area.height}:${handle!.offsetWidth}:${badge!.offsetHeight}:${bounds.top - area.top}`
      if (signature === geometry) return
      geometry = signature
      release(true)
      simulation = createLanyard(length, entrancePending ? { x: 60, y: -95 } : undefined)
      anchor = { x: bounds.left + bounds.width / 2, y: bounds.top }
      const mobile = window.matchMedia('(max-width: 680px)').matches
      const margin = handle!.offsetWidth / 2 + (mobile ? 24 : 54)
      limits = {
        left: Math.max(-length * 0.78, (mobile ? area.left : 12) + margin - anchor.x),
        right: Math.min(
          length * 0.78,
          (mobile ? area.right : window.innerWidth - 12) - margin - anchor.x,
        ),
        top: Math.max(30, area.top + 8 - anchor.y),
        bottom: Math.max(length, area.bottom - anchor.y - badge!.offsetHeight - 12),
      }
      viewportWidth = window.innerWidth
      const matrix = new DOMMatrixReadOnly(getComputedStyle(handle!).transform)
      const rotation = Math.atan2(matrix.b, matrix.a)
      const halfWidth = handle!.offsetWidth / 2
      const height = handle!.offsetHeight
      const top = badge!.offsetHeight - height
      cardCorners = [
        { x: -halfWidth, y: 0 },
        { x: halfWidth, y: 0 },
        { x: -halfWidth, y: height },
        { x: halfWidth, y: height },
      ].map((point) => ({
        x: point.x * Math.cos(rotation) - point.y * Math.sin(rotation),
        y: top + point.x * Math.sin(rotation) + point.y * Math.cos(rotation),
      }))
      cardCorners.push(
        { x: -bounds.width / 2, y: 0 },
        { x: bounds.width / 2, y: 0 },
        { x: -bounds.width / 2, y: badge!.offsetHeight },
        { x: bounds.width / 2, y: badge!.offsetHeight },
      )
      paint()
    }

    function pointerDown(event: PointerEvent) {
      if (!ready || !event.isPrimary || event.button !== 0 || pointer !== null) return
      // The grab offset keeps the exact point under the cursor attached to the hand.
      const bounds = mount!.getBoundingClientRect()
      anchor = { x: bounds.left + bounds.width / 2, y: bounds.top }
      const end = simulation.points[simulation.points.length - 1]
      grabOffset = { x: event.clientX - anchor.x - end.x, y: event.clientY - anchor.y - end.y }
      target = { ...end }
      pointer = event.pointerId
      keyboardGrab = false
      elapsed = 0
      handle!.setPointerCapture(event.pointerId)
      setGrabbed(true)
      wake()
    }

    function pointerMove(event: PointerEvent) {
      if (reduced !== preference.matches) motionPreferenceChange()
      if (event.pointerId !== pointer) return
      const bounds = mount!.getBoundingClientRect()
      anchor = { x: bounds.left + bounds.width / 2, y: bounds.top }
      target = constrain({
        x: event.clientX - anchor.x - grabOffset.x,
        y: event.clientY - anchor.y - grabOffset.y,
      })
      if (preference.matches) staticPosition(target)
      else wake()
    }

    function pointerEnd(event: PointerEvent) {
      if (event.pointerId === pointer) release(event.type === 'pointercancel')
    }

    function keyDown(event: KeyboardEvent) {
      if (!ready) return
      if (event.key === 'Escape' || event.key === 'Home') {
        event.preventDefault()
        release(true)
        return
      }
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        if (event.repeat) return
        if (keyboardGrab) release()
        else {
          keyboardGrab = true
          target = { ...simulation.points[simulation.points.length - 1] }
          setGrabbed(true)
        }
        return
      }
      if (!event.key.startsWith('Arrow')) return
      event.preventDefault()
      const end = target || simulation.points[simulation.points.length - 1]
      const distance = event.shiftKey ? 40 : 20
      target = constrain({
        x:
          end.x +
          (event.key === 'ArrowLeft' ? -distance : event.key === 'ArrowRight' ? distance : 0),
        y: end.y + (event.key === 'ArrowUp' ? -distance : event.key === 'ArrowDown' ? distance : 0),
      })
      keyboardGrab = true
      setGrabbed(true)
      elapsed = 0
      if (preference.matches) staticPosition(target)
      else wake()
    }

    function assistiveClick(event: MouseEvent) {
      if (!ready || event.detail !== 0) return
      if (keyboardGrab) release()
      else {
        keyboardGrab = true
        target = { ...simulation.points[simulation.points.length - 1] }
        setGrabbed(true)
      }
    }

    function keyUp(event: KeyboardEvent) {
      if (event.key === ' ' || event.key === 'Enter') event.preventDefault()
    }

    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape' && (pointer !== null || keyboardGrab)) {
        event.preventDefault()
        release(true)
      }
    }

    function cancel() {
      release(true)
    }
    function motionPreferenceChange() {
      reduced = preference.matches
      entrancePending = false
      release(true)
    }
    function visibilityChange() {
      if (document.hidden) cancel()
    }
    function blur() {
      if (keyboardGrab) release()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(surface)
    observer.observe(handle)
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (!visible) cancel()
        else if (entrancePending && !document.hidden) {
          entrancePending = false
          simulation = createLanyard(simulation.length, { x: 60, y: -95 })
          elapsed = 0
          paint()
          wake()
        }
      },
      { rootMargin: '80px' },
    )
    intersection.observe(surface)
    handle.addEventListener('pointerdown', pointerDown)
    handle.addEventListener('pointermove', pointerMove)
    handle.addEventListener('pointerup', pointerEnd)
    handle.addEventListener('pointercancel', pointerEnd)
    handle.addEventListener('lostpointercapture', pointerEnd)
    handle.addEventListener('keydown', keyDown)
    handle.addEventListener('keyup', keyUp)
    handle.addEventListener('click', assistiveClick)
    handle.addEventListener('blur', blur)
    handle.addEventListener('dragstart', eventPreventDefault)
    preference.addEventListener('change', motionPreferenceChange)
    document.addEventListener('visibilitychange', visibilityChange)
    document.addEventListener('keydown', escape)
    window.addEventListener('blur', cancel)
    window.addEventListener('resize', measure)

    return () => {
      disposed = true
      release(true)
      observer.disconnect()
      intersection.disconnect()
      handle.removeEventListener('pointerdown', pointerDown)
      handle.removeEventListener('pointermove', pointerMove)
      handle.removeEventListener('pointerup', pointerEnd)
      handle.removeEventListener('pointercancel', pointerEnd)
      handle.removeEventListener('lostpointercapture', pointerEnd)
      handle.removeEventListener('keydown', keyDown)
      handle.removeEventListener('keyup', keyUp)
      handle.removeEventListener('click', assistiveClick)
      handle.removeEventListener('blur', blur)
      handle.removeEventListener('dragstart', eventPreventDefault)
      preference.removeEventListener('change', motionPreferenceChange)
      document.removeEventListener('visibilitychange', visibilityChange)
      document.removeEventListener('keydown', escape)
      window.removeEventListener('blur', cancel)
      window.removeEventListener('resize', measure)
    }
  }, [ready])

  return { stage, rig, cord, body, card }
}

function eventPreventDefault(event: Event) {
  event.preventDefault()
}
