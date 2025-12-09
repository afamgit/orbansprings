'use client'

import { areas } from "../utils/snippets";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Location () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleLoc = (loc: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(loc) {
            params.set('location', loc)
        } else {
            params.delete('location')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-start items-center bg-sky-200 h-[40px] px-3 py-2 rounded">    
        <select
        id="loc"
        name="loc"
        onChange={(e) => handleLoc(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('subscription')?.toString()}
        >
            <option value=''>All locations</option>
           {areas?.length > 0 &&
                areas.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  );
                })}
            </select>
    </div>
  );
};
