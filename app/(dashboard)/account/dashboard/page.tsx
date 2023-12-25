import { Metadata } from "next";
import { auth, getUserFromEmail } from "@/auth";
import AdminDashboard from "@/app/components/admin-dashboard";
import FleetOwnerDashboard from "@/app/components/fleet-owner-dashboard";
import MeterOwnerDashboard from "@/app/components/meter-owner-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};


export default async function Page() {

  const userInfo = await auth()

  const usremail = userInfo?.user.email || ''

  const profile = await getUserFromEmail(usremail)

  return (
    <main className="w-full flex flex-col justify-start items-center flex-wrap">
      <div className="w-full flex justify-between iteams-center my-2 py-2">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>


      {profile?.role === 'admin' && <AdminDashboard />}
        {profile?.role === 'fleetownerdriver' && <FleetOwnerDashboard />}
        {profile?.role === 'meterowner' && <MeterOwnerDashboard />}

    </main>
  );
}
