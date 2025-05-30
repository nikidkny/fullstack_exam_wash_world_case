import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store/store';
import { login, signup } from '../authSlice';
import { LoginUserDto } from './loginUserDto';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, error } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const loginUser = useCallback(
    async (loginUser: LoginUserDto) => {
      const resultAction = await dispatch(login(loginUser));
      if (login.fulfilled.match(resultAction)) {
        return { success: true };
      }

      if (login.rejected.match(resultAction)) {
        const errorMsg = resultAction.payload as string;
        return { success: false, error: errorMsg };
      }

      return { success: false, error: 'Unknown error' };
    },
    [dispatch]
  );


  return {
    login: loginUser,
    loading,
    user,
    error,
  };
};
