import './App.css'
import { useScrollProgress } from './hooks/useScrollProgress'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesGrid from './components/ServicesGrid'
import VendorMarketplace from './components/VendorMarketplace'
import BookingBenefits from './components/BookingBenefits'
import Footer from './components/Footer'

function App() {
  // Hero starburst expansion covers the first ~1000px of scroll
  const { scrollY, progress } = useScrollProgress(1000, 0)

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased overflow-x-hidden">
      <Header scrollY={scrollY} />
      <HeroSection scrollY={scrollY} progress={progress} />
      <ServicesGrid />
      <VendorMarketplace />
      <BookingBenefits />
      <Footer />
    </div>
  )
}

export default App
