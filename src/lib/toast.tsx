import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  close: () => void;
  position?: 'top' | 'bottom';
  type?: 'warn' | 'info';
}

export function Toast({ message, isOpen, close, position = 'top', type = 'info' }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(close, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : position === 'top' ? '-20px' : '20px'})`,
        ...(position === 'top' ? { top: 60 } : { bottom: 80 }),
        zIndex: 2000,
        padding: '12px 24px',
        borderRadius: 12,
        backgroundColor: type === 'warn' ? '#333D4B' : '#333D4B',
        color: '#fff',
        fontSize: 14,
        fontWeight: 500,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s, transform 0.3s',
        whiteSpace: 'nowrap',
      }}
    >
      {type === 'warn' && '⚠ '}{message}
    </div>
  );
}
