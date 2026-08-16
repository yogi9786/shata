import downloadStoreImg from '../assets/appdownload.png'

export default function AppDownloadSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F3] font-jakarta">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E86F32]/12 to-transparent blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#fba14d]/10 to-transparent blur-[120px]" />
        <div className="absolute inset-0 dot-texture-light opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ─── LEFT: Content + Store Buttons ─── */}
          <div className="flex-1 w-full">
            {/* Tag */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86F32]/10 border border-[#E86F32]/20 text-[#E86F32] text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E86F32] animate-pulse-dot" />
              Now Available
            </span>

            {/* Headline */}
            <h2 className="font-jakarta text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.08] text-slate-900 mb-5">
              Book Your Dream Event From Your Phone
            </h2>

            {/* Body copy */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-md mb-4">
              The Shata app brings premium event planning to your fingertips.
              Browse verified vendors, compare real-time pricing, and lock in
              your perfect event — all in minutes.
            </p>

            {/* Feature bullets */}
            <ul className="space-y-2.5 mb-10">
              {[
                'Instant vendor availability & pricing',
                'Secure in-app payments with milestones',
                'Live event progress tracking',
                'Dedicated support, 24/7',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E86F32]/10 border border-[#E86F32]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#E86F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=com.shata.partner"
                target="_blank"
                rel="noopener noreferrer"
                id="download-play-store"
                aria-label="Download on Google Play"
                className="group flex items-center gap-3.5 px-6 py-3.5 bg-black border-none text-white font-bold tracking-tight rounded-none shadow-[4px_4px_0px_#E86F32] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer"
              >
                {/* Play Store icon */}
                <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.49a2.5 2.5 0 01-.68-.98V1.49C2.5.97 2.78.5 3.18.51L14.54 12 3.18 23.49z" fill="#EA4335" />
                  <path d="M18.75 15.82L14.54 12l4.21-3.82 2.87 1.65a1.5 1.5 0 010 2.34l-2.87 1.65z" fill="#FBBC05" />
                  <path d="M3.18.51L14.54 12 18.75 8.18 5.51.18A2.5 2.5 0 003.18.51z" fill="#4285F4" />
                  <path d="M3.18 23.49a2.5 2.5 0 002.33-.3l13.24-7.37-4.21-3.82L3.18 23.49z" fill="#34A853" />
                </svg>
                <div className="text-left font-jakarta">
                  <div className="text-white/70 text-[10px] font-medium leading-none mb-0.5 uppercase tracking-wider">
                    GET IT ON
                  </div>
                  <div className="text-white text-base font-bold leading-none">
                    Google Play
                  </div>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/in/app/shata/id6743954767"
                target="_blank"
                rel="noopener noreferrer"
                id="download-app-store"
                aria-label="Download on the App Store"
                className="group flex items-center gap-3.5 px-6 py-3.5 bg-black border-none text-white font-bold tracking-tight rounded-none shadow-[4px_4px_0px_#E86F32] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer"
              >
                {/* Apple icon */}
                <svg className="w-7 h-7 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left font-jakarta">
                  <div className="text-white/70 text-[10px] font-medium leading-none mb-0.5 uppercase tracking-wider">
                    DOWNLOAD ON THE
                  </div>
                  <div className="text-white text-base font-bold leading-none">
                    App Store
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* ─── RIGHT: App Image ─── */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <img
              src={downloadStoreImg}
              alt="Shata Download App"
              className="w-full max-w-[520px] sm:max-w-[540px] lg:max-w-[620px] max-h-[520px] sm:max-h-[540px] lg:max-h-[560px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
