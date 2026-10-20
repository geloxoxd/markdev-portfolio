import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.use({ reducedMotion: 'no-preference' })

test('Soft Aperture finishes in four seconds before the ID drop', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.addInitScript(() => {
    let started = false
    let finished = false
    const observer = new MutationObserver(() => {
      const intro = document.querySelector('.introduction')
      if (intro && !started) {
        started = true
        performance.mark('intro-start')
      }
      if (started && !intro && !finished) {
        finished = true
        performance.mark('intro-end')
        performance.measure('intro-duration', 'intro-start', 'intro-end')
      }
      if (intro && document.querySelector('.lanyard-rig[data-ready="true"]')) {
        performance.mark('intro-early-id')
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-ready'],
    })
  })
  await page.goto('/')
  const intro = page.getByRole('dialog', { name: 'Welcome to MarkDev' })
  await expect(intro).toBeVisible()
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'false')
  await expect(page.getByRole('button', { name: 'Skip introduction' })).toBeFocused()
  await page.waitForTimeout(1500)
  const stage = await page.locator('.intro-wordmark').boundingBox()
  expect(stage).not.toBeNull()
  expect(stage!.x).toBeGreaterThanOrEqual(0)
  expect(stage!.x + stage!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  await page.screenshot({ path: testInfo.outputPath('soft-aperture-hold.png') })
  await expect(intro).toHaveCount(0)
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'true')
  const timing = await page.evaluate(() => ({
    duration: performance.getEntriesByName('intro-duration')[0]?.duration,
    prematureDrop: performance.getEntriesByName('intro-early-id').length,
    session: sessionStorage.getItem('markdev-introduced'),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }))
  expect(timing.duration).toBeGreaterThanOrEqual(3700)
  expect(timing.duration).toBeLessThan(5000)
  expect(timing.prematureDrop).toBe(0)
  expect(timing.session).toBe('true')
  expect(timing.overflow).toBe(0)
  expect(errors).toEqual([])
})

test('intro skip, Escape, focus and session persistence remain usable', async ({ page }) => {
  await page.goto('/')
  const skip = page.getByRole('button', { name: 'Skip introduction' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(skip).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(skip).toBeFocused()
  await page.keyboard.press('Control+k')
  await expect(page.locator('.command-dialog')).not.toBeVisible()
  await page.keyboard.press('PageDown')
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  await page.keyboard.press('Enter')
  await expect(page.locator('.introduction')).toHaveCount(0)
  await expect(page.locator('#main-content')).toBeFocused()
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'true')
  await page.reload()
  await expect(page.locator('.introduction')).toHaveCount(0)
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'true')
  await page.evaluate(() => sessionStorage.removeItem('markdev-introduced'))
  await page.reload()
  await expect(skip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('.introduction')).toHaveCount(0)
  await expect(page.locator('#main-content')).toBeFocused()
})

test('reduced motion and unavailable session storage do not block entry', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.introduction')).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.introduction')).toHaveCount(0)
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'true')
  await page.evaluate(() => sessionStorage.removeItem('markdev-introduced'))
  await page.reload()
  await expect(page.locator('.introduction')).toHaveCount(0)
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'true')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      get() {
        throw new DOMException('Storage unavailable', 'SecurityError')
      },
    })
  })
  await page.reload()
  await expect(page.locator('.introduction')).toHaveCount(0)
  await expect(page.locator('h1')).toContainText(/Full[\s-]*stack/i)
  await expect(page.locator('.lanyard-rig')).toHaveAttribute('data-ready', 'true')
})

test('intro text meets WCAG AA at its readable hold state', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('dialog', { name: 'Welcome to MarkDev' })).toBeVisible()
  // Freeze the readable hold so a contrast scan cannot straddle a fading transition.
  await page.locator('.introduction').evaluate((intro) => {
    intro.getAnimations({ subtree: true }).forEach((animation) => {
      animation.pause()
      animation.currentTime = 1700
    })
  })
  await page.evaluate(() => document.fonts.ready)
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(accessibility.violations).toEqual([])
})
