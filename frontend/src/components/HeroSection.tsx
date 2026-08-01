import { useState } from 'react'
import bgTopBlue from '../assets/leaf1.png'
import bgTopBlueMobile from '../assets/Leafporteral.png'
import type { PageType } from '../App'

interface HeroSectionProps {
  scrollY: number
  progress: number
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function HeroSection({ progress, onNavigate }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Smooth scroll scale transformation (0.95 → 1.10)
  const wrapperScale = 0.95 + progress * 0.15
  const heroOpacity = Math.max(0, 1 - progress * 2.5)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const targetElement = document.getElementById('events-grid')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-0 pt-48 sm:pt-28 lg:pt-56 2xl:pt-60 pb-4 overflow-hidden bg-transparent">
      {/* ── TOP BLUE BACKGROUND IMAGE ── */}
      {/* Mobile background */}
      <img
        src={bgTopBlueMobile}
        alt="Top Background Mobile"
        className="absolute top-0 left-0 right-0 w-full h-auto object-cover object-top pointer-events-none z-0 sm:hidden"
      />
      {/* Desktop background */}
      <img
        src={bgTopBlue}
        alt="Top Background Desktop"
        className="absolute top-0 left-0 right-0 w-full hidden sm:block pointer-events-none z-0"
        style={{ height: '100vh', objectFit: 'cover', objectPosition: 'top' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* ── TOP HERO HEADER ── */}
        <div
          className="flex flex-col items-center text-center transition-all duration-300 relative z-30 mb-24 sm:mb-8 lg:mb-10 w-full px-2"
          style={{
            opacity: heroOpacity,
            willChange: 'opacity',
          }}
        >
          {/* 1. Rating Pill */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white border border-sky-200/60 shadow-xs mb-2 sm:mb-3 2xl:mb-4 lg:-mt-4 2xl:-mt-8">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
              <img className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
              <img className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" />
            </div>
            <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-semibold text-black">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-black font-bold">+24K reviews</span>
            </div>
          </div>

          {/* 2. Main Title — Refined Size (Bigger mobile, smaller desktop) */}
          <h1 className="font-geist text-[32px] sm:text-5xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black leading-[1.1] max-w-4xl mb-2 sm:mb-3">
            India's <span className="inline-block bg-white text-orange-500 font-bold px-3 py-1 rounded-xl shadow-sm border border-orange-200 text-[0.85em] align-middle -translate-y-1">No.1</span> Event<br className="hidden sm:block" />
            {' '}Booking Platform
          </h1>

          {/* Mobile Only: Book Event Glass Button */}
          <button 
            onClick={() => onNavigate('booking')}
            className="sm:hidden mt-3 mb-2 px-6 py-2.5 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 text-slate-900 font-bold text-sm shadow-sm flex items-center gap-2 active:scale-95 transition-transform cursor-pointer focus:outline-none"
          >
            Book an Event
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* 3. Floating Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-[90%] sm:max-w-2xl lg:max-w-xl bg-white p-2 pl-4 flex items-center justify-between gap-2 rounded-2xl sm:rounded-4xl border border-slate-200 shadow-xl hover:shadow-orange-500/10 transition-all text-left relative z-30 mx-auto mt-6 sm:mt-5 lg:mt-6"
          >
            <input
              type="text"
              placeholder="Search weddings, catering, concerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-black placeholder-slate-400 text-xs sm:text-sm font-normal focus:outline-none py-1.5"
            />
            <button
              type="submit"
              className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>

        {/* ── SEARCH BAR & GRID IMAGE CONTAINER ── */}
        <div
          className="relative w-full flex flex-col items-center transition-all duration-300 ease-out z-20"
          style={{
            transform: `scale(${wrapperScale})`,
            willChange: 'transform',
          }}
        >
          {/* Grid Image Behind Search Bar */}
          <div className="relative w-full sm:w-[95%] lg:w-[65vw] 2xl:w-[50vw] max-w-5xl lg:max-w-4xl 2xl:max-w-4xl mx-auto lg:rounded-2xl overflow-hidden z-10 lg:-mt-8">
            {/* Mobile / Tablet Image */}
            <img
              src={import.meta.url ? new URL('../assets/event-hero1.png', import.meta.url).href : ''}
              alt="Grid of Events Mobile"
              className="w-full h-auto object-cover object-top lg:hidden"
            />
            {/* Desktop (Landscape) Image */}
            <img
              src={import.meta.url ? new URL('../assets/event-herolanding.png', import.meta.url).href : ''}
              alt="Grid of Events Desktop"
              className="hidden lg:block w-full h-auto object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>

  )
}
