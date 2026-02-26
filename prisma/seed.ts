import 'dotenv/config';
import { PrismaClient, UserRole, SpaceType, SubscriptionStatus, BookingStatus } from './app/generated/prisma-client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Strip sslmode from the URL so pg doesn't parse it and emit a deprecation warning.
function stripSslMode(url: string): string {
  const u = new URL(url);
  u.searchParams.delete('sslmode');
  return u.toString();
}

const pool = new Pool({
  connectionString: stripSslMode(process.env.DATABASE_URL!),
  ssl: { rejectUnauthorized: true },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  // ─── Admin User ───────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cloudsy.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@cloudsy.com',
      passwordHash: 'hashed_password_placeholder',
      role: UserRole.Admin,
    },
  });
  console.log('✅ User:', admin.email);

  // ─── Spaces ───────────────────────────────────────────────────────────────
  const spaces = await Promise.all([
    prisma.space.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Hot Desk A1',
        type: SpaceType.HotDesk,
        capacity: 1,
        location: 'Zone A',
        pricePerHour: 5.0,
      },
    }),
    prisma.space.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Meeting Room 1',
        type: SpaceType.MeetingRoom,
        capacity: 8,
        location: 'Zone B',
        pricePerHour: 20.0,
      },
    }),
    prisma.space.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Focus Pod 1',
        type: SpaceType.FocusPod,
        capacity: 1,
        location: 'Zone C',
        pricePerHour: 8.0,
      },
    }),
  ]);
  console.log('✅ Spaces:', spaces.map((s) => s.name).join(', '));

  // ─── Menu Categories ──────────────────────────────────────────────────────
  const categories = [
    { name: 'Coffee',       slug: 'coffee' },
    { name: 'Tea',          slug: 'tea' },
    { name: 'Matcha',       slug: 'matcha' },
    { name: 'Others',       slug: 'others' },
    { name: 'Sandwiches',   slug: 'sandwiches' },
    { name: 'Noodles',      slug: 'noodles' },
    { name: 'Rice Bowls',   slug: 'rice-bowls' },
    { name: 'Pastries',     slug: 'pastries' },
    { name: 'Finger Foods', slug: 'finger-foods' },
    { name: 'Specials',     slug: 'specials' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('✅ Categories:', categories.map((c) => c.name).join(', '));

  // ─── Menu Items ───────────────────────────────────────────────────────────
  const menuItems = [
    // Coffee & Classics
    { name: 'Signature Blend (Americano)',         price: 10, categorySlug: 'coffee' },
    { name: 'Signature Blend (Latte)',             price: 11, categorySlug: 'coffee' },
    { name: 'Exotic Blend (Americano)',            price: 12, categorySlug: 'coffee' },
    { name: 'Exotic Blend (Latte)',                price: 13, categorySlug: 'coffee' },
    { name: 'Vit C Tea',        description: 'Rose, jasmine, dried lemons',   price: 10, categorySlug: 'tea' },
    { name: 'Digestive Tea',    description: 'Rose, jasmine, dried kumquat',  price: 10, categorySlug: 'tea' },
    { name: 'Sooth Tea',        description: 'Jasmine, dried snow pear',      price: 10, categorySlug: 'tea' },
    { name: 'Mocha',            price: 15, categorySlug: 'others' },
    { name: 'Chocolate',        price: 13, categorySlug: 'others' },
    // Matcha Series
    { name: 'Matcha Latte',                price: 16, categorySlug: 'matcha' },
    { name: 'Hojicha Latte',               price: 16, categorySlug: 'matcha' },
    { name: 'Genmaicha Latte',             price: 16, categorySlug: 'matcha' },
    { name: 'Strawberry Matcha Latte',     price: 18, categorySlug: 'matcha' },
    { name: 'Blueberry Matcha Latte',      price: 18, categorySlug: 'matcha' },
    // Food
    { name: 'Ham & Cheese Sandwich',               description: 'Side of chips',      price: 15, categorySlug: 'sandwiches' },
    { name: 'Smoked Salmon & Cream Cheese',        description: 'Side of chips',      price: 15, categorySlug: 'sandwiches' },
    { name: 'Kimchi Ramyeon',                      price: 15, categorySlug: 'noodles' },
    { name: 'Peanut Butter Chili Udon',            description: 'Warning: creamy!',   price: 16, categorySlug: 'noodles' },
    { name: 'Salmon Ochazuke',                     price: 19, categorySlug: 'rice-bowls' },
    { name: 'Chicky Rice Bowl',                    price: 19, categorySlug: 'rice-bowls' },
    { name: 'Torched Mentaiko Tamagoyaki Bowl',    price: 18, categorySlug: 'rice-bowls' },
    // Pastries & Snacks
    { name: 'Croissant',               price:  9, categorySlug: 'pastries' },
    { name: 'Shio Pan (Salt Bread)',   price:  9, categorySlug: 'pastries' },
    { name: 'Chocolate Danish',        price: 13, categorySlug: 'pastries' },
    { name: 'Chicken Pepperoni Danish',price: 15, categorySlug: 'pastries' },
    { name: 'Chocolate Brownie',       description: 'Limited', price: 15, categorySlug: 'pastries' },
    { name: 'Chicken Nuggets',         price: 13, categorySlug: 'finger-foods' },
    { name: 'Tom Yum Popcorn Chicken', price: 14, categorySlug: 'finger-foods' },
    { name: 'Potato Wedges',           price: 12, categorySlug: 'finger-foods' },
    // Specials
    { name: 'Salty Jasmine Grapefruit', price: 13, categorySlug: 'specials' },
    { name: 'Tropical Mango-Longan',    price: 13, categorySlug: 'specials' },
    { name: 'Sweet Lavender Lychee',    price: 13, categorySlug: 'specials' },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { name: item.name },
      update: { price: item.price, description: item.description ?? null },
      create: {
        name: item.name,
        price: item.price,
        description: item.description ?? null,
        category: { connect: { slug: item.categorySlug } },
      },
    });
  }
  console.log(`✅ Menu items: ${menuItems.length} items seeded across ${categories.length} categories`);

  // ─── Customer: Aliffie ────────────────────────────────────────────────────
  const aliffie = await prisma.user.upsert({
    where: { email: 'aliffie@cloudsy.com' },
    update: {},
    create: {
      name: 'Aliffie',
      email: 'aliffie@cloudsy.com',
      passwordHash: '124124', // TODO: hash with bcrypt before production
      role: UserRole.User,
    },
  });
  console.log('✅ Customer:', aliffie.email);

  // ─── Monthly Subscription ─────────────────────────────────────────────────
  await prisma.subscription.upsert({
    where: { id: 'sub-aliffie-monthly' },
    update: {},
    create: {
      id: 'sub-aliffie-monthly',
      userId: aliffie.id,
      planId: 'monthly',
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-03-01'),
      durationDays: 30,
      status: SubscriptionStatus.Active,
    },
  });
  console.log('✅ Subscription: monthly (active)');

  // ─── Past Bookings (Completed) ────────────────────────────────────────────
  await prisma.booking.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: aliffie.id,
      spaceId: spaces[0].id, // Hot Desk A1
      startDateTime: new Date('2026-01-05T09:00:00'),
      endDateTime: new Date('2026-01-05T17:00:00'),
      status: BookingStatus.Completed,
    },
  });

  await prisma.booking.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      userId: aliffie.id,
      spaceId: spaces[1].id, // Meeting Room 1
      startDateTime: new Date('2026-01-20T10:00:00'),
      endDateTime: new Date('2026-01-20T12:00:00'),
      status: BookingStatus.Completed,
    },
  });
  console.log('✅ Past bookings: 2 (Completed)');

  // ─── Active Booking (Confirmed) ───────────────────────────────────────────
  await prisma.booking.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      userId: aliffie.id,
      spaceId: spaces[2].id, // Focus Pod 1
      startDateTime: new Date('2026-02-25T08:00:00'),
      endDateTime: new Date('2026-02-25T18:00:00'),
      status: BookingStatus.Confirmed,
    },
  });
  console.log('✅ Active booking: 1 (Confirmed)');

  // ─── Customer: Intan ──────────────────────────────────────────────────────
  const intan = await prisma.user.upsert({
    where: { email: 'intan@cloudsy.com' },
    update: {},
    create: {
      name: 'Intan',
      email: 'intan@cloudsy.com',
      passwordHash: '843843', // TODO: hash with bcrypt before production
      role: UserRole.User,
    },
  });
  console.log('✅ Customer:', intan.email);

  // ─── 3-Day Pass Subscription ──────────────────────────────────────────────
  await prisma.subscription.upsert({
    where: { id: 'sub-intan-3day' },
    update: {},
    create: {
      id: 'sub-intan-3day',
      userId: intan.id,
      planId: '3day',
      startDate: new Date('2026-02-18'),
      endDate: new Date('2026-02-21'),
      durationDays: 3,
      status: SubscriptionStatus.Expired,
    },
  });
  console.log('✅ Subscription: 3-day pass (expired)');

  // ─── Past Bookings (Completed) ────────────────────────────────────────────
  await prisma.booking.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      userId: intan.id,
      spaceId: spaces[0].id, // Hot Desk A1
      startDateTime: new Date('2026-02-18T09:00:00'),
      endDateTime: new Date('2026-02-18T17:00:00'),
      status: BookingStatus.Completed,
    },
  });

  await prisma.booking.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      userId: intan.id,
      spaceId: spaces[1].id, // Meeting Room 1
      startDateTime: new Date('2026-02-19T10:00:00'),
      endDateTime: new Date('2026-02-19T12:00:00'),
      status: BookingStatus.Completed,
    },
  });
  console.log('✅ Past bookings: 2 (Completed)');

  // ─── Cancelled Booking ────────────────────────────────────────────────────
  await prisma.booking.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      userId: intan.id,
      spaceId: spaces[2].id, // Focus Pod 1
      startDateTime: new Date('2026-02-20T14:00:00'),
      endDateTime: new Date('2026-02-20T18:00:00'),
      status: BookingStatus.Cancelled,
    },
  });
  console.log('✅ Cancelled booking: 1 (Cancelled)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
