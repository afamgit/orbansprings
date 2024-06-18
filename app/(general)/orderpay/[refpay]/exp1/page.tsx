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

    const order = await prisma.transactions.findFirst({
      where: {orderref: refpay},
      select: {orderref:true, id:true, customerid:true, customername:true, customeremail:true, paymentstatus:true, amount:true, productname:true, updatedAt:true}
    })

    const userid = order?.customerid || ''

    const customer = await prisma.users.findUnique({
        where: {
            id: parseInt(userid)
        },
        select: {id:true, name:true, email:true, phone:true, updatedAt:true}
    })

    return (
        <div className='p-3 bg-white text-gray-800'>
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

        <div className='w-full md:w-[1200px]  mx-auto p-3 md:p-5 bg-white text-gray-800'>


  <div>
            <h3 className='my-3'>Order for {order?.productname} at {moment(order?.updatedAt).format('Do MMM YYYY HH:mma')}</h3>

    <div className='row'>
      <div className='col-md-6 my-3'>
        {customer && <p>Name: {customer.name}</p>}
        </div>
        {order && <div className='col-md-6 my-3'>
        Amount: {formatAmount(order?.amount)}<br />
        {order?.amount > 0 && order?.paymentstatus === 'Unpaid' ? 
        <PayOrderButtonApp name={customer?.name} email={customer?.email} phone={customer?.phone} orderid={order?.id} orderref={order?.orderref} amount={order?.amount} redirecturl='exp1' />
        :
        <div className='my-2'>The payment status for this order is {order?.paymentstatus}</div>
        }
</div>}
      </div>
      <div>

      </div>
    </div>

  </div>

       </div>
    )

    }