import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { colors, FixedBottomCTA, NavigationBar, Spacing, ListRow, Flex, Text, Border } from '../lib';
import { getReservation, type Reservation, type Ticket } from '../api/reservations';
import { queryKeys } from '../api/query-keys';
import { useTicketFormatter } from '../hooks/use-ticket-formatter';

function getTicketsFromReservation(reservation: Reservation | undefined): Ticket[] {
  if (!reservation) {
    return [];
  }
  return match(reservation)
    .with({ type: 'ONE_WAY' }, (r) => [r.ticket])
    .with({ type: 'ROUND' }, (r) => [r.outboundTicket, r.inboundTicket])
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
          {tickets.map((ticket, index) => (
            <div key={ticket.id}>
              {index > 0 && <Border height={1} />}
              <ListRow
                contents={
                  <div>
                    <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: 8 }}>
                      <Text fontSize={16} fontWeight="bold" color={colors.grey900}>
                        {formatDate(ticket.departureTime)}
                      </Text>
                      <Text fontSize={14} color={colors.grey600}>
                        {ticket.busNumber}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap={8}>
                      <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                        {formatTime(ticket.departureTime)}
                      </Text>
                      <Text fontSize={14} color={colors.grey500}>
                        →
                      </Text>
                      <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                        {formatTime(ticket.arrivalTime)}
                      </Text>
                    </Flex>
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
