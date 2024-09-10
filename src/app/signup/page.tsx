import { getJobCategories } from '@/lib/apis/server/userApi';
import SignupClient from './_components/SignupClient';

async function SignupPage() {
  const jobCategories = await getJobCategories();

  return <SignupClient jobCategories={jobCategories} />;
}

export default SignupPage;
