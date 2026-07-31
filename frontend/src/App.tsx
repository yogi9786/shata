import './App.css'
import { useScrollProgress } from './hooks/useScrollProgress'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesGrid from './components/ServicesGrid'
import EventsGrid from './components/EventsGrid'
import VendorMarketplace from './components/VendorMarketplace'
import BookingBenefits from './components/BookingBenefits'
import EventShowcaseCarousel from './components/EventShowcaseCarousel'
import Footer from './components/Footer'

function App() {
  // Hero starburst expansion covers the first ~1000px of scroll
  const { scrollY, progress } = useScrollProgress(1000, 0)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased overflow-x-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Global Glassmorphism Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-orange-400/20 via-amber-200/20 to-rose-300/10 blur-[120px] mix-blend-multiply animate-float opacity-80" />
        <div className="absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-yellow-300/20 via-orange-300/10 to-amber-200/20 blur-[100px] mix-blend-multiply animate-float opacity-70" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-rose-200/20 via-orange-200/15 to-yellow-100/10 blur-[140px] mix-blend-multiply animate-float opacity-70" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        <Header scrollY={scrollY} />
        <HeroSection scrollY={scrollY} progress={progress} />
        <ServicesGrid />
        <EventsGrid />
        <VendorMarketplace />
        <BookingBenefits />
        <EventShowcaseCarousel />
        <Footer />
      </div>
    </div>
  )
}

export default App
