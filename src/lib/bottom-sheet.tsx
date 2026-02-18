import { ReactNode, useEffect, useRef } from 'react';

interface BottomSheetProps {
  open: boolean;
  header?: string;
  onClose: () => void;
  children?: ReactNode;
}

export function BottomSheet({ open, header, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />
      <div
        ref={sheetRef}
        style={{
          position: 'relative',
          width: '100%',
          maxHeight: '85vh',
          backgroundColor: '#fff',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
          animation: 'slideUp 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {header && (
          <div
            style={{
              padding: '24px 24px 16px',
              fontSize: 20,
              fontWeight: 700,
              color: '#191F28',
              flexShrink: 0,
            }}
          >
            {header}
          </div>
        )}
        <div style={{ overflow: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
