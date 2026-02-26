import TopNavigation from '../../components/dashboard/TopNavigation'
import type { NavItem } from '../../components/dashboard/TopNavigation'
import { prisma } from '../../lib/prisma'
import ShopClient from '../../components/shop/ShopClient'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Passes', href: '/dashboard#my-passes' },
  { label: 'Bookings', href: '/dashboard/booking' },
  { label: 'Shop', href: '/shop', isActive: true },
]

export default async function ShopPage() {
  const categories = await prisma.category.findMany({
    include: {
      menuItems: {
        where: { isAvailable: true },
        orderBy: { name: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen">
      <TopNavigation navItems={navItems} />
      <ShopClient categories={categories} />
    </div>
  )
}
