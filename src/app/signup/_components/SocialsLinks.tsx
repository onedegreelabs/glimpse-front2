'use client';

import {
  GithubSVG,
  InstagramSVG,
  LinkedinSVG,
  TelegramSVG,
  WebSVG,
} from '@/icons/index';
import { SocialMediaType } from '@/types/types';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { URL_REGEX } from '@/constant/constant';
import URLMark from './URLMark';
import OtherLink from './OtherLink';

function SocialsLinks() {
  const { control } = useFormContext();

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

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="mb-[30px] flex w-full flex-col rounded-2xl border border-solid border-gray-B40 px-4 py-[22px]">
        <h2 className="mb-4 text-base font-bold text-blue-B50">
          Socials/Links
        </h2>
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
                className="mb-[14px] flex w-full min-w-fit items-center gap-[14px] overflow-auto"
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
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-14 w-full rounded-3xl bg-yellow-primary text-sm font-semibold text-blue-secondary disabled:bg-gray-B30"
        >
          Add links
        </button>
      </div>

      {isOpen && <OtherLink handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default SocialsLinks;
