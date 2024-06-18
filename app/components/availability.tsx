'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Availability () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleType = (status: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(status) {
            params.set('availability', status)
        } else {
            params.delete('availability')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-end items-center bg-white border-2 border-blue-200 h-[40px] px-3 py-2 rounded">    
        <select
        id="availability"
        name="availability"
        onChange={(e) => handleType(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('availability')?.toString()}
        >
            <option value=''>Status</option>
            <option value='Available'>Available</option>
            <option value='Unavailable'>Unavailable</option>
            </select>
    </div>
  );
};
