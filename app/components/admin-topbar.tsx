import Link from "next/link"

export async function AdminTopBar () {

     return (
    <div className="bg-neutral-800 md:hidden overflow-x-auto">    

            <ul className='flex justify-between items-center'>     

              <Link href='/account/dashboard'>
                <li className={`px-1`}>
                    Dashboard
                </li>
            </Link>
            <Link href='/account/meters'>
                <li className={`px-1`}>
                    Meters
                </li>
            </Link>
            <Link href='/account/orders'>
                <li className={`px-1`}>
                    Orders
                </li>
            </Link>
            <Link href='/account/requests'>
                <li className={`px-1`}>
                    Requests
                </li>
            </Link>
            <Link className='p-3' href='/account/commissions'>
                <li className={`px-1`}>
                    Commissions
                </li>
            </Link>
            <Link className='p-3' href='/account/users'>
                <li className={`px-1`}>
                    Users
                </li>
            </Link>
            <Link className='p-3' href='/account/products'>
                <li className={`px-1`}>
                    Products
                </li>
            </Link>
            <Link className='p-3' href='/account/subscriptions'>
                <li className={`px-1`}>
                    Subscription Plans
                </li>
            </Link>
            <Link className='p-3' href='/account/areagroups'>
                <li className={`px-1`}>
                    Area Groups
                </li>
            </Link>
            <Link className='p-3' href='/account/complaints'>
                <li className={`px-1`}>
                    Complaints
                </li>
            </Link>
            <Link className='p-3' href='/account/content-pages'>
                <li className={`px-1`}>
                    Pages
                </li>
            </Link>
            <Link className='p-3' href='/account/teams'>
                <li className={`px-1`}>
                    Team Members
                </li>
            </Link>
            <Link className='p-3' href='/account/blog'>
                <li className={`px-1`}>
                    Articles
                </li>
            </Link>
            <Link className='p-3' href='/account/newsletters'>
                <li className={`px-1`}>
                    Newsletters
                </li>
            </Link>
            <Link className='p-3' href='/account/testimonials'>
                <li className={`px-1`}>
                    Testimonials
                </li>
            </Link>
            <Link className='p-3' href='/account/faqs'>
                <li className={`px-1`}>
                    FAQs
                </li>
            </Link>
            <Link className='p-3' href='/account/update-profile'>
                <li className={`px-1`}>
                    Update Profile
                </li>
            </Link>

            </ul>
            </div>
  );
};
