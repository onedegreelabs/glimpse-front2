import { NextRequest, NextResponse } from 'next/server';

import { END_POINT } from '@/constant/constant';

export const POST = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const { tagName } = await request.json();

  const response = await fetch(`${END_POINT}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ tagName }),
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
