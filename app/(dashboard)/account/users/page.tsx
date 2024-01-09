import Modal from "@/app/components/modal";
import { prisma } from "@/scripts";
import { useRouter } from "next/navigation";
import { AddTeamForm } from "@/app/components/team-form";
import moment from "moment";
import { UpdateTeam, DeleteTeam } from "@/app/ui/buttons";
import Link from "next/link";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";
import { fetchUsers } from "@/app/utils/data";
import Teams from "@/app/ui/teams";
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

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    subscription?: string;
    location?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const subscription = searchParams?.subscription || "Basic";
  const location = searchParams?.location || "";

  const total = await fetchUsers(query, subscription, location);

  const totalSubscription = await prisma.users.count({
    where: {
      subscription_plan: subscription,
      role: "customer",
      area: { contains: location },
    },
  });

  const totalExpected = await prisma?.subscriptions.aggregate({
    where: { subplantype: subscription },
    _sum: { subplanamt: true },
  });

  const totalPaid = await prisma?.subscriptions.aggregate({
    where: {
      AND: [{ subplantype: subscription }, { subplan_pay_status: "Paid" }],
    },
    _sum: { subplanamt: true },
  });

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Users",
              href: "/account/users",
              active: true,
            },
          ]}
        />
      </div>

      <UsersByNumbers />

      <div className="w-full flex justofy-start items-center m-2 p-3">
        <Link
          className="text-4xl text-gray-900 font-medium"
          href="/account/users"
        >
          Customers
        </Link>
        <Link
          className="text-4xl text-gray-400 font-medium px-4"
          href="/account/users/drivers"
        >
          Drivers
        </Link>
        <Link
          className="text-4xl text-gray-400 font-medium px-4"
          href="/account/users/vendors"
        >
          Vendors
        </Link>
        <Link
          className="text-4xl text-gray-400 font-medium"
          href="/account/users/merchants"
        >
          Merchants
        </Link>
      </div>

      <div className="w-full rounded-lg border-2 border-gray-200 p-3">
        <div className="w-full md:flex justify-between items-center my-3 py-3">
          <h2 className="text-3xl">Overall Customers List</h2>

          <div className="flex justify-center items-center mx-2 px-3">
            <div className="mr-1">
              <SubscriptionType />
            </div>
            <div>
              <Location />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start items-center my-2 p-2">
          <div className="w-1/5">
            <UserNumbersCardPlain
              num={totalSubscription}
              name={`${
                subscription === "Basic" ? "Basic" : "Premium"
              } Customers`}
            />
          </div>
          <div className="w-2/5 mx-3">
            <ExpectedCommission
              title="expected subscription revenue"
              amount={totalExpected?._sum.subplanamt || 0}
            />
          </div>
          <div className="w-2/5">
            <ExpectedCommission
              title="total received subscription"
              amount={totalPaid?._sum.subplanamt || 0}
            />
          </div>
        </div>
        <Users
          query={query}
          currentPage={currentPage}
          subType={subscription}
          location={location}
        />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={total} />
        </div>
      </div>
    </main>
  );
}
