'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeProvider, { useTheme } from '@/contexts/ThemeContext'

const EASE = [0.25, 0.1, 0.25, 1]

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.iu.kamelion'
const APP_STORE_URL = 'https://apps.apple.com/in/app/kamelion/id6748674558'

// ─── Icons ───────────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Case study navbar ────────────────────────────────────────────────────────
function CaseStudyNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-syne font-bold text-[15px] tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Suryansh Thakur
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 font-inter text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Work
          </Link>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center justify-center transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

// ─── Scroll-triggered fade-in ─────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Divider() {
  return <div className="border-t border-zinc-100 dark:border-white/[0.05]" />
}
const GRADIENT = 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)'

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div style={{ width: `${progress}%`, background: GRADIENT, transition: 'width 80ms linear' }} className="h-full" />
    </div>
  )
}

const KM_SECTIONS = [
  { id: 'cs-context', label: 'Context' },
  { id: 'cs-problem', label: 'Problem' },
  { id: 'cs-role', label: 'My Role' },
  { id: 'cs-decisions', label: 'Decisions' },
  { id: 'cs-logic', label: 'Logic Layer' },
  { id: 'cs-platform', label: 'Platform' },
  { id: 'cs-outcome', label: 'Outcome' },
  { id: 'cs-reflection', label: 'Reflection' },
]

function SectionTracker() {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const obs: IntersectionObserver[] = []
    KM_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -65% 0px' }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3.5">
      {KM_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-2.5 justify-end"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 font-inter text-[11px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
            {label}
          </span>
          <div
            className={`rounded-full transition-all duration-300 flex-shrink-0 ${activeId === id ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-500'}`}
            style={activeId === id ? { background: GRADIENT } : undefined}
          />
        </button>
      ))}
    </div>
  )
}

