export interface EventItem {
  id: number
  title: string
  category: 'Weddings' | 'Concerts' | 'Catering' | 'Photography' | 'Corporate' | 'Decor' | 'Galas'
  location: string
  date: string
  rating: number
  reviewsCount: number
  price: string
  tag: string
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
}

export const featuredEvents: EventItem[] = [
  {
    id: 1,
    title: "Grand Royal Wedding & Sangeet Night",
    category: "Weddings",
    location: "Udaipur & Jaipur, Rajasthan",
    date: "Available All Season",
    rating: 4.98,
    reviewsCount: 1420,
    price: "₹1,50,000 onwards",
    tag: "Luxury Palace Wedding",
    badge: "Most Popular",
    description: "Full-scale royal palace decor, hand-crafted mandap setup, 4K candid cinematography & live Shehnai orchestra.",
    fullDescription: "Experience an unmatchable royal celebration in Rajasthan's finest heritage palaces. Includes custom floral arches, velvet seating, traditional folk performances, gourmet royal dining setup, and dedicated event concierges.",
    image: "/images/royal_wedding.png",
    capacity: "500 - 2,500 Guests",
    duration: "3 Days / 2 Nights",
    organizer: "Imperial Heritage Weddings",
    highlights: ["Palace Illumination", "4K Drone & Cinema Team", "Royal Shehnai & Dhol Band", "Signature Welcome Rituals"],
    featured: true,
    isPopular: true
  },
  {
    id: 2,
    title: "Sunburn Beach Electronic Music Festival",
    category: "Concerts",
    location: "Vagator Beach, Goa",
    date: "Dec 28 - Dec 31",
    rating: 4.92,
    reviewsCount: 3890,
    price: "₹2,500 / Entry",
    tag: "Mega EDM Festival",
    badge: "Selling Fast",
    description: "India's premier EDM music festival with international DJs, multi-stage laser production & pyrotechnics.",
    fullDescription: "4 days of non-stop electronic music, featuring world-renowned headline DJs, food village, beach chill zones, interactive art installations, and futuristic stage light shows.",
    image: "/images/music_festival.png",
    capacity: "15,000+ Attendees",
    duration: "4 Days",
    organizer: "Percept Live Events",
    highlights: ["3 Multi-Genre Stages", "Synchronized Laser Show", "VIP Sky Decks", "Global Street Food Market"],
    featured: true,
    isPopular: true
  },
  {
    id: 3,
    title: "Saffron Gourmet Banquet & Live Counters",
    category: "Catering",
    location: "Mumbai, Pune & Bengaluru",
    date: "Bookings Open 2026",
    rating: 4.95,
    reviewsCount: 950,
    price: "₹850 / Plate",
    tag: "5-Star Culinary",
    badge: "Chef Curated",
    description: "50+ authentic regional & international live cooking stations, artisanal patisserie & silver glove service.",
    fullDescription: "Elevate your celebration with Michelin-level culinary craft. Featuring live sushi bars, firewood pizza hearths, molecular gastronomy desserts, and bespoke cocktail mixology.",
    image: "/images/gourmet_catering.png",
    capacity: "100 - 1,500 Guests",
    duration: "Flexible Hours",
    organizer: "Saffron Haute Cuisine",
    highlights: ["Live Teppanyaki & Wok", "Artisanal Dessert Studio", "Sommelier Wine Tasting", "Zero-Waste Eco Setup"],
    featured: true
  },
  {
    id: 4,
    title: "Cinematic Candid Wedding Film & Drone Coverage",
    category: "Photography",
    location: "Pan-India & International",
    date: "Instant Booking",
    rating: 4.99,
    reviewsCount: 1120,
    price: "₹65,000 / Day",
    tag: "4K Cinema & HDR",
    badge: "Award Winner",
    description: "Award-winning cinematographers capturing timeless emotions, pre-wedding trailers & same-day edits.",
    fullDescription: "Capture every glance, tear, and laughter with cinema-grade RED and Sony FX cameras, dual FPV drone coverage, color-graded feature films, and coffee-table photo albums.",
    image: "/images/cinematic_photography.png",
    capacity: "Unlimited Coverage",
    duration: "Full Event Package",
    organizer: "Lumière Event Studios",
    highlights: ["4K HDR Cinema Film", "Dual Operator FPV Drones", "Same-Day Teaser Reel", "Bespoke Hardcover Album"],
    featured: true,
    isPopular: true
  },
  {
    id: 5,
    title: "Corporate Tech Leadership Summit 2026",
    category: "Corporate",
    location: "Convention Centre, Bengaluru",
    date: "Nov 14 - Nov 16, 2026",
    rating: 4.88,
    reviewsCount: 640,
    price: "₹4,999 / Delegate",
    tag: "Business Gala",
    badge: "Exclusive",
    description: "Keynote speeches, executive networking lounges, AI expo booths & black-tie gala dinner.",
    fullDescription: "The flagship annual tech leadership summit bringing together 2,000+ CXOs, tech founders, and investors. Features high-tech curved LED stages, AI networking lounges, and VIP executive dinners.",
    image: "/images/corporate_summit.png",
    capacity: "2,000 Delegates",
    duration: "3 Days",
    organizer: "Global Tech Forums",
    highlights: ["Curved 8K LED Stage", "AI Matchmaking App", "VIP Executive Lounge", "Gala Networking Dinner"],
    featured: true
  },
  {
    id: 6,
    title: "Ethereal Floral Entry Tunnel & Stage Setup",
    category: "Decor",
    location: "Delhi NCR, Chandigarh & Jaipur",
    date: "Custom Themes Available",
    rating: 4.91,
    reviewsCount: 810,
    price: "From ₹45,000",
    tag: "Blush Floral Art",
    badge: "Trending",
    description: "Minimalist pastel floral installations, fairy-light walkways, photobooths & customized stage backdrops.",
    fullDescription: "Transform your venue into a magical garden. Hand-strung blush pink roses, cascading crystal chandeliers, custom LED monogram lightings, and reflective mirror walkways.",
    image: "/images/floral_decor.png",
    capacity: "Any Venue Size",
    duration: "1 Day Setup",
    organizer: "Floriana Couture Decor",
    highlights: ["Imported Fresh Roses", "Mirror Pathway Floor", "Fairy-Light Canopy", "Custom Monogram Stage"],
    featured: true
  },
  {
    id: 7,
    title: "Sunset Beach Lounge & Cocktail Gala",
    category: "Galas",
    location: "South Goa & Kovalam Beach",
    date: "October - April Season",
    rating: 4.96,
    reviewsCount: 780,
    price: "₹1,20,000 / Night",
    tag: "Luxury Coastal",
    badge: "New Launch",
    description: "Bespoke beachside cocktail lounge setup with illuminated palm trees, acoustic bands & white canopy cabanas.",
    fullDescription: "Host an ethereal sunset cocktail party on pristine sands. Includes glowing glass bars, private beach cabanas, acoustic saxophonists, bonfire lounging, and sunset seafood BBQs.",
    image: "/images/luxury_beach_gala.png",
    capacity: "150 - 600 Guests",
    duration: "Sunset to Midnight",
    organizer: "Azure Coastal Events",
    highlights: ["Illuminated Palm Trees", "Live Saxophone & Jazz", "Floating Cocktail Bar", "Beachfront Firepits"],
    featured: true
  },
  {
    id: 8,
    title: "Grand Crystal Ballroom Banquet & Champagne Gala",
    category: "Galas",
    location: "New Delhi & Mumbai Hotels",
    date: "All Year Round",
    rating: 4.97,
    reviewsCount: 1050,
    price: "₹2,10,000 onwards",
    tag: "Black-Tie Velvet",
    badge: "Ultra Luxury",
    description: "Magnificent glass ballroom setup, grand chandelier illumination, mirror tables & champagne towers.",
    fullDescription: "An unforgettably opulent ballroom celebration featuring mirrored banquet tables, crystal chandeliers, classical string quartets, 7-tier champagne towers, and white-glove butler service.",
    image: "/images/vip_ballroom.png",
    capacity: "300 - 1,200 Guests",
    duration: "Evening Gala",
    organizer: "Prestige Luxury Events",
    highlights: ["Crystal Chandelier Grid", "7-Tier Champagne Tower", "String Quartet Performance", "White-Glove Butler Service"],
    featured: true
  }
]
