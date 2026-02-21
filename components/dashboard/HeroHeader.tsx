'use client'

import type { FC } from 'react'

type HeroHeaderProps = {
  title: string
  description: string
  ctaLabel: string
  ctaIcon?: string
  onCtaClick?: () => void
}

const HeroHeader: FC<HeroHeaderProps> = ({
  title,
  description,
  ctaLabel,
  ctaIcon = 'add_circle',
  onCtaClick,
}) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div>
      <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
        {title}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{description}</p>
    </div>
    <button
      type="button"
      onClick={onCtaClick}
      className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-300/40"
    >
      <span className="material-symbols-outlined">{ctaIcon}</span>
      {ctaLabel}
    </button>
  </div>
)

export default HeroHeader
