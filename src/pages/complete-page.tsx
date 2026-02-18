import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { colors, FixedBottomCTA, NavigationBar, Spacing, ListRow, Flex, Text, Border } from '../lib';
import { getReservation, type Reservation, type Ticket } from '../api/reservations';
import { queryKeys } from '../api/query-keys';
import { useTicketFormatter } from '../hooks/use-ticket-formatter';

interface TicketWithSeats {
  ticket: Ticket;
  seats: number[];
  label: string;
}

function getTicketsFromReservation(reservation: Reservation | undefined): TicketWithSeats[] {
  if (!reservation) {
    return [];
  }
  return match(reservation)
    .with({ type: 'ONE_WAY' }, (r) => [{ ticket: r.ticket, seats: r.seats, label: '' }])
    .with({ type: 'ROUND' }, (r) => [
      { ticket: r.outboundTicket, seats: r.outboundSeats, label: '가는편' },
      { ticket: r.inboundTicket, seats: r.inboundSeats, label: '오는편' },
    ])
    .exhaustive();
}

export function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { reservationId } = location.state || {};

  const { data: reservation } = useQuery({
    queryKey: queryKeys.reservations.detail(reservationId),
    queryFn: () => getReservation(reservationId),
    enabled: Boolean(reservationId),
  });

  const { formatTime, formatDate } = useTicketFormatter();

  const tickets = getTicketsFromReservation(reservation);

  return (
    <>
      <NavigationBar title={t('completePage.title')} />

      <Spacing size={40} />

      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 64, lineHeight: 1 }}>✅</div>
        <Spacing size={20} />
        <Text fontSize={22} fontWeight="bold" color={colors.grey900}>
          {t('completePage.success')}
        </Text>
        <Spacing size={8} />
        <div>
          <Text fontSize={15} color={colors.grey600}>
            {t('completePage.reservationNumber')}: {reservationId || t('completePage.notAvailable')}
          </Text>
        </div>
      </div>

      {tickets.length > 0 && (
        <>
          <Border height={16} />
          {tickets.map((item, index) => (
            <div key={item.ticket.id}>
              {index > 0 && <Border height={1} />}
              <ListRow
                contents={
                  <div>
                    {item.label && (
                      <Text fontSize={13} fontWeight="bold" color={colors.blue500} style={{ marginBottom: 4, display: 'block' }}>
                        {item.label}
                      </Text>
                    )}
                    <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: 8 }}>
                      <Text fontSize={16} fontWeight="bold" color={colors.grey900}>
                        {formatDate(item.ticket.departureTime)}
                      </Text>
                      <Text fontSize={14} color={colors.grey600}>
                        {item.ticket.busNumber}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap={8}>
                      <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                        {formatTime(item.ticket.departureTime)}
                      </Text>
                      <Text fontSize={14} color={colors.grey500}>
                        →
                      </Text>
                      <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                        {formatTime(item.ticket.arrivalTime)}
                      </Text>
                    </Flex>
                    {item.seats.length > 0 && (
                      <>
                        <Spacing size={8} />
                        <Text fontSize={14} color={colors.grey700}>
                          {t('completePage.seats')}: {item.seats.join(', ')}번
                        </Text>
                      </>
                    )}
                  </div>
                }
              />
            </div>
          ))}
        </>
      )}

      <FixedBottomCTA
        onClick={() => {
          navigate('/');
        }}
      >
        {t('common.complete')}
      </FixedBottomCTA>
    </>
  );
}
