import { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { overlay } from 'overlay-kit';
import { Assets, Border, colors, FixedBottomCTA, Flex, ListRow, NavigationBar, Spacing, Tab } from '../lib';
import { CountBottomSheet, DateBottomSheet, type PassengerCount } from '../ui';

function formatDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
}

function formatPassengers(passengers: PassengerCount): string {
  const parts: string[] = [];
  if (passengers.adult > 0) {
    parts.push(`어른 ${passengers.adult}명`);
  }
  if (passengers.child > 0) {
    parts.push(`어린이 ${passengers.child}명`);
  }
  if (passengers.infant > 0) {
    parts.push(`유아 ${passengers.infant}명`);
  }
  return parts.join(', ') || '인원 선택';
}

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const shouldReset = (location.state as { reset?: boolean })?.reset;

  const [departureStation] = useState<string | null>(shouldReset ? null : searchParams.get('departure'));
  const [arrivalStation] = useState<string | null>(shouldReset ? null : searchParams.get('arrival'));
  const [tripType, setTripType] = useState<'ONE_WAY' | 'ROUND'>(
    shouldReset ? 'ONE_WAY' : (searchParams.get('tripType') as 'ONE_WAY' | 'ROUND') || 'ONE_WAY'
  );
  const [departureDate, setDepartureDate] = useState<Date | null>(
    shouldReset ? null : searchParams.get('departureDate') ? new Date(searchParams.get('departureDate')!) : null
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    shouldReset ? null : searchParams.get('returnDate') ? new Date(searchParams.get('returnDate')!) : null
  );
  const [passengers, setPassengers] = useState<PassengerCount>({
    adult: shouldReset ? 0 : Number(searchParams.get('adult')) || 0,
    child: shouldReset ? 0 : Number(searchParams.get('child')) || 0,
    infant: shouldReset ? 0 : Number(searchParams.get('infant')) || 0,
  });

  const handleDepartureStationClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('type', 'departure');
    params.set('tripType', tripType);
    navigate(`/station?${params.toString()}`);
  };

  const handleArrivalStationClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('type', 'arrival');
    params.set('tripType', tripType);
    navigate(`/station?${params.toString()}`);
  };

  const handleTabChange = (value: string) => {
    setTripType(value as 'ONE_WAY' | 'ROUND');
    if (value === 'ONE_WAY') {
      setReturnDate(null);
    }
  };

  const openDateBottomSheet = (type: 'departure' | 'return') => {
    const currentDate = type === 'departure' ? departureDate : returnDate;
    overlay.open(({ isOpen, close, unmount }) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return isOpen ? (
        <DateBottomSheet
          selectedDate={currentDate}
          minTodayDate={today}
          minDepartureDate={type === 'return' ? departureDate : null}
          onConfirm={date => {
            if (type === 'departure') {
              setDepartureDate(date);
              if (returnDate && date > returnDate) {
                setReturnDate(null);
              }
            } else {
              setReturnDate(date);
            }
          }}
          onClose={() => {
            close();
            unmount();
          }}
        />
      ) : null;
    });
  };

  const openCountBottomSheet = () => {
    overlay.open(({ isOpen, close, unmount }) =>
      isOpen ? (
        <CountBottomSheet
          passengers={passengers}
          onConfirm={setPassengers}
          onClose={() => {
            close();
            unmount();
          }}
        />
      ) : null
    );
  };

  const handleShowBus = () => {
    const params = new URLSearchParams();
    if (departureStation) {
      params.set('departure', departureStation);
    }
    if (arrivalStation) {
      params.set('arrival', arrivalStation);
    }
    if (departureDate) {
      params.set('departureDate', departureDate.toISOString());
    }
    if (tripType === 'ROUND' && returnDate) {
      params.set('returnDate', returnDate.toISOString());
    }
    params.set('tripType', tripType);
    params.set('adult', passengers.adult.toString());
    params.set('child', passengers.child.toString());
    params.set('infant', passengers.infant.toString());
    navigate(`/tickets?${params.toString()}`);
  };

  const isFormValid =
    departureStation &&
    arrivalStation &&
    departureDate &&
    (tripType === 'ONE_WAY' || returnDate) &&
    passengers.adult + passengers.child + passengers.infant > 0;

  return (
    <>
      <NavigationBar title="버스 예매" />

      <Spacing size={16} />

      <ListRow
        onClick={handleDepartureStationClick}
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="출발 터미널"
            topProps={{ fontSize: 14, color: colors.grey700 }}
            bottom={departureStation || '출발 터미널을 선택해주세요'}
            bottomProps={{
              fontSize: 16,
              color: departureStation ? colors.grey800 : colors.grey400,
            }}
          />
        }
      />

      <Flex justifyContent="center" css={{ margin: '16px 0' }}>
        <Assets.Icon name="icon-arrow-down-thin-mono" color={colors.grey400} />
      </Flex>

      <ListRow
        onClick={handleArrivalStationClick}
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="도착 터미널"
            topProps={{ fontSize: 14, color: colors.grey700 }}
            bottom={arrivalStation || '도착 터미널을 선택해주세요'}
            bottomProps={{
              fontSize: 16,
              color: arrivalStation ? colors.grey800 : colors.grey400,
            }}
          />
        }
      />

      <Border height={16} />

      <Tab
        onChange={handleTabChange}
      >
        <Tab.Item value="ONE_WAY" selected={tripType === 'ONE_WAY'}>
          편도
        </Tab.Item>
        <Tab.Item value="ROUND" selected={tripType === 'ROUND'}>
          왕복
        </Tab.Item>
      </Tab>

      <Spacing size={24} />

      <ListRow
        onClick={() => openDateBottomSheet('departure')}
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="가는 날"
            topProps={{ fontSize: 14, color: colors.grey700 }}
            bottom={departureDate ? formatDate(departureDate) : '날짜를 선택해주세요'}
            bottomProps={{
              fontSize: 16,
              color: departureDate ? colors.grey800 : colors.grey400,
            }}
          />
        }
        right={<Assets.Icon name="icon-arrow-right-mono" color={colors.grey400} />}
      />

      {tripType === 'ROUND' && (
        <ListRow
          onClick={() => openDateBottomSheet('return')}
          contents={
            <ListRow.Texts
              type="2RowTypeA"
              top="오는 날"
              topProps={{ fontSize: 14, color: colors.grey700 }}
              bottom={returnDate ? formatDate(returnDate) : '날짜를 선택해주세요'}
              bottomProps={{
                fontSize: 16,
                color: returnDate ? colors.grey800 : colors.grey400,
              }}
            />
          }
          right={<Assets.Icon name="icon-arrow-right-mono" color={colors.grey400} />}
        />
      )}

      <ListRow
        onClick={openCountBottomSheet}
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="인원"
            topProps={{ fontSize: 14, color: colors.grey700 }}
            bottom={formatPassengers(passengers)}
            bottomProps={{
              fontSize: 16,
              color: passengers.adult + passengers.child + passengers.infant > 0 ? colors.grey800 : colors.grey400,
            }}
          />
        }
        right={<Assets.Icon name="icon-arrow-right-mono" color={colors.grey400} />}
      />

      <FixedBottomCTA disabled={!isFormValid} onClick={handleShowBus}>
        버스 보기
      </FixedBottomCTA>
    </>
  );
}
