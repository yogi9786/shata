const services = [
  {
    tag: 'Catering',
    title: 'Exquisite Culinary',
    description: 'Tailored menus by verified gourmet chefs. Live interactive sushi, grill & dessert counters.',
    icon: (
      <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 9v1M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
      </svg>
    ),
    iconBg: 'bg-[#FDFBF4] border-[#D4AF37]/30',
    accentColor: 'text-[#D4AF37]',
    hoverBorder: 'hover:border-[#D4AF37]/50',
  },
  {
    tag: 'Stage & Floral',
    title: 'Theme Decoration',
    description: 'From royal heritage mandaps to minimalist modern glass setups — perfectly crafted.',
    icon: (
      <svg className="w-6 h-6 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    iconBg: 'bg-black/10 border-black/20',
    accentColor: 'text-[#111827]',
    hoverBorder: 'hover:border-slate-300',
  },
  {
    tag: 'Photography',
    title: 'Cinematic Capture',
    description: '4K HDR cinema films, dual FPV drone coverage, color grading & same-day trailer edits.',
    icon: (
      <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
    iconBg: 'bg-[#FDFBF4] border-[#D4AF37]/30',
    accentColor: 'text-[#D4AF37]',
    hoverBorder: 'hover:border-[#D4AF37]/50',
  },
  {
    tag: 'Management',
    title: 'Full Event Planning',
    description: 'End-to-end guest logistics, vendor coordination, RSVP management & zero-stress execution.',
    icon: (
      <svg className="w-6 h-6 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    iconBg: 'bg-black/10 border-black/20',
    accentColor: 'text-[#111827]',
    hoverBorder: 'hover:border-slate-300',
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className="px-3 sm:px-6 lg:px-8 py-16 sm:py-24 bg-transparent relative overflow-hidden font-geist">
      {/* Background glow is removed here so the App background is visible */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-to-tr from-amber-50/60 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <div className="pill-orange mb-4">Full-Spectrum Production</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-semibold text-black tracking-tight leading-[1.1] max-w-lg">
              Premium Event{' '}
              <span className="text-gradient-orange">Services</span>
            </h2>
            <p className="text-black/60 text-sm leading-relaxed max-w-xs sm:text-right">
              Precision engineering, world-class aesthetics, and flawless execution.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative glass-panel-light rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-500 card-accent-bottom"
              onClick={() => {
                const el = document.getElementById('events-grid')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {/* Icon box */}
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl ${service.iconBg} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 mt-4">
                <span className={`inline-block self-start px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-black/5 border border-black/10 ${service.accentColor}`}>
                  {service.tag}
                </span>
                <h4 className="font-geist text-base sm:text-lg font-semibold text-black group-hover:text-orange-600 transition-colors leading-snug">
                  {service.title}
                </h4>
                <p className="text-black/60 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Arrow CTA */}
              <div className={`flex items-center gap-1 text-xs font-semibold ${service.accentColor} opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0`}>
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Subtle bg number */}
              <div className="absolute top-3 right-4 text-[52px] font-bold leading-none text-slate-50 group-hover:text-white transition-colors pointer-events-none font-geist">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-black/10">
          {[
            { icon: '✦', text: 'Always Verified' },
            { icon: '◎', text: 'Focused for You' },
            { icon: '+', text: 'Zero Hidden Fees' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-black/60 text-xs font-semibold">
              <span className="text-[#D4AF37]">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

