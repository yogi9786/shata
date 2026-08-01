import type { PageType } from '../App'
import EventsGrid from '../components/EventsGrid'

interface EventsPageProps {
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function EventsPage({ onNavigate }: EventsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── Premium Banner Section ─── */}
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden flex flex-col justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0 bg-[#fba14d]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full mt-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 backdrop-blur-md text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-black/10">
            Discover Experiences
          </span>
          <h1 className="font-geist text-4xl sm:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            Explore All Events
          </h1>
        </div>
      </div>

      <div className="pb-20 -mt-10">
        <EventsGrid onNavigate={onNavigate} hideHeader={true} />
      </div>
    </div>
  )
}
