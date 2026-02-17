export const queryKeys = {
  stations: {
    all: ['stations'] as const,
    search: (query: string) => ['stations', query] as const,
  },

  tickets: {
    list: (params: { departureStationId?: string; arrivalStationId?: string; date?: string }) =>
      ['tickets', params.departureStationId, params.arrivalStationId, params.date] as const,
  },

  reservations: {
    detail: (id: number | string) => ['reservation', id] as const,
  },
} as const;

export const queryOptions = {
  stations: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },
} as const;
