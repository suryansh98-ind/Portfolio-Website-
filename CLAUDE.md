# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (port 3000)
npm run build      # production build + type-check
npx tsc --noEmit   # type-check only (no build output)
```

No test suite exists. There is no lint script — TypeScript strict mode (`"strict": true`) via `tsc --noEmit` is the quality gate. Always run it before considering work done.

The preview server is configured in `.claude/launch.json` as `"portfolio-dev"` and can be started with the `preview_start` MCP tool using that name.

## Architecture

**Next.js 14 App Router, fully static.** Every route is prerendered (`○` in build output). There is no server-side data fetching.

**Path alias:** `@/*` resolves to `./src/*`.

**Two-layer page structure:**
- `app/page.tsx` is a thin wrapper that renders `src/page-components/HomePage.tsx`
- `app/work/*/page.tsx` files are server components that export `metadata` and render a single `CaseStudy*.tsx` component
- All heavy client logic lives in `src/components/`

**Theme system** (`src/contexts/ThemeContext.tsx`):
- Dark mode is the default. Theme persists in `localStorage` under key `portfolio-theme`.
- A blocking inline `<script>` in `app/layout.tsx` applies the theme class before first paint to prevent flash.
- `ThemeProvider` must wrap every page independently — it is **not** in the root layout. Both `HomePage.tsx` and every `CaseStudy*.tsx` wrap themselves in `<ThemeProvider>`.
- Tailwind uses `darkMode: 'class'` — dark styles require the `dark` class on `<html>`.

**Case study pattern** — all four case studies (`CaseStudyMyHormonz`, `CaseStudyKamelion`, `CaseStudyQuantiveResults`, `CaseStudyQuantiveSignals`) follow the same internal structure:
1. A local `FadeIn` wrapper using `useInView({ once: true, margin: '-60px' })` for scroll-triggered entrance animations
2. A local `CaseStudyNavbar` with scroll-aware background and theme toggle
3. An inline footer (does **not** import the main `Footer.tsx`) — the main footer uses hash anchors (`#work`, `#about`) that break on sub-pages
4. `ThemeProvider` wraps a `*Content` inner component, exported as the default

**Lightbox pattern** (`CaseStudyMyHormonz.tsx`) — a local `Lightbox` component lets users click any screen image to view it full-size:
- State: `const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)` in the `*Content` component
- Rendered via `<AnimatePresence>` at the end of the content div
- Add `onClick={() => setLightbox({ src, alt })}` and `cursor-zoom-in` to the image container div
- Lightbox closes on X button, backdrop click, or Escape key; locks body scroll while open
- Use this pattern for any future case study that includes inline screen images

**MyHormonz image sections** — `CaseStudyMyHormonz.tsx` has two dedicated visual sections:
- **05 / Process** (`id="cs-process"`) — 5 sketch images in a `grid-cols-2 sm:grid-cols-5` grid, `aspect-ratio: 3/4`, `object-cover object-top`, lightbox-enabled
- **08 / Screens** (`id="cs-screens"`) — three sub-rows:
  - Mid-fi: 5 phone screenshots, `flex + md:grid-cols-5`, `aspect-ratio: 9/19`, `object-cover object-top`
  - Final UI: 5 phone mockups, same grid, `object-contain` (phone frame visible)
  - Admin Dashboard: 5 desktop screenshots, `flex + md:grid-cols-3`, `aspect-ratio: 16/10`, `object-cover object-top`
  - All rows lightbox-enabled
- Section tracker (`MH_SECTIONS`) includes `cs-process` and `cs-screens`; Platform section (`cs-platform`) is intentionally excluded from the tracker

**Case study hero images** — each case study uses a real cover image instead of a gradient banner:
- Images live in `public/` and are rendered with `next/image` (`fill`, `object-cover`, `object-left-top`)
- `object-left-top` is intentional — landscape cover images have important content on the left; centering clips it on narrow viewports
- Height: `clamp(200px, 40vw, 480px)` via inline style
- A white solid pill button (App Store/Play Store or "Shipped at X") sits at `top-5 right-5` over the image
- Do **not** add text overlays — the cover image has its own branding

**Case study color conventions:**
- MyHormonz: primary `#CA1670`, gradient `linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)`
- Kamelion: primary `#258E5B`, secondary `#91D16F`, gradient `linear-gradient(135deg, #258E5B 0%, #91D16F 100%)`
- Quantive Results: primary `#15C679`, accent `#0057D7`. Gradient (`linear-gradient(135deg, #15C679 0%, #0057D7 100%)`) used **only** on the first heading and CTA text; everything else solid `#15C679`
- Quantive Signals: primary `#417AEA`, secondary `#15C679`, gradient `linear-gradient(135deg, #417AEA 0%, #15C679 100%)` used throughout

**WorkSection thumbnails** — the `caseStudies` array in `WorkSection.tsx` supports an optional `image` field. When set, the card renders a `next/image` instead of the gradient+pattern fallback. All four studies currently have images:
- `'/mh tumbnail.png'` (note: space in filename)
- `'/kamelion-thumbnail.png'`
- `'/qr-thumbnail.png'`
- `'/qs-thumbnail.png'`

**Animations** (`src/lib/animations.ts`): shared Framer Motion variants (`fadeInUp`, `fadeIn`, `scaleIn`, `staggerContainer`, etc.) and the shared `EASE = [0.25, 0.1, 0.25, 1]` constant. Case study files define their own local `EASE` constant instead of importing from this file — keep that pattern consistent within each file.

**Typography:**
- `font-syne` — headings, large display text, numbers
- `font-inter` — body, labels, metadata
- `clamp()` used for responsive type sizes (e.g. `text-[clamp(32px,6.5vw,76px)]`)
- `.section-label` utility class in `globals.css` — small uppercase tracking label used consistently across all sections

**Adding a new case study:**
1. Create `src/components/CaseStudy<Name>.tsx` — copy the structure from an existing one; include local `FadeIn`, `CaseStudyNavbar`, inline footer, and `ThemeProvider` wrapper
2. Create `app/work/<slug>/page.tsx` — server component with `export const metadata` and a single render of the component
3. Update the `caseStudies` array in `src/components/WorkSection.tsx` — add `href: '/work/<slug>'` to enable the card link; `href: undefined` renders a "Coming Soon" overlay instead. Add `image: '/filename.png'` (saved to `public/`) to use a real thumbnail instead of the gradient fallback

**Fonts** are loaded in `app/layout.tsx` via `next/font/google` (Syne + Inter) and injected as CSS variables `--font-syne` / `--font-inter`.
