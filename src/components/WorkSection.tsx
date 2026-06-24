'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const EASE = [0.25, 0.1, 0.25, 1]

const caseStudies = [
  {
    id: '01',
    title: 'MyHormonz',
    year: '2025',
    type: 'Health Tech · B2C',
    role: 'Senior Product Designer',
    description: 'Hormone health platform — 3 surfaces designed from scratch in 45 days. The core challenge was making clinical data feel approachable to people who aren\'t doctors.',
    tags: ['UX Strategy', 'Mobile Design', 'User Research', 'B2C'],
    gradient: 'linear-gradient(135deg, #CA1670 0%, #E02080 50%, #A01258 100%)',
    image: '/mh tumbnail.png',
    pattern: false,
    href: '/work/myhormonz',
  },
  {
    id: '02',
    title: 'Kamelion',
    year: '2025',
    type: 'AI Product',
    role: 'Senior Product Designer',
    description: 'Teen wellbeing app, sole designer. I designed how the product logic actually works — when to show what, how personality tests feed into content, what gets unlocked when. It\'s live on both stores.',
    tags: ['UX Research', 'Product Design', 'Design System', 'AI'],
    gradient: 'linear-gradient(135deg, #258E5B 0%, #91D16F 100%)',
    image: '/kamelion-thumbnail.png',
    pattern: true,
    href: '/work/kamelion',
  },
  {
    id: '03',
    title: 'Quantive Results',
    year: '2023',
    type: 'B2B SaaS · Strategy',
    role: 'Product Designer',
    description: 'Adobe needed to see OKRs they didn\'t own. The platform had no concept for that. I designed one — from discovery to handoff in 7 days — that separated visibility from accountability.',
    tags: ['B2B SaaS', 'Dashboard Design', 'Data Viz', 'OKR'],
    gradient: 'linear-gradient(135deg, #15C679 0%, #0090D0 50%, #0057D7 100%)',
    image: '/qr-thumbnail.png',
    pattern: true,
    href: '/work/quantive-results',
  },
  {
    id: '04',
    title: 'Quantive Signals',
    year: '2023',
    type: 'B2B SaaS · Data',
    role: 'Product Designer',
    description: 'Analysts were screenshotting charts and pasting them into Slack to discuss anomalies. I brought the conversation back into the tool — in-chart annotations anchored to the actual data.',
    tags: ['Data Design', 'Feature Design', 'B2B SaaS', 'Analytics'],
    gradient: 'linear-gradient(135deg, #417AEA 0%, #15C679 100%)',
    image: '/qs-thumbnail.png',
    pattern: false,
    href: '/work/quantive-signals',
  },
]

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cardContent = (
    <>
      {/* Thumbnail */}
      <div
        className="relative h-[180px] md:h-[220px] overflow-hidden"
        style={study.image ? undefined : { background: study.gradient }}
      >
        {study.image ? (
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover object-left-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <>
            {study.pattern && (
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />
            )}
            {!study.pattern && (
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,0.2) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.2) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.2) 75%)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              />
            )}
            <div className="absolute top-5 left-6">
              <span className="font-plus-jakarta font-extrabold text-[72px] leading-none opacity-15 text-white select-none lining-nums">
                {study.id}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-5 right-5">
          <span className="font-dm-sans text-[11px] font-medium bg-black/25 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full border border-white/10">
            {study.year}
          </span>
        </div>
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <motion.div
            variants={{ hover: { scale: 1, opacity: 1 } }}
            initial={{ scale: 0.8, opacity: 0 }}
            className="bg-white/20 backdrop-blur-sm border border-white/25 text-white font-dm-sans font-medium text-[13px] px-5 py-2.5 rounded-full"
          >
            {study.href ? 'View Case Study ↗' : 'Coming Soon'}
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
              <span className="section-label">{study.type}</span>
              <span className="section-label opacity-40">·</span>
              <span className="section-label">{study.role}</span>
            </div>
            <h3 className="font-plus-jakarta font-bold text-[22px] text-zinc-900 dark:text-zinc-50 tracking-tight">
              {study.title}
            </h3>
          </div>
          <motion.div
            variants={{ hover: { x: 4, y: -4 } }}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center mt-1"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        <p className="font-dm-sans text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.65] mb-5">
          {study.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="font-dm-sans text-[11px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.07] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        style={{ transformOrigin: 'left', background: study.gradient, height: '2px' }}
      />
    </>
  )

  const motionProps = {
    ref,
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease: EASE, delay: index * 0.1 },
    whileHover: 'hover' as const,
    className: 'group relative bg-white dark:bg-zinc-900/60 rounded-2xl overflow-hidden cursor-pointer shadow-card-light dark:shadow-card-dark hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),_0_8px_32px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10),_0_8px_40px_rgba(0,0,0,0.5)] transition-shadow duration-300',
  }

  if (study.href) {
    return (
      <Link href={study.href} className="block">
        <motion.div {...motionProps}>
          {cardContent}
        </motion.div>
      </Link>
    )
  }

  return (
    <motion.div {...motionProps}>
      {cardContent}
    </motion.div>
  )
}

export default function WorkSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="section-label mb-4">01 / Work</p>
            <h2 className="font-plus-jakarta font-extrabold text-[clamp(36px,5vw,56px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
              Selected Work
            </h2>
            <p className="font-dm-sans text-[16px] text-zinc-500 dark:text-zinc-500 mt-3 max-w-[420px] leading-relaxed">
              End-to-end product design across B2B and B2C SaaS — from research to shipped product.
            </p>
          </div>
          <div className="flex items-center gap-3 text-zinc-400 dark:text-zinc-600">
            <span className="font-dm-sans text-[13px]">4 case studies</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="font-dm-sans text-[13px]">2023 — 2025</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
