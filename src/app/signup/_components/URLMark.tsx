import { LinkSVG } from '@/icons/index';

function URLMark({ size }: { size?: string }) {
  return (
    <div
      className={`${size || 'size-6'} flex flex-shrink-0 items-center justify-center rounded-full bg-blue-B50`}
    >
      <LinkSVG className="size-3 fill-yellow-primary" />
    </div>
  );
}

export default URLMark;
