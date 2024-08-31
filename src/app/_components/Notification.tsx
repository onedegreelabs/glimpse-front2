'use client';

import { useEffect } from 'react';

function Notification() {
  useEffect(() => {
    const isChecked = localStorage.getItem('isChecked');
    const now = new Date();

    const fivePM = new Date();
    fivePM.setHours(17, 0, 0, 0);

    if (isChecked || now > fivePM) return;

    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `* 이메일 인증이 안되어도 당황하지 마시고, 빌딩 포커스(디너 타임)가 시작되는 5:00 PM에 다시 접속 해주세요. 
(4:30 PM 까지 구글 폼을 제출하신 분들만 접속 가능 합니다.)`,
      )
    ) {
      localStorage.setItem('isChecked', 'true');
    }
  }, []);

  return null;
}

export default Notification;
