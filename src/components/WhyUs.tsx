'use client'

// ============================================================
// COMPONENT: WhyUs
// PURPOSE: "Why Habesha Crypto" section highlighting key
//          benefits: real-time alerts, expert support,
//          learning resources, and community
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { Bell, HeadphonesIcon, BookOpenCheck, Users2 } from 'lucide-react'
import Image from 'next/image'
import mobile from '../../assets/images/phonei.png';

const features = [
  {
    icon: Bell,
    title: 'Structured Cryptocurrency Education',
    description:
      'Learn about blockchain fundamentals, digital assets, decentralised finance, and cryptocurrency concepts through clear, structured education.',
    color: '#00ff88',
    delay: 0,
  },
  {
    icon: HeadphonesIcon,
    title: 'Educational Market Research',
    description:
      'Explore historical developments, economic trends, blockchain data, and educational market observations to build stronger context and understanding.',
    color: '#00aaff',
    delay: 150,
  },
  {
    icon: BookOpenCheck,
    title: 'Technical Analysis Education',
    description:
      'Understand chart patterns, technical indicators, market structure, and analytical methodologies in a learning-first environment.',
    color: '#aa00ff',
    delay: 300,
  },
  {
    icon: Users2,
    title: 'Community Learning',
    description:
      'Connect with individuals interested in blockchain technology and share educational knowledge through structured discussions and learning support.',
    color: '#ffaa00',
    delay: 450,
  },
]

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-us" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute inset-0 bg-[#071224]/30" />
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ff88]/3 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* ── Header ── */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Why Learn With Us
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Why Habesha Crypto
          </h2>
        </div>

        {/* ── Phone mockup + Features ── */}
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left features (2) */}
          <div className="flex flex-col gap-8 flex-1">
            {features.slice(0, 2).map(({ icon: Icon, title, description, color, delay }) => (
              <div
                key={title}
                className={`crypto-card p-6 flex gap-4 items-start transition-all duration-700 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}35` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wide mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center: phone mockup */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 delay-300 ${
              visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ animation: visible ? 'float 6s ease-in-out infinite' : 'none' }}
          >
            <div className="relative w-80">
              <Image src={mobile} alt='' ></Image>
              {/* Phone frame */}
              {/* <div className="relative bg-[#0a1a35] rounded-[2.5rem] border-2 border-[#00ff88]/30 overflow-hidden shadow-2xl"
                style={{ boxShadow: '0 0 40px rgba(0,255,136,0.2), 0 0 80px rgba(0,255,136,0.05)' }}>
                
              </div> */}
            </div>
          </div>

          {/* Right features (2) */}
          <div className="flex flex-col gap-8 flex-1">
            {features.slice(2).map(({ icon: Icon, title, description, color, delay }) => (
              <div
                key={title}
                className={`crypto-card p-6 flex gap-4 items-start transition-all duration-700 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}35` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wide mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  )
}
