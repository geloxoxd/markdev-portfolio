# Portfolio Progress Checklist

## Current state — October 20, 2026

The approved monochrome portfolio and subsequent requested interactions are implemented. The owner has explicitly authorized pushing to `geloxoxd/markdev-portfolio` and deploying the production website. Release preparation is underway. The dedicated remote was verified empty before the first release, and account access permits pushing to it.

Previously executed local checks include TypeScript, linting, production builds and asset smoke checks, 18 unit/integration tests, and 12 desktop/mobile browser tests. These prior results do not substitute for the final release checks or live verification. See `docs/qa-results.md` for scope and practical limits.

| Release item                                 | State                                           |
| -------------------------------------------- | ----------------------------------------------- |
| Repository                                   | `https://github.com/geloxoxd/markdev-portfolio` |
| Production branch                            | `main`                                          |
| Push and deployment authorization            | Granted by the owner on October 20, 2026        |
| Final release commit and remote verification | Pending release execution                       |
| Selected host and production origin          | Pending confirmed host setup                    |
| Final release checks                         | Pending current release run                     |
| Live HTTPS verification                      | Pending deployment                              |

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
- [ ] Commit the checked release with a meaningful message.
- [ ] Push `main` and verify the remote commit without rewriting history.

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
- [ ] Repeat final checks against the exact release source and record the actual results.
- [ ] Verify deployed routes, refresh handling, assets, resume, links, and production metadata over HTTPS.

## 6. Deployment and handoff

- [x] Compare hosting options and prepare Vercel/Netlify configuration.
- [x] Document environment settings, content editing, adding projects, and redeployment.
- [x] Receive authorization to proceed through GitHub push and production deployment.
- [ ] Confirm the release host and final origin, then configure `SITE_URL` for the production build.
- [ ] Complete deployment and record the verified live URL.
- [ ] Update release status, source commit, and final check results after verification.

The portfolio remains independent of ClosetIQ. No ClosetIQ files are part of this release. Its authenticated production workflows were not exercised; its case study distinguishes source-reviewed features from the publicly verified entry page. No custom domain is assumed.
