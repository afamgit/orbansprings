"use client";

import { useState, useEffect } from "react";
import { areas } from "../utils/data";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createArrayOfNumber, getMonthsFromMap, incrementNumber } from "../utils/utils";

const years = ["2021", "2022", "2023", "2024"];

const months = [
  "January", "February","March","April" ,"May","June","July","August","September","October","November","December",
];

const weeks = createArrayOfNumber(1,54)

export function FilterDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);



  const [filteredType, setFilteredType] = useState('monthly')
  const [filteredSubTypes, setFilteredSubTypes] = useState(months)


  const handleYear = (year: string) => {

    year === '' ? params.delete("fyear") : params.set("fyear", year);
    year === '' ? params.delete("page") : params.set("page", "1");


    params.delete("query");
    params.delete("ftype");
    params.delete("fsubtype");

      setFilteredType('monthly')
      setFilteredSubTypes(months)

    replace(`${pathname}?${params.toString()}`);
  };

  const handleType = (type: string) => {
    setFilteredSubTypes([])

    type === '' && params.delete("ftype")
    type === '' && params.set("fyear", years[0]);


    params.set("page", "1");
    params.delete("query");


    if(type === 'monthly') {
      params.delete("fsubtype")
      params.set("ftype", type)
      params.set("fsubtype", months[0]);
      setFilteredType('monthly')
      setFilteredSubTypes(months)
    } else if(type === 'weekly') {
      params.delete("fsubtype")
      params.set("ftype", type)
      params.set("fsubtype", weeks[0]);
      setFilteredType('weekly')
      setFilteredSubTypes(weeks)
    } else {
      params.delete("ftype")
      params.delete("fsubtype")
    }
    replace(`${pathname}?${params.toString()}`);
  };


  const handleSubType = (subtype: string) => {

    params.set("page", "1");
    params.delete("query");

    if(subtype === '') {
      return
    }

    if (subtype) {
      params.set("fsubtype", subtype);
    } else {
      params.delete("fsubtype");
    }
    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <div className="w-full flex justify-between items-center h-[40px]">
      <div className="bg-white border-2 border-sky-200 rounded px-3 py-2">
        <select
          id="year"
          name="year"
          onChange={(e) => handleYear(e.target.value)}
          className="h-[30px] bg-transparent outline-0 w-full px-2"
          defaultValue={searchParams.get("fyear")?.toString()}
        >
                    <option value="">Year</option>
          {years.map((item,i) => {
            return (
              <option key={i} value={item}>{item}</option>
            )
          })}
        </select>
      </div>

      <div className="bg-white border-2 border-sky-200 rounded px-3 py-2">
        <select
          id="type"
          name="type"
          onChange={(e) => handleType(e.target.value)}
          className="h-[30px] bg-transparent outline-0 w-full px-2"
          defaultValue={searchParams.get("ftype")?.toString()}
        >
          <option value="">Type</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div className="bg-sky-200 rounded px-3 py-2 ml-2">
        <select
          id="subtype"
          name="subtype"
          onChange={(e) => handleSubType(e.target.value)}
          className="h-[30px] bg-transparent outline-0 w-full px-2"
          defaultValue={searchParams.get("fsubtype")?.toString()}
        >
          {filteredType !== 'yearly' && <option value="">All Commissions</option>}
          {filteredSubTypes?.length > 0 &&
            filteredSubTypes.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {filteredType === 'weekly' ? `Week ${item}` : item}
                </option>
              );
            })}
        </select>
      </div>

    </div>
  );
}
