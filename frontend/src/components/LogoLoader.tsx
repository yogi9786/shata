import logoSvg from '../assets/logo.svg'

interface LogoLoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function LogoLoader({ className = '', size = 'md', text = 'Loading Experiences...' }: LogoLoaderProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  const logoSizes = {
    sm: 'h-5',
    md: 'h-8',
    lg: 'h-11',
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center select-none ${className}`}>
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        {/* Outer light track ring */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
        
        {/* Outer spinning premium gradient arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 border-r-amber-500 animate-spin" />
        
        {/* Sub-ring spinning counter-clockwise for visual depth */}
        <div className="absolute inset-2 rounded-full border border-transparent border-b-rose-500 border-l-orange-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        {/* Ambient pulsing background circle */}
        <div className="absolute inset-3 bg-gradient-to-tr from-orange-500/10 via-amber-400/5 to-rose-500/10 rounded-full animate-pulse" />
        
        {/* Core pulsing logo in center */}
        <img 
          src={logoSvg} 
          alt="Shata Loading..." 
          className={`${logoSizes[size]} w-auto object-contain relative z-10 animate-pulse`}
          style={{ animationDuration: '2s' }}
        />
      </div>
      {text && (
        <p className="mt-5 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse" style={{ animationDuration: '2.5s' }}>
          {text}
        </p>
      )}
    </div>
  )
}