// ─── Page content ─────────────────────────────────────────────────────────────
function KamelionContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <ReadingProgressBar />
      <SectionTracker />
      <CaseStudyNavbar />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-18 overflow-hidden bg-white dark:bg-zinc-950">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[500px] rounded-full opacity-[0.05] dark:opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="flex items-center gap-2.5 mb-8 flex-wrap"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 font-inter text-[11px] tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M9 5.5H1M4 2L1 5.5l3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All Work
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700 text-[11px]">/</span>
            <span className="font-inter text-[11px] tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600">
              AI Product · EdTech · 2025
            </span>
          </motion.div>

          {/* Opening line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="font-inter text-[14px] md:text-[15px] text-zinc-400 dark:text-zinc-600 italic mb-4"
          >
            Most wellbeing apps talk at teenagers.
          </motion.p>

          {/* Headline */}
          <div className="max-w-[900px]">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
              className="font-syne font-extrabold text-[clamp(36px,7vw,80px)] leading-[1.0] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 mb-6"
            >
              I designed one that{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                }}
              >
                listens.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
              className="font-inter font-light text-[clamp(16px,2vw,20px)] text-zinc-600 dark:text-zinc-400 leading-[1.7] max-w-[620px] mb-10"
            >
              A student wellbeing platform built around who each teenager actually is —
              not who we want them to be. 2 surfaces, 7 modules, personality-driven,
              live on both app stores.
            </motion.p>

            {/* KPI chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              {[
                { value: '2', label: 'Surfaces', sub: 'Student App · Admin' },
                { value: '7', label: 'Modules', sub: 'Student App' },
                { value: '30', label: 'Days', sub: 'Full timeline' },
                { value: 'Live', label: 'on Stores', sub: 'iOS + Android' },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="flex flex-col gap-1 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.07] rounded-xl px-5 py-3.5"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-syne font-extrabold text-[22px] text-zinc-900 dark:text-zinc-50 leading-none lining-nums">
                      {kpi.value}
                    </span>
                    <span className="font-syne font-bold text-[13px] text-zinc-400 dark:text-zinc-600 leading-none">
                      {kpi.label}
                    </span>
                  </div>
                  <span className="font-inter text-[11px] text-zinc-400 dark:text-zinc-600 tracking-[0.04em]">
                    {kpi.sub}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero gradient banner */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              height: 'clamp(220px, 36vw, 440px)',
              background:
                'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
            }}
          >
            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            {/* Glow orb */}
            <div
              className="absolute top-[-20%] right-[15%] w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)' }}
            />

            <div className="absolute inset-0 flex items-end justify-between p-7 md:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="font-inter text-[10px] md:text-[11px] font-medium text-white/50 tracking-[0.12em] uppercase">
                  Case Study
                </span>
                <span className="font-syne font-extrabold text-[clamp(26px,5vw,56px)] text-white leading-none">
                  Kamelion
                </span>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-inter font-medium text-[12px] md:text-[13px] px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-200 flex-shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.13-2.18 1.28-2.16 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.73zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store ↗
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-inter font-medium text-[12px] md:text-[13px] px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-200 flex-shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.79-2.79-10.8 9.86zm-1.7-20.35C1.17 3.83 1 4.28 1 4.82v14.36c0 .54.17.99.48 1.31l.07.07 8.04-8.04v-.19L1.55 4.33l-.07.08zm18.39 8.98l-2.27-1.31-2.97 2.97 2.97 2.97 2.28-1.32c.65-.38.65-.99 0-1.31h-.01zm-17.5 9.48l10.62-6.13-2.79-2.79-7.83 8.92z"/>
                  </svg>
                  Play Store ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          META STRIP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-t border-b border-zinc-100 dark:border-white/[0.05] bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-7">
          <FadeIn>
            <div className="flex flex-wrap gap-x-10 gap-y-5 md:gap-x-14">
              {[
                { label: 'My Role', value: 'Sole Product Designer' },
                { label: 'Timeline', value: '30 Days' },
                { label: 'Tools', value: 'Figma' },
                { label: 'Year', value: '2025' },
                { label: 'Team', value: 'Solo — no other designers' },
                { label: 'Read', value: '7 min' },
                { label: 'Status', value: 'Live · iOS + Android' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="font-inter text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600">
                    {item.label}
                  </span>
                  <span className="font-inter text-[14px] font-medium text-zinc-800 dark:text-zinc-200">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>


      {/* TL;DR */}
      <div className="border-b border-zinc-100 dark:border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.07] rounded-2xl p-5 sm:p-7">
            <div className="flex-shrink-0">
              <span className="font-inter text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600 font-medium">TL;DR</span>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 flex-1 min-w-0">
              {[
                { label: 'Problem', text: 'A teen wellbeing AI app had a concept but no product logic — when to show what, how personality tests fed into content, what unlocked when. No design system existed.' },
                { label: 'What I did', text: 'Designed the full product as sole designer — personalization logic, unlock rules, all screens for iOS and Android. Designed how the product actually thinks.' },
                { label: 'Outcome', text: 'Shipped live on both app stores. The product logic I designed is what runs the personalization engine today.' },
              ].map((item) => (
                <div key={item.label} className="flex-1 min-w-0">
                  <p className="font-inter text-[10px] tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600 mb-1.5 font-medium">{item.label}</p>
                  <p className="font-inter text-[13px] text-zinc-700 dark:text-zinc-300 leading-[1.65]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01 / CONTEXT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-context" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">01 / Context</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                The brief
              </h2>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={0.08}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  Kamelion is a student wellbeing platform built for UK secondary school students. The premise is simple but difficult to execute: teenagers don't want to be told they need help. Any product that approaches mental health and personal growth as something clinical, scheduled, or parent-approved will be immediately dismissed. It has to feel like something they chose.
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The platform needed two surfaces — a student-facing app with AI-personalised learning, gamified growth, and a structured community, plus an admin panel for school staff to monitor wellbeing trends and manage content. I was brought in as the sole designer to own everything: UX architecture, the complete design system, and the interaction logic for how each module actually works — not just what it looks like.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  30 days. No design handoffs before me. No second designer to check the work. The app is now live on both the App Store and Google Play.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 / PROBLEM
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-problem" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">02 / Problem</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                The real challenge
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.1}>
                <blockquote
                  className="font-syne font-semibold text-[clamp(20px,3.2vw,32px)] text-zinc-900 dark:text-zinc-100 leading-[1.3] tracking-[-0.02em] mb-8 pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #4F46E5' }}
                >
                  "Every competitor — Calm, Headspace, Wysa — tracked feelings without explaining them, gave content without momentum, built community without safety structure. Students had no reason to return."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  The problem with wellbeing apps for teenagers isn't that they're badly designed. It's that they're designed for the wrong moment. They assume a student will set aside twenty minutes, open an app, and consciously engage with their mental health. That moment doesn't exist at 14.
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  The real challenge:{' '}
                  <span className="text-zinc-900 dark:text-zinc-200 font-medium">design for return, not just for use.</span>{' '}
                  A student might open the app once out of curiosity. Getting them to come back the next day — and the day after — requires designing every interaction as a reason to return. The growth has to feel visible. The progress has to feel real. And critically: missing a day can't feel like failure.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  That constraint — design growth as something you can see — shaped every module, every gamification decision, every piece of copy in the app.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 / ROLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-role" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">03 / Role</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What I owned
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.06}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-8">
                  Sole designer means there's no hand to pass things to. Every decision — product logic, UX architecture, visual design, interaction states, edge cases, developer handoff — was mine. That scope shapes how you work: you can't design surface-level. You have to design how things actually function.
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Full UX Architecture',
                    desc: 'Designed the complete information architecture across both surfaces — from onboarding flow to module-level navigation. Every screen, every state, every edge case.',
                  },
                  {
                    title: 'Core Module Logic',
                    desc: 'Designed how mental gyms, quizzes, challenges, and personality tests actually work — the rules, states, conditional flows, and what gets shown in what scenario.',
                  },
                  {
                    title: 'AI Personalisation Design',
                    desc: 'Defined the conditional logic for personalised content delivery: which modules surface first based on personality profile, growth areas, and usage history.',
                  },
                  {
                    title: 'Gamification System',
                    desc: 'Architected the coin economy, leaderboard mechanics, challenge logic, and reward structure — designed to motivate without creating anxiety.',
                  },
                  {
                    title: 'Design System',
                    desc: 'Built the component library and token system from scratch in Figma. Student app and admin panel share a design language but have structurally different visual priorities.',
                  },
                  {
                    title: 'Dev Handoff',
                    desc: 'Produced complete developer documentation — interaction specs, state diagrams, conditional logic notes — so engineers could build without constant check-ins.',
                  },
                ].map((item, i) => (
                  <FadeIn key={item.title} delay={Math.floor(i / 2) * 0.08 + 0.05}>
                    <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5 h-full">
                      <h3 className="font-syne font-bold text-[15px] text-zinc-900 dark:text-zinc-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7]">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 / DESIGN DECISIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-decisions" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-14">
            <p className="section-label mb-3">04 / Design Decisions</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-syne font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                4 decisions that earned<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                  }}
                >
                  the daily return.
                </span>
              </h2>
              <p className="font-inter text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                Each decision was a direct response to a specific failure mode in competing products.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                number: '01',
                tag: 'Learning Architecture',
                title: 'Micro-learning in the 12-minute window',
                summary: 'Lessons designed for a school break, not a study session.',
                detail: 'The context I was designing for wasn\'t a teenager sitting down to self-improve. It was a 10-minute school break, a lunch queue, a moment between lessons. Once that\'s the mental model, every content decision changes. Lessons were capped at 12 minutes. Quizzes were embedded inline — not bolted on at the end. Completion earned coins immediately. The feedback loop had to close within the break. Designing for a context that doesn\'t actually exist is how apps die.',
                impact: '+38% lesson completion rate versus industry baseline.',
              },
              {
                number: '02',
                tag: 'Motivation Design',
                title: 'Gamification without the anxiety mechanic',
                summary: 'Coins don\'t disappear when you miss a day. That was the whole point.',
                detail: 'Streaks are a dark pattern disguised as motivation. They feel like they build momentum, but what they actually build is a fear of breaking the chain. For a 14-year-old with exams, social stress, and an unpredictable life, a broken streak isn\'t a design failure — it\'s a Tuesday. I designed the coin system so accumulation is never punished by absence. Leaderboards rank activity, not raw scores. Challenges cost coins to enter, creating intentional commitment without fear. Motivation through achievement, not avoidance.',
                impact: '+42% weekly active users. Zero anxiety-driven churn mechanics.',
              },
              {
                number: '03',
                tag: 'Community Architecture',
                title: 'A community that mostly moderates itself',
                summary: 'Structure, not surveillance — content safety through design, not policing.',
                detail: 'Opening community spaces for teenagers is genuinely risky. The standard response is heavy moderation. The design response is structural relevance. Students can only post in topic spaces matching their active growth areas — self-improvement, mental health, stress, relationships. You can\'t wander into a space for a topic you haven\'t engaged with. This filters intent before it becomes a problem. The result is a community that feels personal and relevant, with a moderation burden that\'s a fraction of what open forums require.',
                impact: 'Community engagement maintained without reactive moderation overhead.',
              },
              {
                number: '04',
                tag: 'Dual Interface Design',
                title: 'Same data. Two completely different products.',
                summary: 'A 14-year-old and a school administrator need the same information. They can\'t feel like the same app.',
                detail: 'The hardest design problem on Kamelion wasn\'t any individual screen. It was that a student and an administrator needed to interact with the same underlying platform in fundamentally incompatible ways. The student app had to feel light, personal, and game-like — something chosen, not assigned. The admin panel had to feel like professional software: dense data tables, clear status indicators, bulk management, no learning curve. Same data model, same backend — architecturally different UX, different visual language, different interaction patterns from the ground up.',
                impact: 'Zero required admin training sessions after launch.',
              },
            ].map((decision, i) => (
              <FadeIn key={decision.number} delay={i * 0.08}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-2xl p-7 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                    <div className="flex-shrink-0 select-none">
                      <span className="font-syne font-extrabold text-[52px] leading-none text-zinc-100 dark:text-zinc-800 lining-nums">
                        {decision.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="inline-block font-inter text-[11px] font-medium tracking-[0.08em] uppercase mb-3"
                        style={{ color: '#4F46E5' }}
                      >
                        {decision.tag}
                      </span>
                      <h3 className="font-syne font-bold text-[clamp(18px,2.5vw,24px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.02em] mb-3">
                        {decision.title}
                      </h3>
                      <p className="font-inter font-medium text-[15px] text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                        {decision.summary}
                      </p>
                      <p className="font-inter font-light text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.85] mb-6">
                        {decision.detail}
                      </p>
                      <div className="flex items-start gap-3 pt-5 border-t border-zinc-100 dark:border-white/[0.05]">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0 mt-[5px]" />
                        <span className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500">
                          {decision.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05 / THE LOGIC LAYER  (unique to Kamelion)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-logic" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-14">
            <p className="section-label mb-3">05 / The Logic Layer</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-syne font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                Designing how things work,<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                  }}
                >
                  not just how they look.
                </span>
              </h2>
              <p className="font-inter text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                The invisible layer — conditional logic, interaction rules, and state design that make the product feel personal.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: '◎',
                title: 'Personality Tests',
                subtitle: 'The foundation of personalisation',
                desc: 'The personality test isn\'t a feature — it\'s the key that unlocks the rest of the app. I designed the branching logic for what each result combination surfaces: which learning paths appear first, which mental gyms are prioritised, which community spaces are accessible. The test happens once but informs every screen the student sees afterward.',
                logic: 'Result combinations → conditional module unlock + content surfacing priority',
              },
              {
                icon: '◉',
                title: 'Mental Gyms',
                subtitle: 'Structured exercises, not generic content',
                desc: 'Mental gyms are categorised skill-based exercises — resilience, focus, empathy, emotional regulation. I designed which gym is surfaced in which scenario: a student with a stress-dominant profile sees stress management gyms first. A student who\'s been consistently active in the community space sees social confidence gyms elevated. The gym you see isn\'t random — it responds to who you are and what you\'ve done.',
                logic: 'Profile + usage pattern → gym surface order + recommended session type',
              },
              {
                icon: '◈',
                title: 'Quizzes',
                subtitle: 'Inline, not appended',
                desc: 'Quizzes are embedded inside lessons — not a test you take after. Three formats: multiple choice, true/false, and open reflection prompts. I designed the "no shame" wrong-answer mechanic: a wrong answer shows the correct answer immediately with explanation, then continues. No score deduction, no retry loop. The lesson still completes. Getting something wrong is part of learning, not a reason to stop.',
                logic: 'Wrong answer → instant explanation → lesson continues. No interruption to completion.',
              },
              {
                icon: '◇',
                title: 'Challenges',
                subtitle: 'Intentional commitment, not passive access',
                desc: 'Challenges are time-limited activities that cost coins to enter. I designed the full challenge lifecycle: admin creates and schedules on the admin panel; students discover active challenges in the app; entering requires a coin spend (intentional friction); completion triggers coin reward + leaderboard update. The coin cost isn\'t a barrier — it\'s a commitment signal. It makes joining a choice, not a click.',
                logic: 'Admin creates → student discovers → coin spend to join → completion → reward distribution',
              },
            ].map((module, i) => (
              <FadeIn key={module.title} delay={Math.floor(i / 2) * 0.1 + 0.05}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[22px] leading-none"
                      style={{ color: '#4F46E5' }}
                    >
                      {module.icon}
                    </span>
                    <div>
                      <h3 className="font-syne font-bold text-[17px] text-zinc-900 dark:text-zinc-100">
                        {module.title}
                      </h3>
                      <p className="font-inter text-[12px] text-zinc-400 dark:text-zinc-600">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="font-inter font-light text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.75] mb-5 flex-1">
                    {module.desc}
                  </p>
                  <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.05]">
                    <p className="font-inter text-[12px] text-indigo-500 dark:text-indigo-400 leading-relaxed">
                      <span className="font-medium">Logic: </span>{module.logic}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06 / PLATFORM & MODULES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-platform" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-12">
            <p className="section-label mb-3">06 / Platform</p>
            <h2 className="font-syne font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
              2 surfaces.<br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                }}
              >
                Zero overlap in feel.
              </span>
            </h2>
          </FadeIn>

          {/* Platform cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {[
              {
                number: '01',
                title: 'Student App',
                platform: 'iOS · Android',
                gradient: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                isLive: true,
                desc: 'A personal wellbeing companion designed to feel like something a teenager chose — not something a school assigned. Personality-driven, gamified, and built to earn the daily return.',
                tags: ['Personality Engine', 'AI Learning Paths', 'Mental Gyms', 'Challenges', 'Journaling', 'Coins + Leaderboard', 'Community'],
              },
              {
                number: '02',
                title: 'Admin Panel',
                platform: 'Web',
                gradient: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1E40AF 100%)',
                isLive: true,
                desc: 'Professional-grade oversight dashboard for school administrators. Dense data, clear status indicators, bulk management — designed to require zero training while giving complete visibility.',
                tags: ['Student Overview', 'Wellbeing Analytics', 'Challenge Management', 'Content Management', 'Module Config'],
              },
            ].map((surface, i) => (
              <FadeIn key={surface.number} delay={i * 0.1}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-2xl overflow-hidden flex flex-col h-full">
                  <div
                    className="h-[100px] relative flex-shrink-0"
                    style={{ background: surface.gradient }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '18px 18px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-end justify-between px-5 pb-4">
                      <span className="font-syne font-extrabold text-[38px] leading-none text-white/15 select-none lining-nums">
                        {surface.number}
                      </span>
                      <span className="font-inter text-[10px] font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full backdrop-blur-sm border bg-green-500/20 border-green-400/40 text-green-200">
                        Live ↗
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-inter text-[10px] text-zinc-400 dark:text-zinc-600 tracking-[0.1em] uppercase mb-1">
                      {surface.platform}
                    </span>
                    <h3 className="font-syne font-bold text-[19px] text-zinc-900 dark:text-zinc-100 mb-3">
                      {surface.title}
                    </h3>
                    <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7] mb-5 flex-1">
                      {surface.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {surface.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-inter text-[11px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.07] px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Module breakdown */}
          <FadeIn className="mb-8">
            <h3 className="font-syne font-bold text-[22px] text-zinc-900 dark:text-zinc-50 tracking-[-0.02em]">
              7 modules. All connected.
            </h3>
            <p className="font-inter text-[14px] text-zinc-500 dark:text-zinc-500 mt-2 max-w-[500px] leading-relaxed">
              Each module in the student app feeds into the others — the Health Score, the AI engine, the coin system. Nothing is isolated.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Personality & Profile',
                desc: 'The onboarding test that unlocks the whole platform. Results drive which content, gyms, and spaces are surfaced to each student. Taken once, felt everywhere.',
              },
              {
                num: '02',
                title: 'AI Learning Paths',
                desc: 'Micro-lessons capped at 12 minutes, with inline quizzes and instant coin rewards. Content is personalised based on profile results and evolving usage patterns.',
              },
              {
                num: '03',
                title: 'Mental Gyms',
                desc: 'Structured skill-building exercises categorised by growth area — resilience, focus, empathy, emotional regulation. Surfaced based on personality profile and recent engagement.',
              },
              {
                num: '04',
                title: 'Community Spaces',
                desc: 'Topic-based discussion spaces accessible only when a student is actively working on that growth area. Relevance is built in — not moderated in.',
              },
              {
                num: '05',
                title: 'Journaling',
                desc: 'Prompted daily journaling tied to learning content and growth goals. Entries are private but contribute to the AI model\'s understanding of the student\'s emotional state.',
              },
              {
                num: '06',
                title: 'Coins & Challenges',
                desc: 'The economy that ties everything together. Coins earned through lessons and journaling. Challenges cost coins to enter, creating intentional commitment. Leaderboards rank activity, not scores.',
              },
              {
                num: '07',
                title: 'Growth Dashboard',
                desc: 'The student\'s personal view of their progress — streaks, completed modules, earned achievements, and a visible record of their growth over time. The "invisible made visible."',
              },
            ].map((module, i) => (
              <FadeIn key={module.num} delay={Math.floor(i / 3) * 0.07 + 0.05}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-xl p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-syne font-bold text-[11px] text-indigo-500 dark:text-indigo-400 tracking-[0.1em]">
                      {module.num}
                    </span>
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-white/[0.05]" />
                  </div>
                  <h3 className="font-syne font-bold text-[14px] text-zinc-900 dark:text-zinc-100 mb-2">
                    {module.title}
                  </h3>
                  <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7]">
                    {module.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          07 / OUTCOME
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-outcome" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">07 / Outcome</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What it shipped
              </h2>
            </FadeIn>

            <div>
              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { value: '+38%', label: 'Lesson completion', sub: 'vs. industry baseline' },
                  { value: '+42%', label: 'Weekly active users', sub: 'Within first month' },
                  { value: '~30%', label: 'Daily journaling', sub: 'Adoption rate' },
                  { value: '−25%', label: 'Onboarding drop-off', sub: 'vs. v1 prototype' },
                  { value: '0', label: 'Admin training sessions', sub: 'Required post-launch' },
                  { value: '30', label: 'Days', sub: 'Full design timeline' },
                ].map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 0.06}>
                    <div className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5">
                      <div
                        className="font-syne font-extrabold text-[32px] leading-none mb-1.5 lining-nums"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-inter font-medium text-[13px] text-zinc-800 dark:text-zinc-200 mb-0.5">
                        {stat.label}
                      </div>
                      <div className="font-inter text-[11px] text-zinc-400 dark:text-zinc-600">
                        {stat.sub}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Points */}
              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  {[
                    'App is live on both the App Store and Google Play — shipped within the 30-day timeline without a second designer.',
                    'Design system delivered and documented: the engineering team extended it independently without returning to me for component questions.',
                    'Conditional logic for all 4 core mechanics (personality tests, mental gyms, quizzes, challenges) fully specced and handed off — no ambiguity in how the product actually behaves.',
                    'Admin panel adopted with zero training sessions — the clearest signal that a product designed for non-designers actually succeeded.',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0 mt-[8px]" />
                      <p className="font-inter text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.75]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          08 / REFLECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-reflection" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">08 / Reflection</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What I learned
              </h2>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.08}>
                <blockquote
                  className="font-syne font-semibold text-[clamp(18px,2.5vw,24px)] text-zinc-800 dark:text-zinc-200 leading-[1.4] tracking-[-0.01em] pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #4F46E5' }}
                >
                  "Being the sole designer means you have to hold the whole product in your head at once. Every screen you design, you're also the reviewer, the QA, the product manager, and the person who has to live with the decision."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-inter font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  Kamelion taught me the difference between designing a product and designing how a product works. Most portfolios show screens. The thing that actually matters — the conditional logic, the interaction rules, the state design for what happens when a 14-year-old gets a quiz wrong at 8am — is invisible. That invisible layer is the real design work.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  Working without another designer also clarified what good judgment looks like under pressure. You can't debate every decision. You develop a faster inner framework for what matters and what doesn't. That speed — without losing quality — is something I now carry into every project.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          {/* Store links */}
          <FadeIn className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07]">
              <div className="flex-1">
                <p className="font-syne font-bold text-[17px] text-zinc-900 dark:text-zinc-100 mb-1">
                  Kamelion is live on both stores.
                </p>
                <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500">
                  Download it, use it — the product speaks for itself.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-inter font-medium text-[13px] px-5 py-3 rounded-full hover:bg-zinc-700 dark:hover:bg-white transition-all duration-200"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.13-2.18 1.28-2.16 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.73zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-white/25 font-inter font-medium text-[13px] px-5 py-3 rounded-full transition-all duration-200"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.79-2.79-10.8 9.86zm-1.7-20.35C1.17 3.83 1 4.28 1 4.82v14.36c0 .54.17.99.48 1.31l.07.07 8.04-8.04v-.19L1.55 4.33l-.07.08zm18.39 8.98l-2.27-1.31-2.97 2.97 2.97 2.97 2.28-1.32c.65-.38.65-.99 0-1.31h-.01zm-17.5 9.48l10.62-6.13-2.79-2.79-7.83 8.92z"/>
                  </svg>
                  Play Store
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Main CTA card */}
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-indigo-900/[0.08] border border-zinc-200 dark:border-white/[0.07] px-6 py-14 sm:px-12 sm:py-16 md:p-16 text-center">
              {/* Glow */}
              <div
                className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)' }}
              />

              <div className="relative">
                <p className="section-label mb-5" style={{ color: '#4F46E5' }}>
                  Want to see the full process?
                </p>
                <h2 className="font-syne font-extrabold text-[clamp(28px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05] mb-5">
                  The Figma files go much<br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                    }}
                  >
                    deeper than this.
                  </span>
                </h2>
                <p className="font-inter font-light text-[clamp(15px,1.8vw,17px)] text-zinc-600 dark:text-zinc-400 leading-[1.75] max-w-[480px] mx-auto mb-10">
                  State diagrams, logic flows, the full design system, and the edge cases that made this product actually work — it&apos;s all in the file. If you want a walkthrough, let&apos;s talk.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="mailto:vsuryansh.98@gmail.com"
                    className="flex items-center justify-center gap-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-inter font-semibold text-[14px] px-8 py-4 rounded-full hover:bg-zinc-700 dark:hover:bg-white transition-all duration-200"
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    Get in touch
                  </a>
                  <Link
                    href="/"
                    className="flex items-center gap-2 border border-zinc-300 dark:border-white/[0.1] text-zinc-600 dark:text-zinc-400 hover:border-zinc-500 dark:hover:border-white/25 hover:text-zinc-900 dark:hover:text-zinc-200 font-inter font-medium text-[14px] px-8 py-4 rounded-full transition-all duration-200"
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M12 6.5H1M5 2L1 6.5l4 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back to all work
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* NEXT CASE STUDY */}
      <div className="border-t border-zinc-100 dark:border-white/[0.05]">
        <a href="/work/quantive-results" className="block group">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex items-center justify-between gap-6">
            <div>
              <p className="font-inter text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600 mb-2 font-medium">Next Case Study</p>
              <h3 className="font-syne font-bold text-[clamp(20px,3vw,28px)] text-zinc-900 dark:text-zinc-50 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Quantive Results
              </h3>
              <p className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 mt-1">B2B SaaS · Enterprise · Product Designer</p>
            </div>
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-400 dark:group-hover:border-white/25 transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 7.5h13M8 1.5l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </a>
      </div>

            <footer className="border-t border-zinc-100 dark:border-white/[0.05] bg-white dark:bg-zinc-950">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 flex flex-col items-center md:flex-row md:justify-between gap-5">
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="font-syne font-bold text-[14px] text-zinc-800 dark:text-zinc-200 tracking-tight">
              Suryansh Thakur
            </span>
            <span className="font-inter text-[12px] text-zinc-400 dark:text-zinc-600">
              Senior Product Designer
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="mailto:vsuryansh.98@gmail.com"
              className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/suryansh-thakur-65443b154/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              LinkedIn <span className="text-[10px]">↗</span>
            </a>
            <Link
              href="/"
              className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              All Work
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 opacity-60" />
            <span className="font-inter text-[12px] text-zinc-400 dark:text-zinc-600">
              © {new Date().getFullYear()} Suryansh Thakur
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function KamelionCaseStudy() {
  return (
    <ThemeProvider>
      <KamelionContent />
    </ThemeProvider>
  )
}
