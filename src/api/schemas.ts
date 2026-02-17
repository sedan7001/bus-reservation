import { z } from 'zod';

// ── 공통 열거형 ──
export const TripTypeEnum = z.enum(['ONE_WAY', 'ROUND']);
export const TicketStatusEnum = z.enum(['ON_SALE', 'SOLD_OUT']);

// ── Station ──
export const StationSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
});

export type Station = z.infer<typeof StationSchema>;

// ── Ticket ──
export const TicketSchema = z.object({
  id: z.number(),
  departureStationId: z.union([z.string(), z.number()]),
  arrivalStationId: z.union([z.string(), z.number()]),
  departureTime: z.string(),
  arrivalTime: z.string(),
  busNumber: z.string(),
  status: TicketStatusEnum,
});

export type Ticket = z.infer<typeof TicketSchema>;

// ── Passenger Count ──
export const PassengerCountSchema = z.object({
  adults: z.number().int().min(0),
  children: z.number().int().min(0),
  newborn: z.number().int().min(0),
});

export type PassengerCount = z.infer<typeof PassengerCountSchema>;

// ── CreateReservation ──
export const CreateReservationBodySchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('ONE_WAY'),
    ticketId: z.number(),
    count: PassengerCountSchema,
  }),
  z.object({
    type: z.literal('ROUND'),
    outboundTicketId: z.number(),
    inboundTicketId: z.number(),
    count: PassengerCountSchema,
  }),
]);

export type CreateReservationBody = z.infer<typeof CreateReservationBodySchema>;

export const CreateReservationResponseSchema = z.object({
  reservationId: z.number(),
});

export type CreateReservationResponse = z.infer<typeof CreateReservationResponseSchema>;

// ── Reservation (응답) ──
const OneWayReservationSchema = z.object({
  type: z.literal('ONE_WAY'),
  id: z.number(),
  ticket: TicketSchema,
});

const RoundReservationSchema = z.object({
  type: z.literal('ROUND'),
  id: z.number(),
  outboundTicket: TicketSchema,
  inboundTicket: TicketSchema,
});

export const ReservationSchema = z.discriminatedUnion('type', [
  OneWayReservationSchema,
  RoundReservationSchema,
]);

export type Reservation = z.infer<typeof ReservationSchema>;
export type OneWayReservation = z.infer<typeof OneWayReservationSchema>;
export type RoundReservation = z.infer<typeof RoundReservationSchema>;
