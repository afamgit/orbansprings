'use client'

import { FaSearch } from "react-icons/fa";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce'

export function SearchBar () {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)

        params.set('page','1')
        params.delete('subscription')
        params.delete('location')

        if(term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    },300)

     return (
    <div className="relative w-full flex justify-start items-center border-2 border-gray-200 h-[50px] px-3 py-2 rounded-full">    
        <input 
        type="text"
        placeholder="Search for users, meters, merchants and many more"
        onChange={(e) => handleSearch(e.target.value)}
        className="px-3 h-[40px] w-full outline-0"
        defaultValue={searchParams.get('query')?.toString()}
        
        />
         <FaSearch size={24} className='absolute right-3 text-gray-500' />
    </div>
  );
};
