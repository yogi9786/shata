import { useState, useEffect, useRef, useCallback } from "react";
import logoSvg from "../assets/logo.svg";
import type { PageType } from "../App";

interface ClientStory {
  id: number;
  title: string;
  category: string;
  location: string;
  rating: number;
  imageUrl: string;
  reviewerName: string;
  reviewText: string;
  avatarUrl: string;
}

const clientStories: ClientStory[] = [
  { id: 1, title: "Royal Mandap Wedding", category: "Wedding", location: "Udaipur", rating: 4.9, imageUrl: "/images/wedding.png", reviewerName: "Rohan & Priya", reviewText: "Absolutely magical! The Shata team brought our floral mandap vision to life flawlessly.", avatarUrl: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 2, title: "Bollywood Sangeet Night", category: "Sangeet", location: "Mumbai", rating: 4.8, imageUrl: "/images/music_festival.png", reviewerName: "Ananya S.", reviewText: "The best night of my life! The lighting, stage, and DJ were exactly what I wanted.", avatarUrl: "https://randomuser.me/api/portraits/women/24.jpg" },
  { id: 3, title: "Lakeside Roka Ceremony", category: "Engagement", location: "Kerala", rating: 5.0, imageUrl: "/images/engagement.png", reviewerName: "Karan R.", reviewText: "A breathtaking setup. Booking the venue and vendors through Shata was so seamless.", avatarUrl: "https://randomuser.me/api/portraits/men/43.jpg" },
  { id: 4, title: "Corporate Tech Summit", category: "Corporate", location: "Bengaluru", rating: 4.7, imageUrl: "/images/corporate_summit.png", reviewerName: "Vikram M., CEO", reviewText: "Incredibly professional. Our new product was unveiled in absolute style and luxury.", avatarUrl: "https://randomuser.me/api/portraits/men/27.jpg" },
  { id: 5, title: "Traditional Godh Bharai", category: "Baby Shower", location: "Jaipur", rating: 4.9, imageUrl: "/images/indian_baby_shower.png", reviewerName: "Neha W.", reviewText: "Such a beautiful, stress-free day! The marigold decor was exactly like my Pinterest board.", avatarUrl: "https://randomuser.me/api/portraits/women/30.jpg" },
  { id: 6, title: "Beachside Anniversary Gala", category: "Anniversary", location: "Goa", rating: 4.8, imageUrl: "/images/luxury_beach_gala.png", reviewerName: "Arjun & Meera", reviewText: "A night we will cherish forever. The ocean view setup was orchestrated perfectly.", avatarUrl: "https://randomuser.me/api/portraits/men/53.jpg" },
  { id: 7, title: "Sufi Music Festival", category: "Festival", location: "Delhi", rating: 4.6, imageUrl: "/images/indian_concert.png", reviewerName: "Rahul K.", reviewText: "Rustic, chic, and perfectly organized. The live food counters were a huge hit!", avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 8, title: "Grand Palace Reception", category: "Wedding", location: "Jodhpur", rating: 5.0, imageUrl: "/images/royal_wedding.png", reviewerName: "Aditi & Sahil", reviewText: "An elegant fusion of modern luxury and tradition. Shata made our dream a reality.", avatarUrl: "https://randomuser.me/api/portraits/women/59.jpg" },
  { id: 9, title: "Golden Hour Cocktail Soiree", category: "Corporate", location: "Pune", rating: 4.7, imageUrl: "/images/corporate_event.png", reviewerName: "Sneha L.", reviewText: "The sunset lighting and high-end cocktails set the perfect networking vibe.", avatarUrl: "https://randomuser.me/api/portraits/women/85.jpg" },
];

interface EventShowcaseCarouselProps {
  onNavigate: (page: PageType, context?: string | number) => void;
}

const AUTOPLAY_MS = 3200;
const SPACING = 250;
const MAX_VISIBLE = 3;

