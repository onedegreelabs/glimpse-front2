import { SadFaceSVG } from '@/icons/index';

function NotFound() {
  return (
    <main className="absolute left-1/2 top-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-[1.125rem]">
      <SadFaceSVG />
      <div className="flex gap-2 text-white">
        <p className="text-base font-bold">404.</p>
        <p>This page could not be found.</p>
      </div>
    </main>
  );
}

export default NotFound;
