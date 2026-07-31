import { useState, useMemo } from 'react'
import { featuredEvents, type EventItem } from '../data/vendors'

type CategoryFilter = 'All' | 'Weddings' | 'Concerts' | 'Catering' | 'Photography' | 'Corporate' | 'Decor' | 'Galas'

export default function EventsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

  // Booking modal form state
  const [guestCount, setGuestCount] = useState<number>(200)
  const [eventDate, setEventDate] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false)

  const categories: CategoryFilter[] = [
    'All',
    'Weddings',
    'Concerts',
    'Catering',
    'Photography',
    'Corporate',
    'Decor',
    'Galas'
  ]

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
  }, [selectedCategory, searchQuery])

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitted(true)
    setTimeout(() => {
      setBookingSubmitted(false)
      setSelectedEvent(null)
      setUserName('')
      setUserEmail('')
    }, 2800)
  }

  return (
    <section id="events-grid" className="relative px-3 sm:px-6 lg:px-8 py-10 sm:py-16 bg-slate-50/95 backdrop-blur-2xl border-y border-white/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)] text-slate-900 overflow-hidden font-geist">
      {/* ── Professional Section Glass Blur Background Layers ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-amber-300/35 via-orange-300/25 to-yellow-200/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/30 via-rose-200/20 to-amber-200/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-gradient-to-br from-yellow-300/20 to-orange-200/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 mix-blend-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-orange-200/80 shadow-xs animate-float backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            Curated Experiences 2026
          </div>

          <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.15]">
            Unrivaled Events &amp;{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
              Glassmorphic Grid
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal max-w-xl mx-auto">
            Explore handpicked luxury weddings, concerts, gourmet dining, and corporate galas with verified production teams.
          </p>
        </div>

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
                      : 'bg-white/70 hover:bg-white text-slate-700 hover:text-slate-900 border border-white/80 hover:border-orange-300 shadow-xs'
                    }`}
                >
                  {cat === 'All' ? '✨ All Events' : cat}
                </button>
              )
            })}
          </div>

        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="group relative rounded-2xl sm:rounded-3xl bg-white/45 border border-white/80 hover:border-orange-400/60 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col overflow-hidden hover:cursor-[url('/src/assets/logo.svg'),_pointer] glass-shine-light"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden w-full bg-slate-900 h-36 sm:h-56">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-slate-950/30" />

                {/* Top Floating Glass Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 gap-1">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/80 backdrop-blur-md text-slate-900 border border-white/90 shadow-sm">
                    {event.category}
                  </span>

                  {event.badge && (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white shadow-md border border-orange-300/40 truncate max-w-[50%]">
                      {event.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Stats Pills over image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[10px] sm:text-xs text-white z-10 gap-1">
                  {/* Rating Pill */}
                  <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-sm">
                    <span className="text-amber-400 text-xs sm:text-sm">★</span>
                    <span className="font-semibold text-white text-[10px] sm:text-xs">{event.rating.toFixed(2)}</span>
                  </div>

                  {/* Location Pill */}
                  <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-sm truncate max-w-[65%]">
                    <svg className="w-3 h-3 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium text-slate-200 text-[9px] sm:text-[11px] truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Translucent Glass Body */}
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

                {/* Card Footer */}
                <div className="pt-2 sm:pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <span className="text-[8px] sm:text-[9px] uppercase font-semibold tracking-wider text-slate-400 block">
                      PRICING
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                      {event.price}
                    </span>
                  </div>

                  <button className="w-full sm:w-auto px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold text-[10px] sm:text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-1 transition-all group-hover:scale-102 cursor-pointer">
                    Book Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Glassmorphic Quick View Modal ── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-white/90 border border-white/90 rounded-3xl shadow-2xl backdrop-blur-3xl text-slate-900 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-300">

            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 flex items-center justify-center border border-slate-200 shadow-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">

              {/* Left Column - Image & Overview */}
              <div className="md:col-span-6 relative bg-slate-950 flex flex-col">
                <div className="relative h-56 md:h-full min-h-[220px]">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-600 text-white shadow-md mb-2 inline-block">
                      {selectedEvent.category}
                    </span>
                    <h3 className="font-geist text-xl sm:text-2xl font-semibold text-white leading-tight mb-1.5">
                      {selectedEvent.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        ★ {selectedEvent.rating} ({selectedEvent.reviewsCount} reviews)
                      </span>
                      <span>📍 {selectedEvent.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details & Booking Form */}
              <div className="md:col-span-6 p-5 sm:p-8 flex flex-col justify-between gap-5 bg-white/50 backdrop-blur-2xl">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Organizer</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{selectedEvent.organizer || 'Verified Partner'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Estimated Cost</span>
                      <span className="text-lg sm:text-xl font-bold text-orange-600">{selectedEvent.price}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                    {selectedEvent.fullDescription || selectedEvent.description}
                  </p>

                  {/* Highlights Grid */}
                  {selectedEvent.highlights && (
                    <div className="mb-5">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-orange-600 mb-2">
                        Event Highlights &amp; Production
                      </h4>
                      <div className="grid grid-cols-2 gap-1.5">
                        {selectedEvent.highlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 bg-white/60 backdrop-blur-md p-2 rounded-xl border border-white/80">
                            <span className="text-orange-600 font-bold">✓</span>
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Quote Calculator Form */}
                  <form onSubmit={handleBookingSubmit} className="p-3.5 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 flex flex-col gap-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                      <span>Request Booking Quote</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">⚡ Instant Response</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Estimated Guests</label>
                        <input
                          type="number"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 bg-white/80 border border-slate-300/80 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                          min={10}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Target Date</label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white/80 border border-slate-300/80 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/80 border border-slate-300/80 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email / Phone Number"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/80 border border-slate-300/80 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={bookingSubmitted}
                      className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {bookingSubmitted ? (
                        <span className="flex items-center gap-2 text-white">
                          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Quote Request Submitted!
                        </span>
                      ) : (
                        'Request Custom Event Quote'
                      )}
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  )
}
