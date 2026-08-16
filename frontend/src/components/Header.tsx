import { useState, useEffect } from 'react'
import logoSvg from '../assets/logo.svg'
import type { PageType } from '../App'
import type { UserProfile } from '../App'
import { API_BASE_URL } from '../config'

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
  
  // Hero section is ~100vh tall. Only show header AFTER user scrolls past it.
  // We use 60% of window height as the trigger point so it feels natural.
  const HERO_THRESHOLD = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 500

  // Scroll behavior: completely hidden inside hero, slides in after hero
  const [visible, setVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const delta = scrollY - lastScrollY
    
    if (scrollY < HERO_THRESHOLD) {
      // Inside hero — always hidden
      setVisible(false)
    } else {
      // Past hero: hide when scrolling down, show when scrolling up
      // Adding a scroll delta of 8px to prevent micro-scrolling jitters
      if (Math.abs(delta) > 8) {
        if (delta > 0) {
          setVisible(false) // scrolling down
        } else {
          setVisible(true)  // scrolling up
        }
      }
    }
    setLastScrollY(scrollY)
  }, [scrollY, HERO_THRESHOLD])

  // Login form states
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')
  const [authName, setAuthName] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPhone, setAuthPhone] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const scrolled = scrollY > HERO_THRESHOLD || currentPage !== 'home'

  const navLinks = [
    { page: 'home' as PageType, label: 'HOME' },
    { page: 'events' as PageType, label: 'EVENTS' },
    { page: 'why-shata' as PageType, label: 'WHY SHATA' },
    { page: 'contact' as PageType, label: 'CONTACT US' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPage: PageType) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    onNavigate(targetPage)
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    const endpoint = authTab === 'signin' ? '/api/auth/login' : '/api/auth/register'
    const payload = authTab === 'signin' 
      ? { email: authEmail, password: authPassword }
      : { name: authName, email: authEmail, phone: authPhone, password: authPassword }

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || 'Authentication failed')
      }

      onUserUpdate(data.user)
      setIsLoginModalOpen(false)
      // Reset form fields
      setAuthName('')
      setAuthEmail('')
      setAuthPhone('')
      setAuthPassword('')
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred')
    }
  }

  const getUserInitials = (name: string) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  // On non-home pages, always show header immediately
  const isHeaderVisible = currentPage !== 'home'
    ? true
    : (visible || isMobileMenuOpen)

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 font-geist ${
        isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div
          className={`max-w-7xl mx-auto rounded-2xl py-2.5 px-4 sm:px-5 flex justify-between items-center transition-all duration-300 ${
            scrolled
              ? 'bg-[#FFF8F3]/85 backdrop-blur-xl border border-[#E86F32]/10 shadow-md'
              : 'bg-[#FFF8F3]/40 backdrop-blur-md border border-white/20'
          }`}
        >
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center group cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
          >
            <img src={logoSvg} alt="Logo" className={`h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform ${scrolled ? '' : 'brightness-0'}`} />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.page === 'home' ? '' : link.page}`}
                onClick={(e) => handleLinkClick(e, link.page)}
                className={`text-[13px] font-semibold transition-all tracking-tight cursor-pointer ${
                  currentPage === link.page
                    ? 'text-[#E86F32]'
                    : scrolled ? 'text-black hover:text-[#E86F32]' : 'text-slate-900 hover:text-[#E86F32]'
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
              className="text-[12px] font-bold px-4 py-2 bg-black border-none text-white tracking-tight rounded-none shadow-[3px_3px_0px_#E86F32] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer font-jakarta"
            >
              PARTNER WITH US
            </a>

            {/* Profile Dropdown or Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-8.5 h-8.5 rounded-full bg-[#E86F32] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer relative focus:outline-none"
                >
                  {getUserInitials(currentUser.name)}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-black border-2 border-white" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white border border-black/10 shadow-2xl p-4 text-black animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="border-b border-black/10 pb-3 mb-3 text-left">
                      <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest">Active Account</p>
                      <h4 className="font-bold text-black truncate mt-0.5">{currentUser.name}</h4>
                      <p className="text-xs text-black/70 truncate">{currentUser.email}</p>
                      <p className="text-[10px] text-black/50 mt-0.5">{currentUser.phone}</p>
                    </div>
                    <button
                      onClick={() => {
                        onUserUpdate(null)
                        setIsProfileDropdownOpen(false)
                      }}
                      className="w-full py-2 bg-black/5 text-black hover:bg-black/10 font-semibold text-xs rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer focus:outline-none ${scrolled ? 'border-black/20 text-black/70 hover:text-[#E86F32] hover:border-[#E86F32]/50' : 'border-black/30 text-black/80 hover:text-[#E86F32]'}`}
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
                className="w-7 h-7 rounded-full bg-[#E86F32] text-white flex items-center justify-center font-bold text-[10px] shadow-sm focus:outline-none"
              >
                {getUserInitials(currentUser.name)}
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer focus:outline-none ${scrolled ? 'border-black/20 text-black/70 hover:text-[#E86F32]' : 'border-black/30 text-black/80 hover:text-[#E86F32]'}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 cursor-pointer focus:outline-none ${scrolled ? 'text-black/70 hover:text-black' : 'text-black/70 hover:text-[#E86F32]'}`}
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
          <div className="md:hidden mt-2 bg-[#FFF8F3]/95 backdrop-blur-2xl border border-black/5 rounded-2xl shadow-xl shadow-black/5 p-4 flex flex-col gap-2 font-geist">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.page === 'home' ? '' : link.page}`}
                onClick={(e) => handleLinkClick(e, link.page)}
                className={`text-sm font-bold py-2 px-3 rounded-xl transition-colors ${
                  currentPage === link.page ? 'text-[#E86F32] bg-[#E86F32]/5' : 'text-black/70 hover:text-[#E86F32] hover:bg-[#E86F32]/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-black/5 my-1" />
            <a
              href="https://play.google.com/store/apps/details?id=com.shata.partner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-xs font-bold text-white bg-black hover:bg-[#E86F32] py-2.5 rounded-xl shadow-xs transition-colors"
            >
              PARTNER WITH US
            </a>
          </div>
        )}
      </header>

      {/* ── Premium Responsive Login/Register Modal ── */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md p-5 sm:p-8 rounded-[2rem] bg-black border border-white/10 shadow-2xl animate-in scale-in duration-300 text-white font-geist text-center overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#E86F32]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Close Button */}
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer border-0 focus:outline-none"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <img src={logoSvg} alt="Shata Logo" className="h-6 w-auto mx-auto mb-4 relative z-10 brightness-0 invert" />
            <h3 className="text-xl font-extrabold tracking-tight text-white relative z-10">
              {authTab === 'signin' ? 'Sign In to Shata' : 'Create an Account'}
            </h3>
            <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto relative z-10 leading-relaxed">
              {authTab === 'signin' ? 'Manage your bookings and secure premium planners.' : 'Sign up to configure dates and pay reservation fees.'}
            </p>

            {/* Segmented Tab Switcher */}
            <div className="grid grid-cols-2 gap-1 mt-6 mb-6 p-1 rounded-2xl bg-white/5 border border-white/10 relative z-10">
              <button
                onClick={() => { setAuthTab('signin'); setAuthError(''); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-0 focus:outline-none ${
                  authTab === 'signin' 
                    ? 'bg-[#E86F32] text-white shadow-md shadow-[#E86F32]/20' 
                    : 'text-white/50 hover:text-white bg-transparent'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthTab('signup'); setAuthError(''); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-0 focus:outline-none ${
                  authTab === 'signup' 
                    ? 'bg-[#E86F32] text-white shadow-md shadow-[#E86F32]/20' 
                    : 'text-white/50 hover:text-white bg-transparent'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-left relative z-10">
              {authTab === 'signup' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E86F32]/60 focus:ring-2 focus:ring-[#E86F32]/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E86F32]/60 focus:ring-2 focus:ring-[#E86F32]/20 transition-all"
                />
              </div>

              {authTab === 'signup' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E86F32]/60 focus:ring-2 focus:ring-[#E86F32]/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E86F32]/60 focus:ring-2 focus:ring-[#E86F32]/20 transition-all"
                />
              </div>

              {authError && (
                <div className="p-3 bg-black border border-[#E86F32]/50 text-[#E86F32] rounded-2xl text-xs font-semibold">
                  ⚠️ {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-[#E86F32] hover:bg-[#D96129] text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-[#E86F32]/25 hover:shadow-[#E86F32]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-0 focus:outline-none"
              >
                {authTab === 'signin' ? 'Sign In →' : 'Create Account →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
