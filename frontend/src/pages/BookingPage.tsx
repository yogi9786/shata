import React, { useState, useEffect } from 'react'
import type { PageType } from '../App'

interface BookingPageProps {
  preselectedEvent?: string | null
  onNavigate: (page: PageType, context?: string | number) => void
  onBookingSubmit: (bookingDetails: {
    eventType: string
    startDate: string
    endDate: string
    budget: string
    location?: string
    bookingId?: string
  }) => void
}

const budgetOptions = [
  { id: '10k-30k', label: '10K - 30K', desc: 'Ideal for small parties & micro events' },
  { id: '30k-50k', label: '30K - 50K', desc: 'Great for standard birthdays & celebrations' },
  { id: '50k-1l', label: '50K - 1L', desc: 'Perfect for premium gatherings & sangeet' },
  { id: '1l-3l', label: '1L - 3L', desc: 'Designed for grand celebrations & weddings' },
  { id: 'customize', label: 'Customize', desc: 'Define your custom budget preference' }
]

const steps = [
  {
    number: 1,
    title: 'Choose Your Services & Budget',
    text: 'Browse from a wide range of services including catering, photography, decoration, music, and complete event management. Each service is listed with clear details so you can explore what suits your occasion best. No more running around to meet different vendors – everything is available in one trusted platform. You have full control to select services as per your event type, whether it\'s a birthday, wedding, concert, or corporate function. Shata ensures that your choice is simple, professional, and convenient.'
  },
  {
    number: 2,
    title: 'Set Date & Friendly Budget',
    text: 'Once you decide on services, simply pick the date of your event and set a budget that is comfortable for you. Our platform makes sure you get transparent pricing with no hidden charges. You can adjust services based on your needs while keeping everything within your budget. Payments are processed through a secure system, ensuring 100% safety and reliability. This step makes sure your planning is stress-free, easy to manage, and completely under your control.'
  },
  {
    number: 3,
    title: 'Connect With Our Partner',
    text: 'After booking, one of our trusted Shata partners will reach out to you directly. They will take time to understand your requirements, explain the event plan in detail, and answer any queries you may have. This gives you confidence that your event is in safe hands and nothing will be missed. Our partners ensure smooth communication so you are updated at every step. With Shata, you\'ll always know exactly how your event will be managed before the big day arrives.'
  },
  {
    number: 4,
    title: 'Relax & Enjoy Your Event',
    text: 'On the day of your event, our team takes full responsibility for managing all arrangements – from setup to execution. Whether it\'s food, decoration, music, or guest handling, everything is taken care of with professionalism. You don\'t have to worry about last-minute chaos or stress, because Shata ensures smooth delivery of every service you booked. All you need to do is celebrate with your family and friends, while we handle the hard work. Your happiness and satisfaction are our top priority, and we make sure your event is memorable in every way.'
  }
]

