import BookingHistoryTable, {
  type BookingRow,
} from '../../components/dashboard/BookingHistoryTable'
import { CalloutCard } from '../../components/dashboard/CalloutCard'
import HeroHeader from '../../components/dashboard/HeroHeader'
import MapHighlight from '../../components/dashboard/MapHighlight'
import NextVisitCard from '../../components/dashboard/NextVisitCard'
import PlanCard from '../../components/dashboard/PlanCard'
import StatCard, { type StatCardProps } from '../../components/dashboard/StatCard'
import TopNavigation, { type NavItem } from '../../components/dashboard/TopNavigation'
import { planDisplayMap } from '../../lib/data/passInfo'
import { prisma } from '../../lib/prisma'
import { CURRENT_USER_EMAIL } from '../../lib/session'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', isActive: true },
  { label: 'My Passes', href: '/dashboard#my-passes' },
  { label: 'Bookings', href: '/dashboard/booking' },
  { label: 'Shop', href: '/shop' },
]
const TOKENS_AVAILABLE = 15 // TODO: add token field to User model

const dateFormatter = new Intl.DateTimeFormat('en-MY', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-MY', {
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('en-MY', {
  hour: 'numeric',
  minute: '2-digit',
})

const formatDateRange = (start: Date, end: Date) =>
  `${dateFormatter.format(start)} - ${dateFormatter.format(end)}`

const formatTimeRange = (start: Date, end: Date) =>
  `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`

const formatDurationLabel = (start: Date, end: Date) => {
  const diffMinutes = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000))
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60
  if (minutes === 0) return `${hours} hour${hours === 1 ? '' : 's'}`
  if (hours === 0) return `${minutes} minutes`
  return `${hours}h ${minutes}m`
}

