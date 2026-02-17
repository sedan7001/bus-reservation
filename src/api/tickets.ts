import { z } from 'zod';
import { http } from '../lib';
import { TicketSchema, type Ticket } from './schemas';

export type { Ticket };

interface GetTicketsParams {
  departureStationId: string;
  arrivalStationId: string;
  departureTime: string;
}

export function getTickets(params: GetTicketsParams): Promise<Ticket[]> {
  const queryString = `departureStationId=${params.departureStationId}&arrivalStationId=${params.arrivalStationId}&departureTime=${params.departureTime}`;
  return http.get(`/api/tickets?${queryString}`, z.array(TicketSchema));
}
