import { FetchError, TokenInfo } from '@/types/types';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

const extractUserIdFromToken = (token: string): number | undefined => {
  const decoded = jwtDecode<{ sub?: string }>(token) as TokenInfo;
  return decoded.userId;
};

const appendCookiesToResponse = (
  response: Response,
  nextResponse: NextResponse,
) => {
  const cookies = response.headers.get('Set-Cookie');
  if (!cookies) throw new Error('토큰 재발급 쿠키 없음');

  const updatedCookies = cookies
    .split(/,(?=[^;]*=)/)
    .map(
      (cookie) => `${cookie.replace(/; SameSite=[^;]*/g, '')}; SameSite=Strict`,
    );

  updatedCookies.forEach((cookie) =>
    nextResponse.headers.append('Set-Cookie', cookie.trim()),
  );
};

export const accessTokenReissuance = async (
  refreshToken: string,
  nextResponse: NextResponse<unknown>,
): Promise<NextResponse> => {
  const response = await fetch(`${END_POINT}/auth/token`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '토큰 재발급 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  appendCookiesToResponse(response, nextResponse);

  const accessToken = response.headers.get('accessToken');
  if (accessToken) {
    const userId = extractUserIdFromToken(accessToken);
    if (userId) {
      nextResponse.headers.set('X-User-Id', `${userId}`);
    }
  }

  return nextResponse;
};
