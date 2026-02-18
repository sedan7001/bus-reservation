export type ErrorCode = 'NETWORK' | 'TIMEOUT' | 'NOT_FOUND' | 'VALIDATION' | 'SERVER' | 'UNKNOWN';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  NETWORK: '인터넷 연결을 확인해주세요.',
  TIMEOUT: '요청 시간이 초과되었어요. 다시 시도해주세요.',
  NOT_FOUND: '요청한 정보를 찾을 수 없어요.',
  VALIDATION: '데이터 형식이 올바르지 않아요.',
  SERVER: '서버에 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
};

const ERROR_ICONS: Record<ErrorCode, string> = {
  NETWORK: '📡',
  TIMEOUT: '⏱️',
  NOT_FOUND: '🔍',
  VALIDATION: '⚠️',
  SERVER: '🔧',
  UNKNOWN: '⚠️',
};

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode?: number;
  readonly isRetryable: boolean;

  constructor(code: ErrorCode, message?: string, statusCode?: number) {
    super(message || ERROR_MESSAGES[code]);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isRetryable = code === 'NETWORK' || code === 'TIMEOUT' || code === 'SERVER';
  }

  get icon(): string {
    return ERROR_ICONS[this.code];
  }

  get userMessage(): string {
    return ERROR_MESSAGES[this.code];
  }

  static fromHttpStatus(status: number, message?: string): AppError {
    if (status === 404) return new AppError('NOT_FOUND', message, status);
    if (status === 422) return new AppError('VALIDATION', message, status);
    if (status >= 500) return new AppError('SERVER', message, status);
    return new AppError('UNKNOWN', message || `HTTP ${status}`, status);
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }
}
