import { ArrowSVG, ArrowSVG2 } from '@/icons/index';

function MatchSlide() {
  return (
    <article className="fixed bottom-7 left-1/2 z-event h-[66px] w-[234px] -translate-x-1/2 transform rounded-full bg-custom-gradient">
      <div className="relative mx-0.5 my-0.5 flex h-[62px] w-[230px] items-center justify-center rounded-full bg-blue-B50">
        <div className="absolute left-[5px] flex size-14 cursor-pointer items-center justify-center rounded-full bg-yellow-primary">
          <ArrowSVG className="h-[14px] w-[17px]" />
        </div>
        <div className="ml-7 bg-gradient-to-r from-blue-B30 to-yellow-primary bg-clip-text text-transparent">
          <p className="select-none text-lg font-bold">Go match</p>
        </div>
        <div className="absolute right-6 flex gap-1">
          <ArrowSVG2 />
          <ArrowSVG2 />
        </div>
      </div>
    </article>
  );
}

export default MatchSlide;
