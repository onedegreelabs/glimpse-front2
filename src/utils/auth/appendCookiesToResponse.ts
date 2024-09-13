import { NextResponse } from 'next/server';

export default function appendCookiesToResponse(
  response: Response,
  nextResponse: NextResponse,
) {
  const cookies = response.headers.get('Set-Cookie');
  if (!cookies) throw new Error('토큰 쿠키 없음');

  const updatedCookies = cookies
    .split(/,(?=[^;]*=)/)
    .map(
      (cookie) => `${cookie.replace(/; SameSite=[^;]*/g, '')}; SameSite=Strict`,
    );

  updatedCookies.forEach((cookie) =>
    nextResponse.headers.append('Set-Cookie', cookie.trim()),
  );
}
