import { FallbackProps } from 'react-error-boundary';
import { Button, Flex, Spacing, Text, colors } from '../lib';
import { AppError } from '../lib/app-error';

function getErrorDisplay(error: unknown) {
  if (AppError.isAppError(error)) {
    return {
      icon: error.icon,
      title: getTitle(error.code),
      message: error.userMessage,
      isRetryable: error.isRetryable,
    };
  }

  return {
    icon: '⚠️',
    title: '문제가 발생했어요',
    message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    isRetryable: true,
  };
}

function getTitle(code: string): string {
  switch (code) {
    case 'NETWORK':
      return '네트워크 오류';
    case 'TIMEOUT':
      return '요청 시간 초과';
    case 'NOT_FOUND':
      return '페이지를 찾을 수 없어요';
    case 'SERVER':
      return '서버 오류';
    case 'VALIDATION':
      return '데이터 오류';
    default:
      return '문제가 발생했어요';
  }
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { icon, title, message, isRetryable } = getErrorDisplay(error);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      css={{ minHeight: '100vh', padding: '0 24px', textAlign: 'center' }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#F8F9FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
        }}
      >
        {icon}
      </div>
      <Spacing size={20} />
      <Text fontSize={20} fontWeight="bold" color={colors.grey900}>
        {title}
      </Text>
      <Spacing size={8} />
      <Text fontSize={14} color={colors.grey600} style={{ lineHeight: 1.5, maxWidth: 280, textAlign: 'center' }}>
        {message}
      </Text>
      <Spacing size={28} />
      <Flex gap={12}>
        {isRetryable && (
          <Button style="weak" onClick={resetErrorBoundary}>
            다시 시도
          </Button>
        )}
        <Button onClick={() => (window.location.href = '/')}>
          홈으로
        </Button>
      </Flex>
    </Flex>
  );
}
