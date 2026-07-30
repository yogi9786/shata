import { useState, useEffect, useCallback } from 'react'

interface ScrollData {
  scrollY: number
  /** A value from 0 → 1 representing how far the user has scrolled relative to `distance`. */
  progress: number
}

/**
 * Tracks window scroll position and computes a normalised progress (0–1)
 * over a configurable pixel distance starting from `offset`.
 *
 * @param distance  Total scroll distance (px) over which progress goes 0→1. Default 800.
 * @param offset    Scroll position (px) where progress starts.  Default 0.
 */
export function useScrollProgress(distance = 800, offset = 0): ScrollData {
  const [data, setData] = useState<ScrollData>({ scrollY: 0, progress: 0 })

  const handleScroll = useCallback(() => {
    const y = window.scrollY
    const raw = Math.max(0, y - offset) / distance
    const progress = Math.min(1, Math.max(0, raw))
    setData({ scrollY: y, progress })
  }, [distance, offset])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initialise
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return data
}
