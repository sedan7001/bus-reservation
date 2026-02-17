import { ReactNode, Children, isValidElement, CSSProperties } from 'react';
import { colors } from './colors';

interface TabProps {
  children: ReactNode;
  onChange?: (value: string) => void;
  css?: CSSProperties;
}

interface TabItemProps {
  value: string;
  selected?: boolean;
  children?: ReactNode;
}

export function Tab({ children, onChange, css: cssProp }: TabProps) {
  const items = Children.toArray(children).filter(isValidElement) as React.ReactElement<TabItemProps>[];

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #E5E8EB',
        ...cssProp,
      }}
    >
      {items.map((item) => {
        const { value, selected, children: label } = item.props;
        return (
          <button
            key={value}
            onClick={() => onChange?.(value)}
            style={{
              flex: 1,
              padding: '14px 0',
              fontSize: 15,
              fontWeight: selected ? 600 : 400,
              color: selected ? colors.grey900 : colors.grey500,
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: selected ? `2px solid ${colors.grey900}` : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

Tab.Item = function TabItem(_props: TabItemProps) {
  return null;
};
