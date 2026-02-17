import { ReactNode } from 'react';
import { colors } from './colors';

interface NavigationBarProps {
  title?: string;
  left?: ReactNode;
}

export function NavigationBar({ title, left }: NavigationBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 56,
        padding: '0 16px',
        borderBottom: '1px solid #E5E8EB',
        position: 'relative',
      }}
    >
      {left && <div style={{ position: 'absolute', left: 16, display: 'flex' }}>{left}</div>}
      {title && (
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 17,
            fontWeight: 600,
            color: colors.grey900,
          }}
        >
          {title}
        </span>
      )}
    </div>
  );
}
