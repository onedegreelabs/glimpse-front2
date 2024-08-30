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

const handleTokenReissuance = async (
  request: NextRequest,
  refreshToken?: string,
) => {
  const nextResponse = NextResponse.next();

  if (refreshToken) {
    try {
      const loginUrl = new URL('/refresh', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      const response = NextResponse.redirect(loginUrl);

      return await accessTokenReissuance(refreshToken, response);
    } catch (error) {
      nextResponse.cookies.delete('accessToken');
      nextResponse.cookies.delete('refreshToken');
      return nextResponse;
    }
  }

  nextResponse.cookies.delete('accessToken');
  nextResponse.cookies.delete('refreshToken');
  return nextResponse;
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
  } else if (refreshToken) {
    return handleTokenReissuance(request, refreshToken);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path*/all', '/:path*/match'],
};
