import BookingClient from '../../../components/dashboard/BookingClient'
import TopNavigation from '../../../components/dashboard/TopNavigation'
import type { NavItem } from '../../../components/dashboard/TopNavigation'
import { getBookingsForDate } from '../../../lib/actions'
import { prisma } from '../../../lib/prisma'
import { CURRENT_USER_EMAIL } from '../../../lib/session'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Passes', href: '/dashboard#my-passes' },
  { label: 'Bookings', href: '/dashboard/booking', isActive: true },
  { label: 'Shop', href: '/shop' },
]

export default async function BookingPage() {
  const [spaces, user, initialSlots] = await Promise.all([
    prisma.space.findMany({ where: { availability: true }, orderBy: { id: 'asc' } }),
    prisma.user.findUnique({
      where: { email: CURRENT_USER_EMAIL },
      select: { id: true, name: true },
    }),
    getBookingsForDate(new Date().toISOString()),
  ])

  return (
    <div className="min-h-screen">
      <TopNavigation navItems={navItems} />
      <BookingClient
        spaces={spaces}
        initialSlots={initialSlots}
        userId={user?.id ?? ''}
        userName={user?.name ?? 'Guest'}
      />
    </div>
  )
}
