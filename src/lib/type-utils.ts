/** T 또는 null */
export type Nullable<T> = T | null;

/** 특정 키만 optional로 변환 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 존재하는 키만 Omit 가능한 엄격 버전 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/** 편도/왕복 타입 */
export type TripType = 'ONE_WAY' | 'ROUND';

/** 티켓 판매 상태 */
export type TicketStatus = 'ON_SALE' | 'SOLD_OUT';
