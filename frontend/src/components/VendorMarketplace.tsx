import { useState, useRef, useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import type { PageType } from '../App'
import LogoLoader from './LogoLoader'

interface VendorMarketplaceProps {
  onNavigate: (page: PageType, context?: string | number) => void
}

// Dynamic Related Icons based on Event Category & Title
const getTraditionalIcon = (title: string, category: string, className = "w-6 h-6 text-[#E86F32] transition-transform duration-300 group-hover:scale-110") => {
  const normTitle = (title || '').toLowerCase()
  const normCategory = (category || '').toLowerCase()

  // 1. Birthday
  if (normTitle.includes('birthday')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M8 4v2M16 4v2" />
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M3 15h18M3 19h18" />
        <path d="M7 6c0-1 1-2 2-2s2 1 2 2" />
        <path d="M13 6c0-1 1-2 2-2s2 1 2 2" />
      </svg>
    )
  }

  // 2. Wedding / Engagement / Proposal / Anniversary
  if (normTitle.includes('wedding') || normTitle.includes('engagement') || normTitle.includes('proposal') || normTitle.includes('anniversary')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }

  // 3. Baby Shower / Naming Ceremony
  if (normTitle.includes('baby') || normTitle.includes('naming') || normTitle.includes('shower')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10a8 8 0 0 1 16 0v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" />
        <path d="M12 2v4M8 6h8" />
        <circle cx="8" cy="14" r="2" />
        <circle cx="16" cy="14" r="2" />
      </svg>
    )
  }

  // 4. Housewarming
  if (normTitle.includes('housewarming') || normTitle.includes('home')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }

  // 5. Corporate / Educational / Seminars
  if (normCategory.includes('corporate') || normTitle.includes('corporate') || normTitle.includes('educational') || normTitle.includes('seminar')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l5 5 5-5" />
      </svg>
    )
  }

  // 6. Concert / Music / Pre Release / Public Events
  if (normCategory.includes('concert') || normTitle.includes('concert') || normTitle.includes('release') || normTitle.includes('public')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" />
      </svg>
    )
  }

  // 7. Surprise
  if (normTitle.includes('surprise')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    )
  }

  // 8. Festival / Decor
  if (normCategory.includes('decor') || normTitle.includes('festival') || normTitle.includes('decor')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18M12 3l3 4.5M12 21l-3-4.5M3 12l4.5 3M21 12l-4.5-3" />
      </svg>
    )
  }

  // Fallback traditional Indian Motif
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 3a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  )
}

