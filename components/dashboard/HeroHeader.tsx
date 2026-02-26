'use client'

import type { FC } from 'react'

type HeroHeaderProps = {
  title: string
  description: string
  ctaLabel: string
  ctaIcon?: string
  onCtaClick?: () => void
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

const HeroHeader: FC<HeroHeaderProps> = ({
  title,
  description,
  ctaLabel,
  ctaIcon = 'add_circle',
  onCtaClick,
}) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
    <div>
      <h2 className="text-4xl md:text-5xl font-handwritten font-bold text-cloud-dark-green">
        {title}
      </h2>
      <p className="text-stone-500 mt-2 text-xl font-handwritten">{description}</p>
    </div>
    <button
      type="button"
      onClick={onCtaClick}
      className="sticker-btn gap-2 font-handwritten text-xl px-6 py-3"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: ICON_VAR }}
      >
        {ctaIcon}
      </span>
      {ctaLabel}
    </button>
  </div>
)

export default HeroHeader
