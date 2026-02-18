import { useNetworkStatus } from '../hooks/use-network-status';

export function NetworkBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '10px 16px',
        background: '#D32F2F',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <span>📡</span>
      인터넷 연결이 끊어졌습니다. 연결 상태를 확인해주세요.
    </div>
  );
}
