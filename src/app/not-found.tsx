import { SadFaceSVG } from '@/icons/index';

function NotFound() {
  return (
    <div className="z-20 my-auto flex flex-col items-center justify-center gap-[18px]">
      <SadFaceSVG />
      <div className="flex gap-2">
        <p className="text-base font-bold text-white/60">404.</p>
        <p className="text-white/60">This page could not be found.</p>
      </div>
    </div>
  );
}

export default NotFound;
