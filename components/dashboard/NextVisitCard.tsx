type VisitDetails = {
  title: string
  statusLabel: string
  date: string
  dayNumber: string
  timeRange: string
  durationLabel: string
  location: string
}

type NextVisitCardProps = {
  visit: VisitDetails
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

const NextVisitCard = ({ visit }: NextVisitCardProps) => (
  <section>
    <h3 className="text-2xl font-handwritten font-bold flex items-center gap-2 mb-6 text-cloud-dark-green">
      <span
        className="material-symbols-outlined text-cloud-green"
        style={{ fontVariationSettings: ICON_VAR }}
      >
        celebration
      </span>
      Next Adventure
    </h3>
    <div
      className="bg-white border-2 border-cloud-green p-8 shadow-xl rotate-1 relative overflow-hidden"
      style={{ borderRadius: '20px 60px 20px 50px/50px 20px 60px 20px' }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
      </div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="text-4xl font-handwritten font-bold text-cloud-dark-green">{visit.title}</h4>
          <p className="font-handwritten font-bold text-xl italic text-cloud-dark-green border-b-2 border-cloud-green inline-block">
            {visit.statusLabel}!
          </p>
        </div>
        <div className="bg-yellow-50 h-16 w-16 wavy-border flex flex-col items-center justify-center -rotate-6">
          <span className="text-xs font-bold text-stone-400 uppercase">{visit.date}</span>
          <span className="text-3xl font-handwritten font-bold text-cloud-dark-green leading-none">{visit.dayNumber}</span>
        </div>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 font-handwritten text-xl">
          <span className="material-symbols-outlined text-cloud-green" style={{ fontVariationSettings: ICON_VAR }}>schedule</span>
          <span>{visit.timeRange} ({visit.durationLabel})</span>
        </div>
        <div className="flex items-center gap-3 font-handwritten text-xl">
          <span className="material-symbols-outlined text-cloud-green" style={{ fontVariationSettings: ICON_VAR }}>location_on</span>
          <span>{visit.location}</span>
        </div>
      </div>
    </div>
  </section>
)

export type { NextVisitCardProps, VisitDetails }
export default NextVisitCard
