import { ChangeEvent } from 'react';
import { colors } from './colors';

interface TextFieldProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({ type = 'text', placeholder, value, onChange }: TextFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '12px 16px',
        fontSize: 16,
        border: `1px solid #E5E8EB`,
        borderRadius: 8,
        outline: 'none',
        backgroundColor: '#F9FAFB',
        color: colors.grey900,
        boxSizing: 'border-box',
      }}
    />
  );
}
