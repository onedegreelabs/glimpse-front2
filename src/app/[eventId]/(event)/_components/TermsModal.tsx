'use client';

import Modal from '@/components/Modal';

function TermsModal({ closeHandler }: { closeHandler: () => void }) {
  return (
    <Modal closeHandler={closeHandler}>
      <p className="text-sm font-bold">
        Consent to Collect and Use Personal Information
      </p>
      <p className="py-2 text-xs">
        I agree to register my profile card on Glimpse, allowing other
        participants to view my profile information for networking.
        <br />
        <br />- Information Collected and Used: Name, Email, Brief intro,
        Profile photo, Job category, Job title, Company/Organization,
        Socials/Links
      </p>
      <p className="mt-4 pt-1 text-sm font-bold">개인정보 수집 및 이용 동의</p>
      <p className="py-2 text-xs">
        네트워킹을 위해 다른 참가자들이 내 정보를 볼 수 있도록 글림스에 내
        프로필 카드를 등록하는 것에 동의합니다.
        <br />
        <br />- 수집 및 이용 항목: 이름, 이메일, 자기소개, 프로필 사진, 직군,
        직업, 회사/소속, SNS/링크
      </p>

      <button
        type="button"
        onClick={closeHandler}
        className="mt-4 flex h-[2.875rem] w-full items-center justify-center rounded-lg bg-yellow-600 font-bold text-blue-secondary"
      >
        Got it
      </button>
    </Modal>
  );
}

export default TermsModal;
