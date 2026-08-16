import logoSvg from '../assets/logo.svg'
import type { PageType } from '../App'

interface FooterProps {
  onNavigate: (page: PageType, context?: string | number) => void
  currentPage: PageType
}

export default function Footer({ onNavigate, currentPage }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault()
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

  const handlePageNavigation = (e: React.MouseEvent<HTMLAnchorElement>, page: PageType) => {
    e.preventDefault()
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#FFF8F3] text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-jakarta border-t border-black/10 mt-[-2px]">

      {/* Inject Keyframes for Water Wave Animation */}
      <style>{`
        @keyframes wave-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave-slow {
          animation: wave-horizontal 22s linear infinite;
        }
        .animate-wave-medium {
          animation: wave-horizontal 15s linear infinite;
        }
      `}</style>

      {/* Subtle Glowing Accents matching brand orange theme */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#E86F32]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#E86F32]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated Water Waves in the Background */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none overflow-hidden z-0 select-none opacity-60">
        <svg className="absolute bottom-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2000 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 C1650,100 1850,20 2000,60 L2000,120 L0,120 Z"
            fill="#E86F32"
            className="opacity-[0.05]"
          />
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2000 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,80 C200,45 350,105 500,80 C650,55 800,115 1000,80 C1150,55 1300,115 1500,80 C1650,55 1800,115 2000,80 L2000,120 L0,120 Z"
            fill="#E86F32"
            className="opacity-[0.08]"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
          {/* Brand & Logo */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-6">
            <button
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="inline-block group cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none mb-2"
            >
              <img
                src={logoSvg}
                alt="Shata Logo"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </button>
            <p className="text-sm leading-relaxed text-slate-600 font-medium max-w-sm">
              India's leading digital marketplace for booking verified photography, luxury catering, floral stage decor, and full-spectrum event production.
            </p>

            {/* Play Store & App Store Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.shata.partner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Google Play"
                className="group flex items-center gap-3 px-4 py-2.5 bg-black border-none text-white font-bold tracking-tight rounded-none shadow-[3px_3px_0px_#E86F32] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.49a2.5 2.5 0 01-.68-.98V1.49C2.5.97 2.78.5 3.18.51L14.54 12 3.18 23.49z" fill="#EA4335" />
                  <path d="M18.75 15.82L14.54 12l4.21-3.82 2.87 1.65a1.5 1.5 0 010 2.34l-2.87 1.65z" fill="#FBBC05" />
                  <path d="M3.18.51L14.54 12 18.75 8.18 5.51.18A2.5 2.5 0 003.18.51z" fill="#4285F4" />
                  <path d="M3.18 23.49a2.5 2.5 0 002.33-.3l13.24-7.37-4.21-3.82L3.18 23.49z" fill="#34A853" />
                </svg>
                <div className="text-left font-jakarta">
                  <div className="text-white/70 text-[9px] font-medium leading-none mb-0.5 uppercase tracking-wider">
                    GET IT ON
                  </div>
                  <div className="text-white text-xs font-bold leading-none">
                    Google Play
                  </div>
                </div>
              </a>
              <a
                href="https://apps.apple.com/in/app/shata/id6743954767"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="group flex items-center gap-3 px-4 py-2.5 bg-black border-none text-white font-bold tracking-tight rounded-none shadow-[3px_3px_0px_#E86F32] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left font-jakarta">
                  <div className="text-white/70 text-[9px] font-medium leading-none mb-0.5 uppercase tracking-wider">
                    DOWNLOAD ON THE
                  </div>
                  <div className="text-white text-xs font-bold leading-none">
                    App Store
                  </div>
                </div>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 border-t border-black/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-2">
                <div className="flex gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/shataapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#E86F32] flex items-center justify-center text-slate-600 hover:text-white transition-all hover:scale-110"
                    title="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                    </svg>
                  </a>
                  {/* Twitter / X */}
                  <a
                    href="https://x.com/AppShata?t=cH_73mfHFijPtVNGsNDfOA&s=08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#E86F32] flex items-center justify-center text-slate-600 hover:text-white transition-all hover:scale-110"
                    title="Twitter / X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/shata/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#E86F32] flex items-center justify-center text-slate-600 hover:text-white transition-all hover:scale-110"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/shata_app/profilecard/?igsh=MWhiNDVreGRicTM2cA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-[#E86F32] flex items-center justify-center text-slate-600 hover:text-white transition-all hover:scale-110"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </a>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-1 sm:mt-0">
                  &copy; {new Date().getFullYear()} Shata Events Pvt Ltd. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Links — Event Services */}
          <div className="col-span-1">
            <h5 className="text-slate-900 font-bold text-sm mb-4">Services</h5>
            <ul className="space-y-3 text-[13px] font-medium">
              {['Wedding Catering', 'Candid Photography', 'Stage Backdrop', 'Pre-wedding Shoots', 'Corporate Galas'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#vendors"
                      onClick={(e) => handleLinkClick(e, '#vendors')}
                      className="text-slate-600 hover:text-[#E86F32] transition-colors block"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links — Company */}
          <div className="col-span-1">
            <h5 className="text-slate-900 font-bold text-sm mb-4">Company</h5>
            <ul className="space-y-3 text-[13px] font-medium">
              <li>
                <a href="#" className="text-slate-600 hover:text-[#E86F32] transition-colors block">About Shata</a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handlePageNavigation(e, 'events')} className="text-slate-600 hover:text-[#E86F32] transition-colors block">Events</a>
              </li>
              <li>
                <a href="#why-shata" onClick={(e) => handlePageNavigation(e, 'why-shata')} className="text-slate-600 hover:text-[#E86F32] transition-colors block">Why Shata</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handlePageNavigation(e, 'contact')} className="text-slate-600 hover:text-[#E86F32] transition-colors block">Contact Us</a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => handlePageNavigation(e, 'careers')} className="text-slate-600 hover:text-[#E86F32] transition-colors block">Careers</a>
              </li>
            </ul>
          </div>

          {/* Links — Support / Policies */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h5 className="text-slate-900 font-bold text-sm mb-4 mt-2 md:mt-0 lg:mt-0">Support</h5>
            <ul className="space-y-3 text-[13px] font-medium">
              <li>
                <a href="#" className="text-slate-600 hover:text-[#E86F32] transition-colors block">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-[#E86F32] transition-colors block">Refund Policy</a>
              </li>
              <li>
                <a
                  href="https://www.shata.in/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#E86F32] transition-colors block"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://www.shata.in/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#E86F32] transition-colors block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-[#E86F32] transition-colors block">Security Audit</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
