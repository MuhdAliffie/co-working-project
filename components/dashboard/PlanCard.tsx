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

const currencyFormatter = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
  minimumFractionDigits: 2,
})

const toneClasses: Record<StatusTone, string> = {
  emerald: 'bg-emerald-400 text-emerald-950',
  amber: 'bg-amber-400 text-amber-950',
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
  price,
  validityLabel,
  benefits,
}) => (
  <article className="bg-white dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:border-emerald-200 transition-all">
    <div className="h-32 bg-slate-200 dark:bg-slate-900 relative">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
      />
      <span
        className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded uppercase ${toneClasses[statusTone]}`}
      >
        {badgeLabel}
      </span>
    </div>
    <div className="p-5 space-y-4">
      <div>
        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-500">{description}</p>
        {validityLabel ? <p className="text-xs text-slate-400 mt-1">{validityLabel}</p> : null}
        {price ? (
          <p className="text-base font-semibold text-slate-900 dark:text-white mt-3">
            {currencyFormatter.format(price)}
          </p>
        ) : null}
        {benefits ? <p className="text-xs text-slate-500 mt-1">{benefits}</p> : null}
      </div>
      {progress ? (
        <div>
          <div className="w-full bg-slate-100 dark:bg-slate-900/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full"
              style={{ width: `${Math.min(progress.value, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[11px] font-medium text-slate-400">
            <span>{progress.leftLabel}</span>
            <span>{progress.rightLabel}</span>
          </div>
        </div>
      ) : null}
      {punchCard ? (
        <div className="flex gap-1.5">
          {Array.from({ length: punchCard.segments }).map((_, index) => (
            <div
              key={`segment-${title}-${index}`}
              className={`h-2 flex-1 rounded-full ${index < punchCard.used ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-900/70'}`}
            />
          ))}
        </div>
      ) : null}
      {ctaLabel ? (
        <button
          type="button"
          className="w-full py-2 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-900"
        >
          {ctaLabel}
        </button>
      ) : null}
    </div>
  </article>
)

export default PlanCard
