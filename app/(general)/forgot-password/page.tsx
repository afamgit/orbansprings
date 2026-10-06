import ForgotPasswordForm from '@/app/components/forgot-password-form';
import { getProfileUser } from '@/app/utils/data';
import { auth } from '@/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default async function ForgotPasswordPage() {
  const userInfo = await auth();

  if (userInfo?.user?.email) {
    const profile = await getProfileUser(userInfo.user.email);
    if (profile) redirect("/");
  }

  return (
    <main className="flex items-center justify-center md:h-screen text-gray-100">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <ForgotPasswordForm />
        <p className="text-gray-700 text-center text-sm">
          Remembered your password? <Link href="/login" className="text-sky-600 hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
