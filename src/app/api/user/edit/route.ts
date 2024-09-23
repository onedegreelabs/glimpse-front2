import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const PATCH = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const formData = await request.formData();

  const response = await fetch(`${END_POINT}/users`, {
    method: 'PATCH',
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const { message, errorCode } = await response.json();
    return NextResponse.json(
      {
        status: response.status,
        message,
        errorCode,
      },
      { status: response.status },
    );
  }

  const result = await response.json();

  return NextResponse.json(result);
};
