'use client'

// ============================================================
// COMPONENT: SocialFollow
// PURPOSE: "Follow Us on Social Media" section with links to
//          TikTok, YouTube, Telegram, and X (Twitter)
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { YOUTUBE_LINK, TIKTOK_LINK, TELEGRAM_LINK } from '../helper/constant'

const socials = [
  {
    name: 'TikTok',
    handle: '@habeshacrypto',
    href: TIKTOK_LINK,
    color: '#ff0050',
    followers: '12.4K',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: 'Habesha Crypto',
    href: YOUTUBE_LINK,
    color: '#ff0000',
    followers: '8.7K',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.64 31.64 0 000 12a31.64 31.64 0 00.5 5.81 3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.64 31.64 0 0024 12a31.64 31.64 0 00-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram',
    handle: 't.me/habeshacrypto',
    href: TELEGRAM_LINK,
    color: '#0088cc',
    followers: '21.2K',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.018 9.505c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.881.716z"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    handle: '@habeshacrypto',
    href: '#',
    color: '#1d9bf0',
    followers: '5.3K',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function SocialFollow() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="social" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute inset-0 bg-[#071224]/30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">

        {/* ── Header ── */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Stay Connected
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Follow Us on Social Media
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-xl mx-auto">
            Stay connected for the latest updates, tips, and community insights from the
            Habesha Crypto family.
          </p>
        </div>

        {/* ── Social Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {socials.map(({ name, handle, href, color, followers, icon }, i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`crypto-card p-6 flex flex-col items-center text-center group transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                '--hover-color': color,
              } as React.CSSProperties}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}35`,
                  color,
                  boxShadow: `0 0 0 transparent`,
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}40`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 transparent'
                }}
              >
                {icon}
              </div>
              <div className="font-heading font-bold text-sm text-white mb-1">{name}</div>
              <div className="font-mono text-xs text-slate-500 mb-3 truncate w-full">{handle}</div>
              <div
                className="font-heading font-black text-lg"
                style={{ color }}
              >
                {followers}
              </div>
              <div className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">
                Followers
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
