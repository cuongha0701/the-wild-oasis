import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';

import { PAGE_SIZE } from '../../utils/constants';

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Filter
  const filterValue = searchParams.get('status') || 'all';
  const filter =
    filterValue === 'all' ? null : { field: 'status', value: filterValue };

  // Sort
  const sortByParam = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByParam.split('-');
  const sortBy = {
    field,
    direction,
  };

  // Pagination
  const page = parseInt(searchParams.get('page')) || 1;

  // Query
  const {
    isLoading: isLoadingBookings,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', { filter, sortBy, page }],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pagination prefetching
  const numberOfPage = Math.ceil(count / PAGE_SIZE);

  if (page < numberOfPage) {
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ['bookings', { filter, sortBy, page: page + 1 }],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ['bookings', { filter, sortBy, page: page - 1 }],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return {
    isLoadingBookings,
    bookings,
    error,
    count,
  };
}

export { useBookings };
