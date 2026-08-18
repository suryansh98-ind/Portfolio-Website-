'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeProvider, { useTheme } from '@/contexts/ThemeContext'

const EASE = [0.25, 0.1, 0.25, 1]

// ─── Replace with the actual live Vercel URL ─────────────────────────────────
const MYHORMONZ_URL = 'https://mh-website-black.vercel.app/'

// ─── Icon helpers ─────────────────────────────────────────────────────────────
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

// ─── Sticky navbar for the case study page ───────────────────────────────────
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
          className="font-plus-jakarta font-bold text-[15px] tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Suryansh Thakur
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
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

// ─── Reusable scroll-triggered fade-in wrapper ────────────────────────────────
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

// ─── Divider between sections ─────────────────────────────────────────────────
function SectionDivider() {
  return <div className="border-t border-zinc-100 dark:border-white/[0.05]" />
}
const GRADIENT = 'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)'

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

const MH_SECTIONS = [
  { id: 'cs-context', label: 'Context' },
  { id: 'cs-problem', label: 'Problem' },
  { id: 'cs-role', label: 'My Role' },
  { id: 'cs-decisions', label: 'Decisions' },
  { id: 'cs-scope', label: 'Scope Cuts' },
  { id: 'cs-process', label: 'Process' },
  { id: 'cs-features', label: 'Features' },
  { id: 'cs-screens', label: 'Screens' },
  { id: 'cs-outcome', label: 'Outcome' },
  { id: 'cs-reflection', label: 'Reflection' },
]

