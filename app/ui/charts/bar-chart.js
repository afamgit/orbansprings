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

function BarChartDisplay({ data }) {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-300">
      <div className="flex flex-col justify-between items-center border-1 border-gray-600 text-gray-600">
        

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
export default BarChartDisplay;
