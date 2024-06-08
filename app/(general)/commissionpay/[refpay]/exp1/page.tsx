import { prisma} from '@/scripts'
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {PayCommissionButtonApp} from '@/app/components/pay-commission-button-app'
import moment from 'moment';
import { formatAmount } from '@/app/utils/utils';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Page({params}: {params: {refpay: string}}) {
    const {refpay} = params;

    const customer = await prisma.users.findFirst({
        where: {
            commission_payment_ref: refpay
        },
        select: {id:true, name:true, email:true, phone:true, commission_payment_ref:true, commissions_outstanding:true, updatedAt:true}
    })

    const user = JSON.parse(JSON.stringify(customer))

    return (
        <div className='p-3 bg-white'>
                      <div className="w-full md:w-[1200px] mx-auto flex justify-start items-center">
        <div className='hidden md:block'>
          <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Commission Payment", href: "/commissionpay", active: true },
          ]}
        />
        </div>
      </div>

        <div className='w-full md:w-[1200px]  mx-auto p-3 md:p-5 bg-white'>


{user &&

  <div>
            <h3 className='my-3'>Outstanding commission as at {moment(user?.updatedAt).format('Do MMM YYYY HH:mma')}</h3>

    <div className='row'>
      <div className='col-md-6 my-3'>
        Name: {user?.name}<br />
        Outstanding commission: {formatAmount(user?.commissions_outstanding)}<br />
        {user?.commissions_outstanding > 0 && <PayCommissionButtonApp name={user?.name} email={user?.email} phone={user?.phone} userid={user?.id} outstanding={user?.commissions_outstanding} paymentref={user?.commission_payment_ref} redirecturl='exp1' />}<br />

      </div>
      <div>

      </div>
    </div>

  </div>}

       </div>
            </div>
    )

    }