import Modal from "@/app/components/modal";
import { prisma } from "@/scripts";
import UserModal from "@/app/components/user-modal";
import OrderModal from "@/app/components/order-modal";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import moment from "moment";
import { statusBg } from "@/app/utils/snippets";
import { formatAmount } from "@/app/utils/utils";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page({
  params,
}: {
  params: any;
}) {
  const {reference} = await params;

  const orderDb = await prisma.transactions.findFirst({
    where: {
      orderref: reference,
    },
    select: {id:true, orderref:true,productname:true,customername:true, customeremail:true,customerphone:true, customeraddress:true, customerareagroup:true, createdAt:true, amount:true, status:true, paymentstatus:true, paymenttime:true }
  });

  const order = JSON.parse(JSON.stringify(orderDb))


  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <OrderModal>
      <div className="w-[400px] px-2 rounded-xl p-3">
         
            <h2 className="text-2xl">User Info</h2>

            <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">UserID</div>
  <div className="w-3/5">{order?.id}</div>
  </div>
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
  <div className="w-2/5">Order ID</div>
  <div className="w-3/5">{order?.id}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Order Reference</div>
  <div className="w-3/5">{order?.orderref}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Product</div>
  <div className="w-3/5">{order?.productname}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Date & Time</div>
  <div className="w-3/5">{moment(order?.createdAt).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Status</div>
  <div className="w-3/5"><span className={`${statusBg(order?.status || '')} px-2 py-1`}>{order?.status}</span></div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Amount</div>
  <div className="w-3/5">N{order?.amount && formatAmount(order?.amount)}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Payment Status</div>
  <div className="w-3/5"><span className={`${order?.paymentstatus === 'Unpaid' ? 'bg-red-500 text-white' : order?.paymentstatus === 'Paid' ? 'bg-green-400 text-gray-800' : null} px-2 py-1`}>{order?.paymentstatus}</span></div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Payment Date & Time</div>
  <div className="w-3/5">{order?.paymenttime && moment(order?.paymenttime).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Agent</div>
  <div className="w-3/5">{order?.drivername}</div>
</div>

        </div>
      </OrderModal>

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
              href: `/account/orders/${reference}`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full w-[400px] px-2 rounded-lg border-2 border-gray-200 p-3">
         
            <h2 className="text-2xl">User Info</h2>

            <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">UserID</div>
  <div className="w-3/5">{order?.id}</div>
  </div>
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
  <div className="w-2/5">Order ID</div>
  <div className="w-3/5">{order?.id}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Order Reference</div>
  <div className="w-3/5">{order?.orderref}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Product</div>
  <div className="w-3/5">{order?.productname}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Date & Time</div>
  <div className="w-3/5">{moment(order?.createdAt).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Status</div>
  <div className="w-3/5"><span className={`${statusBg(order?.status || '')} px-2 py-1`}>{order?.status}</span></div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Amount</div>
  <div className="w-3/5">N{order?.amount && formatAmount(order?.amount)}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Payment Status</div>
  <div className="w-3/5"><span className={`${order?.paymentstatus === 'Unpaid' ? 'bg-red-500 text-white' : order?.paymentstatus === 'Paid' ? 'bg-green-400 text-gray-800' : null} px-2 py-1`}>{order?.paymentstatus}</span></div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Payment Date & Time</div>
  <div className="w-3/5">{order?.paymenttime && moment(order?.paymenttime).format('DD/MM/YYYY H:mma')}</div>
  </div>
  <div className="w-full w-[400px] px-2 flex justify-start items-start my-2">
  <div className="w-2/5">Agent</div>
  <div className="w-3/5">{order?.drivername}</div>
</div>
        </div>
    </main>
  );
}
