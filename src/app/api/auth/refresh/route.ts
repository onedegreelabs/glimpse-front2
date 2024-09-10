import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const PUT = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;

  const response = await fetch(`${END_POINT}/auth/token?p=email`, {
    method: 'PUT',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    const { message, errorCode } = await response.json();

    const nextResponse = NextResponse.json(
      {
        status: response.status,
        message,
        errorCode,
      },
      { status: response.status },
    );

    nextResponse.headers.append(
      'Set-Cookie',
      'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict',
    );
    nextResponse.headers.append(
      'Set-Cookie',
      'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict',
    );

    return nextResponse;
  }

  const { statusCode, data } = await response.json();

  const nextResponse = new NextResponse(
    JSON.stringify({ status: statusCode, data }),
    {
      status: statusCode,
      headers: { ...response.headers, 'Content-Type': 'application/json' },
    },
  );

  const cookies = response.headers.get('Set-Cookie');
  if (cookies) {
    const cookieArray = cookies.split(/,(?=[^;]*=)/);

    const updatedCookies = cookieArray.map(
      (cookie) => `${cookie.replace(/; SameSite=[^;]*/g, '')}; SameSite=Strict`,
    );

    updatedCookies.forEach((cookie) => {
      nextResponse.headers.append('Set-Cookie', cookie.trim());
    });
  } else {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  return nextResponse;
};
