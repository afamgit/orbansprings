'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Product ({allproducts}: {allproducts:any}) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleProduct = (prod: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('query')

        if(prod) {
            params.set('product', prod)
        } else {
            params.delete('product')
        }
        replace(`${pathname}?${params.toString()}`)
    }

     return (
    <div className="w-full flex justify-start items-center bg-white border-2 border-sky-300 h-[40px] px-3 py-2 rounded">    
        <select
        id="loc"
        name="loc"
        onChange={(e) => handleProduct(e.target.value)}
        className="h-[30px] bg-transparent outline-0 w-full"
        defaultValue={searchParams.get('product')?.toString()}
        >
            <option value=''>All Products</option>
           {allproducts?.length > 0 &&
                allproducts.map((item:any, i:number) => {
                  return (
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
    </div>
  );
};
