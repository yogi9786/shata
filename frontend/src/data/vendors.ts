export interface EventItem {
  id: number
  title: string
  category: string
  location: string
  date: string
  rating: number
  reviewsCount: number
  price: string
  tag: string
  description: string
  image: string
  featured?: boolean
}

export const featuredEvents: EventItem[] = [
  {
    id: 1,
    title: "Grand Royal Wedding & Sangeet Night",
    category: "Weddings",
    location: "Udaipur & Jaipur, Rajasthan",
    date: "Available All Season",
    rating: 4.9,
    reviewsCount: 1420,
    price: "₹1,50,000 onwards",
    tag: "Luxury Wedding",
    description: "Full-scale palace decor, royal mandap design, candid 4K cinematography & live Shehnai orchestra.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Sunburn Beach Electronic Music Festival",
    category: "Concerts",
    location: "Vagator, Goa",
    date: "Dec 28 - Dec 31",
    rating: 4.8,
    reviewsCount: 3890,
    price: "₹2,500 / Entry",
    tag: "Mega Festival",
    description: "India's biggest EDM music festival with international DJs, immersive laser light show & food courts.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Saffron Gourmet Banquet & Live Counters",
    category: "Catering",
    location: "Mumbai & Pune",
    date: "Bookings Open",
    rating: 4.9,
    reviewsCount: 950,
    price: "₹850 / Plate",
    tag: "Multi-Cuisine",
    description: "50+ authentic regional & international live cooking stations, artisanal desserts & silver service.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Cinematic Candid Wedding Film & Drone Shoot",
    category: "Photography",
    location: "Pan-India Coverage",
    date: "Instant Booking",
    rating: 4.9,
    reviewsCount: 1120,
    price: "₹65,000 / Day",
    tag: "4K Cinema",
    description: "Award-winning wedding cinematographers capturing timeless emotions, pre-wedding & trailer cuts.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Corporate Tech Leadership Summit 2026",
    category: "Corporate",
    location: "Bengaluru, Karnataka",
    date: "Nov 14, 2026",
    rating: 4.7,
    reviewsCount: 640,
    price: "₹4,999 / Delegate",
    tag: "Business Gala",
    description: "Keynote speeches, executive networking lounges, AI expo booths & black-tie gala dinner.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Ethereal Floral Entry Tunnel & Stage Decor",
    category: "Decor",
    location: "Delhi NCR & Chandigarh",
    date: "Custom Themes",
    rating: 4.8,
    reviewsCount: 810,
    price: "From ₹45,000",
    tag: "Floral Setup",
    description: "Minimalist pastel floral installations, fairy-light walkways, photobooths & customized stage backdrops.",
    image: "https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=800&auto=format&fit=crop&q=80",
  }
]
