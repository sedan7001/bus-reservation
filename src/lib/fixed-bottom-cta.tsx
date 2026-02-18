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
        padding: '12px 20px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        backgroundColor: colors.white,
        borderTop: `1px solid #F2F4F6`,
        zIndex: 50,
      }}
    >
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={e => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={e => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 16,
          fontSize: 17,
          fontWeight: 700,
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: disabled ? '#E5E8EB' : colors.green500,
          color: disabled ? colors.grey500 : colors.white,
          transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
          transform: 'scale(1)',
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
  leftRatio?: number;
  rightRatio?: number;
  mode?: 'fill' | 'spread';
}

FixedBottomCTA.Double = function FixedBottomCTADouble({ 
  leftButton, 
  rightButton, 
  leftRatio = 1, 
  rightRatio = 1,
  mode = 'fill'
}: DoubleProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 20px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        backgroundColor: colors.white,
        borderTop: '1px solid #F2F4F6',
        display: 'flex',
        gap: 8,
        zIndex: 50,
        justifyContent: mode === 'spread' ? 'space-between' : undefined,
      }}
    >
      <div style={{ flex: mode === 'spread' ? undefined : leftRatio }}>{leftButton}</div>
      <div style={{ flex: mode === 'spread' ? undefined : rightRatio }}>{rightButton}</div>
    </div>
  );
};
