import { Spinner2 } from '@/icons/index';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RefreshClient from './_components/RefreshClient';

async function page({ searchParams }: { searchParams: { from?: string } }) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');
  const fromUrl =
    searchParams.from ?? '/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all';

  if (!refreshToken) redirect(fromUrl);

  return (
    <main className="relative h-screen w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <RefreshClient formURL={fromUrl} />
        <Spinner2 className="animate-spin" />
      </div>
    </main>
  );
}

export default page;
