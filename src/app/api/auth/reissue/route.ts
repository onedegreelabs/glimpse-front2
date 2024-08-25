// pages/api/reissue-token.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({ message: 'No refresh token provided' });
  }

  try {
    const response = await fetch(`${END_POINT}/auth/token`, {
      method: 'PUT',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ message: errorData.message });
    }

    const accessToken = response.headers
      .get('Set-Cookie')
      ?.split('accessToken=')[1]
      .split(';')[0];
    const newRefreshToken = response.headers
      .get('Set-Cookie')
      ?.split('refreshToken=')[1]
      .split(';')[0];

    res.setHeader('Set-Cookie', [
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None`,
      `refreshToken=${newRefreshToken}; Path=/; HttpOnly; Secure; SameSite=None`,
    ]);

    return res.status(200).json({ message: 'Token reissued' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
