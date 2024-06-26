import { AddSubscriptionForm } from '@/app/components/subscription-form';
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Subscription Plan',
};

export default async function Page() {

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Subscription Plans',
                href: '/account/subscriptions',
              },
              {
                label: 'Create subscription plan',
                href: '/account/subscriptions/create',
                active: true,
              },
            ]}
            />
            </div>

         <AddSubscriptionForm />
        </main>
      )
}