import {
  ArrowSVG2,
  ArrowSVG3,
  GithubSVG,
  InstagramSVG,
  LinkSVG,
  LinkedinSVG,
  PlusSVG,
  TelegramSVG,
  WebSVG,
} from '@/icons/index';

function SignupPage() {
  const SOCIAL_LIST = [
    { svg: <WebSVG className="size-6" />, id: 'website' },
    { svg: <InstagramSVG className="size-6" />, id: 'Instagram' },
    { svg: <LinkedinSVG className="size-6" />, id: 'LinkedIn' },
    { svg: <GithubSVG className="size-6" />, id: 'GitHub' },
    { svg: <TelegramSVG className="size-6" />, id: 'Telegram' },
    {
      svg: (
        <div className="flex size-6 items-center justify-center rounded-full bg-blue-B50">
          <LinkSVG className="size-3 fill-yellow-primary" />
        </div>
      ),
      id: 'URL',
    },
  ];

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
      <section className="w-full px-[26px] pb-[50px] pt-[30px]">
        <h1 className="mb-[50px] text-xl font-bold text-blue-B50">
          Register your profile card
        </h1>
        <div className="mb-[30px] flex justify-center">
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
        <input
          className="mb-4 h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
          placeholder="Name"
        />
        <div className="relative mb-7 h-64 w-full rounded-2xl border border-solid border-gray-B40 px-4 pb-8 pt-4 has-[:focus]:border-2 has-[:focus]:border-black">
          <textarea
            placeholder="Brief intro"
            className="size-full resize-none text-sm font-semibold outline-none placeholder:font-medium"
          />
          <div className="text-right text-xs font-light text-gray-B45">
            0/500
          </div>
        </div>
        <h2 className="mb-4 text-base font-bold text-blue-B50">Job category</h2>
        <button
          type="button"
          className="relative mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 text-sm font-semibold text-gray-B80/55"
        >
          Select job category
          <ArrowSVG3 className="absolute -right-7 top-5 size-16 fill-gray-B40" />
        </button>
        <h2 className="mb-4 text-base font-bold text-blue-B50">Job title</h2>
        <input
          className="mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
          placeholder="e.g.) Product Manager"
        />
        <h2 className="mb-4 text-base font-bold text-blue-B50">
          Company/Organization
        </h2>
        <input
          className="mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
          placeholder="e.g.) Glimpse"
        />
        <div className="mb-[30px] flex w-full flex-col rounded-2xl border border-solid border-gray-B40 px-4 py-[22px]">
          <h2 className="mb-4 text-base font-bold text-blue-B50">
            Socials/Links
          </h2>
          {SOCIAL_LIST.map(({ svg, id }) => (
            <label
              key={id}
              htmlFor={id}
              className="mb-[14px] flex items-center gap-[14px]"
            >
              {svg}
              <input
                id={id}
                className="h-[54px] flex-grow rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
                placeholder={`Enter ${id} address`}
                type="url"
              />
            </label>
          ))}
          <button
            type="button"
            className="h-14 w-full rounded-3xl bg-yellow-primary text-sm font-semibold text-blue-secondary disabled:bg-gray-B30"
          >
            Add links
          </button>
        </div>
        <button
          type="submit"
          className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
        >
          <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
            Start Networking
          </p>
        </button>
      </section>
    </main>
  );
}

export default SignupPage;
