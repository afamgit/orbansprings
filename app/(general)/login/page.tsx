import { headers } from 'next/headers';
import LoginForm from '@/app/components/login-form';
import { getProfileUser } from '@/app/utils/data';
import { auth } from '@/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
 
export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  const userInfo = await auth()

  const profile = await getProfileUser(userInfo?.user.email || '')

  // profile && redirect("/");

  console.log('profile', profile)

  
  return (
    <main className="flex items-center justify-center md:h-screen text-gray-100">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        
        <LoginForm />
        <p className='text-gray-700'>Don't have an account yet? <Link href='/sign-up'>Sign up</Link></p>
      </div>
    </main>
  );
}