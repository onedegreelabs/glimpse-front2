'use client';

import { useState } from 'react';
import { FetchError } from '@/types/types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { reissue } from '../apis/authApi';

function ReactQueryProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const accessTokenReissuance = async () => {
    try {
      await reissue();
      return true;
    } catch (error) {
      router.refresh();
      return false;
    }
  };

  const [queryClient] = useState(() => {
    const newQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
        mutations: {
          retry: (failureCount, error: unknown) => {
            if (error instanceof Error) {
              const fetchError = error as FetchError;
              if (fetchError.status === 401) {
                accessTokenReissuance();
                return failureCount === 0;
              }
            }

            // eslint-disable-next-line no-console
            console.error(error);
            return false;
          },
        },
      },
      queryCache: new QueryCache({
        onError: async (error: unknown) => {
          if (error instanceof Error) {
            const fetchError = error as FetchError;
            if (fetchError.status === 401) {
              const isReissued = await accessTokenReissuance();
              if (isReissued) {
                queryClient.invalidateQueries();
              }
            }
          }

          // eslint-disable-next-line no-console
          console.error(error);
        },
      }),
    });

    return newQueryClient;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProviders;
