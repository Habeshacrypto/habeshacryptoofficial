'use client'

// ============================================================
// COMPONENT: Navbar
// PURPOSE: Top navigation bar with smooth scroll to sections
//          and sticky behavior on scroll
// ============================================================

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Why Us',   href: '#why-us' },
  { label: 'Our Calls',href: '#calls' },
  { label: 'Social Links', href: '#social' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050d1a]/95 backdrop-blur-md border-b border-[#00ff88]/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* ── Logo ── */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center font-heading font-black text-[#050d1a] text-xs">
            HC
          </div>
          <span
            className="font-heading font-bold text-sm text-white tracking-wider group-hover:text-[#00ff88] transition-colors"
          >
            Habesha <span className="text-[#00ff88]">Crypto</span>
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body font-semibold text-sm text-slate-300 hover:text-[#00ff88] transition-colors duration-200 tracking-wide uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00ff88] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <a
          href="https://t.me/+-rCTAwUtusgzMmUx"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block btn-primary text-xs"
        >
          Request to Join
        </a>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-[#00ff88] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#071224]/98 backdrop-blur-xl border-b border-[#00ff88]/20 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body font-semibold text-sm text-slate-300 hover:text-[#00ff88] transition-colors uppercase tracking-wide py-2 border-b border-slate-800"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://t.me/+-rCTAwUtusgzMmUx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center mt-2"
          >
            Request to Join
          </a>
        </div>
      )}
    </header>
  )
}
