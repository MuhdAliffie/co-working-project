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
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <div className="w-full h-64 bg-slate-200 dark:bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-70"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-950/60 px-6 py-4 rounded-xl shadow-xl flex flex-col gap-3 border border-emerald-200/60 relative">
            <div className="bg-emerald-400 h-4 w-4 rounded-full animate-ping absolute -top-1 -right-1" />
            <div className="bg-emerald-400 h-4 w-4 rounded-full absolute -top-1 -right-1" />
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-emerald-400 text-3xl">location_on</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{locationLabel}</p>
                <p className="text-xs text-slate-500">{address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 flex-1 justify-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">map</span>
                Google Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 flex-1 justify-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-500 text-white transition-colors"
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
