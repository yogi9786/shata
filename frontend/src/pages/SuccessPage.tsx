import logoSvg from '../assets/logo.svg'
import type { PageType } from '../App'

interface SuccessPageProps {
  bookingDetails: {
    eventType: string
    startDate: string
    endDate: string
    budget: string
    location?: string
    bookingId?: string
    userName?: string
    userEmail?: string
    userPhone?: string
    paymentStatus?: string
  } | null
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function SuccessPage({ bookingDetails, onNavigate }: SuccessPageProps) {
  if (!bookingDetails) {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-md mx-auto font-geist">
        <h2 className="text-xl font-bold text-slate-800">No Booking Details Found</h2>
        <button 
          onClick={() => onNavigate('home')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    )
  }

  // Format date readable
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('en-US', options)
    } catch {
      return dateStr
    }
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto font-geist flex flex-col items-center justify-center relative min-h-[75vh]">
      
      {/* ── Glassmorphic Receipt Card ── */}
      <div className="w-full p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-3xl border border-white/90 shadow-2xl relative overflow-hidden text-center glass-shine-light">
        {/* Dynamic header gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400" />
        
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center shadow-inner relative z-10 animate-bounce">
          <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Branding */}
        <div className="flex justify-center mb-4">
          <img src={logoSvg} alt="Shata Logo" className="h-6 w-auto object-contain opacity-70" />
        </div>

        {/* Text Details */}
        <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mb-2">
          Event Plan Generated!
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed font-normal">
          Thank you for choosing Shata! One of our trusted event partners is reviewing your requirements and will reach out to you within 2 hours.
        </p>

        {/* Structured Summary Receipt */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 text-left space-y-3.5 mb-8">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 flex justify-between items-center">
            <span>Booking Invoice Summary</span>
            <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm uppercase font-bold">
              {bookingDetails.paymentStatus || 'Confirmed'}
            </span>
          </h4>
          
          <div className="flex justify-between items-center gap-4 text-xs font-normal">
            <span className="text-slate-500">Event / Category:</span>
            <span className="font-semibold text-slate-900 text-right">{bookingDetails.eventType}</span>
          </div>

          {bookingDetails.userName && (
            <div className="flex justify-between items-start gap-4 text-xs font-normal">
              <span className="text-slate-500">Client Name:</span>
              <span className="font-semibold text-slate-900 text-right">{bookingDetails.userName}</span>
            </div>
          )}

          {bookingDetails.userPhone && (
            <div className="flex justify-between items-start gap-4 text-xs font-normal">
              <span className="text-slate-500">Phone Number:</span>
              <span className="font-semibold text-slate-900 text-right">{bookingDetails.userPhone}</span>
            </div>
          )}

          {bookingDetails.userEmail && (
            <div className="flex justify-between items-start gap-4 text-xs font-normal">
              <span className="text-slate-500">Email Address:</span>
              <span className="font-semibold text-slate-900 text-right">{bookingDetails.userEmail}</span>
            </div>
          )}

          <div className="flex justify-between items-start gap-4 text-xs font-normal">
            <span className="text-slate-500">Start Date:</span>
            <span className="font-semibold text-slate-900 text-right">{formatDate(bookingDetails.startDate)}</span>
          </div>

          <div className="flex justify-between items-start gap-4 text-xs font-normal">
            <span className="text-slate-500">End Date:</span>
            <span className="font-semibold text-slate-900 text-right">{formatDate(bookingDetails.endDate)}</span>
          </div>
          
          {bookingDetails.location && (
            <div className="flex justify-between items-start gap-4 text-xs font-normal">
              <span className="text-slate-500">Location:</span>
              <span className="font-semibold text-slate-900 text-right">{bookingDetails.location}</span>
            </div>
          )}

          {bookingDetails.bookingId && (
            <div className="flex justify-between items-start gap-4 text-xs font-normal">
              <span className="text-slate-500">Booking ID:</span>
              <span className="font-mono font-bold text-orange-600 text-right">{bookingDetails.bookingId}</span>
            </div>
          )}

          <div className="h-px bg-slate-200" />

          <div className="flex justify-between items-center gap-4 text-xs">
            <span className="text-slate-500">Total Target Budget:</span>
            <span className="font-semibold text-slate-700 text-right">{bookingDetails.budget}</span>
          </div>

          <div className="h-px bg-slate-200" />

          <div className="flex justify-between items-center gap-4 text-xs">
            <span className="text-slate-900 font-bold">Amount Paid (Booking Fee):</span>
            <span className="font-bold text-orange-600 text-right text-sm">₹99</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 py-3 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50/20 text-slate-700 hover:text-orange-600 text-xs font-semibold tracking-wide transition-all cursor-pointer"
          >
            Go Back Home
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Confirmation
          </button>
        </div>

      </div>
    </div>
  )
}
