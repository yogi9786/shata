export default function VideoSection() {
  const videos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  ]

  return (
    <section className="py-12 sm:py-16 bg-[#FFF8F3] overflow-hidden relative font-jakarta border-t border-black/10">
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 text-left">
          <div className="text-black font-semibold text-sm uppercase tracking-widest mb-3">
            Social Feeds
          </div>
          <h2 className="font-jakarta text-3xl sm:text-5xl lg:text-[40px] font-bold leading-[1.1] mb-3 sm:mb-5 lg:mb-3 tracking-tight text-black">
            Experience the Magic
          </h2>
        </div>

        {/* Horizontal scroll container on all devices */}
        <div className="relative -mx-4 sm:mx-0">
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-4 sm:px-0 snap-x snap-mandatory scroll-smooth w-full">
            {videos.map((src, index) => (
              <div 
                key={index} 
                className="w-[260px] sm:w-[300px] shrink-0 snap-center rounded-2xl overflow-hidden shadow-lg aspect-[9/16] bg-black relative"
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                >
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
