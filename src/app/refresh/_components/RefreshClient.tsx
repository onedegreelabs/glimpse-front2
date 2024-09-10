'use client';

import { reissue } from '@/lib/apis/authApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function RefreshClient({ formURL }: { formURL: string }) {
  const { isSuccess, isError } = useQuery({
    queryKey: ['token'],
    queryFn: reissue,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess || isError) {
      window.location.href = formURL;
    }
  }, [isSuccess, isError, formURL]);

  return null;
}

export default RefreshClient;
