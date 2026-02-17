import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function useTicketFormatter() {
  const formatTime = (isoString: string) => {
    return format(new Date(isoString), 'a h:mm', { locale: ko });
  };

  const formatDate = (isoString: string) => {
    return format(new Date(isoString), 'M월 d일 (E)', { locale: ko });
  };

  const getDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const diffMin = (end - start) / (1000 * 60);
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return `${hours}시간 ${mins}분`;
  };

  return {
    formatTime,
    formatDate,
    getDuration,
  };
}
