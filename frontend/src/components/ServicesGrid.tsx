const services = [
  {
    tag: 'Catering',
    tagColor: 'bg-slate-100 text-black border-slate-200',
    title: 'EXQUISITE CULINARY',
    description:
      'Tailored menus by verified gourmet chefs. Live interaction counters included.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 9v1" />
      </svg>
    ),
  },
  {
    tag: 'Stage & Floral',
    tagColor: 'bg-slate-100 text-black border-slate-200',
    title: 'THEME DECORATION',
    description:
      'Design themes ranging from grand mandaps to minimal modern setups.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
  {
    tag: 'Photography',
    tagColor: 'bg-slate-100 text-black border-slate-200',
    title: 'CINEMATIC FRAME',
    description:
      'Cinematic films, drone shoots, and high-fidelity candid coverage.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
  },
  {
    tag: 'Management',
    tagColor: 'bg-slate-100 text-black border-slate-200',
    title: 'EVENT PLANNING',
    description:
      'Guest onboarding, vendor coordination, and seamless execution.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className="relative px-6 py-20 sm:py-24 bg-white font-geist">
      <div className="max-w-7xl mx-auto">
        {/* section header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-black block mb-3">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
            Event Services
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-lg mx-auto leading-relaxed">
            Everything you need to create unforgettable moments — all under one roof.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-white border border-slate-200 hover:border-black rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
            >
              {/* icon */}
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-black text-black group-hover:text-white flex items-center justify-center transition-colors duration-300">
                {service.icon}
              </div>

              {/* tag */}
              <span
                className={`inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${service.tagColor}`}
              >
                {service.tag}
              </span>

              {/* content */}
              <h4 className="text-sm font-bold text-black group-hover:text-black transition-colors tracking-tight leading-snug">
                {service.title}
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
