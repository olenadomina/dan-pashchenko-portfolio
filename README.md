# Dan Pashchenko — portfolio

A React and Vite portfolio for independent iOS engineer Dan Pashchenko. It includes an interactive 3D badge, selected app work, technical skills and a downloadable PDF resume. The main portfolio is at `/`; an alternative macOS-style edition is at `/macos/`.

## Run

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5178. Production build: `npm run build`; local production preview: `npm run preview`.

## Deployment

Vercel builds with `npm run build` and serves `dist/`. The build prerenders both editions, including all 52 skills, into HTML so the content is available before JavaScript. No environment variables or backend services are required to build and serve the site. The PDF in `public/documents/` is included directly; its optional Python generator is not part of the deployment build.

The main portfolio's contact form posts to Formspree. Its email-based endpoint is configured in `src/ContactForm.jsx`; Formspree setup and delivery must be verified separately before relying on submissions. The macOS edition also provides direct email and profile links.

Repository: `olenadomina/dan-pashchenko-portfolio`. Vercel project: `dan-pashchenko-portfolio`. The production branch is `main`.

Local environment files, deployment settings, assistant configuration, QA screenshots, audit reports and intermediate exports are excluded from Git and deployments. Reduced motion disables the decorative animations; the badge has a static fallback if WebGL is unavailable.

## Content sources

- https://ios-engineer.com/ — public name Dan, portrait, app icons, contact and 40+ iOS apps.
- https://www.toptal.com/developers/resume/bogdan-pashchenko — full name Bogdan, iOS contracting since 2012, KUNI contribution, Papaya releases and expertise.
- Apple App Store listings and public iTunes lookup — authentic project preview images. These are current promotional captures, not claims that every depicted feature was built by Dan.
- https://www.instagram.com/reel/Ddv2GaIMelU/ — user-provided visual reference.

The hero uses the latest supplied experience figures: 14 years in iOS, 12 years in Swift, 40+ iOS apps made and 20 years in IT. These are fixed content snapshots, not dynamically recalculated totals. The downloadable resume is an earlier snapshot. Athleats has no documented contribution scope, so its text describes the product only. Sources and dimensions for the included app screenshots are recorded in `docs/assets-sources.json`.

The badge uses React Bits under MIT + Commons Clause; see `licenses/react-bits-LICENSE.md`. The local Schibsted Grotesk font is OFL licensed; see `licenses/Schibsted-OFL.txt`.
