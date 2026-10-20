# Deployment Guide

Prepared for a static React/Vite portfolio with client-side project routes. Email, Gmail compose, GitHub, and social links require no portfolio backend. The owner authorized pushing the dedicated repository and deploying the portfolio on October 20, 2026. Final host and live-verification details are maintained in `docs/progress.md`; a custom domain is optional.

Official documentation was checked on October 19, 2026. Hosting plans and limits can change; confirm account terms before enabling a plan or publishing.

## Hosting comparison

| Platform         | Fit for this portfolio                                                                                                                                | Limitation to consider                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vercel           | Straightforward Vite setup, GitHub integration, and pull-request preview URLs. The included SPA rewrite supports direct project links.                | Hobby is for personal, noncommercial use. Confirm that the actual use fits the current terms; review a suitable plan if the site becomes a commercial service.                 |
| Netlify          | Static Vite builds and a simple SPA fallback; included configuration can be used directly.                                                            | Newer accounts use credit-based plans. Free usage has a hard allowance; monitor traffic and deploy usage rather than relying on old build-minute descriptions.                 |
| Cloudflare Pages | Suitable for static React output with Git-based builds and previews. Native SPA behavior handles unmatched paths when no top-level `404.html` exists. | Domain/DNS configuration and account build limits need review. Avoid introducing a static root `404.html` that disables the intended SPA fallback.                             |
| GitHub Pages     | Can publish the static build from the dedicated GitHub repository through GitHub Actions.                                                             | Project-site base paths and browser-history deep links need additional setup. This repository is currently configured for a root-hosted SPA, so Pages is not a drop-in target. |

