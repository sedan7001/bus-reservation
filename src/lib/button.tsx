import { ReactNode, CSSProperties } from 'react';
import { colors } from './colors';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  theme?: 'primary' | 'dark';
  style?: 'weak' | 'solid';
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  theme = 'primary',
  style: buttonStyle = 'solid',
}: ButtonProps) {
  const baseStyle: CSSProperties = {
    padding: '12px 20px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
    transition: 'background-color 0.2s',
  };

  const getColors = (): CSSProperties => {
    if (buttonStyle === 'weak') {
      if (disabled) {
        return {
          backgroundColor: '#F2F4F6',
          color: colors.grey400,
        };
      }
      if (theme === 'dark') {
        return {
          backgroundColor: '#E8F8ED',
          color: colors.green500,
        };
      }
      return {
        backgroundColor: colors.green500,
        color: colors.white,
      };
    }
    if (theme === 'primary') {
      return {
        backgroundColor: colors.green500,
        color: colors.white,
      };
    }
    return {
      backgroundColor: colors.grey800,
      color: colors.white,
    };
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...baseStyle, ...getColors() }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