export default function EventShowcaseCarousel({ onNavigate }: EventShowcaseCarouselProps) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragDeltaX = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [autoplay, setAutoplay] = useState(true);
  const n = clientStories.length;

  const go = useCallback((dir: 1 | -1) => {
    setActive((prev) => (prev + dir + n) % n);
  }, [n]);

  const goTo = (i: number) => {
    setAutoplay(false);
    setActive(((i % n) + n) % n);
  };

  useEffect(() => {
    if (dragging || !autoplay) return;
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [go, dragging, autoplay]);

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    setAutoplay(false);
    dragStartX.current = ('clientX' in e ? e.clientX : e.touches?.[0]?.clientX) ?? 0;
    dragDeltaX.current = 0;
  };
  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const x = ('clientX' in e ? e.clientX : e.touches?.[0]?.clientX) ?? 0;
    dragDeltaX.current = x - dragStartX.current;
  };
  const onPointerUp = () => {
    if (dragDeltaX.current > 60) go(-1);
    else if (dragDeltaX.current < -60) go(1);
    setDragging(false);
  };


  return (
    <section id="showcase-carousel" className="relative px-3 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden font-geist bg-transparent">
      {/* Background ambient removed so the global mesh comes through */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-white/40 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-[#F3E5AB]/40 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="pill-gold mx-auto mb-4" style={{ width: 'fit-content' }}>Client Success Stories</div>
          <h2 className="font-geist text-3xl sm:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-3">
            Don't Just Take Our{" "}
            <span className="text-gradient-gold">
              Word For It
            </span>
          </h2>
          <p className="text-black/60 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Hear directly from the clients who turned their event visions into reality with Shata.
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="btn-premium-black inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm group cursor-pointer"
          >
            <span>Start Your Journey</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div
          className="relative h-[340px] sm:h-[400px] md:h-[440px] select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1400px', touchAction: 'pan-y' }}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={() => dragging && onPointerUp()}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {clientStories.map((story, i) => {
            let diff = i - active;
            if (diff > n / 2) diff -= n;
            if (diff < -n / 2) diff += n;
            const abs = Math.abs(diff);
            const isActive = diff === 0;
            const hidden = abs > MAX_VISIBLE;

            const translateX = diff * SPACING;
            const translateZ = -abs * 110;
            const rotateY = Math.max(-42, Math.min(42, diff * -30));
            const scale = isActive ? 1 : Math.max(0.72, 1 - abs * 0.12);
            const opacity = hidden ? 0 : 1 - abs * 0.22;
            const zIndex = 50 - abs;

            return (
              <div
                key={story.id}
                className="absolute top-0 left-1/2 w-[220px] sm:w-[300px] md:w-[360px] h-full -ml-[110px] sm:-ml-[150px] md:-ml-[180px]"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: hidden ? "none" : "auto",
                  transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms ease',
                  willChange: 'transform, opacity'
                }}
                onClick={() => !isActive && goTo(i)}
              >
              <div
                className={`group relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col glass-panel-light ${
                  isActive
                    ? 'border-[#D4AF37]/50 shadow-[#B8860B]/20'
                    : ''
                }`}
              >
                  {/* Top Image Section */}
                  <div className="relative h-[45%] w-full overflow-hidden border-b border-black/10">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading="lazy"
                    />
                    
                    {/* Top Center Logo */}
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-black/10 flex items-center justify-center">
                      <img src={logoSvg} alt="Shata Logo" className="h-3.5 w-auto object-contain" />
                    </div>

                    <div className="absolute bottom-2.5 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/70 text-white">
                        {story.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold text-[#D4AF37] bg-black/70">
                        ★ {story.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Review Section */}
                  <div className="flex-1 p-4 sm:p-5 bg-white/40 flex flex-col justify-between text-left">
                    <div>
                      <svg className="w-6 h-6 text-[#D4AF37]/50 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-xs sm:text-sm italic leading-relaxed text-black/70 line-clamp-3 mb-4">
                        "{story.reviewText}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-black/10 mt-auto">
                      <img 
                        src={story.avatarUrl} 
                        alt={story.reviewerName} 
                        className="w-8 h-8 rounded-full border border-[#D4AF37]/40 object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-black leading-tight truncate">
                          {story.reviewerName}
                        </h4>
                        <p className="text-[9px] text-[#D4AF37] mt-0.5 truncate">
                          {story.title} • {story.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            aria-label="Previous"
            onClick={() => { setAutoplay(false); go(-1); }}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-black/20 shadow-md flex items-center justify-center text-black/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:scale-105 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => { setAutoplay(false); go(1); }}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-black/20 shadow-md flex items-center justify-center text-black/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:scale-105 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-30">
        {clientStories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className="group py-2 px-1 cursor-pointer"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === active
                ? 'w-8 sm:w-12 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                : 'w-2 sm:w-2.5 bg-black/20 hover:bg-slate-300 group-hover:w-4'
                }`}
            />
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}

