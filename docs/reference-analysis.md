# Portfolio Reference Analysis

## Source and method

The owner supplied `Screen Recording 2026-10-19 190224.mp4` as a visual reference. Its duration is approximately 59.93 seconds, at 1060 by 1078 pixels and 30 frames per second. The recording contains a desktop website demonstration inside TikTok's viewing interface.

Review used 27 extracted frames distributed from 0.2 seconds through 59 seconds, plus full-size inspection of selected frames. This is a visual frame review, not a live-site audit, source-code inspection, audio analysis, or continuous playback test. Approximate timestamps below identify sampled states.

The TikTok search bar, close button, large right-side down arrow, and bottom audio controls belong to the surrounding viewer. They are not portfolio design elements.

## Observed features and limits

| Area                              | Direct observation                                                                                                                                                            | Verification limit                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Layout and hierarchy              | Dark desktop layout with wide section spacing, large headings, two-column hero/about/contact areas, and rounded cards.                                                        | Mobile and tablet layouts are not shown.                                                                                 |
| Introduction, 0-2 seconds         | A black opening screen reveals welcome text, three circular code/person/globe icons, and a small site label.                                                                  | Exact easing, duration, replay behavior, and loading logic are unknown.                                                  |
| Hero, 4-8 seconds                 | Large two-line Frontend Developer heading, availability label, introduction, technology chips, scroll prompt, and a monochrome portrait in a suspended lanyard-style ID card. | Physics, drag interaction, and pointer-driven movement cannot be confirmed.                                              |
| Typography                        | Wide, heavy display headings paired with smaller body text and monospaced-looking navigation/labels.                                                                          | Font families and font licenses are not identified.                                                                      |
| Text animation                    | Opening text changes across early frames; a short secondary hero line appears in a partially revealed state.                                                                  | A typewriter effect is plausible, but its exact behavior is not verified by continuous playback.                         |
| Navigation                        | A rounded bar shows branding and Home, About, Portfolio, and Contact links. The active item is underlined. The bar remains visible over later scrolled content.               | Keyboard behavior, focus treatment, and mobile menu behavior are unknown.                                                |
| Scrolling and section transitions | The demonstration moves between hero, about, showcase, and contact states.                                                                                                    | Scroll smoothing, scroll interception, transition timing, and animation libraries are unknown.                           |
| About, 10-16 seconds              | Name, biography, circular monochrome portrait, quote panel, Download CV and View Projects buttons, and three summary cards.                                                   | Counters and biographical claims belong to the reference owner and must not be reused.                                   |
| Showcase, 18-20 and 28-38 seconds | Portfolio Showcase heading with Projects, Certificates, and Tech Stack tabs. Different tab content appears in later frames.                                                   | Internal state implementation and accessibility are unknown.                                                             |
| Project cards                     | A Project Portofolio card includes a preview, description, Details control, and a No Link label.                                                                              | Specific hover effects and unavailable-link behavior are not established.                                                |
| Project detail, 22-24 seconds     | A separate project URL shows Back navigation, description, screenshot, technologies, feature counts, and a Key Features panel.                                                | A displayed technology badge is not proof of the reference site's actual implementation.                                 |
| Certificates, 28-30 seconds       | A certificate thumbnail appears, followed by a large certificate preview with a close control.                                                                                | Certificate authenticity and credential scope are outside this review.                                                   |
| Technology display, 35 seconds    | Icon tiles visibly include React, TypeScript, Tailwind, HTML, CSS, PHP, Laravel, Next.js, JavaScript, and MySQL.                                                              | No proficiency level or ownership of these skills can be inferred for Mark. One additional cropped tile is unidentified. |
| Dashboard-like elements           | Small summary cards show projects, certificates, and completed works.                                                                                                         | There is no evidence of a private dashboard, analytics, or an administration system.                                     |
| Contact, 41-50 seconds            | Name, email, and message fields; Send Message control; and social cards for LinkedIn, Instagram, YouTube, GitHub, and TikTok.                                                 | Message delivery and actual social destinations were not tested.                                                         |
| Comments, 41-50 seconds           | Name/comment fields, an image-upload control, Post Comment button, existing entries, a pinned badge, and heart counts.                                                        | Persistence, uploads, authentication, moderation, posting, and reactions were not tested.                                |
| Background                        | A fine grid, soft grayscale illumination, and subtle panel shading. A pinned comment uses a small purple accent.                                                              | An animated background is not established from the sampled frames.                                                       |
| Hover and other interactions      | The demonstration visibly navigates to project details and changes showcase/certificate states.                                                                               | Magnetic buttons, custom cursor, command navigation, reduced-motion support, and touch behavior are not verified.        |
| Footer                            | Small copyright text appears beneath the contact area.                                                                                                                        | Legal ownership of reference assets is not assessed.                                                                     |

## Original adaptation

- Retain the high-level progression: short introduction, large developer hero, portrait, about, showcase, and contact.
- Create original MarkDev branding, typography choices, spacing, copy, card compositions, and assets.
- Use the owner's supplied portrait; apply grayscale presentation through CSS rather than borrowing reference imagery.
- Represent only the owner's confirmed skills, experience, and completed work. Do not copy reference counters, certificates, biography, or availability claims.
- Include a development journey for confirmed education and IT support experience.
- Define responsive behavior, keyboard support, and reduced-motion behavior explicitly during implementation because the recording cannot establish them.
- Public comments require a separate owner decision about scope and persistence. A form must not imply a successful submission without a working destination.

## Remaining reference questions

The reference source code, exact font, animation implementation, responsive layouts, contact backend, and comment service are unknown. Reproducing their visual intent does not require copying their implementation.
