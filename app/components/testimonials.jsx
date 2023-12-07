'use client'

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {
  BsStarFill
} from "react-icons/bs";


export const Testimonials = ({data}) => {

const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemSelected, setItemSelected] = useState({});

  useEffect(() => {
    setFilteredData(data.slice(0, 2))
    setTimeout(() => {
      handleNext()
    },5000)
  },[])


  useEffect(() => {
    
    if(currentIndex >= 0 && currentIndex < data.length) {
      setFilteredData(data.slice(currentIndex,currentIndex + 2))
    } else {
      setCurrentIndex(0)
      setFilteredData(data.slice(currentIndex,currentIndex + 2))
    }

  }, [currentIndex]);

  const handlePrev = () => {

    if (currentIndex === 0) {
      setCurrentIndex(data.length - 1);
  } else {
    setCurrentIndex(currentIndex - 1)
  }

  };

  const handleNext = () => {
    if (currentIndex >= data.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((curr) => curr + 1);
    } 

    setTimeout(() => {
      handleNext()
    },5000)
    
  };


  const arrayRange = (start, stop, step) =>
  Array.from(
  { length: (stop - start) / step + 1 },
  (value, index) => start + index * step
  );

  return (
    <div
      className="w-full rounded p-3 my-3"
      style={{ maxWidth: "1300px" }}
    >
        <div>

          <div className="flex flex-col justify-center items-center rounded px-2 py-4 md:p-5">
            <div className="flex flex-col md:flex-row justify-content items-center w-full h-full md:w-[1200px] mx-auto py-5 md:h-[500px] overflow-y-scroll">
              {filteredData.length > 0 && filteredData.map((item,i) => {
                return (
                    <div key={i} className="relative h-full md:h-[420px] flex flex-col w-full md:w-2/5 mx-auto justify-between items-center bg-white rounded-xl px-10 py-5 my-6 transition duration-700 ease-in-out">
                    
                  <div className='p-3 absolute -top-[50px]'>
                      {item.tphoto !== "" && (
                        <Image
                          src={`/${item.tphoto}`}
                          alt={item.tcustomer}
                          height={120}
                          width={120}
                          className='rounded-full mb-4'
                        />
                      )}
                      

                      </div>
                      <div className='h-[350px] flex flex-col justify-center items-center'>

                    <div className="flex flex-col justify-center items-center text-lg py-5 my-5">
                    <div className='my-3 py-3'>
                        <div className='relative flex top-[10px]'>
                          {arrayRange(1,5,1).map((item,i) => <BsStarFill className='text-gray-300 font-bold' />)}

                          <div className='absolute flex'>
                            {arrayRange(1,item.tstars,1).map((item,i) => <BsStarFill className='text-yellow-500 font-bold' />)}
                          </div>
                        </div>
                       </div>
                      
                        {item.tmessage}
                    </div>

                    <h5 className='text-2xl py-2'>{item.tcustomer}</h5>
                    <h6>{item.trole}</h6>
                  </div>
                  </div>
                )
              })
            }
            </div>

            <div className="h-[60px] flex justify-center items-center gap-2">

            {arrayRange(0,Math.ceil(data.length/2),1).map((_,i) => {
              
            return (
            <div key={i} onClick={() => setCurrentIndex(i)} className={`h-[20px] w-[20px] rounded-full cursor-pointer ${i === currentIndex ? 'bg-blue-500' : 'bg-white'} `}></div>
            )
            })
          }
          </div>
          </div>
        </div>
    </div>
  );
};
