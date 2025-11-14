import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import { getProfileUser } from "@/app/utils/data";
import { auth } from "@/auth";
import WaterMerchantQrCode from "@/app/components/water-merchant-qr-code";
import { slugify } from "@/app/utils/snippets";

export const metadata: Metadata = {
  title: "Water Merchants",
};

export default async function Page() {

  const userInfo = await auth()
  
  const profile = await getProfileUser(userInfo?.user.email || "")
  
  const wmname = slugify(profile?.name ||'')

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Water Merchants",
              href: "/account/water-merchants",
              active: true,
            },
          ]}
        />
      </div>

      <div>
      <div><WaterMerchantQrCode id={profile?.id.toString() || ''} name={wmname.toString()} type="" /></div>

      </div>
    </main>
  );
}
