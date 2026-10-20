import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }))
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1)
}

test('home renders without browser errors, broken media, or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = []
  const failedAssets: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:4173/') && response.status() >= 400) {
      failedAssets.push(`${response.status()} ${response.url()}`)
    }
  })

  await page.goto('/')
  await expect(page.locator('h1')).toContainText(/Full[\s-]*stack/i)
  await expect(page.getByText('Mark Angelo Dela Cruz', { exact: true }).first()).toBeVisible()
  await page.evaluate(async () => {
    await document.fonts.ready
    const images = Array.from(document.images)
    await Promise.all(
      images.map(async (image) => {
        image.loading = 'eager'
        try {
          await image.decode()
        } catch {
          /* Report failed image dimensions below. */
        }
      }),
    )
  })

  expect(
    await page.locator('img').evaluateAll((elements) => {
      const images = elements as HTMLImageElement[]
      return images
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.src)
    }),
  ).toEqual([])
  expect(errors).toEqual([])
  expect(failedAssets).toEqual([])
  await expectNoHorizontalOverflow(page)

  const linksWithoutDestinations = await page
    .locator('a')
    .evaluateAll((links) =>
      links
        .filter(
          (link) =>
            !link.getAttribute('href') ||
            (link.getAttribute('href') === '#' &&
              link.getAttribute('aria-label') !== 'Back to top'),
        )
        .map((link) => link.textContent),
    )
  expect(linksWithoutDestinations).toEqual([])
  await expect(page.getByRole('link', { name: /GitHub/i }).first()).toHaveAttribute(
    'href',
    'https://github.com/geloxoxd',
  )
})

test('project filters, skill categories, and direct case-study routes work', async ({ page }) => {
  await page.goto('/#portfolio')
  const closet = page.getByRole('link', { name: /^View ClosetIQ case study/ })
  const portfolio = page.getByRole('link', { name: /^View MarkDev Portfolio case study/ })
  await expect(closet).toBeVisible()
  await expect(portfolio).toBeVisible()

  const fullStack = page.getByRole('button', { name: 'Full stack', exact: true })
  await fullStack.click()
  await expect(fullStack).toHaveAttribute('aria-pressed', 'true')
  await expect(closet).toBeVisible()
  await expect(portfolio).toBeHidden()

  await page.getByRole('button', { name: 'Frontend', exact: true }).click()
  await expect(portfolio).toBeVisible()
  await expect(closet).toBeHidden()

  await page.getByRole('button', { name: 'All', exact: true }).click()
  await page.getByRole('tab', { name: /^Tech stack/ }).click()
  await page.getByRole('button', { name: 'Backend', exact: true }).click()
  await expect(page.getByText('Node.js', { exact: true }).last()).toBeVisible()
  await expect(page.getByText('Express', { exact: true }).last()).toBeVisible()

  await page.getByRole('tab', { name: /^Projects/ }).click()
  await closet.click()
  await expect(page).toHaveURL(/\/projects\/closetiq$/)
  await expect(page.locator('h1')).toContainText('ClosetIQ')
  await expect(page.getByRole('link', { name: /View live project/i })).toHaveAttribute(
    'href',
    'https://closet-iq.onrender.com',
  )
  await page.reload()
  await expect(page.locator('h1')).toContainText('ClosetIQ')
  await expectNoHorizontalOverflow(page)

  await page.goto('/projects/markdev-portfolio')
  await expect(page.locator('h1')).toContainText('MarkDev Portfolio')
  await expect(page.getByRole('link', { name: /View repository/i })).toHaveAttribute(
    'href',
    'https://github.com/geloxoxd/markdev-portfolio',
  )
  await expectNoHorizontalOverflow(page)
})

test('contact, public PDF, keyboard entry, and reduced motion are usable', async ({
  page,
  context,
  request,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /Skip to (main )?content/i })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)

  await page.goto('/#contact')
  await expect(
    page.locator('#contact a[href^="mailto:markangelod52@gmail.com"]').first(),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Copy email', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Email copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('markangelod52@gmail.com')

  const resume = page.getByRole('link', { name: 'Download resume', exact: true }).first()
  await expect(resume).toHaveAttribute('href', '/mark-angelo-dela-cruz-resume.pdf')
  const response = await request.get('/mark-angelo-dela-cruz-resume.pdf')
  expect(response.ok()).toBeTruthy()
  expect(response.headers()['content-type']).toContain('application/pdf')
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  expect(
    await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches),
  ).toBeTruthy()
  await expectNoHorizontalOverflow(page)
  await page.getByRole('link', { name: 'Back to top', exact: true }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1)
})

test('navigation supports mobile dismissal and real section destinations', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  const header = page.locator('header').first()

  if (testInfo.project.name === 'mobile') {
    const opener = page.getByRole('button', { name: 'Open navigation', exact: true })
    await opener.click()
    await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(opener).toBeFocused()
    await expect(opener).toHaveAttribute('aria-expanded', 'false')
    await opener.click()
  }

  await header.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/#about$/)
  await expect(page.locator('#about')).toBeInViewport()
  await expectNoHorizontalOverflow(page)
})

test('unknown routes offer a working way home', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(page.locator('h1')).toContainText('This page took a different route')
  await expectNoHorizontalOverflow(page)
  await page.getByRole('link', { name: 'Back to home', exact: true }).click()
  await expect(page).toHaveURL('http://127.0.0.1:4173/')
  await expect(page.locator('h1')).toContainText(/Full[\s-]*stack/i)

  await page.goto('/projects/unknown-project')
  await expect(page.locator('h1')).toContainText('This page took a different route')
})

test('home and project details have no automated WCAG AA violations', async ({ page }) => {
  test.setTimeout(60_000)
  async function check(label: string) {
    await page.evaluate(async () => {
      await document.fonts.ready
    })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const violations = results.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    }))
    expect(violations, `Accessibility violations at ${label}`).toEqual([])
  }
  await page.goto('/')
  for (const section of ['home', 'about', 'portfolio', 'journey', 'contact']) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded()
    await check(`#${section}`)
  }
  await page.getByRole('tab', { name: /^Tech stack/ }).click()
  await check('technology showcase')
  for (const path of ['/projects/closetiq', '/projects/markdev-portfolio', '/missing-page']) {
    await page.goto(path)
    await check(path)
  }
})
