import { colors } from './colors';

interface NumericSpinnerProps {
  number: number;
  minNumber?: number;
  onNumberChange: (value: number) => void;
}

export function NumericSpinner({ number, minNumber = 0, onNumberChange }: NumericSpinnerProps) {
  const canDecrease = number > minNumber;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <button
        onClick={() => canDecrease && onNumberChange(number - 1)}
        disabled={!canDecrease}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1px solid ${canDecrease ? colors.grey400 : '#E5E8EB'}`,
          backgroundColor: 'transparent',
          fontSize: 18,
          color: canDecrease ? colors.grey700 : colors.grey400,
          cursor: canDecrease ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        −
      </button>
      <span style={{ fontSize: 17, fontWeight: 600, minWidth: 20, textAlign: 'center', color: colors.grey900 }}>
        {number}
      </span>
      <button
        onClick={() => onNumberChange(number + 1)}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1px solid ${colors.green500}`,
          backgroundColor: 'transparent',
          fontSize: 18,
          color: colors.green500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        +
      </button>
    </div>
  );
}
