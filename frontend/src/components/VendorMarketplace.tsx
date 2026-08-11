import { useState, useRef } from 'react'
import { useEvents } from '../hooks/useEvents'
import type { PageType } from '../App'
import type { EventItem } from '../data/vendors'
import LogoLoader from './LogoLoader'

interface VendorMarketplaceProps {
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function VendorMarketplace({ onNavigate }: VendorMarketplaceProps) {
  const { events: featuredEvents, loading } = useEvents()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStory, setActiveStory] = useState<EventItem | null>(null)
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  const filteredEvents = featuredEvents.filter((v) => {
    return v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           v.location.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <section id="vendors" className="relative bg-transparent text-black font-geist pb-8 sm:pb-14 overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#F3E5AB]/40 via-slate-100/30 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* ─── Premium Banner Section ─── */}
      <div className="relative h-[300px] sm:h-[420px] w-full overflow-hidden flex flex-col justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/indian_event_planner.png" 
            alt="Event Booking Marketplace" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-800/40 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full mt-8 sm:mt-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF7518]/20 backdrop-blur-md border border-[#FF7518]/30 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7518] animate-pulse" />
            Event Booking Simplified
          </span>
          <h2 className="font-geist text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Connecting You with Top{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7518] to-orange-400 drop-shadow-sm">
              Event Organizers
            </span>
          </h2>
          
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search vendors & locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border border-white/60 rounded-2xl text-sm text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 shadow-lg transition-all"
            />
            <svg className="w-5 h-5 text-black/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Stories Area ─── */}
      <div className="max-w-7xl mx-auto relative z-10 -mt-4 sm:-mt-8">
        
        {/* Stories Horizontal Scroll */}
        {loading ? (
          <LogoLoader text="Curating events..." />
        ) : (
          <div className="relative group/nav mt-6">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 pb-4 px-4 sm:px-6 w-full items-start [&::-webkit-scrollbar]:hidden scrollbar-none"
            >
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setActiveStory(event)}
                  className="flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0 group snap-center w-[72px] sm:w-[84px]">
                  {/* Story Ring */}
                  <div className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#D4AF37] via-[#B8860B] to-[#F3E5AB] shadow-md flex-shrink-0 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#B8860B]/40">
                    <div className="w-full h-full rounded-full border-[2.5px] border-[#FFFDF9] overflow-hidden bg-white">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                  </div>
                  {/* Event Name */}
                  <span className="text-[10px] sm:text-xs text-black/70 font-medium text-center leading-tight line-clamp-2 w-full px-0.5 group-hover:text-[#D4AF37] transition-colors">
                    {event.title}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={scrollLeft}
              className="hidden lg:flex absolute left-0 top-[42px] -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-black/20 items-center justify-center text-black/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:scale-105 opacity-0 group-hover/nav:opacity-100 transition-all z-10 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="hidden lg:flex absolute right-0 top-[42px] -translate-y-1/2 translate-x-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-black/20 items-center justify-center text-black/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:scale-105 opacity-0 group-hover/nav:opacity-100 transition-all z-10 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-24 mx-4 sm:mx-0 glass-panel-light rounded-[2rem] mt-4">
            <div className="w-16 h-16 bg-[#FDFBF4] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h4 className="font-geist text-lg font-semibold text-black mb-2">No Stories Found</h4>
            <p className="text-black/50 text-sm max-w-xs mx-auto">Try exploring different search terms.</p>
            <button 
              onClick={() => { setSearchQuery(''); }}
              className="btn-premium-black mt-6 px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* ─── Story Viewer Modal ─── */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-300">
          
          {/* Close Area (clicking outside) */}
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setActiveStory(null)} />
          
          {/* Close Button */}
          <button 
            onClick={() => setActiveStory(null)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Story Card */}
          <div className="relative w-full h-full sm:max-w-md sm:h-[85vh] sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col z-10 bg-black animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            
            <img 
              src={activeStory.image} 
              alt={activeStory.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/50 to-slate-900/20" />

            {/* Simulated Story Progress Bar */}
            <div className="absolute top-4 inset-x-4 flex gap-1 z-10">
              <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full animate-[progress_5s_linear]" />
              </div>
            </div>
            
            {/* Header info (Provider/Category) */}
            <div className="absolute top-8 left-4 flex items-center gap-2 z-10">
               <div className="w-8 h-8 rounded-full border border-white/50 overflow-hidden bg-black/90 flex-shrink-0">
                  <img src={activeStory.image} className="w-full h-full object-cover" alt="" />
               </div>
               <span className="text-white text-sm font-semibold shadow-sm">{activeStory.category}</span>
               <span className="text-white/60 text-xs">• 2h</span>
            </div>
            
            {/* Content Bottom */}
            <div className="relative z-10 p-6 mt-auto flex flex-col pb-10 sm:pb-8">
              {activeStory.badge && (
                <span className="inline-block self-start px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-lg mb-3">
                  {activeStory.badge}
                </span>
              )}
              
              <h2 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                {activeStory.title}
              </h2>
              
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{activeStory.location}</span>
                <span className="mx-2 text-white/40">•</span>
                <span className="text-[#D4AF37] font-bold">★ {activeStory.rating.toFixed(1)}</span>
              </div>
              
              <p className="text-white/80 text-sm line-clamp-3 mb-8">
                {activeStory.description}
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setActiveStory(null);
                    onNavigate('event-details', activeStory.id);
                  }} 
                  className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button 
                  onClick={() => {
                    setActiveStory(null);
                    onNavigate('booking', activeStory.title);
                  }} 
                  className="btn-premium-gold flex-1 py-3.5 rounded-full font-bold transition-all cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

