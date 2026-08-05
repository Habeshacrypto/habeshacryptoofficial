import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import LearnCrypto from '@/components/LearnCrypto'
import WhyUs from '@/components/WhyUs'
import SuccessfulCalls from '@/components/SuccessfulCalls'
import SocialFollow from '@/components/SocialFollow'
import ContactUs from '@/components/ContactUs'
import Footer from '@/components/Footer'
import StarField from '@/components/StarField'

// TradingAnalyzer removed — now lives at /dashboard (protected)

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050d1a] grid-bg">
      <StarField />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Pricing />
        <LearnCrypto />
        <WhyUs />
        <SuccessfulCalls />
        <SocialFollow />
        <ContactUs />
        <Footer />
      </div>
    </main>
  )
}
