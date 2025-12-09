'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function SubscriptionType () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleType = (subtype: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(subtype) {
            params.set('subscription', subtype)
        } else {
            params.delete('subscription')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-start items-center border-2 border-blue-200 h-[40px] px-3 py-2 rounded">    
        <select
        id="subtype"
        name="subtype"
        onChange={(e) => handleType(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('subscription')?.toString()}
        >
            <option value='Basic'>Basic</option>
            <option value='Premium'>Premium</option>
            </select>
    </div>
  );
};
