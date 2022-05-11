/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';

const sittingFetch: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

type IinitState = {
  loading: boolean;
  error: null | string;
};

const initState: IinitState = {
  loading: true,
  error: null,
};

export const useFetch = <T = any>(
  url: string,
  sitting: RequestInit = sittingFetch
) => {
  const [state, setState] = useState(initState);
  const [data, setData] = useState<T>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url, sitting);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setState({ ...state, loading: false });
        }
      } catch (err) {
        if (err instanceof TypeError) {
          const error: string = err.message;
          setState({ ...state, error });
        }
      }
    })();
  }, []);

  return useMemo(() => ({ ...state, data }), [state]);
};
