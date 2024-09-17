'use client';

import { useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

function Message({
  isErrors,
  onClose,
  errors,
  message = '',
}: {
  isErrors: boolean;
  onClose: () => void;
  errors?: FieldErrors;
  message?: string;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const firstMessage =
    isErrors && errors && Object.values(errors).length > 0
      ? ((Object.values(errors)[0]?.message as string) ?? message)
      : message;

  return firstMessage ? (
    <p
      className={`${isErrors ? 'bg-[#E7001B]' : 'bg-blue-B50'} w-full max-w-sm rounded-md px-[10px] py-3 text-xs text-white`}
    >
      {firstMessage}
    </p>
  ) : null;
}

export default Message;
