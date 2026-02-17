import { CSSProperties, ReactNode } from 'react';

interface FlexProps {
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: number;
  children?: ReactNode;
  style?: CSSProperties;
  css?: CSSProperties;
  onClick?: () => void;
}

export function Flex({
  direction,
  alignItems,
  justifyContent,
  gap,
  children,
  style,
  css: cssProp,
  onClick,
}: FlexProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems,
        justifyContent,
        gap,
        ...style,
        ...cssProp,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
