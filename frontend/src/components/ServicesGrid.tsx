const services = [
  {
    tag: 'Catering',
    title: 'EXQUISITE CULINARY',
    description:
      'Tailored menus by verified gourmet chefs. Live interactive sushi, grill & dessert counters.',
    icon: (
      <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 9v1" />
      </svg>
    ),
    accent: 'from-orange-500/10 to-amber-500/10',
  },
  {
    tag: 'Stage & Floral',
    title: 'THEME DECORATION',
    description:
      'Design themes ranging from royal heritage mandaps to minimalist modern glass setups.',
    icon: (
      <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    accent: 'from-amber-500/10 to-rose-500/10',
  },
  {
    tag: 'Photography',
    title: 'CINEMATIC FRAME',
    description:
      '4K HDR cinema films, dual FPV drone coverage, color grading & same-day trailer edits.',
    icon: (
      <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
    accent: 'from-yellow-500/10 to-amber-500/10',
  },
  {
    tag: 'Management',
    title: 'EVENT PLANNING',
    description:
      'End-to-end guest logistics, vendor coordination, RSVP management & zero-stress execution.',
    icon: (
      <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    accent: 'from-amber-600/10 to-orange-600/10',
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className="relative px-4 sm:px-6 py-10 sm:py-16 text-slate-900 font-geist overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-200/20 via-amber-200/20 to-yellow-200/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* section header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 block mb-2.5">
            Full-Spectrum Production
          </span>
          <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight leading-[1.15]">
            Premium Event Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Precision engineering, world-class aesthetics, and flawless execution for unforgettable celebrations.
          </p>
        </div>

        {/* cards grid (no outer container wrapper bg) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-white/40 border border-white/60 hover:border-orange-400/60 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-lg shadow-slate-200/40 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between gap-4 sm:gap-6 glass-shine-light"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* icon container */}
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.accent} border border-orange-200/60 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* tag */}
                <span className="inline-block self-start px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-200/80">
                  {service.tag}
                </span>

                {/* content */}
                <h4 className="font-geist text-sm sm:text-base font-semibold text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight leading-snug">
                  {service.title}
                </h4>
                <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed line-clamp-3 font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-orange-600 group-hover:text-orange-700">
                <span className="text-[10px] sm:text-xs">Learn More</span>
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
