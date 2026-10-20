export interface Point {
  x: number
  y: number
}

export interface LanyardState {
  points: Point[]
  previous: Point[]
  length: number
  angle: number
  angularVelocity: number
}

interface SimulationHistory {
  previousStep: number
  dragTarget: Point | null
  dragVelocity: Point
  dragging: boolean
}

const SEGMENTS = 4
const MAX_STEP = 1 / 120
const history = new WeakMap<LanyardState, SimulationHistory>()

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function limitVector(point: Point, maximum: number): Point {
  const distance = Math.hypot(point.x, point.y)
  if (distance <= maximum || distance === 0) return { ...point }
  return { x: (point.x / distance) * maximum, y: (point.y / distance) * maximum }
}

function createHistory(): SimulationHistory {
  return { previousStep: MAX_STEP, dragTarget: null, dragVelocity: { x: 0, y: 0 }, dragging: false }
}

function constrain(state: LanyardState, target: Point | null) {
  const segmentLength = state.length / SEGMENTS
  for (let iteration = 0; iteration < 64; iteration++) {
    state.points[0].x = 0
    state.points[0].y = 0
    if (target) Object.assign(state.points[SEGMENTS], target)
    for (let index = 0; index < SEGMENTS; index++) {
      const first = state.points[index]
      const second = state.points[index + 1]
      const dx = second.x - first.x
      const dy = second.y - first.y
      const distance = Math.hypot(dx, dy)
      if (distance < 0.00001) continue
      const firstWeight = index === 0 ? 0 : 1
      const secondWeight = index + 1 === SEGMENTS ? (target ? 0 : 0.28) : 1
      const weight = firstWeight + secondWeight
      const correction = (distance - segmentLength) / (distance * weight)
      first.x += dx * correction * firstWeight
      first.y += dy * correction * firstWeight
      second.x -= dx * correction * secondWeight
      second.y -= dy * correction * secondWeight
    }
  }
  state.points[0].x = 0
  state.points[0].y = 0
  if (target) Object.assign(state.points[SEGMENTS], target)
}

export function createLanyard(length: number, initialOffset: Point = { x: 0, y: 0 }): LanyardState {
  if (!Number.isFinite(length) || length <= 0) {
    throw new RangeError('Lanyard length must be a finite positive number.')
  }
  const end = limitVector(
    {
      x: Number.isFinite(initialOffset.x) ? initialOffset.x : 0,
      y: length + (Number.isFinite(initialOffset.y) ? initialOffset.y : 0),
    },
    length,
  )
  const distance = Math.hypot(end.x, end.y)
  const normal = distance > 0 ? { x: -end.y / distance, y: end.x / distance } : { x: 1, y: 0 }
  let bend = 0
  if (distance < length - 0.01) {
    let lower = 0
    let upper = length
    for (let iteration = 0; iteration < 30; iteration++) {
      bend = (lower + upper) / 2
      let curveLength = 0
      let previous = { x: 0, y: 0 }
      for (let index = 1; index <= SEGMENTS; index++) {
        const fraction = index / SEGMENTS
        const point = {
          x: end.x * fraction + normal.x * Math.sin(fraction * Math.PI) * bend,
          y: end.y * fraction + normal.y * Math.sin(fraction * Math.PI) * bend,
        }
        curveLength += Math.hypot(point.x - previous.x, point.y - previous.y)
        previous = point
      }
      if (curveLength < length) lower = bend
      else upper = bend
    }
  }
  const points = Array.from({ length: SEGMENTS + 1 }, (_, index) => {
    const fraction = index / SEGMENTS
    return {
      x: end.x * fraction + normal.x * Math.sin(fraction * Math.PI) * bend,
      y: end.y * fraction + normal.y * Math.sin(fraction * Math.PI) * bend,
    }
  })
  const state: LanyardState = {
    points,
    previous: points.map((point) => ({ ...point })),
    length,
    angle: 0,
    angularVelocity: 0,
  }
  constrain(state, end)
  state.previous = state.points.map((point) => ({ ...point }))
  history.set(state, createHistory())
  return state
}

export function stepLanyard(state: LanyardState, deltaSeconds: number, target: Point | null): void {
  if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return
  const elapsed = Math.min(deltaSeconds, 0.05)
  const steps = Math.ceil(elapsed / MAX_STEP)
  const step = elapsed / steps
  const previous = history.get(state) ?? createHistory()
  history.set(state, previous)
  const dragTarget =
    target && Number.isFinite(target.x) && Number.isFinite(target.y)
      ? limitVector(target, state.length)
      : null
  if (dragTarget) {
    if (previous.dragging && previous.dragTarget) {
      const velocity = limitVector(
        {
          x: (dragTarget.x - previous.dragTarget.x) / elapsed,
          y: (dragTarget.y - previous.dragTarget.y) / elapsed,
        },
        state.length * 3.2,
      )
      const blend = 1 - Math.exp(-elapsed * 24)
      previous.dragVelocity.x += (velocity.x - previous.dragVelocity.x) * blend
      previous.dragVelocity.y += (velocity.y - previous.dragVelocity.y) * blend
    } else {
      previous.dragVelocity = { x: 0, y: 0 }
    }
  }
  for (let iteration = 0; iteration < steps; iteration++) {
    const drag = Math.exp(-2.7 * step)
    for (let index = 1; index <= SEGMENTS; index++) {
      if (dragTarget && index === SEGMENTS) continue
      const point = state.points[index]
      const old = state.previous[index]
      const velocity = limitVector(
        {
          x: (point.x - old.x) / previous.previousStep,
          y: (point.y - old.y) / previous.previousStep,
        },
        state.length * 3.2,
      )
      old.x = point.x
      old.y = point.y
      point.x += velocity.x * step * drag
      point.y += velocity.y * step * drag + state.length * 8 * step * step
    }
    constrain(state, dragTarget)
    if (dragTarget) {
      state.previous[SEGMENTS].x = dragTarget.x - previous.dragVelocity.x * step
      state.previous[SEGMENTS].y = dragTarget.y - previous.dragVelocity.y * step
    }
    const end = state.points[SEGMENTS]
    const desiredAngle = clamp(
      (-Math.atan2(end.x, Math.max(end.y, 1)) * 180 * 0.7) / Math.PI,
      -35,
      35,
    )
    state.angularVelocity += ((desiredAngle - state.angle) * 65 - state.angularVelocity * 13) * step
    state.angularVelocity = clamp(state.angularVelocity, -180, 180)
    state.angle = clamp(state.angle + state.angularVelocity * step, -35, 35)
    previous.previousStep = step
  }
  previous.dragTarget = dragTarget
  previous.dragging = dragTarget !== null
}

export function isLanyardSettled(state: LanyardState): boolean {
  const previous = history.get(state)
  if (previous?.dragging || Math.abs(state.angle) > 0.25 || Math.abs(state.angularVelocity) > 0.8) {
    return false
  }
  const step = previous?.previousStep ?? MAX_STEP
  return state.points.every((point, index) => {
    const restingY = (state.length * index) / SEGMENTS
    const old = state.previous[index]
    return (
      Math.hypot(point.x, point.y - restingY) < 0.7 &&
      Math.hypot(point.x - old.x, point.y - old.y) / step < 1.8
    )
  })
}

export function resetLanyard(state: LanyardState): void {
  for (let index = 0; index <= SEGMENTS; index++) {
    state.points[index].x = 0
    state.points[index].y = (state.length * index) / SEGMENTS
    Object.assign(state.previous[index], state.points[index])
  }
  state.angle = 0
  state.angularVelocity = 0
  history.set(state, createHistory())
}
