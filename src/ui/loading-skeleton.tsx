import { colors } from '../lib';

interface LoadingSkeletonProps {
  lines?: number;
  showHeader?: boolean;
}

export function LoadingSkeleton({ lines = 5, showHeader = true }: LoadingSkeletonProps) {
  return (
    <div style={{ padding: '0 20px' }}>
      {showHeader && (
        <div style={{ padding: '16px 0' }}>
          <div
            style={{
              width: 120,
              height: 24,
              borderRadius: 6,
              background: colors.grey300,
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: '16px 0',
            borderBottom: `1px solid ${colors.grey300}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: `${60 + (i % 3) * 15}%`,
                  height: 18,
                  borderRadius: 4,
                  background: colors.grey300,
                  marginBottom: 8,
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              <div
                style={{
                  width: `${40 + (i % 2) * 20}%`,
                  height: 14,
                  borderRadius: 4,
                  background: colors.grey300,
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1 + 0.05}s`,
                }}
              />
            </div>
            <div
              style={{
                width: 60,
                height: 36,
                borderRadius: 8,
                background: colors.grey300,
                marginLeft: 16,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.1 + 0.1}s`,
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
