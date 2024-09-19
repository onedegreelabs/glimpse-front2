'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SigninFormInputs } from '@/types/types';
import Message from '@/components/Message';
import EmailAccessForm from './EmailAccessForm';
import EmailVerificationCode from './EmailVerificationCode';

function SigninFunnel({ eventId }: { eventId: string }) {
  const formMethod = useForm<SigninFormInputs>();
  const {
    formState: { errors },
  } = formMethod;

  const [toastMessage, setToastMessage] = useState({
    message: '',
    isErrors: false,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const handleMessage = ({
    message,
    isErrors = true,
  }: {
    message: string;
    isErrors?: boolean;
  }) => {
    setToastMessage({ message, isErrors });
  };

  const STEP_COMPONENTS = [
    <EmailAccessForm
      handleNextStep={handleNextStep}
      handleMessage={handleMessage}
    />,
    <EmailVerificationCode handleMessage={handleMessage} eventId={eventId} />,
  ] as const;

  return (
    <section className="py-dynamic relative flex h-full flex-grow flex-col justify-between px-[26px]">
      <FormProvider {...formMethod}>
        {STEP_COMPONENTS[currentStep]}
      </FormProvider>
      {toastMessage.message && (
        <div className="absolute bottom-12 left-1/2 w-11/12 -translate-x-1/2 transform">
          <Message
            errors={errors}
            message={toastMessage.message}
            isErrors={toastMessage.isErrors}
            onClose={() => handleMessage({ message: '' })}
          />
        </div>
      )}
    </section>
  );
}

export default SigninFunnel;
