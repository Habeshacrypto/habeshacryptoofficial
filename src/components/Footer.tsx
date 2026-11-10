'use client'

// ============================================================
// COMPONENT: Footer
// PURPOSE: Site footer with logo, quick links, legal, and
//          copyright notice
// ============================================================

const year = new Date().getFullYear()

const links = [
  { label: 'About Us',     href: '#about' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Why Us',       href: '#why-us' },
  { label: 'Case Studies', href: '#calls' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  const scroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[#00ff88]/10 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center font-heading font-black text-[#050d1a] text-xs">
                HC
              </div>
              <span className="font-heading font-bold text-sm text-white tracking-wider">
                Habesha <span className="text-[#00ff88]">Crypto</span>
              </span>
            </div>
            <p className="font-body text-slate-600 text-xs max-w-xs">
              Cryptocurrency education, knowledge, and community for learners of every level.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="font-body text-sm text-slate-500 hover:text-[#00ff88] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-3 border-t border-slate-900 flex flex-col items-center justify-center gap-1 text-center">
          <p className="font-mono text-[10px] sm:text-xs text-slate-600 max-w-3xl leading-relaxed">
            Educational content only. Not financial advice. Independent research is recommended before making any decisions.
          </p>
          <p className="font-mono text-xs text-slate-700">
            © {year} Habesha Crypto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
