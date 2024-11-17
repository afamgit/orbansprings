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
    },10000)
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

  const getNameInitials = (name) => {
    const arr = name.split(' ')
    const first = arr[0]
    const second = arr[1]

    return `${first[0]}${second[0]}`
  }

  return (
    <div
      className="w-full md:max-w-[1200px] mx-auto rounded p-3 my-3"
    >
        <div>

          <div className="flex flex-col justify-center items-center rounded px-2 py-4 md:p-5">
            <div className="flex flex-col md:flex-row justify-center items-center w-full h-full md:max-w-[1200px] mx-auto py-5 md:h-[500px] bg-sky-500">
              {filteredData.length > 0 && filteredData.map((item,i) => {
                // const imgUrl = item?.tphoto.includes('https') ? `${item?.tphoto}` : `/${item?.tphoto}`
                const imgUrl = item?.tphoto.includes('https') ? `${item?.tphoto}` : ""
                return (
                    <div key={i} className="relative h-full md:h-[400px] flex flex-col w-full md:w-2/5 mx-auto justify-between items-center bg-white rounded-xl px-6 py-5 my-6 transition duration-700 ease-in-out">
                    
                  <div className='p-3 absolute -top-[50px]'>
                      {imgUrl !== "" ? (
                        <Image
                          src={`${imgUrl}`}
                          alt={item.tcustomer}
                          height={120}
                          width={120}
                          className='rounded-full mb-4'
                        />
                      ) : 
                      (
                        <div className='rounded-full bg-gray-200 h-32 w-32 flex justify-center items-center'>
                          <h2 className='text-6xl justify-center text-gray-600'>{getNameInitials(item?.tcustomer)}</h2>
                        </div>
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

            {arrayRange(0,Math.floor(data.length/2),1).map((_,i) => {
              
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
