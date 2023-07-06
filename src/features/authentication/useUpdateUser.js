import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateCurrentUser } from '../../services/apiAuth';

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success(`User account successfully updated`);
      // queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isLoading,
    mutate,
  };
}

export { useUpdateUser };
