import { create } from 'zustand';
import { Ticket } from '../api/tickets';

interface SelectedTickets {
  outboundTicket: Ticket | null;
  inboundTicket: Ticket | null;
}

interface ReservationState extends SelectedTickets {
  setOutboundTicket: (ticket: Ticket) => void;
  setInboundTicket: (ticket: Ticket) => void;
  reset: () => void;
}

const initialState: SelectedTickets = {
  outboundTicket: null,
  inboundTicket: null,
};

export const useReservationStore = create<ReservationState>(set => ({
  ...initialState,

  setOutboundTicket: ticket => set({ outboundTicket: ticket }),

  setInboundTicket: ticket => set({ inboundTicket: ticket }),

  reset: () => set(initialState),
}));
