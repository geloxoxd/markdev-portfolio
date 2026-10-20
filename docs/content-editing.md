# Editing Portfolio Content

## Personal information

Use `src/data/portfolio.ts` as the content source. Keep the same TypeScript structure when editing text, links, skills, experience, and project entries. Do not put personal content into multiple components when one shared data entry can supply it.

Confirmed public information:

- Mark Angelo Dela Cruz; third-year BSIT student.
- ICCT Colleges, Cainta Main Campus, Rizal.
- Email: `markangelod52@gmail.com`.
- GitHub: `https://github.com/geloxoxd`.
- Instagram: `https://www.instagram.com/gelorxch/`.
- TikTok: `https://www.tiktok.com/@mcfloaaaaaaat`.
- Facebook: `https://www.facebook.com/markangelo.delacruz.792303/`.
- IT Support, Concentrix: July 23, 2023 to August 19, 2024.
- Confirmed responsibilities: technical troubleshooting of hardware, software, network, and system-related issues.

The school address does not establish Mark's home location. Do not add a graduation date, job availability, client count, credential, or result without confirmation.

## Profile image and resume

The two approved photographs are independent:

- `public/images/mark-angelo-id.jpg` is the color photograph in the draggable hero ID, referenced by `profile.idPortraitUrl`.
- `public/images/mark-angelo.jpg` is the original photograph in the circular About portrait, referenced by `profile.portraitUrl`.

Replace only the intended asset, preserving its filename or updating the corresponding shared property. Keep the approved ID photograph in color. Check its crop inside the ID independently from the About portrait. Use an optimized image with enough resolution for the largest displayed size. Provide accurate alternative text rather than placing important biography text inside the image.

The approved public resume is generated separately from the original PDF. If editing the resume generator at `scripts/generate-resume.mjs`, keep its facts aligned with the shared content, run `npm run resume`, and inspect the generated `public/mark-angelo-dela-cruz-resume.pdf`. You may also replace that public file with a reviewed current resume. Verify that the download opens and contains approved public information. The original supplied resume is separate and must remain untouched.

## Adding a project

1. Add an entry using the existing project structure in `src/data/portfolio.ts`. Give it a unique, stable identifier using lowercase words separated by hyphens; this identifier is used in project routes.
2. Include the actual title, short description, category, technologies, development status, and factual case-study content.
3. Add approved screenshots under `public/images/` using descriptive filenames. Show a real screenshot only when one is available; a labeled editorial preview must not imply it is captured product UI.
4. Add the exact public repository and live-demo URLs when verified. Leave absent destinations absent rather than using `#`, an invented address, or an enabled button with no action.
5. Separate completed features from planned work. Include no percentages, revenue, performance results, or customer metrics unless supported.
6. Add the project path and accurate metadata to the routes in `scripts/generate-site-metadata.mjs`. This generates its route-specific HTML metadata and includes the path in the sitemap when `SITE_URL` is set.
7. Open the project route directly and through its card. Verify filters, images, external links, keyboard navigation, and narrow layouts.

ClosetIQ's public URL is `https://closet-iq.onrender.com`. Its repository is private; do not expose private repository information or imply a public source-code link. Source inspection identified React, Vite, TypeScript, CSS, Node.js, Express, PostgreSQL, Prisma, Cloudinary, and session-based authentication. CSS replaces the originally reported Tailwind claim for this specific project. Current source-backed features and the authenticated-workflow testing limit belong in the shared project data. Do not infer additional functionality from the stack or claim that source inspection verifies every production workflow.

The project preview paths are `public/images/closetiq-preview.png` and `public/images/portfolio-preview.png`. Replace previews only with approved actual captures or clearly labeled illustrations.

## Visual changes

Use `src/styles.css` for global visual tokens and styling. Preserve the approved monochrome identity, clear focus indicators, readable contrast, and mobile layouts. Animation should respect `prefers-reduced-motion`. Every visual control should retain a useful keyboard and touch interaction.

The suspended ID is implemented in `src/components/PortraitCard.tsx`, `src/hooks/useLanyard.ts`, and `src/lib/lanyard-physics.ts`. The two opposing marquee rows are in `src/components/DisciplineStrip.tsx`; preserve their white asterisks, compact sizing, pause control, and reduced-motion state. Repeatable scroll reveals use `src/components/Reveal.tsx` and `src/lib/reveal-observer.ts`. Navbar glass and footer behavior are maintained in `src/App.tsx` with scoped styles.

## Contact and social links

Edit `profile.publicEmail` and `socialLinks` in `src/data/portfolio.ts`. The footer builds a Gmail compose URL from that email; header and contact-section links use `mailto:`, and the contact section has a copy-email action. Check each destination after changing the address. Social links open the owner's supplied profiles in new tabs; keep their platform values aligned with `src/components/SocialIcon.tsx`.

## Updating public URLs and SEO

After choosing the portfolio's actual production origin, set `SITE_URL` in the hosting build environment, then rebuild. For a local PowerShell production build, use `$env:SITE_URL = 'https://your-confirmed-domain'` before `npm run build`, substituting the actual origin. Alternatively, place the setting in an ignored `.env.local` file using `.env.example` as the reference. Use an HTTPS origin with no path, query, or fragment. Audit the generated canonical URL, Open Graph URLs, robots information, and sitemap against that HTTPS origin. Do not publish the example hostname or a guessed `vercel.app` address as canonical.

## Validate and release

Run the declared lint, TypeScript, test, and production-build scripts. Use `npm run preview` to inspect the built site. Review the changed content and public resume before committing. The owner authorized the current GitHub push and production deployment on October 20, 2026; record the resulting commit and verified live URL in `docs/progress.md`. A local successful build does not constitute a verified deployment. Future updates should be checked, committed meaningfully, pushed to the configured production branch, and verified on the host after the deployment completes.
