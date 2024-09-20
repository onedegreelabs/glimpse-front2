'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import TermsModal from './TermsModal';

function EmailAccessForm({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeTermsModal = () => {
    setIsOpen(false);
  };

  const handleRegisterClick = () => {
    Cookies.set('eventId', eventId);
  };

  return (
    <article className="fixed inset-0 z-blur mx-auto max-w-[386px] bg-blue-B50/60 text-gray-B80 backdrop-blur-[8px]">
      <div className="flex size-full flex-col items-center">
        <div className="mt-16 flex size-full w-[256px] flex-col items-center justify-center gap-3">
          <p className="mb-[40px] text-center font-bold text-yellow-primary">
            Register your participant card to view participants profiles and
            find your matches!
          </p>
          <Link
            href="/signin"
            onClick={handleRegisterClick}
            className="flex h-[54px] w-full items-center justify-center rounded-2xl bg-yellow-primary font-bold text-blue-secondary"
          >
            Register
          </Link>
        </div>
        <div className="mb-[26px] flex w-full flex-col gap-4 px-7">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-left text-xs text-yellow-primary underline underline-offset-2"
          >
            By registering your profile, you consent to the collection and use
            of personal information.
            <p>
              프로필을 등록하시면 개인정보 수집 및 이용에 동의하시게 됩니다.
            </p>
          </button>
        </div>
      </div>
      {isOpen && <TermsModal closeHandler={closeTermsModal} />}
    </article>
  );
}

export default EmailAccessForm;
