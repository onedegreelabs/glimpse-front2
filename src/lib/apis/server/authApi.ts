import { FetchError } from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

const extractTokensFromHeaders = (headers: Headers) => {
  const accessToken = headers
    .get('Set-Cookie')
    ?.split('accessToken=')[1]
    ?.split(';')[0];
  const refreshToken = headers
    .get('Set-Cookie')
    ?.split('refreshToken=')[1]
    ?.split(';')[0];
  return { accessToken, refreshToken };
};

export const accessTokenReissuance = async (
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
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

  const { accessToken, refreshToken: newRefreshToken } =
    extractTokensFromHeaders(response.headers);

  if (!accessToken || !newRefreshToken) {
    throw new Error('토큰 재발급 후 토큰 값 없음');
  }

  return { accessToken, refreshToken: newRefreshToken };
};
