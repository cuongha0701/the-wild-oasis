import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const today = new Date().setHours(23, 59, 59, 999);
  const queryDate = subDays(today, numDays).toISOString();

  const {
    data: confirmedStays,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', queryDate, `last-${numDays}`],
  });

  // const confirmedStays = stays?.filter(
  //   (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  // );

  return { isLoading, confirmedStays, numDays, error };
}

export { useRecentStays };
