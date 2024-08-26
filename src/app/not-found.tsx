import { SadFaceSVG } from '@/icons/index';

function NotFound() {
  return (
    <main className="z-20 flex flex-col items-center justify-center gap-[18px]">
      <SadFaceSVG />
      <div className="flex gap-2 text-white/60">
        <p className="text-base font-bold">404.</p>
        <p>This page could not be found.</p>
      </div>
    </main>
  );
}

export default NotFound;
