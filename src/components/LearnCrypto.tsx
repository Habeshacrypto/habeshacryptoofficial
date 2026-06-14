"use client";

// ============================================================
// COMPONENT: LearnCrypto
// PURPOSE: "Learn About Crypto" section featuring a YouTube
//          video embed for beginners to get started
// ============================================================

import { useEffect, useRef, useState } from "react";
import { PlayCircle, BookOpen, ChevronRight } from "lucide-react";
import { YOUTUBE_LINK } from "@/helper/constant";

export default function LearnCrypto() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

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

  const topics = [
    "Crypto & Blockchain Fundamentals",
    "On-Chain Trading",
    "Technical Analysis Deep Dive",
    "Risk Management",
  ];

  return (
    <section id="learn" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-[#00aaff]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Education
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Learn About Crypto
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-xl mx-auto">
            Curious about the basics of crypto? Check out the video below to
            learn the foundation — the perfect starting point for any beginner.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          {/* ── Video Player ── */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden glow-border aspect-video bg-[#071224]">
              <iframe
                src="https://www.youtube.com/embed/v9HRB70pOe0"
                title="Crypto for Complete Beginners"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              
            </div>
          </div>

          {/* ── Topics sidebar ── */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="crypto-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                  <BookOpen size={16} className="text-[#00ff88]" />
                </div>
                <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wide">
                  What You'll Learn
                </h3>
              </div>
              <ul className="space-y-4">
                {topics.map((topic, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00ff88]/15 transition-colors">
                      <span className="font-mono text-xs text-[#00ff88]">
                        {i + 1}
                      </span>
                    </div>
                    <span className="font-body text-slate-300 text-sm group-hover:text-[#00ff88] transition-colors flex-1">
                      {topic}
                    </span>
                    <ChevronRight
                      size={14}
                      className="text-slate-600 group-hover:text-[#00ff88] group-hover:translate-x-1 transition-all"
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="font-body text-slate-500 text-xs mb-4">
                  More videos and learning resources available to members.
                </p>
                <a
                  href={YOUTUBE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Access Full Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
