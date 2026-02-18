import { useState, useMemo, useCallback } from 'react';
import { colors, Flex, Text, Spacing } from '../lib';

type BusType = '일반' | '우등' | '프리미엄';

interface SeatLayout {
  rows: number;
  seatsPerRow: number[];
  totalSeats: number;
}

const BUS_LAYOUTS: Record<BusType, SeatLayout> = {
  일반: { rows: 10, seatsPerRow: [2, 2], totalSeats: 40 },
  우등: { rows: 7, seatsPerRow: [2, 2], totalSeats: 28 },
  프리미엄: { rows: 7, seatsPerRow: [1, 2], totalSeats: 21 },
};

function getBusType(busNumber: string): BusType {
  if (busNumber.startsWith('프리미엄')) return '프리미엄';
  if (busNumber.startsWith('우등')) return '우등';
  return '일반';
}

function generateReservedSeats(totalSeats: number, count: number): Set<number> {
  const reserved = new Set<number>();
  const seed = totalSeats * 7;
  let current = seed;
  while (reserved.size < count) {
    current = (current * 31 + 17) % totalSeats + 1;
    reserved.add(current);
  }
  return reserved;
}

function getSeatLabel(num: number, isSelected: boolean, isReserved: boolean): string {
  if (isReserved) return `${num}번 좌석, 예약됨`;
  if (isSelected) return `${num}번 좌석, 선택됨`;
  return `${num}번 좌석, 선택 가능`;
}

interface SeatSelectorProps {
  busNumber: string;
  selectedSeats: number[];
  onSeatChange: (seats: number[]) => void;
  maxSeats: number;
}

export function SeatSelector({ busNumber, selectedSeats, onSeatChange, maxSeats }: SeatSelectorProps) {
  const busType = getBusType(busNumber);
  const layout = BUS_LAYOUTS[busType];

  const reservedSeats = useMemo(
    () => generateReservedSeats(layout.totalSeats, Math.floor(layout.totalSeats * 0.2)),
    [layout.totalSeats],
  );

  const handleSeatClick = useCallback((seatNumber: number) => {
    if (reservedSeats.has(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      onSeatChange(selectedSeats.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length >= maxSeats) return;
      onSeatChange([...selectedSeats, seatNumber].sort((a, b) => a - b));
    }
  }, [reservedSeats, selectedSeats, onSeatChange, maxSeats]);

  const seatSize = busType === '프리미엄' ? 40 : 36;
  const gap = 6;

  let seatNumber = 0;

  return (
    <div style={{ padding: '0 20px' }}>
      <Flex justifyContent="center" style={{ marginBottom: 12 }}>
        <Flex alignItems="center" gap={16}>
          <Flex alignItems="center" gap={4}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: colors.white, border: `1.5px solid ${colors.grey300}` }} />
            <Text fontSize={12} color={colors.grey600}>선택 가능</Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: '#2E7D32' }} />
            <Text fontSize={12} color={colors.grey600}>선택됨</Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: colors.grey300 }} />
            <Text fontSize={12} color={colors.grey600}>예약됨</Text>
          </Flex>
        </Flex>
      </Flex>

      <div
        role="group"
        aria-label={`${busType} 버스 좌석 선택 (${layout.totalSeats}석)`}
        style={{
          background: '#F4F6F8',
          borderRadius: 16,
          padding: '20px 16px',
          border: `1px solid ${colors.grey300}`,
        }}
      >
        <Flex direction="column" gap={gap} alignItems="center">
          {Array.from({ length: layout.rows }).map((_, rowIndex) => {
            const leftSeats = layout.seatsPerRow[0];
            const rightSeats = layout.seatsPerRow[1];

            const leftSeatNumbers: number[] = [];
            for (let i = 0; i < leftSeats; i++) {
              seatNumber++;
              leftSeatNumbers.push(seatNumber);
            }
            const rightSeatNumbers: number[] = [];
            for (let i = 0; i < rightSeats; i++) {
              seatNumber++;
              rightSeatNumbers.push(seatNumber);
            }

            return (
              <Flex key={rowIndex} gap={gap} alignItems="center" justifyContent="center">
                {leftSeatNumbers.map(num => (
                  <SeatButton
                    key={num}
                    number={num}
                    size={seatSize}
                    isSelected={selectedSeats.includes(num)}
                    isReserved={reservedSeats.has(num)}
                    onClick={() => handleSeatClick(num)}
                  />
                ))}
                <div style={{ width: busType === '프리미엄' ? 32 : 24 }} />
                {rightSeatNumbers.map(num => (
                  <SeatButton
                    key={num}
                    number={num}
                    size={seatSize}
                    isSelected={selectedSeats.includes(num)}
                    isReserved={reservedSeats.has(num)}
                    onClick={() => handleSeatClick(num)}
                  />
                ))}
              </Flex>
            );
          })}
        </Flex>
      </div>

      <Spacing size={8} />
      <div aria-live="polite" aria-atomic="true">
        <Text fontSize={13} color={colors.grey500} style={{ textAlign: 'center', display: 'block' }}>
          {busType} ({layout.totalSeats}석) · {selectedSeats.length}/{maxSeats}석 선택됨
        </Text>
      </div>
    </div>
  );
}

interface SeatButtonProps {
  number: number;
  size: number;
  isSelected: boolean;
  isReserved: boolean;
  onClick: () => void;
}

function SeatButton({ number, size, isSelected, isReserved, onClick }: SeatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  let background: string = colors.white;
  let borderColor: string = colors.grey300;
  let textColor: string = colors.grey700;
  let cursor = 'pointer';

  if (isReserved) {
    background = colors.grey300;
    borderColor = colors.grey300;
    textColor = colors.grey500;
    cursor = 'not-allowed';
  } else if (isSelected) {
    background = '#2E7D32';
    borderColor = '#2E7D32';
    textColor = colors.white;
  } else if (isHovered) {
    background = '#E8F5E9';
    borderColor = '#2E7D32';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isReserved}
      aria-label={getSeatLabel(number, isSelected, isReserved)}
      aria-pressed={isSelected}
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background,
        border: `1.5px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor,
        padding: 0,
        transition: 'all 0.15s ease',
        fontSize: 12,
        fontWeight: isSelected ? 700 : 500,
        color: textColor,
        outline: 'none',
      }}
    >
      {number}
    </button>
  );
}
