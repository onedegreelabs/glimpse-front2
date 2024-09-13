import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accessTokenReissuance } from './lib/apis/server/authApi';
import isValidJWT from './utils/auth/isValidJWT';

const handleTokenReissuance = async (
  request: NextRequest,
  refreshToken?: string,
) => {
  const response = NextResponse.redirect(request.url);

  try {
    if (refreshToken) {
      const isAccessTokenValid = await isValidJWT(refreshToken, 'REFRESH');

      if (isAccessTokenValid) {
        return await accessTokenReissuance(refreshToken, response);
      }
    }
    throw new Error('Missing refreshToken');
  } catch (error) {
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
};

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (accessToken) {
    const isAccessTokenValid = await isValidJWT(accessToken, 'ACCESS');

    if (isAccessTokenValid) {
      return NextResponse.next();
    }

    return handleTokenReissuance(request, refreshToken);
  }

  if (refreshToken) {
    return handleTokenReissuance(request, refreshToken);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
