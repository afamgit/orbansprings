import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import { getProfileUser } from "@/app/utils/data";
import { auth } from "@/auth";
import WaterMerchantQrCode from "@/app/components/water-merchant-qr-code";

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

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")
  

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

      <div>
      <div><WaterMerchantQrCode id={profile?.id.toString() || ''} name={profile?.name.toString() || ''} type="" /></div>

      </div>
    </main>
  );
}