export default function BookingPage({ preselectedEvent, onNavigate, onBookingSubmit }: BookingPageProps) {
  const [eventType, setEventType] = useState<string>('Engagement')
  const [customEventType, setCustomEventType] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [selectedBudget, setSelectedBudget] = useState<string>('10K - 30K')
  const [customBudgetMin, setCustomBudgetMin] = useState<string>('50000')
  const [customBudgetMax, setCustomBudgetMax] = useState<string>('150000')
  const [location, setLocation] = useState<string>('')
  const [isLocating, setIsLocating] = useState<boolean>(true)
  
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Fetch location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            // Query Nominatim OpenStreetMap API for reverse geocoding
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`)
            if (res.ok) {
              const data = await res.json()
              const addr = data.address
              const city = addr.city || addr.town || addr.village || addr.suburb || addr.state || ''
              if (city) {
                setLocation(city)
                return
              }
            }
            setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`)
          } catch {
            setLocation('Location unavailable')
          } finally {
            setIsLocating(false)
          }
        },
        () => {
          setLocation('')
          setIsLocating(false)
        }
      )
    } else {
      setIsLocating(false)
    }
  }, [])
  useEffect(() => {
    if (preselectedEvent) {
      // Check if it matches popular events
      const knownEvents = ['Engagement', 'Wedding', 'Birthday', 'Corporate', 'Concert', 'Surprise']
      const matched = knownEvents.find(
        (e) => e.toLowerCase() === preselectedEvent.toLowerCase() || preselectedEvent.toLowerCase().includes(e.toLowerCase())
      )
      if (matched) {
        setEventType(matched)
      } else {
        setEventType('Customize')
        setCustomEventType(preselectedEvent)
      }
    }
  }, [preselectedEvent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!startDate) {
      setErrorMsg('Please select a start date.')
      return
    }
    if (!endDate) {
      setErrorMsg('Please select an end date.')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (start < today) {
      setErrorMsg('Start date cannot be in the past.')
      return
    }

    if (end < start) {
      setErrorMsg('End date must be on or after the start date.')
      return
    }

    setIsSubmitting(true)
    
    const finalEventType = eventType === 'Customize' ? customEventType || 'Custom Event' : eventType
    const finalBudget = selectedBudget === 'Customize' 
      ? `${Number(customBudgetMin).toLocaleString('en-IN')} - ${Number(customBudgetMax).toLocaleString('en-IN')} INR`
      : selectedBudget

    const payload = {
      eventType: finalEventType,
      startDate,
      endDate,
      budget: finalBudget,
      location: location || 'Not provided'
    }

    setIsSubmitting(true)
    // Simulate a brief load for creating event blueprint before proceeding to checkout
    setTimeout(() => {
      setIsSubmitting(false)
      onBookingSubmit(payload)
    }, 800)
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-geist relative">
      {/* ── Header Area ── */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <button 
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-1 text-slate-500 hover:text-orange-600 text-xs font-semibold uppercase tracking-wider mb-2 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
            Book Your <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent font-semibold">Special Event</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
            Configure your event type, dates, and budget preference. Our verified planner network will take care of the rest.
          </p>
        </div>
      </div>

      {/* ── Two Column Responsive Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-5 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            {/* Absolute accent highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Event Type selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-3">
                  Engagement / Event Type *
                </label>
                {preselectedEvent ? (
                  <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-orange-600">Selected Event</span>
                      <h4 className="text-base font-bold text-slate-800">{preselectedEvent}</h4>
                    </div>
                    <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase rounded-md shadow-xs">Locked</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Engagement', 'Wedding', 'Birthday', 'Corporate'].map((type) => {
                        const active = eventType === type
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setEventType(type)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                              active
                                ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-xs'
                                : 'bg-white/40 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      })}
                      
                      {['Concert', 'Surprise'].map((type) => {
                        const active = eventType === type
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setEventType(type)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                              active
                                ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-xs'
                                : 'bg-white/40 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      })}

                      <button
                        type="button"
                        onClick={() => setEventType('Customize')}
                        className={`col-span-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                          eventType === 'Customize'
                            ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-xs'
                            : 'bg-white/40 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        Customize / Other
                      </button>
                    </div>

                    {/* Custom event type field */}
                    {eventType === 'Customize' && (
                      <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <input
                          type="text"
                          placeholder="Enter custom event type (e.g. Baby Shower, Graduation)..."
                          value={customEventType}
                          onChange={(e) => setCustomEventType(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
                          required
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Date pickers - From and To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
                    From * <span className="text-slate-400 font-normal">(Start date)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
                    To * <span className="text-slate-400 font-normal">(End date)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Select Budget Cards */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-3">
                  Select Budget *
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {budgetOptions.map((opt) => {
                    const active = selectedBudget === opt.label
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedBudget(opt.label)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                          active
                            ? 'bg-orange-50/70 border-orange-500 text-slate-900 shadow-md ring-2 ring-orange-400/20'
                            : 'bg-white/40 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white/60'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-xs font-bold ${active ? 'text-orange-600' : 'text-slate-900'}`}>
                            {opt.label}
                          </span>
                          {active && (
                            <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 leading-tight font-normal">
                          {opt.desc}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Customize Budget detail block */}
                {selectedBudget === 'Customize' && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Specify Custom Budget Range (INR)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Min Budget (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 50000"
                          value={customBudgetMin}
                          onChange={(e) => setCustomBudgetMin(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-orange-500"
                          min={5000}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Max Budget (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 200000"
                          value={customBudgetMax}
                          onChange={(e) => setCustomBudgetMax(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-orange-500"
                          min={customBudgetMin || 10000}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
                  Event Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter city or precise location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {isLocating ? (
                      <svg className="animate-spin w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5 ml-1">
                  {isLocating ? 'Auto-detecting your current location...' : 'We will use this location to match you with nearby vendors.'}
                </p>
              </div>

              {/* Error messages */}
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium animate-pulse">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:brightness-105 active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Event Blueprint...
                  </>
                ) : (
                  'Plan Event'
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Right Column: Simple Steps (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            
            {/* Header info */}
            <div className="mb-8">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                How It Works
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                Simple Steps to Book Your Event
              </h3>
            </div>

            {/* Steps Vertical Timeline */}
            <div className="relative border-l border-slate-200 pl-6 sm:pl-8 space-y-8.5">
              {steps.map((st) => (
                <div key={st.number} className="relative group">
                  {/* Glowing bubble badge */}
                  <span className="absolute -left-[39px] sm:-left-[47px] top-0 w-6.5 h-6.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white border-2 border-orange-500 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center text-xs font-bold transition-all shadow-md shadow-orange-500/10">
                    {st.number}
                  </span>
                  
                  {/* Step details */}
                  <div className="space-y-2">
                    <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                      {st.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                      {st.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
