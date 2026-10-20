import { describe, expect, it } from 'vitest'
import { normalizeSiteUrl } from '../scripts/site-url.mjs'

describe('production site origin validation', () => {
  it('keeps an unknown deployment origin unset instead of publishing a fake domain', () => {
    expect(normalizeSiteUrl('')).toBeUndefined()
    expect(normalizeSiteUrl(undefined)).toBeUndefined()
  })
  it('normalizes a valid HTTPS origin for consistent canonical and sitemap URLs', () => {
    expect(normalizeSiteUrl(' https://PORTFOLIO.example/ ')).toBe('https://portfolio.example')
  })
  it.each([
    'javascript:alert(1)',
    'http://portfolio.example',
    'https://user:password@portfolio.example',
    'https://portfolio.example/project',
    'https://portfolio.example?token=secret',
    'https://portfolio.example/#contact',
    'not a url',
  ])('rejects an invalid or unsafe production origin: %s', (value) => {
    expect(() => normalizeSiteUrl(value)).toThrow()
  })
})
