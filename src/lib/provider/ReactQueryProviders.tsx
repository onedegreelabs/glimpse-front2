'use client';

import { useState } from 'react';
import { FetchError } from '@/types/types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function ReactQueryProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => {
    const newQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
        mutations: {
          onError: (error: unknown) => {
            if (error instanceof Error) {
              console.error(error);
            }
          },
          retry: (failureCount, error: unknown) => {
            if (error instanceof Error) {
              const fetchError = error as FetchError;
              if (fetchError.status === 401) {
                return true;
              }
            }
            return false;
          },
        },
      },
      queryCache: new QueryCache({
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.error(error);
          }
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
