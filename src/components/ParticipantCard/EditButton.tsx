import { PencilSVG } from '@/icons/index';
import { useRouter } from 'next/navigation';

interface EditButtonProps {
  eventId: string;
  isDetail?: boolean;
}

function EditButton({ isDetail, eventId }: EditButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/${eventId}/edit`);
      }}
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
