import { prisma } from '@/scripts';
import { UpdateTeamForm } from '@/app/components/team-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit team member',
  };

export default async function Team({params}: {params: any}) {
    const {id} = await params;

    const team = await prisma.team_members.findUnique({
        where: {
            tmemberid: parseInt(id)
        }
    })


    return (
      <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
      <div className='w-full flex justify-end items-start'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          {
            label: 'Team Members',
            href: '/account/teams',
          },
          {
            label: 'Edit team member',
            href: `/account/teams/${id}/edit`,
            active: true,
          },
        ]}
        />
        </div>
<UpdateTeamForm team={team} />
</main>)
}