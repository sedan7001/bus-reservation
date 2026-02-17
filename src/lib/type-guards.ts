import type { Reservation, Ticket } from '../api/schemas';

/** Reservation 타입 가드 */
export function isOneWayReservation(r: Reservation): r is Reservation & { type: 'ONE_WAY' } {
  return r.type === 'ONE_WAY';
}

export function isRoundReservation(r: Reservation): r is Reservation & { type: 'ROUND' } {
  return r.type === 'ROUND';
}

/** Ticket 상태 가드 */
export function isOnSale(ticket: Ticket): boolean {
  return ticket.status === 'ON_SALE';
}

export function isSoldOut(ticket: Ticket): boolean {
  return ticket.status === 'SOLD_OUT';
}

/** null/undefined 필터용 가드 */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value != null;
}
