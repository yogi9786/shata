import { useState } from 'react'
import type { PageType } from '../App'
import { useEvents } from '../hooks/useEvents'
import logoSvg from '../assets/logo.svg'

interface HeroSectionProps {
  scrollY: number
  progress: number
  onNavigate: (page: PageType, context?: string | number) => void
}

// Tab "kind" controls what renders in the browser body.
// 'main'    -> the real Shata Events dashboard (tab id 1, never closable via tab-close)
// 'search'  -> live search workspace (currently the only new-tab kind we open)
// 'chatbot' -> RESERVED for the upcoming assistant tab. Not wired up yet — every
//              new tab currently opens as 'search' regardless of intent. Once the
//              chatbot ships, branch handleNewTab() to accept a kind argument and
//              render <ChatbotWorkspace /> where the TODO comment is below.
type TabKind = 'main' | 'search' | 'chatbot'

interface BrowserTab {
  id: number
  title: string
  url: string
  kind: TabKind
}

const NAV_LINKS = [
  { label: 'HOME', href: 'http://localhost:3000/' },
  { label: 'EVENTS', href: 'http://localhost:3000/events' },
  { label: 'WHY SHATA', href: 'http://localhost:3000/why-shata' },
  { label: 'CONTACT US', href: 'http://localhost:3000/contact' },
]

const PARTNER_URL = 'https://play.google.com/store/apps/details?id=com.shata.partner'

function PlayStoreIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3.5C4 2.9 4.35 2.4 4.86 2.13L14.4 12L4.86 21.87C4.35 21.6 4 21.1 4 20.5V3.5Z" fill="#00D2FF" />
      <path d="M14.4 12L17.8 8.75L6.2 2.4C5.75 2.15 5.25 2.08 4.86 2.13L14.4 12Z" fill="#00F076" />
      <path d="M14.4 12L4.86 21.87C5.25 21.92 5.75 21.85 6.2 21.6L17.8 15.25L14.4 12Z" fill="#FF3A44" />
      <path d="M17.8 8.75L14.4 12L17.8 15.25L20.9 13.55C21.7 13.1 21.7 10.9 20.9 10.45L17.8 8.75Z" fill="#FFCE00" />
    </svg>
  )
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { events, loading } = useEvents()
  const featuredEvents = events.slice(0, 2)

  // Interactive OS state
  const [currentOS, setCurrentOS] = useState<'macos' | 'windows'>('macos')

  // Top nav (mobile) state
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Interactive Browser Tabs state
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: 1, title: 'Shata Events', url: 'shata.com', kind: 'main' },
  ])
  const [activeTabId, setActiveTabId] = useState<number>(1)
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0]

  const isMac = currentOS === 'macos'

  const handleNewTab = () => {
    const nextId = tabs.length > 0 ? Math.max(...tabs.map((t) => t.id)) + 1 : 1
    const searchTabCount = tabs.filter((t) => t.kind !== 'main').length + 1
    // Chatbot kind isn't live yet — every new tab opens as 'search' for now.
    const newTab: BrowserTab = {
      id: nextId,
      title: `Search ${searchTabCount}`,
      url: `shata.com/search-${nextId}`,
      kind: 'search',
    }
    setTabs((prev) => [...prev, newTab])
    setActiveTabId(nextId)
  }

  const handleCloseTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    // Closing the main tab or the last remaining tab triggers OS toggle
    if (id === 1 || tabs.length <= 1) {
      setCurrentOS((prev) => (prev === 'macos' ? 'windows' : 'macos'))
      return
    }
    const newTabs = tabs.filter((t) => t.id !== id)
    setTabs(newTabs)
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id)
    }
  }

  return (
    <section
      id="hero"
      className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center py-6 sm:py-10 lg:py-4 px-3 sm:px-6 lg:px-8 transition-colors duration-700 ${
        isMac ? 'bg-[#FAFAF8]' : 'bg-[#FFF9F5]'
      }`}
    >
      {/* CENTRAL FLAT DASHBOARD CONTAINER */}
      <div className="relative z-10 w-full max-w-[1200px] lg:max-w-[1380px] mx-auto">


        {/* Flat Browser Screen Container */}
        <div
          className={`w-full rounded-[2rem] sm:rounded-[3rem] pt-5 pb-6 px-6 sm:pt-6 sm:pb-10 sm:px-10 lg:pt-5 lg:pb-7 lg:px-9 border-[3px] flex flex-col relative overflow-hidden transition-all duration-700 ease-in-out ${
            isMac
              ? 'bg-gradient-to-br from-[#FFFBF8] to-[#FFF0E5] border-[#FFDFC9] shadow-[0_20px_60px_rgba(255,117,24,0.08)]'
              : 'bg-white/90 backdrop-blur-2xl border-[#FFD5B8] shadow-[0_20px_80px_rgba(255,117,24,0.1)] text-gray-900'
          }`}
        >
          {/* ---- Windows BG Decorative Layers ---- */}
          {!isMac && (
            <>
              {/* Soft orange glow top-right */}
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF7518]/10 blur-[80px] pointer-events-none" />
              {/* Soft peach glow bottom-left */}
              <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#FFB347]/15 blur-[60px] pointer-events-none" />
              {/* Minimal light gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
            </>
          )}
          {/* Inner Glow/Reflection */}
          <div className={`absolute top-0 left-0 w-full h-1/3 pointer-events-none transition-opacity duration-700 ${
            isMac ? 'bg-gradient-to-b from-white/40 to-transparent opacity-100' : 'bg-gradient-to-b from-white/60 to-transparent opacity-100'
          }`} />

          {/* ======================================================== */}
          {/* BROWSER HEADER SECTION                                   */}
          {/* ======================================================== */}
          {isMac ? (
            /* macOS Safari style browser header */
            <div className="flex items-center justify-between border-b border-[#FFE2D1] pb-3.5 mb-6 sm:mb-8 gap-3 select-none animate-fadeIn">
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-1.5 group/dots flex-shrink-0">
                <div
                  onClick={() => setCurrentOS('windows')}
                  className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 relative"
                  title="Switch to Windows UI"
                >
                  <span className="absolute text-[8px] text-[#4c0002] font-black opacity-0 group-hover/dots:opacity-100 transition-opacity select-none leading-none -mt-[0.5px]">×</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center relative cursor-not-allowed">
                  <span className="absolute text-[8px] text-[#5c3e00] font-black opacity-0 group-hover/dots:opacity-100 transition-opacity select-none leading-none -mt-[1px]">–</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center relative cursor-not-allowed">
                  <span className="absolute text-[6px] text-[#024b00] font-black opacity-0 group-hover/dots:opacity-100 transition-opacity select-none leading-none">⤢</span>
                </div>
              </div>

              {/* OS label */}
              <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-gray-400 uppercase flex-shrink-0 ml-1">Safari</span>

              {/* macOS Safari Browser Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 justify-start ml-2">
                {tabs.map((tab) => {
                  const isActive = activeTabId === tab.id
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`group/tab flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex-shrink-0 ${
                        isActive
                          ? 'bg-white text-[#FF7518] shadow-sm border border-[#FFE2D1]'
                          : 'text-gray-500 hover:bg-black/5 hover:text-gray-800'
                      }`}
                    >
                      {tab.kind === 'main' ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                          <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                        </svg>
                      )}
                      <span className="max-w-[85px] sm:max-w-[120px] truncate">{tab.title}</span>
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-gray-400 hover:bg-black/10 hover:text-black transition-colors text-[9px] font-bold"
                        title="Close tab"
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={handleNewTab}
                  className="w-6 h-6 rounded-md hover:bg-black/5 flex items-center justify-center text-gray-500 hover:text-black transition-colors font-bold text-sm flex-shrink-0"
                  title="Open New Tab"
                >
                  +
                </button>
              </div>

              {/* Nav text right side — lg screens only */}
              <div className="hidden lg:flex items-center gap-4 ml-3 flex-shrink-0">
                <a href="http://localhost:3000/" className="text-[10px] font-semibold tracking-wide text-black hover:text-[#FF7518] transition-colors">HOME</a>
                <a href="http://localhost:3000/events" className="text-[10px] font-semibold tracking-wide text-black hover:text-[#FF7518] transition-colors">EVENTS</a>
                <a href="http://localhost:3000/why-shata" className="text-[10px] font-semibold tracking-wide text-black hover:text-[#FF7518] transition-colors">WHY SHATA</a>
                <a href="http://localhost:3000/contact" className="text-[10px] font-semibold tracking-wide text-black hover:text-[#FF7518] transition-colors">CONTACT US</a>
                <a href={PARTNER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 pl-2 pr-2.5 py-1 rounded-full bg-black text-white text-[9px] font-bold tracking-wide hover:bg-[#FF7518] transition-all">
                  <PlayStoreIcon className="w-2.5 h-2.5" />
                  PARTNER
                </a>
              </div>
            </div>
          ) : (
            /* Windows 11 Edge style browser header — Light Mica theme */
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-3.5 mb-6 sm:mb-8 gap-3 select-none animate-fadeIn relative z-10">
              {/* Left: Edge Nav buttons */}
              <div className="hidden sm:flex items-center gap-1 text-gray-400 text-xs flex-shrink-0 mr-1">
                <button className="p-1.5 rounded hover:bg-black/5 hover:text-gray-900 transition-colors cursor-not-allowed">←</button>
                <button className="p-1.5 rounded hover:bg-black/5 hover:text-gray-900 transition-colors cursor-not-allowed">→</button>
                <button className="p-1.5 rounded hover:bg-black/5 hover:text-gray-900 transition-colors">↻</button>
              </div>

              {/* OS label */}
              <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-gray-400 uppercase flex-shrink-0">Edge</span>

              {/* Windows style Edge tabs */}
              <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar flex-1 justify-start ml-2">
                {tabs.map((tab) => {
                  const isActive = activeTabId === tab.id
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`group/tab flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-semibold cursor-pointer transition-all border-b-2 flex-shrink-0 ${
                        isActive
                          ? 'bg-white text-gray-900 border-blue-500 shadow-sm shadow-black/5'
                          : 'text-gray-500 border-transparent hover:bg-black/5 hover:text-gray-900'
                      }`}
                    >
                      {tab.kind === 'main' ? (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 sm:w-[10px] sm:h-[10px]">
                          <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
                        </svg>
                      ) : (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 sm:w-[10px] sm:h-[10px]">
                          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                        </svg>
                      )}
                      <span className="max-w-[60px] sm:max-w-[120px] truncate text-[10px] sm:text-xs">{tab.title}</span>
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors text-[9px] font-bold ${isActive ? 'text-gray-400 hover:bg-black/5 hover:text-gray-900' : 'text-gray-400 hover:bg-black/10 hover:text-gray-900'}`}
                        title="Close tab"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={handleNewTab}
                  className="w-6 h-6 rounded hover:bg-black/5 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-sm font-semibold ml-1 flex-shrink-0"
                  title="Open New Tab"
                >
                  +
                </button>
              </div>

              {/* Nav text right side — lg screens only */}
              <div className="hidden lg:flex items-center gap-3 ml-3 flex-shrink-0">
                <a href="http://localhost:3000/" className="text-[9.5px] font-semibold tracking-wide text-gray-600 hover:text-blue-600 transition-colors">HOME</a>
                <a href="http://localhost:3000/events" className="text-[9.5px] font-semibold tracking-wide text-gray-600 hover:text-blue-600 transition-colors">EVENTS</a>
                <a href="http://localhost:3000/why-shata" className="text-[9.5px] font-semibold tracking-wide text-gray-600 hover:text-blue-600 transition-colors">WHY SHATA</a>
                <a href="http://localhost:3000/contact" className="text-[9.5px] font-semibold tracking-wide text-gray-600 hover:text-blue-600 transition-colors">CONTACT US</a>
                <a href={PARTNER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 pl-2 pr-2.5 py-1 rounded-full bg-black text-white text-[9px] font-bold hover:bg-gray-800 transition-all">
                  <PlayStoreIcon className="w-2.5 h-2.5" />
                  PARTNER
                </a>
              </div>

              {/* Right: Windows 11 Window Controls */}
              <div className="flex items-center border border-gray-200/60 rounded overflow-hidden flex-shrink-0 ml-2">
                <div className="w-9 h-7 flex items-center justify-center text-gray-400 hover:bg-black/5 hover:text-gray-900 transition-colors cursor-not-allowed">
                  <span className="text-xs">─</span>
                </div>
                <div className="w-9 h-7 flex items-center justify-center text-gray-400 hover:bg-black/5 hover:text-gray-900 transition-colors cursor-not-allowed">
                  <span className="text-[9px]">▢</span>
                </div>
                <div
                  onClick={() => setCurrentOS('macos')}
                  className="w-9 h-7 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  title="Switch to macOS UI"
                >
                  <span className="text-xs">✕</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* BROWSER CONTENT BODY                                     */}
          {/* ======================================================== */}
          <div className="flex-1 transition-all duration-550 ease-in-out">
            {activeTab.kind !== 'main' ? (
              /*
                SEARCH / CHATBOT WORKSPACE
                'chatbot' kind is reserved for later — until it ships, both
                'search' and 'chatbot' tabs render this same search workspace.
                TODO: once the chatbot is ready, branch on activeTab.kind here
                and render a <ChatbotWorkspace /> for kind === 'chatbot'.
              */
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fadeIn min-h-[420px]">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-all duration-700 ${
                  isMac
                    ? 'bg-gradient-to-br from-[#FFF4ED] to-[#FF7518]/20 border border-[#FFE2D1] text-[#FF7518]'
                    : 'bg-gradient-to-br from-[#0e1e38] to-[#0078d4]/30 border border-slate-700 text-cyan-400'
                }`}>
                  <span className="text-3xl">🔍</span>
                </div>

                <h3 className={`text-2xl font-bold mb-3 tracking-tight transition-colors duration-700 ${
                  isMac ? 'text-black font-jakarta font-semibold' : 'text-white font-geist'
                }`}>
                  Search Events &amp; Vendors
                </h3>

                <p className={`text-sm max-w-md mb-8 transition-colors duration-700 ${
                  isMac ? 'text-gray-500 font-jakarta' : 'text-slate-400 font-geist'
                }`}>
                  Browse event spaces, configure custom budgets, and customize vendor lists right from your dashboard.
                </p>

                {/* Simulated Search bar inside workspace */}
                <div className="w-full max-w-md relative mb-8">
                  <input
                    type="text"
                    placeholder="Search venues, caterers, or decorators..."
                    className={`w-full py-3 pl-10 pr-4 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all duration-700 ${
                      isMac
                        ? 'bg-white border-[#FFE2D1] text-black focus:ring-[#FF7518] focus:border-[#FF7518]'
                        : 'bg-slate-900 border-slate-700 text-white focus:ring-cyan-500 focus:border-cyan-500'
                    }`}
                  />
                  <span className="absolute left-3.5 top-3.5 text-xs text-gray-400">🔍</span>
                </div>

                {/* Shortcuts */}
                <div className="flex flex-wrap justify-center gap-3">
                  {['🎂 Book Venues', '💍 Wedding Planners', '🏢 Seminars', '🎵 Music Festivals'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveTabId(1)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all duration-550 hover:-translate-y-0.5 cursor-pointer ${
                        isMac
                          ? 'bg-[#FFF4ED]/60 border-[#FFE2D1] text-[#FF7518] hover:bg-[#FFF4ED]'
                          : 'bg-[#FF7518]/10 border-[#FF7518]/30 text-[#FF7518] hover:bg-[#FF7518]/20 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ORIGINAL SHATA EVENTS DASHBOARD CONTENT WITH DYNAMIC STYLING */
              <div className="animate-fadeIn relative z-10">

                {/* ---- In-browser NAV ROW with icons ---- */}
                <nav className={`lg:hidden flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b transition-colors duration-700 ${
                  isMac ? 'border-[#FFE2D1]' : 'border-gray-200'
                }`}>
                  {/* Home */}
                  <a href="http://localhost:3000/" className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-colors hover:opacity-100 ${
                    isMac ? 'text-black hover:text-[#FF7518]' : 'text-gray-700 hover:text-[#FF7518]'
                  }`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeLinejoin="round" />
                      <path d="M9 21V12h6v9" strokeLinejoin="round" />
                    </svg>
                    HOME
                  </a>
                  {/* Events */}
                  <a href="http://localhost:3000/events" className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-colors hover:opacity-100 ${
                    isMac ? 'text-black hover:text-[#FF7518]' : 'text-gray-700 hover:text-[#FF7518]'
                  }`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                    </svg>
                    EVENTS
                  </a>
                  {/* Why Shata */}
                  <a href="http://localhost:3000/why-shata" className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-colors hover:opacity-100 ${
                    isMac ? 'text-black hover:text-[#FF7518]' : 'text-gray-700 hover:text-[#FF7518]'
                  }`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                    </svg>
                    WHY SHATA
                  </a>
                  {/* Contact */}
                  <a href="http://localhost:3000/contact" className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-colors hover:opacity-100 ${
                    isMac ? 'text-black hover:text-[#FF7518]' : 'text-gray-700 hover:text-[#FF7518]'
                  }`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinejoin="round" />
                    </svg>
                    CONTACT US
                  </a>
                  {/* Partner — left-aligned on mobile, auto on larger */}
                  <a
                    href={PARTNER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9.5px] sm:text-[10px] font-bold tracking-wide transition-all sm:ml-auto ${
                      isMac
                        ? 'bg-black text-white hover:bg-[#FF7518]'
                        : 'bg-[#FF7518] text-white hover:bg-[#e56815]'
                    }`}
                  >
                    <PlayStoreIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    PARTNER WITH US
                  </a>
                </nav>

                {/* Dashboard Content Split */}
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-10 mb-4 sm:mb-8 lg:mb-5">
                  <div className="flex-1">
                    {/* Logo above heading */}
                    <div className="mb-3 sm:mb-4">
                      <img
                        src={logoSvg}
                        alt="Shata Events Logo"
                        className="h-8 sm:h-10 w-auto object-contain transition-all duration-700"
                      />
                    </div>
                    <h2 className={`text-3xl sm:text-5xl lg:text-[40px] font-medium leading-[1.1] mb-3 sm:mb-5 lg:mb-3 tracking-tight transition-colors duration-700 ${
                      isMac ? 'text-black font-jakarta font-semibold' : 'text-gray-900 font-geist font-bold'
                    }`}>
                      India's No 1 Event<br className="hidden sm:block" />
                      Booking Platform
                    </h2>
                  </div>

                  <div className="flex-1 lg:max-w-md pt-0 sm:pt-2 lg:pt-0">
                    <p className={`text-base sm:text-lg lg:text-sm leading-relaxed mb-5 sm:mb-8 lg:mb-4 transition-colors duration-700 ${
                      isMac ? 'text-gray-600 font-jakarta' : 'text-gray-600 font-geist'
                    }`}>
                      Data-driven event strategies, creative venues, and real results. Let's build your perfect event together.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => onNavigate('booking')}
                        className={`group relative px-8 py-3.5 rounded-xl font-bold overflow-hidden transition-all duration-300 shadow-lg active:scale-95 cursor-pointer ${
                          isMac
                            ? 'bg-gradient-to-r from-black to-[#2a2a2a] hover:shadow-xl hover:shadow-black/30 text-white'
                            : 'bg-gradient-to-r from-[#FF7518] to-[#ff9248] hover:shadow-xl hover:shadow-[#FF7518]/30 text-white'
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Book an Event
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                        <span className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
                          isMac ? 'bg-gradient-to-r from-[#FF7518]/90 to-[#ff9248]/90' : 'bg-[#e56815]'
                        }`} />
                      </button>
                      <button
                        onClick={() => onNavigate('events')}
                        className={`group px-6 py-3.5 rounded-xl font-semibold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                          isMac
                            ? 'border-gray-200 text-gray-800 hover:border-black hover:text-black font-jakarta'
                            : 'border-[#FF7518]/20 text-gray-700 hover:border-[#FF7518] hover:text-[#FF7518] font-geist'
                        }`}
                      >
                        Browse Venues
                        <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ==================================================== */}
                {/* PREMIUM SEARCH BAR                                    */}
                {/* ==================================================== */}
                <div
                  className={`w-full rounded-2xl p-1.5 sm:p-1.5 border flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 mb-8 sm:mb-10 lg:mb-6 backdrop-blur-sm transition-all duration-700 ${
                    isMac
                      ? 'bg-white/95 border-[#FFE2D1] shadow-[0_12px_40px_rgba(255,117,24,0.10)]'
                      : 'bg-white/80 border-[#FF7518]/20 shadow-[0_12px_40px_rgba(255,117,24,0.10)]'
                  }`}
                >
                  {/* Location field */}
                  <div className={`flex-1 flex items-center gap-3 px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-none border-b sm:border-b-0 sm:border-r transition-colors ${
                    isMac ? 'border-[#FFEFE5]' : 'border-[#FF7518]/10'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 ${isMac ? 'stroke-[#FF7518]' : 'stroke-[#FF7518]'}`} strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <label className={`text-[9px] uppercase tracking-wider font-bold ${isMac ? 'text-gray-400' : 'text-gray-500'}`}>
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="City or venue"
                        className={`bg-transparent text-sm font-semibold outline-none w-full ${
                          isMac ? 'text-black placeholder:text-gray-400 placeholder:font-normal' : 'text-gray-900 placeholder:text-gray-400 placeholder:font-normal'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Event Type field */}
                  <div className={`flex-1 flex items-center gap-3 px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-none border-b sm:border-b-0 sm:border-r transition-colors ${
                    isMac ? 'border-[#FFEFE5]' : 'border-[#FF7518]/10'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 ${isMac ? 'stroke-[#FF7518]' : 'stroke-[#FF7518]'}`} strokeWidth="2">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <label className={`text-[9px] uppercase tracking-wider font-bold ${isMac ? 'text-gray-400' : 'text-gray-500'}`}>
                        Event Type
                      </label>
                      <input
                        type="text"
                        placeholder="Wedding, seminar, party..."
                        className={`bg-transparent text-sm font-semibold outline-none w-full ${
                          isMac ? 'text-black placeholder:text-gray-400 placeholder:font-normal' : 'text-gray-900 placeholder:text-gray-400 placeholder:font-normal'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Date field */}
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 ${isMac ? 'stroke-[#FF7518]' : 'stroke-[#FF7518]'}`} strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                    </svg>
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <label className={`text-[9px] uppercase tracking-wider font-bold ${isMac ? 'text-gray-400' : 'text-gray-500'}`}>
                        Date
                      </label>
                      <input
                        type="text"
                        placeholder="Any date"
                        className={`bg-transparent text-sm font-semibold outline-none w-full ${
                          isMac ? 'text-black placeholder:text-gray-400 placeholder:font-normal' : 'text-gray-900 placeholder:text-gray-400 placeholder:font-normal'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Search button */}
                  <button
                    onClick={() => onNavigate('events')}
                    className={`flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 cursor-pointer shadow-md ${
                      isMac
                        ? 'bg-gradient-to-r from-[#FF7518] to-[#ff9248] hover:shadow-lg hover:shadow-[#FF7518]/30 text-white'
                        : 'bg-gradient-to-r from-[#FF7518] to-[#ff9248] hover:shadow-lg hover:shadow-[#FF7518]/30 text-white'
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                    </svg>
                    Search
                  </button>
                </div>

                {/* Event Booking UI Widgets Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">

                  {/* Widget 1: Featured Events */}
                  <div className="flex flex-col gap-4">
                    <div className={`backdrop-blur-sm rounded-2xl p-5 border flex flex-col h-full shadow-sm transition-all duration-700 ${
                      isMac
                        ? 'bg-white/90 border-[#FFE2D1]'
                        : 'bg-white/90 border-[#FFD5B8]'
                    }`}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className={`font-bold text-sm ${isMac ? 'text-black font-jakarta' : 'text-gray-900 font-geist'}`}>Featured Events</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                          isMac ? 'text-[#FF7518] bg-[#FF7518]/10' : 'text-[#FF7518] bg-[#FF7518]/10'
                        }`}>Trending</span>
                      </div>

                      {loading ? (
                        <div className="text-sm text-gray-400 py-4 text-center">Loading events...</div>
                      ) : (
                        featuredEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => onNavigate('event-details', event.id)}
                            className={`p-3 rounded-xl border shadow-sm mb-3 transition-all cursor-pointer flex gap-3 ${
                              isMac
                                ? 'bg-white border-[#FFEFE5] hover:border-[#FF7518]/40 hover:shadow-md'
                                : 'bg-white border-[#FFEFE5] hover:border-[#FF7518]/40 hover:shadow-md'
                            }`}
                          >
                            <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className={`text-[10px] font-bold tracking-wider mb-1 uppercase ${
                                isMac ? 'text-[#FF7518]' : 'text-[#FF7518]'
                              }`}>{event.category}</div>
                              <div className={`font-bold text-sm leading-tight line-clamp-1 ${isMac ? 'text-black' : 'text-gray-900'}`}>{event.title}</div>
                              <div className={`text-[10px] mt-1 flex items-center gap-1 truncate ${isMac ? 'text-gray-500' : 'text-gray-500'}`}>
                                📍 {event.location}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Widget 2: Featured Venues Discovery */}
                  <div className={`md:col-span-2 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border relative flex flex-col shadow-sm transition-all duration-700 ${
                    isMac
                      ? 'bg-white/90 border-[#FFE2D1]'
                      : 'bg-white/90 border-[#FFD5B8]'
                  }`}>
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <h3 className={`font-bold text-lg ${isMac ? 'text-black font-jakarta' : 'text-gray-900 font-geist'}`}>Featured Venues</h3>
                        <p className={`text-xs mt-1 ${isMac ? 'text-gray-500' : 'text-gray-500'}`}>Discover top-rated locations for your next event</p>
                      </div>
                      <button className={`text-sm font-semibold hover:underline cursor-pointer ${
                        isMac ? 'text-[#FF7518]' : 'text-[#FF7518]'
                      }`}>View All</button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 h-full">
                      {/* Venue Card 1 */}
                      <div className={`rounded-xl overflow-hidden border shadow-sm group cursor-pointer hover:shadow-md transition-all flex-1 ${
                        isMac ? 'bg-white border-[#FFEFE5]' : 'bg-white border-[#FFEFE5] hover:border-[#FF7518]/40'
                      }`}>
                        <div className="h-28 relative">
                          <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Venue 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded">⭐ 4.9 (124)</div>
                        </div>
                        <div className="p-4">
                          <div className={`font-bold text-sm transition-colors ${
                            isMac ? 'text-black group-hover:text-[#FF7518]' : 'text-gray-900 group-hover:text-[#FF7518]'
                          }`}>The Royal Gardens</div>
                          <div className={`text-xs mt-1 ${isMac ? 'text-gray-500' : 'text-gray-500'}`}>Mumbai, Maharashtra</div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className={`text-xs font-semibold px-2 py-1 border rounded-md ${
                              isMac
                                ? 'bg-[#FFF4ED] border-[#FFE2D1] text-[#FF7518]'
                                : 'bg-[#FFF4ED] border-[#FFE2D1] text-[#FF7518]'
                            }`}>From ₹50,000</div>
                            <span className={`text-lg group-hover:translate-x-1 transition-transform inline-block ${
                              isMac ? 'text-[#FF7518]' : 'text-[#FF7518]'
                            }`}>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Venue Card 2 */}
                      <div className={`rounded-xl overflow-hidden border shadow-sm group cursor-pointer hover:shadow-md transition-all flex-1 ${
                        isMac ? 'bg-white border-[#FFEFE5]' : 'bg-white border-[#FFEFE5] hover:border-[#FF7518]/40'
                      }`}>
                        <div className="h-28 relative">
                          <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Venue 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded">⭐ 4.8 (89)</div>
                        </div>
                        <div className="p-4">
                          <div className={`font-bold text-sm transition-colors ${
                            isMac ? 'text-black group-hover:text-[#FF7518]' : 'text-gray-900 group-hover:text-[#FF7518]'
                          }`}>Oceanview Banquet</div>
                          <div className={`text-xs mt-1 ${isMac ? 'text-gray-500' : 'text-gray-500'}`}>Goa, India</div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className={`text-xs font-semibold px-2 py-1 border rounded-md ${
                              isMac
                                ? 'bg-[#FFF4ED] border-[#FFE2D1] text-[#FF7518]'
                                : 'bg-[#FFF4ED] border-[#FFE2D1] text-[#FF7518]'
                            }`}>From ₹75,000</div>
                            <span className={`text-lg group-hover:translate-x-1 transition-transform inline-block ${
                              isMac ? 'text-[#FF7518]' : 'text-[#FF7518]'
                            }`}>→</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}