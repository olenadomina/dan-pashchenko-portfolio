# Dan Pashchenko — portfolio

A React and Vite portfolio for independent iOS engineer Dan Pashchenko. It includes an interactive 3D badge, selected app work, technical skills and a downloadable PDF resume.

## Run

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5178. Production build: `npm run build`; local production preview: `npm run preview`.

## Deployment

Vercel builds with `npm run build` and serves `dist/`. The build prerenders the portfolio and all 52 skills into HTML so the content is available before JavaScript. No environment variables or backend services are required. The PDF in `public/documents/` is included directly; its optional Python generator is not part of the deployment build.

Repository: `olenadomina/dan-pashchenko-portfolio`. Vercel project: `dan-pashchenko-portfolio`. The production branch is `main`.

Local QA screenshots and intermediate design exports are excluded from Git and deployments. Reduced motion disables the decorative animations; the badge has a static fallback if WebGL is unavailable.

## Content sources

- https://ios-engineer.com/ — public name Dan, portrait, app icons, contact and 40+ iOS apps.
- https://www.toptal.com/developers/resume/bogdan-pashchenko — full name Bogdan, iOS contracting since 2012, KUNI contribution, Papaya releases and expertise.
- Apple App Store listings and public iTunes lookup — authentic project preview images. These are current promotional captures, not claims that every depicted feature was built by Dan.
- https://www.instagram.com/reel/Ddv2GaIMelU/ — user-provided visual reference.

The hero uses the experience figures confirmed during the design review: 13 years in iOS, 11 years in Swift, 40+ iOS apps made and 20 years in IT. These are fixed content snapshots, not dynamically recalculated totals. Athleats has no documented contribution scope, so its text describes the product only.

The badge uses React Bits under MIT + Commons Clause; see `licenses/react-bits-LICENSE.md`. The local Schibsted Grotesk font is OFL licensed; see `licenses/Schibsted-OFL.txt`.
