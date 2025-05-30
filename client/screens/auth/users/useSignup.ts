import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store/store';
import { CreateUserDto } from './createUserDto';
import { signup } from '../authSlice';

export const useSignup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, error } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const signupUser = useCallback(
    async (newUser: CreateUserDto) => {
      const resultAction = await dispatch(signup(newUser));
      if (signup.fulfilled.match(resultAction)) {
        return { success: true };
      }

      if (signup.rejected.match(resultAction)) {
        const errorMsg = resultAction.payload as string;
        return { success: false, error: errorMsg };
      }

      return { success: false, error: 'Unknown error' };
    },
    [dispatch]
  );


  return {
    signup: signupUser,
    loading,
    user,
    error,
  };
};
