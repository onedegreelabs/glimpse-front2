'use client';

import BottomModal from '@/components/BottomModal';
import {
  GithubSVG,
  InstagramSVG,
  LinkSVG,
  LinkedinSVG,
  TelegramSVG,
  WebSVG,
} from '@/icons/index';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function URLMark() {
  return (
    <div className="flex size-6 items-center justify-center rounded-full bg-blue-B50">
      <LinkSVG className="size-3 fill-yellow-primary" />
    </div>
  );
}

function SocialsLinks() {
  const SOCIAL_LIST = [
    { svg: <WebSVG className="size-6" />, id: 'website' },
    { svg: <InstagramSVG className="size-6" />, id: 'Instagram' },
    { svg: <LinkedinSVG className="size-6" />, id: 'LinkedIn' },
    { svg: <GithubSVG className="size-6" />, id: 'GitHub' },
    { svg: <TelegramSVG className="size-6" />, id: 'Telegram' },
    {
      svg: <URLMark />,
      id: 'URL',
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
        {SOCIAL_LIST.map(({ svg, id }) => (
          <label
            key={id}
            htmlFor={id}
            className="mb-[14px] flex items-center gap-[14px]"
          >
            {svg}
            <input
              id={id}
              className="h-[54px] flex-grow rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
              placeholder={`Enter ${id} address`}
              type="url"
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
      {isOpen && (
        <BottomModal closeHandler={handleCloseModal}>
          <div className="flex flex-col gap-[10px] px-[26px] pb-[50px]">
            <h1 className="mb-3 text-lg font-bold text-blue-B50">
              Add Socials/Links
            </h1>
            {Array.from({ length: 2 }).map(() => {
              const id = uuidv4();
              return (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label
                  key={id}
                  htmlFor={id}
                  className="mb-[14px] flex items-center gap-[14px]"
                >
                  <URLMark />
                  <input
                    id={id}
                    className="h-[54px] flex-grow rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
                    placeholder="Enter URL address"
                    type="url"
                  />
                </label>
              );
            })}
            <button
              type="button"
              className="mt-4 h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
            >
              <p className="font-bold text-blue-secondary">Save</p>
            </button>
          </div>
        </BottomModal>
      )}
    </>
  );
}

export default SocialsLinks;
