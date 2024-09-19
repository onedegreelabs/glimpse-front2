import { RegisterInputs, SocialMediaType } from '@/types/types';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  GithubSVG,
  InstagramSVG,
  LinkedinSVG,
  TelegramSVG,
  WebSVG,
} from '@/icons/index';
import { URL_REGEX } from '@/constant/constant';
import URLMark from './URLMark';
import Title from './Title';
import Hashtags from './Hashtags';

interface AdditionalInformationProps {
  control: Control<RegisterInputs, any>;
}

function AdditionalInformation({ control }: AdditionalInformationProps) {
  const SOCIAL_LIST = [
    {
      svg: <WebSVG className="size-6" />,
      placeholder: 'website',
      id: 'WEBSITE',
    },
    {
      svg: <InstagramSVG className="size-6" />,
      placeholder: 'Instagram',
      id: 'INSTAGRAM',
    },
    {
      svg: <LinkedinSVG className="size-6" />,
      placeholder: 'LinkedIn',
      id: 'LINKEDIN',
    },
    {
      svg: <GithubSVG className="size-6" />,
      placeholder: 'GitHub',
      id: 'GITHUB',
    },
    {
      svg: <TelegramSVG className="size-6" />,
      placeholder: 'Telegram',
      id: 'TELEGRAM',
    },
    {
      svg: <URLMark />,
      placeholder: 'URL',
      id: 'OTHERS',
    },
  ];

  return (
    <ul className="mb-14 flex flex-col gap-6">
      <Title title="Hashtags" required={false}>
        <Hashtags tagList={[]} />
      </Title>
      <Title title="Socials/Links" required={false}>
        <p className="-mt-1 text-sm font-light">Please add the desired link.</p>
        <div className="flex flex-col gap-[10px]">
          {SOCIAL_LIST.map(({ svg, id, placeholder }) => (
            <Controller
              key={id}
              name={id as SocialMediaType}
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  if (!value) return true;
                  const isValid = URL_REGEX.test(value);
                  return isValid || 'Please check the URL address.';
                },
              }}
              render={({ field }) => (
                <label
                  htmlFor={id}
                  className="flex w-full min-w-fit items-center gap-[14px] overflow-auto"
                >
                  {svg}
                  <input
                    {...field}
                    id={id}
                    className="h-[54px] w-full flex-grow rounded-2xl border border-solid border-gray-B40 px-4 text-sm font-semibold text-black placeholder:font-medium"
                    placeholder={`Enter ${placeholder} address`}
                  />
                </label>
              )}
            />
          ))}
        </div>
      </Title>
    </ul>
  );
}

export default AdditionalInformation;
