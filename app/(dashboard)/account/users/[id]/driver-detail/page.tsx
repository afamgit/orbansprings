import Modal from "@/app/components/modal";
import { prisma } from "@/scripts";
import UserModal from "@/app/components/user-modal";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import {
  fetchCustomerOrders,
  fetchDriverOrders,
  fetchUsers,
} from "@/app/utils/data";
import Ima from "@/app/ui/teams";
import Users from "@/app/ui/users";
import {
  ExpectedCommission,
  UserNumbersCard,
  UserNumbersCardPlain,
  UserNumbersCardSingle,
} from "@/app/ui/cards";
import UsersByNumbers from "@/app/components/users-by-numbers";
import { SubscriptionType } from "@/app/components/subscrription-type";
import { Location } from "@/app/components/location";
import CustomerOrders from "@/app/ui/customer-orders";
import { Product } from "@/app/components/product";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaEllipsis, FaEllipsisVertical } from "react-icons/fa6";
import { CustomerDropdown } from "@/app/components/customer-dropdown";
import DriverOrders from "@/app/ui/driver-orders";
import { DriverDropdown } from "@/app/components/driver-dropdown";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
    product?: string;
  };
}) {
  const id = params.id;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const product = searchParams?.product || "";

  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      photo: true,
      createdAt: true,
      isavailable: true,
      drv_vehicle_license_plate_no: true,
      subscription_plan: true,
    },
  });

  const driverName = user?.name || "";

  const profileImg = user?.photo?.includes('https') ? `${user?.photo}` : `https://support.orbansprings.com/${user?.photo}`


  const meterNumber = async (id: string) => {
    const meterInfo = await prisma.meters.findFirst({
      where: { m_assigned_to: id },
      select: { m_assigned_to: true, m_status: true, m_unique_id: true },
    });

    return meterInfo?.m_unique_id || "N/A";
  };

  const meterStatus = async (id: string) => {
    const meterInfo = await prisma.meters.findFirst({
      where: { m_assigned_to: id },
      select: { m_assigned_to: true, m_status: true, m_unique_id: true },
    });

    return meterInfo?.m_status || "N/A";
  };

  const allProducts = await prisma.products.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const total = await fetchDriverOrders(query, product, id);

  const ordersCompleted = await prisma?.transactions.count({
    where: { driverid: id, status: "Completed" },
  });

  const ordersCancelled = await prisma?.transactions.count({
    where: { driverid: id, status: "Cancelled" },
  });

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <UserModal>
        <div className="w-full rounded-lg border-2 border-gray-200 p-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center">
              <Link className="text-gray-900 mr-2" href="/account/users/drivers">
                <FaChevronLeft size={24} className="outline-0" />
              </Link>
              <Image
                src={`${profileImg}`}
                height={80}
                width={80}
                alt="photo"
                className="rounded-full"
              />
            </div>
            <div className="w-3/4 p-2">
              <div className="w-full flex justify-between items-center">
                <p className="text-3xl font-bold">{user?.name}</p>
                <p>
                  <DriverDropdown
                    id={id}
                    drvStatus={user?.isavailable || false}
                  />
                </p>
              </div>

              <div className="w-full flex justify-between items-center">
                <p className="text-gray-600 text-xl">
                  {user?.drv_vehicle_license_plate_no}
                </p>
                <p className="text-gray-600 text-xl">|</p>
                <p className="text-gray-600 text-xl">
                  Joined Since {moment(user?.createdAt).format("MMM YYYY")}
                </p>
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

          <div className="w-full flex justify-between items-center text-2xl my-2 p-2">
            <div className="w-1/3">
              Meter Number
              <p className="text-xl font-medium">{meterNumber(driverName)}</p>
            </div>
            <div className="w-1/3">
              Meter Status
              <p className="text-xl font-medium">{meterStatus(driverName)}</p>
            </div>
            <div className="w-1/3">
              User Status
              <p className="text-xl font-medium">{user?.subscription_plan}</p>
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
          <DriverOrders
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
              label: "Driver Detail",
              href: `/account/users/${id}/driver-detail`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full rounded-lg border-2 border-gray-200 p-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link className="text-gray-900 mr-2" href="/account/users/drivers">
              <FaChevronLeft size={24} className="outline-0" />
            </Link>
            <Image
              src="/noimage.png"
              height={80}
              width={80}
              alt="photo"
              className="rounded-full"
            />
          </div>
          <div className="w-3/4 p-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-3xl font-bold">{user?.name}</p>
              <p>
              <DriverDropdown
                    id={id}
                    drvStatus={user?.isavailable || false}
                  />
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-gray-600 text-xl">
                {user?.drv_vehicle_license_plate_no}
              </p>
              <p className="text-gray-600 text-xl">|</p>
              <p className="text-gray-600 text-xl">
                Joined Since {moment(user?.createdAt).format("MMM YYYY")}
              </p>
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

        <div className="w-full flex justify-between items-center text-2xl my-2 p-2">
          <div className="w-1/3">
            Meter Number
            <p className="text-xl font-medium">{meterNumber(driverName)}</p>
          </div>
          <div className="w-1/3">
            Meter Status
            <p className="text-xl font-medium">{meterStatus(driverName)}</p>
          </div>
          <div className="w-1/3">
            User Status
            <p className="text-xl font-medium">{user?.subscription_plan}</p>
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
        <DriverOrders
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
