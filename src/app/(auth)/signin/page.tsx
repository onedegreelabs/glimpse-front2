// import Button from '@/components/Button';
import { ArrowSVG4 } from '@/icons/index';

const page = () => {
  console.log();

  return (
    <main className="flex h-dvh w-full flex-col bg-white text-gray-B80">
      <header className="px-4 py-[10px]">
        <button type="button" aria-label="back-router">
          <ArrowSVG4 className="size-6 fill-black" />
        </button>
      </header>
      <section className="flex h-full flex-grow flex-col justify-between px-[26px] py-12">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="text-xl font-bold text-blue-B50">
            Enter your email address
          </h1>
          <input
            placeholder="e.g. addresses12@gmail.com"
            className="mb-4 h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
          />
        </div>
        {/* <Button>Continue with email</Button> */}
      </section>
    </main>
  );
};

export default page;
