'use server';

import { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } from '@/constant/constant';
import { jwtVerify } from 'jose';

export default async function isValidJWT(
  token: string,
  type: 'ACCESS' | 'REFRESH',
): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(
      type === 'ACCESS' ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
    );
    await jwtVerify(token, secret);

    return true;
  } catch (err) {
    return false;
  }
}
