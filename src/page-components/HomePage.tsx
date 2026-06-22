'use client'

import ThemeProvider from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WorkSection from '../components/WorkSection'
import AboutSection from '../components/AboutSection'
import WhatIDoSection from '../components/WhatIDoSection'
import ProcessSection from '../components/ProcessSection'
import WhoIHelpSection from '../components/WhoIHelpSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <Navbar />
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <WhatIDoSection />
        <ProcessSection />
        <WhoIHelpSection />
        <CTASection />
        <Footer />
      </main>
    </ThemeProvider>
  )
}
