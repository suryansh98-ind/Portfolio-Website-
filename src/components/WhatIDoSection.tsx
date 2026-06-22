'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.25, 0.1, 0.25, 1]

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1" y="1" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="1" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="12" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="12" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Product & UX Design',
    description: 'From the first rough user flow to the final polished screen. I start with research because designing without it is just guessing. I talk to real users more than most designers would say is necessary.',
    highlights: ['User Research', 'Wireframing', 'High-fidelity UI', 'Usability Testing'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="11" y1="1" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="15" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="1" y1="11" x2="7" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="15" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Design Systems',
    description: 'The unglamorous work that makes everything else faster. I build design systems that engineers actually use — mostly by making components match how code works, not how a mood board looks.',
    highlights: ['Figma Variables', 'Component Libraries', 'Design Tokens', 'Documentation'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L2 7v8l9 5 9-5V7L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 7l9 5 9-5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 12v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'AI-Assisted Development',
    description: 'I use Claude Code to turn my own designs into working front-end code — this portfolio is built with it. It\'s not magic, you still need to know what you\'re doing. But it cuts the handoff in half.',
    highlights: ['Claude Code', 'Figma to Code', 'React Components', 'Rapid Prototyping'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 3v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 17l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 21V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'UX Strategy & Leadership',
    description: 'Running crits, helping junior designers develop taste, and saying the thing nobody else wants to say — like when a feature doesn\'t actually solve the problem. Leadership in design is mostly about creating space for the team to do good work.',
    highlights: ['Design Mentorship', 'Process Setup', 'Stakeholder Alignment', 'Design Critique'],
  },
]

export default function WhatIDoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-16"
        >
          <p className="section-label mb-4">03 / Expertise</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
              What I actually do.
            </h2>
            <p className="font-inter text-[15px] text-zinc-500 dark:text-zinc-500 max-w-[360px] leading-relaxed md:text-right">
              Not just wireframes — research, systems, and sometimes the code itself.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.06] hover:border-blue-200 dark:hover:border-blue-400/25 rounded-2xl p-7 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-400/[0.08] border border-blue-200 dark:border-blue-400/25 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-400/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-syne font-bold text-[20px] text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="font-inter text-[14px] text-zinc-500 dark:text-zinc-500 leading-[1.7] mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="font-inter text-[11px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.07] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
