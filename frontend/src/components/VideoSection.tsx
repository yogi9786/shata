export default function VideoSection() {
  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4"
  ]

  return (
    <section className="py-16 px-6 bg-[#FAFAF8] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Experience the Magic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((src, index) => (
            <div key={index} className="rounded-2xl overflow-hidden shadow-lg aspect-[9/16] bg-black relative border-4 border-[#D8B4FE]">
              <video 
                src={src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
