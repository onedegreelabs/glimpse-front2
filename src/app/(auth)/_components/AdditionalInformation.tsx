import { RegisterInputs, SocialMediaType } from '@/types/types';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { GithubSVG, InstagramSVG, LinkedinSVG, WebSVG } from '@/icons/index';
import { URL_REGEX } from '@/constant/constant';
import Title from '@/components/Title';
import URLMark from './URLMark';
import Hashtags from './Hashtags';

interface AdditionalInformationProps {
  isOpenAdditionalInfo: boolean;
  control: Control<RegisterInputs, any>;
  errors: FieldErrors<RegisterInputs>;
}

function AdditionalInformation({
  control,
  isOpenAdditionalInfo,
  errors,
}: AdditionalInformationProps) {
  const SOCIAL_LIST = [
    {
      svg: <WebSVG className="size-6" />,
      placeholder: 'Website URL',
      id: 'WEBSITE',
    },
    {
      svg: <InstagramSVG className="size-6" />,
      placeholder: 'Instagram handle or URL',
      id: 'INSTAGRAM',
    },
    {
      svg: <LinkedinSVG className="size-6" />,
      placeholder: 'LinkedIn handle or URL',
      id: 'LINKEDIN',
    },
    {
      svg: <GithubSVG className="size-6" />,
      placeholder: 'GitHub handle or URL',
      id: 'GITHUB',
    },
    // {
    //   svg: <TelegramSVG className="size-6" />,
    //   placeholder: 'Telegram',
    //   id: 'TELEGRAM',
    // },
    {
      svg: <URLMark />,
      placeholder: 'Other URL',
      id: 'OTHERS',
    },
  ];

  return (
    <ul
      className={`mb-14 flex flex-col gap-6 ${isOpenAdditionalInfo ? '' : 'hidden'}`}
    >
      <Title title="Tags" required={false}>
        <Controller
          name="tagIds"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Hashtags tagList={field.value} updateTagList={field.onChange} />
          )}
        />
      </Title>
      <Title title="Socials/Links" required={false}>
        <p className="-mt-1 mb-4 text-sm font-light">
          Please add the desired link.
        </p>
        <div className="flex flex-col">
          {SOCIAL_LIST.map(({ svg, id, placeholder }) => (
            <Controller
              key={id}
              name={id as SocialMediaType}
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  if (
                    !value ||
                    id === 'INSTAGRAM' ||
                    id === 'LINKEDIN' ||
                    id === 'GITHUB'
                  )
                    return true;

                  const isValid = URL_REGEX.test(value);
                  return isValid || 'Please check the URL address.';
                },
              }}
              render={({ field }) => (
                <>
                  <label
                    htmlFor={id}
                    className="flex w-full min-w-fit items-center gap-[0.875rem] overflow-auto"
                  >
                    {svg}
                    <input
                      {...field}
                      id={id}
                      className={`${errors[id as SocialMediaType] ? 'border-red-B30' : 'mb-[0.625rem] border-gray-B40'} h-[3.375rem] w-full flex-grow rounded-2xl border border-solid px-4 text-sm font-semibold text-black placeholder:font-medium`}
                      placeholder={placeholder}
                    />
                  </label>
                  {errors[id as SocialMediaType]?.message && (
                    <p className="mb-[0.625rem] mt-2 text-xs text-red-B30">
                      {errors[id as SocialMediaType]!.message}
                    </p>
                  )}
                </>
              )}
            />
          ))}
        </div>
      </Title>
    </ul>
  );
}

export default AdditionalInformation;
