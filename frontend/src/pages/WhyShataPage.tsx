import type { PageType } from '../App'
import BookingBenefits from '../components/BookingBenefits'
import ServicesGrid from '../components/ServicesGrid'

interface WhyShataPageProps {
  onNavigate?: (page: PageType, context?: string | number) => void
}

export default function WhyShataPage({}: WhyShataPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── Premium Banner Section ─── */}
      <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden flex flex-col justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0 bg-[#fba14d]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full mt-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 backdrop-blur-md text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-black/10">
            Our Philosophy
          </span>
          <h1 className="font-geist text-4xl sm:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            Why Choose Shata?
          </h1>
          <p className="text-slate-700 font-medium max-w-xl mx-auto leading-relaxed">
            We don't just organize events; we engineer unforgettable experiences. Discover what makes us the premium choice for visionary clients.
          </p>
        </div>
      </div>

      <div className="pb-20">
        <BookingBenefits hideHeader={true} />
        <ServicesGrid />
      </div>
    </div>
  )
}
