'use client';

import {
  GithubSVG,
  InstagramSVG,
  LinkedinSVG,
  TelegramSVG,
  WebSVG,
} from '@/icons/index';
import { SocialMedia, SocialMediaType } from '@/types/types';
import { useState } from 'react';
import URLMark from './URLMark';
import OtherLink from './OtherLink';

interface SocialsLinksProps {
  socialList: SocialMedia[];
  onChange: (socialList: SocialMedia[]) => void;
}

function SocialsLinks({ socialList, onChange }: SocialsLinksProps) {
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

  const socialChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: SocialMediaType,
  ) => {
    const url = event.target.value;

    const updatedList = socialList.map((item) =>
      item.type === id ? { ...item, url } : item,
    );

    if (!updatedList.some((item) => item.type === id)) {
      updatedList.push({ type: id, url });
    }

    onChange(updatedList);
  };

  return (
    <>
      <div className="mb-[30px] flex w-full flex-col rounded-2xl border border-solid border-gray-B40 px-4 py-[22px]">
        <h2 className="mb-4 text-base font-bold text-blue-B50">
          Socials/Links
        </h2>
        {SOCIAL_LIST.map(({ svg, id, placeholder }) => (
          <label
            key={id}
            htmlFor={id}
            className="mb-[14px] flex w-full min-w-fit items-center gap-[14px] overflow-auto"
          >
            {svg}
            <input
              id={id}
              type="url"
              className="h-[54px] w-full flex-grow rounded-2xl border border-solid border-gray-B40 px-4 text-sm font-semibold text-black placeholder:font-medium"
              placeholder={`Enter ${placeholder} address`}
              onChange={(event) =>
                socialChangeHandler(event, id as SocialMediaType)
              }
            />
          </label>
        ))}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-14 w-full rounded-3xl bg-yellow-primary text-sm font-semibold text-blue-secondary disabled:bg-gray-B30"
        >
          Add links
        </button>
      </div>

      <OtherLink
        isOpen={isOpen}
        socialList={socialList}
        onChange={onChange}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default SocialsLinks;
