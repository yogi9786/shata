import HeroSection from '../components/HeroSection'
import EventsGrid from '../components/EventsGrid'
import VideoSection from '../components/VideoSection'
import VendorMarketplace from '../components/VendorMarketplace'
import BookingBenefits from '../components/BookingBenefits'
import EventShowcaseCarousel from '../components/EventShowcaseCarousel'
import ServicesGrid from '../components/ServicesGrid'
import type { PageType } from '../App'

interface HomePageProps {
  scrollY: number
  progress: number
  onNavigate: (page: PageType, context?: string | number) => void
}

export default function HomePage({ scrollY, progress, onNavigate }: HomePageProps) {
  return (
    <>
      <HeroSection scrollY={scrollY} progress={progress} onNavigate={onNavigate} />
      <EventsGrid onNavigate={onNavigate} />
      <VideoSection />
      <VendorMarketplace onNavigate={onNavigate} />
      <ServicesGrid />
      <BookingBenefits />
      <EventShowcaseCarousel onNavigate={onNavigate} />
    </>
  )
}
