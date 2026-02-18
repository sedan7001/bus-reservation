import { create } from 'zustand';
import { Ticket } from '../api/tickets';

interface SelectedTickets {
  outboundTicket: Ticket | null;
  inboundTicket: Ticket | null;
  outboundSeats: number[];
  inboundSeats: number[];
}

interface ReservationState extends SelectedTickets {
  setOutboundTicket: (ticket: Ticket) => void;
  setInboundTicket: (ticket: Ticket) => void;
  setOutboundSeats: (seats: number[]) => void;
  setInboundSeats: (seats: number[]) => void;
  reset: () => void;
}

const initialState: SelectedTickets = {
  outboundTicket: null,
  inboundTicket: null,
  outboundSeats: [],
  inboundSeats: [],
};

export const useReservationStore = create<ReservationState>(set => ({
  ...initialState,

  setOutboundTicket: ticket => set({ outboundTicket: ticket }),

  setInboundTicket: ticket => set({ inboundTicket: ticket }),

  setOutboundSeats: seats => set({ outboundSeats: seats }),

  setInboundSeats: seats => set({ inboundSeats: seats }),

  reset: () => set(initialState),
}));
