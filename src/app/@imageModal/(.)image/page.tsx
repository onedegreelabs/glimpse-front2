'use client';

import Modal from '@/components/Modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function PhotosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();
  const { src } = searchParams;

  const closeModalHandler = () => {
    router.back();
  };

  return (
    <Modal closeHandler={closeModalHandler}>
      <Image
        src={src}
        alt="full-image"
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </Modal>
  );
}

export default PhotosPage;
