'use client';

import { useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

function ErrorMessage({
  errors,
  onClose,
}: {
  errors: FieldErrors;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const firstErrorMessage =
    Object.values(errors).length > 0
      ? (Object.values(errors)[0]?.message as string)
      : '';

  return (
    <p className="fixed bottom-11 w-full max-w-sm rounded-md bg-[#E7001B] px-[10px] py-3 text-xs text-white">
      {firstErrorMessage}
    </p>
  );
}

export default ErrorMessage;
