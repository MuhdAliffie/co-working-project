import Image from 'next/image'
import type { FC } from 'react'

interface Zone {
  title: string
  description: string
  image: string
}

const ZONES: Zone[] = [
  {
    title: 'Focus Pods',
    description:
      'Designed for deep focus, our pods provide a distraction-free environment to achieve your goals without interruptions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Flow Zone',
    description:
      'Get into the groove of focused work with an environment that supports concentration and natural flow.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Creative Zone',
    description:
      'An open space where ideas flow freely, group discussions thrive, and problem-solving happens organically.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
]

const ZonesSection: FC = () => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-16 text-center text-cloud-forest">Designed to Inspire</h2>
      <div className="grid gap-20">
        {ZONES.map((zone, idx) => (
          <div
            key={zone.title}
            className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 relative h-80 w-full rounded-3xl shadow-xl overflow-hidden">
              <Image
                src={zone.image}
                alt={zone.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl font-[family-name:var(--font-family-display)] text-cloud-brand">
                {zone.title}
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed">{zone.description}</p>
              <button
                type="button"
                className="text-cloud-brand font-bold border-b-2 border-cloud-brand pb-1 hover:text-cloud-forest hover:border-cloud-forest transition-colors"
              >
                Explore Zone
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ZonesSection
