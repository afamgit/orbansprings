import { prisma } from "@/scripts";
import UserModal from "@/app/components/user-modal";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { fetchCustomerOrders } from "@/app/utils/data";
import {
  UserNumbersCardPlain,
} from "@/app/ui/cards";
import CustomerOrders from "@/app/ui/customer-orders";
import { Product } from "@/app/components/product";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { CustomerDropdown } from "@/app/components/customer-dropdown";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: any;
}) 
 {
  const {id} = await params;
  const {query:queryParams,page, product: productParams} = await searchParams;
  const query = queryParams || "";
  const currentPage = Number(page) || 1;
  const product = productParams || "";

  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const allProducts = await prisma.products.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const total = await fetchCustomerOrders(query, product, id);

  const ordersCompleted = await prisma?.transactions.count({
    where: { customerid: id, status: "Completed" },
  });

  const ordersCancelled = await prisma?.transactions.count({
    where: { customerid: id, status: "Cancelled" },
  });

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <UserModal>
        <div className="w-full rounded-lg border-2 border-gray-200 p-3">
          <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link className="text-gray-900 mr-2" href="/account/users">
              <FaChevronLeft size={24} className='outline-0' />
            </Link>
            <Image 
              src='/noimage.png'
              height={80}
              width={80}
              alt="photo"
              className="rounded-full"
            />
            </div>
            <div className="w-3/4 p-2">
              <div className="w-full flex justify-between items-center">
                <p className="text-3xl font-bold">{user?.name}</p>
                <p><CustomerDropdown id={id} subType={user?.subscription_plan || ''} /></p>
              </div>

              <div className="w-full flex justify-between items-center">
                <p className="text-gray-600 text-xl">{user?.area}</p>
                <p className="text-gray-600 text-xl">|</p>
                <p className="text-gray-600 text-xl">Joined Since {moment(user?.createdAt).format('MMM YYYY')}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:flex justify-between items-center my-3 py-3">
            <h2 className="text-3xl">Order History</h2>

            <div className="flex justify-center items-center mx-2 px-3">
              <div>
                <Product allproducts={allProducts} />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start items-center my-2 p-2">
            <div className="w-1/2">
              <UserNumbersCardPlain
                num={ordersCompleted}
                name="orders completed"
              />
            </div>
            <div className="w-1/2">
              <UserNumbersCardPlain
                num={ordersCancelled}
                name="orders cancelled"
              />
            </div>
          </div>
          <CustomerOrders
            query={query}
            currentPage={currentPage}
            product={product}
            id={id}
          />
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={total} />
          </div>
        </div>
      </UserModal>

      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Users",
              href: "/account/users",
            },
            {
              label: "Customer Detail",
              href: `/account/users/${id}/customer-detail`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full rounded-lg border-2 border-gray-200 p-3">
          <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link className="text-gray-900 mr-2" href="/account/users">
              <FaChevronLeft size={24} className='outline-0' />
            </Link>
            <Image 
              src='/noimage.png'
              height={80}
              width={80}
              alt="photo"
              className="rounded-full"
            />
            </div>
            <div className="w-3/4 p-2">
              <div className="w-full flex justify-between items-center">
                <p className="text-3xl font-bold">{user?.name}</p>
                <p><CustomerDropdown id={id} subType={user?.subscription_plan || ''} /></p>
              </div>

              <div className="w-full flex justify-between items-center">
                <p className="text-gray-600 text-xl">{user?.area}</p>
                <p className="text-gray-600 text-xl">|</p>
                <p className="text-gray-600 text-xl">Joined Since {moment(user?.createdAt).format('MMM YYYY')}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:flex justify-between items-center my-3 py-3">
            <h2 className="text-3xl">Order History</h2>

            <div className="flex justify-center items-center mx-2 px-3">
              <div>
                <Product allproducts={allProducts} />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start items-center my-2 p-2">
            <div className="w-1/2">
              <UserNumbersCardPlain
                num={ordersCompleted}
                name="orders completed"
              />
            </div>
            <div className="w-1/2">
              <UserNumbersCardPlain
                num={ordersCancelled}
                name="orders cancelled"
              />
            </div>
          </div>
          <CustomerOrders
            query={query}
            currentPage={currentPage}
            product={product}
            id={id}
          />
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={total} />
          </div>
        </div>
    </main>
  );
}
