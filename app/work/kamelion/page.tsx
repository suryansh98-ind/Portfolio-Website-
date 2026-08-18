import type { Metadata } from 'next'
import KamelionCaseStudy from '@/components/CaseStudyKamelion'

export const metadata: Metadata = {
  title: 'Kamelion Case Study - Suryansh Thakur',
  description:
    'Sole Product Designer case study: a student wellbeing platform for UK secondary schools - personality-driven, gamified, live on iOS and Android.',
  openGraph: {
    title: 'Kamelion Case Study - Suryansh Thakur',
    description:
      'Designed how things work, not just how they look. 2 surfaces, 7 modules, 30 days. Live on App Store and Play Store.',
    type: 'website',
  },
}

export default function KamelionPage() {
  return <KamelionCaseStudy />
}
