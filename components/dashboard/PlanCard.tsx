import Image from 'next/image'
import type { FC } from 'react'

type StatusTone = 'emerald' | 'amber'

type PlanCardProps = {
  title: string
  description: string
  imageUrl: string
  badgeLabel: string
  statusTone?: StatusTone
  progress?: {
    value: number
    leftLabel: string
    rightLabel: string
  }
  punchCard?: {
    segments: number
    used: number
  }
  ctaLabel?: string
  price?: number
  validityLabel?: string
  benefits?: string
}

const badgeClass: Record<StatusTone, string> = {
  emerald: 'bg-yellow-300 text-stone-800 rotate-3',
  amber: 'bg-blue-300 text-stone-800 -rotate-3',
}

const PlanCard: FC<PlanCardProps> = ({
  title,
  description,
  imageUrl,
  badgeLabel,
  statusTone = 'emerald',
  progress,
  punchCard,
  ctaLabel,
  validityLabel,
  benefits,
}) => (
  <article className="paper-card overflow-hidden group hover:scale-[1.02] transition-all !p-0">
    <div className="h-32 relative border-b-2 border-cloud-green overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
      />
      <span
        className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 wavy-border ${badgeClass[statusTone]}`}
      >
        {badgeLabel}
      </span>
    </div>
    <div className="p-5 space-y-4">
      <div>
        <h4 className="font-handwritten font-bold text-2xl text-cloud-dark-green">{title}</h4>
        <p className="font-handwritten text-stone-500">{description}</p>
        {validityLabel && <p className="text-xs text-stone-400 mt-1">{validityLabel}</p>}
        {benefits && <p className="text-xs text-stone-500 mt-1">{benefits}</p>}
      </div>
      {progress ? (
        <div>
          <div className="w-full bg-stone-100 h-4 border-2 border-stone-200 rounded-full overflow-hidden">
            <div
              className="bg-cloud-green h-full rounded-full border-r-2 border-cloud-dark-green"
              style={{ width: `${Math.min(progress.value, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 font-handwritten text-stone-500 text-sm">
            <span>{progress.leftLabel}</span>
            <span>{progress.rightLabel}</span>
          </div>
        </div>
      ) : null}
      {punchCard ? (
        <div className="flex gap-1.5 mb-4">
          {Array.from({ length: punchCard.segments }).map((_, index) => (
            <div
              key={`punch-${title}-${index}`}
              className={`h-4 flex-1 rounded-sm border ${
                index < punchCard.used
                  ? 'bg-cloud-green border-cloud-dark-green'
                  : 'bg-stone-100 border-stone-200'
              }`}
            />
          ))}
        </div>
      ) : null}
      {ctaLabel ? (
        <button
          type="button"
          className="w-full py-2 bg-stone-100 border-2 border-stone-300 rounded-xl font-handwritten font-bold text-stone-600 hover:bg-white transition-colors"
        >
          {ctaLabel}
        </button>
      ) : null}
    </div>
  </article>
)

export default PlanCard
