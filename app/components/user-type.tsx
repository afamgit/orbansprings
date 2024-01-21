'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function UserType () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleType = (usertype: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(usertype) {
            params.set('usertype', usertype)
        } else {
            params.delete('usertype')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-start items-center bg-white border-2 border-blue-200 h-[40px] px-3 py-2 rounded">    
        <select
        id="usertype"
        name="usertype"
        onChange={(e) => handleType(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('usertype')?.toString()}
        >
            <option value=''>User Type</option>
            <option value='Customer'>Customer</option>
            <option value='Driver'>Driver</option>
            <option value='Supply'>Supply</option>
            </select>
    </div>
  );
};
