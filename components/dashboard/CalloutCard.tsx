import type { FC, ReactNode } from 'react'

type CalloutCardProps = {
  title: string
  description: string
  actionLabel: string
  icon?: string
}

const CalloutCard: FC<CalloutCardProps> = ({
  title,
  description,
  actionLabel,
  icon = 'arrow_forward',
}) => (
  <section className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 text-white overflow-hidden relative">
    <div className="relative z-10">
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-slate-300 text-sm mb-4">{description}</p>
      <button className="text-emerald-400 font-bold text-sm flex items-center gap-2 group">
        {actionLabel}
        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      </button>
    </div>
    <div className="absolute -bottom-6 -right-6 text-emerald-500/10 rotate-12">
      <span className="material-symbols-outlined text-[120px]">groups</span>
    </div>
  </section>
)

type InfoBannerProps = {
  icon?: ReactNode
  message: ReactNode
}

const InfoBanner: FC<InfoBannerProps> = ({ icon, message }) => (
  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
    <div className="flex items-center gap-3 text-xs text-slate-500">
      {icon ?? <span className="material-symbols-outlined text-slate-400">help_center</span>}
      <div>{message}</div>
    </div>
  </div>
)

export { CalloutCard, InfoBanner }
