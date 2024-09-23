'use client';

import {
  AdditionalInfoList,
  BasicInfoList,
  FetchError,
  InitalUserInfo,
  JobCategorie,
  RegisterInputs,
  SigninFormInputs,
  SocialMediaType,
} from '@/types/types';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/apis/authApi';
import { useRouter } from 'next/navigation';
import { SOCIAL_MEDIA_KEYS } from '@/constant/constant';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import socialFormatUrl from '@/utils/socialFormatUrl';
import { captureException } from '@sentry/nextjs';
import Cookies from 'js-cookie';
import { BadgeSVG, InboxSVG } from '@/icons/index';
import { toast } from 'react-toastify';
import SignupHeader from './SignupHeader';
import BasicInformation from './BasicInformation';
import ProfileImage from './ProfileImage';
import AccordionButton from './AccordionButton';
import AdditionalInformation from './AdditionalInformation';

interface SignupClientProps {
  email?: string;
  eventId?: string;
  jobCategories: JobCategorie[];
  initalUserInfo?: InitalUserInfo;
}

function SignupClient({
  email,
  jobCategories,
  eventId,
  initalUserInfo,
}: SignupClientProps) {
  const isEditing = !email;

  const formMethods = useForm<RegisterInputs>({
    mode: 'onChange',
    defaultValues: {
      image: initalUserInfo?.initalImageFile,
      name: initalUserInfo?.name ?? '',
      intro: initalUserInfo?.intro ?? '',
      jobCategoryId: initalUserInfo?.jobCategory.id,
      jobTitle: initalUserInfo?.jobTitle ?? '',
      belong: initalUserInfo?.belong ?? '',
      tagIds: initalUserInfo?.tags ?? [],
      INSTAGRAM: initalUserInfo?.socialMediaObject.INSTAGRAM ?? '',
      WEBSITE: initalUserInfo?.socialMediaObject.WEBSITE ?? '',
      LINKEDIN: initalUserInfo?.socialMediaObject.LINKEDIN ?? '',
      GITHUB: initalUserInfo?.socialMediaObject.GITHUB ?? '',
      OTHERS: initalUserInfo?.socialMediaObject.OTHERS ?? '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
  } = formMethods;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const confirmationMessage =
        'Do you want to leave this site?\nChanges and progress you made will not be saved.';

      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const router = useRouter();

  const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(true);
  const [isOpenAdditionalInfo, setInOpenAdditionalInfo] = useState(true);

  const toggleBasicInfo = () => {
    setIsOpenBasicInfo((prev) => !prev);
  };

  const toggleAdditionalInfo = () => {
    setInOpenAdditionalInfo((prev) => !prev);
  };

  const formValues = watch();
  const isRequired = watch(['name', 'jobTitle', 'jobCategoryId']);

  const BASIC_INFO_LIST: Array<BasicInfoList> = [
    'name',
    'intro',
    'jobTitle',
    'jobCategoryId',
    'belong',
  ];

  const ADDITIONAL_INFO_LIST: Array<AdditionalInfoList> = [
    'tagIds',
    'GITHUB',
    'INSTAGRAM',
    'LINKEDIN',
    'WEBSITE',
    'OTHERS',
  ];

  const basicInfo = watch(BASIC_INFO_LIST);
  const additionalInfo = watch(ADDITIONAL_INFO_LIST);

  const isRequiredFieldsValid = isRequired.every((value) => value);

  const { mutate: handleSignup, isPending: signupPending } = useMutation({
    mutationFn: (data: FormData) => register(data),
    onSuccess: () => {
      Cookies.remove('eventId');
      router.push(`/${eventId}/all`);
      router.refresh();
    },
    onError: (error) => {
      const fetchError = error as FetchError;

      if (fetchError && fetchError.errorCode === 'G01002') {
        toast.error('This user already exists.');
      }

      toast.error('An unknown error occurred. Please contact support.');
      captureException(error);
    },
  });

  const processSocialMedia = (data: RegisterInputs) =>
    Object.entries(data)
      .filter(
        ([key, value]) =>
          SOCIAL_MEDIA_KEYS.includes(
            key as (typeof SOCIAL_MEDIA_KEYS)[number],
          ) && value,
      )
      .map(([type, value]) => ({
        type,
        url: socialFormatUrl(type as SocialMediaType, value),
      }));

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image);
    }

    const socialMedia = processSocialMedia(data);

    const { image, ...remainingData } = data;
    const filteredData = Object.fromEntries(
      Object.entries(remainingData).filter(
        ([key]) =>
          !SOCIAL_MEDIA_KEYS.includes(
            key as (typeof SOCIAL_MEDIA_KEYS)[number],
          ),
      ),
    );
    const reqData = {
      ...filteredData,
      email,
      tagIds: data.tagIds.map(({ id }) => id),
      socialMedia,
      method: 'EMAIL',
      terms: [{ termId: 2, agreed: true }],
    };

    formData.append('data', JSON.stringify(reqData));

    handleSignup(formData);
  };

  const onSubmitError: SubmitErrorHandler<SigninFormInputs> = (error) => {
    const errorTitle = Object.keys(error)[0];

    if (BASIC_INFO_LIST.includes(errorTitle as BasicInfoList)) {
      setIsOpenBasicInfo(true);
    } else if (
      ADDITIONAL_INFO_LIST.includes(errorTitle as AdditionalInfoList)
    ) {
      setInOpenAdditionalInfo(true);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-white text-gray-B80">
      <SignupHeader formValues={formValues} isEditing={isEditing} />
      <form
        className="flex w-full flex-grow flex-col justify-between px-[1.625rem] pb-[3.125rem] pt-[1.875rem]"
        onSubmit={handleSubmit(onSubmit, onSubmitError)}
      >
        <div>
          {!isEditing && (
            <>
              <h1 className="mb-1 text-xl font-bold text-blue-B50">
                Welcome to Glimpse!
              </h1>
              <p className="text-xs font-light">
                Complete your profile now,
                <br />
                enjoy hassle-free event registration later!
              </p>
            </>
          )}

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ProfileImage
                initalImage={initalUserInfo?.profileImageUrl ?? ''}
                onChange={field.onChange}
              />
            )}
          />

          <AccordionButton
            image={<BadgeSVG />}
            isOpen={isOpenBasicInfo}
            label="Basic Information"
            watchInfo={basicInfo}
            toggleHandler={toggleBasicInfo}
          />
          <BasicInformation
            initalUserInfo={initalUserInfo}
            isOpenBasicInfo={isOpenBasicInfo}
            control={control}
            jobCategories={jobCategories}
            setError={setError}
            errors={errors}
          />

          <AccordionButton
            image={<InboxSVG />}
            isOpen={isOpenAdditionalInfo}
            label="Additional Information"
            watchInfo={additionalInfo}
            toggleHandler={toggleAdditionalInfo}
          />
          <AdditionalInformation
            control={control}
            isOpenAdditionalInfo={isOpenAdditionalInfo}
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          disabled={!isRequiredFieldsValid || signupPending}
          isPending={signupPending}
        >
          Start Networking
        </Button>
      </form>
    </main>
  );
}

export default SignupClient;
