export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-base shadow shadow-orange-500/30">
              S
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              SHATA<span className="text-orange-500">.</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-500 mb-6">
            India's leading digital marketplace for booking verified photography,
            luxury catering, floral stages and event production services.
          </p>
        </div>

        {/* Links — Event Services */}
        <div>
          <h5 className="text-white font-bold text-sm mb-4">Event Services</h5>
          <ul className="space-y-2.5 text-xs">
            {['Wedding Catering', 'Candid Photography', 'Stage Backdrop Decor', 'Pre-wedding Shoots'].map(
              (item) => (
                <li key={item}>
                  <a href="#vendors" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Links — Company */}
        <div>
          <h5 className="text-white font-bold text-sm mb-4">Company</h5>
          <ul className="space-y-2.5 text-xs">
            {['About Shata', 'Verified Audits', 'Partner Registry', 'Careers'].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Links — Support */}
        <div>
          <h5 className="text-white font-bold text-sm mb-4">Support & Trust</h5>
          <ul className="space-y-2.5 text-xs">
            {['Help Center', 'Direct Refund Policy', 'Terms of Use', 'Privacy Policy'].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-800/60 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Shata Events Pvt Ltd. All rights reserved.</p>
        <div className="flex gap-5">
          {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
            <a key={social} href="#" className="hover:text-slate-300 transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
