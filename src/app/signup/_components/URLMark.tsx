import { LinkSVG } from '@/icons/index';

function URLMark({ bgSize, svgSize }: { bgSize?: string; svgSize?: string }) {
  return (
    <div
      className={`${bgSize || 'size-6'} flex flex-shrink-0 items-center justify-center rounded-full bg-blue-B50`}
    >
      <LinkSVG className={`${svgSize || 'size-3'} fill-yellow-primary`} />
    </div>
  );
}

export default URLMark;
