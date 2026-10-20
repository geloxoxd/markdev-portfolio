# MarkDev Portfolio Design Proposal

Status: approved by the owner on October 19, 2026. Implementation and quality verification are in progress.

## Identity and visual direction

Create an original monochrome portfolio for Mark Angelo Dela Cruz, a third-year BSIT student pursuing professional full-stack web development.

Proposed navigation wordmark: `mark.dev`. This is visual branding, not a claim that the domain is registered or owned.

Use near-black backgrounds, charcoal surfaces, white display typography, muted gray secondary text, thin borders, and subtle white illumination. Avoid blue/violet accents in the primary design, following the owner's selected monochrome direction.

Suggested design tokens:

| Role              | Proposed value |
| ----------------- | -------------- |
| Page background   | `#080808`      |
| Raised surface    | `#121212`      |
| Hover surface     | `#1A1A1A`      |
| Primary text      | `#F5F5F5`      |
| Secondary text    | `#B0B0B0`      |
| Muted text        | `#858585`      |
| Decorative border | `#2A2A2A`      |
| Focus indicator   | `#FFFFFF`      |

Validate text contrast and control boundaries in the implemented layouts; decorative border colors are not a substitute for accessible control contrast.

## Confirmed content

| Field                | Confirmed information                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| Public name          | Mark Angelo Dela Cruz                                                           |
| Current education    | Third-year Bachelor of Science in Information Technology student                |
| School               | ICCT Colleges - Cainta Main Campus, Rizal                                       |
| Career direction     | Professional web development, with a full-stack focus                           |
| Public email         | markangelod52@gmail.com                                                         |
| GitHub profile       | https://github.com/geloxoxd                                                     |
| Portfolio repository | https://github.com/geloxoxd/markdev-portfolio                                   |
| Work entry           | IT Support, Concentrix                                                          |
| Employment dates     | July 23, 2023 - August 19, 2024                                                 |
| Confirmed duties     | Diagnosing and resolving hardware, software, network, and system-related issues |
| Portrait             | Owner-supplied JPG, available locally                                           |
| Resume               | Owner-supplied PDF, available locally; contains unresolved placeholders         |

The resume reports the following skills. Present these without invented proficiency levels, percentages, years of experience, or credentials:

- Frontend: HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS, Vite.
- Backend: Node.js, Express, REST API development.
- Data: PostgreSQL, Prisma.
- Workflow: Git, GitHub, VS Code, npm, API testing.
- Currently exploring: AI integrations and developer automation. Keep this distinct from established skills.

The owner's location must not be inferred from the campus address. Expected graduation year, additional social profiles, certifications, and work achievements remain unspecified.

## Proposed copy

Hero headline: `Full-Stack Developer`.

Supporting label: `Third-Year BSIT Student`.

Short introduction:

> I'm Mark Angelo Dela Cruz, a third-year Information Technology student focused on full-stack web development. My goal is to become a professional web developer and build practical, well-designed applications that solve everyday problems.

About copy:

> I'm a third-year BSIT student at ICCT Colleges, Cainta Main Campus, working toward a career in professional web development. My interests include full-stack applications, AI integrations, and developer automation. My background also includes IT support at Concentrix, where I diagnosed and resolved hardware, software, network, and system issues.

Experience description:

> Diagnosed and resolved hardware, software, network, and system-related issues in an IT support role.

These are editorial drafts for owner review. Do not add customer counts, performance improvements, employment achievements, or availability claims without confirmation.

## Page composition

1. **Brief introduction.** A compact MarkDev identity reveal, targeted at roughly one second. Do not make it a fake network-loading screen. Avoid repeated blocking introductions within a session, provide a way to skip, and shorten it under reduced motion.
2. **Hero.** Large two-line developer headline, explicit student label, short introduction, and a suspended ID-style portrait card. Include View Projects, Contact, and a resume action once a factual public resume is approved. Use only confirmed GitHub/email destinations.
3. **About and journey.** A distinct portrait treatment, readable biography, and a restrained bento layout. Show current BSIT education and the dated IT support entry. Avoid invented metrics or achievement counters.
4. **Portfolio showcase.** Preserve the reference's showcase concept with real project details and a categorized technology grid. Add a Certificates tab only when real certificate assets/details exist. Do not publish empty decorative tabs.
5. **Project details.** A reusable case-study layout with overview, actual technologies, implemented features, screenshots, verified repository/demo links, and explicit development status. The portfolio itself can become the first case study after it is implemented. Additional demo projects require agreed scope and must be built before being described as completed.
6. **Contact.** Use a working email link and copy-email control, plus GitHub. Public comments are an optional extension requiring an explicit persistence/moderation decision. Do not render a nonfunctional submission form.
7. **Footer.** Compact branding, navigation, contact links, and a back-to-top action.

Project category filters should appear when there are enough real categories to make filtering useful. Missing project details remain in the internal content inventory rather than appearing as fabricated completed work.

## Motion and interaction

- Active navigation underline and visible section tracking.
- Short scroll-triggered reveals, with content visible if motion is disabled or fails.
- Subtle portrait-card movement on capable pointer devices. Use a compact static treatment on small screens and with reduced motion.
- Restrained button/card hover treatments. Magnetic movement is optional and must not move the clickable target away from the pointer or affect keyboard/touch use.
- Keyboard-accessible technology category controls and project detail navigation.
- A subtle section progress indicator if it remains clear and unobtrusive.
- A custom cursor and command palette are optional polish, not prerequisites for useful navigation.
- No scroll hijacking or motion required to read content.

## Responsive and accessibility requirements

- Desktop: two-column hero with portrait, generous margins, and flexible bento rows.
- Tablet: reduce heading scale and simplify card arrangements.
- Mobile: stacked content, compact portrait, accessible menu with focus management, no horizontal overflow, and comfortable tap targets.
- Support keyboard navigation, visible focus, semantic landmarks, skip navigation, descriptive alternative text, and reduced motion.
- Use optimized responsive images, lazy loading outside the first viewport, and no heavy 3D dependency unless it provides a demonstrated benefit.

## Proposed implementation stack

React, TypeScript, Vite, Tailwind CSS, Motion for React, and Lucide React. Use routing for actual project detail pages and a useful not-found state. Avoid GSAP and Three.js unless a specific approved interaction justifies them.

Use structured content data so the owner can update biography, skills, experience, links, and projects without editing presentation components. Keep contact usable without a paid backend.

Production work will include metadata, social previews, favicon/app icons, sitemap, route handling, deployment documentation, and executed quality checks. Hosting selection and publishing authorization remain separate future steps.

## Approved scope decisions

1. The owner approved the monochrome direction, wordmark, lanyard portrait, layout, and copy.
2. The first release uses functional email/GitHub contact. Public comments are outside this release's scope.
3. The owner approved a separate factual public resume using confirmed information, with unresolved placeholders omitted. The supplied original PDF is preserved.
4. The owner requested ClosetIQ as a featured project and supplied its deployed website and repository URLs. The source review and public sign-in capture are read-only.

ClosetIQ is featured at `https://closet-iq.onrender.com`. Its repository is private, so the public portfolio does not imply that visitors can browse its source. The inspected frontend uses ordinary CSS; the project case study uses the actual source-backed stack and describes the stylist as rule-based. See `docs/closetiq-review.md` for evidence and the boundary between reviewed code and tested production behavior. No ClosetIQ files were modified. No new standalone demo application is included.
