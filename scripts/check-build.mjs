import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'

const dist = resolve('dist')
function requireAsset(url) {
  const path = resolve(dist, `.${url}`)
  assert.ok(path.startsWith(`${dist}${sep}`), `Asset outside build directory: ${url}`)
  assert.ok(existsSync(path), `Missing built asset: ${url}`)
}

const pages = [
  ['index.html', 'Mark Angelo Dela Cruz'],
  ['projects/closetiq/index.html', 'ClosetIQ'],
  ['projects/markdev-portfolio/index.html', 'MarkDev Portfolio'],
]
for (const [path, title] of pages) {
  const html = readFileSync(resolve(dist, path), 'utf8')
  assert.ok(html.includes(`<title>${title}`), `Incorrect page metadata: ${path}`)
  assert.ok(!html.includes('/src/main.tsx'), 'Production HTML references development source.')
  for (const match of html.matchAll(/<(?:script|link)[^>]*(?:src|href)="([^"]+)"[^>]*>/g)) {
    if (match[1].startsWith('/')) requireAsset(match[1])
  }
}
for (const asset of [
  '/images/mark-angelo.jpg',
  '/images/closetiq-preview.png',
  '/images/portfolio-preview.png',
  '/social-preview.png',
  '/mark-angelo-dela-cruz-resume.pdf',
  '/robots.txt',
  '/_redirects',
])
  requireAsset(asset)
const manifest = JSON.parse(readFileSync(resolve(dist, 'site.webmanifest'), 'utf8'))
for (const icon of manifest.icons) requireAsset(icon.src)
assert.equal(
  readFileSync(resolve(dist, 'mark-angelo-dela-cruz-resume.pdf')).subarray(0, 5).toString(),
  '%PDF-',
)
console.log(
  'Built HTML, project metadata, asset references, app icons, routing fallback, and resume smoke checks passed.',
)
