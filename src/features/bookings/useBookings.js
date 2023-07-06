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
  const page = Number(searchParams.get('page')) || 1;

  // Query
  const {
    isLoading: isLoadingBookings,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Prefetching
  const numberOfPage = Math.ceil(count / PAGE_SIZE);

  if (page < numberOfPage) {
    const pagePrefetch = page + 1;
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, pagePrefetch],
      queryFn: () => getBookings({ filter, sortBy, pagePrefetch }),
    });
  }

  if (page > 1) {
    const pagePrefetch = page - 1;
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, pagePrefetch],
      queryFn: () => getBookings({ filter, sortBy, pagePrefetch }),
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
