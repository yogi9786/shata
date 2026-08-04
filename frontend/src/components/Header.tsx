import { useState } from 'react'
import logoSvg from '../assets/logo.svg'
import type { PageType } from '../App'
import type { UserProfile } from '../App'

interface HeaderProps {
  scrollY: number
  currentPage: PageType
  onNavigate: (page: PageType, context?: string | number) => void
  currentUser: UserProfile | null
  onUserUpdate: (user: UserProfile | null) => void
}

export default function Header({ scrollY, currentPage, onNavigate, currentUser, onUserUpdate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  
  // Login form states
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')
  const [authName, setAuthName] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPhone, setAuthPhone] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const scrolled = scrollY > 20 || currentPage !== 'home'

  const navLinks = [
    { page: 'home' as PageType, label: 'HOME' },
    { page: 'events' as PageType, label: 'EVENTS' },
    { page: 'why-shata' as PageType, label: 'WHY SHATA' },
    { page: 'contact' as PageType, label: 'CONTACT US' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPage: PageType) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (currentPage !== targetPage) {
      onNavigate(targetPage)
    }
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const elementId = href.replace('#', '')
    if (currentPage !== 'home') {
      onNavigate('home')
      setTimeout(() => {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    } else {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    try {
      if (authTab === 'signin') {
        if (!authEmail.trim() || !authPassword.trim()) {
          return setAuthError('Please fill in all fields.')
        }
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authEmail,
            password: authPassword,
          }),
        })

        const data = await response.json()
        if (!response.ok) {
          return setAuthError(data.detail || 'Invalid email or password.')
        }

        onUserUpdate(data.user)
      } else {
        if (!authName.trim() || !authEmail.trim() || !authPhone.trim() || !authPassword.trim()) {
          return setAuthError('Please fill in all fields.')
        }
        const response = await fetch('http://localhost:8000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: authName,
            email: authEmail,
            phone: authPhone,
            password: authPassword,
          }),
        })

        const data = await response.json()
        if (!response.ok) {
          return setAuthError(data.detail || 'Registration failed.')
        }

        onUserUpdate(data.user)
      }

      // Reset states and close modal
      setAuthName('')
      setAuthEmail('')
      setAuthPhone('')
      setAuthPassword('')
      setIsLoginModalOpen(false)
    } catch (err) {
      setAuthError('Unable to connect to auth server.')
    }
  }

  const getUserInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 font-geist">
        <div
          className={`max-w-7xl mx-auto rounded-xl py-2 px-4 sm:px-5 flex justify-between items-center transition-all duration-500 ${
            scrolled
              ? 'bg-white border border-slate-200/90 shadow-md text-black'
              : 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm text-white'
          }`}
        >
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center group cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
          >
            <img src={logoSvg} alt="Logo" className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.page === 'home' ? '' : link.page}`}
                onClick={(e) => handleLinkClick(e, link.page)}
                className={`text-[13px] font-medium transition-opacity tracking-tight hover:opacity-70 ${
                  scrolled ? 'text-black' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4 relative">
            <a
              href="https://play.google.com/store/apps/details?id=com.shata.partner"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[13px] font-medium transition-opacity tracking-tight hover:opacity-70 cursor-pointer ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              PARTNER WITH US
            </a>
            
            <button
              onClick={() => onNavigate('booking')}
              className={`group/btn text-[13px] font-semibold px-4.5 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-1 focus:outline-none ${
                scrolled ? 'bg-black hover:bg-slate-800 text-white' : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
              }`}
            >
              <span>BOOK NOW</span>
              <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Profile Dropdown or Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-8.5 h-8.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
                >
                  {getUserInitials(currentUser.name)}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-4 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="border-b border-slate-100 pb-3 mb-3 text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Account</p>
                      <h4 className="font-bold text-slate-900 truncate mt-0.5">{currentUser.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{currentUser.phone}</p>
                    </div>
                    <button
                      onClick={() => {
                        onUserUpdate(null)
                        setIsProfileDropdownOpen(false)
                      }}
                      className="w-full py-2 bg-rose-50 text-rose-600 hover:bg-rose-100/70 font-semibold text-xs rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  scrolled ? 'border-slate-300 text-slate-700 hover:border-black' : 'border-white/40 text-white hover:border-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile elements */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  onUserUpdate(null)
                  alert('Logged out successfully')
                }}
                className="w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm"
              >
                {getUserInitials(currentUser.name)}
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-300 text-slate-600"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-black cursor-pointer focus:outline-none"
            >
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-1.5 bg-white backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl p-4 flex flex-col gap-2.5 font-geist animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.page === 'home' ? '' : link.page}`}
                onClick={(e) => handleLinkClick(e, link.page)}
                className="text-xs font-semibold text-slate-600 hover:text-black py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-slate-100 my-0.5" />
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                onNavigate('booking')
              }}
              className="w-full text-center text-xs font-bold text-white bg-black py-2.5 rounded-lg shadow-md cursor-pointer border-0 focus:outline-none"
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* ── Premium Responsive Login/Register Modal ── */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md p-5 sm:p-8 rounded-[2rem] bg-white border border-slate-200/90 shadow-[0_24px_70px_-15px_rgba(234,88,12,0.15)] animate-in scale-in duration-300 text-slate-900 font-['Plus_Jakarta_Sans',_sans-serif] text-center overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Close Button */}
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-all duration-200 cursor-pointer border-0 focus:outline-none"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <img src={logoSvg} alt="Shata Logo" className="h-6 w-auto mx-auto mb-4 relative z-10" />
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900 relative z-10">
              {authTab === 'signin' ? 'Sign In to Shata' : 'Create an Account'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto relative z-10 leading-relaxed">
              {authTab === 'signin' ? 'Manage your bookings and secure premium planners.' : 'Sign up to configure dates and pay reservation fees.'}
            </p>

            {/* iOS-Style Segmented Tab Switcher */}
            <div className="grid grid-cols-2 gap-1 mt-6 mb-6 p-1 rounded-2xl bg-slate-50 border border-slate-200/80 relative z-10">
              <button
                onClick={() => { setAuthTab('signin'); setAuthError(''); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-0 focus:outline-none ${
                  authTab === 'signin' 
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10' 
                    : 'text-slate-500 hover:text-slate-800 bg-transparent'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthTab('signup'); setAuthError(''); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-0 focus:outline-none ${
                  authTab === 'signup' 
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10' 
                    : 'text-slate-500 hover:text-slate-800 bg-transparent'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4.5 text-left relative z-10">
              {authTab === 'signup' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-4.5 py-3 bg-slate-50/50 border border-slate-200/90 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium shadow-inner"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4.5 py-3 bg-slate-50/50 border border-slate-200/90 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium shadow-inner"
                />
              </div>

              {authTab === 'signup' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full px-4.5 py-3 bg-slate-50/50 border border-slate-200/90 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium shadow-inner"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-4.5 py-3 bg-slate-50/50 border border-slate-200/90 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium shadow-inner"
                />
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-semibold">
                  ⚠️ {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-orange-500/15 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-0 focus:outline-none"
              >
                {authTab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
