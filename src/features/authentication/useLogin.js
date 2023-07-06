import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/apiAuth';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], user);
      toast.success(`Login successfully!`);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, error, isLoading };
}

export { useLogin };
