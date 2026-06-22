'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeProvider, { useTheme } from '@/contexts/ThemeContext'

const EASE = [0.25, 0.1, 0.25, 1]

// ─── Icons ────────────────────────────────────────────────────────────────────
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

// ─── Navbar ───────────────────────────────────────────────────────────────────
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
const GRADIENT = 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)'

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

const QR_SECTIONS = [
  { id: 'cs-context', label: 'Context' },
  { id: 'cs-problem', label: 'Problem' },
  { id: 'cs-process', label: 'Process' },
  { id: 'cs-decisions', label: 'Decisions' },
  { id: 'cs-feature', label: 'The Feature' },
  { id: 'cs-outcome', label: 'Outcome' },
  { id: 'cs-reflection', label: 'Reflection' },
]

function SectionTracker() {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const obs: IntersectionObserver[] = []
    QR_SECTIONS.forEach(({ id }) => {
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
      {QR_SECTIONS.map(({ id, label }) => (
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
function QuantiveResultsContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <ReadingProgressBar />
      <SectionTracker />
      <CaseStudyNavbar />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-18 overflow-hidden bg-white dark:bg-zinc-950">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[500px] rounded-full opacity-[0.05] dark:opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #0D9488 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}
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
              B2B SaaS · Enterprise · 2023
            </span>
          </motion.div>

          {/* Context line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="font-inter text-[14px] md:text-[15px] text-zinc-400 dark:text-zinc-600 italic mb-4"
          >
            Adobe. 10,000 people. One OKR system. One missing concept.
          </motion.p>

          {/* Headline */}
          <div className="max-w-[920px]">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
              className="font-syne font-extrabold text-[clamp(32px,6.5vw,76px)] leading-[1.02] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 mb-6"
            >
              Everyone needed to see
              <br />
              the strategy. Not everyone{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)',
                }}
              >
                should own it.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
              className="font-inter font-light text-[clamp(16px,2vw,20px)] text-zinc-600 dark:text-zinc-400 leading-[1.7] max-w-[620px] mb-10"
            >
              A feature designed from discovery to handoff for Adobe's leadership teams —
              separating visibility from accountability inside Quantive Results, an enterprise OKR platform.
            </motion.p>

            {/* KPI chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              {[
                { value: '1', label: 'Feature', sub: 'Discovery → Handoff' },
                { value: '7', label: 'Days', sub: 'Full turnaround' },
                { value: 'Adobe', label: 'Client', sub: '10,000-person org' },
                { value: '+40%', label: 'OKR Visibility', sub: 'Leadership views ↑' },
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
              background: 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)',
            }}
          >
            {/* Texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            <div
              className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
            />

            <div className="absolute inset-0 flex items-end justify-between p-7 md:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="font-inter text-[10px] md:text-[11px] font-medium text-white/50 tracking-[0.12em] uppercase">
                  Feature Case Study
                </span>
                <span className="font-syne font-extrabold text-[clamp(22px,4vw,48px)] text-white leading-none">
                  Quantive Results
                </span>
                <span className="font-inter text-[13px] text-white/60 mt-1">
                  The Watch Feature — OKR Visibility without Ownership
                </span>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="font-inter font-medium text-white text-[12px]">Shipped at Quantive</span>
                </div>
                <span className="font-inter text-[11px] text-white/50">Client: Adobe</span>
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
                { label: 'My Role', value: 'Product Designer' },
                { label: 'Timeline', value: '7 Days' },
                { label: 'Tools', value: 'Figma' },
                { label: 'Year', value: '2023' },
                { label: 'Company', value: 'Quantive' },
                { label: 'Client', value: 'Adobe' },
                { label: 'Type', value: 'Feature · B2B SaaS' },
                { label: 'Read', value: '6 min' },
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
                { label: 'Problem', text: "Adobe's leaders had to become OKR participants just to monitor strategy — adding unwanted accountability to 10,000-person workflows." },
                { label: 'What I did', text: 'Defined the Watch participation state from scratch — real data model change, self-serve toggle, bulk panel. 7 days, solo, discovery to handoff.' },
                { label: 'Outcome', text: '+40% OKR visibility among leadership, −28% unnecessary participant additions. Shipped to Adobe, zero revisions after handoff.' },
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
                  I was a Product Designer at Quantive, a company that built Quantive Results — an enterprise OKR (Objectives and Key Results) platform used by large organisations to align strategy across hundreds of teams. Adobe was one of those organisations, running Quantive Results across a 10,000-person workforce.
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The ask from Adobe was intentionally broad: <span className="text-zinc-900 dark:text-zinc-200 font-medium">they had a problem with how visibility worked in the platform, and they needed it solved.</span> That was the brief. No wireframes, no feature spec, no reference design. Adobe's program managers and leadership were being pulled into OKR structures they had no part in — and they needed a way out. Everything from discovery to solution to handoff was mine to define.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  7 days. One designer. The feature shipped and is in use today.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 / THE PROBLEM
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-problem" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">02 / Problem</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                Visibility was the same as ownership
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.1}>
                <blockquote
                  className="font-syne font-semibold text-[clamp(20px,3.2vw,32px)] text-zinc-900 dark:text-zinc-100 leading-[1.3] tracking-[-0.02em] mb-8 pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #0D9488' }}
                >
                  "In Quantive Results, you either owned an OKR or you couldn't see it. There was no middle ground. Adobe's teams were drowning in accountability for OKRs they had nothing to do with."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  Quantive Results had two participation states: you were a participant in an OKR (with all the accountability, notifications, and responsibility that carries) or you were invisible to it. In a company of 10,000 people running hundreds of OKRs across departments, this binary created a real operational problem.
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  Program managers and leadership at Adobe needed to monitor OKRs across teams they didn't directly own — to spot blockers, track cross-functional dependencies, and stay informed on strategy execution. But the only way to see an OKR was to be added as a participant. Which meant they were receiving accountability emails, appearing in responsibility reports, and being treated by the system as owners of work they had nothing to do with.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The system was conflating <span className="text-zinc-900 dark:text-zinc-200 font-medium">visibility with ownership</span> — and Adobe's teams were paying the operational cost every week. What the platform was missing wasn't a feature. It was a concept.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 / DISCOVERY PROCESS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-process" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">03 / My Process</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                Discovery to handoff
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.06}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-10">
                  Adobe gave me a problem, not a solution. That's the ideal brief — but it requires a sharper process. Here's what the 7 days actually looked like.
                </p>
              </FadeIn>

              <div className="space-y-5">
                {[
                  {
                    step: '01',
                    title: 'Discovery — understand the system before touching the problem',
                    desc: 'Before designing anything, I needed to fully understand how Quantive Results modelled participation. What did "participant" mean in the backend data model? What notifications did it trigger? What reports did it feed into? I worked with engineering to map the current participant system — because any new participation state would need to be genuinely separate, not just a UI mask on the same role. This was the most important day of the 7.',
                  },
                  {
                    step: '02',
                    title: 'Define — name the missing concept',
                    desc: 'The design problem wasn\'t "add a read-only mode." It was: define a new participation state that carries no accountability weight. I named this the Watch state. Watchers have full visibility into an OKR — progress, updates, status, commentary — but don\'t appear in responsibility reports, don\'t receive accountability notifications, and don\'t affect the contributor list. Naming it clearly shaped every downstream decision.',
                  },
                  {
                    step: '03',
                    title: 'Design — explore the interaction options',
                    desc: 'With the concept defined, I explored how users would enter the Watch state. Two main paths: owner-managed (a Stakeholders section where owners curate their audience) vs. self-serve (a Watch toggle anyone could activate independently). I prototyped both, stress-tested them against Adobe\'s actual use cases (a VP watching 40 OKRs, a PM monitoring cross-functional dependencies), and evaluated where each broke down.',
                  },
                  {
                    step: '04',
                    title: 'Validate — test against the real use case',
                    desc: 'The owner-managed approach added work to OKR owners — they\'d need to manage an audience, which still implied some ownership of who could see their work. Self-serve matched how Adobe\'s teams already behaved in Jira and GitHub. I chose self-serve as the primary pattern, added a watcher management panel for owners (for the bulk-addition use case), and validated the placement with a round of internal feedback before finalising.',
                  },
                  {
                    step: '05',
                    title: 'Handoff — present to Adobe\'s product team',
                    desc: 'Final Figma delivery included the full interaction spec, all states (watcher vs. non-watcher, OKR owner view vs. participant view, notification preferences), the watcher management panel, and annotated edge cases. Presented directly to Adobe\'s product team. Feature shipped within the quarter.',
                  },
                ].map((item, i) => (
                  <FadeIn key={item.step} delay={i * 0.07}>
                    <div className="flex flex-col md:flex-row gap-5 md:gap-8 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-6">
                      <div className="flex-shrink-0">
                        <span className="font-syne font-extrabold text-[36px] leading-none text-zinc-200 dark:text-zinc-800 select-none lining-nums">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-syne font-bold text-[15px] text-zinc-900 dark:text-zinc-100 mb-2">
                          {item.title}
                        </h3>
                        <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.75]">
                          {item.desc}
                        </p>
                      </div>
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
                4 decisions that defined<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)',
                  }}
                >
                  the Watch feature.
                </span>
              </h2>
              <p className="font-inter text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                Each decision was a trade-off between power and simplicity — in an enterprise system where the wrong choice has real operational cost.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                number: '01',
                tag: 'Systems Thinking',
                title: 'Separate visibility from responsibility — in the backend, not just the UI',
                summary: 'A new participation state that carries zero accountability weight.',
                detail: 'The temptation was to build a UI mask — show the OKR, but hide the notification triggers. That would have been fragile. The right answer was to work with engineering to define the Watch state as a genuinely separate entity in the data model: a Watcher doesn\'t appear in responsibility reports, doesn\'t receive accountability notifications, doesn\'t affect the contributor list, and isn\'t surfaced when OKR ownership is audited. The UI followed from the data model, not the other way around. This is the hardest part of designing inside an existing system — getting the concept right before you draw anything.',
                impact: 'Clean separation in the data model: no accountability bleed-through in any downstream report or notification.',
              },
              {
                number: '02',
                tag: 'Interaction Design',
                title: 'Self-serve Watch toggle over owner-managed stakeholders list',
                summary: 'Match how Adobe\'s teams already behave — in Jira, GitHub, and every tool they use daily.',
                detail: 'Option A: a Stakeholders section managed by the OKR owner. Option B: a self-serve Watch toggle anyone can activate. Option A gives owners control but creates a management burden — they\'d need to curate an audience, which implies they\'re responsible for who sees their OKR. That\'s the exact dynamic we were trying to eliminate. Option B matched how Adobe\'s teams already operated. A VP who wants to watch 40 OKRs shouldn\'t need to contact 40 owners. I chose self-serve as the primary pattern, and kept an owner-facing management panel for the bulk-addition use case.',
                impact: 'Zero friction to start watching an OKR. Owners retain visibility into who is watching without managing who can.',
              },
              {
                number: '03',
                tag: 'Placement & Hierarchy',
                title: 'Eye icon in the OKR header — a preference, not an action',
                summary: 'The placement tells the user what kind of thing this is before they click it.',
                detail: 'Early explorations put the Watch button in the primary action bar, alongside Edit and Share. It tested as too prominent — it made watching feel like a core workflow rather than a lightweight ambient preference. A Followers section below the OKR description tested as too buried — users missed it. The OKR header — where you\'d find metadata like owner, time period, and status — was the right level of prominence. It says "this is a preference about how you relate to this OKR" rather than "this is something you do to this OKR." The eye icon made it instantly scannable without demanding attention.',
                impact: 'Discoverable without interrupting the primary OKR management workflow.',
              },
              {
                number: '04',
                tag: 'Scale & Leadership Use Cases',
                title: 'Watcher management panel for bulk administration',
                summary: 'A VP watching 40 OKRs across departments can\'t do it one toggle at a time.',
                detail: 'The self-serve model works perfectly for individuals. It doesn\'t work for leadership at scale. A chief of staff adding a VP as a watcher across every relevant OKR in a quarter — that\'s 20-50 OKRs, one-by-one, manually. I designed a watcher management panel for OKR owners that showed who was currently watching and allowed bulk additions. This was the feature that made the Watch layer actually usable for Adobe\'s most senior users, who were precisely the ones the whole feature was built for.',
                impact: 'Made the feature viable for the exact use case that motivated it — leadership visibility at scale.',
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
                        style={{ color: '#0D9488' }}
                      >
                        {decision.tag}
                      </span>
                      <h3 className="font-syne font-bold text-[clamp(17px,2.2vw,22px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.02em] mb-3">
                        {decision.title}
                      </h3>
                      <p className="font-inter font-medium text-[15px] text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                        {decision.summary}
                      </p>
                      <p className="font-inter font-light text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.85] mb-6">
                        {decision.detail}
                      </p>
                      <div className="flex items-start gap-3 pt-5 border-t border-zinc-100 dark:border-white/[0.05]">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 flex-shrink-0 mt-[5px]" />
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

          {/* Pull quote */}
          <FadeIn delay={0.1} className="mt-10">
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.07] rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="font-syne font-extrabold text-[56px] text-teal-200 dark:text-teal-400/20 leading-none flex-shrink-0 select-none">"</div>
                <div className="flex-1">
                  <blockquote className="font-syne font-semibold text-[clamp(17px,2.2vw,22px)] text-zinc-700 dark:text-zinc-300 leading-[1.4] tracking-[-0.01em]">
                    The hardest part wasn't the UI. It was defining a new participation state inside a system where every existing state carried accountability weight.
                  </blockquote>
                  <p className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 mt-4">
                    — On designing the Watch feature for Quantive Results
                  </p>
                </div>
                <div className="font-syne font-extrabold text-[56px] text-teal-200 dark:text-teal-400/20 leading-none flex-shrink-0 select-none self-end hidden md:block">"</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05 / THE FEATURE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-feature" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-12">
            <p className="section-label mb-3">05 / The Feature</p>
            <h2 className="font-syne font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
              The Watch layer —
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)',
                }}
              >
                what it is and how it works.
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: '◎',
                title: 'Read-only visibility',
                desc: 'Watchers see everything a participant sees — progress, updates, status, comments — with no ability to edit, update, or affect the OKR in any way.',
              },
              {
                icon: '◉',
                title: 'Zero accountability',
                desc: 'Watchers don\'t appear in responsibility reports, aren\'t included in accountability notifications, and aren\'t surfaced when OKR ownership is reviewed or audited.',
              },
              {
                icon: '◈',
                title: 'Single-action toggle',
                desc: 'An eye icon in the OKR header. One click to start watching, one click to stop. Fully reversible, zero management overhead, no owner action required.',
              },
              {
                icon: '◇',
                title: 'Notification preferences',
                desc: 'Watchers choose their update frequency — real-time, daily digest, or weekly summary. Eliminates inbox noise for people watching multiple OKRs.',
              },
              {
                icon: '○',
                title: 'Owner visibility',
                desc: 'OKR owners see a list of current watchers in the management panel. No privacy concerns — watching is transparent to the owner by design.',
              },
              {
                icon: '◑',
                title: 'Bulk watcher management',
                desc: 'OKR owners and chiefs of staff can add watchers in bulk via the management panel — critical for the leadership use case of watching 40+ OKRs across a quarter.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={Math.floor(i / 3) * 0.08 + 0.05}>
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-xl p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[20px] leading-none" style={{ color: '#0D9488' }}>
                      {item.icon}
                    </span>
                    <h3 className="font-syne font-bold text-[14px] text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06 / OUTCOME
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-outcome" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">06 / Outcome</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                Measured at 8 weeks post-launch
              </h2>
            </FadeIn>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { value: '+40%', label: 'OKR visibility', sub: 'Leadership views of non-owned OKRs' },
                  { value: '−28%', label: 'Unnecessary additions', sub: 'Participant additions dropped' },
                  { value: '+32%', label: 'Cross-team monitoring', sub: 'OKRs watched outside direct report' },
                  { value: '7', label: 'Days', sub: 'Discovery to handoff' },
                  { value: '↓', label: 'Support tickets', sub: '"Wrong participant added" tickets' },
                  { value: '0', label: 'Revisions', sub: 'After stakeholder presentation' },
                ].map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 0.06}>
                    <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5">
                      <div
                        className="font-syne font-extrabold text-[32px] leading-none mb-1.5 lining-nums"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)',
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

              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  {[
                    'The metric that mattered most wasn\'t in any dashboard — it was the drop in support tickets tagged "wrong participant added." That was the human problem the feature solved, and it showed up in the first month.',
                    '+40% increase in OKR visibility among Adobe leadership roles — tracked via Quantive\'s analytics on OKR views by non-participant users.',
                    '28% reduction in unnecessary participant additions — compared week-on-week before and after launch.',
                    'Feature presented directly to Adobe\'s product team, shipped within the quarter, no design revisions required after handoff.',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 flex-shrink-0 mt-[8px]" />
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
          07 / REFLECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-reflection" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">07 / Reflection</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What I'd do differently
              </h2>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.08}>
                <blockquote
                  className="font-syne font-semibold text-[clamp(18px,2.5vw,24px)] text-zinc-800 dark:text-zinc-200 leading-[1.4] tracking-[-0.01em] pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #0D9488' }}
                >
                  "The best designs solve the problem you can see. The best designers also solve the problem that will appear three weeks after launch."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-inter font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  The notification design for watchers was the weakest part of V1. Watchers received the same update digest as participants, just with accountability language removed. In the first two weeks, several users who were watching 15+ OKRs had noisy inboxes — they were getting event-triggered notifications every time any watched OKR had an update, which defeated the "lightweight ambient awareness" the feature was supposed to provide.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  In retrospect, I'd have designed a separate watcher digest from the start — a weekly summary format rather than event-triggered notifications. One email on Friday morning: "Here's what's changed across the OKRs you're watching this week." That would have made watching feel genuinely lighter. The feature solves visibility without ownership — the notifications should have felt the same way. This is the lesson: the participation state was right. The communication model should have matched it better.
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
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-teal-50/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-teal-900/[0.08] border border-zinc-200 dark:border-white/[0.07] px-6 py-14 sm:px-12 sm:py-16 md:p-16 text-center">
              <div
                className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0D9488 0%, transparent 70%)' }}
              />
              <div className="relative">
                <p className="section-label mb-5" style={{ color: '#0D9488' }}>
                  Want to see the Figma?
                </p>
                <h2 className="font-syne font-extrabold text-[clamp(28px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05] mb-5">
                  7 days leaves a lot of
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #0D9488 0%, #0EA5E9 60%, #6366F1 100%)',
                    }}
                  >
                    work off this page.
                  </span>
                </h2>
                <p className="font-inter font-light text-[clamp(15px,1.8vw,17px)] text-zinc-600 dark:text-zinc-400 leading-[1.75] max-w-[480px] mx-auto mb-10">
                  The full Figma file has every state, every edge case, the watcher management panel, the notification spec, and the annotations I presented to Adobe. If you want to walk through it, I&apos;m happy to.
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

      {/* NEXT CASE STUDY */}
      <div className="border-t border-zinc-100 dark:border-white/[0.05]">
        <a href="/work/quantive-signals" className="block group">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex items-center justify-between gap-6">
            <div>
              <p className="font-inter text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600 mb-2 font-medium">Next Case Study</p>
              <h3 className="font-syne font-bold text-[clamp(20px,3vw,28px)] text-zinc-900 dark:text-zinc-50 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Quantive Signals
              </h3>
              <p className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 mt-1">B2B SaaS · Analytics · Product Designer</p>
            </div>
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-400 dark:group-hover:border-white/25 transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 7.5h13M8 1.5l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </a>
      </div>

            {/* FOOTER */}
      <footer className="border-t border-zinc-100 dark:border-white/[0.05] bg-white dark:bg-zinc-950">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 flex flex-col items-center md:flex-row md:justify-between gap-5">
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="font-syne font-bold text-[14px] text-zinc-800 dark:text-zinc-200 tracking-tight">Suryansh Thakur</span>
            <span className="font-inter text-[12px] text-zinc-400 dark:text-zinc-600">Senior Product Designer</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="mailto:vsuryansh.98@gmail.com" className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/suryansh-thakur-65443b154/" target="_blank" rel="noopener noreferrer" className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors flex items-center gap-1">LinkedIn <span className="text-[10px]">↗</span></a>
            <Link href="/" className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">All Work</Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 opacity-60" />
            <span className="font-inter text-[12px] text-zinc-400 dark:text-zinc-600">© {new Date().getFullYear()} Suryansh Thakur</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function QuantiveResultsCaseStudy() {
  return (
    <ThemeProvider>
      <QuantiveResultsContent />
    </ThemeProvider>
  )
}
