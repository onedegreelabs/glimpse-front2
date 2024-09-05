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
import { SocialMedia, SocialMediaType } from '@/types/types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function URLMark() {
  return (
    <div className="flex size-6 items-center justify-center rounded-full bg-blue-B50">
      <LinkSVG className="size-3 fill-yellow-primary" />
    </div>
  );
}

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
  const [urls, setUrls] = useState([
    { id: uuidv4(), url: '' },
    { id: uuidv4(), url: '' },
  ]);
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

  const othersChangeHandler = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newUrls = [...urls];
    newUrls[index].url = event.target.value;
    setUrls(newUrls);
  };

  const handleSave = () => {
    const updatedSocialMedia = urls.map((item) => ({
      type: 'OTHERS' as SocialMediaType,
      url: item.url,
    }));
    onChange([...socialList, ...updatedSocialMedia]);
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
            className="mb-[14px] flex items-center gap-[14px]"
          >
            {svg}
            <input
              id={id}
              className="h-[54px] flex-grow rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
              placeholder={`Enter ${placeholder} address`}
              type="url"
              onChange={(event) =>
                socialChangeHandler(event, id as SocialMediaType)
              }
            />
          </label>
        ))}
        {/* <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-14 w-full rounded-3xl bg-yellow-primary text-sm font-semibold text-blue-secondary disabled:bg-gray-B30"
        >
          Add links
        </button> */}
      </div>
      {isOpen && (
        <BottomModal closeHandler={handleCloseModal}>
          <div className="flex flex-col gap-[10px] px-[26px] pb-[50px]">
            <h1 className="mb-3 text-lg font-bold text-blue-B50">
              Add Socials/Links
            </h1>
            {urls.map((item, index) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label
                key={item.id}
                htmlFor={item.id}
                className="mb-[14px] flex items-center gap-[14px]"
              >
                <URLMark />
                <input
                  id={item.id}
                  className="h-[54px] flex-grow rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
                  placeholder="Enter URL address"
                  type="url"
                  value={item.url}
                  onChange={(event) => othersChangeHandler(index, event)}
                />
              </label>
            ))}
            <button
              type="button"
              className="mt-4 h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
              onClick={handleSave}
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
