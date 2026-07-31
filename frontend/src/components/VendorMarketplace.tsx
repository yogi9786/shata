import { useState, useEffect, useRef } from 'react'
import { featuredEvents } from '../data/vendors'

type Category = 'All' | 'Weddings' | 'Concerts' | 'Catering' | 'Photography' | 'Corporate' | 'Decor' | 'Galas'

export default function VendorMarketplace() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = featuredEvents.filter((v) => {
    const matchCat = activeCategory === 'All' || v.category.toLowerCase() === activeCategory.toLowerCase()
    const matchSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const categories: Category[] = ['All', 'Weddings', 'Catering', 'Photography', 'Concerts', 'Corporate', 'Decor', 'Galas']

  return (
    <section id="vendors" className="px-4 sm:px-6 py-10 sm:py-16 bg-white/10 backdrop-blur-md border-y border-white/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden text-slate-900 font-geist">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 block mb-2">
              Book Online
            </span>
            <h2 className="font-geist text-3xl sm:text-4xl font-medium text-slate-900 tracking-tight leading-[1.15]">
              Verified Event Partners &amp; Production
            </h2>
          </div>
          {/* search */}
          <div className="mt-5 md:mt-0 relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search vendors &amp; locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/90 backdrop-blur-lg border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 shadow-sm transition-all"
            />
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* category tabs — glass style */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap ${activeCategory === cat
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-orange-300 shadow-xs'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* vendor cards grid - Mobile 2 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7">
          {filteredEvents.map((event, index) => (
            <EventMarketCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-sm">
            <svg className="w-10 h-10 text-slate-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-geist text-base font-semibold text-slate-900">No Services Found</h4>
            <p className="text-slate-500 text-xs mt-1">Try searching for other terms or choose another service tab.</p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── Individual Event Card with Translucent Glass Blur Background ─── */

interface EventMarketCardProps {
  event: (typeof featuredEvents)[number]
  index: number
}

function EventMarketCard({ event, index }: EventMarketCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-white/45 backdrop-blur-2xl border border-white/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:border-orange-300 transition-all duration-500 flex flex-col group glass-shine-light"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'scale(1) translateY(0)'
          : 'scale(0.9) translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {/* Image */}
      <div className="relative h-36 sm:h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

        {/* Tag badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-slate-900/85 backdrop-blur-md text-amber-300 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-semibold border border-amber-500/20 truncate max-w-[60%]">
          {event.tag}
        </div>

        {/* Rating badge */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold text-slate-900 flex items-center gap-1 shadow-sm">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{event.rating}</span>
        </div>
      </div>

      {/* Content Translucent Glass Body */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between gap-3 sm:gap-4 bg-white/50 backdrop-blur-2xl border-t border-white/60">
        <div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-orange-600 mb-1.5 truncate">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
          <h4 className="font-geist text-xs sm:text-base font-semibold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
            {event.title}
          </h4>
        </div>

        {/* Footer */}
        <div className="pt-2 sm:pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div>
            <span className="text-[8px] sm:text-[10px] text-slate-400 block uppercase font-semibold">Pricing</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">{event.price}</span>
          </div>
          <button className="w-full sm:w-auto px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-xl text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shadow-sm">
            Book Event
          </button>
        </div>
      </div>
    </div>
  )
}
