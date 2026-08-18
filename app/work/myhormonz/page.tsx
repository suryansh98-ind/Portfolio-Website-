import type { Metadata } from 'next'
import MyHormonzCaseStudy from '@/components/CaseStudyMyHormonz'

export const metadata: Metadata = {
  title: 'MyHormonz Case Study - Suryansh Thakur',
  description:
    'Designing clarity into hormone health data. 3 surfaces, 10+ modules, 45 days. A hormone wellness platform built for calm, not confusion.',
  openGraph: {
    title: 'MyHormonz Case Study - Suryansh Thakur',
    description:
      'Product Designer case study: hormone health platform design across user app, admin panel, and live marketing website.',
    type: 'website',
  },
}

export default function MyHormonzPage() {
  return <MyHormonzCaseStudy />
}
