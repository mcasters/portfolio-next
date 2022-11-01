import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export default function useUser({ redirectTo = '' } = {}) {
  const { data, error } = useSWR('/api/cookies', );

  useEffect(() => {
    if (!redirectTo || !data) return;

    if (redirectTo && data) Router.push(redirectTo);
  }, [data, redirectTo]);

  return { data, error };
}