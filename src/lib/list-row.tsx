import { ReactNode } from 'react';

interface ListRowProps {
  contents?: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
}

export function ListRow({ contents, right, onClick }: ListRowProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{contents}</div>
      {right && <div style={{ flexShrink: 0, marginLeft: 12 }}>{right}</div>}
    </div>
  );
}

interface TextsProps {
  type?: string;
  top?: string;
  topProps?: { fontSize?: number; color?: string };
  bottom?: string;
  bottomProps?: { fontSize?: number; color?: string };
}

ListRow.Texts = function ListRowTexts({ top, topProps, bottom, bottomProps }: TextsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {top && (
        <span style={{ fontSize: topProps?.fontSize ?? 14, color: topProps?.color }}>
          {top}
        </span>
      )}
      {bottom && (
        <span style={{ fontSize: bottomProps?.fontSize ?? 16, color: bottomProps?.color }}>
          {bottom}
        </span>
      )}
    </div>
  );
};
