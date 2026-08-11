import { useState, useMemo } from 'react'
import { useEvents } from '../hooks/useEvents'
import type { PageType } from '../App'
import LogoLoader from './LogoLoader'

interface EventsGridProps {
  onNavigate: (page: PageType, context?: string | number) => void
  hideHeader?: boolean
}

export default function EventsGrid({ onNavigate, hideHeader }: EventsGridProps) {
  const { events: featuredEvents, loading } = useEvents()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

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
    <section id="events-grid" className="w-full bg-transparent font-geist relative px-3 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden">
      {/* Subtle warm ambient */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-white/40 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        {!hideHeader && (
          <div className="mb-10 sm:mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
              <div>
                <div className="pill-gold mb-4 text-[#FF7518] bg-[#FF7518]/10 border-[#FF7518]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7518] animate-pulse-dot" />
                  Curated Experiences 2026
                </div>
                <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black leading-[1.1]">
                  Book{' '}
                  <span className="text-[#FF7518]">Events</span>
                </h2>
              </div>
              <p className="text-black text-sm leading-relaxed font-normal max-w-xs sm:text-right">
                Handpicked luxury weddings, concerts, gourmet dining and corporate galas.
              </p>
            </div>
          </div>
        )}

        {/* ── Controls Row — inline, no heavy box ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">

          {/* Search */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Search events, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white/50 backdrop-blur-sm border border-black/20 rounded-xl text-sm text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] transition-all shadow-sm"
            />
            <svg className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black">
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-[#FF7518] shadow-md shadow-black/20'
                      : 'bg-white/50 backdrop-blur-sm text-black hover:text-[#FF7518] border border-black/20 hover:border-[#FF7518]/50 shadow-sm'
                  }`}
                >
                  {cat === 'All' ? '✦ All Events' : cat}
                </button>
              )
            })}
          </div>

          {/* Count badge */}
          <span className="text-xs font-semibold text-black bg-white/50 backdrop-blur-sm border border-black/20 px-3 py-1.5 rounded-xl whitespace-nowrap flex-shrink-0 shadow-sm hidden sm:block">
            {filteredEvents.length} events
          </span>
        </div>

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm border border-black/20 rounded-3xl shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFFFFF] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-geist text-lg font-semibold text-black mb-1">No events found</h3>
            <p className="text-black/50 text-sm max-w-sm mx-auto mb-5">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
              className="btn-premium-black px-5 py-2 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Cards Grid ── */}
        {loading ? (
          <LogoLoader text="Loading Experiences..." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filteredEvents.map((event) => (
              <div key={event.id} className="h-full">
                <div
                  className="group relative rounded-[1.5rem] overflow-hidden flex flex-col cursor-pointer h-[320px] sm:h-[380px] shadow-lg border border-black/5"
                  onClick={() => onNavigate('event-details', event.id)}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#FF7518] text-white shadow-sm">
                      {event.category}
                    </span>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); alert(`Added ${event.title} to favorites!`) }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#FF7518] flex items-center justify-center transition-all shadow-sm cursor-pointer z-10"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end h-full justify-end">
                    {event.badge && (
                      <span className="inline-block self-start text-[10px] font-bold text-white bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-md mb-2">
                        {event.badge}
                      </span>
                    )}
                    <h4 className="font-geist text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 mb-2 group-hover:text-[#FF7518] transition-colors duration-300">
                      {event.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 text-white/90">
                        <svg className="w-4 h-4 text-[#FF7518]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-xs font-medium truncate max-w-[120px]">{event.location}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onNavigate('booking', event.title) }}
                          className="bg-white hover:bg-[#FF7518] text-black hover:text-white px-5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
