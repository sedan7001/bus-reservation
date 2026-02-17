import { CSSProperties, ReactNode } from 'react';

interface TextProps {
  fontSize?: number;
  fontWeight?: CSSProperties['fontWeight'];
  color?: string;
  textAlign?: CSSProperties['textAlign'];
  children?: ReactNode;
  style?: CSSProperties;
}

export function Text({ fontSize = 16, fontWeight, color, textAlign, children, style }: TextProps) {
  return (
    <span
      style={{
        fontSize,
        fontWeight: fontWeight === 'bold' ? 700 : fontWeight === 'medium' ? 500 : fontWeight,
        color,
        textAlign,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
