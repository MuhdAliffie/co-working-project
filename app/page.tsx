import ContactFooter from '../components/landing/ContactFooter'
import HeroSection from '../components/landing/HeroSection'
import LandingNav from '../components/landing/LandingNav'
import PricingSection from '../components/landing/PricingSection'
import ZonesSection from '../components/landing/ZonesSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-cloud-surface text-slate-800 font-sans">
      <LandingNav />
      <HeroSection />
      <ZonesSection />
      <PricingSection />
      <ContactFooter />
    </div>
  )
}
