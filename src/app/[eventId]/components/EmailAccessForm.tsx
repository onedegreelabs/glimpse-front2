'use client';

import Link from 'next/link';
import { CheckSVG, LockSVG } from '@/icons/index';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';

function ErrorMessage({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="absolute w-full -top-3 bg-[#E7001B] py-3 px-[10px] text-xs text-white rounded-md">
      {message}
    </p>
  );
}

type EmailFormInputs = {
  email: string;
  isAgreedToTerms: boolean;
};

function EmailAccessForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailFormInputs>();
  const onSubmit: SubmitHandler<EmailFormInputs> = (data) => console.log(data);
  const SubmitError: SubmitErrorHandler<EmailFormInputs> = () => {
    if (errors.email) {
      setErrorMessage(errors.email.message ?? '');
    } else if (errors.isAgreedToTerms) {
      setErrorMessage(errors.isAgreedToTerms.message ?? '');
    }
  };

  return (
    <section className="fixed inset-0 backdrop-blur-sm max-w-sm mx-auto bg-gradient-to-b from-transparent to-white via-white from-15% via-60%">
      <form
        className="flex items-center size-full flex-col"
        onSubmit={handleSubmit(onSubmit, SubmitError)}
      >
        <div className="flex items-center justify-center size-full mt-16 flex-col gap-3 ">
          <LockSVG />
          <p className="text-center max-w-[262px] mb-[18px] text-blue-secondary font-bold">
            Unlock to view participants profiles and find your matches!
          </p>
          <input
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address.',
              },
            })}
            type="email"
            placeholder="Enter your registration email"
            className="bg-white p-2 rounded-md w-[246px] outline-blue-secondary outline outline-1 focus:outline-2"
          />
        </div>
        <div className="flex flex-col gap-4 w-full px-7 mb-14">
          <div className="flex gap-2 relative">
            {errorMessage && (
              <ErrorMessage
                message={errorMessage}
                onClose={() => setErrorMessage('')}
              />
            )}
            <input
              {...register('isAgreedToTerms', {
                required: 'You must agree to the terms and conditions.',
              })}
              id="agreement"
              type="checkbox"
              className="hidden peer"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="agreement"
              className="size-4 cursor-pointer rounded-sm border border-solid border-gray-500 fill-none peer-checked:bg-yellow-primary peer-checked:fill-blue-secondary"
            >
              <CheckSVG className="size-4" />
            </label>
            <div className="text-xs">
              <div>
                <Link
                  href="/"
                  className="text-blue-secondary underline underline-offset-1"
                >
                  개인정보수집
                </Link>{' '}
                및{' '}
                <Link
                  href="/"
                  className="text-blue-secondary underline underline-offset-1"
                >
                  이용동의
                </Link>
              </div>
              Consent to Collect and Use Personal Information
            </div>
          </div>
          <button
            type="submit"
            disabled={!(watch('email') && watch('isAgreedToTerms'))}
            className="w-full disabled:bg-gray-B30 h-14 rounded-lg bg-yellow-primary group"
          >
            <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
              Unlock
            </p>
          </button>
        </div>
      </form>
    </section>
  );
}

export default EmailAccessForm;
