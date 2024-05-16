import LoginForm from '@/app/components/login-form';
import { Metadata } from 'next';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen text-gray-100">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        
        <LoginForm />
        <p>Don't have an account yet? <Link href='/sign-up'>Sign up</Link></p>
      </div>
    </main>
  );
}