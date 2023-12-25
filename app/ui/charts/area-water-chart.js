"use client";

import React, { useEffect, useState } from "react";
import { areas } from "../../utils/data";
import AreaChartDisplay from '../../ui/charts/area-chart'

function AreaWaterChart() {
  const [chartData, setChartData] = useState([]);
  const [chartDataLabel, setChartDataLabel] = useState([]);
  const [location, setLocation] = useState("New Heaven");
  const [userSelect, setUserSelect] = useState(true);
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    handleSubmit();
  }, [location]);

  const handleSubmit = async () => {
    setMsg(null);
    setErrorMsg(null);
    setChartData([]);


    try {
      if (location === "" && userSelect === true) {
        alert("Select location to view total water sold");
        return;
      }

      const response = await fetch("/api/meters/water-sold", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ area: location }),
      });

      const res = await response.json();

      if (res.data.length === 0) {
        setMsg(res.message);
      } else {
        setChartData(res.data[0]);
        setChartDataLabel(res.data[1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="border-1 border-gray-600 text-gray-600">
        <div className="w-full flex justify-between items-center px-2">
          <div>
            <h1 className="text-2xl font-semibold capitalize">
              Total Water Sold per location
            </h1>
          </div>

          <div className="h-[50px] pr-2 bg-sky-200">
            <select
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => {
                setUserSelect(true);
                setLocation(e.target.value);
              }}
              required
              className="p-2 px-2 bg-sky-200 text-gray-900 h-[50px] w-[160px] rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-xl sm:leading-6" 
              >
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
        </div>

        <div className="w-4/5 flex justify-center items-center my-3 py-31">
            {chartDataLabel.length > 0 && chartDataLabel.map((item,i) => {
              return (
                <span key={i} className="px-2 text-sm">
                  {item.abb}: {item.name}
                </span>
              )
            })}
          </div>
        
    <AreaChartDisplay data={chartData} />

      </div>
    </div>
  );
}
export default AreaWaterChart;
