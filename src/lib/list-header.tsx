import { ReactNode, CSSProperties } from 'react';

interface ListHeaderProps {
  title: ReactNode;
}

export function ListHeader({ title }: ListHeaderProps) {
  return (
    <div style={{ padding: '20px 24px 8px' }}>
      {title}
    </div>
  );
}

interface TitleParagraphProps {
  children?: ReactNode;
  fontWeight?: CSSProperties['fontWeight'];
  color?: string;
  textAlign?: CSSProperties['textAlign'];
}

ListHeader.TitleParagraph = function TitleParagraph({
  children,
  fontWeight,
  color,
  textAlign,
}: TitleParagraphProps) {
  return (
    <span
      style={{
        fontSize: 18,
        fontWeight: fontWeight === 'bold' ? 700 : fontWeight,
        color,
        textAlign,
      }}
    >
      {children}
    </span>
  );
};
