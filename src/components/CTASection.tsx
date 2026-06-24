'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.25, 0.1, 0.25, 1]

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 via-white to-blue-50/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-900/20 border border-zinc-200 dark:border-white/[0.07] px-6 py-10 sm:p-10 md:p-16 text-center">

          {/* Glow */}
          <div
            className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.07] dark:opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
          />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <p className="section-label mb-6" style={{ color: '#2563EB' }}>
              <span className="dark:hidden">06 / Contact</span>
              <span className="hidden dark:inline" style={{ color: '#60A5FA' }}>06 / Contact</span>
            </p>

            <h2 className="font-plus-jakarta font-extrabold text-[clamp(28px,6.5vw,64px)] text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1.05] mb-6">
              Got something<br />
              <span className="text-blue-600 dark:text-blue-400">to build?</span>
            </h2>

            <p className="font-dm-sans font-light text-[clamp(15px,2vw,18px)] text-zinc-600 dark:text-zinc-400 leading-[1.7] max-w-[500px] mx-auto mb-10">
              I&apos;m looking for a full-time role where design has a real seat at the table. Also open to freelance work if the project is interesting enough.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto mx-auto sm:mx-0">
              <motion.a
                href="mailto:vsuryansh.98@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-blue-600 dark:bg-blue-400 text-white dark:text-zinc-950 font-dm-sans font-semibold text-[13px] md:text-[14px] px-6 md:px-8 py-4 rounded-full transition-all duration-200 hover:bg-blue-700 dark:hover:bg-blue-300 min-w-0"
              >
                <svg className="flex-shrink-0" width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <span className="truncate">vsuryansh.98@gmail.com</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/suryansh-thakur-65443b154/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 border border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/25 hover:text-zinc-900 dark:hover:text-zinc-200 font-dm-sans font-medium text-[14px] px-8 py-4 rounded-full transition-all duration-200 flex-shrink-0"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.6 0H2.4A2.4 2.4 0 000 2.4v11.2A2.4 2.4 0 002.4 16h11.2a2.4 2.4 0 002.4-2.4V2.4A2.4 2.4 0 0013.6 0zM4.8 13.6H2.4V6.4h2.4v7.2zm-1.2-8.4a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm9.6 8.4h-2.4V9.6c0-.8-.016-1.834-1.118-1.834-1.12 0-1.29.874-1.29 1.776v4.058H5.99V6.4h2.304v.984h.032c.32-.608 1.104-1.248 2.272-1.248 2.432 0 2.88 1.6 2.88 3.68v3.784z"/>
                </svg>
                LinkedIn ↗
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
