import { useState } from 'react';
import { overlay } from 'overlay-kit';
import { BottomSheet, Button, Calendar, Spacing, Toast } from '../lib';

interface DateBottomSheetProps {
  selectedDate: Date | null;
  minTodayDate?: Date | null;
  minDepartureDate?: Date | null;
  onConfirm: (date: Date) => void;
  onClose: () => void;
}

export function DateBottomSheet({
  selectedDate,
  minTodayDate,
  minDepartureDate,
  onConfirm,
  onClose,
}: DateBottomSheetProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate ?? undefined);

  const handleConfirm = () => {
    if (date) {
      if (minTodayDate && date < minTodayDate) {
        overlay.open(({ isOpen, close: toastClose, unmount: toastUnmount }) => (
          <Toast
            position="top"
            type="warn"
            isOpen={isOpen}
            close={() => {
              toastClose();
              toastUnmount();
            }}
            message="오늘 이전 날짜는 선택할 수 없어요"
          />
        ));
        setDate(undefined);
        return;
      }
      if (minDepartureDate && date < minDepartureDate) {
        overlay.open(({ isOpen, close: toastClose, unmount: toastUnmount }) => (
          <Toast
            position="top"
            type="warn"
            isOpen={isOpen}
            close={() => {
              toastClose();
              toastUnmount();
            }}
            message="오는 날은 가는 날 이후로 선택해주세요"
          />
        ));
        setDate(undefined);
        return;
      }
      onConfirm(date);
    }
    onClose();
  };

  return (
    <BottomSheet open={true} header="날짜 선택" onClose={onClose}>
      <div style={{ padding: '20px' }}>
        <div style={{ minHeight: 320 }}>
          <Calendar date={date} onDateChange={setDate} />
        </div>
        <Spacing size={20} />
        <Button fullWidth={true} onClick={handleConfirm} disabled={!date}>
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
