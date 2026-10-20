# Quality Verification

Release verified on October 20, 2026. The functional release, commit `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0`, was pushed to `main` and deployed automatically by the connected Vercel GitHub integration. Vercel reported the production deployment ready, and unauthenticated public checks passed at [markdev-portfolio-iota.vercel.app](https://markdev-portfolio-iota.vercel.app). Local checks and final public verification passed.

## Automated results

| Check                                                      | Recorded result                                                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| TypeScript project checking                                | Passed                                                                                             |
| ESLint                                                     | Passed                                                                                             |
| Prettier formatting                                        | Passed                                                                                             |
| Optimized production build and built-artifact smoke checks | Passed                                                                                             |
| Unit/integration tests                                     | 18 passed: 11 metadata/origin tests and 7 lanyard-physics tests                                    |
| Playwright browser suite                                   | 12 passed; desktop and mobile Chromium                                                             |
| Current local release checks                               | Passed; current browser run completed in 54.6 seconds                                              |
| Initial source push                                        | Verified `750b4cd558cedf08366615c4221e1bdde0229415` on local `main`, `origin/main`, and remote ref |
| Final-domain local production build                        | Passed with confirmed `SITE_URL`; canonical URLs, robots.txt, sitemap, and asset checks passed     |
| First production deployment                                | Vercel ready; public HTTPS homepage returned HTTP 200                                              |
| Final public-site checks                                   | Passed six public verification groups; errors: 0; failures: 0                                      |
| Automatic Git production deployment                        | Verified READY for functional source commit `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0`             |

The browser suite covers rendering, console/page errors, broken assets, horizontal overflow, project filters, skills categories, direct project routes and refresh, mailto destinations, clipboard copying, PDF signature/content type, skip navigation, menu Escape/focus behavior, 404 recovery, and automated WCAG A/AA scans. Accessibility scans include every home section, the technology panel, both case studies, and the not-found page. No accessibility rules are disabled.

The metadata tests validate HTTPS origin normalization and rejection of invalid/credential-bearing origins. Isolated fixture builds verify canonical and Open Graph URLs, project-specific HTML metadata, robots.txt, sitemap.xml, and omission of an invented production domain when `SITE_URL` is unset. Lanyard tests exercise the physics helper used by the draggable hero ID.

Built-artifact checks inspect production HTML for development-only references, project metadata, referenced styles/scripts/icons, profile and project images, routing fallback, manifest icons, and a valid PDF signature. Bundle sizes must be taken from the final release build; no Lighthouse score is claimed.

## Visual and interaction review

- Previous implementation reviews included desktop at 1440 by 1000, mobile at 390 by 844, and tablet at 768 by 1024.
- Verified the public release at 1440, 768, and 390px: images/fonts loaded and no horizontal overflow occurred.
- Inspected the hero, portrait, about, project cards, journey, contact, footer, mobile menu, and command dialog.
- Verified command-search initial focus, Ctrl+K, filtered results, Escape, and shortcut dismissal.
- Verified the normal-motion introduction, manual skip, automatic completion, and session-aware replay behavior.
- Verified reduced-motion omission of the intro and static portrait treatment.
- No console, uncaught page, or failed local asset errors were observed in the captured sessions.
- Reviewed the navbar glass reflection while preserving its default dimensions and navigation.
- Reviewed the colored ID photograph separately from the circular About portrait and animated ring.
- Checked repeatable scroll reveals in both scroll directions, focus preservation, and live reduced-motion changes.
- Checked opposing marquee rows, compact sizing, white asterisks, pause control, and reduced-motion treatment.
- Checked ID dragging with mouse and touch, release swing, strap movement, keyboard interaction, and the post-intro drop.
- Checked footer Gmail composition destination, approved social-profile destinations, hover uplift/zoom, and responsive wrapping.

The capture helper `node scripts/capture-portfolio.mjs` runs against a development server at port 4173. It writes local screenshots and JSON under `tmp/qa/` and also updates the website's `public/images/portfolio-preview.png`; run it only when intentionally replacing that preview.

## Public production verification

Three additional public motion checks passed: desktop mouse dragging with strap bending and release settling; opposing marquee movement, white asterisks, pause, and live reduced motion; and mobile touch dragging with release settling and no horizontal overflow. No page errors were observed.

Public checks passed for the home page, both project routes and direct refreshes, not-found recovery, desktop/tablet/mobile layouts at 1440/768/390px, images and fonts, the public PDF, approved footer destinations, route-specific canonical/Open Graph metadata, robots.txt, and sitemap.xml. No browser errors, missing assets, or horizontal overflow were observed at those widths.

Unknown SPA routes return the application's not-found page with HTTP 200 through the configured fallback. This is expected SPA routing behavior, not a claim of an HTTP 404 status. Public verification used fresh Chromium sessions without Vercel authentication. Social destinations were inspected without signing in or sending messages.

## Resume

The clean public PDF was generated, reopened, structurally checked as one US Letter page, rendered, and visually inspected. Three clickable links were verified: email, GitHub profile, and ClosetIQ. The original supplied PDF was preserved. See `docs/resume-notes.md`. The public release check confirmed HTTP 200, the application/pdf content type, a valid PDF signature, and successful parsing as a one-page PDF.

## ClosetIQ evidence

The deployed public sign-in page returned HTTP 200 and was captured without logging in or submitting any forms. Relevant source was reviewed read-only through the owner's GitHub connection; the repository is private. Source-reviewed functionality is documented in `docs/closetiq-review.md`. No ClosetIQ files were modified.

## Practical limits and release steps

The October 20 source review found no real secret in the publishable source/configuration set. `.gitignore` excludes environment secrets, dependencies, builds, local backups, and provider metadata while allowing sanitized `.env.example`. The largest website images are approximately 410 KB and 409 KB. Approved public assets include photographs, project screenshots, fonts and license notices, icons, the social preview, and the cleaned resume.

- Authenticated ClosetIQ workflows were not tested in production.
- General email links use the visitor's configured mail application. The footer Email link opens Gmail compose and may require Google sign-in. No email was sent during testing.
- Automated accessibility checks and keyboard review do not constitute a complete assistive-technology audit. No manual screen-reader session was performed.
- No real-device Safari/Firefox test has been performed; current browser checks use installed desktop Chromium with responsive emulation.
- `SITE_URL=https://markdev-portfolio-iota.vercel.app` is configured for Vercel Production and Preview. A local production build generated and checked the final canonical URLs, absolute social URLs, robots.txt, and sitemap.xml. The remote project uses Vite, Node.js 24.x, `npm ci`, `npm run build`, and `dist` output.
- The owner authorized GitHub push and production deployment on October 20, 2026. The functional release, commit `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0`, was pushed to `main` and deployed automatically by the connected Vercel GitHub integration. Vercel reported the production deployment ready, and unauthenticated public checks passed at [markdev-portfolio-iota.vercel.app](https://markdev-portfolio-iota.vercel.app).
