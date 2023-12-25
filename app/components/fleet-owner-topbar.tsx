import Link from "next/link"

export async function FleetOwnerTopBar () {

     return (
    <div className="bg-neutral-800 md:hidden overflow-x-auto">    

            <ul className='flex justify-between items-center'>     

              <Link href='/account/dashboard'>
                <li className={`px-1`}>
                    Dashboard
                </li>
            </Link>
            <Link href='/account/drivers'>
                <li className={`px-1`}>
                    Drivers
                </li>
            </Link>
            <Link className='p-3' href='/account/orders'>
                <li className={`px-1`}>
                    Orders
                </li>
            </Link>
            <Link className='p-3' href='/account/fleet'>
                <li className={`px-1`}>
                    Fleet
                </li>
            </Link>
            <Link className='p-3' href='/account/profile'>
                <li className={`px-1`}>
                    Profile
                </li>
            </Link>

            </ul>
            </div>
  );
};
