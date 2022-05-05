/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useCallback } from 'react';

const sittingFetch: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

type IinitState<T = any> = {
  data: T;
  loading: boolean;
  error: null | string;
};

const initState: IinitState = {
  data: {},
  loading: true,
  error: null,
};

export const useFetch = <T = any>(
  url: string,
  sitting: RequestInit = sittingFetch
): IinitState<T> => {
  const [state, setState] = useState(initState);

  const request = useCallback(
    () =>
      (async () => {
        try {
          const response = await fetch(url, sitting);
          if (response.ok) {
            const data = await response.json();
            setState({ ...state, data, loading: false });
          }
        } catch (err) {
          if (err instanceof TypeError) {
            const error = err.message;
            setState({ ...state, error });
          }
        }
      })(),
    []
  );

  useEffect(() => {
    request();
  }, []);

  return useMemo(() => state, [state]);
};
