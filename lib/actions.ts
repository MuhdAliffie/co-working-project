'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './prisma'

// ─── Booking actions ────────────────────────────────────────────────────────

export type CreateBookingResult =
  | { success: true; id: number }
  | { success: false; error: 'SLOT_TAKEN' | 'UNKNOWN'; message?: string }

/**
 * Creates a new booking with race-condition safety.
 *
 * Uses a SERIALIZABLE transaction so that two concurrent requests checking
 * the same slot will have one succeed and one receive a P2034 conflict error
 * (which we map to SLOT_TAKEN so the UI can notify the user immediately).
 */
export async function createBooking(data: {
  userId: string
  spaceId: number
  startDateTime: Date
  endDateTime: Date
}): Promise<CreateBookingResult> {
  try {
    const booking = await prisma.$transaction(
      async (tx) => {
        // Check for any overlapping CONFIRMED booking on this space
        const conflict = await tx.booking.findFirst({
          where: {
            spaceId: data.spaceId,
            status: 'Confirmed',
            AND: [
              { startDateTime: { lt: data.endDateTime } },
              { endDateTime: { gt: data.startDateTime } },
            ],
          },
        })
        if (conflict) {
          throw Object.assign(new Error('SLOT_TAKEN'), { code: 'SLOT_TAKEN' })
        }
        return tx.booking.create({
          data: {
            userId: data.userId,
            spaceId: data.spaceId,
            startDateTime: data.startDateTime,
            endDateTime: data.endDateTime,
            status: 'Confirmed',
          },
        })
      },
      { isolationLevel: 'Serializable' },
    )
    revalidatePath('/dashboard/booking')
    revalidatePath('/dashboard')
    return { success: true, id: booking.id }
  } catch (err: unknown) {
    // Custom SLOT_TAKEN error thrown from inside the transaction
    if (err instanceof Error && err.message === 'SLOT_TAKEN') {
      return { success: false, error: 'SLOT_TAKEN', message: 'Someone just booked this slot. Please pick another time.' }
    }
    // P2034 = serialization failure (two concurrent transactions conflicted)
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code: string }).code === 'P2034'
    ) {
      return { success: false, error: 'SLOT_TAKEN', message: 'This slot was just taken. Please choose another time.' }
    }
    console.error('createBooking error:', err)
    return { success: false, error: 'UNKNOWN', message: 'Something went wrong. Please try again.' }
  }
}

/**
 * Returns all confirmed bookings for a specific date as hour-range slots.
 * Called by the BookingClient when the user picks a new date.
 */
export async function getBookingsForDate(
  dateIso: string,
): Promise<Array<{ spaceId: number; startHour: number; endHour: number }>> {
  const date = new Date(dateIso)
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)

  const bookings = await prisma.booking.findMany({
    where: {
      status: 'Confirmed',
      startDateTime: { gte: start },
      endDateTime: { lte: end },
    },
  })

  return bookings.map((b) => ({
    spaceId: b.spaceId,
    startHour: b.startDateTime.getHours(),
    endHour: b.endDateTime.getHours(),
  }))
}

/**
 * Cancels a booking by ID.
 */
export async function cancelBooking(bookingId: number): Promise<void> {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'Cancelled' },
  })
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/booking')
}

// ─── Order actions ──────────────────────────────────────────────────────────

/**
 * Creates a new order with items.
 */
export async function createOrder(_data: {
  userId: string
  spaceId: number
  items: Array<{ menuItemId: number; quantity: number; priceAtOrder: number }>
}): Promise<{ id: number }> {
  // TODO: implement once Order flow is wired up
  throw new Error('createOrder: not yet implemented.')
}

/**
 * Updates the status of an order (used by Kitchen dashboard).
 */
export async function updateOrderStatus(
  _orderId: number,
  _status: 'Pending' | 'Accepted' | 'InKitchen' | 'Completed' | 'Rejected',
): Promise<void> {
  // TODO: implement once Kitchen dashboard is wired up
  throw new Error('updateOrderStatus: not yet implemented.')
}

