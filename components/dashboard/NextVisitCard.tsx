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

const NextVisitCard = ({ visit }: NextVisitCardProps) => {
  return (
    <section>
      <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-emerald-400">calendar_today</span>
        Next Visit
      </h3>
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-200 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">{visit.title}</h4>
            <p className="text-emerald-500 font-bold uppercase text-xs tracking-[0.3em] mt-1">
              {visit.statusLabel}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950/40 h-16 w-16 rounded-xl flex flex-col items-center justify-center border border-emerald-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{visit.date}</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              {visit.dayNumber}
            </span>
          </div>
        </div>
        <div className="space-y-3 mb-6 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">schedule</span>
            <span className="text-sm font-medium">
              {visit.timeRange} ({visit.durationLabel})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">location_on</span>
            <span className="text-sm font-medium">{visit.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export type { NextVisitCardProps, VisitDetails }
export default NextVisitCard
