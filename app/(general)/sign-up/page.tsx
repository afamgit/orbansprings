import SignupForm from '@/app/components/signup-form';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen text-gray-900">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        
        <SignupForm />
      </div>
    </main>
  );
}