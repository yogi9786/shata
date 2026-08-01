import logoSvg from '../assets/logo.svg'
import footerBgLandscape from '../assets/footer 1.png'
import footerBgPortrait from '../assets/footer portrait.png'
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
    <footer className="text-slate-900 py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden font-geist mt-[-2px]">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 639px)" srcSet={footerBgPortrait} />
          <img
            src={footerBgLandscape}
            alt="Footer Background"
            className="w-full h-full object-cover object-bottom"
          />
        </picture>
      </div>

      {/* Background gradients for seamless blending and glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] z-0 bg-gradient-to-t from-white/30 via-white/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
          {/* Brand & Logo */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <button 
              onClick={(e) => handleLinkClick(e, '#hero')} 
              className="inline-block group cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none mb-2"
            >
              <img
                src={logoSvg}
                alt="Shata Logo"
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform filter contrast-125 saturate-200 brightness-0"
              />
            </button>
            <p className="text-sm leading-relaxed text-slate-900/80 font-medium max-w-sm">
              India's leading digital marketplace for booking verified photography, luxury catering, floral stage decor, and full-spectrum event production.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <a 
                href="https://play.google.com/store/apps/details?id=com.shata.user" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-slate-900 hover:-translate-y-0.5 transition-all shadow-[0_8px_16px_rgba(0,0,0,0.15)] border border-white/10"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414C17.523 15.3414 16.5915 15.867 15.6888 16.3776L12.5977 12.8398L17.523 15.3414ZM12.0626 12.2359L3.06917 21.0503C3.3986 21.2678 3.8202 21.3283 4.26943 21.0827L11.4552 17.0601L12.0626 12.2359ZM11.6033 11.6663L3.10912 3.01307C3.10398 3.04561 3.10141 3.07843 3.10141 3.11153V20.7303C3.10141 20.8066 3.10777 20.8804 3.11979 20.9511L11.6033 11.6663ZM12.1645 11.139L15.6665 7.64332C16.5772 8.16335 17.523 8.68536 17.523 8.68536L12.1645 11.139ZM18.4239 12.0152C18.4239 12.0152 20.597 10.9254 20.6128 10.8931C20.8407 10.4283 20.5283 9.94825 20.1983 9.77196C19.7891 9.5539 18.2573 8.69259 18.2573 8.69259L15.9389 7.48911L12.7237 10.7259L15.9663 16.5186L18.4239 12.0152Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] font-medium leading-none mb-0.5 text-white/70">GET IT ON</div>
                  <div className="text-sm font-bold leading-none">Google Play</div>
                </div>
              </a>
              <a 
                href="https://apps.apple.com/in/app/shata/id6743954767" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-slate-900 hover:-translate-y-0.5 transition-all shadow-[0_8px_16px_rgba(0,0,0,0.15)] border border-white/10"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.85 1.83-2.09 3.58-3.53 4.08zM12.03 7.25C11.75 4.74 13.78 2.5 16.02 2c.28 2.55-2.04 4.88-3.99 5.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] font-medium leading-none mb-0.5 text-white/70">Download on the</div>
                  <div className="text-sm font-bold leading-none">App Store</div>
                </div>
              </a>
            </div>

            <div className="pt-6 mt-2 border-t border-slate-900/10 flex flex-col gap-4">
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-white/40 flex items-center justify-center text-slate-900 hover:text-black transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6.002c-.77.34-1.6.57-2.46.67.89-.53 1.57-1.37 1.89-2.38-.83.49-1.75.85-2.73 1.04-.78-.83-1.9-1.35-3.14-1.35-2.38 0-4.31 1.93-4.31 4.31 0 .34.04.67.11 1-3.58-.18-6.76-1.9-8.88-4.5-.37.64-.59 1.39-.59 2.18 0 1.5.76 2.82 1.92 3.59-.71-.02-1.38-.22-1.96-.54v.05c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.15-1.13.15-.28 0-.55-.03-.82-.08.55 1.72 2.15 2.97 4.04 3.01-1.48 1.16-3.35 1.85-5.38 1.85-.35 0-.69-.02-1.03-.06 1.92 1.23 4.19 1.95 6.64 1.95 7.97 0 12.32-6.6 12.32-12.32 0-.19 0-.38-.01-.56.85-.61 1.58-1.37 2.16-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-white/40 flex items-center justify-center text-slate-900 hover:text-black transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-white/40 flex items-center justify-center text-slate-900 hover:text-black transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-white/40 flex items-center justify-center text-slate-900 hover:text-black transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
              <p className="text-xs font-medium text-slate-900/60">
                &copy; {new Date().getFullYear()} Shata Events Pvt Ltd. All rights reserved.
              </p>
            </div>
          </div>

          {/* Links — Event Services */}
          <div className="col-span-1">
            <h5 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">Services</h5>
            <ul className="space-y-2 text-[13px] font-medium">
              {['Wedding Catering', 'Candid Photography', 'Stage Backdrop', 'Pre-wedding Shoots', 'Corporate Galas'].map(
                (item) => (
                  <li key={item}>
                    <a 
                      href="#vendors" 
                      onClick={(e) => handleLinkClick(e, '#vendors')}
                      className="text-slate-900/70 hover:text-white transition-colors block"
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
            <h5 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">Company</h5>
            <ul className="space-y-2 text-[13px] font-medium">
              <li>
                <a href="#" className="text-slate-900/70 hover:text-white transition-colors block">About Shata</a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handlePageNavigation(e, 'events')} className="text-slate-900/70 hover:text-white transition-colors block">Events</a>
              </li>
              <li>
                <a href="#why-shata" onClick={(e) => handlePageNavigation(e, 'why-shata')} className="text-slate-900/70 hover:text-white transition-colors block">Why Shata</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handlePageNavigation(e, 'contact')} className="text-slate-900/70 hover:text-white transition-colors block">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-slate-900/70 hover:text-white transition-colors block">Press & Media</a>
              </li>
            </ul>
          </div>

          {/* Links — Support */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h5 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3 mt-2 md:mt-0 lg:mt-0">Support &amp; Trust</h5>
            <ul className="space-y-2 text-[13px] font-medium">
              {['Help Center', 'Refund Policy', 'Terms of Service', 'Privacy Policy', 'Security Audit'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-900/70 hover:text-white transition-colors block">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
