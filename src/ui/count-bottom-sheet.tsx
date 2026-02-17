import { useState } from 'react';
import { overlay } from 'overlay-kit';
import { BottomSheet, Button, Flex, NumericSpinner, Spacing, Text, Toast, colors } from '../lib';

export interface PassengerCount {
  adult: number;
  child: number;
  infant: number;
}

interface CountBottomSheetProps {
  passengers: PassengerCount;
  onConfirm: (passengers: PassengerCount) => void;
  onClose: () => void;
}

export function CountBottomSheet({ passengers, onConfirm, onClose }: CountBottomSheetProps) {
  const [adult, setAdult] = useState(passengers.adult);
  const [child, setChild] = useState(passengers.child);
  const [infant, setInfant] = useState(passengers.infant);

  const handleAdultChange = (value: number) => {
    const total = value + child + infant;
    if (total > 9) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          position="top"
          type="warn"
          isOpen={isOpen}
          close={() => {
            close();
            unmount();
          }}
          message="최대 9명까지 예약할 수 있어요"
        />
      ));
      return;
    }
    setAdult(value);
  };

  const handleChildChange = (value: number) => {
    const total = adult + value + infant;
    if (total > 9) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          position="top"
          type="warn"
          isOpen={isOpen}
          close={() => {
            close();
            unmount();
          }}
          message="최대 9명까지 예약할 수 있어요"
        />
      ));
      return;
    }
    setChild(value);
  };

  const handleInfantChange = (value: number) => {
    if (adult === 0 && value > 0) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          position="top"
          type="warn"
          isOpen={isOpen}
          close={() => {
            close();
            unmount();
          }}
          message="유아는 보호자와 함께 타야 해요"
        />
      ));
      return;
    }
    const total = adult + child + value;
    if (total > 9) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          position="top"
          type="warn"
          isOpen={isOpen}
          close={() => {
            close();
            unmount();
          }}
          message="최대 9명까지 예약할 수 있어요"
        />
      ));
      return;
    }
    setInfant(value);
  };

  const handleConfirm = () => {
    onConfirm({ adult, child, infant });
    onClose();
  };

  return (
    <BottomSheet open={true} header="인원 선택" onClose={onClose}>
      <div style={{ padding: '20px' }}>
        <Flex direction="column" gap={20}>
          <Flex justifyContent="space-between" alignItems="center">
            <div>
              <Text fontWeight="medium">어른</Text>
              <br />
              <Text fontSize={13} color={colors.grey600}>
                만 13세 이상
              </Text>
            </div>
            <NumericSpinner number={adult} minNumber={0} onNumberChange={handleAdultChange} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <div>
              <Text fontWeight="medium">어린이</Text>
              <br />
              <Text fontSize={13} color={colors.grey600}>
                만 6세 ~ 만 12세
              </Text>
            </div>
            <NumericSpinner number={child} minNumber={0} onNumberChange={handleChildChange} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <div>
              <Text fontWeight="medium">유아</Text>
              <br />
              <Text fontSize={13} color={colors.grey600}>
                만 6세 미만
              </Text>
            </div>
            <NumericSpinner number={infant} minNumber={0} onNumberChange={handleInfantChange} />
          </Flex>
        </Flex>

        <Spacing size={20} />
        <Button fullWidth={true} onClick={handleConfirm}>
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
