import type { FC } from 'react'

export type BookingStatus = 'completed' | 'cancelled' | 'confirmed'

export type BookingRow = {
  id: string
  room: string
  description: string
  date: string
  timeRange: string
  status: BookingStatus
  actionLabel: string
}

const statusStyles: Record<BookingStatus, string> = {
  completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  confirmed: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300',
  cancelled: 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300',
}

const BookingHistoryTable: FC<{ rows: BookingRow[] }> = ({ rows }) => (
  <section>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <span className="material-symbols-outlined text-emerald-400">history</span>
        Booking History
      </h3>
      <button className="p-2 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg">
        <span className="material-symbols-outlined text-slate-500">tune</span>
      </button>
    </div>
    <div className="bg-white dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase">
            <th className="px-6 py-4">Room / Activity</th>
            <th className="px-6 py-4">Date &amp; Time</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-900/50">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900 dark:text-white">{row.room}</div>
                <p className="text-xs text-slate-500">{row.description}</p>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium">{row.date}</div>
                <p className="text-xs text-slate-400">{row.timeRange}</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                >
                  {row.status === 'completed'
                    ? 'Completed'
                    : row.status === 'confirmed'
                      ? 'Confirmed'
                      : 'Cancelled'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-emerald-500 font-bold text-sm hover:text-emerald-400">
                  {row.actionLabel}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-900/50 flex justify-center">
        <button className="text-sm font-semibold text-slate-500 hover:text-emerald-400">
          Load more history
        </button>
      </div>
    </div>
  </section>
)

export default BookingHistoryTable
