'use client';

import { Spinner2 } from '@/icons/index';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Page({ searchParams }: { searchParams: { from?: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.push(searchParams.from ?? '/404');
  }, [router, searchParams.from]);

  return (
    <main className="relative h-screen w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Spinner2 className="animate-spin" />
      </div>
    </main>
  );
}

export default Page;
