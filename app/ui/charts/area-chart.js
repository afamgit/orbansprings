"use client";

import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

function AreaChartDisplay({ data }) {

  const [chartData, setChartData] = useState(data);


  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <div className="flex justify-center items-center">
      <div className="border-1 border-gray-600 text-gray-600">

        <AreaChart width={520} height={300} data={chartData}>
          <Area dataKey="qty" type="monotone" fill="#7c889c" stroke="#7c889c" />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis dataKey="name" />
          <YAxis />
        </AreaChart>
      </div>
    </div>
  );
}
export default AreaChartDisplay;
