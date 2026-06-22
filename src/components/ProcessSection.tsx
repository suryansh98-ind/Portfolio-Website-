'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.25, 0.1, 0.25, 1]

const steps = [
  {
    number: '01', title: 'Discover', icon: '◎',
    description: 'Lots of questions before I open Figma. What are people actually trying to do? What does success look like? Who has context I don\'t?',
  },
  {
    number: '02', title: 'Define', icon: '◉',
    description: 'What\'s actually the problem — not the symptom they described, but the real thing underneath it.',
  },
  {
    number: '03', title: 'Design', icon: '◈',
    description: 'Flows first, then UI. I don\'t go high-fidelity until the structure is right, or I end up redoing it.',
  },
  {
    number: '04', title: 'Build', icon: '◇',
    description: 'With Claude Code I take my own designs into working front-end. Fewer translation errors. I stop hiding behind "that\'s an engineering thing."',
  },
  {
    number: '05', title: 'Iterate', icon: '○',
    description: 'Ship, watch what happens, fix the things that were wrong. Most of what I learn, I learn here.',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="py-24 md:py-32 bg-white dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-16"
        >
          <p className="section-label mb-4">04 / Process</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-syne font-extrabold text-[clamp(36px,5vw,52px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05]">
              How I work.
            </h2>
            <p className="font-inter text-[15px] text-zinc-500 dark:text-zinc-500 max-w-[340px] leading-relaxed md:text-right">
              Roughly in this order. Sometimes I skip ahead. Sometimes I go back.
            </p>
          </div>
        </motion.div>

        {/* Mobile: vertical connected list */}
        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.09 }}
              className="relative flex items-start gap-5 px-2 py-5"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-[22px] top-[62px] w-px h-[calc(100%-32px)] bg-gradient-to-b from-blue-200 dark:from-blue-400/20 to-transparent" />
              )}
              <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] flex flex-col items-center justify-center">
                <span className="font-syne font-bold text-[9px] text-blue-600 dark:text-blue-400 leading-none">{step.number}</span>
                <span className="text-zinc-400 dark:text-zinc-500 text-[13px] leading-none mt-0.5">{step.icon}</span>
              </div>
              <div className="pt-1 pb-2">
                <h3 className="font-syne font-bold text-[16px] text-zinc-900 dark:text-zinc-100 mb-1.5">{step.title}</h3>
                <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.65]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal 5-col */}
        <div className="hidden md:block relative">
          <div className="absolute top-[28px] left-[52px] right-[52px] h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-400/20 to-transparent" />
          <div className="grid md:grid-cols-5 gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="relative flex flex-col items-center gap-0 p-6"
              >
                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] flex flex-col items-center justify-center">
                  <span className="font-syne font-bold text-[10px] text-blue-600 dark:text-blue-400">{step.number}</span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-[16px] leading-none">{step.icon}</span>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-syne font-bold text-[16px] text-zinc-900 dark:text-zinc-100 mb-2">{step.title}</h3>
                  <p className="font-inter text-[13px] text-zinc-500 dark:text-zinc-500 leading-[1.65]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.7 }}
          className="mt-16 pt-12 border-t border-zinc-100 dark:border-white/[0.05] flex flex-col md:flex-row items-start gap-8"
        >
          <div className="font-syne font-extrabold text-[60px] text-blue-200 dark:text-blue-400/20 leading-none flex-shrink-0 select-none">"</div>
          <div className="flex-1">
            <blockquote className="font-syne font-semibold text-[clamp(18px,2.5vw,24px)] text-zinc-700 dark:text-zinc-300 leading-[1.4] tracking-[-0.01em]">
              Most design problems turn out to be communication problems. Someone didn&apos;t ask the right question early enough, so now we&apos;re redesigning the wrong thing beautifully.
            </blockquote>
            <p className="font-inter text-[13px] text-zinc-400 dark:text-zinc-600 mt-4">
              — My approach to product design
            </p>
          </div>
          <div className="font-syne font-extrabold text-[60px] text-blue-200 dark:text-blue-400/20 leading-none flex-shrink-0 select-none">"</div>
        </motion.div>
      </div>
    </section>
  )
}
