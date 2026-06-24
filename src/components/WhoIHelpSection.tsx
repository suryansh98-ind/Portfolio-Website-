'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.25, 0.1, 0.25, 1]

const audiences = [
  {
    title: 'Startups',
    subtitle: 'Pre-seed to Series A',
    description: 'You\'ve got the idea and maybe some funding. Now you need something real to put in front of users. I help you get there without spending three months designing something that misses the point.',
    bullets: ['Zero-to-one product design', 'Fast iteration cycles', 'Lean design systems'],
    lightGradient: 'from-blue-50/80 to-violet-50/50',
    darkGradient: 'dark:from-blue-500/10 dark:to-violet-500/5',
    lightBorder: 'border-blue-100',
    darkBorder: 'dark:border-blue-500/15',
    dotColor: 'bg-blue-500 dark:bg-blue-400',
  },
  {
    title: 'Product Teams',
    subtitle: 'Scale-ups & growth stage',
    description: 'You have a product and a roadmap but not enough design bandwidth. I slot in, pick up context fast, and ship — whether that\'s IC work on a feature or helping the team get better at what they do.',
    bullets: ['IC or lead capacity', 'Design system scaling', 'Cross-functional collaboration'],
    lightGradient: 'from-emerald-50/80 to-teal-50/50',
    darkGradient: 'dark:from-emerald-500/10 dark:to-teal-500/5',
    lightBorder: 'border-emerald-100',
    darkBorder: 'dark:border-emerald-500/15',
    dotColor: 'bg-emerald-500 dark:bg-emerald-400',
  },
  {
    title: 'Founders & Builders',
    subtitle: 'Solo or small teams',
    description: 'You need something working, not a 40-page deck of mockups. I design it and build it — which is faster than coordinating between two people who\'ve never talked to each other.',
    bullets: ['Design + development', 'AI-assisted workflow', 'Direct, async collaboration'],
    lightGradient: 'from-orange-50/80 to-rose-50/50',
    darkGradient: 'dark:from-orange-500/10 dark:to-rose-500/5',
    lightBorder: 'border-orange-100',
    darkBorder: 'dark:border-orange-500/15',
    dotColor: 'bg-orange-500 dark:bg-orange-400',
  },
]

const commonProjects = [
  'SaaS product design', 'MVPs & product launches', 'Design systems', 'Dashboard & data viz',
  'Mobile app design', 'Design audits & critiques', 'Landing pages', 'Design-to-code',
]

export default function WhoIHelpSection() {
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
          <p className="section-label mb-4">05 / Who I help</p>
          <h2 className="font-plus-jakarta font-extrabold text-[clamp(36px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
            Who I work best with.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 + i * 0.1 }}
              className={`bg-gradient-to-b ${a.lightGradient} ${a.darkGradient} border ${a.lightBorder} ${a.darkBorder} rounded-2xl p-7`}
            >
              <div className="mb-5">
                <h3 className="font-plus-jakarta font-bold text-[22px] text-zinc-900 dark:text-zinc-50 mb-1">{a.title}</h3>
                <p className="font-dm-sans text-[12px] text-zinc-500 dark:text-zinc-500">{a.subtitle}</p>
              </div>
              <p className="font-dm-sans text-[14px] text-zinc-600 dark:text-zinc-400 leading-[1.7] mb-6">{a.description}</p>
              <ul className="space-y-2">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 font-dm-sans text-[13px] text-zinc-600 dark:text-zinc-400">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${a.dotColor}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.45 }}
          className="border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-transparent rounded-2xl p-8"
        >
          <p className="section-label mb-5">Common project types</p>
          <div className="flex flex-wrap gap-3">
            {commonProjects.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, ease: EASE, delay: 0.5 + i * 0.05 }}
                className="font-dm-sans text-[13px] text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.07] hover:border-blue-300 dark:hover:border-blue-400/25 hover:text-zinc-900 dark:hover:text-white px-4 py-2 rounded-full transition-colors duration-200 cursor-default"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
