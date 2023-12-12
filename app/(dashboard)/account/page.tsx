import Breadcrumbs from "@/app/ui/breadcrumbs"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Account',
};

export default function Dashboard() {

      return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Account', href: '/account' },
            ]}
          />
        <div className='flex flex-col justify-center items-center my-5 py-5'>
          <h1 className='text-3xl'>Welcome</h1>
          </div>

        </main>
      )
}