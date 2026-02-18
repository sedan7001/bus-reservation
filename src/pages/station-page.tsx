import { useState, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { overlay } from 'overlay-kit';
import { Assets, colors, ListRow, NavigationBar, Spacing, Text, TextField, Toast, Flex } from '../lib';
import { searchStations } from '../api/stations';
import { queryKeys, queryOptions } from '../api/query-keys';
import { EmptyState } from '../ui';
import { useDebounce } from '../hooks/use-debounce';

export function StationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const type = searchParams.get('type') as 'departure' | 'arrival';
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: stations, isPending } = useQuery({
    queryKey: queryKeys.stations.search(debouncedQuery),
    queryFn: () => searchStations(debouncedQuery),
    placeholderData: keepPreviousData,
    ...queryOptions.stations,
  });

  const filteredStations = stations?.filter(station => station.name.includes(debouncedQuery));

  const handleStationClick = (stationName: string) => {
    const currentDeparture = searchParams.get('departure');
    const currentArrival = searchParams.get('arrival');

    if (type === 'departure' && stationName === currentArrival) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          message={t('stationPage.sameStationError')}
          isOpen={isOpen}
          close={() => {
            close();
            unmount();
          }}
        />
      ));
      return;
    }

    if (type === 'arrival' && stationName === currentDeparture) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          message={t('stationPage.sameStationError')}
          isOpen={isOpen}
          close={() => {
            close();
            unmount();
          }}
        />
      ));
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (type === 'departure') {
      params.set('departure', stationName);
    } else if (type === 'arrival') {
      params.set('arrival', stationName);
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <NavigationBar
        left={
          <Assets.Icon name="icon-arrow-left-mono" shape={{ width: 32, height: 32 }} onClick={() => navigate(-1)} />
        }
        title={type === 'departure' ? t('stationPage.selectDeparture') : t('stationPage.selectArrival')}
      />

      <div style={{ padding: '16px 24px', position: 'relative' }}>
        <TextField
          type="text"
          placeholder={t('stationPage.placeholder')}
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label={t('stationPage.placeholder')}
        />
        {searchQuery.length > 0 && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="검색어 지우기"
            style={{
              position: 'absolute',
              right: 36,
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.grey400}>
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>
          </button>
        )}
      </div>

      <Spacing size={8} />

      {isPending ? (
        <Flex justifyContent="center" css={{ padding: 24 }}>
          <Text color={colors.grey500}>{t('common.loading')}</Text>
        </Flex>
      ) : filteredStations && filteredStations.length > 0 ? (
        <ul role="listbox" aria-label="터미널 목록" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {filteredStations.map(station => (
            <li key={station.name} role="option" aria-selected={false}>
              <ListRow
                contents={
                  <Text fontSize={16} color={colors.grey900}>
                    {station.name}
                  </Text>
                }
                onClick={() => handleStationClick(station.name)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState messageKey="stationPage.noResults" subMessageKey="stationPage.tryOther" />
      )}
    </>
  );
}
