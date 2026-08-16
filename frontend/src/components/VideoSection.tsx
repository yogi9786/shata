import { useState, useRef } from 'react'

import video1 from '../assets/✨ Every unforgettable celebration starts with the perfect setup.From stunning décor to flawless .mp4'
import video2 from '../assets/🎃 Halloween just got a whole lot more SPOOKTACULAR! 👻From creepy corners to jaw-dropping theme.mp4'
import video3 from '../assets/Book your trusted event professionals in just a few taps.From event planners and photographers t.mp4'
import video4 from '../assets/New doors. New opportunities. Same commitment to excellence. 🧡Today, we proudly open the doors .mp4'

interface VideoCardProps {
  src: string
}

function VideoCard({ src }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(err => console.log("Play failed", err))
      setIsPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering play/pause when muting
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div 
      onClick={togglePlay}
      className="w-[260px] sm:w-[300px] shrink-0 snap-center rounded-2xl overflow-hidden shadow-lg aspect-[9/16] bg-black relative group cursor-pointer select-none"
    >
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted={isMuted}
        playsInline 
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Hover dark overlay */}
      <div className={`absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-all duration-300 ${!isPlaying ? 'bg-black/45' : ''}`} />
      
      {/* Central Play/Pause Overlay Indicator */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100 scale-100'}`}>
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
          {isPlaying ? (
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>
      </div>

      {/* Floating Sound Control Icon at Bottom Right */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
          </svg>
        ) : (
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default function VideoSection() {
  const videos = [video1, video2, video3, video4]

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
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-4 sm:px-0 snap-x snap-mandatory scroll-smooth w-full lg:justify-center">
            {videos.map((src, index) => (
              <VideoCard key={index} src={src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
