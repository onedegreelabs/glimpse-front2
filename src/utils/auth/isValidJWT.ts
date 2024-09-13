'use server';

import { jwtVerify } from 'jose';

export default async function isValidJWT(
  token: string,
  type: 'ACCESS' | 'REFRESH',
): Promise<boolean> {
  try {
    const JWT_SECRET =
      type === 'ACCESS'
        ? process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET
        : process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET;

    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);

    return true;
  } catch (err) {
    return false;
  }
}
