'use client'

import { motion } from 'framer-motion'

const EASE = [0.25, 0.1, 0.25, 1]

export default function HeroSection() {
  const handleWorkClick = () => {
    const el = document.getElementById('work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Light mode: soft blue glow top-right */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.06] dark:opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 w-full pt-24 md:pt-32 pb-28 md:pb-32">
        <div className="max-w-[820px]">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 dark:bg-blue-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400" />
            </span>
            <span className="font-dm-sans text-[11px] md:text-[12px] tracking-[0.08em] md:tracking-[0.12em] uppercase text-zinc-500 dark:text-zinc-400">
              Open to full-time opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-visible">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.2 }}>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
                className="mb-[0.12em]"
              >
                <h1 className="font-plus-jakarta font-extrabold text-[clamp(36px,10vw,96px)] leading-[1.15] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50">
                  Designing
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.35 }}
                className=""
              >
                <h1 className="font-plus-jakarta font-extrabold text-[clamp(36px,10vw,96px)] leading-[1.15] tracking-[-0.03em] text-stroke">
                  products
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.45 }}
                className=""
              >
                <h1 className="font-plus-jakarta font-extrabold text-[clamp(36px,10vw,96px)] leading-[1.15] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50">
                  people{' '}
                  <span className="text-blue-600 dark:text-blue-400">love.</span>
                </h1>
              </motion.div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
            style={{ transformOrigin: 'left' }}
            className="w-16 h-[1.5px] bg-blue-300 dark:bg-blue-400/40 mt-10 mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.7 }}
            className="font-dm-sans font-light text-[clamp(16px,2vw,20px)] text-zinc-600 dark:text-zinc-400 leading-[1.65] max-w-[560px]"
          >
            3.5 years shipping{' '}
            <span className="text-zinc-900 dark:text-zinc-200 font-medium">B2B and B2C products</span>{' '}
            people keep coming back to. I do the research, the systems, the pixels —
            and the code. One less person in the chain.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-10"
          >
            <motion.button
              onClick={handleWorkClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-blue-600 dark:bg-blue-400 text-white dark:text-zinc-950 font-dm-sans font-semibold text-[14px] px-7 py-4 rounded-full hover:bg-blue-700 dark:hover:bg-blue-300 transition-colors duration-200"
            >
              View my work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.a
              href="mailto:vsuryansh.98@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/25 hover:text-zinc-900 dark:hover:text-zinc-200 font-dm-sans font-medium text-[14px] px-7 py-4 rounded-full transition-all duration-200"
            >
              Say hello ↗
            </motion.a>
          </motion.div>

          {/* Metadata strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-x-8 gap-y-2 mt-16 pt-8 border-t border-zinc-100 dark:border-white/[0.06]"
          >
            {[
              { label: 'Experience', value: '3.5+ years' },
              { label: 'Focus', value: 'B2B & B2C SaaS' },
              { label: 'Based in', value: 'India' },
              { label: 'Skills', value: 'Design · Systems · AI' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="section-label">{item.label}</span>
                <span className="font-dm-sans text-[13px] text-zinc-700 dark:text-zinc-300">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="section-label">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <rect x="0.75" y="0.75" width="14.5" height="18.5" rx="7.25" stroke="#D4D4D8" strokeWidth="1.5" className="dark:stroke-[#3F3F46]"/>
            <rect x="7" y="4" width="2" height="5" rx="1" fill="#2563EB" className="dark:fill-[#60A5FA]"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
