'use client';

import { MAX_FILE_SIZE_MB } from '@/constant/constant';
import { CrossSVG, PersonSVG, PlusSVG } from '@/icons/index';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ProfileImage({
  initalImage,
  onChange,
  flagImageAsDeleted,
}: {
  initalImage: string;
  onChange: (image: File | null) => void;
  flagImageAsDeleted: () => void;
}) {
  const [profileImage, setProfileImage] = useState(initalImage);

  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        toast.error('Please upload a photo smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;

        setProfileImage(base64Image);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }

    // input 초기화
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = '';
  };

  const deleteImageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setProfileImage('');
    onChange(null);
    flagImageAsDeleted();
  };

  const handleEditClick = () => {
    const fileInput = document.getElementById(
      'image-upload',
    ) as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="my-7 flex justify-center">
      <label
        htmlFor="image-upload"
        aria-label="input-profile-image"
        className="relative flex size-[6.25rem] cursor-pointer items-center justify-center rounded-full border border-solid border-gray-B50 bg-white"
      >
        {profileImage ? (
          <>
            <button
              type="button"
              onClick={deleteImageHandler}
              aria-label="delete-image"
              className="absolute -right-3 -top-3"
            >
              <CrossSVG className="size-6 fill-blue-B50" />
            </button>
            <Image
              src={profileImage}
              alt="profile"
              fill
              sizes="80px"
              className="rounded-full object-cover object-center"
            />
          </>
        ) : (
          <PersonSVG className="h-12 w-[2.894rem]" />
        )}
        <button
          type="button"
          className="absolute -right-2 bottom-3 flex size-8 items-center justify-center rounded-full bg-blue-B50 p-2 text-xs font-medium text-yellow-primary"
          onClick={handleEditClick}
          aria-label="edit-profile-image"
        >
          <PlusSVG className="size-5 fill-white" />
        </button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={uploadImageHandler}
        />
      </label>
    </div>
  );
}

export default ProfileImage;
