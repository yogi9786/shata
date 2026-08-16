import { useState, useMemo, useRef, useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import type { PageType } from '../App'
import LogoLoader from './LogoLoader'

// Import the specific local images for mapping
import anniversaryImg from '../assets/anniversary.png'
import babyNamingImg from '../assets/baby naming ceremony.png'
import birthday2Img from '../assets/birthday (2).png'
import corporateImg from '../assets/corporate.png'
import educationalImg from '../assets/educational events.png'
import familyFunctionsImg from '../assets/family functions.png'
import housewarmingImg from '../assets/housewarming ceremony.png'
import preReleaseImg from '../assets/pre release.png'
import proposalImg from '../assets/proposal.png'
import publicEventsImg from '../assets/public events.png'

interface EventsGridProps {
  onNavigate: (page: PageType, context?: string | number) => void
  hideHeader?: boolean
}

interface MockServiceItem {
  id: number
  title: string
  category: string
  location: string
  rating: number
  reviewsCount: number
  description: string
  image: string
  date: string
  tag?: string
}

// Custom curated listings for Photography
const photographyItems: MockServiceItem[] = [
  {
    id: 101,
    title: "Cinematic Pre-Wedding Shoot",
    category: "Photography",
    location: "Goa & Udaipur",
    rating: 4.98,
    reviewsCount: 240,
    tag: "Romance & Art",
    date: "2025-02-14",
    description: "Capture your love story with breathtaking cinematic videos and premium beachfront portraiture.",
    image: proposalImg,
  },
  {
    id: 102,
    title: "Premium Wedding Photography",
    category: "Photography",
    location: "Pan-India Coverage",
    rating: 4.99,
    reviewsCount: 512,
    tag: "Eternal Memories",
    date: "2025-03-20",
    description: "High-end traditional and candid coverage with custom luxury photo albums and cinematic trailers.",
    image: familyFunctionsImg,
  },
  {
    id: 103,
    title: "Corporate Event Coverage",
    category: "Photography",
    location: "Metro Cities",
    rating: 4.91,
    reviewsCount: 88,
    tag: "Professional AV",
    date: "2025-04-10",
    description: "High-definition multi-camera live streaming, highlight reels, and professional delegate portraits.",
    image: corporateImg,
  }
]

// Custom curated listings for Catering
const cateringItems: MockServiceItem[] = [
  {
    id: 201,
    title: "Royal Rajputana Buffet",
    category: "Catering",
    location: "Rajasthan & Delhi NCR",
    rating: 4.99,
    reviewsCount: 310,
    tag: "Heritage Feast",
    date: "2025-05-15",
    description: "Experience authentic royal heritage delicacies prepared by master khansamas.",
    image: anniversaryImg,
  },
  {
    id: 202,
    title: "Gourmet Live Food Counters",
    category: "Catering",
    location: "Pan-India Coverage",
    rating: 4.94,
    reviewsCount: 175,
    tag: "Interactive Dining",
    date: "2025-06-01",
    description: "Global fusion stations, live teppanyaki, wood-fired artisanal pizzas, and custom dessert bars.",
    image: preReleaseImg,
  },
  {
    id: 203,
    title: "Premium Mixology & Bar Service",
    category: "Catering",
    location: "Metro Cities",
    rating: 4.88,
    reviewsCount: 142,
    tag: "Visual Drinks",
    date: "2025-06-20",
    description: "Exotic fruit mocktails, dry ice infusions, and visual molecular mixology counters.",
    image: publicEventsImg,
  }
]

const getOverrideImage = (title: string, category: string, originalImage: string) => {
  const t = title.toLowerCase()
  const c = category.toLowerCase()
  
  if (t.includes('anniversary')) return anniversaryImg
  if (t.includes('naming') || t.includes('baby shower') || t.includes('baby naming')) return babyNamingImg
  if (t.includes('birthday')) return birthday2Img
  if (t.includes('corporate') || t.includes('seminar') || c.includes('corporate')) return corporateImg
  if (t.includes('educational') || t.includes('college') || t.includes('school') || t.includes('academic')) return educationalImg
  if (t.includes('family') || t.includes('engagement') || t.includes('wedding') || t.includes('mature') || t.includes('shastipoorthi')) return familyFunctionsImg
  if (t.includes('housewarming') || t.includes('griha')) return housewarmingImg
  if (t.includes('pre release') || t.includes('pre-release') || t.includes('launch')) return preReleaseImg
  if (t.includes('proposal') || t.includes('surprise')) return proposalImg
  if (t.includes('public') || t.includes('concert') || t.includes('music') || t.includes('festival') || t.includes('farewell')) return publicEventsImg
  
  return originalImage
}

export default function EventsGrid({ onNavigate, hideHeader }: EventsGridProps) {
  const { events: featuredEvents, loading } = useEvents()
  const [selectedCategory, setSelectedCategory] = useState<string>('Events')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPaused, setIsPaused] = useState(false)

  const categories = ['Events', 'Photography', 'Catering']

  const filteredEvents = useMemo(() => {
    let baseList = featuredEvents
    if (selectedCategory === 'Photography') {
      baseList = photographyItems
    } else if (selectedCategory === 'Catering') {
      baseList = cateringItems
    }

    return baseList.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag || '').toLowerCase().includes(searchQuery.toLowerCase())
      return matchSearch
    })
  }, [selectedCategory, searchQuery, featuredEvents])

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<number | null>(null)
  const scrollAnimationRef = useRef<number | null>(null)

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current)
      scrollAnimationRef.current = null
      
      // Restore snap type if container exists
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.scrollSnapType = ''
        scrollContainerRef.current.style.scrollBehavior = ''
      }
    }
  }

  const smoothScrollTo = (element: HTMLDivElement, target: number, duration: number) => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current)
    }

    const start = element.scrollLeft
    const change = target - start
    let startTime: number | null = null
    
    const originalSnapType = element.style.scrollSnapType
    const originalScrollBehavior = element.style.scrollBehavior
    
    element.style.scrollSnapType = 'none'
    element.style.scrollBehavior = 'auto'

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Easing function: easeInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      element.scrollLeft = start + change * ease

      if (timeElapsed < duration) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll)
      } else {
        element.style.scrollSnapType = originalSnapType
        element.style.scrollBehavior = originalScrollBehavior
        scrollAnimationRef.current = null
      }
    }

    scrollAnimationRef.current = requestAnimationFrame(animateScroll)
  }

  const scrollPrev = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const card = container.firstElementChild as HTMLElement
    if (!card) return
    const cardWidth = card.clientWidth
    const gap = 24 // gap-6 is 24px
    const step = cardWidth + gap
    
    let target = container.scrollLeft - step
    if (target < 0) {
      // Loop back to the end
      target = container.scrollWidth - container.clientWidth
    }
    smoothScrollTo(container, target, 750) // Smooth responsive scroll (750ms)
  }

  const scrollNext = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const card = container.firstElementChild as HTMLElement
    if (!card) return
    const cardWidth = card.clientWidth
    const gap = 24 // gap-6 is 24px
    const step = cardWidth + gap
    
    let target = container.scrollLeft + step
    const maxScroll = container.scrollWidth - container.clientWidth
    if (target >= maxScroll + 10) {
      // Loop back to the start
      target = 0
    }
    smoothScrollTo(container, target, 750) // Smooth responsive scroll (750ms)
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

  // Auto-scrolling effect when not hovered or touched
  useEffect(() => {
    if (isPaused || loading || filteredEvents.length <= 1) return

    const interval = setInterval(() => {
      scrollNext()
    }, 3200) // Smooth scroll transition every 3.2 seconds

    return () => clearInterval(interval)
  }, [isPaused, loading, filteredEvents.length])

  return (
    <section id="events-grid" className="w-full bg-[#FFF8F3] font-jakarta relative py-12 sm:py-20 overflow-hidden">

      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        {!hideHeader && (
          <div className="mb-10 sm:mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <div className="text-black font-semibold text-xs sm:text-sm uppercase tracking-widest mb-1.5 sm:mb-3">
                  Curated Experiences 2026
                </div>
                <h2 className="font-jakarta text-3xl sm:text-5xl lg:text-[40px] font-bold leading-[1.1] mb-1.5 sm:mb-5 lg:mb-3 tracking-tight text-black">
                  Book Events
                </h2>
              </div>
              <p className="text-black text-xs sm:text-sm leading-relaxed font-medium max-w-xs sm:text-right">
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

          {/* Category Pills - Optimized for touch scrolling on Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:flex-1 py-1 touch-pan-x scroll-smooth">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 border ${
                    isActive
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-black hover:bg-gray-50 border-black/30 hover:border-black shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Count badge */}
          <span className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 shadow-sm hidden sm:block">
            {filteredEvents.length} items
          </span>
        </div>

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm border border-black/10 rounded-3xl shadow-sm animate-in fade-in duration-300">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFFFFF] text-black flex items-center justify-center border border-black/20">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-geist text-lg font-semibold text-black mb-1">No items found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-5">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSelectedCategory('Events'); setSearchQuery('') }}
              className="bg-black hover:bg-black/90 hover:shadow-lg text-white px-5 py-2 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Featured Horizontal Scroll Carousel ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LogoLoader size="md" text="Loading items..." />
          </div>
        ) : (
          <div className="relative group/container">
            {filteredEvents.length > 1 && (
              <>
                {/* Left Arrow Icon - Large Screen Only */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollPrev()
                  }}
                  className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-black/10 hover:border-black/30 shadow-md items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                  aria-label="Previous event"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* Right Arrow Icon - Large Screen Only */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollNext()
                  }}
                  className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-black/10 hover:border-black/30 shadow-md items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                  aria-label="Next event"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div 
              ref={scrollContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                handleMouseLeave()
                setIsPaused(false)
              }}
              onMouseEnter={() => setIsPaused(true)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 sm:px-4 snap-x snap-mandatory scroll-smooth w-full"
            >
              {filteredEvents.map((event) => {
                const imageSrc = getOverrideImage(event.title, event.category, event.image);
                return (
                <div key={event.id} className="w-[300px] sm:w-[340px] lg:w-[380px] shrink-0 snap-center">
                    <div
                      className="group/card bg-white rounded-2xl border border-gray-300 flex flex-col cursor-pointer h-full shadow-[8px_8px_0px_0px_#000000] transition-transform duration-200 hover:-translate-y-1 overflow-hidden"
                      onClick={() => onNavigate('event-details', event.id)}
                    >
                    <div className="w-full relative bg-gray-100 border-b border-gray-300 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={event.title}
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
                      <h4 className="font-jakarta text-base sm:text-lg font-bold text-black leading-tight line-clamp-1 mb-1">
                        {event.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#7A8494] line-clamp-2 mb-1.5 sm:mb-2 font-jakarta leading-relaxed">
                        {event.description || "Premium curated experience tailored for unforgettable memories."}
                      </p>

                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('booking', event.title) }}
                        className="w-fit bg-transparent hover:bg-black hover:text-white text-black px-4 py-2 rounded-[10px] border border-black font-jakarta font-bold text-xs transition-all flex items-center gap-1.5 mt-2 sm:mt-3"
                      >
                        Book Event
                        <svg className="w-3.5 h-3.5 text-current group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
