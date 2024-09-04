import { ArrowSVG2, PlusSVG } from '@/icons/index';

function SignupPage() {
  return (
    <main className="text-gr min-h-screen w-full bg-white text-gray-B80">
      <header className="my-[6px] px-1 py-[10px]">
        <button type="button" aria-label="back-router" className="px-1 py-1">
          <ArrowSVG2 className="size-4 rotate-180 transform stroke-black stroke-2" />
        </button>
      </header>
      <div className="relative h-1 w-full bg-gray-B25">
        <span className="absolute top-0 h-1 w-4 bg-blue-B50" />
      </div>
      <section className="w-full px-[26px] pt-[30px]">
        <h1 className="mb-[50px] text-xl font-bold text-blue-B50">
          Register your profile card
        </h1>
        <div className="flex justify-center">
          <label
            htmlFor="image-upload"
            aria-label="input-profile-image"
            className="flex size-20 cursor-pointer items-center justify-center rounded-full bg-gray-B27"
          >
            <PlusSVG />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
