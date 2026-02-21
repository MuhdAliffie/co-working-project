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
import { bookingData, type BookingRecord } from '../../lib/data/bookingInfo'
import { passCatalog } from '../../lib/data/passInfo'
import { spaceCatalog } from '../../lib/data/spaceInfo'
import { subscriptionData } from '../../lib/data/subscriptionInfo'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '#', isActive: true },
  { label: 'My Passes', href: '#my-passes' },
  { label: 'Bookings', href: '#bookings' },
  { label: 'Shop', href: '#shop' },
]

const CURRENT_USER = {
  id: '124124',
  name: 'Aliffie',
  tokensAvailable: 15,
}

const DATA_CONTEXT_DATE = new Date('2024-05-10T00:00:00Z')

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

const formatDateRange = (start: string, end: string) =>
  `${dateFormatter.format(new Date(start))} - ${dateFormatter.format(new Date(end))}`

const formatTimeRange = (start: string, end: string) =>
  `${timeFormatter.format(new Date(start))} - ${timeFormatter.format(new Date(end))}`

const formatDurationLabel = (start: string, end: string) => {
  const diffMinutes = Math.max(
    0,
    Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000),
  )
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60
  if (minutes === 0) return `${hours} hour${hours === 1 ? '' : 's'}`
  if (hours === 0) return `${minutes} minutes`
  return `${hours}h ${minutes}m`
}

const mapStatus = (statusId: BookingRecord['StatusID']): BookingRow['status'] => {
  if (statusId === 'Completed') return 'completed'
  if (statusId === 'Confirmed') return 'confirmed'
  return 'cancelled'
}

const findVisitDetails = (booking?: BookingRecord) => {
  if (!booking) return null
  const visitDate = new Date(booking.StartDateTime)
  const space = spaceCatalog[booking.SpaceID]
  return {
    title: space?.SpaceType ?? `Space ${booking.SpaceID}`,
    statusLabel: booking.StatusID,
    date: monthFormatter.format(visitDate),
    dayNumber: visitDate.getDate().toString(),
    timeRange: formatTimeRange(booking.StartDateTime, booking.EndDateTime),
    durationLabel: formatDurationLabel(booking.StartDateTime, booking.EndDateTime),
    location: space?.Location ?? 'See concierge for details',
  }
}

export default function DashboardPage() {
  const userSubscriptions = subscriptionData[CURRENT_USER.id] ?? []
  const userBookings = bookingData[CURRENT_USER.id] ?? []

  const sortedBookings = [...userBookings].sort(
    (a, b) => new Date(b.StartDateTime).getTime() - new Date(a.StartDateTime).getTime(),
  )
  const upcomingBookings = sortedBookings.filter((booking) => booking.StatusID === 'Confirmed')

  const statCards: StatCardProps[] = [
    { icon: 'confirmation_number', label: 'Active Passes', value: userSubscriptions.length },
    { icon: 'token', label: 'Tokens Available', value: CURRENT_USER.tokensAvailable },
    { icon: 'event_available', label: 'Upcoming Bookings', value: upcomingBookings.length },
  ]

  const plans = userSubscriptions.map((subscription) => {
    const pass = passCatalog[subscription.PassID]
    const isActive = new Date(subscription.EndDateTime).getTime() >= DATA_CONTEXT_DATE.getTime()
    return {
      key: subscription.SubscriptionID,
      title: pass?.passType ?? subscription.PassID,
      description: `Valid ${formatDateRange(subscription.StartDateTime, subscription.EndDateTime)}`,
      imageUrl:
        pass?.imageUrl ??
        'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
      badgeLabel: isActive ? (pass?.badgeLabel ?? 'Active') : 'Expired',
      statusTone: pass?.statusTone ?? (isActive ? ('emerald' as const) : ('amber' as const)),
      validityLabel: `${subscription.DurationDays} days • ${pass?.validityPeriod ?? 'Custom duration'}`,
      price: pass?.price,
      benefits: pass?.benefits,
      ctaLabel: 'Manage Pass',
    }
  })

  const bookingRows: BookingRow[] = sortedBookings.map((booking) => {
    const space = spaceCatalog[booking.SpaceID]
    return {
      id: booking.BookingID.toString(),
      room: space?.SpaceType ?? `Space ${booking.SpaceID}`,
      description: space?.Location ?? 'See concierge for details',
      date: dateFormatter.format(new Date(booking.StartDateTime)),
      timeRange: formatTimeRange(booking.StartDateTime, booking.EndDateTime),
      status: mapStatus(booking.StatusID),
      actionLabel:
        booking.StatusID === 'Confirmed'
          ? 'Manage'
          : booking.StatusID === 'Completed'
            ? 'Rebook'
            : 'Details',
    }
  })

  const visit = findVisitDetails(upcomingBookings[0] ?? sortedBookings[0])

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <TopNavigation navItems={navItems} />
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <HeroHeader
          title="My Passes &amp; Plans"
          description={`Welcome back, ${CURRENT_USER.name}. Manage your access and track upcoming visits.`}
          ctaLabel="Book Space"
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
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">verified</span>
                  Active Plans
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
