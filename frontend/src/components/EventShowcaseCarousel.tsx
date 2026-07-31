import { useState, useEffect, useRef, useCallback } from "react";

interface EventItem {
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

const featuredEvents: EventItem[] = [
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

const AUTOPLAY_MS = 3200;
const SPACING = 250;
const MAX_VISIBLE = 3;

export default function EventShowcaseCarousel() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragDeltaX = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = featuredEvents.length;

  const go = useCallback((dir: 1 | -1) => {
    setActive((prev) => (prev + dir + n) % n);
  }, [n]);

  const goTo = (i: number) => setActive(((i % n) + n) % n);

  useEffect(() => {
    if (dragging) return;
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [go, dragging]);

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
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
      {/* Ambient glass background */}
      <div className="absolute inset-0 -z-20 bg-white/10 backdrop-blur-md border-y border-white/40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-orange-400/20 via-amber-300/20 to-yellow-300/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-orange-300/20 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block font-medium tracking-[0.2em] uppercase text-orange-600 mb-3 text-[11px] sm:text-xs">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.15] mb-3">
            Don't Just Take Our{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              Word For It
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Hear directly from the clients who turned their event visions into high-quality reality with Shata.
          </p>
          <a
            href="#vendors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium text-xs sm:text-sm hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/30 group"
          >
            <span>Start Your Journey</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* 3D Coverflow */}
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
          {featuredEvents.map((event: EventItem, i: number) => {
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
                key={event.id}
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
                  className={`group relative w-full h-full rounded-2xl sm:rounded-3xl bg-white/40 border backdrop-blur-2xl overflow-hidden shadow-xl shadow-orange-200/40 transition-all duration-500 ${
                    isActive ? "border-white/90 ring-1 ring-orange-200/70 shadow-2xl shadow-orange-300/40" : "border-white/60"
                  }`}
                >
                  <img
                    src={`/images/carousel/${event.seed}.png`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/10" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
                      {event.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-400 bg-slate-900/80 backdrop-blur-md border border-white/20">
                      ★ {event.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Review Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white z-10 flex flex-col justify-end h-full">
                    {/* Quote Icon */}
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400/50 mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    {/* Review Text */}
                    <p className="text-sm sm:text-base italic leading-relaxed text-slate-100 mb-5 line-clamp-3">
                      "{event.reviewText}"
                    </p>

                    {/* Reviewer Profile */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                      <img 
                        src={event.avatarUrl} 
                        alt={event.reviewerName} 
                        className="w-10 h-10 rounded-full border-2 border-orange-400/50 object-cover"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {event.reviewerName}
                        </h4>
                        <p className="text-[10px] text-orange-400 mt-0.5">
                          {event.title} • {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Arrows */}
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-900 hover:bg-white/90 hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-md flex items-center justify-center text-slate-900 hover:bg-white/90 hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {featuredEvents.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-6 bg-orange-500" : "w-1.5 bg-orange-300/50 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14 pt-8 border-t border-slate-200/80">
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
              Lightning-Fast Booking
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Explore curated packages, pick your date, and watch verified vendor teams bring your event to life seamlessly.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
              Multiple Styles &amp; Customization
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Tailor every detail from floral stage themes, live gourmet food counters, to cinematic lighting and drone coverage.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
              High-Resolution Memories
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Get raw 4K footage, same-day highlight reels, and color-graded photo galleries ready for sharing and print.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}