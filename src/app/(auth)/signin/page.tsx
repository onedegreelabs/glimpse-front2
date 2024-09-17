import { ArrowSVG4 } from '@/icons/index';
import SigninFunnel from './_components/SigninFunnel';

const page = () => (
  <main className="relative z-0 flex h-dvh w-full flex-col bg-white text-gray-B80">
    <header className="px-4 pt-4">
      <button type="button" aria-label="back-router">
        <ArrowSVG4 className="size-6 fill-black" />
      </button>
    </header>
    <SigninFunnel />
    <div className="absolute top-0 -z-10 h-screen w-full bg-white" />
  </main>
);

export default page;
