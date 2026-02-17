import { z } from 'zod';
import { http } from '../lib';
import { StationSchema, type Station } from './schemas';

export type { Station };

export function getStations(): Promise<Station[]> {
  return http.get('/api/stations', z.array(StationSchema));
}

export function searchStations(query: string): Promise<Station[]> {
  const url = query ? `/api/stations?name=${encodeURIComponent(query)}` : '/api/stations';
  return http.get(url, z.array(StationSchema));
}
