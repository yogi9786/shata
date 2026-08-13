import { useState, useMemo, useRef, useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import type { PageType } from '../App'
import LogoLoader from './LogoLoader'

// Import the specific local images for mapping
import weddingImg from '../assets/wedding.png'
import concertImg from '../assets/concert.png'
import birthdayImg from '../assets/birthday.png'

interface EventsGridProps {
  onNavigate: (page: PageType, context?: string | number) => void
  hideHeader?: boolean
}

const getOverrideImage = (category: string, originalImage: string) => {
  const cat = category.toLowerCase()
  if (cat.includes('wedding')) return weddingImg
  if (cat.includes('concert') || cat.includes('festival') || cat.includes('music')) return concertImg
  if (cat.includes('birthday') || cat.includes('party')) return birthdayImg
  return originalImage
}

export default function EventsGrid({ onNavigate, hideHeader }: EventsGridProps) {
  const { events: featuredEvents, loading } = useEvents()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<number | null>(null)

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }

  const startScroll = (direction: 'left' | 'right', speed: number) => {
    stopScroll()
    const scroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += direction === 'right' ? speed : -speed
        scrollIntervalRef.current = requestAnimationFrame(scroll)
      }
    }
    scrollIntervalRef.current = requestAnimationFrame(scroll)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return
    const { left, width } = container.getBoundingClientRect()
    const x = e.clientX - left
    const threshold = 300 // increased threshold for easier hover scrolling

    if (x > width - threshold) {
      // Mouse near right edge
      const speed = Math.max(2, (x - (width - threshold)) * 0.15)
      startScroll('right', speed)
    } else if (x < threshold) {
      // Mouse near left edge
      const speed = Math.max(2, (threshold - x) * 0.15)
      startScroll('left', speed)
    } else {
      stopScroll()
    }
  }

  const handleMouseLeave = () => {
    stopScroll()
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => stopScroll()
  }, [])

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(featuredEvents.map((item) => item.category)))]
  }, [featuredEvents])

  const filteredEvents = useMemo(() => {
    return featuredEvents.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery, featuredEvents])

  return (
    <section id="events-grid" className="w-full bg-white font-geist relative py-12 sm:py-20 overflow-hidden">
      {/* Light subtle grid background pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Elegant Hero Matching Colors - Subtle ambient glowing lights (Lighter than before) */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-[#FF7518]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        {!hideHeader && (
          <div className="mb-10 sm:mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
              <div>
                <div className="text-gray-500 font-semibold text-sm uppercase tracking-widest mb-3">
                  Curated Experiences 2026
                </div>
                <h2 className="font-geist text-3xl sm:text-5xl lg:text-[40px] font-medium leading-[1.1] mb-3 sm:mb-5 lg:mb-3 tracking-tight transition-colors duration-700 text-gray-900">
                  Book Events
                </h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed font-medium max-w-xs sm:text-right">
                Handpicked luxury weddings, concerts, gourmet dining and corporate galas.
              </p>
            </div>
          </div>
        )}

        {/* ── Controls Row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {/* Search */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Search events, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-0 transition-all shadow-sm"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 border ${
                    isActive
                      ? 'bg-gray-900 text-white border-transparent shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 shadow-sm'
                  }`}
                >
                  {cat === 'All' ? 'All Events' : cat}
                </button>
              )
            })}
          </div>

          {/* Count badge */}
          <span className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 shadow-sm hidden sm:block">
            {filteredEvents.length} events
          </span>
        </div>

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm border border-black/10 rounded-3xl shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFFFFF] text-[#FF7518] flex items-center justify-center border border-[#FF7518]/30">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-geist text-lg font-semibold text-black mb-1">No events found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-5">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
              className="bg-gradient-to-r from-[#FF7518] to-[#ff9248] hover:shadow-lg hover:shadow-[#FF7518]/30 text-white px-5 py-2 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Cards Grid (Auto-scroll on Desktop & Mobile) ── */}
        {loading ? (
          <LogoLoader text="Loading Experiences..." />
        ) : (
          <div className="relative -mx-4 sm:mx-0">
            <div 
              ref={scrollContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 sm:px-4 snap-x snap-mandatory scroll-smooth w-full"
            >
              {filteredEvents.map((event) => {
                const imageSrc = getOverrideImage(event.category, event.image);
                return (
                <div key={event.id} className="w-[300px] sm:w-[340px] lg:w-[380px] shrink-0 snap-center">
                  <div
                    className="group bg-white rounded-2xl border border-gray-300 flex flex-col cursor-pointer h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-1 overflow-hidden"
                    onClick={() => onNavigate('event-details', event.id)}
                  >
                    <div className="h-[180px] sm:h-[220px] w-full relative bg-gray-50 border-b border-gray-300 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded text-[11px] font-semibold uppercase tracking-wide bg-white/95 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 bg-white">
                      <h4 className="font-geist text-xl font-semibold text-gray-900 leading-tight line-clamp-2 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-[15px] text-gray-700 line-clamp-3 mb-8 font-medium leading-relaxed">
                        {event.description || "Industry 4.0 is a revolutionary approach to manufacturing that integrates cutting edge technology"}
                      </p>
                      
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('booking', event.title) }}
                        className="mt-auto w-fit bg-transparent hover:bg-gray-50 text-[#002B5B] px-5 py-2.5 rounded-[14px] border border-gray-400 group-hover:border-[#002B5B] font-semibold text-[15px] transition-all flex items-center gap-1.5"
                      >
                        Book Event
                        <svg className="w-4 h-4 text-[#002B5B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

