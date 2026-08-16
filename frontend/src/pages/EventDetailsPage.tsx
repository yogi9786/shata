import { useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import type { PageType } from '../App'
import LogoLoader from '../components/LogoLoader'

interface EventDetailsPageProps {
  eventId: number
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function EventDetailsPage({ eventId, onNavigate }: EventDetailsPageProps) {
  const { events, loading } = useEvents()
  const event = events.find((e) => e.id === eventId)

  useEffect(() => {
    // Scroll to top whenever this page mounts or the event changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [eventId])

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF8F3]">
        <LogoLoader text="Loading Event Details..." size="lg" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF8F3] font-geist">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Event Not Found</h2>
        <p className="text-slate-600 mb-8">We couldn't find the event details you were looking for.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-black hover:bg-[#E86F32] text-white rounded-xl font-medium transition-all duration-300 cursor-pointer"
        >
          Return Home
        </button>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#FFF8F3] font-geist overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link Breadcrumb */}
        <button
          onClick={() => onNavigate('home')}
          className="group text-slate-500 hover:text-[#E86F32] flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer mb-6"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Events
        </button>

        {/* Banner Section */}
        <div className="relative h-[320px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl mb-8 sm:mb-12 border border-slate-100 animate-in fade-in duration-700">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-12">
            <span className="inline-block px-4 py-1.5 bg-[#E86F32] text-white text-xs sm:text-sm font-bold rounded-full mb-3 w-max shadow-md uppercase tracking-wider">
              {event.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
              {event.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl drop-shadow font-normal leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Main Details (Left Column) */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 relative overflow-hidden group hover:border-[#E86F32]/25 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E86F32]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 relative z-10">About This Event</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6 relative z-10 font-normal">
                {event.fullDescription || event.description}
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10 pt-4 border-t border-slate-50">
                {event.capacity && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-50 text-[#E86F32] rounded-xl flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Capacity</p>
                      <p className="text-slate-800 font-bold text-xs sm:text-sm">{event.capacity}</p>
                    </div>
                  </div>
                )}
                {event.duration && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-50 text-[#E86F32] rounded-xl flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Duration</p>
                      <p className="text-slate-800 font-bold text-xs sm:text-sm">{event.duration}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-50 text-[#E86F32] rounded-xl flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Location</p>
                    <p className="text-slate-800 font-bold text-xs sm:text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-50 text-[#E86F32] rounded-xl flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">Rating</p>
                    <p className="text-slate-800 font-bold text-xs sm:text-sm">{event.rating} ({event.reviewsCount} reviews)</p>
                  </div>
                </div>
              </div>
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 group hover:border-[#E86F32]/25 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">Key Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#FF9F43] to-[#E86F32] flex items-center justify-center text-white shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-slate-700 font-bold text-xs sm:text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Booking Card (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-[#E86F32]/20 sticky top-32 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">Ready to celebrate?</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed font-normal">Book this event now and let us handle all the details for a magical experience.</p>
              
              <div className="mb-6 pb-6 border-b border-slate-100">
                <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-2">Organized By</p>
                <p className="text-slate-800 font-extrabold text-sm sm:text-base">{event.organizer || "Shata Premium Planners"}</p>
              </div>
              
              {/* Premium Solid Black CTA Button */}
              <button 
                onClick={() => onNavigate('booking', event.title)}
                className="w-full py-3.5 px-6 bg-black border-none text-white font-bold tracking-tight rounded-none shadow-[4px_4px_0px_#E86F32] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer text-center text-sm sm:text-base font-jakarta"
              >
                Book Now →
              </button>

              <div className="mt-6 text-center text-[10px] sm:text-xs text-slate-500 font-medium space-y-1">
                <p>No upfront payment required.</p>
                <p>Secure your date today!</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
