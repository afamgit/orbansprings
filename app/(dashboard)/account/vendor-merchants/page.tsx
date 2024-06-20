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
  title: "Vendor Merchants",
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
              label: "Vendor Merchants",
              href: "/account/vendor-merchants",
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full flex flex-col justofy-start items-start my-2 py-3">
        <Link
          className="text-4xl text-gray-900 font-medium"
          href="/account/vendor-merchants/drivers"
        >
          Drivers
        </Link>
        <Link
          className="text-4xl text-gray-400 font-medium"
          href="/account/vendor-merchants/orders"
        >
          Orders
        </Link>
        <Link
          className="text-4xl text-gray-400 font-medium"
          href="/account/vendor-merchants/fleet"
        >
          Fleet
        </Link>
        <Link
          className="text-4xl text-gray-400 font-medium"
          href="/account/vendor-merchants/update-profile"
        >
          Profile
        </Link>
      </div>

    </main>
  );
}
