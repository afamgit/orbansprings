'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function VendorType () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleType = (vtype: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(vtype) {
            params.set('type', vtype)
        } else {
            params.delete('type')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-start items-center bg-white border-2 border-sky-200 h-[40px] px-3 py-2 rounded">    
        <select
        id="vtype"
        name="vtype"
        onChange={(e) => handleType(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('subscription')?.toString()}
        >
            <option value=''>All types</option>
                  <option value='plumber'>Plumber</option>
                  <option value='tank cleaner'>Tank Cleaner</option>
            </select>
    </div>
  );
};
