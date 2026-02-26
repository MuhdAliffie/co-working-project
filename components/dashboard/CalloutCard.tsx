import type { FC, ReactNode } from 'react'

type CalloutCardProps = {
  title: string
  description: string
  actionLabel: string
  icon?: string
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

const CalloutCard: FC<CalloutCardProps> = ({ title, description, actionLabel }) => (
  <section
    className="text-white relative overflow-hidden -rotate-1 p-6"
    style={{
      backgroundColor: '#166534',
      border: '2px solid #86EFAC',
      borderRadius: '10px 40px 10px 30px/30px 10px 40px 10px',
      boxShadow: '2px 5px 15px rgba(0,0,0,0.05)',
    }}
  >
    <div className="relative z-10">
      <h4 className="text-2xl font-handwritten font-bold mb-2">{title}</h4>
      <p className="font-handwritten text-lg text-cloud-green mb-4">{description}</p>
      <button
        className="sticker-btn font-handwritten px-6 py-3"
        style={{ background: 'white', color: '#166534', borderColor: 'white', boxShadow: '4px 4px 0px rgba(255,255,255,0.3)' }}
      >
        {actionLabel}
      </button>
    </div>
    <div className="absolute -bottom-6 -right-6 text-white/10 rotate-12">
      <span
        className="material-symbols-outlined text-[100px]"
        style={{ fontVariationSettings: ICON_VAR }}
      >
        groups
      </span>
    </div>
  </section>
)

type InfoBannerProps = {
  icon?: ReactNode
  message: ReactNode
}

const InfoBanner: FC<InfoBannerProps> = ({ message }) => (
  <div className="p-6 wavy-border border-dashed border-stone-300 bg-white/50 text-center">
    <span
      className="material-symbols-outlined text-stone-400 mb-2 block text-3xl"
      style={{ fontVariationSettings: ICON_VAR }}
    >
      help_center
    </span>
    <p className="font-handwritten text-stone-500 text-lg">{message}</p>
  </div>
)

export { CalloutCard, InfoBanner }
