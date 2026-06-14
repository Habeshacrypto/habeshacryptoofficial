'use client'

// ============================================================
// COMPONENT: Pricing
// PURPOSE: Subscription plans section — Monthly ($99),
//          Yearly ($599), Quarterly ($249).
//          Each Subscribe button redirects to payment site.
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { Check, Zap, Star, Crown } from 'lucide-react'

const PAYMENT_URL = 'https://tally.so/r/2Eo1vA'

const SERVICES = [
  "Real-time Trading Signals",
  "Advanced Learning Resources",
  "VIP Expert Support",
  "Weekly Market Updates",
  "Interactive Group – Ask questions and engage in discussions"
]

const plans = [
  {
    id: 'monthly',
    icon: Zap,
    label: 'Monthly',
    price: '$99',
    per: '/ month',
    popular: false,
    color: '#00ff88',
    features: SERVICES,
    cta: 'Coming Soon',
  },
  {
    id: 'yearly',
    icon: Crown,
    label: 'Yearly',
    price: '$599',
    per: '/ year',
    popular: true,
    color: '#ffd700',
    badge: 'BEST VALUE',
    features: SERVICES,
    cta: 'Subscribe Now',
  },
  {
    id: 'quarterly',
    icon: Star,
    label: 'Quarterly',
    price: '$249',
    per: '/ quarter',
    popular: false,
    color: '#00aaff',
    features: SERVICES,
    cta: 'Coming Soon',
  },
]

export default function Pricing() {
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
    <section id="pricing" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#00ff88]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div
          className={`text-center mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            Membership Plans
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Subscribe to Our Prime Alert
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-2xl mx-auto">
            Get exclusive access to real-time trading signals, alerts and 24/7 support. Choose the
            plan that suits you best and take your crypto trading to the next level!
          </p>
        </div>

        {/* ── Plans Grid ── */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {plans.map(({ id, icon: Icon, label, price, per, popular, color, badge, features, cta }, i) => (
            <div
              key={id}
              className={`relative transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Popular glow ring */}
              {popular && (
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-yellow-400/40 via-yellow-500/20 to-transparent pointer-events-none" />
              )}

              <div
                className={`relative h-full rounded-xl p-7 flex flex-col ${
                  popular
                    ? 'bg-gradient-to-b from-[#0a1a35] to-[#071224] border-2 border-yellow-400/60'
                    : 'crypto-card'
                }`}
                style={popular ? { boxShadow: '0 0 30px rgba(255,215,0,0.15)' } : {}}
              >
                {/* Badge */}
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="popular-badge">{badge}</span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}18`, border: `1px solid ${color}40` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span
                    className="font-heading font-bold text-sm uppercase tracking-wider"
                    style={{ color }}
                  >
                    {label}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="font-heading font-black text-5xl text-white">{price}</span>
                    <span className="font-body text-slate-400 text-sm mb-2">{per}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${color}18` }}
                      >
                        <Check size={11} style={{ color }} />
                      </div>
                      <span className="font-body text-slate-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA — redirects to payment */}
                <a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                    popular
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#050d1a] hover:from-yellow-300 hover:to-yellow-400 hover:shadow-lg hover:shadow-yellow-400/30'
                      : 'btn-outline block'
                  }`}
                  style={!popular ? { borderColor: color, color, pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  {cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
