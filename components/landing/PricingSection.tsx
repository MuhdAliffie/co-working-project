import { Check } from 'lucide-react'
import type { FC } from 'react'

interface Plan {
  name: string
  price: string
  period: string
  features: string[]
  highlight?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Hourly',
    price: 'RM6',
    period: '/ pax',
    features: ['Work by the hour', 'Free flow snacks & water', 'High-speed WiFi', 'Power outlets'],
  },
  {
    name: 'Daily Pass',
    price: 'RM21',
    period: '/ pax',
    features: [
      'Full-day unlimited entry',
      'Free flow snacks & water',
      'High-speed WiFi',
      '10% off all café items',
    ],
    highlight: true,
  },
  {
    name: 'Monthly',
    price: 'RM292',
    period: '/ pax',
    features: [
      'Unlimited monthly access',
      'Free flow snacks & water',
      '20% off all café items',
      'Priority booking',
    ],
  },
]

const PricingSection: FC = () => (
  <section id="pricing" className="py-20 bg-cloud-muted">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-cloud-forest mb-4">Simple, Flexible Passes</h2>
        <p className="text-stone-600">No long-term contracts. Just productivity on your terms.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-3xl bg-white border ${
              plan.highlight
                ? 'border-cloud-brand ring-4 ring-cloud-brand/10 shadow-xl'
                : 'border-stone-200 shadow-sm'
            }`}
          >
            {plan.highlight && (
              <span className="inline-block bg-cloud-muted text-cloud-brand text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold mb-2 text-cloud-forest">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-cloud-forest">{plan.price}</span>
              <span className="text-stone-500"> {plan.period}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-stone-600">
                  <Check size={18} className="text-cloud-brand shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`w-full py-3 rounded-xl font-bold transition ${
                plan.highlight
                  ? 'bg-cloud-brand text-white hover:bg-cloud-forest'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default PricingSection
