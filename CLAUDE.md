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

**Animations** (`src/lib/animations.ts`): shared Framer Motion variants (`fadeInUp`, `fadeIn`, `scaleIn`, `staggerContainer`, etc.) and the shared `EASE = [0.25, 0.1, 0.25, 1]` constant. Case study files define their own local `EASE` constant instead of importing from this file — keep that pattern consistent within each file.

**Typography:**
- `font-syne` — headings, large display text, numbers
- `font-inter` — body, labels, metadata
- `clamp()` used for responsive type sizes (e.g. `text-[clamp(32px,6.5vw,76px)]`)
- `.section-label` utility class in `globals.css` — small uppercase tracking label used consistently across all sections

**Adding a new case study:**
1. Create `src/components/CaseStudy<Name>.tsx` — copy the structure from an existing one; include local `FadeIn`, `CaseStudyNavbar`, inline footer, and `ThemeProvider` wrapper
2. Create `app/work/<slug>/page.tsx` — server component with `export const metadata` and a single render of the component
3. Update the `caseStudies` array in `src/components/WorkSection.tsx` — add `href: '/work/<slug>'` to enable the card link; `href: undefined` renders a "Coming Soon" overlay instead

**Fonts** are loaded in `app/layout.tsx` via `next/font/google` (Syne + Inter) and injected as CSS variables `--font-syne` / `--font-inter`.
