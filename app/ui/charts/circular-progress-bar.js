'use client'

import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({num_meters, type}) {
  const [percentage, setPercentage] = useState(num_meters);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < num_meters) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  const strokeColor = type === 'installed' ? '#78bdf5' : type === 'active' ? '#26427a' : '#b0925f'

  return (
    <div className='flex justify-center items-center'>
      <div className='border-1 border-gray-600 text-gray-600'>
        <CircularProgressbar value={percentage} text={percentage} strokeWidth={10} styles={{path: {stroke: strokeColor}, text: {fill: strokeColor}}} />
      </div>
    </div>
  );
}
export default CircularProgressBar;