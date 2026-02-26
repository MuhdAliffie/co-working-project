'use client'

import Image from 'next/image'
import { useState, useTransition } from 'react'
import type { CreateBookingResult } from '../../lib/actions'
import { createBooking, getBookingsForDate } from '../../lib/actions'

// ── Types ─────────────────────────────────────────────────────────────────────

type SpaceData = {
  id: number
  name: string
  type: string
  capacity: number
  location: string
}

type BookedSlot = { spaceId: number; startHour: number; endHour: number }
type Selection = { spaceId: number; startHour: number; endHour: number }
type Notification = { type: 'success' | 'error' | 'taken'; message: string }

// ── Constants ─────────────────────────────────────────────────────────────────

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16]
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const SPACE_IMAGES: Record<string, string> = {
  'The Bamboo Suite':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAm5YOuJYhrBVl__SJ5Ucqzp9ZpWMhpa56RO1ksVtALWMaKnGG5HW_Ct4V6Kr6f8ekwU3zmHg4lfelQNlLQpvURQMDsfzhWCUI9j9HmsAHYQutDtKsqX03RMLuwGg8fkFHWF1MeUgXsYbk9yJW-bIftJ98QKFKbKmIfzqgV4iNRypC3xIrpJsyZ5N65oIgmTZCcLXaTgekZumnVRRyG1LcX2u98-Dx545Qbb9Y-QzSqySzlximzwRNJwquSpSiB_rhmYBpXE9-qrp7x',
  'Leaf Studio':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD-9LPL8y4_oPpAC3H_lWov3Uk6rap9XInoQdHpmHlPwZh0HYpYp6ZnFfBwLPO2YVXXRUtZ5zMrMaUDJcgdvjufOsEgajvmjDMY1DaIodq_knBFuFVSulYuIPXvlXaSEZLVeffLj7Ebk39Lr5JK1q1y49E1ojuT9nhgPA_naTU7OAILfWbdUpAwm_qcc8sjCry30kQ-TfS-yczd6rJsGO6OxPUpsqQ9OW8qM3jy94dlVAZqD48oLmL7Q9-vCiCOYpgaEQ7eR6N-OyL1',
  'Oxygen Pod':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJX1wWTQwRk1kYsrKfxJBGoJ8BckJnCXb_H3TjaUxix3ZcY8mZmXqNDf-dmcbuFWU0M0t890PJzodmraUcPAVokZkiXhN2EZvnptzDCgHQopjdGPLhERmNOFYCMcA-tGvHRLQFAIC-OrZ_RI1XP_n-oVgVjQWpfCxrWmzKXsFI5hOdvdGkxABAUVbagskfeNBNOua7NSO4rQ9bZd4af4we33Oo-mvUTBEjb_qvFDIuov9s2yHbvxoD2N7jwaT_52uAjcT4q1jSqx0U',
}

const ICON_VAR = "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns 0=Mon … 6=Sun (JS Date gives 0=Sun) */
const dayOfWeekMon = (d: Date) => (d.getDay() + 6) % 7
const formatHour = (h: number) => `${String(h).padStart(2, '0')}:00`
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// ── Component ──────────────────────────────────────────────────────────────────

