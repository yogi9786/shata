import { useState } from 'react'
import logoSvg from '../assets/logo.svg'

interface HeaderProps {
  scrollY: number
}

export default function Header({ scrollY }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrolled = scrollY > 20

  const navLinks = [
    { href: '#hero', label: 'HOME' },
    { href: '#services', label: 'SERVICES' },
    { href: '#vendors', label: 'BOOK VENDERS' },
    { href: '#events-grid', label: 'EVENT' },
    { href: '#benefits', label: 'WHY SHATA' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 font-geist">
      <div
        className={`max-w-7xl mx-auto rounded-xl py-2 px-4 sm:px-5 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'bg-white border border-slate-200/90 shadow-md text-black'
            : 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm text-white'
        }`}
      >
        {/* Brand Logo with logo.svg ONLY */}
        <a href="#hero" className="flex items-center group">
          <img src={logoSvg} alt="Logo" className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
        </a>

        {/* Desktop Nav — Pure Black Text */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium transition-opacity tracking-tight hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons — Pure Black Style */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#vendors"
            className={`text-[13px] font-medium transition-opacity tracking-tight hover:opacity-70 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            PARTNER WITH US
          </a>
          <a
            href="#hero"
            className={`group/btn text-[13px] font-semibold px-4.5 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-1 ${
              scrolled ? 'bg-black hover:bg-slate-800 text-white' : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
            }`}
          >
            <span>BOOK NOW</span>
            <svg
              className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-black cursor-pointer"
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

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-1.5 bg-white backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl p-4 flex flex-col gap-2.5 font-geist">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-600 hover:text-black py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-slate-100 my-0.5" />
          <a
            href="#hero"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center text-xs font-bold text-white bg-black py-2.5 rounded-lg shadow-md"
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  )
}
