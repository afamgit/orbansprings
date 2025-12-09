import { prisma } from "@/scripts";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import moment from "moment";
import { statusBg } from "@/app/utils/snippets";
import { formatAmount } from "@/app/utils/utils";
import VendorOrderModal from "@/app/components/vendor-order-modal";
import { CompleteOrderForm } from "@/app/components/complete-order";
import { auth } from "@/auth";
import { getProfileUser } from "@/app/utils/data";
import Link from "next/link";
import MessageModal from "@/app/components/message-modal";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page({
  params,
}: {
  params:any,
}) 
 {
  const {id} = await params;

  const orderDb = await prisma.transactions.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const order = JSON.parse(JSON.stringify(orderDb))

  const getOrder = await prisma.transactions.findFirst({
    where: {
      orderref: order?.orderref,
    },
    select: {orderref:true, id:true, customerid:true, driverid:true, drivername:true}
  });


  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const userid = profile?.id || 1000


  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <MessageModal>
      <div className="w-[450px] p-5 rounded-xl p-3">
          <h3 className="text-4xl py-2">Order Completed!</h3>
          <p className="my-3 py-3">This order has been completed by driver {order?.drivername}. Click continue to exit this page</p>
          <Link className="w-full flex justify-center bg-sky-400 text-white p-4 rounded-xl text-xl" href={`/account/vendor-merchants/orders/${id}/order-detail`}>Continue</Link>
        </div>
      </MessageModal>
      <VendorOrderModal>
      <div className="w-[400px] px-2 rounded-xl p-3">
         
            <h2 className="text-2xl">User Info</h2>

  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Username</div>
  <div className="w-3/5">{order?.customername}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Email</div>
  <div className="w-3/5">{order?.customeremail}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Phone No</div>
  <div className="w-3/5">{order?.customerphone}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Location</div>
  <div className="w-3/5 px-1">{order?.customeraddress}</div>
</div>


<h2 className="text-2xl">Order Info</h2>

  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Order Reference</div>
  <div className="w-3/5">{order?.orderref}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Product</div>
  <div className="w-3/5">{order?.productname}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Amount</div>
  <div className="w-3/5">N{formatAmount(order?.amount)}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Date & Time</div>
  <div className="w-3/5">{moment(order?.createdAt).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Status</div>
  <div className="w-3/5"><span className={`${statusBg(order?.status || '')} px-2 py-1`}>{order?.status}</span>
  </div>
  </div>
  {order?.status === 'Accepted' && <div className="w-[400px] px-2 flex justify-start items-center my-2">
  <div className="w-2/5">Order Complete?</div>
  <div className="w-3/5">
  <CompleteOrderForm req={order?.id} driver={getOrder?.driverid?.toString() || ''} transid={getOrder?.orderref || ''} fleet={userid.toString()} status='Completed' customer={getOrder?.customerid?.toString() || ''} drivername={getOrder?.drivername || ''} />
  </div>
  </div>}
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Agent</div>
  <div className="w-3/5">{order?.drivername}</div>
</div>
<div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Plate number</div>
  <div className="w-3/5">{order?.drivervehicleplateno}</div>
</div>

        </div>
      </VendorOrderModal>

      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Orders",
              href: "/account/orders",
            },
            {
              label: "Order Detail",
              href: `/account/orders/${id}/order-detail`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full w-[400px] px-2 rounded-lg border-2 border-gray-200 p-3">
         
            <h2 className="text-2xl">User Info</h2>

  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Username</div>
  <div className="w-3/5">{order?.customername}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Email</div>
  <div className="w-3/5">{order?.customeremail}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Phone No</div>
  <div className="w-3/5">{order?.customerphone}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Location</div>
  <div className="w-3/5 px-1">{order?.customeraddress}</div>
</div>


<h2 className="text-2xl">Order Info</h2>

  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Order Reference</div>
  <div className="w-3/5">{order?.orderref}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Product</div>
  <div className="w-3/5">{order?.productname}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Amount</div>
  <div className="w-3/5">N{formatAmount(order?.amount)}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Date & Time</div>
  <div className="w-3/5">{moment(order?.createdAt).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Status</div>
  <div className="w-3/5"><span className={`${statusBg(order?.status || '')} px-2 py-1`}>{order?.status}</span>
  </div>
  </div>
  {order?.status === 'Accepted' && <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Order complete?</div>
  <div className="w-3/5">
  <CompleteOrderForm req={order?.id} driver={getOrder?.driverid?.toString() || ''} transid={getOrder?.orderref || ''} fleet={userid.toString()} status='Completed' customer={getOrder?.customerid?.toString() || ''} drivername={getOrder?.drivername || ''} />
  </div>
  </div>}
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Agent</div>
  <div className="w-3/5">{order?.drivername}</div>
</div>
<div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Plate number</div>
  <div className="w-3/5">{order?.drivervehicleplateno}</div>
</div>
        </div>
    </main>
  );
}
