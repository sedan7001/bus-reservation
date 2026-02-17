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
          maxHeight: '90vh',
          backgroundColor: '#fff',
          borderRadius: '16px 16px 0 0',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {header && (
          <div
            style={{
              padding: '20px 24px 12px',
              fontSize: 18,
              fontWeight: 700,
              borderBottom: '1px solid #E5E8EB',
            }}
          >
            {header}
          </div>
        )}
        {children}
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
