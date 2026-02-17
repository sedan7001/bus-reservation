interface BorderProps {
  height?: number;
}

export function Border({ height = 1 }: BorderProps) {
  return (
    <div
      style={{
        height,
        backgroundColor: height > 1 ? '#F2F4F6' : '#E5E8EB',
        flexShrink: 0,
      }}
    />
  );
}
