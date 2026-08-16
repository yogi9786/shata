import type { PageType } from '../App'
import EventsGrid from '../components/EventsGrid'
import eventHeroLandingImg from '../assets/event-herolanding.png'

interface EventsPageProps {
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function EventsPage({ onNavigate }: EventsPageProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F3] font-geist relative">
      
      {/* ─── Premium Hero Banner Section ─── */}
      <div className="relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-14 border-b border-black/5">
        
        {/* Background image with soft transparency/translucency */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.12] z-0" 
          style={{ backgroundImage: `url(${eventHeroLandingImg})` }}
        />
        {/* Fading overlay to blend image into the solid cream page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF8F3]/60 to-[#FFF8F3] pointer-events-none z-0" />
        
        {/* Warm ambient glows for premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#E86F32]/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute -top-10 right-10 w-[300px] h-[300px] bg-[#FF9F43]/5 rounded-full blur-[80px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 dot-texture-light opacity-[0.2] pointer-events-none z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Subtitle Tracking Pill */}
          <div className="text-black font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3.5">
            Discover Experiences
          </div>
          
          {/* Main Title Header (Reduced Boldness to font-semibold) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.08] mb-5">
            Explore All <span className="bg-gradient-to-r from-[#E86F32] to-[#FF9F43] bg-clip-text text-transparent">Events</span>
          </h1>
          
          {/* Subheading description */}
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium">
            Browse our curated collection — from royal weddings to corporate summits. Book with verified vendors.
          </p>
        </div>
      </div>

      {/* Grid listing */}
      <div className="pb-16 sm:pb-24 relative z-10">
        <EventsGrid onNavigate={onNavigate} hideHeader={true} />
      </div>
    </div>
  )
}
