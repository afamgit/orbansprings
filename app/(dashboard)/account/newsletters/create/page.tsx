import { AddNewsletterForm } from '@/app/components/newsletter-form';
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { getProfileFromUser, getProfileUser } from '@/app/utils/data';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add newsletter',
};

export default async function Page() {

  const userInfo = await auth()

  const profile = await getProfileFromUser(userInfo?.user.email || '')

      return (
        <main className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-col justify-start items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Newsletters',
                href: '/account/newsletters',
              },
              {
                label: 'Add newsletter',
                href: '/account/newsletters/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddNewsletterForm username={profile?.username || ''} />
        </main>
      )
}