# MarkDev Portfolio

An original monochrome developer portfolio for Mark Angelo Dela Cruz, a third-year BSIT student at ICCT Colleges, Cainta Main Campus. Built with React, TypeScript, Vite, Tailwind CSS, Motion for React, and Lucide icons.

The portfolio is independent of ClosetIQ. It does not modify, run, or require the ClosetIQ codebase.

Live portfolio: [markdev-portfolio-iota.vercel.app](https://markdev-portfolio-iota.vercel.app). The production site and its public routes, media, responsive layouts, and SEO files have been verified over HTTPS.

The approved interface includes a draggable suspended ID with a post-intro drop and settling motion, a frosted-glass navbar hover, repeatable scroll reveals, a circular About portrait, and two opposing text marquees with white asterisks. Motion respects reduced-motion preferences. The footer includes Gmail composition and the owner's Instagram, TikTok, and Facebook profiles with hover and keyboard-focus feedback.

## Local development

The existing local workspace is named `markdev portflio` (the folder spelling is intentional here). Open a terminal in this directory with Node.js 24.x, matching the project engine and production runtime.

```powershell
npm ci
npm run dev
```

Create and inspect a production build:

```powershell
npm run build
npm run preview
```

The optimized site is written to `dist/`. The preview server is for local verification; deploy `dist/` through a static hosting provider for production.

## Content and assets

| Location                                  | Purpose                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| `src/data/portfolio.ts`                   | Personal information, skills, experience, social links, and project content |
| `src/styles.css`                          | Global styles, visual tokens, layout, and responsive styling                |
| `public/images/mark-angelo-id.jpg`        | Approved color photograph in the draggable hero ID                          |
| `public/images/mark-angelo.jpg`           | Original photograph in the circular About portrait                          |
| `public/images/closetiq-preview.png`      | ClosetIQ public application screenshot                                      |
| `public/images/portfolio-preview.png`     | Portfolio screenshot                                                        |
| `public/mark-angelo-dela-cruz-resume.pdf` | Clean public resume prepared from confirmed details                         |
| `docs/design-proposal.md`                 | Approved visual direction and content decisions                             |
| `docs/reference-analysis.md`              | Observed reference features and verification limits                         |
| `docs/progress.md`                        | Delivery checklist and current project state                                |

See [content editing](docs/content-editing.md) for routine updates and adding projects. All content is in English; owner-facing project discussion can remain in Taglish.

Fonts are served locally. Their Open Font License notices are included in `public/licenses/`. Use `npm run format` to format source files and `npm run format:check` to check formatting.

## Contact

The contact options use the approved public email, `markangelod52@gmail.com`, and [GitHub profile](https://github.com/geloxoxd). The footer's Email link opens Gmail compose in a new tab with the recipient filled in; visitors may need to sign in to Google. Header and contact-section email links use the visitor's configured mail application, and the contact section also supports copying the address. No message is sent automatically.

Approved social profiles are [Instagram](https://www.instagram.com/gelorxch/), [TikTok](https://www.tiktok.com/@mcfloaaaaaaat), and [Facebook](https://www.facebook.com/markangelo.delacruz.792303/). Their shared content is maintained in `src/data/portfolio.ts`. No contact database, paid backend, or public comments service is required.

## Verification

```powershell
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

The end-to-end suite uses desktop and mobile viewports. It selects bundled Chromium or an installed Windows Chrome/Edge browser; `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can override the executable. If none is available, install Playwright Chromium before running the suite. Current execution results belong in `docs/progress.md`; this README does not treat planned checks as passing.

At minimum, verify TypeScript, linting, the production build, real navigation destinations, project detail routes, desktop and mobile layouts, keyboard access, reduced motion, and public media. After deployment, repeat route and asset checks at the actual HTTPS address.

## GitHub and deployment

The public source repository is [geloxoxd/markdev-portfolio](https://github.com/geloxoxd/markdev-portfolio), with `main` as the production branch. The owner authorized push and production deployment on October 20, 2026. The functional release, commit `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0`, was pushed to `main` and deployed automatically by the connected Vercel GitHub integration. Vercel reported the production deployment ready, and unauthenticated public checks passed at [markdev-portfolio-iota.vercel.app](https://markdev-portfolio-iota.vercel.app).

The Vercel GitHub App is authorized for this portfolio repository. Automatic deployment from a push to `main` has been verified. Future updates should be checked, committed, and pushed to `main`; confirm Vercel reports the matching commit ready and verify the public website. See [the progress record](docs/progress.md).

Vercel and Netlify build/routing configurations are included. [Deployment instructions](docs/deployment.md) compare Vercel, Netlify, Cloudflare Pages, and GitHub Pages and explain the remaining setup.

No custom domain is configured. ClosetIQ's public project address is [closet-iq.onrender.com](https://closet-iq.onrender.com); its source repository is private, so no public repository button is implied. Its audited frontend uses CSS, rather than the Tailwind stack initially reported. Project source review does not establish that all authenticated production workflows have been tested.

## Environment variables

No secret or backend credentials are required for the contact options. `SITE_URL=https://markdev-portfolio-iota.vercel.app` is configured for Vercel Production and Preview builds to generate SEO URLs using the public production origin. For local release builds, set the same value in the shell or an ignored `.env.local` file. See `.env.example` and [deployment instructions](docs/deployment.md). Environment files and local deployment metadata are excluded by `.gitignore`; `.vercelignore` also excludes local-only files from CLI uploads. Any variable whose name starts with `VITE_` is public browser configuration, not a place to store secrets. See [Vite environment documentation](https://vite.dev/guide/env-and-mode.html).

## Content accuracy

Do not add unverified project results, employment achievements, proficiency percentages, certificates, or deployment claims. Keep completed work, owner-reported details, and future plans distinguishable. Preserve the original supplied resume and use only the cleaned public copy on the website.
