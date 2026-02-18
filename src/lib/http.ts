import { type ZodSchema, ZodError } from 'zod';
import { AppError } from './app-error';

const REQUEST_TIMEOUT = 10_000;

async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AppError('TIMEOUT');
    }
    if (error instanceof TypeError) {
      throw new AppError('NETWORK');
    }
    throw new AppError('UNKNOWN', error instanceof Error ? error.message : undefined);
  } finally {
    clearTimeout(timeoutId);
  }
}

function handleHttpError(res: Response, errorData?: { message?: string }): never {
  const message = errorData?.message;
  throw AppError.fromHttpStatus(res.status, message);
}

function handleParseError(error: unknown): never {
  if (error instanceof ZodError) {
    const details = error.issues.map((e: { message: string }) => e.message).join(', ');
    throw new AppError('VALIDATION', `데이터 검증 실패: ${details}`);
  }
  throw error;
}

export const http = {
  async get<T>(url: string, schema?: ZodSchema<T>): Promise<T> {
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      handleHttpError(res, errorData);
    }
    const data = await res.json();
    if (schema) {
      try {
        return schema.parse(data);
      } catch (error) {
        handleParseError(error);
      }
    }
    return data as T;
  },

  async post<T>(url: string, body: unknown, schema?: ZodSchema<T>, headers?: Record<string, string>): Promise<T> {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      handleHttpError(res, errorData);
    }
    const data = await res.json();
    if (schema) {
      try {
        return schema.parse(data);
      } catch (error) {
        handleParseError(error);
      }
    }
    return data as T;
  },
};
