# ClosetIQ Portfolio Review

Reviewed on October 19, 2026, using read-only GitHub connector requests. No ClosetIQ files, history, deployment configuration, data, or account state were modified.

## Sources and access

- Owner-provided live URL: <https://closet-iq.onrender.com>.
- Owner-provided repository: <https://github.com/geloxoxd/closet-iq>.
- Repository default branch: `main`.
- Reviewed revision: `1c05a234fe70bf989e2629ed9e4e4d60d062ae19`.
- GitHub metadata reported the repository as **private**. It was readable through the connected owner account. Do not describe it as public source or render a source button that visitors are expected to access.
- The only README in the reviewed tree, `client/README.md`, is the original React/TypeScript/Vite template; it does not document ClosetIQ-specific features.
- The generic web fetch tool could not retrieve the live URL. A subsequent headless browser check successfully loaded the public application and saved a screenshot, as recorded below.
- No login, registration, protected workflow, data mutation, file upload, or private deployment authentication was attempted.

## Verified technology choices in the source

| Layer          | Evidence                                                                                                                    | Confirmed technology                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Client         | `client/package.json`, `client/vite.config.ts`, `client/src/App.tsx`                                                        | React, Vite, TypeScript                                                                                           |
| Presentation   | `client/src/App.css`, `client/src/index.css`                                                                                | Handwritten CSS, CSS variables, imported Google Fonts                                                             |
| API            | `server/package.json`, `server/src/index.ts`                                                                                | Node.js, Express, TypeScript, cookie-parser, CORS                                                                 |
| Persistence    | `server/prisma/schema.prisma`, server package dependencies                                                                  | PostgreSQL, Prisma, PostgreSQL adapter                                                                            |
| Authentication | `server/src/services/authService.ts`, `server/src/controllers/authController.ts`, `server/src/middleware/authMiddleware.ts` | Database-backed sessions, random session tokens, hashed token storage, HTTP-only cookies, bcrypt password hashing |
| Validation     | Controller imports, server package dependencies                                                                             | Zod                                                                                                               |
| Image handling | `server/src/controllers/uploadController.ts`, upload route/middleware                                                       | Cloudinary, Multer                                                                                                |

The initial owner-provided stack mentioned Tailwind CSS. The reviewed client package and Vite configuration do not include Tailwind, and the inspected stylesheet uses ordinary CSS. The ClosetIQ case study therefore lists CSS rather than Tailwind. This does not change the portfolio application's approved Tailwind stack or the owner's resume-reported Tailwind skill.

## Implemented in the inspected source

These are source-verified capabilities, **not claims that all protected behavior has passed a live end-to-end test**.

| Capability                           | Source evidence                                                              | Implemented scope                                                                                                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accounts and sessions                | Auth controller/service/middleware, auth routes, `Session` and `User` models | Registration, login, current user, logout, expiring database sessions                                                                                                   |
| Clothing management                  | Clothing controller/routes, `ClothingItem` model, client API module          | List, create, update, and delete owned garments; category, colors, style, season, brand, notes, images, and favorites                                                   |
| Search and filters                   | `client/src/App.tsx` around lines 1111–1192 and 1402–1551                    | Client-side text search, category/condition/favorite filtering, sorting, and reset controls                                                                             |
| Clothing condition and wear tracking | Clothing controller/routes, `WearLog` model                                  | Clean/worn/laundry transitions; marking an item worn increments wear count and records a wear log                                                                       |
| Outfit management                    | Outfit controller/routes, `Outfit`/`OutfitItem` models, client API module    | List, view, create, edit, and delete outfits assembled from owned items; favorites and occasion metadata                                                                |
| Wardrobe analytics                   | Analytics controller/routes                                                  | Garment/condition/favorite totals, outfit totals, category counts, most-worn items, and wear log totals                                                                 |
| Image uploads                        | Upload controller/routes/middleware                                          | Authenticated clothing-image upload through Cloudinary with size-limiting image transformations                                                                         |
| Occasion recommendations             | Stylist controller/routes and frontend recommendation handlers               | Deterministic ranking of clean items using occasion/style keywords, favorites, and wear count; recommendations can be saved as outfits through the existing outfit flow |
| Production entry point               | `server/src/index.ts`                                                        | Express static serving for the built React client, SPA fallback, API routes, database health endpoint                                                                   |

## Recommendation feature wording

Use **“rule-based outfit suggestions”** or **“occasion-based stylist recommendations.”** The inspected implementation ranks existing wardrobe items with explicit rules. No LLM, machine-learning model, or external AI inference integration was found. Do not advertise the current feature as generative AI.

## Source routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`.
- `GET/POST /api/clothing`; `PATCH/DELETE /api/clothing/:id`; `POST /api/clothing/:id/worn`, `/laundry`, `/clean`.
- `GET/POST /api/outfits`; `GET/PATCH/DELETE /api/outfits/:id`.
- `GET /api/analytics`.
- `POST /api/stylist/recommend`.
- `POST /api/upload/clothing`.
- `GET /api/health`.

Clothing, outfit, analytics, stylist, and upload routes use authentication middleware. Frontend interaction is primarily component state in `App.tsx`; no separate React Router package was present in the inspected client dependencies.

## Deployment and verification boundaries

The owner confirms that ClosetIQ is publicly deployed at the supplied Render URL. The source also contains an optional deployment-access gate; its actual production setting was not inferred from source. A successful public landing page does not establish that all protected workflows work or that the deployed revision matches `main`.

Use the live project link in the portfolio. Keep the private GitHub URL here as an owner reference and omit a public source-code action while repository visibility remains private. Add a screenshot path only after an actual public screenshot has been captured and saved in the portfolio assets.

## Public browser observation and screenshot

The reproducible read-only helper is `scripts/capture-closetiq.mjs`. Run `node scripts/capture-closetiq.mjs` with an installed Playwright Chromium, Chrome, or Edge executable. It waits for the actual email field and sign-in action so that a Render startup screen is not saved. It does not sign in, create an account, or submit a form.

The executed browser check returned HTTP **200** and remained at <https://closet-iq.onrender.com/>. The page title was `client`. No uncaught page JavaScript errors were recorded during this public entry check.

The captured page visibly includes ClosetIQ branding, the headline “Dress smarter. Know your closet.”, a purple-accented dark two-column presentation, feature labels, and a “Welcome back” form with email/password fields and a sign-in action. A “Create one” control is also visible. The controls were not submitted or used to access protected content. No public anchor links were present on this captured state.

Screenshot: `public/images/closetiq-preview.png`, **1440 × 960 pixels**, visually inspected after capture. It shows the actual unauthenticated application entry rather than a mock dashboard. The portfolio references it through `/images/closetiq-preview.png`. Its presence verifies the public entry, not the implementation or operation of authenticated screens.

## Planned features

No owner-approved roadmap was supplied and the template README does not establish one. The portfolio's `plannedFeatures` list remains empty. Do not invent planned work, project results, deployment metrics, user counts, or performance claims.
