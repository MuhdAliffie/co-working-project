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
  completed: 'bg-green-100 border border-green-300 text-green-700',
  confirmed: 'bg-blue-100 border border-blue-300 text-blue-700',
  cancelled: 'bg-stone-100 border border-stone-300 text-stone-600',
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

const BookingHistoryTable: FC<{ rows: BookingRow[] }> = ({ rows }) => (
  <section>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-handwritten font-bold flex items-center gap-2 text-cloud-dark-green">
        <span
          className="material-symbols-outlined text-cloud-green"
          style={{ fontVariationSettings: ICON_VAR }}
        >
          history_edu
        </span>
        Cloud Memories
      </h3>
    </div>
    <div className="paper-card !p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-handwritten text-lg">
          <thead className="bg-cloud-green/20 border-b-2 border-cloud-green">
            <tr>
              <th className="px-6 py-4 font-bold text-cloud-dark-green uppercase text-sm tracking-wider">Activity</th>
              <th className="px-6 py-4 font-bold text-cloud-dark-green uppercase text-sm tracking-wider">When?</th>
              <th className="px-6 py-4 font-bold text-cloud-dark-green uppercase text-sm tracking-wider text-center">Cloud Status</th>
              <th className="px-6 py-4 font-bold text-cloud-dark-green uppercase text-sm tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cloud-green/10">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4">
                  <div className="font-bold text-cloud-dark-green text-xl">{row.room}</div>
                  <div className="text-sm text-stone-400">{row.description}</div>
                </td>
                <td className="px-6 py-4 text-stone-600">
                  <div>{row.date}</div>
                  <div className="text-sm">{row.timeRange}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[row.status]}`}>
                    {row.status === 'completed' ? 'Perfect' : row.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-cloud-green font-bold hover:underline">
                    {row.actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
)

export default BookingHistoryTable
