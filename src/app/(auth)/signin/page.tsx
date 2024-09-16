import { ArrowSVG4 } from '@/icons/index';
import SigninFunnel from './_components/SigninFunnel';

const page = () => (
  <main className="flex h-dvh w-full flex-col bg-white text-gray-B80">
    <header className="px-4 py-[10px]">
      <button type="button" aria-label="back-router">
        <ArrowSVG4 className="size-6 fill-black" />
      </button>
    </header>
    <SigninFunnel />
  </main>
);

export default page;
