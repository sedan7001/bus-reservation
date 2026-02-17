import { http } from '../lib';
import { API_URLS } from './api-urls';
import {
  CreateReservationBodySchema,
  CreateReservationResponseSchema,
  ReservationSchema,
  type CreateReservationBody,
  type CreateReservationResponse,
  type Reservation,
  type Ticket,
} from './schemas';

export type { Ticket, CreateReservationBody, CreateReservationResponse, Reservation };

export async function createReservation(body: CreateReservationBody): Promise<CreateReservationResponse> {
  const validatedBody = CreateReservationBodySchema.parse(body);
  return http.post(API_URLS.RESERVATIONS, validatedBody, CreateReservationResponseSchema);
}

export function getReservation(reservationId: number | string): Promise<Reservation> {
  return http.get(`${API_URLS.RESERVATIONS}/${reservationId}`, ReservationSchema);
}
