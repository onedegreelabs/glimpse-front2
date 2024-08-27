import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accessTokenReissuance } from './lib/apis/server/authApi';
import { TokenInfo } from './types/types';

const isTokenExpired = (token: string) => {
  const decoded = jwtDecode<{ exp?: number }>(token) as TokenInfo;
  const currentTime = Date.now() / 1000;

  if (decoded.exp && decoded.exp < currentTime) {
    throw new Error('accessToken expired');
  }

  return decoded.userId;
};

const setCookie = (response: NextResponse, name: string, value: string) => {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });
};

const extractUserIdFromToken = (token: string) => {
  const decoded = jwtDecode<{ sub?: string }>(token) as TokenInfo;
  return decoded.userId;
};

const handleTokenReissuance = async (
  request: NextRequest,
  refreshToken?: string,
) => {
  const response = NextResponse.redirect(request.url);

  if (refreshToken) {
    try {
      const { accessToken, refreshToken: newRefreshToken } = await (
        await accessTokenReissuance(refreshToken)
      ).json();

      const userId = extractUserIdFromToken(accessToken);
      response.headers.set('X-User-Id', `${userId}` || '');

      setCookie(response, 'accessToken', accessToken);
      setCookie(response, 'refreshToken', newRefreshToken);

      return response;
    } catch (error) {
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
};

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let userId = null;

  if (accessToken) {
    try {
      userId = isTokenExpired(accessToken);
      const response = NextResponse.next();

      response.headers.set('X-User-Id', `${userId}` || '');

      return response;
    } catch (error) {
      return handleTokenReissuance(request, refreshToken);
    }
  }

  if (refreshToken) {
    return handleTokenReissuance(request, refreshToken);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|error).*)',
    },
  ],
};
