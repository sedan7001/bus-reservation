import { useTranslation } from 'react-i18next';
import { Assets, colors, Flex, Spacing, Text } from '../lib';

interface EmptyStateProps {
  messageKey?: string;
  subMessageKey?: string;
  message?: string;
  subMessage?: string;
  iconName?: string;
}

export function EmptyState({
  messageKey,
  subMessageKey,
  message,
  subMessage,
  iconName = 'icon-search',
}: EmptyStateProps) {
  const { t } = useTranslation();

  const mainText = message || (messageKey ? t(messageKey) : '');
  const subText = subMessage || (subMessageKey ? t(subMessageKey) : '');

  return (
    <Flex direction="column" alignItems="center" css={{ padding: '60px 20px' }}>
      <Assets.Icon name={iconName} color={colors.grey400} shape={{ width: 48, height: 48 }} />
      <Spacing size={16} />
      <Text color={colors.grey600} fontSize={16}>
        {mainText}
      </Text>
      {subText && (
        <>
          <Spacing size={8} />
          <Text color={colors.grey500} fontSize={14}>
            {subText}
          </Text>
        </>
      )}
    </Flex>
  );
}
