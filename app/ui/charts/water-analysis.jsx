'use client'


import { useState, useEffect } from "react"
import {FaSquareFull}from 'react-icons/fa'
import WaterChart from './water-chart'

 function WaterAnalysis() {


    const [chartData, setChartData] = useState([14,8,18,60])
    const [chartLabels, setChartLabels] = useState([])
    const [msg, setMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        getWaterAnalysis()
    },[])

    const getWaterAnalysis = async () => {
        setMsg(null)
        setErrorMsg(null)


       try {

        const response = await fetch('/api/user/meters/water-analysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"role": "admin"})
        })

        const res = await response.json()

        if(res.data.length === 0) {
            setMsg(res.message) 
        } else {
            let thedate = res.data
            let dataChart = []
            let dataLabels = []

            thedate.map((item,i) => {
                dataChart.push(parseInt(item._count.id))
                dataLabels.push(item.subscription_plan)
            })
            setChartLabels(dataLabels)
            // setChartData([14,8,18,60])

        } 
       } catch(error) {
       console.log(error)
       }
       
    }




    return (
        <>
        <div className="px-5 border-2 border-slate-200 rounded-lg">
            <h1 className="mt-10 mb-4 text-2xl font-semibold capitalize  border-b-2 border-b-gray-200 pb-3">Water Analysis</h1>
            <p className="text-xl my-3 py-2">This is the current composition of the Orban Springs water.</p>
            <div>

        <div className="w-full flex justify-between items-center px-2">

          <div className="h-[40px]">

        </div>
        <div className="grid grid-cols-2 gap-2">
         <div className='w-full flex justify-start items-center px-1 text-xl bg-slate-100'>
                    <FaSquareFull className='h-3 w-3 mr-1 text-zinc-300' /> Sulphur
                </div>
                <div className='w-full flex justify-start items-center px-1 text-xl bg-slate-00'>
                    <FaSquareFull className='h-3 w-3 mr-1 text-blue-800' /> Chlorine
                </div>
        <div className='w-full flex justify-start items-center px-1 text-xl bg-slate-100'>
                    <FaSquareFull className='h-3 w-3 mr-1 text-orange-700' /> Nitrogen
                </div>
                <div className='w-full flex justify-start items-center px-1 text-xl bg-slate-100'>
                    <FaSquareFull className='h-3 w-3 mr-1 text-orange-900' /> Oxygen
                </div>
        </div>

        </div>
      </div>

   <div className="flex justify-center items-center">
    <WaterChart dataLabels={chartLabels} dataValues={chartData} />
    </div>
            </div>
        </>
    )
}

export default WaterAnalysis;