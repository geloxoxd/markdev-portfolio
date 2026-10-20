import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'
import process from 'node:process'
import { describe, expect, it } from 'vitest'

const temporaryRoot = resolve('tmp')
const generator = resolve('scripts/generate-site-metadata.mjs')
const template = readFileSync(resolve('index.html'), 'utf8').replace(
  '/src/main.tsx',
  '/assets/app.js',
)

function withGeneratedSite(origin, check) {
  mkdirSync(temporaryRoot, { recursive: true })
  const fixture = mkdtempSync(join(temporaryRoot, 'metadata-'))
  if (!fixture.startsWith(`${temporaryRoot}${sep}`))
    throw new Error('Unexpected metadata fixture path.')
  try {
    mkdirSync(join(fixture, 'dist'))
    writeFileSync(join(fixture, 'dist/index.html'), template)
    execFileSync(process.execPath, [generator], {
      cwd: fixture,
      env: { ...process.env, SITE_URL: origin },
      timeout: 10_000,
    })
    check(join(fixture, 'dist'))
  } finally {
    rmSync(fixture, { recursive: true, force: true })
  }
}

describe('production metadata output', () => {
  it('creates absolute route metadata and a valid sitemap for a confirmed site origin', () => {
    withGeneratedSite('https://markdev.example', (dist) => {
      const project = readFileSync(join(dist, 'projects/closetiq/index.html'), 'utf8')
      expect(project).toContain('<title>ClosetIQ — Mark Angelo Dela Cruz</title>')
      expect(project).toContain('rel="canonical" href="https://markdev.example/projects/closetiq"')
      expect(project).toContain('content="https://markdev.example/social-preview.png"')
      expect(project).toContain(
        'name="description" content="ClosetIQ: a full-stack clothing management application',
      )
      expect(project).toContain(
        'property="og:description" content="ClosetIQ: a full-stack clothing management application',
      )
      expect(project).toContain('src="/assets/app.js"')
      expect(readFileSync(join(dist, 'sitemap.xml'), 'utf8')).toContain(
        '<loc>https://markdev.example/projects/markdev-portfolio</loc>',
      )
      expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).toContain(
        'Sitemap: https://markdev.example/sitemap.xml',
      )
    })
  })
  it('does not publish an invented production origin when deployment is pending', () => {
    withGeneratedSite('', (dist) => {
      const home = readFileSync(join(dist, 'index.html'), 'utf8')
      expect(home).not.toContain('rel="canonical"')
      expect(existsSync(join(dist, 'sitemap.xml'))).toBe(false)
      expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).not.toContain('Sitemap:')
      expect(existsSync(join(dist, 'projects/closetiq/index.html'))).toBe(true)
    })
  })
})
