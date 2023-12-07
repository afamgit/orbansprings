'use client'

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {
  BsChevronDown, BsChevronRight
} from "react-icons/bs";


export const Faq = ({data}) => {

    const [showAns, setShowAns] = useState(false);
    const [faqSelected, setFaqSelected] = useState('');


  const handleFaqSelected = (question) => {
    setFaqSelected('');
    setShowAns(!showAns);
    setFaqSelected(question);
    setShowAns(true);
  }

  return (
    <div
      className="w-full md:w-[1200px] mx-auto rounded p-3 my-3"
    >
        {data.map((item,i) => {
        
        return (
            <div key={i} className='my-2 py-2'>
                <div className='flex justify-between items-center text-xl font-medium cursor-pointer' onClick={() => handleFaqSelected(item.faqid)}>
                {item.faqquestion}
                {faqSelected === item.faqid && showAns ? <BsChevronDown /> : <BsChevronRight />}
                </div>
            {faqSelected === item.faqid && showAns && 
                <div className='text-gray-500 py-1'>
                    {item.faqanswer}
                </div>}
            </div>)


})
}
</div>)
        
};
