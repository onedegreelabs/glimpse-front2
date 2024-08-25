import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accessTokenReissuance } from './lib/apis/server/authApi';

const isTokenExpired = (token: string) => {
  const decoded = jwtDecode<{ exp?: number }>(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp && decoded.exp < currentTime) {
    throw new Error('accessToken expired');
  }
};

const handleTokenReissuance = async (request: NextRequest) => {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const response = NextResponse.redirect(request.url);

  if (refreshToken) {
    try {
      return await accessTokenReissuance(refreshToken, response);
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

  if (accessToken) {
    try {
      isTokenExpired(accessToken);
      return NextResponse.next();
    } catch (error) {
      return handleTokenReissuance(request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
