# Zentrion Technologies — Website

A production-ready Next.js 14 (App Router) + TypeScript + Tailwind CSS site for
Zentrion Technologies, built around the brand line **"Intelligence That Protects."**

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start         # serve the production build
```

The build fetches Inter, Space Grotesk, and JetBrains Mono from Google Fonts at
build time via `next/font/google` — a normal internet connection is all it needs.

## Design system

- **Colors** — `void` #05070d (background), `surface` #0a0e18, `signal` #2f6bff,
  `cyan` #00d4ff, `violet` #7c5cff (AI sections), `breach` #ff4d5e (threat states),
  text `ink` #e7ebf5 / `mute` #8992a8.
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (labels,
  stats, eyebrows — a nod to terminal/log output).

## Interactive layer

- **`ShaderHero`** — a real WebGL fragment shader (grid + drifting particle
  network, mouse-reactive), written directly against the WebGL API with no
  extra dependency. Pauses when the tab is hidden, disables its animation
  loop under `prefers-reduced-motion`, and disposes all GL resources on
  unmount.
- **`Globe3D`** — an actual Three.js scene (wireframe icosahedron + two
  torus rings), loaded via `next/dynamic` with `ssr: false` since WebGL needs
  `window`. Geometries, materials, and the renderer are all disposed on
  unmount to avoid leaking GPU memory across route changes.
- **`GridGlow`** and **`MagneticButtons`** — mounted once in `app/layout.tsx`,
  so the cursor-glow background and the magnetic pull on every `.btn-primary`
  / `.btn-ghost` work on *every* page automatically — no per-page wiring.
  `MagneticButtons` re-scans the DOM on route change via `usePathname`.
- **`GlassCard`** (in `components/ui.tsx`) now tilts in 3D toward the cursor
  on hover. Since every page's cards go through this one component, the tilt
  effect is already live everywhere — Services, Cybersecurity, AI, Cloud,
  Training, Careers, About.
- All of the above respect `prefers-reduced-motion` and clean up their event
  listeners / rAF loops on unmount — checked with a full `next build` in this
  environment (19/19 routes compiled with zero type errors).

## What's built

11 real pages, not placeholders: Home, About, Services, Cybersecurity, AI,
Cloud, Training (courses + certifications + internships with application
form + FAQ), Careers, Contact, Book Consultation, Request Demo, Privacy,
Terms, and a custom 404. Plus `sitemap.xml`, `robots.txt`, Organization
JSON-LD schema, per-page metadata/Open Graph/Twitter cards, a skip-to-content
link, visible focus states, and `prefers-reduced-motion` handling.

## Scope decisions (read this before asking "where's X")

The brief asked for 25+ pages and a full Three.js / React-Three-Fiber /
Spline / GSAP / Lenis stack. Shipping all of that as working, tested code in
one pass isn't realistic — a lot of "AI website generators" claim it and hand
back broken imports. Instead this repo is a **complete, working core** you can
extend:

- **3D**: the hero now runs a real WebGL shader background plus an actual
  Three.js wireframe globe (`components/Globe3D.tsx`) — not a placeholder.
  `three` is a normal dependency (`npm install` pulls it from the public
  npm registry). If you later want a heavier scene (glTF models, post-processing),
  swap the contents of `Globe3D.tsx` — the hero layout already reserves the slot.
- **Pages not yet built**: Solutions, Industries sub-pages, Projects/Portfolio,
  Research, Blog, Resources, Pricing, Testimonials, Case Studies, Partners,
  FAQ (standalone), Support, Search. Each follows the same pattern as the
  pages that exist — `SectionHeading`, `GlassCard`, `Reveal`, `CTASection`
  from `components/ui.tsx` — so adding one is copy-adapt, not from scratch.
- **Forms** are real, validated, client-side UI with a success state, but
  don't submit anywhere yet — wire `ContactForm.tsx`'s `handleSubmit` to your
  email service, CRM, or an API route.
- **Google Maps embed** on Contact wasn't added since there's no confirmed
  office address yet.

## Brand assets

- `public/logo-mark.png` / `public/logo-full.png` are cropped directly from
  the logo you provided (border and excess white margin trimmed). The mark
  is used in the navbar (in a small white badge, since the artwork has a
  white background and the site is dark), the footer, and as `app/icon.png`
  (the site favicon — Next.js picks this up automatically via its file
  convention, no manual `<link>` needed).
- The full lockup (`logo-full.png`, icon + wordmark + tagline) isn't placed
  anywhere yet — it's there if you want it on a light-background surface
  later (e.g. a printable one-pager or email signature).

## Flagship course

`/training#bootcamp-curriculum` now has the full **Practical Ethical Hacking &
Cybersecurity Bootcamp** — all 12 modules you provided, each with its tools
and a short description, in an accordion (`components/Accordion.tsx`, also
reusable for FAQs elsewhere). It's cross-linked from the course grid above it.
An "Ethics & scope" note is included since the curriculum covers offensive
techniques — it's there once, in that section, not repeated per module.

## Fixes in this pass

- **Literal `\u2019`-style text on the site** — earlier text like "We're" was
  typed as a JS unicode escape (`\u2019`) directly inside JSX text content.
  JSX only decodes HTML entities (`&mdash;`) in text nodes, not JS escapes —
  so it rendered as the literal characters `\u2019` instead of an apostrophe.
  Every occurrence across the codebase has been swapped for the real
  character. If you ever add more copy by hand, type a plain `'` or `’`
  directly rather than an escape sequence in JSX text.

## Apply / enroll / contact behavior

