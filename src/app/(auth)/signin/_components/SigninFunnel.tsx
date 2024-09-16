'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SigninFormInputs } from '@/types/types';
import ErrorMessage from '@/components/ErrorMessage';
import EmailAccessForm from './EmailAccessForm';

function SigninFunnel() {
  const formMethod = useForm<SigninFormInputs>();
  const {
    formState: { errors },
  } = formMethod;

  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const STEP_COMPONENTS = [
    <EmailAccessForm
      handleNextStep={handleNextStep}
      handleErrorMessage={handleErrorMessage}
    />,
  ] as const;

  return (
    <section className="relative flex h-full flex-grow flex-col justify-between px-[26px] py-12">
      <FormProvider {...formMethod}>
        {STEP_COMPONENTS[currentStep]}
      </FormProvider>
      {errorMessage && (
        <div className="absolute bottom-12 left-1/2 w-full -translate-x-1/2 transform">
          <ErrorMessage
            errors={errors}
            message={errorMessage}
            onClose={() => setErrorMessage('')}
          />
        </div>
      )}
    </section>
  );
}

export default SigninFunnel;
