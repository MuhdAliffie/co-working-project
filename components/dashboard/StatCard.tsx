import type { FC, ReactNode } from 'react'

export type StatCardProps = {
  icon: string
  label: string
  value: ReactNode
  accentColorClass?: string
  accentBackgroundClass?: string
}

const StatCard: FC<StatCardProps> = ({
  icon,
  label,
  value,
  accentColorClass = 'text-emerald-500',
  accentBackgroundClass = 'bg-emerald-50 dark:bg-emerald-900/30',
}) => (
  <div className="bg-white dark:bg-slate-950/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${accentBackgroundClass} ${accentColorClass}`}>
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  </div>
)

export default StatCard
