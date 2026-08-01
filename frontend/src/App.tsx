import { useState, useEffect } from 'react'
import './App.css'
import { useScrollProgress } from './hooks/useScrollProgress'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'
import SuccessPage from './pages/SuccessPage'
import CheckoutPage from './pages/CheckoutPage'
import EventDetailsPage from './pages/EventDetailsPage'
import EventsPage from './pages/EventsPage'
import WhyShataPage from './pages/WhyShataPage'
import ContactUsPage from './pages/ContactUsPage'
import Footer from './components/Footer'

export type PageType = 'home' | 'booking' | 'success' | 'checkout' | 'event-details' | 'events' | 'why-shata' | 'contact'

interface BookingDetails {
  eventType: string
  startDate: string
  endDate: string
  budget: string
  location?: string
  bookingId?: string
  userName?: string
  userEmail?: string
  userPhone?: string
  specialRequests?: string
  paymentStatus?: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
}

function App() {
  const { scrollY, progress } = useScrollProgress(1000, 0)
  
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [preselectedEvent, setPreselectedEvent] = useState<string | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)

  // Parse URL to set initial state
  const parseUrl = () => {
    const path = window.location.pathname
    if (path.startsWith('/event/')) {
      const parts = path.split('/')
      const id = parseInt(parts[2], 10)
      if (!isNaN(id)) {
        setCurrentPage('event-details')
        setSelectedEventId(id)
        return
      }
    }
    if (path === '/booking') {
      setCurrentPage('booking')
      const params = new URLSearchParams(window.location.search)
      const eventName = params.get('event')
      if (eventName) {
        setPreselectedEvent(eventName)
      }
      return
    }
    if (path === '/checkout') {
      setCurrentPage('checkout')
      return
    }
    if (path === '/success') {
      setCurrentPage('success')
      return
    }
    if (path === '/events') {
      setCurrentPage('events')
      return
    }
    if (path === '/why-shata') {
      setCurrentPage('why-shata')
      return
    }
    if (path === '/contact') {
      setCurrentPage('contact')
      return
    }
    setCurrentPage('home')
  }

  // Initial load parsing
  useEffect(() => {
    parseUrl()
  }, [])

  // Popstate handler for back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      parseUrl()
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigate = (page: PageType, context?: string | number) => {
    let path = '/'
    if (page === 'booking') {
      if (typeof context === 'string') {
        setPreselectedEvent(context)
        path = `/booking?event=${encodeURIComponent(context)}`
      } else {
        path = '/booking'
      }
    } else if (page === 'event-details' && typeof context === 'number') {
      setSelectedEventId(context)
      path = `/event/${context}`
    } else if (page === 'checkout') {
      path = '/checkout'
    } else if (page === 'success') {
      path = '/success'
    } else if (page === 'events') {
      path = '/events'
    } else if (page === 'why-shata') {
      path = '/why-shata'
    } else if (page === 'contact') {
      path = '/contact'
    }

    if (page !== 'booking') {
      setPreselectedEvent(null)
    }

    window.history.pushState({ page, context }, '', path)
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBookingSubmit = (details: BookingDetails) => {
    setBookingDetails(details)
    handleNavigate('checkout')
  }

  const handleBookingConfirm = (finalDetails: BookingDetails) => {
    setBookingDetails(finalDetails)
    handleNavigate('success')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased overflow-x-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Global Glassmorphism Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-orange-400/20 via-amber-200/20 to-rose-300/10 blur-[120px] mix-blend-multiply animate-float opacity-80" />
        <div className="absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-yellow-300/20 via-orange-300/10 to-amber-200/20 blur-[100px] mix-blend-multiply animate-float opacity-70" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-rose-200/20 via-orange-200/15 to-yellow-100/10 blur-[140px] mix-blend-multiply animate-float opacity-70" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          <Header 
            scrollY={scrollY} 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            currentUser={currentUser}
            onUserUpdate={setCurrentUser}
          />
          
          <main>
            {currentPage === 'home' && (
              <HomePage scrollY={scrollY} progress={progress} onNavigate={handleNavigate} />
            )}
            {currentPage === 'event-details' && selectedEventId !== null && (
              <EventDetailsPage 
                eventId={selectedEventId}
                onNavigate={handleNavigate}
              />
            )}
            {currentPage === 'booking' && (
              <BookingPage 
                preselectedEvent={preselectedEvent} 
                onNavigate={handleNavigate} 
                onBookingSubmit={handleBookingSubmit} 
              />
            )}
            {currentPage === 'checkout' && (
              <CheckoutPage
                bookingDetails={bookingDetails}
                onNavigate={handleNavigate}
                onBookingConfirm={handleBookingConfirm}
                currentUser={currentUser}
              />
            )}
            {currentPage === 'success' && (
              <SuccessPage 
                bookingDetails={bookingDetails} 
                onNavigate={handleNavigate} 
              />
            )}
            {currentPage === 'events' && (
              <EventsPage onNavigate={handleNavigate} />
            )}
            {currentPage === 'why-shata' && (
              <WhyShataPage onNavigate={handleNavigate} />
            )}
            {currentPage === 'contact' && (
              <ContactUsPage onNavigate={handleNavigate} />
            )}
          </main>
        </div>
        
        <Footer onNavigate={handleNavigate} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default App
