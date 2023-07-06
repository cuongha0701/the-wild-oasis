import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

function useSignUp() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success(
        `Account successfully created! PLease verify the new accout from the user's email address`
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export { useSignUp };
