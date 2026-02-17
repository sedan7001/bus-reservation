import { FallbackProps } from 'react-error-boundary';
import { Button, Flex, Spacing, Text, colors } from '../lib';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      css={{ minHeight: '100vh', padding: '0 24px', textAlign: 'center' }}
    >
      <Text fontSize={48}>⚠️</Text>
      <Spacing size={16} />
      <Text fontSize={20} fontWeight="bold" color={colors.grey900}>
        문제가 발생했어요
      </Text>
      <Spacing size={8} />
      <Text fontSize={14} color={colors.grey600}>
        {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
      </Text>
      <Spacing size={24} />
      <Flex gap={12}>
        <Button style="weak" onClick={resetErrorBoundary}>
          다시 시도
        </Button>
        <Button onClick={() => (window.location.href = '/')}>
          홈으로
        </Button>
      </Flex>
    </Flex>
  );
}
