import type { Metadata } from 'next'
import QuantiveSignalsCaseStudy from '@/components/CaseStudyQuantiveSignals'

export const metadata: Metadata = {
  title: 'Quantive Signals Case Study — Suryansh Thakur',
  description:
    'Feature design case study: An in-chart annotation and commenting layer for Quantive Signals — bringing anomaly investigation conversations back into the data.',
  openGraph: {
    title: 'Quantive Signals Case Study — Suryansh Thakur',
    description:
      'Designed a native commenting layer anchored to KPI datapoints and date ranges. Internal VP request, 7 days, shipped and in use.',
    type: 'website',
  },
}

export default function QuantiveSignalsPage() {
  return <QuantiveSignalsCaseStudy />
}
