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
    <section id="events-grid" className="relative px-3 sm:px-6 lg:px-8 py-10 sm:py-16 text-slate-900 overflow-hidden font-geist">
      {/* ── Professional Section Glass Blur Background Layers ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-amber-300/35 via-orange-300/25 to-yellow-200/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/30 via-rose-200/20 to-amber-200/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-gradient-to-br from-yellow-300/20 to-orange-200/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 mix-blend-overlay" />

      <div className="w-full max-w-full px-4 sm:px-8 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-orange-200/80 shadow-xs animate-float backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              Curated Experiences 2026
            </div>

            <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.15]">
              Book{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
                Events
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal max-w-xl mx-auto">
              Explore handpicked luxury weddings, concerts, gourmet dining, and corporate galas with verified production teams.
            </p>
          </div>
        )}

        {/* ── Glass Dashboard Controls ── */}
        <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/60 border border-white/90 shadow-xl shadow-slate-200/50 backdrop-blur-3xl mb-8 sm:mb-12 flex flex-col gap-4">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">

            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search events, locations, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-white/80 backdrop-blur-2xl border border-slate-200/90 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
              />
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3 sm:left-3.5 top-3 sm:top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Results Count & Layout Switcher */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-3">
              <span className="text-[11px] sm:text-xs font-medium text-slate-600 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/80 whitespace-nowrap shadow-xs">
                Showing <strong className="text-orange-600 font-semibold">{filteredEvents.length}</strong> events
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-2 pb-1 border-t border-white/60">
            {categories.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer backdrop-blur-md ${active
                      ? 'bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-400/40'
                      : 'bg-orange-50/40 hover:bg-orange-100/60 text-slate-700 hover:text-orange-600 border border-orange-200/60 hover:border-orange-400/60 shadow-sm backdrop-blur-md'
                    }`}
                >
                  {cat === 'All' ? '✨ All Events' : cat}
                </button>
              )
            })}
          </div>

        </div>

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white/60 border border-white/80 rounded-2xl backdrop-blur-2xl shadow-md">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-orange-100/80 text-orange-600 flex items-center justify-center border border-orange-200">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-geist text-lg font-semibold text-slate-900 mb-1">No matching events found</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-5">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-orange-500/20 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Mobile 2-Column Responsive Glass Cards Grid ── */}
        {loading ? (
          <LogoLoader text="Loading Experiences..." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onNavigate('event-details', event.id)}
                className="group relative w-full h-[240px] sm:h-[300px] bg-white rounded-[2rem] border border-slate-200/90 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-shadow duration-500 overflow-hidden cursor-pointer z-20"
              >
                {/* Image Section - Expands using insets for 60fps smooth animation */}
                <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 right-1.5 sm:right-2 bottom-[110px] sm:bottom-[125px] group-hover:top-0 group-hover:left-0 group-hover:right-0 group-hover:bottom-0 rounded-2xl sm:rounded-[1.5rem] group-hover:rounded-[2rem] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Top Right Heart Favorite Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added ${event.title} to favorites!`);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/40 hover:bg-slate-950/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer z-30"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Dark Glass Overlay that fades in */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                </div>

                {/* Content Section - Static layout at the bottom, just color fades */}
                <div className="absolute bottom-0 left-0 right-0 h-[110px] sm:h-[125px] px-3 sm:px-4 pb-3 sm:pb-4 pt-3 sm:pt-4 flex flex-col justify-between z-20 pointer-events-none">
                  
                  <div className="text-left">
                    {/* Category & Badge */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 group-hover:text-orange-400 transition-colors duration-500 truncate max-w-[90px] sm:max-w-none">
                        {event.category}
                      </span>
                      {event.badge && (
                        <>
                          <span className="text-slate-300 group-hover:text-white/30 transition-colors duration-500 text-[8px]">•</span>
                          <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 group-hover:text-white/90 group-hover:bg-white/10 px-1.5 py-0.5 rounded-md truncate max-w-[70px] sm:max-w-[120px] transition-colors duration-500">
                            {event.badge}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="font-jakarta text-sm sm:text-base font-bold text-slate-900 group-hover:text-white transition-colors duration-500 leading-snug line-clamp-1 mb-1">
                      {event.title}
                    </h4>
                  </div>

                  {/* Buttons/Footer container - absolute stacking for perfect crossfade */}
                  <div className="relative h-8 sm:h-9 mt-1 pointer-events-auto">
                    
                    {/* Default State Buttons */}
                    <div className="absolute inset-0 flex flex-row gap-2 opacity-100 group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('event-details', event.id); }}
                        className="flex-1 rounded-xl border border-slate-200 hover:border-orange-500/50 hover:bg-orange-50/30 text-slate-700 hover:text-orange-600 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('booking', event.title); }}
                        className="flex-1 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50/80 to-amber-50/80 backdrop-blur-md hover:from-orange-100 hover:to-amber-100 text-orange-700 hover:text-orange-800 font-semibold text-xs transition-all shadow-sm cursor-pointer"
                      >
                        Book
                      </button>
                    </div>

                    {/* Hover Glassmorphic Action Buttons */}
                    <div className="absolute inset-0 flex flex-row gap-2 opacity-0 scale-105 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('event-details', event.id); }}
                        className="flex-1 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('booking', event.title); }}
                        className="flex-1 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Book
                      </button>
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
