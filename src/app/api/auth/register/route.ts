import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const POST = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const data = await request.formData();

  const response = await fetch(`${END_POINT}/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: data,
  });

  if (!response.ok) {
    const { message, errorCode } = await response.json();
    console.log(message);
    console.log(errorCode);
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

  console.log(result);

  return NextResponse.json(result);
};
