"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpenText } from "lucide-react";
import Image from "next/image";
import trump from "../../assets/images/trump.jpeg";
import one from "../../assets/images/one.jpeg";
import goku from "../../assets/images/goku.jpeg";
import useless from "../../assets/images/useless-gains.jpeg";
import fred from "../../assets/images/fred.jpeg";
import spunt from "../../assets/images/spnut.jpeg";
import close from "../../assets/images/close.jpeg";
import troll from "../../assets/images/troll.jpeg";
import maxxing from "../../assets/images/maxing.jpeg";

const PAYMENT_URL = 'https://tally.so/r/2Eo1vA'

const calls = [
  { coin: "Trump", subtitle: "Historical meme-coin example", badge: "Case Study", color: "#00ff88", image: trump },
  { coin: "1", subtitle: "Market cycle example", badge: "Case Study", color: "#00ccff", image: one },
  { coin: "Goku", subtitle: "Volatility case study", badge: "Case Study", color: "#ffd700", image: goku },
  { coin: "Useless", subtitle: "Community learning example", badge: "Case Study", color: "#ff44aa", image: useless },
  { coin: "Fred", subtitle: "Historical market snapshot", badge: "Case Study", color: "#aa44ff", image: fred },
  { coin: "PNUT", subtitle: "Educational example only", badge: "Case Study", color: "#ff8800", image: spunt },
  { coin: "Solana", subtitle: "Market behavior example", badge: "Case Study", color: "#00ff88", image: close },
  { coin: "Troll", subtitle: "Growth pattern analysis", badge: "Case Study", color: "#00ff88", image: troll },
  { coin: "Maxxing", subtitle: "Cycle and sentiment study", badge: "Case Study", color: "#ff8800", image: maxxing },
];

export default function SuccessfulCalls() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="calls" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute -top-40 left-0 w-72 h-72 rounded-full bg-[#ffd700]/3 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-72 h-72 rounded-full bg-[#00ff88]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Market Learning
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Cryptocurrency Market Case Studies
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-2xl mx-auto">
            Explore historical market events and educational case studies designed
            to improve understanding of volatility, market cycles, and digital asset behavior.
          </p>
        </div>

        <div className={`flex items-center justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-[#ffd700]/40" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30">
            <BookOpenText size={14} className="text-[#ffd700]" />
            <span className="font-mono text-xs text-[#ffd700] uppercase tracking-widest">Educational Examples</span>
          </div>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-[#ffd700]/40" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {calls.map(({ coin, subtitle, badge, color, image }, i) => (
            <div
              key={coin}
              className={`group rounded-xl overflow-hidden border border-white/5 bg-[#0a1a35] hover:border-[#00ff88]/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-700 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={image}
                  alt={coin}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-sm text-white truncate">{coin}</h3>
                  <p className="font-mono text-[11px] text-slate-400 mt-1 leading-relaxed">{subtitle}</p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <div
                    className="font-heading font-black text-xs uppercase tracking-[0.12em] leading-tight"
                    style={{ color, textShadow: `0 0 12px ${color}55` }}
                  >
                    {badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-slate-500 text-sm mb-5">
            These examples are for educational purposes only and do not represent future outcomes or investment advice.
          </p>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <BookOpenText size={15} />
            Access Learning Resources
          </a>
        </div>
      </div>
    </section>
  );
}