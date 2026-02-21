import { Wifi, Coffee, Users } from 'lucide-react'
import type { FC } from 'react'

const HeroSection: FC = () => (
  <section className="pt-32 pb-20 px-6 bg-cloud-surface">
    <div className="max-w-6xl mx-auto text-center">
      <span className="inline-block bg-cloud-muted text-cloud-brand px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-wide">
        MALAYSIA'S FIRST PRODUCTIVITY STUDIO
      </span>
      <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-family-display)] text-cloud-forest mb-8">
        Feel better, <span className="italic">work better.</span>
      </h1>
      <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        Nestled in Bandar Puteri Puchong, we've designed a space where working smarter and focusing deeper is the new way to succeed.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 bg-white px-5 py-4 rounded-xl shadow-sm border border-stone-100">
          <Wifi className="text-cloud-brand" size={20} />
          <span className="text-stone-700 font-medium">High-Speed WiFi</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-5 py-4 rounded-xl shadow-sm border border-stone-100">
          <Coffee className="text-cloud-brand" size={20} />
          <span className="text-stone-700 font-medium">Free Flow Snacks</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-5 py-4 rounded-xl shadow-sm border border-stone-100">
          <Users className="text-cloud-brand" size={20} />
          <span className="text-stone-700 font-medium">Community Events</span>
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection
