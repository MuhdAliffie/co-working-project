'use client'

import { Clock, MapPin, MessageCircle } from 'lucide-react'
import type { FC } from 'react'

const WHATSAPP_NUMBER = '60123456789'
const ADDRESS = '52, Jalan Puteri 1/2, Bandar Puteri Puchong, 47100 Puchong, Selangor, Malaysia'
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const ContactFooter: FC = () => (
  <footer id="contact" className="bg-cloud-forest text-white py-20">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
      {/* Info column */}
      <div>
        <h2 className="text-3xl font-[family-name:var(--font-family-display)] mb-8">Drop by for a tour.</h2>
        <div className="space-y-6">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 hover:text-cloud-sage transition-colors"
          >
            <MapPin className="text-cloud-sage shrink-0 mt-0.5" />
            <p>{ADDRESS}</p>
          </a>
          <div className="flex gap-4">
            <Clock className="text-cloud-sage shrink-0 mt-0.5" />
            <div>
              <p>Mon – Sat: 08:30 am – 08:00 pm</p>
              <p>Sun: 09:30 am – 04:00 pm</p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            <MessageCircle size={20} />
            Message on WhatsApp
          </a>
        </div>
      </div>

      {/* Contact form column */}
      <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
        <h3 className="text-xl font-bold mb-6">Drop us a line</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-cloud-sage placeholder:text-white/40 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-cloud-sage placeholder:text-white/40 text-white"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-cloud-sage placeholder:text-white/40 text-white resize-none"
          />
          <button
            type="submit"
            className="w-full bg-cloud-sage text-cloud-forest py-3 rounded-lg font-bold hover:bg-white transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
      © {new Date().getFullYear()} Cloudsy. All rights reserved.
    </div>
  </footer>
)

export default ContactFooter
