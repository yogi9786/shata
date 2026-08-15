import type { PageType } from '../App'
import EventsGrid from '../components/EventsGrid'

interface EventsPageProps {
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function EventsPage({ onNavigate }: EventsPageProps) {
  return (
    <div className="min-h-screen bg-transparent">
      {/* ─── Premium Light Banner ─── */}
      <div className="relative overflow-hidden bg-transparent pt-28 sm:pt-32 pb-10 sm:pb-14">
        {/* Warm ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#F3E5AB]/40 via-slate-100/30 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 dot-texture-light opacity-[0.25] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="pill-gold mx-auto mb-5" style={{ width: 'fit-content' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse-dot" />
            Discover Experiences
          </div>
          <h1 className="font-geist text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.08] mb-5">
            Explore All{' '}
            <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Browse our curated collection — from royal weddings to corporate summits. Book with verified vendors.
          </p>
        </div>
      </div>

      <div className="pb-20">
        <EventsGrid onNavigate={onNavigate} hideHeader={true} />
      </div>
    </div>
  )
}
