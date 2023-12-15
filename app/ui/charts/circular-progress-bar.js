'use client'

import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({num_meters}) {
  const [percentage, setPercentage] = useState(num_meters);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < num_meters) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  return (
    <div className='flex justify-center items-center'>
      <div className='border-1 border-gray-600 text-gray-600'>
        <CircularProgressbar value={percentage} text={percentage} strokeWidth={10} styles={{path: {stroke: '#666666'}, text: {fill: '#666666'}}} />
      </div>
    </div>
  );
}
export default CircularProgressBar;