"use client";

// ============================================================
// COMPONENT: About
// PURPOSE: About Us section describing the Habesha Crypto
//          community, mission, and value proposition
// ============================================================

import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, Globe, Shield } from "lucide-react";
import about from "../../assets/images/about-us.png";
import Image from "next/image";

const stats = [
  { icon: Users, value: "100+", label: "Educational Videos" },
  { icon: TrendingUp, value: "1,200+", label: "Successful Calls" },
  { icon: Globe, value: "4+", label: "Continents" },
  { icon: Shield, value: "24/7", label: "Expert Support" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#00ff88]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Who We Are
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            About Us
          </h2>
        </div>

        {/* ── Main Content ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="crypto-card p-8">
              <div className="w-12 h-1 bg-[#00ff88] rounded mb-6" />
              <p className="font-body text-slate-300 text-base leading-relaxed mb-5">
                Habesha Crypto is a premier trading signals platform founded by
                members of the Habesha community with a mission to empower
                people with the knowledge and skills needed to thrive in the
                world of cryptocurrencies.
              </p>
              <p className="font-body text-slate-400 text-base leading-relaxed mb-5">
                While we excel in serving the Habesha community, our vision has
                expanded to include people who want to learn, grow, and succeed
                in the crypto space. At Habesha Crypto, we offer comprehensive
                learning resources and real-time trading signals that cater to
                all experience levels. Whether you are just starting out or
                looking to refine your trading strategy, our platform is
                designed to help you succeed.
              </p>
              <p className="font-body text-slate-400 text-base leading-relaxed">
                Our goal is to build a global community united by a shared
                passion for cryptocurrency trading, where learning and financial
                empowerment know no boundaries. Join us, and let's grow together
                in this exciting journey!
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="https://whop.com/habesha-crypto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Join Community
                </a>
              </div>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div
            className={`transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative mb-6 crypto-card overflow-hidden">
              
              <Image src={about} alt="trade"></Image>
            </div>

            {/* Visual panel / image placeholder */}
            {/* <div className="relative mb-6">
              <div className="crypto-card p-6 aspect-video flex items-center justify-center overflow-hidden">
                Trading chart decoration
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
                    <polyline
                      points="0,180 40,160 80,140 120,120 140,130 160,90 200,70 240,60 280,40 320,50 360,20 400,10"
                      fill="none"
                      stroke="#00ff88"
                      strokeWidth="2"
                    />
                    <polyline
                      points="0,180 40,160 80,140 120,120 140,130 160,90 200,70 240,60 280,40 320,50 360,20 400,10 400,200 0,200"
                      fill="url(#chartGrad)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="text-center z-10">
                  <div className="font-heading text-5xl font-black text-[#00ff88] mb-2">
                    HC
                  </div>
                  <div className="font-mono text-xs text-slate-500 tracking-widest">
                    HABESHA CRYPTO
                  </div>
                  <div className="mt-4 flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                    <span className="font-mono text-xs text-[#00ff88]">Community Active</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className="crypto-card p-5 flex items-center gap-4"
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xl text-[#00ff88]">
                      {value}
                    </div>
                    <div className="font-body text-xs text-slate-500">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
