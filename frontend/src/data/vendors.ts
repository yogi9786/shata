export interface EventItem {
  id: number
  title: string
  category: string
  location: string
  date: string
  rating: number
  reviewsCount: number
  price?: string
  tag?: string
  badge?: string
  description: string
  fullDescription?: string
  image: string
  capacity?: string
  duration?: string
  organizer?: string
  highlights?: string[]
  featured?: boolean
  isPopular?: boolean
  seed?: string
  reviewerName?: string
  reviewText?: string
  avatarUrl?: string
}

export const featuredEvents: EventItem[] = []; // Deprecated, fetch from backend via useEvents hook instead.