Sources: [Vercel Vite support](https://vercel.com/docs/frameworks/frontend/vite), [Vercel Hobby terms](https://vercel.com/docs/plans/hobby), [Netlify SPA support](https://docs.netlify.com/build/configure-builds/javascript-spas/), [Netlify credit plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/), [Cloudflare React setup](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/), [Cloudflare SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/), and [Vite's GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages).

Recommendation: use Vercel for this personal student portfolio if its Hobby eligibility matches the intended use. It provides a short setup path for the existing build and clean project routes. Cloudflare Pages is a practical alternative for this static site. Hosting comparisons describe available options; the selected release host must be recorded after account access and deployment are verified.

## Shared build settings

| Setting                  | Value                        |
| ------------------------ | ---------------------------- |
| Repository               | `geloxoxd/markdev-portfolio` |
| Production branch        | `main`                       |
| Root directory           | Repository root              |
| Framework                | Vite / React                 |
| Install command          | `npm ci`                     |
| Build command            | `npm run build`              |
| Publish/output directory | `dist`                       |

Use Node.js 22.12 or newer, compatible with the project's declared engine and lockfile. Do not deploy `node_modules`, source environment secrets, or the developer's absolute local file paths.

## Before first publication

1. Review personal content, the public resume, and project statuses.
2. Review the ClosetIQ case study and screenshot against its public URL, `https://closet-iq.onrender.com`. Its source repository is private. Keep the documented distinction between source-backed features and authenticated production workflows that have not been exercised.
3. Execute the project's TypeScript, lint, relevant tests, and production build. Inspect the built site through `npm run preview` on desktop and mobile widths.
4. Choose the host and final production origin. Set `SITE_URL` in the build environment so the final build can generate the SEO metadata, sitemap, and social preview URLs.
5. Inspect `git diff`, `git status`, and `git remote -v`. Keep secrets out of commits.
6. Push the reviewed release to the authorized repository and deploy using the selected host. The owner's October 20, 2026 authorization covers these steps. Record the actual commit, deployment result, and verified HTTPS address; configuration files alone do not establish a live release.

## Vercel

For the authorized release:

1. Sign in to Vercel with the correct GitHub account and import `geloxoxd/markdev-portfolio`.
2. Select the Vite framework preset and confirm the shared settings above. The repository's `vercel.json` declares the build, output directory, and SPA rewrite recommended by the official Vite guide.
3. Set `SITE_URL` to the intended HTTPS origin in the build environment. Do not add server secrets as `VITE_` variables.
4. Review the plan and project visibility, then deploy.
5. Verify the generated HTTPS address before reporting a live URL. Test a direct project-page load and browser refresh, alongside the profile image, CSS/JS assets, and resume download.

The SPA fallback serves application routes through `index.html`. Real built assets must continue to resolve to their files; verify that CSS, JavaScript, image, and PDF requests have the expected content types after deployment. See [Vercel's Vite SPA instructions](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas).

## Netlify

Import the same GitHub repository. `netlify.toml` selects `npm run build` and `dist`. Vite copies `public/_redirects` into the build; its `/* /index.html 200` rule provides the SPA fallback. Existing files take precedence because this rule is not forced.

Confirm account usage allowances, deploy, and repeat the production checks. Do not enable paid add-ons or substitute a form service without an agreed need. See [Netlify redirect processing](https://docs.netlify.com/manage/routing/redirects/overview/) and [SPA configuration](https://docs.netlify.com/build/configure-builds/javascript-spas/).

## Cloudflare Pages

Create a Pages project using the GitHub repository, `main`, `npm run build`, and `dist`. The portfolio's client-rendered not-found view should handle unknown application paths; do not add a top-level static `404.html` unless intentionally replacing Cloudflare's default SPA handling. Check the included `_redirects` behavior if choosing this platform and retest direct project links.

See [Cloudflare's React deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/).

## GitHub Pages

Additional adaptation is required before selecting this target:

- For a project site at `https://geloxoxd.github.io/markdev-portfolio/`, use Vite base `/markdev-portfolio/` and align the router basename and every public asset URL with it.
- Use hash-based routing, pre-rendered routes, or a deliberately tested fallback strategy for project-page refreshes. A Vercel or Netlify rewrite file does not configure GitHub Pages.
- If selecting Pages for the authorized release, add and test its build/deploy workflow and configure the repository's Pages source as GitHub Actions.

The example address describes GitHub's URL convention; it is not a verified live portfolio URL. See [Vite's Pages deployment instructions](https://vite.dev/guide/static-deploy.html#github-pages).

## Environment variables

There is no backend credential requirement for mailto and copy-email contact controls. Optional `SITE_URL` is a public build-time setting for the final portfolio origin. Locally, set `$env:SITE_URL = 'https://your-confirmed-domain'` in PowerShell before `npm run build`; replace the sample value with the actual origin. An ignored `.env.local` file is also supported; `.env.example` documents the setting. Use an HTTPS origin without a path, query, or fragment. On a host, add `SITE_URL` in the project's build environment settings. Without a confirmed origin, the build deliberately omits canonical URLs and a final-domain sitemap rather than inventing an address.

Frontend `VITE_` values are included in browser output and must never contain passwords, personal access tokens, or database URLs. Environment changes require a new build. See [Vite environment variables](https://vite.dev/guide/env-and-mode.html).

## Custom domain and HTTPS

After domain ownership is confirmed, add the domain in the chosen provider and follow its exact DNS instructions. Wait for domain verification and TLS issuance, select one canonical HTTPS hostname, update public URL configuration, and rebuild. Verify redirects and secure asset URLs at the final domain. No domain registration or DNS changes have been made by preparing these files.

## Updating and redeploying

Edit shared content or components, run local checks, review the diff, and make a meaningful commit. Once Git-based deployment is connected, an approved push to the configured production branch can trigger a production deployment; other branches can produce previews according to provider settings. Verify the resulting build and URL after every release. Use the provider's deployment history for an approved rollback rather than rewriting Git history.

## Deployment status

The owner authorized GitHub push and production deployment on October 20, 2026. Release preparation includes verifying the dedicated remote, checking the final source, configuring the actual production origin, and executing local checks. Record the resulting push and deployment in `docs/progress.md` only when their external state has been verified. A successful local build is not evidence that the portfolio is deployed.
