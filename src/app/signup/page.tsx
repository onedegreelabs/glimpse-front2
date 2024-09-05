import { ArrowSVG2 } from '@/icons/index';
import { getJobCategories } from '@/lib/apis/server/userApi';
import ProfileImage from './_components/ProfileImage';
import JobCategory from './_components/JobCategory';
import SocialsLinks from './_components/SocialsLinks';

async function SignupPage() {
  const jobCategories = await getJobCategories();

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
        <ProfileImage />
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
        <JobCategory jobCategories={jobCategories} />
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
        <SocialsLinks />
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
