'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function FilterDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const dateFrom = formData.get('dateFrom') as string;
    const dateTo = formData.get('dateTo') as string;

    if (dateFrom) {
      params.set('dateFrom', dateFrom);
    } else {
      params.delete('dateFrom');
    }

    if (dateTo) {
      params.set('dateTo', dateTo);
    } else {
      params.delete('dateTo');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form key={searchParams.toString()} action={handleFilter} className="flex items-center space-x-4">
      <div>
        <label htmlFor="dateFrom" className="block text-sm font-medium leading-6 text-gray-900">Date From</label>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={searchParams.get('dateFrom')?.toString()}
        />
      </div>
      <div>
        <label htmlFor="dateTo" className="block text-sm font-medium leading-6 text-gray-900">Date To</label>
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={searchParams.get('dateTo')?.toString()}
        />
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Filter</button>
    </form>
  );
}
