import PreviousButton from './_components/PreviousButton';

const page = () => (
  <div className="z-10 flex flex-col items-center justify-center gap-2 px-4 py-6 text-white">
    <p>
      사전에 제출한 매칭 신청서의 정보를 바탕으로, 매칭을 위해 다른 참가자들이
      내 정보를 볼 수 있도록 글림스에 내 프로필 카드를 등록하는 것에 동의합니다.
    </p>{' '}
    <p>
      I agree to register a profile card on Glimpse, allowing other participants
      to view my information, based on the match application (Google form) I
      submitted earlier.
    </p>
    <PreviousButton />
  </div>
);

export default page;
