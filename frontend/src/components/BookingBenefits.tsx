const benefits = [
  {
    title: 'Secure & Verified',
    description:
      'Every caterer, photographer, and decorator undergoes a rigorous 4-step quality audit to verify portfolios, licenses, and ratings.',
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'No Hidden Commissions',
    description:
      'Get direct access to vendor rate cards. We guarantee absolute transparency. What you see is exactly what you pay.',
    icon: (
      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Free Booking Alterations',
    description:
      'Plans changed? No worries. Enjoy free reschedule options and direct replacement guarantees up to 14 days before your event.',
    icon: (
      <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function BookingBenefits() {
  return (
    <section id="benefits" className="px-4 sm:px-6 py-10 sm:py-16 bg-white/10 backdrop-blur-md border-y border-white/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)] font-geist relative">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 block mb-2.5">
            Why Choose Us
          </span>
          <h2 className="font-geist text-3xl sm:text-4xl font-medium text-slate-900 tracking-tight leading-[1.15]">
            Book with Confidence
          </h2>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 group p-5 rounded-3xl bg-white/40 border border-white/60 hover:border-orange-400/60 shadow-lg shadow-slate-200/40 backdrop-blur-2xl transition-all glass-shine-light">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-orange-600 group-hover:text-white flex-shrink-0 flex items-center justify-center text-orange-600 transition-colors duration-300 shadow-xs">
                {b.icon}
              </div>
              <div>
                <h4 className="font-geist text-base font-semibold text-slate-900 mb-1.5">{b.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
