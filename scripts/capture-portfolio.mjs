/* global document, window */
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium, expect } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173'
const candidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  chromium.executablePath(),
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
]
const executablePath = candidates.find((candidate) => candidate && existsSync(candidate))
await mkdir('tmp/qa', { recursive: true })
await mkdir('public/images', { recursive: true })
const browser = await chromium.launch({ executablePath, headless: true })
const findings = { executablePath, captures: [], checks: [], runtimeErrors: [], overflow: [] }

function observe(page, viewport) {
  page.on('pageerror', (error) => findings.runtimeErrors.push({ viewport, message: error.message }))
  page.on('console', (message) => {
    if (message.type() === 'error')
      findings.runtimeErrors.push({ viewport, message: message.text() })
  })
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(baseURL)) {
      findings.runtimeErrors.push({ viewport, message: `${response.status()} ${response.url()}` })
    }
  })
}

async function capture(name, viewport, mobile = false) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: 'reduce',
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  observe(page, name)
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { name: 'Full-stack Developer.' })).toBeVisible()
  await expect(page.locator('.introduction')).toHaveCount(0)
  findings.checks.push(`${name}: reduced-motion intro omitted`)
  const heroPath = `tmp/qa/${name}-hero.png`
  await page.screenshot({ path: heroPath })
  findings.captures.push(heroPath)
  if (name === 'desktop') {
    await page.screenshot({ path: 'public/images/portfolio-preview.png' })
    findings.captures.push('public/images/portfolio-preview.png')
    await page.keyboard.press('Control+k')
    await expect(page.getByRole('dialog')).toBeVisible()
    const searchFocused = await page
      .getByRole('textbox', { name: 'Search navigation' })
      .evaluate((element) => element === document.activeElement)
    findings.checks.push(`desktop: command search initially focused = ${searchFocused}`)
    await page.getByRole('textbox', { name: 'Search navigation' }).focus()
    await page.getByRole('textbox', { name: 'Search navigation' }).fill('contact')
    await expect(page.getByRole('dialog').getByRole('link')).toHaveCount(1)
    await expect(page.getByRole('dialog').getByRole('link')).toContainText('Contact')
    await page.screenshot({ path: 'tmp/qa/desktop-command-palette.png' })
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await page.keyboard.press('Control+k')
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Control+k')
    await expect(page.getByRole('dialog')).not.toBeVisible()
    findings.checks.push(
      'desktop: command palette shortcut, filtered results, Escape and shortcut-close passed',
    )
  }
  if (name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
    await page.screenshot({ path: 'tmp/qa/mobile-menu.png' })
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('button', { name: 'Open navigation', exact: true }),
    ).toHaveAttribute('aria-expanded', 'false')
    findings.checks.push('mobile: menu opens and Escape closes')
  }
  const dimensions = await page.evaluate(() => ({
    width: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    visualWidth: window.visualViewport?.width,
    documentWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    overflowElements: [...document.querySelectorAll('main *')]
      .filter((element) => {
        const box = element.getBoundingClientRect()
        return box.width > 0 && box.right > document.documentElement.clientWidth + 1
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName,
        className: element.className,
        right: element.getBoundingClientRect().right,
      })),
  }))
  findings.overflow.push({ name, ...dimensions })
  for (let position = 0; position < dimensions.height; position += viewport.height * 0.75) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), position)
    await page.waitForTimeout(100)
  }
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((image) => image.decode().catch(() => {})))
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(150)
  const fullPath = `tmp/qa/${name}-fullpage.png`
  await page.screenshot({ path: fullPath, fullPage: true })
  findings.captures.push(fullPath)
  await context.close()
}

try {
  await capture('desktop', { width: 1440, height: 1000 })
  await capture('mobile', { width: 390, height: 844 }, true)
  await capture('tablet', { width: 768, height: 1024 }, true)

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  })
  const page = await context.newPage()
  observe(page, 'normal-motion')
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('button', { name: 'Skip introduction' })).toBeVisible()
  await page.screenshot({ path: 'tmp/qa/desktop-introduction.png' })
  await page.getByRole('button', { name: 'Skip introduction' }).click()
  await expect(page.locator('.introduction')).toHaveCount(0)
  expect(await page.evaluate(() => sessionStorage.getItem('markdev-introduced'))).toBe('true')
  await page.reload({ waitUntil: 'domcontentloaded' })
  await expect(page.locator('.introduction')).toHaveCount(0)
  findings.checks.push(
    'normal motion: intro appears, skip dismisses, session flag set, reload skips intro',
  )

  const automatic = await context.newPage()
  await automatic.goto(baseURL, { waitUntil: 'domcontentloaded' })
  await expect(automatic.locator('.introduction')).toHaveCount(0, { timeout: 4000 })
  expect(await automatic.evaluate(() => sessionStorage.getItem('markdev-introduced'))).toBe('true')
  findings.checks.push('normal motion: introduction automatically completes in a fresh tab')
  await context.close()
} finally {
  await browser.close()
  await writeFile('tmp/qa/visual-qa-report.json', JSON.stringify(findings, null, 2))
  console.log(JSON.stringify(findings, null, 2))
}