export default function VendorMarketplace({ onNavigate }: VendorMarketplaceProps) {
  const { events: featuredEvents, loading } = useEvents()
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  
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

  const activeStory = activeStoryIndex !== null ? featuredEvents[activeStoryIndex] : null
  const SLIDE_DURATION = 4000
  const TOTAL_SLIDES = 3

  // Auto advance slides in the active story
  useEffect(() => {
    if (activeStoryIndex === null) return

    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => {
        if (prev < TOTAL_SLIDES - 1) {
          return prev + 1
        } else {
          // Go to next story
          setActiveStoryIndex((currStory) => {
            if (currStory === null) return null
            return currStory < featuredEvents.length - 1 ? currStory + 1 : 0
          })
          setActiveSlideIndex(0)
          return 0
        }
      })
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [activeStoryIndex, featuredEvents.length])

  // Reset slide index when active story changes
  useEffect(() => {
    setActiveSlideIndex(0)
  }, [activeStoryIndex])

  // Handle tap/click navigation on the story modal (Left vs Right tap zones)
  const handleStoryTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    
    if (x < width * 0.35) {
      // Tap Left
      if (activeSlideIndex > 0) {
        setActiveSlideIndex((prev) => prev - 1)
      } else {
        setActiveStoryIndex((curr) => {
          if (curr === null) return null
          return curr > 0 ? curr - 1 : featuredEvents.length - 1
        })
      }
    } else {
      // Tap Right
      if (activeSlideIndex < TOTAL_SLIDES - 1) {
        setActiveSlideIndex((prev) => prev + 1)
      } else {
        setActiveStoryIndex((curr) => {
          if (curr === null) return null
          return curr < featuredEvents.length - 1 ? curr + 1 : 0
        })
      }
    }
  }

  return (
    <section id="vendors" className="relative bg-[#FFF8F3] text-black font-jakarta pt-0 pb-5 sm:pt-0 sm:pb-8 overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#FFD2A8]/20 via-slate-100/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* ─── Stories Area ─── */}
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        
        {/* Stories Horizontal Scroll */}
        {loading ? (
          <LogoLoader text="Curating events..." />
        ) : (
          <div className="relative group/nav">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-5 pb-3 w-full items-start [&::-webkit-scrollbar]:hidden scrollbar-none"
            >
              {featuredEvents.map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => setActiveStoryIndex(index)}
                  className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group snap-center w-[54px] sm:w-[72px]"
                >
                  {/* Story Ring */}
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FF9F43] via-[#E86F32] to-[#FFD2A8] shadow-xs flex-shrink-0 transition-all duration-300 group-hover:shadow-md">
                    <div className="w-full h-full rounded-full border-[1px] sm:border-[1.5px] border-[#FFF8F3] flex items-center justify-center bg-white overflow-hidden transition-all duration-300">
                      {getTraditionalIcon(event.title, event.category, "w-5 h-5 sm:w-6 sm:h-6 text-[#E86F32] transition-transform duration-300 group-hover:scale-110")}
                    </div>
                  </div>
                  {/* Event Name */}
                  <span className="text-[8.5px] sm:text-[10px] text-black/70 font-semibold text-center leading-tight line-clamp-1 w-full px-0.5 group-hover:text-[#E86F32] transition-colors font-jakarta">
                    {event.title}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={scrollLeft}
              className="hidden lg:flex absolute left-0 top-[20px] sm:top-[36px] -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white/95 backdrop-blur-md rounded-full shadow border border-black/10 items-center justify-center text-black hover:text-[#E86F32] hover:border-[#E86F32]/50 hover:scale-105 opacity-0 group-hover/nav:opacity-100 transition-all z-10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="hidden lg:flex absolute right-0 top-[20px] sm:top-[36px] -translate-y-1/2 translate-x-4 w-8 h-8 bg-white/95 backdrop-blur-md rounded-full shadow border border-black/10 items-center justify-center text-black hover:text-[#E86F32] hover:border-[#E86F32]/50 hover:scale-105 opacity-0 group-hover/nav:opacity-100 transition-all z-10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ─── High-Fidelity Status Viewer Modal ─── */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-300">
          {/* Inject Dynamic Keyframe for Smooth Slide Autoplay Progress */}
          <style>{`
            @keyframes storyProgress {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
          `}</style>
          
          {/* Click background to close */}
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setActiveStoryIndex(null)} />
          
          {/* Close Button */}
          <button 
            onClick={() => setActiveStoryIndex(null)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close stories"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Status Slide-Deck Card */}
          <div className="relative w-full h-full sm:max-w-md sm:h-[85vh] sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col z-10 bg-black animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            
            {/* Visual Slide Background */}
            <div className="absolute inset-0 z-0">
              <img 
                src={activeStory.image} 
                alt={activeStory.title} 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  activeSlideIndex === 1 ? 'blur-md scale-110 opacity-70' : 'opacity-85'
                }`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/30" />
            </div>

            {/* Simulated Multi-Segment Status Progress Bar */}
            <div className="absolute top-4 inset-x-4 flex gap-1.5 z-40">
              {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
                <div 
                  key={idx} 
                  className="relative h-1 flex-1 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden"
                >
                  {/* Completed segment */}
                  {idx < activeSlideIndex && (
                    <div className="absolute inset-0 bg-white" />
                  )}
                  {/* Active segment with progress animation */}
                  {idx === activeSlideIndex && (
                    <div 
                      key={`${activeStoryIndex}-${activeSlideIndex}`}
                      className="absolute inset-0 bg-white origin-left"
                      style={{
                        animation: `storyProgress ${SLIDE_DURATION}ms linear forwards`
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Header Identity Badge (Category & Icon) */}
            <div className="absolute top-8 left-4 flex items-center gap-2.5 z-40 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
               <div className="w-5.5 h-5.5 rounded-full bg-[#FFFDF9]/15 flex items-center justify-center flex-shrink-0">
                  {getTraditionalIcon(activeStory.title, activeStory.category, "w-4.5 h-4.5 text-[#FFB380]")}
               </div>
               <span className="text-white text-xs font-bold tracking-wide shadow-sm font-jakarta">{activeStory.category}</span>
               <span className="text-[#E86F32] text-[10px] font-bold font-jakarta">• Live status</span>
            </div>

            {/* Swipe/Tap zones (Left 35% goes back, Right 65% goes next) */}
            <div 
              className="absolute inset-0 z-20 cursor-pointer" 
              onClick={handleStoryTap} 
            />

            {/* Slide-specific Layouts */}
            <div className="relative z-30 p-6 mt-auto flex flex-col pb-10 sm:pb-8 h-full pt-20 pointer-events-none select-none">
              
              {/* SLIDE 1: Introductory Event Overview */}
              {activeSlideIndex === 0 && (
                <div className="mt-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <span className="inline-block self-start px-2.5 py-0.5 bg-[#E86F32] text-white text-[9px] font-extrabold uppercase tracking-widest rounded mb-3 font-jakarta">
                    ★ {activeStory.rating.toFixed(1)} / 5.0
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight drop-shadow-md font-jakarta">
                    {activeStory.title}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 font-medium line-clamp-4 font-jakarta">
                    {activeStory.description}
                  </p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 font-jakarta">
                    <span>Tap Right for Details</span>
                    <svg className="w-3.5 h-3.5 text-[#E86F32] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              )}

              {/* SLIDE 2: Features / Highlights Display */}
              {activeSlideIndex === 1 && (
                <div className="mt-auto flex flex-col h-full justify-end animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-jakarta">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E86F32] shadow-[0_0_8px_#E86F32]" />
                    Event Execution Features
                  </h3>
                  
                  <div className="flex flex-col gap-2 mb-6">
                    {activeStory.highlights && activeStory.highlights.length > 0 ? (
                      activeStory.highlights.slice(0, 3).map((highlight, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#E86F32]/20 border border-[#E86F32]/40 flex items-center justify-center text-[#E86F32] flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white text-xs font-semibold tracking-wide font-jakarta">{highlight}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl">
                        <span className="text-white/60 text-xs font-jakarta">Custom premium design and planning.</span>
                      </div>
                    )}
                  </div>

                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 font-jakarta">
                    <span>Tap Right for Booking</span>
                    <svg className="w-3.5 h-3.5 text-[#E86F32] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              )}

              {/* SLIDE 3: Specs & Direct Booking Call-To-Action */}
              {activeSlideIndex === 2 && (
                <div className="mt-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
                  <h3 className="text-lg font-bold text-white mb-3 font-jakarta">Booking Details</h3>
                  
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    <div className="p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <p className="text-[9px] text-white/50 uppercase font-extrabold tracking-wider mb-0.5 font-jakarta">Capacity</p>
                      <p className="text-xs font-bold text-white truncate font-jakarta">{activeStory.capacity || "Flexible"}</p>
                    </div>
                    <div className="p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <p className="text-[9px] text-white/50 uppercase font-extrabold tracking-wider mb-0.5 font-jakarta">Duration</p>
                      <p className="text-xs font-bold text-white truncate font-jakarta">{activeStory.duration || "Customizable"}</p>
                    </div>
                    <div className="p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl col-span-2">
                      <p className="text-[9px] text-white/50 uppercase font-extrabold tracking-wider mb-0.5 font-jakarta">Venue Location</p>
                      <p className="text-xs font-bold text-[#E86F32] truncate font-jakarta">{activeStory.location}</p>
                    </div>
                  </div>
                  
                  {/* Action buttons (Must be pointer-events-auto to capture clicks inside absolute wrapper) */}
                  <div className="flex gap-2.5 pointer-events-auto">
                    <button 
                      onClick={() => {
                        setActiveStoryIndex(null);
                        onNavigate('event-details', activeStory.id);
                      }} 
                      className="flex-1 py-3 bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white rounded-full font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer font-jakarta"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => {
                        setActiveStoryIndex(null);
                        onNavigate('booking', activeStory.title);
                      }} 
                      className="flex-1 py-3 bg-[#E86F32] hover:bg-[#D96129] text-white rounded-full font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer font-jakarta shadow-[0_6px_20px_rgba(232,111,50,0.25)]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
