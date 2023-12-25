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

            </ul>
            </div>
  );
};
