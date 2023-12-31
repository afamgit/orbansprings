import {AddTeamForm} from '@/app/components/team-form'
import Breadcrumbs from '@/app/ui/breadcrumbs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create team member',
};

export default async function Page() {

      return (
        <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-end items-start'>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
              {
                label: 'Teams',
                href: '/account/teams',
              },
              {
                label: 'Create team member',
                href: '/account/teams/create',
                active: true,
              },
            ]}
            />
            </div>
         <AddTeamForm />
        </main>
      )
}