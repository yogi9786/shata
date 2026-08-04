import { useEffect } from 'react';
import { useEvents } from '../hooks/useEvents';
import type { PageType } from '../App';
import LogoLoader from '../components/LogoLoader';

interface EventDetailsPageProps {
  eventId: number;
  onNavigate: (page: PageType, context?: string | number) => void;
}

export default function EventDetailsPage({ eventId, onNavigate }: EventDetailsPageProps) {
  const { events, loading } = useEvents();
  const event = events.find((e) => e.id === eventId);

  useEffect(() => {
    // Scroll to top whenever this page mounts or the event changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [eventId]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <LogoLoader text="Loading Event Details..." size="lg" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Event Not Found</h2>
        <p className="text-slate-600 mb-8">We couldn't find the event details you were looking for.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent flex flex-col justify-end p-8 md:p-12">
            <span className="inline-block px-4 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-full mb-4 w-max shadow-lg">
              {event.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
              {event.title}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl drop-shadow">
              {event.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">About This Event</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6 relative z-10">
                {event.fullDescription || event.description}
              </p>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                {event.capacity && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Capacity</p>
                      <p className="text-slate-800 font-semibold">{event.capacity}</p>
                    </div>
                  </div>
                )}
                {event.duration && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Duration</p>
                      <p className="text-slate-800 font-semibold">{event.duration}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Location</p>
                    <p className="text-slate-800 font-semibold">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Rating</p>
                    <p className="text-slate-800 font-semibold">{event.rating} ({event.reviewsCount} reviews)</p>
                  </div>
                </div>
              </div>
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Key Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 flex items-center justify-center text-white shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Booking Card (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 sticky top-32">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to celebrate?</h3>
              <p className="text-slate-500 text-sm mb-6">Book this event now and let us handle all the details for a magical experience.</p>
              
              <div className="mb-6 pb-6 border-b border-slate-100">
                <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">Organized By</p>
                <p className="text-slate-800 font-bold">{event.organizer || "Shata Premium Planners"}</p>
              </div>
              
              <button 
                onClick={() => onNavigate('booking', event.title)}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Book Now
              </button>

              <div className="mt-6 text-center text-sm text-slate-500">
                <p>No upfront payment required.</p>
                <p>Secure your date today!</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
