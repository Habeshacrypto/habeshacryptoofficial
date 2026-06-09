'use client'

// ============================================================
// COMPONENT: ContactUs
// PURPOSE: Contact form section with Name, Email,
//          Subject, Message fields and a Send button
// ============================================================

import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Send, Mail, User, MessageSquare, FileText, CheckCircle } from 'lucide-react'

export default function ContactUs() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setError(null)
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || '(No subject)',
          message: form.message,
          to_email: 'Habeshacrypto75@gmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#00ff88]/4 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">

        {/* ── Header ── */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Contact Us
          </h2>
          <p className="font-body text-slate-400 text-base mt-6">
            Have questions? Fill out the form below and our team will get back to you right away!
          </p>
        </div>

        {/* ── Form ── */}
        <div
          className={`crypto-card p-8 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {sent ? (
            // Success state
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle size={48} className="text-[#00ff88] mb-4" />
              <h3 className="font-heading font-bold text-xl text-white mb-2">Message Sent!</h3>
              <p className="font-body text-slate-400 text-sm mb-6">
                Thanks for reaching out! We'll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-outline text-sm"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="crypto-input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="crypto-input pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="crypto-input pl-10"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message here..."
                    className="crypto-input pl-10 resize-none"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.email || !form.message}
                className="btn-primary flex items-center gap-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#050d1a] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
