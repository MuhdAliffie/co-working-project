import type { FC } from 'react'
import Link from 'next/link'

const LandingNav: FC = () => (
  <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-cloud-brand rounded-full flex items-center justify-center text-white text-xl">
          ☁️
        </div>
        <span className="text-2xl font-bold tracking-tight text-cloud-brand">cloudsy</span>
      </div>
      <div className="hidden md:flex gap-8 font-medium text-stone-600">
        <a href="#about" className="hover:text-cloud-brand transition-colors">Space</a>
        <a href="#cafe" className="hover:text-cloud-brand transition-colors">Cafe</a>
        <a href="#pricing" className="hover:text-cloud-brand transition-colors">Plans</a>
        <a href="#contact" className="hover:text-cloud-brand transition-colors">Contact</a>
      </div>
      <Link
        href="/dashboard"
        className="bg-cloud-brand text-white px-6 py-2 rounded-full font-semibold hover:bg-cloud-forest transition"
      >
        Book Now
      </Link>
    </div>
  </nav>
)

export default LandingNav
