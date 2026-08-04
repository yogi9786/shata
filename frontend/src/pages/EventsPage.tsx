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
        <div className="absolute inset-0 z-0 bg-[#fba14d] overflow-hidden">
          {/* Decorative glowing blobs */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-rose-400/40 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-300/20 rounded-full blur-[120px]" />
          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff60_1px,transparent_1px),linear-gradient(to_bottom,#ffffff60_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full mt-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-black/5 backdrop-blur-md text-slate-700 text-[10px] sm:text-xs font-normal tracking-wider uppercase mb-4 border border-black/10">
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
