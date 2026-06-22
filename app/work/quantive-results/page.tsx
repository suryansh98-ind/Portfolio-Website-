import type { Metadata } from 'next'
import QuantiveResultsCaseStudy from '@/components/CaseStudyQuantiveResults'

export const metadata: Metadata = {
  title: 'Quantive Results Case Study — Suryansh Thakur',
  description:
    'Feature design case study: The Watch layer — separating OKR visibility from accountability for Adobe inside Quantive Results. Discovery to handoff in 7 days.',
  openGraph: {
    title: 'Quantive Results Case Study — Suryansh Thakur',
    description:
      'Designed a new participation state for Adobe inside an enterprise OKR platform. Sole designer, full discovery to handoff, shipped and in use.',
    type: 'website',
  },
}

export default function QuantiveResultsPage() {
  return <QuantiveResultsCaseStudy />
}
