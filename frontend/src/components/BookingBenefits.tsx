const benefits = [
  {
    number: '01',
    title: 'Curated Excellence',
    description: 'Access an exclusive network of elite vendors, meticulously vetted for quality, reliability, and sheer brilliance.',
    icon: '✦',
    iconBg: 'bg-[#FDFBF4] border-[#D4AF37]/30',
    iconColor: 'text-[#D4AF37]',
    accentBar: 'from-[#D4AF37] to-[#B8860B]',
    hoverBorder: 'hover:border-[#D4AF37]/50',
  },
  {
    number: '02',
    title: 'Bespoke Curation',
    description: "Every event is a unique masterpiece. We design, coordinate, and perfect every detail to your vision — not anyone else's.",
    icon: '◈',
    iconBg: 'bg-[#FDFBF4] border-[#D4AF37]/30',
    iconColor: 'text-[#D4AF37]',
    accentBar: 'from-[#D4AF37] to-[#B8860B]',
    hoverBorder: 'hover:border-[#D4AF37]/50',
  },
  {
    number: '03',
    title: 'Zero Hidden Fees',
    description: 'No surprises. Experience direct vendor pricing with comprehensive event insurance and full budget transparency.',
    icon: '◎',
    iconBg: 'bg-[#FDFBF4] border-[#D4AF37]/30',
    iconColor: 'text-[#D4AF37]',
    accentBar: 'from-[#D4AF37] to-[#B8860B]',
    hoverBorder: 'hover:border-[#D4AF37]/50',
  },
]

interface BookingBenefitsProps {
  hideHeader?: boolean
}

export default function BookingBenefits({ hideHeader }: BookingBenefitsProps = {}) {
  return (
    <section id="benefits" className="px-4 sm:px-6 py-16 sm:py-24 font-geist relative overflow-hidden bg-transparent">
      {/* Warm radial blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-gradient-to-b from-white/40 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        {!hideHeader && (
          <div className="mb-12 sm:mb-16">
            <div className="pill-gold mb-4">The Shata Advantage</div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-semibold text-black tracking-tight leading-[1.1] max-w-lg">
                How We Keep You{' '}
                <span className="text-gradient-gold">Ahead</span>
              </h2>
              <p className="text-black/60 text-sm leading-relaxed max-w-xs sm:text-right">
                Why visionary clients trust us to orchestrate their most important moments.
              </p>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`group relative glass-panel-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:shadow-[#B8860B]/10 hover:-translate-y-1.5 transition-all duration-400 overflow-hidden ${b.hoverBorder}`}
            >
              {/* Accent bar at top */}
              <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${b.accentBar} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

              {/* Icon in colored box */}
              <div className={`w-12 h-12 rounded-2xl ${b.iconBg} border flex items-center justify-center flex-shrink-0`}>
                <span className={`text-xl font-bold ${b.iconColor}`}>{b.icon}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <h4 className="font-geist text-xl sm:text-2xl font-semibold text-black leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {b.title}
                </h4>
                <p className="text-black/60 text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>

              {/* Large bg number */}
              <div className="absolute bottom-3 right-5 text-[68px] font-bold leading-none text-slate-50 group-hover:text-white transition-colors pointer-events-none font-geist tracking-tighter">
                {b.number}
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-black/10">
          {[
            { icon: '✦', text: 'Always Current' },
            { icon: '◎', text: 'Focused for You' },
            { icon: '+', text: 'Actionable Steps' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-black/50 text-xs font-semibold">
              <span className="text-[#D4AF37]">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

