import { describe, expect, it } from 'vitest'
import {
  createLanyard,
  isLanyardSettled,
  resetLanyard,
  stepLanyard,
} from '../src/lib/lanyard-physics.ts'

function expectConstrained(state, tolerance = 0.6) {
  expect(state.points[0]).toEqual({ x: 0, y: 0 })
  const segmentLength = state.length / (state.points.length - 1)
  for (let index = 1; index < state.points.length; index++) {
    const point = state.points[index]
    const previous = state.points[index - 1]
    expect(
      Math.abs(Math.hypot(point.x - previous.x, point.y - previous.y) - segmentLength),
    ).toBeLessThan(tolerance)
    expect(Number.isFinite(point.x) && Number.isFinite(point.y)).toBe(true)
  }
  expect(Math.abs(state.angle)).toBeLessThanOrEqual(35)
  expect(Number.isFinite(state.angularVelocity)).toBe(true)
}

function releaseAfterPull(state) {
  for (let frame = 0; frame < 45; frame++) {
    const fraction = frame / 44
    stepLanyard(state, 1 / 60, { x: fraction * 95, y: state.length - fraction * 105 })
  }
}

describe('lanyard physics', () => {
  it('keeps a hanging badge stable without numerical drift', () => {
    const state = createLanyard(257)
    for (let frame = 0; frame < 600; frame++) stepLanyard(state, 1 / 60, null)
    expectConstrained(state)
    expect(state.points.at(-1).x).toBeCloseTo(0, 7)
    expect(state.points.at(-1).y).toBeCloseTo(257, 2)
    expect(isLanyardSettled(state)).toBe(true)
  })

  it('holds the grabbed endpoint while the remaining strap forms slack', () => {
    const state = createLanyard(257)
    const target = { x: 95, y: 152 }
    for (let frame = 0; frame < 90; frame++) stepLanyard(state, 1 / 60, target)
    expect(state.points.at(-1)).toEqual(target)
    expectConstrained(state)
    expect(isLanyardSettled(state)).toBe(false)
    const straightMidpoint = { x: target.x / 2, y: target.y / 2 }
    expect(
      Math.hypot(state.points[2].x - straightMidpoint.x, state.points[2].y - straightMidpoint.y),
    ).toBeGreaterThan(20)
  })

  it('releases continuously, swings across its resting position, and settles', () => {
    const state = createLanyard(257)
    releaseAfterPull(state)
    const held = { ...state.points.at(-1) }
    stepLanyard(state, 1 / 60, null)
    expect(Math.hypot(state.points.at(-1).x - held.x, state.points.at(-1).y - held.y)).toBeLessThan(
      25,
    )
    let crossedRest = false
    let settledAt = null
    for (let frame = 0; frame < 420; frame++) {
      stepLanyard(state, 1 / 60, null)
      expectConstrained(state)
      if (state.points.at(-1).x < -5) crossedRest = true
      if (isLanyardSettled(state)) {
        settledAt = frame / 60
        break
      }
    }
    expect(crossedRest).toBe(true)
    expect(settledAt).not.toBeNull()
    expect(settledAt).toBeLessThan(7)
  })

  it('drops from a slack introduction pose without stretching the anchor', () => {
    const state = createLanyard(257, { x: 70, y: -110 })
    expect(state.points.at(-1).x).toBeCloseTo(70, 5)
    expect(state.points.at(-1).y).toBeCloseTo(147, 5)
    expectConstrained(state)
    const startY = state.points.at(-1).y
    for (let frame = 0; frame < 30; frame++) {
      stepLanyard(state, 1 / 60, null)
      expectConstrained(state)
    }
    expect(state.points.at(-1).y).toBeGreaterThan(startY + 30)
  })

  it('caps delayed frames and pointer momentum instead of catapulting after a suspension', () => {
    const state = createLanyard(257)
    stepLanyard(state, 1 / 60, { x: -190, y: 140 })
    stepLanyard(state, 1 / 60, { x: 190, y: 140 })
    for (const duration of [60, 10, 0.001, 1 / 24, 1 / 144, 1 / 60]) {
      stepLanyard(state, duration, null)
      expectConstrained(state)
      expect(Math.hypot(state.points.at(-1).x, state.points.at(-1).y)).toBeLessThan(258)
    }
  })

  it('resets exactly for reduced motion, resize, and keyboard reset', () => {
    const state = createLanyard(257, { x: 70, y: -110 })
    releaseAfterPull(state)
    resetLanyard(state)
    expect(isLanyardSettled(state)).toBe(true)
    expect(state.points).toEqual(state.previous)
    expect(state.points.at(-1)).toEqual({ x: 0, y: 257 })
    expect(state.angle).toBe(0)
    expect(state.angularVelocity).toBe(0)
  })

  it('rejects unusable lengths and ignores invalid elapsed time', () => {
    for (const length of [0, -1, Infinity, NaN])
      expect(() => createLanyard(length)).toThrow(RangeError)
    const state = createLanyard(257)
    const original = globalThis.structuredClone(state)
    for (const duration of [0, -1, Infinity, NaN]) stepLanyard(state, duration, null)
    expect(state).toEqual(original)
  })
})
