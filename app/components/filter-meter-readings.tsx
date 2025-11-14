'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function FilterMeterReadings({ meters }: { meters: any[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const meterId = formData.get('meterId') as string;
    const date = formData.get('date') as string;
    const month = formData.get('month') as string;
    const year = formData.get('year') as string;

    if (meterId) {
      params.set('meterId', meterId);
    } else {
      params.delete('meterId');
    }

    if (date) {
      params.set('date', date);
      params.delete('month');
      params.delete('year');
    } else {
      params.delete('date');
      if (month) {
        params.set('month', month);
      } else {
        params.delete('month');
      }
      if (year) {
        params.set('year', year);
      } else {
        params.delete('year');
      }
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  return (
    <form key={searchParams.toString()} action={handleFilter} className="flex items-center space-x-4">
      <div>
        <label htmlFor="meterId" className="block text-sm font-medium leading-6 text-gray-900">Meter</label>
        <select
          id="meterId"
          name="meterId"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={searchParams.get('meterId')?.toString()}
        >
          <option value="">All Meters</option>
          {meters.map((meter: any) => (
            <option key={meter.meterid} value={meter.meterid}>
              {meter.m_unique_id} - {meter.m_assigned_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={searchParams.get('date')?.toString()}
        />
      </div>
      <div>
        <label htmlFor="month" className="block text-sm font-medium leading-6 text-gray-900">Month</label>
        <select
          id="month"
          name="month"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={searchParams.get('month')?.toString()}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">Year</label>
        <select
          id="year"
          name="year"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={searchParams.get('year')?.toString()}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Filter</button>
    </form>
  );
}
