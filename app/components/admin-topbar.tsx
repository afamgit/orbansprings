import Link from "next/link"

export async function AdminTopBar () {

     return (
    <div className="bg-neutral-800 md:hidden overflow-x-auto">    

            <ul className='flex justify-between items-center'>     

              <Link href='/account/home'>
                <li className={`px-1`}>
                    Dashboard
                </li>
            </Link>
            <Link href='/account/meters'>
                <li className={`px-1`}>
                    Meters
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
            <Link className='p-3' href='/account/testimonials'>
                <li className={`px-1`}>
                    Testimonials
                </li>
            </Link>

            </ul>
            </div>
  );
};
