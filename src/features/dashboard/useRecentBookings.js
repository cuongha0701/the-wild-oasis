import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const today = new Date().setHours(23, 59, 59, 999);

  const queryDate = subDays(today, numDays).toISOString();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', queryDate, `last-${numDays}`],
  });

  return { data, isLoading, error };
}

export { useRecentBookings };
