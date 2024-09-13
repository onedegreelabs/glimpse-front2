'use server';

import { TokenInfo } from '@/types/types';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export default async function getUserInfo(): Promise<TokenInfo | null> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET,
    );

    const { payload } = await jwtVerify<TokenInfo>(accessToken, secret);

    return payload;
  } catch (error) {
    return null;
  }
}
