import { Spinner2 } from '@/icons/index';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RefreshClient from './_components/RefreshClient';

async function page({ searchParams }: { searchParams: { from?: string } }) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) redirect('/404');

  return (
    <main className="relative h-screen w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <RefreshClient formURL={searchParams.from ?? '/404'} />
        <Spinner2 className="animate-spin" />
      </div>
    </main>
  );
}

export default page;
