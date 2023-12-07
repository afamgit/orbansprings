import { prisma } from '@/scripts';
import { UpdateMeterForm } from '@/app/components/meter-form';
import { fetchCustomers } from '@/app/utils/data';

export default async function Team({params}: {params: {id: string}}) {
    const id = parseInt(params.id);

    const meter = await prisma.meters.findUnique({
        where: {
            meterid: id
        }
    })

    const customers = await fetchCustomers()

    return <UpdateMeterForm meter={meter} customers={customers} />

}