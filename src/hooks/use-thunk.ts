import { SerializedError } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';

import { useAppDispatch } from '../store/hooks';

type UseThunkReturn = [(arg?: any) => void, boolean, null | SerializedError];

export const useThunk = (thunk: any): UseThunkReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | SerializedError>(null);
  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    (arg: any) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: SerializedError) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};