export default function BookingClient({
  spaces,
  initialSlots,
  userId,
  userName,
}: {
  spaces: SpaceData[]
  initialSlots: BookedSlot[]
  userId: string
  userName: string
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>(initialSlots)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [arrivingFromFar, setArrivingFromFar] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [isPending, startTransition] = useTransition()

  // ── Calendar ────────────────────────────────────────────────────────────────

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const startOffset = dayOfWeekMon(monthStart)
  const calendarCells: (Date | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: monthEnd.getDate() }, (_, i) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1),
    ),
  ]
  while (calendarCells.length % 7 !== 0) calendarCells.push(null)

  const handleDateSelect = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    if (d < today) return
    setSelectedDate(d)
    setSelection(null)
    startTransition(async () => {
      const slots = await getBookingsForDate(d.toISOString())
      setBookedSlots(slots)
    })
  }

  const isPastDate = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d < today
  }

  // ── Timeline helpers ────────────────────────────────────────────────────────

  const isBooked = (spaceId: number, hour: number) =>
    bookedSlots.some((s) => s.spaceId === spaceId && hour >= s.startHour && hour < s.endHour)

  const isSelected = (spaceId: number, hour: number) =>
    selection !== null &&
    selection.spaceId === spaceId &&
    hour >= selection.startHour &&
    hour < selection.endHour

  const handleCellClick = (spaceId: number, hour: number) => {
    if (isBooked(spaceId, hour)) return
    if (selection?.spaceId === spaceId) {
      if (hour >= selection.endHour) {
        setSelection({ ...selection, endHour: hour + 1 })
      } else if (hour < selection.startHour) {
        setSelection({ ...selection, startHour: hour })
      } else {
        setSelection({ spaceId, startHour: hour, endHour: hour + 1 })
      }
    } else {
      setSelection({ spaceId, startHour: hour, endHour: hour + 1 })
    }
    setNotification(null)
  }

  // ── Booking submission ──────────────────────────────────────────────────────

  const handleConfirm = async () => {
    if (!selection || !userId) return
    setIsBooking(true)
    setNotification(null)
    const start = new Date(selectedDate)
    start.setHours(selection.startHour, 0, 0, 0)
    const end = new Date(selectedDate)
    end.setHours(selection.endHour, 0, 0, 0)

    const result: CreateBookingResult = await createBooking({
      userId,
      spaceId: selection.spaceId,
      startDateTime: start,
      endDateTime: end,
    })

    if (result.success) {
      setNotification({ type: 'success', message: '✓ Booking confirmed! See you there ☁️' })
      setSelection(null)
      const updated = await getBookingsForDate(selectedDate.toISOString())
      setBookedSlots(updated)
    } else if (result.error === 'SLOT_TAKEN') {
      setNotification({
        type: 'taken',
        message: result.message ?? 'This slot was just taken by someone else!',
      })
      const updated = await getBookingsForDate(selectedDate.toISOString())
      setBookedSlots(updated)
      setSelection(null)
    } else {
      setNotification({ type: 'error', message: result.message ?? 'Something went wrong.' })
    }
    setIsBooking(false)
  }

  const selectedSpace = selection ? spaces.find((s) => s.id === selection.spaceId) : null
  const bookingDuration = selection ? selection.endHour - selection.startHour : 0
  const bookingCost = bookingDuration * 2 // 2 passes per hour

  const dateLabel = new Intl.DateTimeFormat('en-MY', { weekday: 'long', month: 'short', day: 'numeric' }).format(selectedDate)

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      {/* ── Notification toast ──────────────────────────────────────────── */}
      {notification && (
        <div
          className={`fixed top-24 right-6 z-50 px-6 py-4 hand-drawn-card font-handwritten text-lg max-w-sm flex items-start gap-3 ${
            notification.type === 'success'
              ? 'bg-green-100 border-green-600'
              : notification.type === 'taken'
                ? 'bg-yellow-100 border-yellow-600'
                : 'bg-red-100 border-red-600'
          }`}
        >
          <span
            className="material-symbols-outlined mt-0.5"
            style={{ fontVariationSettings: ICON_VAR }}
          >
            {notification.type === 'success' ? 'check_circle' : notification.type === 'taken' ? 'warning' : 'error'}
          </span>
          <div>
            <p className="font-bold">
              {notification.type === 'success' ? 'Booked!' : notification.type === 'taken' ? 'Slot Taken!' : 'Error'}
            </p>
            <p className="text-sm">{notification.message}</p>
          </div>
          <button onClick={() => setNotification(null)} className="ml-auto text-stone-400 hover:text-stone-700">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto p-8 grid grid-cols-12 gap-8">

        {/* ── Left sidebar ─────────────────────────────────────────────── */}
        <aside className="col-span-12 lg:col-span-3 space-y-8">
          <div className="bg-white p-6 hand-drawn-card -rotate-1">
            <h1 className="text-3xl font-handwritten font-bold mb-1 text-cloud-dark-green">Book a Room</h1>
            <p className="text-stone-500 text-sm mb-6 italic font-handwritten">
              Where thoughts become clouds...
            </p>

            {/* Calendar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 font-handwritten">
                <span className="font-bold text-cloud-dark-green">
                  {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="size-6 bg-white hand-drawn-card flex items-center justify-center hover:bg-green-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: ICON_VAR }}>chevron_left</span>
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="size-6 bg-white hand-drawn-card flex items-center justify-center hover:bg-green-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: ICON_VAR }}>chevron_right</span>
                  </button>
                </div>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-stone-400 mb-2 font-handwritten">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((date, i) => {
                  if (!date) return <div key={i} />
                  const past = isPastDate(date)
                  const isToday = isSameDay(date, today)
                  const isSelected = isSameDay(date, selectedDate)
                  const weekend = date.getDay() === 0 || date.getDay() === 6
                  return (
                    <button
                      key={i}
                      onClick={() => !past && handleDateSelect(date)}
                      disabled={past}
                      className={`h-8 flex items-center justify-center text-xs rounded-full transition-all font-handwritten
                        ${isSelected ? 'bg-cloud-green font-bold hand-drawn-border rotate-3 text-cloud-dark-green' : ''}
                        ${isToday && !isSelected ? 'border-2 border-cloud-green font-bold' : ''}
                        ${past ? 'text-stone-300 cursor-not-allowed' : ''}
                        ${weekend && !past && !isSelected ? 'text-stone-400' : ''}
                        ${!past && !isSelected ? 'hover:bg-green-50 cursor-pointer' : ''}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            <hr className="sketch-line-h my-6" />

            {/* Preferences */}
            <div className="space-y-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={arrivingFromFar}
                  onChange={(e) => setArrivingFromFar(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-stone-400 accent-cloud-green cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-handwritten font-bold text-sm text-cloud-dark-green">Arriving from far</span>
                  <span className="text-xs text-stone-500 leading-tight">Pre-prepared tea &amp; snug temperature</span>
                </div>
              </label>

              <div className="p-4 bg-green-50 wavy-border border-dashed rotate-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-green-600 text-sm" style={{ fontVariationSettings: ICON_VAR }}>auto_awesome</span>
                  <span className="font-handwritten font-bold text-xs uppercase tracking-wider text-cloud-dark-green">Your Magic Balance</span>
                </div>
                <p className="text-2xl font-handwritten font-bold text-cloud-dark-green">12 Passes Left</p>
                <button className="text-xs font-bold text-green-700 mt-2 flex items-center gap-1 hover:underline font-handwritten">
                  Refill your clouds
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: ICON_VAR }}>east</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <section className="col-span-12 lg:col-span-9 space-y-6">

          {/* Legend bar */}
          <div className="flex items-center justify-between bg-white px-6 py-4 hand-drawn-card">
            <div className="flex gap-8 font-handwritten text-sm">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-white border-2 border-stone-400"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-stone-200 border-2 border-stone-400"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-cloud-green border-2 border-cloud-dark-green"></div>
                <span>Your Selection</span>
              </div>
            </div>
            <div className="font-handwritten text-sm text-stone-500">
              {isSameDay(selectedDate, today) ? 'Today' : dateLabel}
              {isPending && (
                <span className="ml-2 text-cloud-green animate-pulse">Loading...</span>
              )}
            </div>
          </div>

          {/* Timeline grid */}
          <div className="bg-white hand-drawn-card overflow-hidden">
            <div className="flex">
              {/* Space labels column */}
              <div className="w-56 flex-shrink-0 border-r-2 border-dashed border-stone-200">
                <div className="h-16 flex items-center px-6 font-handwritten font-bold text-lg bg-stone-50 border-b-2 border-dashed border-stone-200 text-cloud-dark-green">
                  The Spaces
                </div>
                {spaces.map((space) => (
                  <div
                    key={space.id}
                    className="p-4 border-b-2 border-dashed border-stone-100 h-44 flex flex-col justify-between"
                  >
                    <div className="hand-drawn-card overflow-hidden h-24 bg-stone-100 even:-rotate-1 odd:rotate-1">
                      <Image
                        src={SPACE_IMAGES[space.name] ?? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=60'}
                        alt={space.name}
                        width={200}
                        height={96}
                        className="w-full h-full object-cover grayscale-[20%]"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-handwritten font-bold text-base leading-none text-cloud-dark-green">{space.name}</h3>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                        {space.type} · {space.capacity === 1 ? 'Solo Retreat' : `Up to ${space.capacity}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline columns */}
              <div className="flex-1 overflow-x-auto shop-scroll">
                <div style={{ minWidth: `${HOURS.length * 96}px` }}>
                  {/* Hour header row */}
                  <div className="h-16 flex bg-stone-50 border-b-2 border-dashed border-stone-200">
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="w-24 border-r border-stone-200 flex items-center justify-center font-handwritten font-bold text-xs text-stone-500"
                      >
                        {formatHour(h)}
                      </div>
                    ))}
                  </div>

                  {/* Space rows */}
                  {spaces.map((space) => (
                    <div key={space.id} className="h-44 border-b-2 border-dashed border-stone-100 flex relative">
                      {HOURS.map((hour) => {
                        const booked = isBooked(space.id, hour)
                        const selected = isSelected(space.id, hour)
                        // Find if this is the start of a booked range (for label)
                        const isBookedStart =
                          booked &&
                          !isBooked(space.id, hour - 1)
                        const slot = booked
                          ? bookedSlots.find((s) => s.spaceId === space.id && hour >= s.startHour && hour < s.endHour)
                          : null
                        const isSelStart = selected && !isSelected(space.id, hour - 1)

                        if (booked) {
                          return (
                            <div
                              key={hour}
                              className="w-24 flex items-center justify-center border-r border-stone-200 bg-stone-50"
                            >
                              {isBookedStart && slot && (
                                <div className="w-4/5 h-14 bg-stone-200 hand-drawn-card opacity-70 flex items-center justify-center"
                                  style={{ width: `${(slot.endHour - slot.startHour) * 96 - 8}px`, position: 'absolute' }}>
                                  <span className="font-handwritten text-[10px] text-stone-500 font-bold uppercase">Reserved</span>
                                </div>
                              )}
                            </div>
                          )
                        }

                        return (
                          <div
                            key={hour}
                            className={`w-24 border-r border-dashed border-stone-200 flex items-center justify-center relative cursor-pointer transition-colors
                              ${selected ? 'bg-cloud-green/30' : 'hover:bg-green-50/60'}
                            `}
                            onClick={() => handleCellClick(space.id, hour)}
                          >
                            {isSelStart && selection && (
                              <div
                                className="h-14 sticker-btn-primary hand-drawn-card flex items-center px-3 gap-2 z-10 pointer-events-none"
                                style={{ width: `${(selection.endHour - selection.startHour) * 96 - 8}px`, position: 'absolute', left: '4px' }}
                              >
                                <span className="material-symbols-outlined text-green-800 text-sm" style={{ fontVariationSettings: ICON_VAR }}>check_circle</span>
                                <span className="font-handwritten font-bold text-sm">
                                  {formatHour(selection.startHour)} – {formatHour(selection.endHour)}
                                </span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking confirmation footer */}
          {selection && selectedSpace ? (
            <div className="bg-white p-6 hand-drawn-card flex items-center justify-between rotate-[0.3deg]">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="font-handwritten text-xs text-stone-400 uppercase tracking-widest font-bold">Your Sketch</span>
                  <span className="font-handwritten text-xl font-bold text-cloud-dark-green">
                    {selectedSpace.name} · {isSameDay(selectedDate, today) ? 'Today' : dateLabel}, {formatHour(selection.startHour)} – {formatHour(selection.endHour)}
                  </span>
                </div>
                <div className="sketch-line-v h-10 mx-2 hidden md:block" />
                {arrivingFromFar && (
                  <div className="hidden md:flex items-center gap-2 text-green-700">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: ICON_VAR }}>coffee</span>
                    <span className="font-handwritten font-bold">Tea &amp; Biscuits waiting for you!</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <span className="font-handwritten text-xs text-stone-400 font-bold block">Magic Cost</span>
                  <span className="font-handwritten text-2xl font-black text-cloud-dark-green">
                    {bookingCost} {bookingCost === 1 ? 'Pass' : 'Passes'}
                  </span>
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={isBooking}
                  className="sticker-btn font-handwritten text-xl px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBooking ? (
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: ICON_VAR }}>progress_activity</span>
                      Confirming...
                    </span>
                  ) : (
                    'Confirm My Booking!'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/60 px-6 py-4 hand-drawn-card border-dashed text-center font-handwritten text-stone-400 italic">
              Click any available slot above to start your booking ☁️
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
