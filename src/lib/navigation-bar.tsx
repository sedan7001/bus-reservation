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
        height: 52,
        padding: '0 12px',
        borderBottom: '1px solid #F2F4F6',
        position: 'relative',
        backgroundColor: colors.white,
        zIndex: 10,
      }}
    >
      {left && <div style={{ position: 'absolute', left: 12, display: 'flex', padding: 8, cursor: 'pointer' }}>{left}</div>}
      {title && (
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 700,
            color: colors.grey900,
          }}
        >
          {title}
        </span>
      )}
    </div>
  );
}
