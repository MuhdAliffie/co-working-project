import type { FC, ReactNode } from 'react'

export type StatCardProps = {
  icon: string
  label: string
  value: ReactNode
  accentColorClass?: string
  accentBackgroundClass?: string
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

const StatCard: FC<StatCardProps> = ({
  icon,
  label,
  value,
  accentColorClass = 'text-green-600',
  accentBackgroundClass = 'bg-green-100 border-green-400',
}) => (
  <div className="paper-card flex items-center gap-6 hover:-rotate-1 transition-transform">
    <div className={`p-4 rounded-full border-2 ${accentBackgroundClass} ${accentColorClass} rotate-6`}>
      <span
        className="material-symbols-outlined text-4xl"
        style={{ fontVariationSettings: ICON_VAR }}
      >
        {icon}
      </span>
    </div>
    <div>
      <p className="text-sm font-bold text-stone-400 uppercase font-handwritten">{label}</p>
      <p className="text-4xl font-handwritten font-bold text-cloud-dark-green leading-none">
        {typeof value === 'number' ? String(value).padStart(2, '0') : value}
      </p>
    </div>
  </div>
)

export default StatCard
