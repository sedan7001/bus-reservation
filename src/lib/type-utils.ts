export type Nullable<T> = T | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

export type TripType = 'ONE_WAY' | 'ROUND';

export type TicketStatus = 'ON_SALE' | 'SOLD_OUT';
