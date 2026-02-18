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
        padding: '20px 24px',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={e => {
        if (onClick) e.currentTarget.style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={e => {
        if (onClick) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{contents}</div>
      {right && <div style={{ flexShrink: 0, marginLeft: 16 }}>{right}</div>}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {top && (
        <span style={{ fontSize: topProps?.fontSize ?? 13, color: topProps?.color, fontWeight: 500 }}>
          {top}
        </span>
      )}
      {bottom && (
        <span style={{ fontSize: bottomProps?.fontSize ?? 17, color: bottomProps?.color, fontWeight: 600, lineHeight: 1.4 }}>
          {bottom}
        </span>
      )}
    </div>
  );
};
