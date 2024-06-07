import { prisma} from '@/scripts'
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {PayOrderButtonApp} from '@/app/components/pay-order-button-app'
import moment from 'moment';
import { formatAmount } from '@/app/utils/utils';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Page({params}: {params: {refpay: string}}) {
    const {refpay} = params;

    const item = await prisma.transactions.findFirst({
      where: {orderref: refpay},
      select: {orderref:true, customerid:true, customername:true, customeremail:true, paymentstatus:true, amount:true, productname:true, updatedAt:true}
    })

    const userid = item?.customerid

    const user = await prisma.users.findUnique({
        where: {
            id: userid
        },
        select: {id:true, name:true, email:true, password:true, updatedAt:true}
    })

    return (
        <div className='p-3 bg-white'>
                      <div className="w-full md:w-[1200px] mx-auto flex justify-start items-center">
        <div className='hidden md:block'>
          <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Order Payment", href: "/orderpay", active: true },
          ]}
        />
        </div>
      </div>

        <div className='w-full md:w-[1200px]  mx-auto p-3 md:p-5 bg-white'>


  <div>
            <h3 className='my-3'>Order for {item?.productname} at {moment(item?.updatedAt).format('Do MMM YYYY HH:mma')}</h3>

    <div className='row'>
      <div className='col-md-6 my-3'>
        {user && <p>Name: {user.name}</p>}
        </div>
        {item && <div className='col-md-6 my-3'>
        Amount: {formatAmount(item?.amount)}<br />
        {item?.amount > 0 && <PayOrderButtonApp user={user} item={item} redirecturl='exp1' />}<br />
</div>}
      </div>
      <div>

      </div>
    </div>

  </div>

       </div>
    )

    }