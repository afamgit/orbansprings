import { prisma } from '@/scripts';
import { UpdateTeamForm } from '@/app/components/team-form';

export default async function Team({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const team = await prisma.team_members.findUnique({
        where: {
            tmemberid: id
        }
    })


    return <UpdateTeamForm team={team} />

}