import { colors, Flex, Text } from '../lib';

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  '프리미엄': { bg: '#FFF3E0', text: '#E65100' },
  '우등': { bg: '#E8F5E9', text: '#2E7D32' },
  '일반': { bg: '#E3F2FD', text: '#1565C0' },
};

export function BusTypeBadge({ busNumber }: { busNumber: string }) {
  const busType = busNumber.split('-')[0];
  const busCode = busNumber.split('-')[1] || '';
  const style = BADGE_COLORS[busType] || BADGE_COLORS['일반'];

  return (
    <Flex alignItems="center" gap={6}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '3px 8px',
          borderRadius: 5,
          background: style.bg,
          fontSize: 12,
          fontWeight: 700,
          color: style.text,
          lineHeight: 1,
        }}
      >
        {busType}
      </span>
      <Text fontSize={12} color={colors.grey500}>
        {busCode}
      </Text>
    </Flex>
  );
}
