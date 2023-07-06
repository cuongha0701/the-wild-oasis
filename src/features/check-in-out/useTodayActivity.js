import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

function useTodayActivity() {
  const { isLoading, data, error } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  });

  return { isLoading, data, error };
}

export { useTodayActivity };
