"use client";

// ============================================================
// COMPONENT: SuccessfulCalls
// PURPOSE: Showcases past winning trades made by the community.
//          Card layout: image top, title + subtitle bottom-left,
//          multiplier + stars bottom-right.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";
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
import { TELEGRAM_LINK } from "@/helper/constant";
// import close from "../../assets/images/close.jpeg";

const PAYMENT_URL = 'https://tally.so/r/2Eo1vA'


const calls = [
  { coin: "Trump",        subtitle: "Bought at $0.18",  multiplier: "24x",    stars: 5, color: "#00ff88", image: trump },
  { coin: "1",       subtitle: "Bought at $0.002", multiplier: "124x",     stars: 4, color: "#00ccff", image: one },
  { coin: "Goku",     subtitle: "Bought at $0.004", multiplier: "921x",   stars: 5, color: "#ffd700", image: goku },
  { coin: "Useless",         subtitle: "Bought at $0.001", multiplier: "30x",   stars: 5, color: "#ff44aa", image: useless },
  { coin: "Fred", subtitle: "Bought at $0.009", multiplier: "63x",    stars: 4, color: "#aa44ff", image: fred },
  { coin: "PNUT",   subtitle: "Bought at $0.021", multiplier: "50x",    stars: 4, color: "#ff8800", image: spunt },
  { coin: "Solana",subtitle: "Bought at $0.003", multiplier: "10x",    stars: 5, color: "#00ff88", image: close },
  { coin: "Troll",subtitle: "Bought at $0.003", multiplier: "31x",    stars: 4, color: "#00ff88", image: troll },
  { coin: "Maxxing",subtitle: "Bought at $0.003", multiplier: "35x",    stars: 5, color: "#ff8800", image: maxxing },
];

function StarRating({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="w-3 h-3"
          fill={i < count ? color : "none"} stroke={color} strokeWidth="1">
          <path d="M6 1l1.2 3.6H11L8.1 6.8l1.1 3.4L6 8.3l-3.2 1.9 1.1-3.4L1 4.6h3.8z" />
        </svg>
      ))}
    </div>
  );
}

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

        {/* ── Header ── */}
        <div className={`text-center mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Proven Track Record
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Successful Calls That Made Us Money
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-2xl mx-auto">
            Here are some of our best-performing calls that have brought significant returns
            for our community. Check out these successful trades!
          </p>
        </div>

        {/* ── Trophy banner ── */}
        <div className={`flex items-center justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-[#ffd700]/40" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30">
            <Trophy size={14} className="text-[#ffd700]" />
            <span className="font-mono text-xs text-[#ffd700] uppercase tracking-widest">Community Wins</span>
          </div>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-[#ffd700]/40" />
        </div>

        {/* ── Calls Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {calls.map(({ coin, subtitle, multiplier, stars, color, image }, i) => (
            <div
              key={coin}
              className={`group rounded-xl overflow-hidden border border-white/5 bg-[#0a1a35] hover:border-[#00ff88]/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-700 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* ── Image top ── */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={image}
                  alt={coin}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* ── Body bottom ── */}
              <div className="p-4 flex items-start justify-between gap-3">

                {/* Left: title + subtitle */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-sm text-white truncate">{coin}</h3>
                  {/* <p className="font-mono text-[11px] text-slate-500 mt-0.5 truncate">{subtitle}</p> */}
                </div>

                {/* Right: multiplier + stars */}
                <div className="flex-shrink-0 text-right">
                  <div
                    className="font-heading font-black text-lg leading-tight"
                    style={{ color, textShadow: `0 0 12px ${color}55` }}
                  >
                    {multiplier}
                  </div>
                  <div className="mt-1 flex justify-end">
                    <StarRating count={stars} color={color} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className={`mt-14 text-center transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-body text-slate-500 text-sm mb-5">
            These are just a few of our wins. Join to receive all future calls in real time.
          </p>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Trophy size={15} />
            Join & Get Next Call
          </a>
        </div>
      </div>
    </section>
  );
}