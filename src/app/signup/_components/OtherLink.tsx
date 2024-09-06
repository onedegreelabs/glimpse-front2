import BottomModal from '@/components/BottomModal';
import { Controller, useForm } from 'react-hook-form';
import { SocialMedia, SocialMediaType } from '@/types/types';
import { URL_REGEX } from '@/constant/constant';
import { useState } from 'react';
import ErrorMessage from '@/components/ErrorMessage';
import URLMark from './URLMark';

interface OtherLinkProps {
  socialList: SocialMedia[];
  onChange: (socialList: SocialMedia[]) => void;
  handleCloseModal: () => void;
  isOpen: boolean;
}

function OtherLink({
  socialList,
  onChange,
  handleCloseModal,
  isOpen,
}: OtherLinkProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<{ othersLinks: SocialMedia[] }>({
    defaultValues: {
      othersLinks: [
        { type: 'OTHERS1', url: '' },
        { type: 'OTHERS2', url: '' },
      ],
    },
  });

  const [urls, setUrls] = useState([
    { id: 'OTHERS1', url: '' },
    { id: 'OTHERS2', url: '' },
  ]);

  const othersChangeHandler = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newUrls = [...urls];
    newUrls[index].url = event.target.value;
    setUrls(newUrls);
  };

  const handleSave = () => {
    const updatedSocialList = socialList.map((item) => {
      const updatedItem = urls.find((urlItem) => urlItem.id === item.type);
      return updatedItem ? { ...item, url: updatedItem.url } : item;
    });

    urls.forEach((urlItem) => {
      if (!updatedSocialList.some((item) => item.type === urlItem.id)) {
        updatedSocialList.push({
          type: urlItem.id as SocialMediaType,
          url: urlItem.url,
        });
      }
    });

    onChange(updatedSocialList);
    handleCloseModal();
  };

  const isButtonDisabled = urls.every((urlItem) => urlItem.url === '');

  return (
    isOpen && (
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
              className="mb-[14px] flex w-full items-center gap-[14px]"
            >
              <URLMark />
              <Controller
                name={`othersLinks.${index}.url`}
                control={control}
                rules={{
                  pattern: {
                    value: URL_REGEX,
                    message: 'Please enter a valid URL',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id={item.id}
                    className="h-[54px] w-full flex-grow rounded-2xl border border-solid px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
                    placeholder="Enter URL address"
                    type="url"
                    onChange={(event) => {
                      field.onChange(event);
                      othersChangeHandler(index, event);
                    }}
                    value={urls[index].url}
                  />
                )}
              />
            </label>
          ))}
          <button
            type="button"
            className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
            onClick={handleSubmit(handleSave)}
            disabled={isButtonDisabled}
          >
            <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
              Save
            </p>
          </button>
        </div>
        {Object.values(errors).length > 0 && (
          <ErrorMessage
            errors={errors}
            message="Please enter a valid URL"
            onClose={() => clearErrors()}
          />
        )}
      </BottomModal>
    )
  );
}

export default OtherLink;
