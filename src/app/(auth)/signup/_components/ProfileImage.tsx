'use client';

import { CrossSVG, PersonSVG, PlusSVG } from '@/icons/index';
import Image from 'next/image';
import { useState } from 'react';

function ProfileImage({
  onChange,
}: {
  onChange: (image: File | null) => void;
}) {
  const [profileImage, setProfileImage] = useState('');

  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;

        setProfileImage(base64Image);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setProfileImage('');
    onChange(null);
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
        className="relative flex size-[100px] cursor-pointer items-center justify-center rounded-full border border-solid border-gray-B50 bg-white"
      >
        {profileImage ? (
          <>
            <button
              type="button"
              onClick={deleteImageHandler}
              aria-label="delete-image"
              className="absolute -right-3 -top-3"
            >
              <CrossSVG className="size-6" />
            </button>
            <Image
              src={profileImage}
              alt="profile"
              fill
              sizes="80px"
              className="rounded-full"
            />
          </>
        ) : (
          <PersonSVG className="h-12 w-[46.31px]" />
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
