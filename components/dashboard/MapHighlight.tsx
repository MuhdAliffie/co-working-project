import Image from 'next/image'
import type { FC } from 'react'

type MapHighlightProps = {
  title: string
  imageUrl: string
  locationLabel: string
  address: string
}

const MapHighlight: FC<MapHighlightProps> = ({ title, imageUrl, locationLabel, address }) => {
  const encodedAddress = encodeURIComponent(address)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}`

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
      <h3 className="text-2xl font-handwritten font-bold mb-6 text-cloud-dark-green">{title}</h3>
      <div className="w-full h-80 bg-white wavy-border overflow-hidden relative border-4 border-cloud-green">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-50"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="paper-card border-4 border-cloud-green rotate-1 w-full max-w-2xl flex flex-row items-center gap-6 px-8 py-5">
            {/* Pinging location dot */}
            <div className="relative flex-shrink-0">
              <div className="bg-cloud-green h-4 w-4 rounded-full animate-ping absolute inset-0" />
              <div className="bg-cloud-green h-4 w-4 rounded-full relative border-2 border-white" />
            </div>

            {/* Icon */}
            <span
              className="material-symbols-outlined text-cloud-green text-4xl flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
            >
              park
            </span>

            {/* Name + address */}
            <div className="flex-1 min-w-0">
              <p className="font-handwritten font-bold text-2xl text-cloud-dark-green leading-none truncate">
                {locationLabel}
              </p>
              <p className="font-handwritten text-stone-500 text-sm mt-1 leading-snug">
                {address}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">map</span>
                Google Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-sky-400 hover:bg-sky-500 text-white transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">navigation</span>
                Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapHighlight
