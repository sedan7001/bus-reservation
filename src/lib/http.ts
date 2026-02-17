import { type ZodSchema } from 'zod';

export const http = {
  async get<T>(url: string, schema?: ZodSchema<T>): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return schema ? schema.parse(data) : (data as T);
  },

  async post<T>(url: string, body: unknown, schema?: ZodSchema<T>): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.message ?? `HTTP ${res.status}`);
    }
    const data = await res.json();
    return schema ? schema.parse(data) : (data as T);
  },
};
