import AdminDashboard from "@/app/components/admin-dashboard";
import VendorMerchantDashboard from "@/app/components/vendormerchant-dashboard";
import WaterMerchantDashboard from "@/app/components/watermerchant-dashboard";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { auth, getUserFromEmail } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Dashboard() {
  const userInfo = await auth();

  const usremail = userInfo?.user.email || "";

  const profile = await getUserFromEmail(usremail);

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs breadcrumbs={[{ label: "Account", href: "/account" }]} />
      </div>

      {profile?.role === "admin" && <AdminDashboard />}
      {profile?.role === "fleetownerdriver" && <VendorMerchantDashboard />}
      {profile?.role === "meterowner" && <WaterMerchantDashboard />}
    </main>
  );
}
