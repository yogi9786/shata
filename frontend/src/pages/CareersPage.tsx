import { useState } from 'react'
import type { PageType } from '../App'

interface CareersPageProps {
  onNavigate?: (page: PageType, context?: string | number) => void
}

interface JobListing {
  id: number
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
}

export default function CareersPage({ onNavigate }: CareersPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Event Operations Lead',
    resumeLink: '',
    about: ''
  })
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const jobs: JobListing[] = [
    {
      id: 1,
      title: 'Event Operations Lead',
      department: 'Operations',
      location: 'Hyderabad, Telangana',
      type: 'Full-time',
      experience: '3 - 5 Years',
      description: 'Oversee ground-level logistics, vendor coordination, and seamless venue execution for weddings and corporate gatherings.'
    },
    {
      id: 2,
      title: 'Senior Stage & Floral Designer',
      department: 'Creative Design',
      location: 'Jaipur, Rajasthan',
      type: 'Full-time',
      experience: '5+ Years',
      description: 'Create luxurious, high-end traditional and contemporary stage backdrops and thematic floral setups.'
    },
    {
      id: 3,
      title: 'Front-End Engineer (React / TypeScript)',
      department: 'Product Engineering',
      location: 'Bengaluru / Remote',
      type: 'Full-time',
      experience: '2 - 4 Years',
      description: 'Own user-facing components, optimize performance, and iterate on our interactive event booking marketplace interface.'
    },
    {
      id: 4,
      title: 'Vendor Partnerships Manager',
      department: 'Business Development',
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      experience: '3+ Years',
      description: 'Build strategic partnerships with premium caterers, photographers, and venue owners across major tier-1 cities.'
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }))
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    // Simulate API Submission
    setTimeout(() => {
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: 'Event Operations Lead',
        resumeLink: '',
        about: ''
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3] font-jakarta pb-20">
      
      {/* ─── Premium Header Banner Section ─── */}
      <div className="relative h-[220px] sm:h-[280px] w-full overflow-hidden flex flex-col justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0 bg-[#E86F32] overflow-hidden">
          {/* Glowing blobs matching site theme */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-orange-400/30 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#FF9F43]/30 rounded-full blur-[120px]" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff40_1px,transparent_1px),linear-gradient(to_bottom,#ffffff40_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F3] via-transparent to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_12px_40px_rgba(232,111,50,0.06)] rounded-3xl p-6 sm:p-12 flex flex-col gap-8">
          
          {onNavigate && (
            <button
              onClick={() => onNavigate('home')}
              className="self-start text-slate-500 hover:text-[#E86F32] flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
            >
              &larr; Back to Home
            </button>
          )}

          {/* Page Heading Info */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1.5 bg-[#E86F32]/10 border border-[#E86F32]/20 rounded-full text-[#E86F32] text-xs font-bold uppercase tracking-wider mb-4">
              Careers at Shata
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight mb-4">
              Build the Future of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86F32] to-[#FF9F43]">
                Event Booking
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Join India's premium destination for event planning and execution. We are looking for passionate, driven, and creative individuals to redefine customer journeys.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Job Listings Grid */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-[#E86F32]" />
              Open Positions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div 
                  key={job.id}
                  className="p-5 sm:p-6 bg-white/80 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-[#E86F32]/30"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded bg-orange-50 text-[#E86F32] text-[10px] font-bold tracking-wider uppercase">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold tracking-wider uppercase">
                        {job.type}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-[#172033] group-hover:text-[#E86F32] transition-colors mb-2">
                      {job.title}
                    </h4>
                    
                    <p className="text-xs text-slate-500 font-semibold mb-3 flex items-center gap-1.5">
                      📍 {job.location} &nbsp;•&nbsp; 💼 {job.experience}
                    </p>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {job.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="w-full py-2.5 bg-black border-none text-white font-bold tracking-tight rounded-none shadow-[3px_3px_0px_#E86F32] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150 ease-in-out cursor-pointer text-xs sm:text-sm font-jakarta"
                  >
                    Apply for this Role →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" id="application-form" />

          {/* Interactive Application Form */}
          <div className="max-w-2xl mx-auto w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 text-center">
              Submit Your Application
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 text-center mb-8">
              Take the first step towards a rewarding career with Shata.
            </p>

            {status === 'success' ? (
              <div className="p-8 bg-orange-50/50 border border-[#E86F32]/20 rounded-2xl text-center animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#E86F32]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-[#172033] mb-2">Application Received!</h4>
                <p className="text-sm text-slate-600 mb-6">
                  Thank you for applying. Our talent acquisition team will review your credentials and get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 bg-black hover:bg-[#E86F32] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E86F32]/35 focus:border-[#E86F32]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E86F32]/35 focus:border-[#E86F32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E86F32]/35 focus:border-[#E86F32]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E86F32]/35 focus:border-[#E86F32] cursor-pointer"
                    >
                      {jobs.map((j) => (
                        <option key={j.id} value={j.title}>{j.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resume / Portfolio Link</label>
                  <input
                    type="url"
                    name="resumeLink"
                    required
                    placeholder="https://drive.google.com/... or https://linkedin.com/..."
                    value={formData.resumeLink}
                    onChange={handleChange}
                    className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E86F32]/35 focus:border-[#E86F32]"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tell Us About Yourself</label>
                  <textarea
                    name="about"
                    rows={4}
                    required
                    placeholder="Describe your background and why you want to join Shata..."
                    value={formData.about}
                    onChange={handleChange}
                    className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E86F32]/35 focus:border-[#E86F32] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 bg-[#E86F32] hover:bg-[#D96129] border-none text-white font-bold tracking-tight rounded-none shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 ease-in-out disabled:bg-slate-400 disabled:shadow-none cursor-pointer font-jakarta text-sm sm:text-base"
                >
                  {status === 'submitting' ? 'Submitting Application...' : 'Submit Application →'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}