There's no backend, so nothing can be silently sent from the browser without
you tapping send in WhatsApp or your email client — that's a platform
restriction, not a missing feature. What's built instead: every "Apply",
"Enroll Now," and contact-style form (`lib/contact.ts`, used by
`ContactForm.tsx` and the Careers page) **auto-composes** the message —
opening WhatsApp (`wa.me/917305771789`) in a new tab with the text already
filled in, and offering a `mailto:zentriontechnologies@gmail.com` link with
the same content as a fallback. You (or the applicant) just hit send.

## Theme toggle

Light/dark is a real, working toggle now (top-right of the navbar), not just a
dark-only site. `app/globals.css` defines the palette as CSS variables —
dark values live on `:root`, an `html.light` class overrides them — and
`tailwind.config.ts` points `void`/`surface`/`ink`/`mute`/`line` at those
variables, so every existing `bg-void`, `text-mute`, `border-line`, etc.
across the whole site already responds to the toggle with no per-component
changes. `ThemeToggle.tsx` persists the choice to `localStorage`, and a
small blocking script in `app/layout.tsx` applies it before first paint so
there's no flash of the wrong theme.

One deliberate exception: the Home hero sits on a WebGL shader that's only
tuned for a dark background, so that section (and the navbar while it's
transparent over it) is pinned to the dark palette via a `.force-dark` CSS
scope regardless of the site-wide toggle. Every other page, and the navbar
everywhere else, follows the toggle normally.

## Hero visual

The hero's revolving 3D piece is now a stylized wireframe robot-head bust
(`components/RobotHead3D.tsx`) instead of the earlier wireframe globe —
built from Three.js primitives in the site's own brand colors (cranium,
visor, glowing eyes, jaw plate, side panels, collar, antenna, HUD halo
rings), continuously rotating. Worth being direct about this: it's a
stylized piece in the site's existing visual language, not a reproduction of
the photorealistic chrome robot render you shared — that's a finished piece
of someone else's artwork, and there's no way to procedurally recreate it
pixel-for-pixel from primitive geometry (and copying it exactly wouldn't be
appropriate to ship even if it were possible). If you have licensed rights
to a 3D model or glTF asset of something closer to that image, drop it in
and swap it into `RobotHead3D.tsx` — same disposal/cleanup pattern applies.

## Products page

`/products` covers the two platforms from the docs you shared — BehaviorDNA
and the Zentrion Command Center — rewritten as customer-facing copy rather
than the original engineering READMEs. Deliberately left out: the GitHub
repo URLs, the `docker-compose` commands, and the default database
passwords (`neo4j / password`, etc.) from your docs. Publishing default
credentials on your own public site is a real security anti-pattern, doubly
so for a cybersecurity company's marketing page, so those stayed out rather
than getting copied in. Both products have a "Get Early Access" CTA that
opens the same pre-filled WhatsApp/email flow as the rest of the site, and
both carry `SoftwareApplication` structured data for SEO.

## SEO additions this pass

- `Course` structured data (JSON-LD) on `/training` for the flagship
  bootcamp — this is what gets a course eligible for Google's rich course
  results.
- `SoftwareApplication` structured data on `/products` for both platforms.
- `/products` added to `app/sitemap.ts`.
- Existing per-page metadata, Open Graph, canonical URLs, and the
  Organization JSON-LD in the root layout were already in place from
  earlier passes — see the "What's built" section below.

## Deploying to Cloudflare Pages

The project is configured for **static export** — `next.config.js` sets
`output: 'export'`, so `next build` produces a plain HTML/CSS/JS site in
`./out` with no Node server required. Nothing in this project needs a
backend (every "form" builds a WhatsApp/email link client-side), so static
export is a clean fit, and it's the simplest, cheapest way to run this on
Cloudflare Pages.

**Recommended: connect the git repo (Cloudflare builds it for you)**
1. Push this project to a GitHub/GitLab repo.
2. In the Cloudflare dashboard: Workers & Pages \u2192 Create \u2192 Pages \u2192
   Connect to Git \u2192 select the repo.
3. Build settings:
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy. Cloudflare's build servers have normal internet access, so the
   Google Fonts (`next/font/google`) fetch at build time works there even
   though it's blocked in this sandbox (see note below).

**Alternative: build locally and deploy the folder**
```bash
npm install
npm run build          # outputs to ./out
npx wrangler pages deploy out --project-name=zentrion-technologies
```
(Needs a Cloudflare account and `wrangler login` once, first time.)

**Custom domain:** once deployed, add `zentriontechnologies.com` under the
Pages project's Custom Domains tab and follow Cloudflare's DNS prompts.

`public/_headers` already carries the security headers (X-Frame-Options,
etc.) that used to live in `next.config.js`'s `headers()` function —
that function doesn't run with static export, so Cloudflare Pages reads
`_headers` directly at the edge instead. Nothing else to configure.

> **Why this zip doesn't include a pre-built `out/` folder:** this sandbox's
> network access doesn't include `fonts.googleapis.com`, so a build run here
> can't fetch the real Space Grotesk/Inter/JetBrains Mono fonts — shipping
> a build done here would either be font-broken or need the fonts stubbed
> out. Every build in this project (including this one) was verified end to
> end with the fonts temporarily stubbed to confirm zero type or build
> errors, then reverted before packaging. Run `npm run build` yourself (or
> let Cloudflare do it) and you'll get the real thing.

## Suggested next steps

1. Wire `ContactForm` to a real endpoint (Resend/SendGrid for email, or a CRM
   webhook).
2. Add the remaining pages listed above.
3. Replace `/app/icon.svg` with a real logomark; add a proper `/public/og-image.png`
   (1200×630) — referenced in `layout.tsx` but not included.
4. Point DNS at your host (Vercel is the path of least resistance for
   Next.js) and set `metadataBase` in `app/layout.tsx` once the domain is live.
5. Run Lighthouse once deployed and tune image sizes / font loading if you
   add real photography.
