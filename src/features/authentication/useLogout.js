import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { logout } from '../../services/apiAuth';

function useLogout() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success(`Logout successfully!`);
      navigate('/login', { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export { useLogout };
