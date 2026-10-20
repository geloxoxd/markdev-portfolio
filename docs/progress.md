# Portfolio Progress Checklist

## Current state — October 20, 2026

The approved monochrome portfolio and requested interactions are implemented and published. The functional release, commit `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0`, was pushed to `main` and deployed automatically by the connected Vercel GitHub integration. Vercel reported the production deployment ready, and unauthenticated public checks passed at [markdev-portfolio-iota.vercel.app](https://markdev-portfolio-iota.vercel.app).

Local release checks passed: TypeScript, linting, formatting, production build and asset checks, 18 unit/integration tests, and 12 desktop/mobile browser tests. The final-domain production build and six public verification groups also passed. See `docs/qa-results.md` for evidence scope and practical limits.

| Release item                                   | State                                                                                                                                          |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                                     | `https://github.com/geloxoxd/markdev-portfolio`                                                                                                |
| Production branch                              | `main`                                                                                                                                         |
| Push and deployment authorization              | Granted by the owner on October 20, 2026                                                                                                       |
| Initial source release and remote verification | `750b4cd558cedf08366615c4221e1bdde0229415`; functional release `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0` also matched local and remote `main` |
| Selected host and production origin            | Vercel, `geloxoxd` Hobby scope; `https://markdev-portfolio-iota.vercel.app`                                                                    |
| Current local release checks                   | TypeScript, lint, formatting, build, 18 unit/integration tests, and 12 browser tests passed                                                    |
| First production deployment                    | Ready; public homepage returned HTTP 200                                                                                                       |
| Production build settings                      | Vite; Node.js `24.x`; install `npm ci`; build `npm run build`; output `dist`                                                                   |
| SEO origin                                     | `SITE_URL=https://markdev-portfolio-iota.vercel.app` configured for Production and Preview; local release build checks passed                  |
| Final public-site verification                 | Passed all six public verification groups; zero reported browser/asset errors                                                                  |
| Automatic GitHub deployments                   | Verified production READY from Git commit `b9425c8579ac32ab1e7ce9876afbd61fe82cf6e0` on `main`                                                 |

## 1. Owner interview and content

- [x] Confirm public name, third-year BSIT status, and full-stack career direction.
- [x] Confirm ICCT Colleges, Cainta Main Campus, and approved biography.
- [x] Confirm public email, GitHub profile, and dedicated portfolio repository.
- [x] Obtain approved photographs and prepare a factual public resume separately from the original PDF.
- [x] Record confirmed technical skills without proficiency percentages.
- [x] Confirm IT Support role, employer, dates, and troubleshooting duties.
- [x] Add the owner's supplied Instagram, TikTok, and Facebook profiles.
- [x] Keep additional certificates and unsupported achievements omitted.

## 2. Reference review and design

- [x] Inspect supplied reference recordings and distinguish observed behavior from unverifiable details.
- [x] Obtain design approval before implementation.
- [x] Restore the original monochrome portfolio after the owner rejected the futuristic redesign.
- [x] Keep public comments outside the approved contact scope.
- [x] Apply later requested effects without redesigning unrelated sections.

## 3. Git and GitHub

- [x] Verify the actual workspace: `markdev portflio`.
- [x] Verify Git installation and initialize the dedicated portfolio repository on `main`.
- [x] Configure `origin` as `https://github.com/geloxoxd/markdev-portfolio.git`.
- [x] Recheck the remote before the first release and verify it has no existing commits.
- [x] Verify GitHub account access and push permission for the dedicated repository.
- [x] Exclude dependencies, generated builds, environment secrets, local backups, and provider metadata with `.gitignore`.
- [x] Receive explicit authorization for GitHub push and deployment on October 20, 2026.
- [x] Commit the checked initial source release with a meaningful message.
- [x] Push `main` and verify the remote commit without rewriting history.

## 4. Approved implementation

- [x] Build React, TypeScript, Vite, and Tailwind CSS foundation with reusable components and structured content.
- [x] Implement introduction, hero, About, project showcase, categorized technology display, journey, contact, footer, and project routes.
- [x] Add source-reviewed ClosetIQ and portfolio case studies with accurate links and evidence notes.
- [x] Add the colored hero ID photograph while preserving the separate About photograph.
- [x] Make the About portrait circular with a subtle animated ring.
- [x] Add navbar-only frosted glass and a cursor-following reflection.
- [x] Implement repeatable, bidirectional scroll reveals with focus and reduced-motion support.
- [x] Replace the discipline strip with two opposing text marquees, then reduce its size and change asterisks to white as requested.
- [x] Add draggable ID motion, a following strap, release swing, and post-introduction drop.
- [x] Open Gmail compose from the footer Email link while preserving general mailto and copy-email contact actions.
- [x] Add footer social icons and hover uplift/zoom with keyboard focus feedback.
- [x] Include metadata, social preview, app icons, conditional sitemap generation, and not-found handling.

## 5. Verification

- [x] Execute local TypeScript, linting, unit/integration tests, browser tests, and production builds during implementation.
- [x] Verify navigation, project routes, filters, skills categories, email destinations, clipboard copying, and resume download.
- [x] Review desktop, tablet, and mobile layouts and inspect console and asset errors.
- [x] Check keyboard interactions, focus management, reduced motion, and automated accessibility scans.
- [x] Verify ClosetIQ's public entry and document the private source and protected-workflow limits.
- [x] Repeat current local release checks and record the actual results.
- [x] Verify deployed routes, refresh handling, assets, resume, links, and production metadata over HTTPS.

## 6. Deployment and handoff

- [x] Compare hosting options and prepare Vercel/Netlify configuration.
- [x] Document environment settings, content editing, adding projects, and redeployment.
- [x] Receive authorization to proceed through GitHub push and production deployment.
- [x] Select Vercel and install its CLI for the production release.
- [x] Complete Vercel CLI account authentication.
- [x] Confirm the release host and final origin, then configure `SITE_URL` for Production and Preview builds.
- [x] Pin the Node.js 24.x runtime and verify Vite, lockfile install, build, and output settings.
- [x] Complete the first deployment and verify the public homepage returns HTTP 200.
- [x] Generate and check final-domain metadata, robots.txt, sitemap, and assets in the local production build.
- [x] Publish the final configured release and verify the full public website.
- [x] Authorize the Vercel GitHub App for this repository and establish the native Git connection.
- [x] Verify the first production deployment triggered automatically by a push to `main`.
- [x] Update release status, functional source commit, and final check results after verification.

The portfolio remains independent of ClosetIQ. No ClosetIQ files are part of this release. Its authenticated production workflows were not exercised; its case study distinguishes source-reviewed features from the publicly verified entry page. No custom domain is assumed.
