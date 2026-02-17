import { ReactNode } from 'react';
import { colors } from './colors';

interface FixedBottomCTAProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function FixedBottomCTA({ children, onClick, disabled }: FixedBottomCTAProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 24px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        backgroundColor: colors.white,
        borderTop: `1px solid #E5E8EB`,
      }}
    >
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 12,
          fontSize: 17,
          fontWeight: 700,
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: disabled ? '#E5E8EB' : colors.green500,
          color: disabled ? colors.grey500 : colors.white,
          transition: 'background-color 0.2s',
        }}
      >
        {children}
      </button>
    </div>
  );
}

interface DoubleProps {
  fullWidth?: boolean;
  leftButton: ReactNode;
  rightButton: ReactNode;
}

FixedBottomCTA.Double = function FixedBottomCTADouble({ leftButton, rightButton }: DoubleProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 24px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        backgroundColor: colors.white,
        borderTop: '1px solid #E5E8EB',
        display: 'flex',
        gap: 8,
      }}
    >
      <div style={{ flex: 1 }}>{leftButton}</div>
      <div style={{ flex: 1 }}>{rightButton}</div>
    </div>
  );
};
