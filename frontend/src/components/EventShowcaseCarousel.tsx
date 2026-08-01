import { useState, useEffect, useRef, useCallback } from "react";
import logoSvg from "../assets/logo.svg";
import type { PageType } from "../App";

interface ClientStory {
  id: number;
  title: string;
  category: string;
  location: string;
  rating: number;
  seed: string;
  reviewerName: string;
  reviewText: string;
  avatarUrl: string;
}

const clientStories: ClientStory[] = [
  { id: 1, title: "Royal Mandap Wedding", category: "Wedding", location: "Udaipur", rating: 4.9, seed: "rosewater-wedding", reviewerName: "Rohan & Priya", reviewText: "Absolutely magical! The Shata team brought our floral mandap vision to life flawlessly.", avatarUrl: "https://randomuser.me/api/portraits/women/43.jpg" },
  { id: 2, title: "Bollywood Sangeet Night", category: "Sangeet", location: "Mumbai", rating: 4.8, seed: "midnight-sixteen", reviewerName: "Ananya S.", reviewText: "The best night of my life! The lighting, stage, and DJ were exactly what I wanted.", avatarUrl: "https://randomuser.me/api/portraits/women/24.jpg" },
  { id: 3, title: "Lakeside Roka Ceremony", category: "Engagement", location: "Kerala", rating: 5.0, seed: "blush-engagement", reviewerName: "Karan R.", reviewText: "A breathtaking setup. Booking the venue and vendors through Shata was so seamless.", avatarUrl: "https://randomuser.me/api/portraits/men/43.jpg" },
  { id: 4, title: "Corporate Tech Summit", category: "Corporate", location: "Bengaluru", rating: 4.7, seed: "skyline-launch", reviewerName: "Vikram M., CEO", reviewText: "Incredibly professional. Our new product was unveiled in absolute style and luxury.", avatarUrl: "https://randomuser.me/api/portraits/men/27.jpg" },
  { id: 5, title: "Traditional Godh Bharai", category: "Baby Shower", location: "Jaipur", rating: 4.9, seed: "peony-shower", reviewerName: "Neha W.", reviewText: "Such a beautiful, stress-free day! The marigold decor was exactly like my Pinterest board.", avatarUrl: "https://randomuser.me/api/portraits/women/30.jpg" },
  { id: 6, title: "Beachside Anniversary Gala", category: "Anniversary", location: "Goa", rating: 4.8, seed: "velvet-gala", reviewerName: "Arjun & Meera", reviewText: "A night we will cherish forever. The ocean view setup was orchestrated perfectly.", avatarUrl: "https://randomuser.me/api/portraits/men/53.jpg" },
  { id: 7, title: "Sufi Music Festival", category: "Festival", location: "Delhi", rating: 4.6, seed: "orchard-festival", reviewerName: "Rahul K.", reviewText: "Rustic, chic, and perfectly organized. The live food counters were a huge hit!", avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 8, title: "Grand Palace Reception", category: "Wedding", location: "Jodhpur", rating: 5.0, seed: "silk-reception", reviewerName: "Aditi & Sahil", reviewText: "An elegant fusion of modern luxury and tradition. Shata made our dream a reality.", avatarUrl: "https://randomuser.me/api/portraits/women/59.jpg" },
  { id: 9, title: "Golden Hour Cocktail Soiree", category: "Corporate", location: "Pune", rating: 4.7, seed: "amber-soiree", reviewerName: "Sneha L.", reviewText: "The sunset lighting and high-end cocktails set the perfect networking vibe.", avatarUrl: "https://randomuser.me/api/portraits/women/85.jpg" },
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
    <section id="showcase-carousel" className="relative px-3 sm:px-6 lg:px-8 py-10 sm:py-16 overflow-hidden font-geist">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-orange-400/20 via-amber-300/20 to-yellow-300/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-orange-300/20 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block font-medium tracking-[0.2em] uppercase text-orange-600 mb-3 text-[11px] sm:text-xs">
            Client Success Stories
          </span>
          <h2 className="font-geist text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-[1.15] mb-3">
            Don't Just Take Our{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              Word For It
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Hear directly from the clients who turned their event visions into high-quality reality with Shata.
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium text-xs sm:text-sm hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/30 group cursor-pointer"
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
                  className={`group relative w-full h-full rounded-2xl sm:rounded-3xl bg-white border overflow-hidden shadow-xl shadow-slate-200/50 transition-all duration-500 flex flex-col ${
                    isActive ? "border-orange-500 ring-1 ring-orange-200/70 shadow-2xl shadow-orange-300/40" : "border-slate-200"
                  }`}
                >
                  {/* Top Image Section (White bg, logo top center, no color overlay) */}
                  <div className="relative h-[40%] w-full bg-white overflow-hidden border-b border-slate-100">
                    <img
                      src={`https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800&seed=${story.seed}`}
                      alt={story.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading="lazy"
                    />
                    
                    {/* Top Center Logo */}
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-10 bg-white/95 px-3 py-1 rounded-full shadow-md border border-slate-100/90 flex items-center justify-center">
                      <img src={logoSvg} alt="Shata Logo" className="h-3.5 w-auto object-contain" />
                    </div>

                    <div className="absolute bottom-2.5 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/75 text-white">
                        {story.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold text-amber-400 bg-black/75">
                        ★ {story.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Text Section (White bg, dark text) */}
                  <div className="flex-1 p-5 sm:p-6 bg-white flex flex-col justify-between text-slate-800 text-left">
                    <div>
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500/20 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-xs sm:text-sm italic leading-relaxed text-slate-600 line-clamp-3 mb-4">
                        "{story.reviewText}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100 mt-auto">
                      <img 
                        src={story.avatarUrl} 
                        alt={story.reviewerName} 
                        className="w-8.5 h-8.5 rounded-full border border-orange-400/50 object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                          {story.reviewerName}
                        </h4>
                        <p className="text-[9px] text-orange-600 mt-0.5 truncate">
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
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-900 hover:bg-white/90 hover:scale-105 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => { setAutoplay(false); go(1); }}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-900 hover:bg-white/90 hover:scale-105 transition-all cursor-pointer"
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
                ? 'w-8 sm:w-12 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]'
                : 'w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400 group-hover:w-4'
                }`}
            />
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}
