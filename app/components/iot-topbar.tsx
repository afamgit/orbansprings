import Link from "next/link"

export async function IotTopBar () {

     return (
    <div className="bg-neutral-800 md:hidden overflow-x-auto">    

            <ul className='flex justify-between items-center'>     

            <Link href='/account/meters'>
                <li className={`px-1`}>
                    Meters
                </li>
            </Link>

            </ul>
            </div>
  );
};
