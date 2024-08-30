'use client';

import { reissue } from '@/lib/apis/authApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function RefreshClient({ formURL }: { formURL: string }) {
  const router = useRouter();
  const { isSuccess, isError } = useQuery({
    queryKey: ['token'],
    queryFn: reissue,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess || isError) {
      router.push(formURL);
    }
  }, [formURL, isError, isSuccess, router]);

  return null;
}

export default RefreshClient;
