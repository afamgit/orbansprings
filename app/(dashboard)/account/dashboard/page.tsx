import { Metadata } from "next";
import { auth, getUserFromEmail } from "@/auth";
import AdminDashboard from "@/app/components/admin-dashboard";
import VendorMerchantDashboard from "@/app/components/vendormerchant-dashboard";
import WaterMerchantDashboard from "@/app/components/watermerchant-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};


export default async function Page() {

  const userInfo = await auth()

  const usremail = userInfo?.user.email || ''

  const profile = await getUserFromEmail(usremail)

  return (
    <main className='w-full md:w-[1100px] flex flex-col justify-center items-center'>
         

      {profile?.role === 'admin' && <AdminDashboard />}
        {profile?.role === 'fleetownerdriver' && <VendorMerchantDashboard />}
        {profile?.role === 'meterowner' && <WaterMerchantDashboard />}

    </main>
  );
}
