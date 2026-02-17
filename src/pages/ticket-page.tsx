import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Assets, colors, Flex, http, ListHeader, ListRow, NavigationBar, Text, Button, Spacing } from '../lib';
import { isSoldOut } from '../lib/type-guards';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getStations } from '../api/stations';
import { Ticket } from '../api/tickets';
import { queryKeys, queryOptions } from '../api/query-keys';
import { useReservationStore } from '../store/reservation-store';
import { useTicketFormatter } from '../hooks/use-ticket-formatter';

export function TicketPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const departureName = searchParams.get('departure');
  const arrivalName = searchParams.get('arrival');
  const departureDateStr = searchParams.get('departureDate');
  const returnDateStr = searchParams.get('returnDate');
  const tripType = (searchParams.get('tripType') as 'ONE_WAY' | 'ROUND') || 'ONE_WAY';
  const step = searchParams.get('step') || 'departure';

  const adult = Number(searchParams.get('adult')) || 0;
  const child = Number(searchParams.get('child')) || 0;
  const infant = Number(searchParams.get('infant')) || 0;
  const totalPassengers = adult + child + infant;

  const currentDepartureName = step === 'departure' ? departureName : arrivalName;
  const currentArrivalName = step === 'departure' ? arrivalName : departureName;
  const currentDateStr = step === 'departure' ? departureDateStr : returnDateStr;

  const { data: stations } = useSuspenseQuery({
    queryKey: queryKeys.stations.all,
    queryFn: getStations,
    ...queryOptions.stations,
  });

  const departureStation = stations.find(s => s.name === currentDepartureName);
  const arrivalStation = stations.find(s => s.name === currentArrivalName);

  const { data: tickets } = useSuspenseQuery({
    queryKey: queryKeys.tickets.list({
      departureStationId: departureStation?.id,
      arrivalStationId: arrivalStation?.id,
      date: currentDateStr ?? undefined,
    }),
    queryFn: () => {
      if (!departureStation || !arrivalStation || !currentDateStr) {
        return [];
      }

      const date = new Date(currentDateStr);
      const formattedDate = format(date, 'yyyy-MM-dd');

      const queryString = `departureStationId=${departureStation.id}&arrivalStationId=${arrivalStation.id}&departureTime=${formattedDate}`;

      return http.get<Ticket[]>(`/api/tickets?${queryString}`);
    },
  });

  const { setOutboundTicket, setInboundTicket } = useReservationStore();
  const { formatTime, getDuration } = useTicketFormatter();

  const handleTicketClick = (ticket: Ticket) => {
    if (isSoldOut(ticket)) {
      return;
    }

    if (tripType === 'ONE_WAY') {
      setOutboundTicket(ticket);
      navigate(`/confirm?${searchParams.toString()}`);
    } else if (tripType === 'ROUND') {
      if (step === 'departure') {
        setOutboundTicket(ticket);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('step', 'arrival');
        newParams.set('outboundTicketId', ticket.id.toString());
        setSearchParams(newParams);
        window.scrollTo(0, 0);
      } else if (step === 'arrival') {
        setInboundTicket(ticket);
        navigate(`/confirm?${searchParams.toString()}`);
      }
    }
  };

  const dateObj = currentDateStr ? new Date(currentDateStr) : new Date();
  const dateText = format(dateObj, 'M월 d일 (E)', { locale: ko });
  const infoText = `${dateText} · 총 ${totalPassengers}명`;

  return (
    <div style={{ paddingBottom: 100 }}>
      <NavigationBar
        left={
          <Assets.Icon name="icon-arrow-left-mono" shape={{ width: 32, height: 32 }} onClick={() => navigate(-1)} />
        }
        title={`${currentDepartureName} → ${currentArrivalName}`}
      />

      <ListHeader
        title={
          <Flex direction="column">
            <Text fontSize={26} fontWeight="bold">
              {step === 'arrival' ? t('ticketPage.selectReturn') : t('ticketPage.selectDeparture')}
            </Text>
            <Spacing size={8} />
            <Text fontSize={15} color={colors.grey600}>
              {infoText}
            </Text>
          </Flex>
        }
      />

      {tickets?.length === 0 ? (
        <Flex direction="column" alignItems="center" css={{ padding: '60px 20px' }}>
          <Assets.Icon name="icon-search" color={colors.grey400} shape={{ width: 48, height: 48 }} />
          <Spacing size={16} />
          <Text color={colors.grey600} fontSize={16}>
            {t('ticketPage.noBus')}
          </Text>
          <Spacing size={8} />
          <Text color={colors.grey500} fontSize={14}>
            {t('ticketPage.tryOtherDate')}
          </Text>
        </Flex>
      ) : (
        tickets?.map(ticket => (
          <ListRow
            key={ticket.id}
            contents={
              <Flex direction="column" style={{ width: '100%' }}>
                <Flex alignItems="center" style={{ marginBottom: 4 }}>
                  <Text fontSize={17} fontWeight="bold">
                    {formatTime(ticket.departureTime)}
                  </Text>
                  <span style={{ margin: '0 4px', display: 'flex', alignItems: 'center' }}>
                    <Assets.Icon
                      name="icon-arrow-right-mono"
                      color={colors.grey300}
                      shape={{ width: 16, height: 16 }}
                    />
                  </span>
                  <Text fontSize={17} fontWeight="bold">
                    {formatTime(ticket.arrivalTime)}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontSize={13} color={colors.grey600}>
                    {getDuration(ticket.departureTime, ticket.arrivalTime)}
                  </Text>
                  <span style={{ margin: '0 4px', color: colors.grey300, fontSize: 13 }}>·</span>
                  <Text fontSize={13} color={colors.grey600}>
                    {ticket.busNumber}
                  </Text>
                </Flex>
              </Flex>
            }
            right={
              <Button style="weak" disabled={isSoldOut(ticket)} onClick={() => handleTicketClick(ticket)}>
                {isSoldOut(ticket) ? t('common.soldOut') : t('common.select')}
              </Button>
            }
          />
        ))
      )}
    </div>
  );
}
