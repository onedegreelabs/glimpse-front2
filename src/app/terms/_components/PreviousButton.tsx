'use client';

import { useRouter } from 'next/navigation';

function PreviousButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="border-main-color mt-6 w-56 rounded-[3rem] border border-solid py-3 text-center"
    >
      기존 페이지로 이동
    </button>
  );
}

export default PreviousButton;
