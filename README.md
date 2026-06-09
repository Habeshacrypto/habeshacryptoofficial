# Habesha Crypto — Next.js Website

A production-ready Next.js 14 website for the Habesha Crypto community.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Google Fonts** — Orbitron + Rajdhani + Share Tech Mono

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   └── page.tsx            # Main page — assembles all sections
├── components/
│   ├── StarField.tsx       # Animated star background
│   ├── Navbar.tsx          # Sticky nav with smooth scroll
│   ├── Hero.tsx            # Landing hero with logo badge
│   ├── About.tsx           # About Us + stats
│   ├── Pricing.tsx         # Monthly / Quarterly / Yearly plans
│   ├── LearnCrypto.tsx     # YouTube video embed section
│   ├── WhyUs.tsx           # 4 feature highlights + phone mockup
│   ├── TradingAnalyzer.tsx # ⚡ Module 2 placeholder (API chart)
│   ├── SuccessfulCalls.tsx # Past winning trades grid
│   ├── SocialFollow.tsx    # Social media links
│   ├── ContactUs.tsx       # Contact form
│   └── Footer.tsx          # Footer with nav + copyright
└── styles/
    └── globals.css         # Global styles, CSS variables, utilities
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## Navbar Scroll Sections

| Nav Item      | Section ID   |
|---------------|-------------|
| About Us      | `#about`    |
| Pricing       | `#pricing`  |
| Why Us        | `#why-us`   |
| Our Calls     | `#calls`    |
| Social Links  | `#social`   |
| Contact       | `#contact`  |

---

## Payment Integration

All **Subscribe** / **Join Now** buttons link to:
```
https://whop.com/habesha-crypto/
```
Update `PAYMENT_URL` in `src/components/Pricing.tsx` to change.

---

## Module 2 — Trading Analyzer

The `TradingAnalyzer` component (`src/components/TradingAnalyzer.tsx`) is the
contract address + time-range section. It is scaffolded and ready for API
integration. Look for this comment block to hook up your endpoint:

```typescript
// TODO (Module 2): Replace with real API call
//   const res = await fetch(`/api/chart?address=${contractAddress}&hours=${hours}`)
//   const data = await res.json()
//   setChartData(data)
```

---

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Or deploy directly to **Vercel** — drag-and-drop this folder or connect your GitHub repo.