export default async function DashboardPage() {
  const user = await prisma.user.findUnique({
    where: { email: CURRENT_USER_EMAIL },
    include: {
      subscriptions: { orderBy: { startDate: 'desc' } },
      bookings: {
        include: { space: true },
        orderBy: { startDateTime: 'desc' },
      },
    },
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        User not found.
      </div>
    )
  }

  const now = new Date()

  const upcomingBookings = user.bookings.filter((b) => b.status === 'Confirmed')

  // ─── Stat Cards ────────────────────────────────────────────────────────────
  const statCards: StatCardProps[] = [
    {
      icon: 'confirmation_number',
      label: 'Active Passes',
      value: user.subscriptions.filter((s) => s.status === 'Active').length,
      accentColorClass: 'text-yellow-600',
      accentBackgroundClass: 'bg-yellow-100 border-yellow-400',
    },
    {
      icon: 'token',
      label: 'Cloud Credits',
      value: TOKENS_AVAILABLE,
      accentColorClass: 'text-blue-600',
      accentBackgroundClass: 'bg-blue-100 border-blue-400',
    },
    {
      icon: 'event_available',
      label: 'Upcoming Bookings',
      value: upcomingBookings.length,
      accentColorClass: 'text-green-600',
      accentBackgroundClass: 'bg-green-100 border-green-400',
    },
  ]

  // ─── Plans ─────────────────────────────────────────────────────────────────
  const plans = user.subscriptions.map((sub) => {
    const display = planDisplayMap[sub.planId]
    const isActive = sub.status === 'Active' && sub.endDate.getTime() >= now.getTime()
    const daysTotal = sub.durationDays
    const daysElapsed = Math.max(
      0,
      Math.floor((now.getTime() - sub.startDate.getTime()) / (1000 * 60 * 60 * 24)),
    )
    const daysLeft = Math.max(0, daysTotal - daysElapsed)
    const progressValue = daysTotal > 0 ? Math.round((daysElapsed / daysTotal) * 100) : 0
    return {
      key: sub.id,
      title: display?.passType ?? sub.planId,
      description: `Valid ${formatDateRange(sub.startDate, sub.endDate)}`,
      imageUrl:
        display?.imageUrl ??
        'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
      badgeLabel: isActive ? (display?.badgeLabel ?? 'Active!') : 'Expired',
      statusTone: isActive ? (display?.statusTone ?? 'emerald' as const) : ('amber' as const),
      validityLabel: `${sub.durationDays} days • ${display?.validityPeriod ?? 'Custom duration'}`,
      price: display?.price,
      benefits: display?.benefits,
      ctaLabel: 'Manage Magic',
      progress: isActive
        ? {
            value: progressValue,
            leftLabel: `${daysLeft} days left`,
            rightLabel: `${progressValue}% elapsed`,
          }
        : undefined,
    }
  })

  // ─── Booking Rows ──────────────────────────────────────────────────────────
  const bookingRows: BookingRow[] = user.bookings.map((booking) => ({
    id: booking.id.toString(),
    room: booking.space.type,
    description: booking.space.location,
    date: dateFormatter.format(booking.startDateTime),
    timeRange: formatTimeRange(booking.startDateTime, booking.endDateTime),
    status:
      booking.status === 'Completed'
        ? 'completed'
        : booking.status === 'Confirmed'
          ? 'confirmed'
          : 'cancelled',
    actionLabel:
      booking.status === 'Confirmed' ? 'Manage' : booking.status === 'Completed' ? 'Rebook' : 'Details',
  }))

  // ─── Next Visit Card ───────────────────────────────────────────────────────
  const nextBooking = upcomingBookings[0] ?? user.bookings[0]
  const visit = nextBooking
    ? {
        title: nextBooking.space.type,
        statusLabel: nextBooking.status,
        date: monthFormatter.format(nextBooking.startDateTime),
        dayNumber: nextBooking.startDateTime.getDate().toString(),
        timeRange: formatTimeRange(nextBooking.startDateTime, nextBooking.endDateTime),
        durationLabel: formatDurationLabel(nextBooking.startDateTime, nextBooking.endDateTime),
        location: nextBooking.space.location,
      }
    : null

  return (
    <div className="min-h-screen">
      <TopNavigation navItems={navItems} />
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <HeroHeader
          title={`Welcome back, ${user.name.split(' ')[0]}!`}
          description="Here's what's floating in your world today."
          ctaLabel="New Booking"
          ctaIcon="add_circle"
        />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {statCards.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section id="my-passes" className="scroll-mt-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-handwritten font-bold flex items-center gap-2 text-cloud-dark-green">
                  <span className="material-symbols-outlined text-cloud-green" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>auto_awesome</span>
                  Your Magic Plans
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.key}
                    title={plan.title}
                    description={plan.description}
                    imageUrl={plan.imageUrl}
                    badgeLabel={plan.badgeLabel}
                    statusTone={plan.statusTone}
                    validityLabel={plan.validityLabel}
                    price={plan.price}
                    benefits={plan.benefits}
                    ctaLabel={plan.ctaLabel}
                  />
                ))}
              </div>
            </section>

            <section id="bookings" className="scroll-mt-20">
              <BookingHistoryTable rows={bookingRows} />
            </section>
          </div>

          <div className="space-y-6">
            {visit ? (
              <NextVisitCard visit={visit} />
            ) : (
              <section className="border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-6">
                <p className="text-sm font-semibold mb-1">No upcoming visits</p>
                <p className="text-sm text-slate-500">
                  You don&apos;t have any scheduled sessions right now. Book a space to see it here.
                </p>
              </section>
            )}
            <CalloutCard
              title="Need a group plan?"
              description="Corporate and family passes are available at a discounted rate."
              actionLabel="Inquire Now"
            />
          </div>
        </div>
      </main>
      <MapHighlight
        title="Facility Locations"
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAFaKtCzXmuRdJgKNtHVJ8hvLXwbmNO_q8k3mT-MLtoZ4om1jxxt1R37-mVwCyw-KozFv7qRojOSliIdq2s8u7UAjgXFjr2STlXL_ZK9TuMcYiNXjTT2J8YJeupvGzxmKaclpTC2MMebLUOtBxsioyl9Ec2iMDzljqdPVoxHGWNaaVe_88sv-4kBipriII7PUYWsyvuhrAfqnc_mIkD9_uxEfZ7WwduQUfN-iy7OHXQqaEemTNylV_cLGazcuGY-P-FuURvoAM76g1q"
        locationLabel="Cloudsy"
        address="52-2, Jalan Puteri 1/2, Bandar Puteri Puchong, Puchong, 47100, Selangor, Malaysia"
      />
    </div>
  )
}
