'use client'


import { useState, useEffect, useRef } from "react"
import Chart from 'chart.js/auto'
import {areas} from '../../utils/data'
import CustomersChart from './customers-chart'
import { fetchCustomersPerArea } from "../../utils/data"
import {FaSquareFull} from 'react-icons/fa'


 function CustomersPerArea() {

    const [chartData, setChartData] = useState([])
    const [chartLabels, setChartLabels] = useState([])
    const [location, setLocation] = useState('New Heaven')
    const [userSelect, setUserSelect] = useState(true)
    const [msg, setMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
      handleSubmit()
    },[location])

    const handleSubmit = async () => {

        setMsg(null)
        setErrorMsg(null)
        setChartData([])
        setChartLabels([])


       try {

            if (location === '' && userSelect === true) {
                alert('Select location to view customers')
                return
        }

        const response = await fetch('/api/user/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"area": location}),
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
            setChartData(dataChart)

        } 

       } catch(error) {
       console.log(error)
       }
       
    }


    return (
        <>
        <div className="px-5 border-2 border-slate-200 rounded-lg">
            <h1 className="mt-10 mb-4 text-2xl font-semibold capitalize ">Customers Per area</h1>
            <p className="text-xl my-3 py-2">Select an area to view the total customers in that area</p>
            <div>

        <div className="w-full flex justify-between items-center px-2">

          <div className="h-[40px]">
          <select 
            type="text" 
            id="location" 
            name="location" 
            value={location}
            onChange={(e) => {
                setUserSelect(true)
                setLocation(e.target.value)
            }}
            required
            className="block w-full p-2 px-2  bg-gray-200 h-[50px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" 
          >
            {areas?.length > 0 && areas.map((item,i) => {
            return (
                <option key={i} value={item}>{item}</option>
            )
            })
        }
            </select>
        </div>
        <div>
         <div className='w-full flex justify-start items-center px-1 text-xl bg-slate-100'>
                    <FaSquareFull className='h-3 w-3 mr-1 text-zinc-300' /> Basic
                </div>
                <div className='w-full flex justify-start items-center px-1 text-xl bg-slate-100'>
                    <FaSquareFull className='h-3 w-3 mr-1 text-zinc-700' /> Premium
                </div>
        </div>

        </div>
      </div>

   {chartLabels.length > 0 && <div className="flex justify-center items-center">
    <CustomersChart dataLabels={chartLabels} dataValues={chartData} />
    </div>}
            </div>
        </>
    )
}

export default CustomersPerArea;