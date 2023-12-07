import { prisma} from '@/scripts'
import { UpdatePageForm } from '@/app/components/page-form';

export default async function Page({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const page = await prisma.contentpages.findUnique({
        where: {
            cpageid: id
        }
    })


    return <UpdatePageForm page={page} />

}