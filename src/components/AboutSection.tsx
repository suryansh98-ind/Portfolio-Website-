'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const EASE = [0.25, 0.1, 0.25, 1]

const highlights = [
  { number: '4.5+', label: 'Years of experience' },
  { number: '10+', label: 'Products shipped' },
  { number: '1', label: 'SaaS company' },
  { number: '∞', label: 'Hours of thinking' },
]

const skills = [
  'Product & UX Design', 'Design Systems', 'UX Research', 'Information Architecture',
  'Interaction Design', 'AI-Assisted Development', 'Figma Variables & Tokens',
  'Prototyping', 'Design Leadership', 'Front-end (with Claude Code)',
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="section-label mb-10"
        >
          02 / About
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Bio */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="font-plus-jakarta font-extrabold text-[clamp(30px,4vw,44px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.1] mb-8"
            >
              Design is the easy part.
              Getting it{' '}
              <span className="text-blue-600 dark:text-blue-400">shipped right</span>{' '}
              is the job.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                `I'm Suryansh. I've spent 4.5+ years building products across B2B and B2C — OKR platforms, health apps, analytics tools, a teen wellbeing app. Enough variety to know that the design problems are usually the same, but the context is everything.`,
                `At some point I got tired of handing off Figma files and watching things come back wrong. So I learned to build. Now I use Claude Code to take my designs into actual code — which means fewer translation errors and a much shorter distance between what I designed and what users see.`,
                `I ask a lot of questions before opening Figma. Who is this actually for? What are they trying to do? What's the thing nobody's said out loud yet? Five minutes of that usually saves a week of revision.`,
              ].map((text, i) => (
                <p key={i} className="font-dm-sans font-light text-[16px] text-zinc-600 dark:text-zinc-400 leading-[1.75]">
                  {text}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              className="flex items-center gap-4 mt-10"
            >
              <a
                href="mailto:vsuryansh.98@gmail.com"
                className="font-dm-sans font-medium text-[13px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 transition-colors"
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <div className="w-px h-4 bg-zinc-200 dark:bg-white/10" />
              <a
                href="https://www.linkedin.com/in/suryansh-thakur-65443b154/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm-sans font-medium text-[13px] text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-10">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/[0.06]"
            >
              <Image
                src="/suryansh.jpeg"
                alt="Suryansh Thakur"
                fill
                className="object-cover object-[52%_28%] scale-[1.15]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5"
                >
                  <div className="font-plus-jakarta font-extrabold text-[40px] text-blue-600 dark:text-blue-400 leading-none mb-2 lining-nums">
                    {item.number}
                  </div>
                  <div className="font-dm-sans text-[13px] text-zinc-500 dark:text-zinc-500 leading-tight">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Bottom row — Skills + Currently side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16">

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
            className="flex-1"
          >
            <p className="section-label mb-4">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.35 + i * 0.04 }}
                  className="font-dm-sans text-[12px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.07] hover:border-blue-300 dark:hover:border-blue-400/25 hover:text-zinc-900 dark:hover:text-zinc-200 px-3 py-1.5 rounded-full transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Currently open */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="bg-blue-50 dark:bg-blue-400/[0.08] border border-blue-200 dark:border-blue-400/25 rounded-xl p-5 self-start"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span className="text-blue-600 dark:text-blue-400 text-[11px] font-medium tracking-[0.12em] uppercase">Currently</span>
            </div>
            <p className="font-dm-sans text-[14px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Looking for a full-time role where design has a real seat at the table.
              Also open to freelance if the project is interesting enough.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
