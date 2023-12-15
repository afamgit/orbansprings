"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {FaSquareFull} from 'react-icons/fa'


function BarDeliveryDisplay() {
  const [chartData, setChartData] = useState([]);
  const [chartDataLabel, setChartDataLabel] = useState([]);
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // const averageDeliveryTime = await fetchAverageDeliveryTime();


  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    setMsg(null);
    setErrorMsg(null);
    setChartData([]);


    try {

      const response = await fetch("/api/orders/delivery-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: 'admin' }),
      });

      const res = await response.json();

      if (res.data.length === 0) {
        setMsg(res.message);
      } else {

        setChartData(res.data[0]);
        setChartDataLabel(res.data[1])
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex justify-center items-center bg-gray-300">
      <div className="flex flex-col justify-between items-center border-1 border-gray-600 text-gray-600">
        
      <div className="w-full flex justify-between items-center px-3">
          <div>
            <h1 className="text-2xl font-semibold capitalize ">
              Average Delivery Time
            </h1>
          </div>
          <div>
            <div className="w-full flex justify-start items-center text-xl">
              <FaSquareFull className="h-3 w-3 mr-1 text-zinc-400" /> Customers
              2 hrs
            </div>
            <div className="w-full flex justify-start items-center text-xl">
              <FaSquareFull className="h-3 w-3 mr-1 text-zinc-700" /> Drivers 1
              hr
            </div>
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

        <BarChart
          width={550}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={1}
          barCategoryGap={10}
          barSize={10}
        >
          {/* <CartesianGrid strokeDasharray="1" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="customerWait"
            fill="#999999"
            strokeWidth={5}
            activeBar={<Rectangle fill="#999999" stroke="#999999" />}
          />
          <Bar
            dataKey="driverDelivery"
            fill="#666666"
            activeBar={<Rectangle fill="#666666" stroke="#666666" />}
          />
        </BarChart>
      </div>
    </div>
  );
}
export default BarDeliveryDisplay;
