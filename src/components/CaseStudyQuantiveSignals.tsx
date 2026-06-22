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
const GRADIENT = 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)'

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

const QS_SECTIONS = [
  { id: 'cs-context', label: 'Context' },
  { id: 'cs-problem', label: 'Problem' },
  { id: 'cs-hardpart', label: 'The Hard Part' },
  { id: 'cs-decisions', label: 'Decisions' },
  { id: 'cs-feature', label: 'The Feature' },
  { id: 'cs-outcome', label: 'Outcome' },
  { id: 'cs-reflection', label: 'Reflection' },
]

function SectionTracker() {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const obs: IntersectionObserver[] = []
    QS_SECTIONS.forEach(({ id }) => {
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
      {QS_SECTIONS.map(({ id, label }) => (
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
function QuantiveSignalsContent() {
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
            style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)' }}
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
              B2B SaaS · Analytics · 2023
            </span>
          </motion.div>

          {/* Context line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="font-inter text-[14px] md:text-[15px] text-zinc-400 dark:text-zinc-600 italic mb-4"
          >
            Every anomaly investigation started the same way. Screenshot the chart. Paste to Slack. Lose the thread.
          </motion.p>

          {/* Headline */}
          <div className="max-w-[920px]">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
              className="font-syne font-extrabold text-[clamp(32px,6.5vw,76px)] leading-[1.02] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 mb-6"
            >
              The conversation
              <br />
              belonged{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
                }}
              >
                inside the chart.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
              className="font-inter font-light text-[clamp(16px,2vw,20px)] text-zinc-600 dark:text-zinc-400 leading-[1.7] max-w-[620px] mb-10"
            >
              A native annotation and commenting layer for Quantive Signals — an internal feature
              request from the VP of Product that brought anomaly investigations back into the data
              where they belonged.
            </motion.p>

            {/* KPI chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              {[
                { value: '1', label: 'Feature', sub: 'Internal VP request' },
                { value: '7', label: 'Days', sub: 'Concept to handoff' },
                { value: '−28%', label: 'Slack threads', sub: 'Data discussions moved in-app' },
                { value: '28%', label: 'Faster', sub: 'Root cause identification' },
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
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
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
            {/* Glow */}
            <div
              className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
            />

            {/* Mock chart lines for visual storytelling */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              viewBox="0 0 800 440"
              preserveAspectRatio="none"
            >
              <polyline
                points="0,300 100,260 200,280 300,180 400,150 420,80 500,140 600,200 700,170 800,190"
                fill="none" stroke="white" strokeWidth="3"
              />
              <polyline
                points="0,360 100,340 200,350 300,300 400,320 420,200 500,260 600,290 700,270 800,280"
                fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 4"
              />
              {/* Annotation pin indicator */}
              <circle cx="420" cy="80" r="14" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
              <line x1="420" y1="80" x2="420" y2="440" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4"/>
            </svg>

            <div className="absolute inset-0 flex items-end justify-between p-7 md:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="font-inter text-[10px] md:text-[11px] font-medium text-white/50 tracking-[0.12em] uppercase">
                  Feature Case Study
                </span>
                <span className="font-syne font-extrabold text-[clamp(22px,4vw,48px)] text-white leading-none">
                  Quantive Signals
                </span>
                <span className="font-inter text-[13px] text-white/60 mt-1">
                  In-chart Annotation Layer — Contextual Anomaly Investigation
                </span>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="font-inter font-medium text-white text-[12px]">Shipped at Quantive</span>
                </div>
                <span className="font-inter text-[11px] text-white/50">Internal · VP of Product</span>
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
                { label: 'Brief from', value: 'VP of Product' },
                { label: 'Type', value: 'Feature · B2B SaaS · Analytics' },
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
                { label: 'Problem', text: 'Analysts left the product to discuss chart anomalies — screenshotting to Slack broke context and buried decisions in threads with no link to the actual data.' },
                { label: 'What I did', text: "Designed an in-chart annotation layer: threaded comments anchored to data points, with a gesture system that didn't conflict with existing pan/zoom controls." },
                { label: 'Outcome', text: 'Conversations stayed inside the product. VP-requested feature shipped to the full internal team at Quantive.' },
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
                Where this came from
              </h2>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={0.08}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  Quantive Signals was Quantive&apos;s analytics product — a platform for monitoring KPIs, detecting anomalies, and surfacing signals in business data. I was a Product Designer at Quantive when the VP of Product flagged a recurring workflow breakdown they kept seeing in user behaviour data.
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The brief was internal and direct: analysts were doing their actual investigation work outside the product. When they spotted something anomalous in a chart, the conversation about it — what caused it, what was ruled out, what the conclusion was — happened in Slack and email. <span className="text-zinc-900 dark:text-zinc-200 font-medium">Quantive Signals was the place where the data lived, but not the place where the thinking happened.</span>
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  My job was to design a way to bring those conversations back into the tool — anchored to the specific data they were about, without getting in the way of the analysis itself.
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
                The data stayed. The context left.
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.1}>
                <blockquote
                  className="font-syne font-semibold text-[clamp(20px,3.2vw,32px)] text-zinc-900 dark:text-zinc-100 leading-[1.3] tracking-[-0.02em] mb-8 pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #8B5CF6' }}
                >
                  "Someone spots a spike. They screenshot the chart, paste it into Slack, and a thread starts. By the time six people have replied, nobody remembers the exact date range, what had already been ruled out, or what the conclusion was."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  The Slack screenshot workflow had three compounding failure modes. First, context decay — a screenshot of a chart is a frozen moment; anyone joining the thread later couldn&apos;t zoom out, change the date range, or see what happened before and after the anomaly. Second, thread fragmentation — the same anomaly would spawn multiple independent Slack threads as different analysts noticed it. Third, no audit trail — once the investigation reached a conclusion, that conclusion lived in a Slack thread that would be impossible to find three months later.
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The investigation and the evidence were in different places. That gap was the problem. Decisions were being made disconnected from the data that justified them — and there was no record connecting the two.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 / THE HARD PART
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cs-hardpart" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20">

            <FadeIn>
              <p className="section-label mb-3">03 / The Hard Part</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,30px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.025em] leading-[1.15]">
                Two drag gestures. One chart.
              </h2>
            </FadeIn>

            <div>
              <FadeIn delay={0.08}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-6">
                  Adding comments to a product is straightforward. Adding comments to an analytics chart — where the chart already has its own drag interaction for zooming and panning — is an interaction design problem.
                </p>
              </FadeIn>

              <FadeIn delay={0.14}>
                <div
                  className="rounded-xl p-6 md:p-8 mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.06) 60%, rgba(236,72,153,0.04) 100%)',
                    border: '1px solid rgba(139,92,246,0.15)',
                  }}
                >
                  <p className="font-syne font-semibold text-[16px] text-zinc-800 dark:text-zinc-200 mb-3">The gesture conflict:</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-inter text-[12px] font-medium text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">Existing</span>
                      <p className="font-inter text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed">Click + drag on a chart = zoom into a date range. This was core to the analytics workflow — analysts used it constantly.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-inter text-[12px] font-medium text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">New</span>
                      <p className="font-inter text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed">Click + drag on a chart = annotate a date range with a comment. This was the new feature I needed to introduce.</p>
                    </div>
                  </div>
                  <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 mt-4 italic">
                    Same gesture. Opposite intended outcomes. The interaction design had to resolve this without removing either behaviour.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5">
                  I explored several gesture disambiguation strategies: a mode toggle (annotation mode vs. explore mode), a modifier key (hold Alt + drag to annotate), a toolbar switch, and a press-hold before drag. Mode toggles and toolbars added too much intentionality friction — you&apos;d have to actively decide to switch modes before every annotation. Modifier keys worked on desktop but not touch.
                </p>
              </FadeIn>
              <FadeIn delay={0.26}>
                <p className="font-inter font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.85]">
                  The solution was <span className="text-zinc-900 dark:text-zinc-200 font-medium">press-hold before drag-to-annotate</span>. A standard drag triggered zoom as before. A brief press-hold (300ms) before dragging entered annotation mode, showing a visual affordance that the chart had shifted state. This matched established gesture patterns from mobile and required no mode switching. Engineering flagged it as the trickiest implementation challenge — and they were right — but it was the correct interaction.
                </p>
              </FadeIn>
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
                4 decisions that shaped
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
                  }}
                >
                  the annotation layer.
                </span>
              </h2>
              <p className="font-inter text-[14px] text-zinc-500 dark:text-zinc-500 max-w-[300px] leading-relaxed md:text-right">
                Every decision had a wrong answer that was easier to implement. These are the right answers and why they mattered.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                number: '01',
                tag: 'Anchor Model',
                title: 'Range-level anchoring over point-level or event-level',
                summary: 'Analysts discuss trends, not coordinates. The annotation should match the actual unit of analysis.',
                detail: 'I tested three anchor models: point-level (pin a single datapoint), event-level (pin a tagged event), and range-level (select a date window). Point-level seemed the most precise, but it failed quickly in user testing — analysts almost never care about a single moment, they care about what happened over a period. "Revenue dropped between the 14th and the 22nd" is a range-level insight, not a point. Event-level was too rigid — not every anomaly has a tagged event. Range-level won because it matched the natural language of how analysts actually described what they were investigating.',
                impact: 'Annotations were immediately legible to anyone reading them — the selected range made the subject of the conversation visible without reading the comment.',
              },
              {
                number: '02',
                tag: 'Interaction Design',
                title: 'Two coexisting modes: tap for point, press-hold + drag for range',
                summary: 'The gesture design had to solve the zoom conflict without adding a mode toggle or removing existing behaviour.',
                detail: 'Rather than choosing between single-point and range annotation, I kept both. Quick tap on a datapoint = add a point comment. Press-hold + drag = select a date range and add a range comment. The press-hold threshold (300ms) was short enough to feel immediate but long enough to clearly distinguish intent from an accidental touch. The visual affordance — a faint highlight appearing during the hold — confirmed the mode shift before the drag began. Engineering confirmed the implementation was complex, but the user experience was seamless on both desktop and touch.',
                impact: 'Both annotation types available with no mode switching, no toolbar changes, no lost existing functionality.',
              },
              {
                number: '03',
                tag: 'Collaboration',
                title: 'Threaded comments with a "resolved" state — not a flat feed',
                summary: 'Anomaly investigations have a lifecycle. The structure should reflect that.',
                detail: 'Flat comment threads treat investigation and social conversation as the same thing — a stream of messages. But anomaly investigation has a clear structure: hypothesis → evidence → conclusion. Threading preserved that lifecycle. A top-level comment could represent the hypothesis; replies added evidence and counter-evidence; a "resolved" status closed the thread when a conclusion was reached. The resolved state was the most important detail — it created an audit trail. Six months later, anyone looking at a chart could see what had been investigated, what the conclusion was, and who reached it.',
                impact: 'Every investigation left a permanent audit trail anchored to the exact data it was about.',
              },
              {
                number: '04',
                tag: 'Layout',
                title: 'Right-side collapsible panel — never a modal, never full-screen',
                summary: 'Commentary on data is only useful when you can still see the data.',
                detail: 'Early explorations used a modal for comment creation — you clicked a datapoint, a modal appeared, you typed, you submitted. It tested poorly immediately: analysts couldn\'t reference the chart while writing because the modal covered it. A bottom drawer was slightly better but compressed the chart uncomfortably. A right-side collapsible panel — the same pattern used in code review tools — solved it cleanly. The chart stayed fully visible at all times. The panel could be collapsed entirely for analysis-only work. The panel width was fixed (not resizable in V1) to keep scope tight.',
                impact: 'Chart never obscured during annotation. Zero layout shift when opening or closing the panel.',
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
                        style={{ color: '#8B5CF6' }}
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
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 flex-shrink-0 mt-[5px]" />
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
                <div className="font-syne font-extrabold text-[56px] text-purple-200 dark:text-purple-400/20 leading-none flex-shrink-0 select-none">"</div>
                <div className="flex-1">
                  <blockquote className="font-syne font-semibold text-[clamp(17px,2.2vw,22px)] text-zinc-700 dark:text-zinc-300 leading-[1.4] tracking-[-0.01em]">
                    The hardest interaction design problem wasn&apos;t the comment UI. It was making a drag gesture for annotation coexist with an existing drag gesture for zooming.
                  </blockquote>
                  <p className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 mt-4">
                    — On designing the annotation layer for Quantive Signals
                  </p>
                </div>
                <div className="font-syne font-extrabold text-[56px] text-purple-200 dark:text-purple-400/20 leading-none flex-shrink-0 select-none self-end hidden md:block">"</div>
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
              What shipped —
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
                }}
              >
                the annotation layer in detail.
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '◎',
                title: 'Point-level quick-tap commenting',
                desc: 'Tap any datapoint on a KPI chart to anchor a comment to that exact coordinate. The comment pin persists on the chart so anyone viewing it later can see where the annotation is anchored — and what the value was at that point.',
              },
              {
                icon: '◉',
                title: 'Range-level drag-to-annotate',
                desc: 'Press-hold then drag across a date range to select a window for a comment. The selected range is highlighted on the chart and persists as a shaded region under the annotation — keeping the visual connection between comment and context intact.',
              },
              {
                icon: '◈',
                title: 'Threaded discussion with resolved state',
                desc: 'Every annotation supports a threaded reply chain. A "Resolve" action closes the thread and marks it with a concluded status — creating a permanent audit trail of every investigation that ever happened on that chart.',
              },
              {
                icon: '◇',
                title: 'Searchable, persistent comment layer',
                desc: 'All annotations are indexed and searchable by keyword, author, and date range. They persist across sessions, across users, and across time — so the work done in an investigation six months ago is still findable and legible today.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.07}>
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.07] rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[20px] leading-none" style={{ color: '#8B5CF6' }}>
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
                  { value: '+35%', label: 'Investigation activity', sub: 'Comment threads per anomaly detected' },
                  { value: '−28%', label: 'Slack usage', sub: 'Data discussions moved into Signals' },
                  { value: '−29%', label: 'Time to resolved', sub: '4.1 hrs → 2.9 hrs average' },
                  { value: '7', label: 'Days', sub: 'Concept to handoff' },
                  { value: '300ms', label: 'Hold threshold', sub: 'Gesture disambiguation timing' },
                  { value: '0', label: 'Revisions', sub: 'Post-handoff design changes' },
                ].map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 0.06}>
                    <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5">
                      <div
                        className="font-syne font-extrabold text-[32px] leading-none mb-1.5 lining-nums"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
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
                    '35% increase in investigation activity measured by comment thread creation rate per detected anomaly — showing that analysts were engaging with anomalies more systematically, not just faster.',
                    '28% reduction in Slack and email usage for data discussions in the first eight weeks. This was the VP of Product\'s primary metric — the one that motivated the feature request.',
                    'Root cause identification time dropped from 4.1 hours to 2.9 hours average. This was the most important metric to the product team — it validated that the annotation layer was functioning as an investigation tool, not just a social layer.',
                    'Feature tested clean immediately after implementation. No design revisions requested by engineering or stakeholders post-handoff.',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 flex-shrink-0 mt-[8px]" />
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
                What I&apos;d redesign
              </h2>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.08}>
                <blockquote
                  className="font-syne font-semibold text-[clamp(18px,2.5vw,24px)] text-zinc-800 dark:text-zinc-200 leading-[1.4] tracking-[-0.01em] pl-6 md:pl-8"
                  style={{ borderLeft: '3px solid #8B5CF6' }}
                >
                  "The feature solved the right problem. The notification system created a new one."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="font-inter font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  V1 notifications were event-triggered — every comment in a thread you were part of sent an individual alert. In normal usage, this was fine. But during active anomaly investigations — when a spike in revenue or a dip in conversion had multiple analysts piling in simultaneously — the notification volume became its own problem. People started ignoring the alerts entirely, which undermined the whole point of the threading model.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-inter font-light text-[16px] text-zinc-500 dark:text-zinc-500 leading-[1.85]">
                  What I&apos;d do differently: a digest model from day one. A daily summary email: &quot;Here&apos;s what changed across the annotations you&apos;re following today.&quot; Immediate alerts only for direct @mentions or when a thread you&apos;re in moves to resolved. This would provide ambient awareness — you&apos;re informed without being interrupted. The annotation layer was designed to reduce noise by pulling conversations out of Slack. The notification system, in its first version, brought some of that noise back through a different channel. That&apos;s the lesson: ambient information tools need ambient notification models to match.
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-purple-50/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-900/[0.08] border border-zinc-200 dark:border-white/[0.07] px-6 py-14 sm:px-12 sm:py-16 md:p-16 text-center">
              <div
                className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
              />
              <div className="relative">
                <p className="section-label mb-5" style={{ color: '#8B5CF6' }}>
                  Want to see the Figma?
                </p>
                <h2 className="font-syne font-extrabold text-[clamp(28px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05] mb-5">
                  7 days of decisions don&apos;t
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)',
                    }}
                  >
                    fit on one page.
                  </span>
                </h2>
                <p className="font-inter font-light text-[clamp(15px,1.8vw,17px)] text-zinc-600 dark:text-zinc-400 leading-[1.75] max-w-[480px] mx-auto mb-10">
                  The full Figma has all anchor states, gesture interaction specs, the notification model, the threading logic, the panel layout, and every edge case that came up in the process. If you want a walkthrough, reach out.
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
        <a href="/work/myhormonz" className="block group">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex items-center justify-between gap-6">
            <div>
              <p className="font-inter text-[10px] tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-600 mb-2 font-medium">Next Case Study</p>
              <h3 className="font-syne font-bold text-[clamp(20px,3vw,28px)] text-zinc-900 dark:text-zinc-50 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                MyHormonz
              </h3>
              <p className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 mt-1">Health Tech · B2C · Senior Product Designer</p>
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

export default function QuantiveSignalsCaseStudy() {
  return (
    <ThemeProvider>
      <QuantiveSignalsContent />
    </ThemeProvider>
  )
}
