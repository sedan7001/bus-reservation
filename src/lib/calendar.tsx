import { useState } from 'react';
import { colors } from './colors';

interface CalendarProps {
  date?: Date;
  onDateChange: (date: Date) => void;
}

export function Calendar({ date, onDateChange }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(date?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(date?.getMonth() ?? today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    onDateChange(new Date(viewYear, viewMonth, day));
  };

  const isSelected = (day: number) =>
    date?.getFullYear() === viewYear &&
    date?.getMonth() === viewMonth &&
    date?.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={prevMonth} style={navBtnStyle}>◀</button>
        <span style={{ fontSize: 16, fontWeight: 600, color: colors.grey900 }}>
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button onClick={nextMonth} style={navBtnStyle}>▶</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 8 }}>
        {weekdays.map(d => (
          <span key={d} style={{ fontSize: 13, color: colors.grey500, padding: 4 }}>{d}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
        {cells.map((day, i) => (
          <div key={i} style={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {day && (
              <>
                <button
                  onClick={() => handleDateClick(day)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isSelected(day) ? colors.green500 : 'transparent',
                    color: isSelected(day) ? '#fff' : colors.grey800,
                    fontSize: 14,
                    fontWeight: isSelected(day) ? 600 : isToday(day) ? 700 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {day}
                </button>
                {isToday(day) && (
                  <div style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: '#FF3B30',
                    marginTop: 2,
                  }} />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const navBtnStyle = {
  border: 'none',
  background: 'none',
  fontSize: 14,
  color: colors.grey600,
  cursor: 'pointer' as const,
  padding: '4px 8px',
};
