import { useEffect } from 'react';
import { useGetMeQuery } from '@/store/auth/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setLoading, logout } from '@/store/auth/authSlice';

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (data?.success && data.user) {
      dispatch(setCredentials({ user: data.user }));
    } else if (isError) {
      dispatch(logout());
    } else {
      dispatch(setLoading(false));
    }
  }, [data, isLoading, isError, dispatch]);

  return <>{children}</>;
};
