interface IconProps {
  name: string;
  color?: string;
  shape?: { width: number; height: number };
  onClick?: () => void;
}

const ICON_PATHS: Record<string, string> = {
  'icon-arrow-left-mono': 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  'icon-arrow-right-mono': 'M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z',
  'icon-arrow-down-thin-mono': 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z',
  'icon-search': 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
};

export function Icon({ name, color = '#333', shape, onClick }: IconProps) {
  const w = shape?.width ?? 24;
  const h = shape?.height ?? 24;
  const path = ICON_PATHS[name];

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={color}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined, flexShrink: 0 }}
    >
      {path ? <path d={path} /> : null}
    </svg>
  );
}

export const Assets = { Icon };
