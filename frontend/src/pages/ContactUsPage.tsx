import { useState } from 'react'
import type { PageType } from '../App'
import { API_BASE_URL } from '../config'

interface ContactUsPageProps {
  onNavigate?: (page: PageType, context?: string | number) => void
}

export default function ContactUsPage({}: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Failed to send message.')

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err.message || 'An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta pb-20">
      {/* ─── Premium Banner Section ─── */}
      <div className="relative h-[200px] sm:h-[250px] w-full overflow-hidden flex flex-col justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0 bg-[#fba14d] overflow-hidden">
          {/* Decorative glowing blobs */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-rose-400/40 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-300/20 rounded-full blur-[120px]" />
          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff60_1px,transparent_1px),linear-gradient(to_bottom,#ffffff60_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-6 sm:p-12 md:flex gap-12 glass-shine-light">

          {/* Contact Info Column */}
          <div className="md:w-1/3 mb-10 md:mb-0">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Connect with us</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you have a question about our services, pricing, or want to partner with us, our team is ready to answer all your questions.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                  <p className="text-slate-900 font-semibold">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                  <p className="text-slate-900 font-semibold">hello@shata.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Office</p>
                  <p className="text-slate-900 font-semibold">123 Event Hub, Tech Park, Mumbai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:w-2/3 bg-white/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/80 shadow-sm relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h3>

            {status === 'success' ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-100 rounded-2xl">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Message Sent!</h4>
                <p className="text-slate-600">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your event..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all font-medium resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-4 mt-8 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm rounded-2xl transition-all shadow-[0_8px_16px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 cursor-pointer ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(249,115,22,0.4)]'}`}
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
