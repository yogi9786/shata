import logoSvg from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="bg-slate-950/70 backdrop-blur-2xl border-t border-white/10 text-slate-400 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden font-geist shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-t from-orange-600/10 via-amber-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Logo */}
          <div className="space-y-4">
            <a href="#hero" className="inline-block group">
              <img
                src={logoSvg}
                alt="Shata Logo"
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </a>
            <p className="text-xs leading-relaxed text-slate-400">
              India's leading digital marketplace for booking verified photography, luxury catering, floral stage decor, and full-spectrum event production.
            </p>
          </div>

          {/* Links — Event Services */}
          <div>
            <h5 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4">Event Services</h5>
            <ul className="space-y-2.5 text-xs">
              {['Wedding Catering', 'Candid Photography', 'Stage Backdrop Decor', 'Pre-wedding Shoots', 'Corporate Galas'].map(
                (item) => (
                  <li key={item}>
                    <a href="#vendors" className="hover:text-orange-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links — Company */}
          <div>
            <h5 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2.5 text-xs">
              {['About Shata', 'Verified Audits', 'Partner Registry', 'Careers', 'Press & Media'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links — Support */}
          <div>
            <h5 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4">Support &amp; Trust</h5>
            <ul className="space-y-2.5 text-xs">
              {['Help Center', 'Direct Refund Policy', 'Terms of Service', 'Privacy Policy', 'Security Audit'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Shata Events Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
              <a key={social} href="#" className="hover:text-amber-400 transition-colors font-medium">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
