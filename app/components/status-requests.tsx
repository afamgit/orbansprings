'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function StatusRequests () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleType = (status: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(status) {
            params.set('status', status)
        } else {
            params.delete('status')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-start items-center bg-white border-2 border-blue-200 h-[40px] px-3 py-2 rounded">    
        <select
        id="status"
        name="status"
        onChange={(e) => handleType(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('status')?.toString()}
        >
            <option value=''>Status</option>
            <option value='Pending'>Pending</option>
            <option value='Accepted'>Accepted</option>
            <option value='Cancelled'>Cancelled</option>
            </select>
    </div>
  );
};
