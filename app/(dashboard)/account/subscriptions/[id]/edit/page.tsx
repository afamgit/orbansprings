import { prisma} from '@/scripts'
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { UpdateSubscriptionForm } from '@/app/components/subscription-form';

export const metadata: Metadata = {
    title: 'Update subscription plan',
  };

export default async function Page({params}: {params: any}) {
    const {id} = await params;

    const plan = await prisma.subscription_plans.findUnique({
        where: {
            subplanid: parseInt(id)
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Subscription plans',
            href: '/account/subscriptions',
          },
          {
            label: 'Edit subscription plan',
            href: `/account/subscriptions/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateSubscriptionForm plan={plan} />
</main>
    )

}