function SectionTracker() {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const obs: IntersectionObserver[] = []
    MH_SECTIONS.forEach(({ id }) => {
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
      {MH_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-2.5 justify-end"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 font-dm-sans text-[11px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
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

// ─── Full-screen image lightbox ───────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors duration-200 z-10"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
      </motion.div>
    </motion.div>
  )
}

// ─── The full page content (inside ThemeProvider) ─────────────────────────────
function MyHormonzContent() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
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
            style={{ background: 'radial-gradient(circle, #CA1670 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #A01258 0%, transparent 70%)' }}
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
              className="flex items-center gap-1.5 font-dm-sans text-[11px] tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M9 5.5H1M4 2L1 5.5l3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All Work
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700 text-[11px]">/</span>
            <span className="font-dm-sans text-[11px] tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600">
              Health Tech · B2C · 2025
            </span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-[900px]">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="font-plus-jakarta font-extrabold text-[clamp(36px,7vw,80px)] leading-[1.0] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 mb-6"
            >
              Designing clarity into
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)',
                }}
              >
                hormone health.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="font-dm-sans font-light text-[clamp(16px,2vw,20px)] text-zinc-600 dark:text-zinc-400 leading-[1.7] max-w-[600px] mb-10"
            >
              A hormone wellness platform built for calm, not confusion - designed so every
              data point comes with meaning. 3 surfaces, 10+ modules, one core principle.
            </motion.p>

            {/* KPI chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              {[
                { value: '3', label: 'Surfaces', sub: 'App · Admin · Web' },
                { value: '10+', label: 'Modules', sub: 'User App' },
                { value: '45', label: 'Days', sub: 'Timeline' },
                { value: 'HIPAA', label: 'Secured', sub: 'Privacy by design' },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="flex flex-col gap-1 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.07] rounded-xl px-5 py-3.5"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-plus-jakarta font-extrabold text-[22px] text-zinc-900 dark:text-zinc-50 leading-none lining-nums">
                      {kpi.value}
                    </span>
                    <span className="font-plus-jakarta font-bold text-[13px] text-zinc-400 dark:text-zinc-600 leading-none">
                      {kpi.label}
                    </span>
                  </div>
                  <span className="font-dm-sans text-[11px] text-zinc-400 dark:text-zinc-600 tracking-[0.04em]">
                    {kpi.sub}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image banner */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ height: 'clamp(200px, 40vw, 480px)' }}
          >
            <Image
              src="/mh tumbnail.png"
              alt="MyHormonz case study cover"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            {/* Website Live button - top right */}
            <div className="absolute top-5 right-5">
              <a
                href={MYHORMONZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-zinc-900 hover:bg-zinc-100 font-dm-sans font-semibold text-[12px] md:text-[13px] px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-md transition-all duration-200 flex-shrink-0"
              >
                Website Live ↗
              </a>
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
                { label: 'Timeline', value: '45 Days' },
                { label: 'Tools', value: 'Figma' },
                { label: 'Year', value: '2025' },
                { label: 'Team', value: 'Led 1 Junior Designer' },
                { label: 'Status', value: 'Website Live · App in Dev' },
                { label: 'Read', value: '7 min' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="font-dm-sans text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600">
                    {item.label}
                  </span>
                  <span className="font-dm-sans text-[14px] font-medium text-zinc-800 dark:text-zinc-200">
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
              <span className="font-dm-sans text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600 font-medium">TL;DR</span>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 flex-1 min-w-0">
              {[
                { label: 'Problem', text: 'A hormone health startup needed 3 product surfaces in 45 days - patient app, ops admin dashboard, marketing site - with HIPAA compliance designed in from the start.' },
                { label: 'What I did', text: 'Led design of all 3 surfaces as senior designer, mentoring a junior. Built the design system first so 45 days was possible. Core challenge: make lab data feel approachable without losing clinical credibility.' },
                { label: 'Outcome', text: '3 surfaces delivered. Marketing site live on Vercel. HIPAA design cleared compliance review without a single revision.' },
              ].map((item) => (
                <div key={item.label} className="flex-1 min-w-0">
                  <p className="font-dm-sans text-[10px] tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600 mb-1.5 font-medium">{item.label}</p>
                  <p className="font-dm-sans text-[13px] text-zinc-700 dark:text-zinc-300 leading-[1.65]">{item.text}</p>
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
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                The brief
              </h2>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={0.08}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  MyHormonz is a hormone health platform for people who want to understand what
                  their lab results actually mean - whether they're managing a chronic condition,
                  trying to improve energy, or just want to stop Googling their numbers at 2am.
                  It combines health data, an AI layer, and daily habit tracking.
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The scope: three surfaces designed from scratch. A consumer wellness app with
                  10+ modules, a backend admin panel for the operations team, and a conversion-focused
                  marketing website. All in 45 days. All HIPAA-compliant. The design challenge
                  wasn't just output - it was coherence across three very different products with one shared design language.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
  A practitioner panel was in the original scope - a portal for doctors to
                  review patient hormone data alongside the AI's interpretation. I made the call to
                  cut it from the MVP. The full reasoning, and anything else that didn't make it,
                  lives in the Scope Cuts section below.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 / PROBLEM
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-problem" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">02 / Problem</p>
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                The design problem
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.1}>
                <blockquote
                  className="font-plus-jakarta font-semibold text-[clamp(20px,3.2vw,32px)] text-zinc-900 dark:text-zinc-100 leading-[1.3] tracking-[-0.02em] mb-8 pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #CA1670' }}
                >
                  "Users weren't failing to understand the data - they were anxious because
                  the data gave no interpretation. A number without meaning is just noise."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  When users viewed their hormone reports, raw clinical values like
                  "23.4 nmol/L" triggered alarm rather than understanding. The platform
                  had the data. It lacked the interpretive layer between data and meaning -
                  the crucial step that turns a number into a decision.
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The core design challenge:{' '}
                  <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                    make clarity the first feeling, not panic.
                  </span>{' '}
                  Every module - from hormone tracking to sleep, nutrition, and AI correlation -
                  had to pass this test before it could ship. Features were secondary. Emotional safety came first.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 / ROLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-role" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">03 / Role</p>
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What I owned
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'End-to-end UX',
                  desc: 'All 3 surfaces from scratch - user flows, IA, high-fidelity screens, handoff. The kind of project where you don\'t get to hand things off to someone else.',
                },
                {
                  title: 'Design System',
                  desc: 'Built the component library and design token system from scratch in Figma. Ensured 10+ modules felt like one product, not a bundle of features.',
                },
                {
                  title: 'HIPAA-Compliant UX',
                  desc: 'Designed data-consent interactions, permission flows, and trust moments with HIPAA compliance as a visible design element - not just a legal footnote.',
                },
                {
                  title: 'AI Module Design',
                  desc: 'Designed the AI Correlation Engine UX - how the app surfaces symptom-to-hormone insights, predicts trends, and handles AI voice interactions.',
                },
                {
                  title: 'Design Leadership',
                  desc: 'Worked with one junior designer - doing reviews, unblocking decisions, explaining the why behind feedback so they could make better calls independently.',
                },
                {
                  title: 'Marketing Website',
                  desc: 'Designed the conversion-focused marketing website, now live on Vercel. Built for sign-up acquisition, HIPAA trust signals, and platform credibility.',
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={Math.floor(i / 2) * 0.08 + 0.05}>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5 h-full">
                    <h3 className="font-plus-jakarta font-bold text-[15px] text-zinc-900 dark:text-zinc-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 / DESIGN DECISIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-decisions" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-14">
            <p className="section-label mb-3">04 / Design Decisions</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                4 decisions that<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #CA1670 0%, #E02080 60%, #A01258 100%)',
                  }}
                >
                  defined the product.
                </span>
              </h2>
              <p className="font-dm-sans text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[320px] leading-relaxed md:text-right">
                Each was a deliberate trade-off, made intentionally - not a preference.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                number: '01',
                tag: 'Information Architecture',
                title: 'Insight before data',
                summary:
                  'Show a plain-language interpretation of hormone health before surfacing clinical numbers.',
                detail:
                  'Instead of leading with "Cortisol: 23.4 nmol/L", the interface leads with "Your cortisol is slightly elevated - this can affect sleep and stress response." The clinical number is still there, but it\'s context, not the headline. This single architectural decision changed the emotional experience of opening a hormone report from anxiety-inducing to informative. It cascaded through every data-display screen in the app.',
                impact:
                  'Shifted the emotional response at data-reveal moments from anxiety to understanding.',
              },
              {
                number: '02',
                tag: 'Trust & Compliance',
                title: 'HIPAA as visible trust design',
                summary:
                  'Treat compliance as a design feature - surface it exactly when it matters most.',
                detail:
                  'Most health apps bury consent in terms of service. We surfaced it at the precise moment users share sensitive health data - with explicit consent modals, plain-language data explanations, and permission micro-copy written to feel like care, not legal cover. The design passed compliance review without a single revision. For the client, this was a first.',
                impact:
                  'Zero compliance revisions. Users experience consent as trust-building, not friction.',
              },
              {
                number: '03',
                tag: 'AI Interaction Design',
                title: 'AI correlation as the core engagement loop',
                summary:
                  'The AI engine maps symptoms to hormone patterns - and gets more valuable with each data point.',
                detail:
                  'The AI module was the hardest to design because its value is invisible to new users. The key was designing for the "aha moment" - the first time a user sees a pattern they hadn\'t recognised themselves (e.g., poor sleep correlating with low progesterone). We designed the module to surface these connections proactively, creating a compounding loop: more logging → richer insights → more motivation to log.',
                impact:
                  'Proactive insight delivery creates a self-reinforcing engagement loop.',
              },
              {
                number: '04',
                tag: 'Product Architecture',
                title: 'Health Score as the unifying hub',
                summary:
                  '10 modules needed to feel like one product. A unified metric became the connective tissue.',
                detail:
                  'With sleep, nutrition, stress, CBT, gamification, and hormone data all living in one app, the risk was a sprawling feature dump. The Health Score became the design anchor - a single composite wellness metric that pulled from all modules and gave users a central pulse of their overall health. Every module fed into or was informed by this score, making the app feel coherent rather than additive.',
                impact:
                  'Cohesive product experience across 10 functionally distinct modules.',
              },
            ].map((decision, i) => (
              <FadeIn key={decision.number} delay={i * 0.08}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-2xl p-7 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

                    {/* Number */}
                    <div className="flex-shrink-0 select-none">
                      <span className="font-plus-jakarta font-extrabold text-[52px] leading-none text-zinc-100 dark:text-zinc-800 lining-nums">
                        {decision.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="inline-block font-dm-sans text-[11px] font-medium tracking-[0.08em] uppercase mb-3"
                        style={{ color: '#CA1670' }}
                      >
                        {decision.tag}
                      </span>
                      <h3 className="font-plus-jakarta font-bold text-[clamp(18px,2.5vw,24px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.02em] mb-3">
                        {decision.title}
                      </h3>
                      <p className="font-dm-sans font-medium text-[15px] text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                        {decision.summary}
                      </p>
                      <p className="font-dm-sans font-light text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.85] mb-6">
                        {decision.detail}
                      </p>
                      <div className="flex items-start gap-3 pt-5 border-t border-zinc-100 dark:border-white/[0.05]">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]" style={{ backgroundColor: '#CA1670' }} />
                        <span className="font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-500">
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

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05 / SCOPE CUTS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-scope" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-14">
            <p className="section-label mb-3">05 / Scope Cuts</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                What didn't<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #CA1670 0%, #E02080 60%, #A01258 100%)',
                  }}
                >
                  make the cut.
                </span>
              </h2>
              <p className="font-dm-sans text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[320px] leading-relaxed md:text-right">
                Not everything in the brief becomes a shipped feature. What got cut, and why, is part of the design record too.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                number: '01',
                tag: 'Practitioner Access',
                title: 'The practitioner panel',
                status: 'Descoped from MVP',
                summary:
                  'A portal for doctors to review patient hormone data alongside the AI\'s interpretation - cut before it reached design.',
                detail:
                  'It was in the original brief. I pushed to pull it from the MVP for two reasons. First, trust: a doctor isn\'t going to lean on an AI\'s read of a real patient\'s hormone panel without a track record, and a 45-day build doesn\'t earn one. Second, value: most of what the panel would actually get used for in year one was logging basic patient details - a fraction of what it was scoped to justify, and not enough to earn the surface area in an MVP. The real risk wasn\'t the interface. It\'s a sensitive medical field - if the AI got a real case wrong inside a tool a doctor was relying on, that\'s not a bug, that\'s a liability problem for the client.',
                revisit:
                  'Shipping a product doctors trust nothing from yet is safer than shipping one they half-trust and abandon after the first bad call. Shelved until there\'s a version of the panel with a value proposition strong enough to earn that trust properly.',
              },
            ].map((cut, i) => (
              <FadeIn key={cut.number} delay={i * 0.08}>
                <div className="bg-white dark:bg-zinc-900/60 border border-dashed border-zinc-300 dark:border-white/[0.12] rounded-2xl p-7 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

                    {/* Number */}
                    <div className="flex-shrink-0 select-none">
                      <span className="font-plus-jakarta font-extrabold text-[52px] leading-none text-zinc-100 dark:text-zinc-800 lining-nums">
                        {cut.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className="inline-block font-dm-sans text-[11px] font-medium tracking-[0.08em] uppercase"
                          style={{ color: '#CA1670' }}
                        >
                          {cut.tag}
                        </span>
                        <span className="font-dm-sans text-[10px] font-medium tracking-[0.08em] uppercase px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/[0.08]">
                          {cut.status}
                        </span>
                      </div>
                      <h3 className="font-plus-jakarta font-bold text-[clamp(18px,2.5vw,24px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.02em] mb-3">
                        {cut.title}
                      </h3>
                      <p className="font-dm-sans font-medium text-[15px] text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                        {cut.summary}
                      </p>
                      <p className="font-dm-sans font-light text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.85] mb-6">
                        {cut.detail}
                      </p>
                      <div className="flex items-start gap-3 pt-5 border-t border-zinc-100 dark:border-white/[0.05]">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]" style={{ backgroundColor: '#CA1670' }} />
                        <span className="font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-500">
                          {cut.revisit}
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

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06 / PROCESS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-process" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-12">
            <p className="section-label mb-3">06 / Process</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                Thinking before<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)' }}
                >
                  building.
                </span>
              </h2>
              <p className="font-dm-sans text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                Three surfaces in 45 days - every flow mapped on paper before Figma opened.
              </p>
            </div>
          </FadeIn>

          {/* All 5 sketches - same grid, same size */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { src: '/mh-sketch-flow-hormone.jpg', label: 'Hormone tracking flow' },
              { src: '/mh-sketch-flow-homepage.jpg', label: 'Homepage & health card flow' },
              { src: '/mh-sketch-flow-period.jpg', label: 'Period prediction flow' },
              { src: '/mh-sketch-flow-meal.jpg', label: 'Meal logging flow' },
              { src: '/mh-sketch-wireframe.jpg', label: 'Screen layout wireframes' },
            ].map((sketch, i) => (
              <FadeIn key={sketch.src} delay={i * 0.06}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.06] rounded-xl overflow-hidden">
                  <div
                    className="relative w-full cursor-zoom-in"
                    style={{ aspectRatio: '3 / 4' }}
                    onClick={() => setLightbox({ src: sketch.src, alt: sketch.label })}
                  >
                    <Image
                      src={sketch.src}
                      alt={sketch.label}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 50vw, (max-width: 1200px) 20vw, 240px"
                    />
                  </div>
                  <div className="px-3 py-2.5 border-t border-zinc-100 dark:border-white/[0.05]">
                    <p className="font-dm-sans text-[10px] text-zinc-400 dark:text-zinc-600 tracking-[0.08em] uppercase">
                      {sketch.label}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          07 / PLATFORM ARCHITECTURE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-platform" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-12">
            <p className="section-label mb-3">07 / Platform</p>
            <h2 className="font-plus-jakarta font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
              3 surfaces,<br />
              <span className="text-blue-600 dark:text-blue-400">one design language.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                number: '01',
                title: 'User Wellness App',
                platform: 'iOS · Android',
                status: 'In Development',
                isLive: false,
                gradient: 'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)',
                desc: 'The core product. A personal hormone health companion with 10+ modules - hormone tracking, AI correlation, wellness scoring, sleep, nutrition, stress management, CBT, and gamification.',
                tags: ['Hormone Optimisation', 'AI Correlation', 'Health Score', 'Sleep + Nutrition', 'CBT Toolkit', 'Gamification'],
              },
              {
                number: '02',
                title: 'Admin Dashboard',
                platform: 'Web',
                status: 'In Development',
                isLive: false,
                gradient: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #06B6D4 100%)',
                desc: 'Centralised operations dashboard for the MyHormonz team. Manages users, educational content, AI protocol configuration, and platform-wide analytics.',
                tags: ['User Management', 'Content Management', 'AI Protocol Config', 'Analytics + Reporting'],
              },
              {
                number: '03',
                title: 'Marketing Website',
                platform: 'Web',
                status: 'Live on Vercel',
                isLive: true,
                link: MYHORMONZ_URL,
                gradient: 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 50%, #6366F1 100%)',
                desc: 'Conversion-focused marketing site communicating platform value, HIPAA trust, and driving sign-up acquisition. Designed, built, and now live on Vercel.',
                tags: ['Acquisition-focused', 'HIPAA Trust Signals', 'Waitlist Sign-up', 'Feature Showcase'],
              },
            ].map((surface, i) => (
              <FadeIn key={surface.number} delay={i * 0.1}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-2xl overflow-hidden flex flex-col h-full">
                  {/* Gradient thumbnail */}
                  <div
                    className="h-[100px] relative flex-shrink-0"
                    style={{ background: surface.gradient }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                        backgroundSize: '18px 18px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-end justify-between px-5 pb-4">
                      <span className="font-plus-jakarta font-extrabold text-[38px] leading-none text-white/15 select-none lining-nums">
                        {surface.number}
                      </span>
                      {surface.isLive ? (
                        <a
                          href={surface.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-dm-sans text-[10px] font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full backdrop-blur-sm border bg-green-500/20 border-green-400/40 text-green-200 hover:bg-green-500/30 transition-colors"
                        >
                          Live ↗
                        </a>
                      ) : (
                        <span className="font-dm-sans text-[10px] font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full backdrop-blur-sm border bg-blue-500/20 border-blue-400/40 text-blue-200">
                          In Dev
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-dm-sans text-[10px] text-zinc-400 dark:text-zinc-600 tracking-[0.1em] uppercase mb-1">
                      {surface.platform}
                    </span>
                    <h3 className="font-plus-jakarta font-bold text-[19px] text-zinc-900 dark:text-zinc-100 mb-3">
                      {surface.title}
                    </h3>
                    <p className="font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7] mb-5 flex-1">
                      {surface.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {surface.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-dm-sans text-[11px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.07] px-2.5 py-1 rounded-full"
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
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          08 / FEATURE BREAKDOWN
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-features" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-12">
            <p className="section-label mb-3">08 / Features</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                10+ modules.
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #CA1670 0%, #E02080 60%, #A01258 100%)',
                  }}
                >
                  All intentional.
                </span>
              </h2>
              <p className="font-dm-sans text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                Every module in the User App, with the design rationale behind it.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Registration & Onboarding',
                desc: 'Personalised health intake with progressive disclosure. Privacy-first signup and hormone profile setup designed to reduce cognitive load at first use.',
              },
              {
                num: '02',
                title: 'Hormone Optimisation',
                desc: 'Core data module. Uses the insight-first principle: plain-language health context appears before clinical values. Anxiety reduced, comprehension improved.',
              },
              {
                num: '03',
                title: 'AI Correlation Engine',
                desc: 'Maps user-logged symptoms to hormone patterns. Surfaces insights, detects trends, and connects dots users wouldn\'t find themselves.',
              },
              {
                num: '04',
                title: 'Wellness Tracking',
                desc: 'Daily check-ins and habit logging that feed the AI model for richer, more personalised correlation over time.',
              },
              {
                num: '05',
                title: 'Stress Management',
                desc: 'Guided stress reduction tools linked to real cortisol data - making the connection between emotional state and hormone levels tangible.',
              },
              {
                num: '06',
                title: 'Sleep System',
                desc: 'Sleep quality tracking connected to melatonin and cortisol patterns. Shows the hormonal story behind how you sleep.',
              },
              {
                num: '07',
                title: 'Health Score',
                desc: 'The hub. A single composite metric pulling from all modules. Designed as the north star - one number that tells the full wellness picture.',
              },
              {
                num: '08',
                title: 'Nutrition Module',
                desc: 'Tracks dietary patterns relative to hormone-optimal nutrition. Positioned as a guide, not a calorie counter - context over counting.',
              },
              {
                num: '09',
                title: 'CBT Toolkit',
                desc: 'Cognitive behavioural therapy exercises embedded in the wellness journey. Connects mental health practices directly to hormonal health data.',
              },
              {
                num: '10',
                title: 'Gamification',
                desc: 'Streaks, milestones, and wellness achievements designed to reward consistency. Health isn\'t points - gamification is the engine, not the message.',
              },
              {
                num: '11',
                title: 'AI Voice Interaction',
                desc: 'Voice-enabled AI assistant for hands-free logging and health queries. Designed to reduce the effort of daily check-ins to near-zero.',
              },
            ].map((module, i) => (
              <FadeIn key={module.num} delay={Math.floor(i / 3) * 0.07 + 0.05}>
                <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-xl p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-plus-jakarta font-bold text-[11px] tracking-[0.1em]" style={{ color: '#CA1670' }}>
                      {module.num}
                    </span>
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-white/[0.05]" />
                  </div>
                  <h3 className="font-plus-jakarta font-bold text-[14px] text-zinc-900 dark:text-zinc-100 mb-2">
                    {module.title}
                  </h3>
                  <p className="font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.7]">
                    {module.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          09 / SCREENS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-screens" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <FadeIn className="mb-12">
            <p className="section-label mb-3">09 / Screens</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(30px,5vw,54px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
                Structure first,<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)' }}
                >
                  colour second.
                </span>
              </h2>
              <p className="font-dm-sans text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                The same 5 screens - first as grayscale structure, then as shipped product.
              </p>
            </div>
          </FadeIn>

          {/* Mid-fi row */}
          <FadeIn className="mb-4">
            <p className="section-label">Mid-fi - UX structure</p>
          </FadeIn>
          <div className="flex gap-3 overflow-x-auto pb-4 mb-12 md:grid md:grid-cols-5 md:overflow-visible">
            {[
              { src: '/mh-midfi-home.png', label: 'Home' },
              { src: '/mh-midfi-track.png', label: 'Track' },
              { src: '/mh-midfi-nutrition.png', label: 'Nutrition' },
              { src: '/mh-midfi-periods.png', label: 'Period Tracking' },
              { src: '/mh-midfi-reports.png', label: 'Hormone Reports' },
            ].map((screen) => (
              <div key={screen.src} className="flex-shrink-0 w-[160px] md:w-auto flex flex-col gap-2">
                <div
                  className="relative w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-white/[0.06] shadow-sm bg-zinc-50 dark:bg-zinc-900 cursor-zoom-in"
                  style={{ aspectRatio: '9 / 19' }}
                  onClick={() => setLightbox({ src: screen.src, alt: screen.label })}
                >
                  <Image
                    src={screen.src}
                    alt={screen.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 160px, (max-width: 1200px) 20vw, 224px"
                  />
                </div>
                <p className="font-dm-sans text-[11px] text-zinc-400 dark:text-zinc-600 tracking-[0.06em] uppercase text-center">
                  {screen.label}
                </p>
              </div>
            ))}
          </div>

          {/* Final UI row */}
          <FadeIn className="mb-4">
            <p className="section-label">Final UI - Shipped design</p>
          </FadeIn>
          <div className="flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible">
            {[
              { src: '/mh-final-home.png', label: 'Home' },
              { src: '/mh-final-track.png', label: 'Track' },
              { src: '/mh-final-nutrition.png', label: 'Nutrition' },
              { src: '/mh-final-periods.png', label: 'Period Tracking' },
              { src: '/mh-final-report.png', label: 'Hormone Report' },
            ].map((screen) => (
              <div key={screen.src} className="flex-shrink-0 w-[160px] md:w-auto flex flex-col gap-2">
                <div
                  className="relative w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-white/[0.06] shadow-sm bg-zinc-50 dark:bg-zinc-900 cursor-zoom-in"
                  style={{ aspectRatio: '9 / 19' }}
                  onClick={() => setLightbox({ src: screen.src, alt: screen.label })}
                >
                  <Image
                    src={screen.src}
                    alt={screen.label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 160px, (max-width: 1200px) 20vw, 224px"
                  />
                </div>
                <p className="font-dm-sans text-[11px] text-zinc-400 dark:text-zinc-600 tracking-[0.06em] uppercase text-center">
                  {screen.label}
                </p>
              </div>
            ))}
          </div>

          {/* Admin Dashboard row */}
          <FadeIn className="mb-4 mt-14">
            <p className="section-label">Admin Dashboard - Ops platform</p>
          </FadeIn>
          <div className="flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {[
              { src: '/mh-admin-dashboard.png', label: 'Dashboard overview' },
              { src: '/mh-admin-users.png', label: 'User management' },
              { src: '/mh-admin-subscriptions.png', label: 'Subscription management' },
              { src: '/mh-admin-content.png', label: 'Content management' },
              { src: '/mh-admin-notifications.png', label: 'Notification management' },
            ].map((screen) => (
              <div key={screen.src} className="flex-shrink-0 w-[280px] md:w-auto flex flex-col gap-2">
                <div
                  className="relative w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-white/[0.06] shadow-sm bg-white dark:bg-zinc-900 cursor-zoom-in"
                  style={{ aspectRatio: '16 / 10' }}
                  onClick={() => setLightbox({ src: screen.src, alt: screen.label })}
                >
                  <Image
                    src={screen.src}
                    alt={screen.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 33vw, 380px"
                  />
                </div>
                <p className="font-dm-sans text-[11px] text-zinc-400 dark:text-zinc-600 tracking-[0.06em] uppercase text-center">
                  {screen.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10 / OUTCOME
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-outcome" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">10 / Outcome</p>
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What shipped
              </h2>
            </FadeIn>

            <div>
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { value: '3', label: 'Surfaces delivered', sub: 'App · Admin · Website' },
                  { value: '10+', label: 'Modules designed', sub: 'User App only' },
                  { value: '45', label: 'Days total', sub: 'All 3 surfaces' },
                  { value: '0', label: 'Compliance revisions', sub: 'HIPAA design, zero revisions' },
                ].map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 0.07}>
                    <div className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5">
                      <div
                        className="font-plus-jakarta font-extrabold text-[38px] leading-none mb-1.5 lining-nums"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-dm-sans font-medium text-[13px] text-zinc-800 dark:text-zinc-200 mb-0.5">
                        {stat.label}
                      </div>
                      <div className="font-dm-sans text-[11px] text-zinc-400 dark:text-zinc-600">
                        {stat.sub}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Bullet points */}
              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  {[
                    'Marketing website is live on Vercel - the first user touchpoint for the platform, conversion-optimised and HIPAA-credible.',
                    'User App and Admin Panel in active development, with complete Figma handoffs and a documented design system ready to extend.',
                    'Design system built and documented - the junior designer can continue developing new modules independently, without breaking coherence.',
                    'HIPAA-compliant data interactions passed compliance review without a single revision - a first for the client team on any project.',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[8px]" style={{ backgroundColor: '#CA1670' }} />
                      <p className="font-dm-sans text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.75]">
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

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          11 / REFLECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-reflection" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">11 / Reflection</p>
              <h2 className="font-plus-jakarta font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                What I learned
              </h2>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.08}>
                <blockquote
                  className="font-plus-jakarta font-semibold text-[clamp(18px,2.5vw,24px)] text-zinc-800 dark:text-zinc-200 leading-[1.4] tracking-[-0.01em] pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #CA1670' }}
                >
                  "Health products punish designers for being clever. Clarity is the only
                  feature that matters when someone is anxious about their body."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  Designing for health changes what "good" means. Visual sophistication mattered
                  far less than emotional safety. Every decision - typography scale, colour choice,
                  copy tone - had to answer one question first: <em>does this feel safe?</em> That
                  constraint, when you internalize it, actually makes design decisions faster - you
                  have a clear north star for every debate.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-dm-sans font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  Mentoring through a high-output engagement also sharpened my ability to articulate
                  decisions rather than just make them. When you have to explain why "insight before
                  data" isn't just a nice principle but a structural choice that affects every screen
                  in the app - your own thinking gets more precise. Teaching made me a better designer.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 via-white to-[#CA1670]/[0.06] dark:from-zinc-900 dark:via-zinc-900 dark:to-[#CA1670]/[0.08] border border-zinc-200 dark:border-white/[0.07] px-6 py-14 sm:px-12 sm:py-16 md:p-16 text-center">
              {/* Glow */}
              <div
                className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #CA1670 0%, transparent 70%)' }}
              />

              <div className="relative">
                <p className="section-label mb-5" style={{ color: '#CA1670' }}>
                  Want to see the full process?
                </p>
                <h2 className="font-plus-jakarta font-extrabold text-[clamp(28px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05] mb-5">
                  Case studies don&apos;t show
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)',
                    }}
                  >
                    everything.
                  </span>
                </h2>
                <p className="font-dm-sans font-light text-[clamp(15px,1.8vw,17px)] text-zinc-600 dark:text-zinc-400 leading-[1.75] max-w-[480px] mx-auto mb-10">
                  If you&apos;re a recruiter or client who wants to walk through the full Figma
                  files, see the research artefacts, or dig into the design decisions - I&apos;m happy
                  to talk through it.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="mailto:vsuryansh.98@gmail.com"
                    className="flex items-center justify-center gap-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-dm-sans font-semibold text-[14px] px-8 py-4 rounded-full hover:bg-zinc-700 dark:hover:bg-white transition-all duration-200 min-w-0"
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    <span>Get in touch</span>
                  </a>
                  <Link
                    href="/"
                    className="flex items-center gap-2 border border-zinc-300 dark:border-white/[0.1] text-zinc-600 dark:text-zinc-400 hover:border-zinc-500 dark:hover:border-white/25 hover:text-zinc-900 dark:hover:text-zinc-200 font-dm-sans font-medium text-[14px] px-8 py-4 rounded-full transition-all duration-200"
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
        <a href="/work/kamelion" className="block group">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex items-center justify-between gap-6">
            <div>
              <p className="font-dm-sans text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600 mb-2 font-medium">Next Case Study</p>
              <h3 className="font-plus-jakarta font-bold text-[clamp(20px,3vw,28px)] text-zinc-900 dark:text-zinc-50 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Kamelion
              </h3>
              <p className="font-dm-sans text-[13px] text-zinc-400 dark:text-zinc-600 mt-1">AI Product · B2C · Product Designer</p>
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
            <span className="font-plus-jakarta font-bold text-[14px] text-zinc-800 dark:text-zinc-200 tracking-tight">
              Suryansh Thakur
            </span>
            <span className="font-dm-sans text-[12px] text-zinc-400 dark:text-zinc-600">
              Product Designer
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="mailto:vsuryansh.98@gmail.com"
              className="font-dm-sans text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/suryansh-thakur-65443b154/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm-sans text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              LinkedIn <span className="text-[10px]">↗</span>
            </a>
            <Link
              href="/"
              className="font-dm-sans text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              All Work
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 opacity-60" />
            <span className="font-dm-sans text-[12px] text-zinc-400 dark:text-zinc-600">
              © {new Date().getFullYear()} Suryansh Thakur
            </span>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── Default export - wraps everything in ThemeProvider ───────────────────────
export default function MyHormonzCaseStudy() {
  return (
    <ThemeProvider>
      <MyHormonzContent />
    </ThemeProvider>
  )
}
