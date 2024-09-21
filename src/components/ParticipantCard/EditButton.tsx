import { PencilSVG } from '@/icons/index';
// import { useRouter } from 'next/navigation';

interface EditButtonProps {
  isDetail?: boolean;
}

function EditButton({ isDetail }: EditButtonProps) {
  //   const router = useRouter();

  return (
    <button
      type="button"
      className={`flex size-10 items-center justify-center rounded-full ${
        isDetail
          ? 'border border-solid border-black bg-white fill-blue-B50'
          : 'bg-white/10 fill-white'
      }`}
      aria-label="edit-info"
    >
      <PencilSVG />
    </button>
  );
}

export default EditButton;
