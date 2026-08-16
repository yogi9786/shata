import { useState, useEffect } from 'react'
import type { PageType } from '../App'
import { useEvents } from '../hooks/useEvents'
import logoSvg from '../assets/logo.svg'
import telanganaImg from '../assets/telangana.jpg'
import andhraPradeshImg from '../assets/andhra_pradesh.jpg'

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

  // Typewriter placeholders
  const locationOptions = ['Hyderabad', 'Visakhapatnam', 'Tirupati', 'Vijayawada', 'Warangal', 'Araku Valley', 'Gachibowli'];
  const eventOptions = ['Wedding Ceremony', 'Corporate Seminar', 'Birthday Party', 'Music Concert', 'Product Launch', 'Sangeet Night'];

  const [locationPlaceholder, setLocationPlaceholder] = useState('City or venue');
  const [eventPlaceholder, setEventPlaceholder] = useState('Wedding, seminar, party...');

  useEffect(() => {
    let locWordIdx = 0;
    let locCharIdx = 0;
    let locIsDeleting = false;
    let locWaitCycles = 0;

    let eventWordIdx = 0;
    let eventCharIdx = 0;
    let eventIsDeleting = false;
    let eventWaitCycles = 0;

    const interval = setInterval(() => {
      // 1. Location Typing
      const currentLocWord = locationOptions[locWordIdx];
      if (locWaitCycles > 0) {
        locWaitCycles--;
      } else {
        if (locIsDeleting) {
          locCharIdx--;
          if (locCharIdx < 0) {
            locCharIdx = 0;
            locIsDeleting = false;
            locWordIdx = (locWordIdx + 1) % locationOptions.length;
            locWaitCycles = 5;
          }
        } else {
          locCharIdx++;
          if (locCharIdx > currentLocWord.length) {
            locCharIdx = currentLocWord.length;
            locIsDeleting = true;
            locWaitCycles = 15;
          }
        }
      }
      setLocationPlaceholder(currentLocWord.substring(0, locCharIdx) || 'City or venue');

      // 2. Event Typing
      const currentEventWord = eventOptions[eventWordIdx];
      if (eventWaitCycles > 0) {
        eventWaitCycles--;
      } else {
        if (eventIsDeleting) {
          eventCharIdx--;
          if (eventCharIdx < 0) {
            eventCharIdx = 0;
            eventIsDeleting = false;
            eventWordIdx = (eventWordIdx + 1) % eventOptions.length;
            eventWaitCycles = 5;
          }
        } else {
          eventCharIdx++;
          if (eventCharIdx > currentEventWord.length) {
            eventCharIdx = currentEventWord.length;
            eventIsDeleting = true;
            eventWaitCycles = 15;
          }
        }
      }
      setEventPlaceholder(currentEventWord.substring(0, eventCharIdx) || 'Wedding, seminar, party...');

    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Interactive Browser Tabs state
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: 1, title: 'Shata Events', url: 'shata.com', kind: 'main' },
  ])
  const [activeTabId, setActiveTabId] = useState<number>(1)
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0]

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
    // Main tab (id 1) is never closable via tab-close.
    if (id === 1 || tabs.length <= 1) return
    const newTabs = tabs.filter((t) => t.id !== id)
    setTabs(newTabs)
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id)
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center py-4 sm:py-8 lg:py-4 px-2.5 sm:px-6 lg:px-8 bg-[#FFF8F3]"
    >
      {/* ── Extremely Subtle Warm Decorative Radial Glows ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Very light warm orange glow — Top Right */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-[#F6D8C5]/12 blur-[120px]" />

        {/* Very light champagne glow — Bottom Left */}
        <div className="absolute -bottom-24 -left-20 w-[550px] h-[550px] rounded-full bg-[#E9D9B8]/10 blur-[120px]" />
      </div>

      {/* CENTRAL DASHBOARD CONTAINER */}
      <div className="relative z-10 w-full max-w-[1200px] lg:max-w-[1380px] mx-auto animate-fadeIn">

        {/* Outer Premium Container */}
        <div
          className="w-full rounded-[1.5rem] sm:rounded-[2.5rem] pt-4 pb-5 px-4 sm:pt-6 sm:pb-8 sm:px-8 lg:pt-5 lg:pb-6 lg:px-8 border border-black/20 bg-[#FFF8F3] shadow-[0_20px_60px_rgba(23,32,51,0.06)] flex flex-col relative overflow-hidden transition-all duration-300 min-h-[580px] sm:min-h-[640px] lg:min-h-[600px]"
        >
          {/* ======================================================== */}
          {/* PREMIUM DOT-GRID BACKGROUND PATTERN                      */}
          {/* ======================================================== */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: 'radial-gradient(circle, rgba(232, 111, 50, 0.16) 0.8px, transparent 0.8px)', backgroundSize: '20px 20px' }} />
          <style>{`
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(2deg); }
            }
            @keyframes float-delayed {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(6px) rotate(-2deg); }
            }
            @keyframes wave-horizontal {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-float-slow {
              animation: float-slow 7s ease-in-out infinite;
            }
            .animate-float-delayed {
              animation: float-delayed 9s ease-in-out infinite;
            }
            .animate-wave-slow {
              animation: wave-horizontal 22s linear infinite;
            }
            .animate-wave-medium {
              animation: wave-horizontal 15s linear infinite;
            }
          `}</style>

          {/* Top Right Celebration Sparkles / Streamer */}
          <div className="absolute top-20 right-6 w-28 h-28 pointer-events-none opacity-[0.14] hidden md:block select-none z-0 animate-float-slow">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E86F32]">
              <defs>
                <radialGradient id="glow-tr" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E86F32" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E86F32" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="40" r="35" fill="url(#glow-tr)" />
              <path d="M10 80 Q 30 40 65 60 T 95 20" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M50 15 Q 50 28 37 28 Q 50 28 50 41 Q 50 28 63 28 Q 50 28 50 15" fill="currentColor" />
              <path d="M25 45 Q 25 51 19 51 Q 25 51 25 57 Q 25 51 31 51 Q 25 51 25 45" fill="currentColor" className="opacity-70" />
              <circle cx="75" cy="30" r="2" fill="currentColor" />
              <circle cx="35" cy="20" r="1.5" fill="currentColor" />
              <circle cx="70" cy="65" r="3" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Bottom Left Celebration Balloons / Sparkles */}
          <div className="absolute bottom-20 left-6 w-32 h-32 pointer-events-none opacity-[0.14] hidden md:block select-none z-0 animate-float-delayed">
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E86F32]">
              <defs>
                <radialGradient id="glow-bl" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E86F32" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E86F32" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="45" fill="url(#glow-bl)" />
              <circle cx="45" cy="45" r="18" stroke="currentColor" strokeWidth="1.5" />
              <path d="M45 63 Q 40 80 50 98" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="72" cy="53" r="16" stroke="currentColor" strokeWidth="1.5" />
              <path d="M72 69 Q 77 86 67 104" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M15 25 L23 25 M19 21 L19 29" stroke="currentColor" strokeWidth="1.2" />
              <path d="M102 22 L108 22 M105 19 L105 25" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="95" cy="45" r="1.5" fill="currentColor" />
              <circle cx="20" cy="55" r="2" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* ======================================================== */}
          {/* LOOPS & WAVES PREMIUM BACKGROUND DESIGN                  */}
          {/* ======================================================== */}
          {/* Middle Wavy Stroke Lines (Guaranteed Visible behind text & search) */}
          <div className="absolute inset-x-0 top-[15%] h-80 pointer-events-none overflow-hidden z-0 select-none opacity-45">
            {/* Wave Line 1: Dashed gradient track */}
            <svg className="absolute w-[200%] h-full animate-wave-slow" viewBox="0 0 2000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,70 C250,140 500,10 750,70 C1000,140 1250,10 1500,70 C1750,140 2000,10 2250,70"
                stroke="url(#wave-gradient-1)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
              />
              <defs>
                <linearGradient id="wave-gradient-1" x1="0" y1="0" x2="2000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E86F32" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#E86F32" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#E86F32" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
            {/* Wave Line 2: Solid thin track offset */}
            <svg className="absolute w-[200%] h-full animate-wave-medium" viewBox="0 0 2000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,110 C300,40 600,160 900,110 C1200,40 1500,160 1800,110 C2100,40 2400,160 2700,110"
                stroke="#E86F32"
                strokeWidth="1.5"
                className="opacity-25"
              />
            </svg>
          </div>

          {/* Bottom Wavy Fills (Taller so they rise above cards) */}
          <div className="absolute inset-x-0 bottom-0 h-80 pointer-events-none overflow-hidden z-0 select-none opacity-60">
            <svg className="absolute bottom-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2000 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 C1650,100 1850,20 2000,60 L2000,120 L0,120 Z"
                fill="#E86F32"
                className="opacity-[0.09]"
              />
            </svg>
            <svg className="absolute bottom-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2000 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,80 C200,45 350,105 500,80 C650,55 800,115 1000,80 C1150,55 1300,115 1500,80 C1650,55 1800,115 2000,80 L2000,120 L0,120 Z"
                fill="#E86F32"
                className="opacity-[0.14]"
              />
            </svg>
          </div>
          {/* ======================================================== */}
          {/* BROWSER HEADER SECTION — macOS Safari style               */}
          {/* ======================================================== */}
          <div className="flex items-center justify-between border-b border-black/15 pb-3 mb-4 sm:pb-3.5 sm:mb-6 lg:mb-7 gap-2 sm:gap-3 select-none">
            {/* Left: macOS Traffic Lights + Safari label */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
            </div>

            {/* Right on mobile / Left-aligned on lg: Browser Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 justify-end lg:justify-start lg:ml-2">
              {tabs.map((tab) => {
                const isActive = activeTabId === tab.id
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`group/tab flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold cursor-pointer transition-all duration-[220ms] flex-shrink-0 ${isActive
                        ? 'bg-[#FFFDFC] text-[#172033] shadow-xs border border-black/15'
                        : 'text-[#4F5A6B] hover:bg-[#FCFAF7] hover:text-[#172033]'
                      }`}
                  >
                    {tab.kind === 'main' ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`flex-shrink-0 ${isActive ? 'text-[#E86F32]' : 'text-[#4F5A6B]'}`}>
                        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`flex-shrink-0 ${isActive ? 'text-[#E86F32]' : 'text-[#4F5A6B]'}`}>
                        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                      </svg>
                    )}
                    <span className="max-w-[70px] sm:max-w-[85px] lg:max-w-[120px] truncate">{tab.title}</span>
                    {tab.kind !== 'main' && (
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[#687386] hover:bg-black/10 hover:text-black transition-colors text-[9px] font-bold ml-0.5"
                        title="Close tab"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              })}
              <button
                onClick={handleNewTab}
                className="w-6 h-6 rounded-md hover:bg-black/5 flex items-center justify-center text-[#4F5A6B] hover:text-black transition-all duration-200 hover:scale-110 active:scale-95 font-bold text-sm flex-shrink-0 cursor-pointer"
                title="Open New Tab"
              >
                +
              </button>
            </div>

            {/* Nav text right side — lg screens only */}
            <div className="hidden lg:flex items-center gap-4 ml-3 flex-shrink-0">
              <button onClick={() => onNavigate('home')} className="text-[10px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">HOME</button>
              <button onClick={() => onNavigate('events')} className="text-[10px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">EVENTS</button>
              <button onClick={() => onNavigate('why-shata')} className="text-[10px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">WHY SHATA</button>
              <button onClick={() => onNavigate('contact')} className="text-[10px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">CONTACT US</button>
              <a
                href={PARTNER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-black text-white text-[9.5px] font-bold tracking-wide transition-all duration-[220ms] ease-out hover:-translate-y-[2px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-[#1a1a1a] cursor-pointer"
              >
                <PlayStoreIcon className="w-2.5 h-2.5" />
                <span>PARTNER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86F32]" />
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BROWSER CONTENT BODY                                     */}
          {/* ======================================================== */}
          <div className="flex-1 transition-all duration-300 ease-out">
            {activeTab.kind !== 'main' ? (
              /*
                SEARCH / CHATBOT WORKSPACE
              */
              <div className="flex flex-col items-center justify-center flex-1 py-10 sm:py-16 px-4 sm:px-6 text-center animate-fadeIn">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 bg-[#FFF1E8] border border-[#FBD9C5] text-[#E86F32] shadow-xs transition-transform duration-300 hover:scale-105">
                  <span className="text-2xl sm:text-3xl">🔍</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2.5 sm:mb-3 tracking-tight text-[#172033] font-jakarta">
                  Search Events &amp; Vendors
                </h3>

                <p className="text-sm max-w-md mb-6 sm:mb-8 text-[#687386] font-jakarta">
                  Browse event spaces, configure custom budgets, and customize vendor lists right from your dashboard.
                </p>

                {/* Search bar inside workspace */}
                <div className="w-full max-w-md relative mb-6 sm:mb-8">
                  <input
                    type="text"
                    placeholder="Search venues, caterers, or decorators..."
                    className="w-full py-3 sm:py-3.5 pl-11 pr-4 rounded-[14px] text-sm outline-none bg-[#FFFDFC] border border-black/15 text-[#172033] placeholder:text-[#98A2B3] focus:border-black focus:ring-2 focus:ring-black/10 shadow-xs transition-all duration-[220ms]"
                  />
                  <span className="absolute left-3.5 top-3 sm:top-3.5 text-sm text-[#E86F32]">🔍</span>
                </div>

                {/* Shortcuts */}
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
                  {['🎂 Book Venues', '💍 Wedding Planners', '🏢 Seminars', '🎵 Music Festivals'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveTabId(1)}
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold bg-[#FFFFFF] hover:bg-black border border-black/15 hover:border-black text-[#4F5A6B] hover:text-white shadow-xs hover:-translate-y-[2px] transition-all duration-[220ms] cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ORIGINAL SHATA EVENTS DASHBOARD CONTENT */
              <div className="animate-fadeIn">

                {/* ---- In-browser NAV ROW with icons (Mobile) — centered pill row ---- */}
                <nav className="lg:hidden flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-3 sm:mb-5 pb-3 border-b border-black/15 transition-colors text-center">
                  {/* Home */}
                  <button onClick={() => onNavigate('home')} className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[11px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeLinejoin="round" />
                      <path d="M9 21V12h6v9" strokeLinejoin="round" />
                    </svg>
                    HOME
                  </button>
                  {/* Events */}
                  <button onClick={() => onNavigate('events')} className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[11px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                    </svg>
                    EVENTS
                  </button>
                  {/* Why Shata */}
                  <button onClick={() => onNavigate('why-shata')} className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[11px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                    </svg>
                    WHY SHATA
                  </button>
                  {/* Contact */}
                  <button onClick={() => onNavigate('contact')} className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[11px] font-semibold tracking-wide text-black hover:opacity-80 transition-colors bg-transparent border-0 cursor-pointer p-0 focus:outline-none">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinejoin="round" />
                    </svg>
                    CONTACT US
                  </button>
                  {/* Partner */}
                  <a
                    href={PARTNER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide transition-all duration-200 bg-black text-white hover:bg-[#1a1a1a] hover:-translate-y-[1px] shadow-xs w-full sm:w-auto justify-center mt-1 sm:mt-0"
                  >
                    <PlayStoreIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    PARTNER WITH US
                  </a>
                </nav>

                {/* Dashboard Content Split */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-8 mb-3 sm:mb-6 lg:mb-5 text-center lg:text-left items-center lg:items-stretch">
                  <div className="flex-1 flex flex-col items-center lg:items-start">
                    {/* Logo above heading */}
                    <div className="mb-2.5 sm:mb-4">
                      <img
                        src={logoSvg}
                        alt="Shata Events Logo"
                        className="h-7 sm:h-10 w-auto object-contain transition-all duration-300"
                      />
                    </div>
                    <h2 className="text-[30px] sm:text-5xl lg:text-[40px] font-semibold leading-[1.12] sm:leading-[1.15] mb-2.5 sm:mb-5 lg:mb-3 tracking-tight text-[#172033] font-jakarta">
                      India's <span className="inline-block bg-[#FFF1E8] text-[#E86F32] px-2.5 py-0.5 rounded-lg border border-[#FBD9C5] font-bold">No 1</span> Event<br className="hidden sm:block" />
                      {' '}Booking Platform
                    </h2>
                  </div>

                  <div className="flex-1 lg:max-w-md pt-0 flex flex-col items-center lg:items-start w-full">
                    <p className="text-sm sm:text-lg lg:text-sm leading-relaxed mb-4 sm:mb-8 lg:mb-5 text-[#687386] font-jakarta font-normal">
                      Data-driven event strategies, creative venues, and real results. Let's build your perfect event together.
                    </p>

                    {/* Side-by-side structured CTA buttons on mobile */}
                    <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
                      {/* Primary CTA Button */}
                      <button
                        onClick={() => onNavigate('booking')}
                        className="flex-1 sm:flex-initial group relative px-4 sm:px-8 py-3 sm:py-3.5 rounded-[14px] font-bold overflow-hidden transition-all duration-[220ms] ease-out shadow-[0_8px_24px_rgba(0,0,0,0.16)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)] bg-black hover:bg-[#1a1a1a] hover:-translate-y-[2px] active:scale-95 cursor-pointer text-white border-none text-center"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 font-jakarta text-xs sm:text-sm whitespace-nowrap">
                          Book an Event
                          <span className="transition-transform duration-[220ms] group-hover:translate-x-1">→</span>
                        </span>
                      </button>

                      {/* Secondary CTA Button */}
                      <button
                        onClick={() => onNavigate('events')}
                        className="flex-1 sm:flex-initial group px-4 sm:px-6 py-3 sm:py-3.5 rounded-[14px] font-semibold border border-black/15 bg-[#FFFFFF] hover:bg-black text-[#344054] hover:text-white hover:border-black hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-[220ms] ease-out flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer font-jakarta text-xs sm:text-sm text-center whitespace-nowrap"
                      >
                        Browse Venues
                        <span className="transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ==================================================== */}
                {/* FLOATING SEARCH BAR                                  */}
                {/* ==================================================== */}
                <div className="w-full rounded-[16px] sm:rounded-[18px] p-2 sm:p-2.5 bg-transparent border-2 border-[#E86F32] shadow-[0_10px_30px_rgba(232,111,50,0.06)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 sm:mb-8 lg:mb-6 transition-all duration-[220ms]">
                  {/* Location field */}
                  <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-transparent border border-black/10 sm:border-r sm:border-y-0 sm:border-l-0 sm:rounded-none sm:bg-transparent sm:border-r-black/10 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 stroke-[#E86F32]" strokeWidth="2.2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#172033]">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder={locationPlaceholder}
                        className="bg-transparent text-sm font-semibold outline-none w-full text-[#172033] placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Event Type field */}
                  <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-transparent border border-black/10 sm:border-r sm:border-y-0 sm:border-l-0 sm:rounded-none sm:bg-transparent sm:border-r-black/10 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 stroke-[#E86F32]" strokeWidth="2.2">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#172033]">
                        Event Type
                      </label>
                      <input
                        type="text"
                        placeholder={eventPlaceholder}
                        className="bg-transparent text-sm font-semibold outline-none w-full text-[#172033] placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Date field */}
                  <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-transparent border border-black/10 sm:border-none sm:rounded-none sm:bg-transparent transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 stroke-[#E86F32]" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                    </svg>
                    <div className="flex flex-col text-left flex-1 min-w-0">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#172033]">
                        Date
                      </label>
                      <input
                        type="text"
                        placeholder="dd-mm-yyyy"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.type = 'text'
                        }}
                        className="bg-transparent text-sm font-semibold outline-none w-full text-[#172033] placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={() => onNavigate('events')}
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-[12px] font-bold text-sm transition-all duration-[220ms] ease-out active:scale-95 cursor-pointer bg-[#E86F32] hover:bg-[#D96129] hover:scale-[1.02] text-white shadow-[0_6px_20px_rgba(232,111,50,0.25)]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                    </svg>
                    <span className="text-white font-bold">Search</span>
                  </button>
                </div>

                {/* ==================================================== */}
                {/* FEATURED CARDS WIDGETS AREA                          */}
                {/* ==================================================== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-5">

                  {/* Widget 1: Featured Events Card (Left Column) */}
                  <div className="flex flex-col gap-4">
                    <div className="rounded-[16px] sm:rounded-[18px] p-4 sm:p-5 bg-transparent border border-black/15 shadow-[0_8px_30px_rgba(23,32,51,0.02)] flex flex-col h-full transition-all duration-300">
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <h3 className="font-bold text-sm text-[#172033] font-jakarta">Featured Events</h3>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF1E8] text-[#E86F32]">
                          Trending
                        </span>
                      </div>

                      {loading ? (
                        <div className="text-sm text-[#687386] py-6 text-center">Loading events...</div>
                      ) : (
                        featuredEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => onNavigate('event-details', event.id)}
                            className="group p-3 rounded-[16px] bg-[#FFFDFC]/40 backdrop-blur-xs border border-black/10 shadow-[0_4px_16px_rgba(23,32,51,0.02)] hover:shadow-[0_8px_24px_rgba(23,32,51,0.06)] hover:border-black/20 mb-3 transition-all duration-[250ms] ease-out cursor-pointer flex gap-3 hover:-translate-y-[3px]"
                          >
                            <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-[1.03] transition-transform duration-[300ms]" />
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-bold tracking-wider mb-1 uppercase text-[#E86F32]">
                                {event.category}
                              </div>
                              <div className="font-bold text-sm leading-tight line-clamp-1 text-[#172033] group-hover:text-black transition-colors font-jakarta">
                                {event.title}
                              </div>
                              <div className="text-[11px] mt-1.5 flex items-center gap-1 truncate text-[#7A8494]">
                                📍 {event.location}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Widget 2: Featured Venues Discovery Card (Right Column) */}
                  <div className="md:col-span-2 rounded-[16px] sm:rounded-[18px] p-4 sm:p-6 bg-transparent border border-black/15 shadow-[0_8px_30px_rgba(23,32,51,0.02)] relative flex flex-col transition-all duration-300">
                    <div className="flex justify-between items-center mb-4 sm:mb-5">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-[#172033] font-jakarta">Featured Locations</h3>
                        <p className="text-xs mt-0.5 text-[#7A8494] font-jakarta">Explore popular event locations across states</p>
                      </div>
                      <button
                        onClick={() => onNavigate('events')}
                        className="text-xs font-bold text-[#E86F32] hover:text-[#D96129] transition-colors cursor-pointer"
                      >
                        Explore More &rarr;
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 h-full">
                      {/* Location Card 1: Telangana */}
                      <div
                        onClick={() => onNavigate('events', 'Telangana')}
                        className="group rounded-[16px] overflow-hidden bg-[#FFFDFC]/40 backdrop-blur-xs border border-black/10 shadow-[0_4px_16px_rgba(23,32,51,0.02)] hover:shadow-[0_8px_24px_rgba(23,32,51,0.06)] hover:border-black/20 cursor-pointer transition-all duration-[250ms] ease-out flex-1 flex flex-col hover:-translate-y-[3px]"
                      >
                        <div className="h-22 relative overflow-hidden rounded-t-[15px]">
                          <img
                            src={telanganaImg}
                            alt="Telangana"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[300ms]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                          <div className="absolute top-2.5 right-2.5 bg-white/96 backdrop-blur-xs text-[#172033] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                            <span className="text-[#C9A45C]">★</span> 4.9 (124)
                          </div>
                        </div>
                        <div className="p-3.5 flex-1 flex flex-col justify-center">
                          <div className="font-bold text-sm text-[#172033] group-hover:text-black transition-colors font-jakarta flex items-center justify-between">
                            <span>Telangana</span>
                            <span className="text-base text-black group-hover:translate-x-1 transition-transform duration-[220ms]">
                              →
                            </span>
                          </div>
                          <div className="text-xs mt-0.5 text-[#7A8494] font-jakarta">Hyderabad, Warangal, Karimnagar</div>
                        </div>
                      </div>

                      {/* Location Card 2: Andhra Pradesh */}
                      <div
                        onClick={() => onNavigate('events', 'Andhra Pradesh')}
                        className="group rounded-[16px] overflow-hidden bg-[#FFFDFC]/40 backdrop-blur-xs border border-black/10 shadow-[0_4px_16px_rgba(23,32,51,0.02)] hover:shadow-[0_8px_24px_rgba(23,32,51,0.06)] hover:border-black/20 cursor-pointer transition-all duration-[250ms] ease-out flex-1 flex flex-col hover:-translate-y-[3px]"
                      >
                        <div className="h-22 relative overflow-hidden rounded-t-[15px]">
                          <img
                            src={andhraPradeshImg}
                            alt="Andhra Pradesh"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[300ms]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                          <div className="absolute top-2.5 right-2.5 bg-white/96 backdrop-blur-xs text-[#172033] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                            <span className="text-[#C9A45C]">★</span> 4.8 (89)
                          </div>
                        </div>
                        <div className="p-3.5 flex-1 flex flex-col justify-center">
                          <div className="font-bold text-sm text-[#172033] group-hover:text-black transition-colors font-jakarta flex items-center justify-between">
                            <span>Andhra Pradesh</span>
                            <span className="text-base text-black group-hover:translate-x-1 transition-transform duration-[220ms]">
                              →
                            </span>
                          </div>
                          <div className="text-xs mt-0.5 text-[#7A8494] font-jakarta">Visakhapatnam, Vijayawada, Tirupati</div>
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