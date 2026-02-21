'use server'

// Server Actions for data mutations (bookings, orders, etc.)
// These replace direct API calls and are invoked from Client Components.
//
// NOTE: Run `npx prisma generate` after configuring DATABASE_URL in .env
// to enable the full Prisma client. These stubs will be populated in Phase 2.

/**
 * Creates a new booking for a user.
 */
export async function createBooking(_data: {
  userId: string
  spaceId: number
  startDateTime: Date
  endDateTime: Date
}): Promise<{ id: number }> {
  // TODO: Phase 2 – replace with prisma.booking.create(...)
  throw new Error('createBooking: Prisma not yet initialised. Run npx prisma generate.')
}

/**
 * Cancels a booking by ID.
 */
export async function cancelBooking(_bookingId: number): Promise<void> {
  // TODO: Phase 2 – replace with prisma.booking.update(...)
  throw new Error('cancelBooking: Prisma not yet initialised. Run npx prisma generate.')
}

/**
 * Creates a new order with items.
 */
export async function createOrder(_data: {
  userId: string
  spaceId: number
  items: Array<{ menuItemId: number; quantity: number; priceAtOrder: number }>
}): Promise<{ id: number }> {
  // TODO: Phase 2 – replace with prisma.order.create(...)
  throw new Error('createOrder: Prisma not yet initialised. Run npx prisma generate.')
}

/**
 * Updates the status of an order (used by Kitchen dashboard).
 */
export async function updateOrderStatus(
  _orderId: number,
  _status: 'Pending' | 'Accepted' | 'InKitchen' | 'Completed' | 'Rejected',
): Promise<void> {
  // TODO: Phase 4 – replace with prisma.order.update(...)
  throw new Error('updateOrderStatus: Prisma not yet initialised. Run npx prisma generate.')
}

