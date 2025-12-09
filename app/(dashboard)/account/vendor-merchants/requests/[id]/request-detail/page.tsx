import { prisma } from "@/scripts";
import {AssignDriverForm} from "@/app/components/assign-driver";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import moment from "moment";
import { statusBg } from "@/app/utils/snippets";
import VendorRequestModal from "@/app/components/vendor-request-modal";
import { auth } from "@/auth";
import { getProfileUser } from "@/app/utils/data";
import MessageModal from "@/app/components/message-modal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Requests",
};

export default async function Page({
  params,
}: {
  params: any;
}) {
  const {id} = await params;
  
  const getRequest = await prisma.requests.findFirst({
    where: {
      orderref: id,
    },
  });

  const getOrder = await prisma.transactions.findFirst({
    where: {
      orderref: getRequest?.orderref,
    },
    select: {orderref:true, id:true, customerid:true, commission:true}
  });


  const order = JSON.parse(JSON.stringify(getRequest))

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")

  const userid = profile?.id || 1000

  const drivers = await prisma.users.findMany({
    where: {role: 'driver', fleetid:userid, isavailable: true}
  })



  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <MessageModal>
      <div className="w-[450px] p-5 rounded-xl p-3">
          <h3 className="text-4xl py-2">Driver Assigned Successfully!</h3>
          <p className="my-3 py-3">A driver has been assigned successfully. Click continue to exit this page</p>
          <Link className="w-full flex justify-center bg-sky-400 text-white p-4 rounded-xl text-xl" href={`/account/vendor-merchants/requests/${id}/request-detail`}>Continue</Link>
        </div>
      </MessageModal>
      <VendorRequestModal>
      <div className="w-[400px] px-2 rounded-xl p-3">
         
            <h2 className="text-2xl">Customer Info</h2>
           
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Name</div>
  <div className="w-3/5">{order?.customername}</div>
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
  <div className="w-2/5">Order ID</div>
  <div className="w-3/5">{order?.orderref}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Product</div>
  <div className="w-3/5">{order?.productname}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Amount</div>
  <div className="w-3/5">{order?.amount}</div>
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
  {order?.status === 'pending' && <div className="w-[400px] px-2 flex justify-start items-center my-2">
  <div className="w-2/5">Assign request</div>
  <div className="w-3/5"> <AssignDriverForm req={order?.id} drivers={drivers} fleet={userid.toString()} transid={getOrder?.orderref || ''} status='pending' customer={getOrder?.customerid?.toString() || ''} commission={getOrder?.commission || 0} /></div>
  </div>}
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Agent</div>
  <div className="w-3/5">{order?.drivername}</div>
</div>

        </div>
      </VendorRequestModal>

      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Requests",
              href: "/account/vendor-merchants",
            },
            {
              label: "Request Detail",
              href: `/account/vendor-merchants/orders/${id}/request-detail`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full w-[400px] px-2 rounded-lg border-2 border-gray-200 p-3">
         
            <h2 className="text-2xl">Customer Info</h2>


  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Name</div>
  <div className="w-3/5">{order?.customername}</div>
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
  <div className="w-2/5">Order ID</div>
  <div className="w-3/5">{order?.orderref}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Product</div>
  <div className="w-3/5">{order?.productname}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Amount</div>
  <div className="w-3/5">{order?.amount}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Date & Time</div>
  <div className="w-3/5">{moment(order?.createdAt).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Status</div>
  <div className="w-3/5"><span className={`${statusBg(order?.status || '')} px-2 py-1`}>{order?.status}</span></div>
  </div>
  {order?.status === 'pending' && 
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Assign request</div>
  <div className="w-3/5"> <AssignDriverForm req={order} drivers={drivers} fleet={userid.toString()} transid={getOrder?.orderref || ''} status='pending' customer={getOrder?.customerid?.toString() || ''} commission={getOrder?.commission || 0} /></div>
  </div>}
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Agent</div>
  <div className="w-3/5">{order?.drivername}</div>
</div>
        </div>
    </main>
  );
}
