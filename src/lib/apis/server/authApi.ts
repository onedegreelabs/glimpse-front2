import { FetchError } from '@/types/types';
import appendCookiesToResponse from '@/utils/auth/appendCookiesToResponse';
import { NextResponse } from 'next/server';

import { END_POINT } from '@/constant/constant';

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

  return nextResponse;
};
