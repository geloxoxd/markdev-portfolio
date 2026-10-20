import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'

// Capture only the public entry page. Never sign in, register, or submit forms.
const sourceUrl = 'https://closet-iq.onrender.com'
const candidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  chromium.executablePath(),
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
]
const executablePath = candidates.find((candidate) => candidate && existsSync(candidate))
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
})

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  })
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  const response = await page.goto(sourceUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 })
  const status = response?.status()
  if (status && (status < 200 || status >= 400)) {
    throw new Error(`Public page returned HTTP ${status}; no portfolio screenshot was saved.`)
  }

  // The source-verified public entry contains an email field and a sign-in action.
  // Waiting for them prevents saving Render's cold-start screen as a project image.
  await page.locator('input[type="email"]').waitFor({ state: 'visible', timeout: 25_000 })
  await page
    .getByRole('button', { name: 'Sign in', exact: true })
    .waitFor({ state: 'visible', timeout: 5_000 })
  await page.evaluate('document.fonts.ready')

  const bodyText = await page.locator('body').innerText()
  if (
    !/ClosetIQ/i.test(bodyText) ||
    /verify you are human|authentication required|access denied/i.test(bodyText)
  ) {
    throw new Error(
      'The public app was not confirmed, or an access barrier appeared; no screenshot was saved.',
    )
  }
  if (new URL(page.url()).origin !== new URL(sourceUrl).origin) {
    throw new Error('The public page redirected to a different origin; no screenshot was saved.')
  }

  const destination = path.resolve('public/images/closetiq-preview.png')
  mkdirSync(path.dirname(destination), { recursive: true })
  await page.screenshot({ path: destination, fullPage: false, animations: 'disabled' })

  console.log(
    JSON.stringify(
      {
        sourceUrl,
        finalUrl: page.url(),
        status,
        title: await page.title(),
        screenshot: destination,
        visibleText: bodyText.slice(0, 1800),
        links: await page.getByRole('link').evaluateAll((links) =>
          links.map((link) => ({
            text: link.textContent?.trim(),
            href: link.getAttribute('href'),
          })),
        ),
        pageErrors,
        protectedWorkflowsTested: false,
      },
      null,
      2,
    ),
  )
} finally {
  await browser.close()
}
