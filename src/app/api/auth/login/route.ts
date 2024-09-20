import appendCookiesToResponse from '@/utils/auth/appendCookiesToResponse';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET;

export const GET = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const email = request.nextUrl.searchParams.get('email');
  const code = request.nextUrl.searchParams.get('code');

  const base64Credentials = Buffer.from(`${email}:${code}`).toString('base64');

  const response = await fetch(`${END_POINT}/auth/token?p=email`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  });

  if (!response.ok) {
    const { message, errorCode } = await response.json();

    if (errorCode === 'G01001') {
      if (!JWT_SECRET) {
        return NextResponse.json({
          status: 500,
          message: 'JWT 비밀 키가 설정되지 않았습니다.',
        });
      }

      try {
        const secret = new TextEncoder().encode(JWT_SECRET);

        const token = await new SignJWT({ email })
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(secret);

        const nextResponse = NextResponse.json(
          {
            status: response.status,
            message,
            errorCode,
          },
          { status: response.status },
        );

        nextResponse.cookies.set('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60,
          path: '/',
        });

        return nextResponse;
      } catch (error) {
        return NextResponse.json({
          status: 500,
          message: `JWT 생성 중 오류 발생: ${error}`,
        });
      }
    }

    return NextResponse.json(
      {
        status: response.status,
        message,
        errorCode,
      },
      { status: response.status },
    );
  }

  const { statusCode, data } = await response.json();

  const nextResponse = new NextResponse(
    JSON.stringify({ status: statusCode, data }),
    {
      status: statusCode,
      headers: { ...response.headers, 'Content-Type': 'application/json' },
    },
  );

  try {
    appendCookiesToResponse(response, nextResponse);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
  return nextResponse;
};
