const benefits = [
  {
    number: '01',
    title: 'Curated Excellence',
    description:
      'Access an exclusive network of elite vendors, meticulously vetted for quality, reliability, and sheer brilliance in execution.',
    gradient: 'from-orange-500 to-rose-500',
  },
  {
    number: '02',
    title: 'Bespoke Curation',
    description:
      'Every event is a unique masterpiece. We don\'t just book; we design, coordinate, and perfect every detail to your vision.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    number: '03',
    title: 'Absolute Transparency',
    description:
      'No hidden fees, no unexpected surprises. Experience direct vendor pricing with comprehensive event insurance and zero-stress protection.',
    gradient: 'from-yellow-400 to-amber-500',
  },
]

interface BookingBenefitsProps {
  hideHeader?: boolean
}

export default function BookingBenefits({ hideHeader }: BookingBenefitsProps = {}) {
  return (
    <section id="benefits" className="px-4 sm:px-6 py-10 sm:py-16 font-geist relative">
      {/* Abstract Background Elements (Light) */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-orange-300/30 to-amber-200/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-rose-300/20 to-orange-300/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 block mb-2.5">
                The Shata Advantage
              </span>
              <h2 className="font-geist text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                Elevate Your <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Experience.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-sm md:text-right font-medium leading-relaxed">
              Why visionary clients trust us to orchestrate their most important, unforgettable moments.
            </p>
          </div>
        )}

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="group relative p-5 sm:p-6 rounded-3xl bg-white/40 border border-white/60 hover:border-orange-400/60 shadow-lg shadow-slate-200/40 backdrop-blur-2xl transition-all duration-500 overflow-hidden flex flex-col justify-end glass-shine-light"
            >
              {/* Giant Background Number */}
              <div className="absolute top-2 right-4 text-[80px] font-bold leading-none text-slate-900/5 group-hover:text-slate-900/10 transition-colors duration-500 pointer-events-none font-geist tracking-tighter">
                {b.number}
              </div>

              {/* Glowing Accent */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${b.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />

              <div className="relative z-10">
                <div className={`w-10 h-10 mb-4 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center shadow-md`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h4 className="font-geist text-lg font-bold text-slate-900 mb-2 tracking-tight">{b.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal group-hover:text-slate-800 transition-colors duration-300">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
