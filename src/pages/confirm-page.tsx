import {
  Assets,
  Border,
  Button,
  FixedBottomCTA,
  Flex,
  ListHeader,
  ListRow,
  NavigationBar,
  Spacing,
  Text,
  colors,
} from '../lib';
import { createReservation } from '../api/reservations';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useReservationStore } from '../store/reservation-store';
import { useTicketFormatter } from '../hooks/use-ticket-formatter';

export function ConfirmPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const { outboundTicket, inboundTicket } = useReservationStore();
  const { formatTime, formatDate } = useTicketFormatter();

  const departureName = searchParams.get('departure');
  const arrivalName = searchParams.get('arrival');
  const tripType = searchParams.get('tripType') || 'ONE_WAY';

  const adult = Number(searchParams.get('adult')) || 0;
  const child = Number(searchParams.get('child')) || 0;
  const infant = Number(searchParams.get('infant')) || 0;

  const totalPassengers =
    `어른 ${adult}명` + (child ? `, 어린이 ${child}명` : '') + (infant ? `, 유아 ${infant}명` : '');

  const { mutateAsync: reserve } = useMutation({
    mutationFn: createReservation,
    onSuccess: data => {
      navigate('/complete', { state: { reservationId: data.reservationId } });
    },
    onError: () => {
      alert(t('confirmPage.reserveFailed'));
    },
  });

  const handleReserve = async () => {
    if (!outboundTicket) {
      return;
    }

    const count = {
      adults: adult,
      children: child,
      newborn: infant,
    };

    if (tripType === 'ROUND' && inboundTicket) {
      await reserve({
        type: 'ROUND',
        outboundTicketId: outboundTicket.id,
        inboundTicketId: inboundTicket.id,
        count,
      });
    } else {
      await reserve({
        type: 'ONE_WAY',
        ticketId: outboundTicket.id,
        count,
      });
    }
  };

  const handleSelectAgain = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('ticketId');
    newParams.delete('outboundTicketId');
    newParams.delete('inboundTicketId');
    newParams.delete('step');
    newParams.delete('departureDate');
    newParams.delete('returnDate');
    navigate(`/search?${newParams.toString()}`);
  };

  if (!outboundTicket) {
    return (
      <Flex direction="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        <Text>잘못된 접근입니다.</Text>
        <Spacing size={16} />
        <Button onClick={handleSelectAgain}>홈으로 돌아가기</Button>
      </Flex>
    );
  }

  return (
    <>
      <NavigationBar
        left={
          <Assets.Icon name="icon-arrow-left-mono" shape={{ width: 32, height: 32 }} onClick={() => navigate(-1)} />
        }
        title={t('confirmPage.title')}
      />

      <Spacing size={24} />

      <ListHeader
        title={<ListHeader.TitleParagraph fontWeight="bold">{t('confirmPage.tripInfo')}</ListHeader.TitleParagraph>}
      />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top={t('confirmPage.route')}
            topProps={{ fontSize: 14, color: colors.grey600 }}
            bottom={`${departureName} → ${arrivalName}`}
            bottomProps={{ fontSize: 16, color: colors.grey900 }}
          />
        }
      />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top={t('confirmPage.tripType')}
            topProps={{ fontSize: 14, color: colors.grey600 }}
            bottom={tripType === 'ROUND' ? t('searchPage.roundTrip') : t('searchPage.oneWay')}
            bottomProps={{ fontSize: 16, color: colors.grey900 }}
          />
        }
      />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top={t('confirmPage.passengers')}
            topProps={{ fontSize: 14, color: colors.grey600 }}
            bottom={totalPassengers}
            bottomProps={{ fontSize: 16, color: colors.grey900 }}
          />
        }
      />

      <Border height={16} />

      <ListHeader
        title={<ListHeader.TitleParagraph fontWeight="bold">{t('confirmPage.outbound')}</ListHeader.TitleParagraph>}
      />

      <ListRow
        contents={
          <div>
            <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: 8 }}>
              <Text fontSize={16} fontWeight="bold" color={colors.grey900}>
                {formatDate(outboundTicket.departureTime)}
              </Text>
              <Text fontSize={14} color={colors.grey600}>
                {outboundTicket.busNumber}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={8}>
              <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                {formatTime(outboundTicket.departureTime)}
              </Text>
              <Text fontSize={14} color={colors.grey500}>
                →
              </Text>
              <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                {formatTime(outboundTicket.arrivalTime)}
              </Text>
            </Flex>
          </div>
        }
      />

      {inboundTicket && (
        <>
          <Border height={16} />
          <ListHeader
            title={<ListHeader.TitleParagraph fontWeight="bold">{t('confirmPage.inbound')}</ListHeader.TitleParagraph>}
          />
          <ListRow
            contents={
              <div>
                <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: 8 }}>
                  <Text fontSize={16} fontWeight="bold" color={colors.grey900}>
                    {formatDate(inboundTicket.departureTime)}
                  </Text>
                  <Text fontSize={14} color={colors.grey600}>
                    {inboundTicket.busNumber}
                  </Text>
                </Flex>
                <Flex alignItems="center" gap={8}>
                  <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                    {formatTime(inboundTicket.departureTime)}
                  </Text>
                  <Text fontSize={14} color={colors.grey500}>
                    →
                  </Text>
                  <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
                    {formatTime(inboundTicket.arrivalTime)}
                  </Text>
                </Flex>
              </div>
            }
          />
        </>
      )}

      <FixedBottomCTA.Double
        fullWidth={true}
        leftButton={
          <Button theme="dark" style="weak" onClick={handleSelectAgain}>
            {t('confirmPage.selectAgain')}
          </Button>
        }
        rightButton={
          <Button theme="primary" onClick={handleReserve}>
            {t('confirmPage.reserve')}
          </Button>
        }
      />
    </>
  );
}
