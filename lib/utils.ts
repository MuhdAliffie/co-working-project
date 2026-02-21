import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Malaysian Ringgit currency value.
 */
export function formatMYR(amount: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formats a date range as a readable string.
 */
export function formatDateRange(start: Date | string, end: Date | string): string {
  const fmt = new Intl.DateTimeFormat('en-MY', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${fmt.format(new Date(start))} – ${fmt.format(new Date(end))}`
}

/**
 * Calculates the duration in hours and minutes between two ISO date strings.
 */
export function formatDuration(start: string, end: string): string {
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
