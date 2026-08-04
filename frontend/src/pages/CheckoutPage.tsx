import React, { useState } from 'react'
import logoSvg from '../assets/logo.svg'
import type { PageType, UserProfile } from '../App'
import { API_BASE_URL } from '../config'

interface CheckoutPageProps {
  bookingDetails: {
    eventType: string
    startDate: string
    endDate: string
    budget: string
    location?: string
  } | null
  onNavigate: (page: PageType, context?: string | number) => void
  onBookingConfirm: (finalDetails: {
    eventType: string
    startDate: string
    endDate: string
    budget: string
    location: string
    userName: string
    userEmail: string
    userPhone: string
    specialRequests?: string
    paymentStatus: string
    bookingId: string
  }) => void
  currentUser: UserProfile | null
}

type PaymentMethod = 'upi' | 'card' | 'netbanking'

export default function CheckoutPage({ bookingDetails, onNavigate, onBookingConfirm, currentUser }: CheckoutPageProps) {
  const [userName, setUserName] = useState(currentUser?.name || '')
  const [userEmail, setUserEmail] = useState(currentUser?.email || '')
  const [userPhone, setUserPhone] = useState(currentUser?.phone || '')
  const [specialRequests, setSpecialRequests] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [netBank, setNetBank] = useState('SBI')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Sync state if user signs in from Header while on Checkout
  React.useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name)
      setUserEmail(currentUser.email)
      setUserPhone(currentUser.phone)
    }
  }, [currentUser])

  if (!bookingDetails) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">No Booking Details Found</h2>
        <p className="text-slate-600 mb-8">Please go back and select your event options first.</p>
        <button 
          onClick={() => onNavigate('booking')}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          Configure Booking
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!userName.trim()) return setErrorMsg('Full Name is required')
    if (!userEmail.trim()) return setErrorMsg('Email Address is required')
    if (!userPhone.trim()) return setErrorMsg('Phone Number is required')

    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      return setErrorMsg('Please enter a valid UPI ID (e.g., user@okaxis)')
    }

    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) return setErrorMsg('Card Number must be 16 digits')
      if (!cardExpiry.includes('/')) return setErrorMsg('Expiry Date must be MM/YY')
      if (cardCvv.length < 3) return setErrorMsg('CVV must be 3 digits')
    }

    setIsSubmitting(true)

    const payload = {
      eventType: bookingDetails.eventType,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      budget: bookingDetails.budget,
      location: bookingDetails.location || '',
      userName,
      userEmail,
      userPhone,
      specialRequests: specialRequests || undefined,
      paymentStatus: "Paid"  // Confirming payment was made
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Booking checkout submission failed')
      }

      const data = await response.json()
      setIsSubmitting(false)
      onBookingConfirm({
        ...payload,
        bookingId: data.bookingId
      })
    } catch (err) {
      setIsSubmitting(false)
      setErrorMsg('Failed to process payment and confirm booking. Please try again.')
    }
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-geist relative">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-300/20 via-orange-300/15 to-rose-200/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="mb-8 text-center md:text-left border-b border-slate-200/80 pb-6 relative z-10">
        <button 
          onClick={() => onNavigate('booking')}
          className="group inline-flex items-center gap-1 text-slate-500 hover:text-orange-600 text-xs font-semibold uppercase tracking-wider mb-2 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Booking Details
        </button>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
          Secure <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent font-semibold">Checkout &amp; Payment</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Provide your details and complete the mock payment step to secure your event date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Form & Payment (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          
          {/* User Details */}
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">1</span>
              User Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. rahul@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Special Requests (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="Any specific requests or requirements for the event planners..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all shadow-inner resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Gateway Mock */}
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">2</span>
              Payment Details
            </h3>

            {/* Methods Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(['upi', 'card', 'netbanking'] as const).map((method) => {
                const active = paymentMethod === method
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                      active 
                        ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                        : 'bg-white/40 border-slate-200 text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    {method}
                  </button>
                )
              })}
            </div>

            {/* Sub-form fields based on Payment tab */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4 min-h-[120px] flex flex-col justify-center">
              {paymentMethod === 'upi' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">UPI ID *</label>
                  <input 
                    type="text"
                    placeholder="Enter your UPI ID (e.g. name@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 shadow-inner"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">A request will be sent to your UPI App.</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Card Number *</label>
                    <input 
                      type="text"
                      maxLength={19}
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
                        setCardNumber(val)
                      }}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 shadow-inner"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Expiry Date *</label>
                      <input 
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 shadow-inner text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">CVV *</label>
                      <input 
                        type="password"
                        maxLength={3}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 shadow-inner text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">Select Bank *</label>
                  <select 
                    value={netBank}
                    onChange={(e) => setNetBank(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  >
                    <option value="SBI">State Bank of India</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="AXIS">Axis Bank</option>
                  </select>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              🔒 256-bit SSL encrypted secure transactional network.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium animate-pulse">
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:brightness-105 active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Payment &amp; Securing Dates...
              </>
            ) : (
              `Pay ₹99 & Confirm Booking`
            )}
          </button>
        </form>

        {/* Right Column: Booking Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 text-slate-800 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <img src={logoSvg} alt="Shata Logo" className="h-5 w-auto opacity-70" />
              Event Summary
            </h3>

            <div className="space-y-4 border-b border-slate-200 pb-6 mb-6">
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 text-xs">Event Type</span>
                <span className="font-semibold text-slate-900 text-xs">{bookingDetails.eventType}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 text-xs">From</span>
                <span className="font-semibold text-slate-900 text-xs">{formatDate(bookingDetails.startDate)}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 text-xs">To</span>
                <span className="font-semibold text-slate-900 text-xs">{formatDate(bookingDetails.endDate)}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 text-xs">Location</span>
                <span className="font-semibold text-slate-900 text-xs text-right max-w-[200px] truncate">{bookingDetails.location}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-500 text-xs font-semibold">Configured Budget</span>
              <span className="text-sm font-semibold text-slate-700">{bookingDetails.budget}</span>
            </div>

            <div className="flex justify-between items-center mb-6 pt-3 border-t border-slate-200">
              <span className="text-slate-800 text-sm font-bold">Booking Fee (Pay Now)</span>
              <span className="text-2xl font-bold text-orange-500">₹99</span>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 text-[11px] text-slate-600 leading-relaxed">
              <span className="text-orange-600 font-bold block mb-1">Cancellation Policy</span>
              Bookings can be canceled or rescheduled up to 72 hours before the start date free of charge.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
