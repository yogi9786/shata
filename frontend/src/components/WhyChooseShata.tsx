export default function WhyChooseShata() {
  const pillars = [
    {
      number: '01',
      title: 'Direct Verified Vendors',
      description: 'Access an elite network of rigorously vetted photographers, luxury caterers, and decorators. Book them directly with zero broker markup.',
      icon: (
        <svg className="w-6 h-6 text-[#E86F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bg: 'bg-orange-50 border-orange-100/50',
    },
    {
      number: '02',
      title: '100% Price Transparency',
      description: 'Direct vendor pricing with zero hidden commissions. Review exact itemized quotes upfront with secure digital payment milestones.',
      icon: (
        <svg className="w-6 h-6 text-[#E86F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-amber-50 border-amber-100/50',
    },
    {
      number: '03',
      title: 'Dedicated On-Site Coordination',
      description: 'Every event includes a professional Shata coordinator to oversee setup timelines, decorator placements, and vendor arrival schedules.',
      icon: (
        <svg className="w-6 h-6 text-[#E86F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bg: 'bg-rose-50 border-rose-100/50',
    },
    {
      number: '04',
      title: 'Bespoke Customization',
      description: 'Review custom Stage floral design schemes and layout mockups before final booking, tailored for your family or corporate event.',
      icon: (
        <svg className="w-6 h-6 text-[#E86F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 01.3-1 1 1 0 01.3 1v12a1 1 0 00.3 1h12a1 1 0 00.3-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6M9 14h6" />
        </svg>
      ),
      bg: 'bg-orange-50 border-orange-100/50',
    },
  ]

  return (
    <section id="why-choose-shata" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[#FFF8F3] relative overflow-hidden font-jakarta">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#FF9F43]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-to-tr from-orange-50/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-black font-semibold text-sm uppercase tracking-widest mb-3">
                Why Choose Shata
              </div>
              <h2 className="font-jakarta text-3xl sm:text-5xl lg:text-[40px] font-bold leading-[1.1] mb-3 sm:mb-5 lg:mb-3 tracking-tight text-black">
                Standards Matter
              </h2>
            </div>
            <p className="text-black/60 text-sm leading-relaxed max-w-xs md:text-right font-medium">
              Precision planning, trusted direct pricing, and flawless stage decor execution.
            </p>
          </div>
        </div>

        {/* Pillars Grid - Fully Responsive and Premium (2 columns on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-white border border-slate-100 rounded-[20px] sm:rounded-3xl p-4 sm:p-8 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:shadow-[#E86F32]/5 hover:-translate-y-1.5 transition-all duration-400 hover:border-[#E86F32]/30"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-4 sm:left-6 right-4 sm:right-6 h-[2px] bg-gradient-to-r from-[#E86F32] to-[#FF9F43] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              <div>
                {/* Icon box */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${pillar.bg} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {pillar.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-[#E86F32] transition-colors leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-600 text-[10px] sm:text-xs lg:text-sm leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="text-right text-[32px] sm:text-[48px] font-black text-slate-100 select-none font-jakarta tracking-tighter mt-4 sm:mt-6 group-hover:text-[#E86F32]/10 transition-colors">
                {pillar.number}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
