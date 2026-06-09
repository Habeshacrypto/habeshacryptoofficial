"use client";

// ============================================================
// COMPONENT: Hero
// PURPOSE: Landing hero section with headline, CTA buttons,
//          social icons, and the Habesha Crypto logo badge
// ============================================================

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from '../../assets/logo/cryptoh.png';
import { YOUTUBE_LINK, TIKTOK_LINK, TELEGRAM_LINK } from '../helper/constant';

const socialLinks = [
  {
    name: "TikTok",
    href: TIKTOK_LINK,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: YOUTUBE_LINK,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.64 31.64 0 000 12a31.64 31.64 0 00.5 5.81 3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.64 31.64 0 0024 12a31.64 31.64 0 00-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: TELEGRAM_LINK,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.018 9.505c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.881.716z" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden hero-gradient"
    >
      {/* Decorative circuit lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-px h-48 bg-gradient-to-b from-transparent via-[#00ff88]/30 to-transparent" />
        <div className="absolute top-1/3 right-8 w-px h-32 bg-gradient-to-b from-transparent via-[#00ff88]/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          {/* ── Left Content ── */}
          <div
            className={`flex-1 transition-all duration-1000 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Tag line */}
            {/* <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
                Live Signals Active
              </span>
            </div> */}

            {/* Headline */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-white">Making The</span>
              <br />
              <span className="text-white">Difference from</span>
              <br />
              <span className="text-white">Zero to</span>
              <br />
              <span
                className="text-[#00ff88] glow-green-text"
                style={{ animation: "glow 2s ease-in-out infinite alternate" }}
              >
                Crypto Hero!
              </span>
            </h1>

            {/* Sub text */}
            <p className="font-body text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              Join the Habesha Crypto community — your gateway to real-time
              trading signals, expert mentorship, and a thriving community of
              crypto traders growing together from zero to hero.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://tally.so/r/2Eo1vA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Subscribe Now
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline"
              >
                Learn More
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="font-body text-xs text-slate-500 uppercase tracking-widest">
                Follow us
              </span>
              <div className="w-8 h-px bg-slate-700" />
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="social-icon"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Logo Badge ── */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <Image src={logo} alt="logo"></Image>
            {/* Outer rotating ring */}
            {/* <div className="relative w-64 h-64 sm:w-80 sm:h-80">
             
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#00ff88]/30"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              Middle ring 
              <div
                className="absolute inset-4 rounded-full border border-[#00ff88]/20"
                style={{ animation: 'spin 15s linear infinite reverse' }}
              />
              Glow ring
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#00ff88]/10 to-[#0066ff]/5 border border-[#00ff88]/30 glow-green" />

              Center logo placeholder
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#0a1a35] to-[#071224] border-2 border-[#00ff88]/50 flex flex-col items-center justify-center mx-auto glow-green"
                    style={{ animation: 'float 6s ease-in-out infinite' }}
                  >
                    <span className="font-heading font-black text-4xl sm:text-5xl text-[#00ff88] glow-green-text">
                      HC
                    </span>
                    <span className="font-mono text-xs text-slate-400 tracking-widest mt-1">
                      CRYPTO
                    </span>
                  </div>
                </div>
              </div>

              Orbiting dots
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#00ff88]"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateX(120px) translateY(-50%)`,
                    opacity: i % 2 === 0 ? 0.8 : 0.3,
                    boxShadow: '0 0 6px #00ff88',
                  }}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#00ff88]/40 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes glow {
          from {
            text-shadow:
              0 0 10px #00ff88,
              0 0 20px #00ff88;
          }
          to {
            text-shadow:
              0 0 20px #00ff88,
              0 0 40px #00ff88,
              0 0 60px #00ff88;
          }
        }
      `}</style>
    </section>
  );
}
