'use client'


import { useState, useEffect } from "react"
import {areas} from '../../utils/data'


 function TestingCustomersPerArea() {

    const [chartData, setChartData] = useState(null)
    const [location, setLocation] = useState('')
    const [userSelect, setUserSelect] = useState(false)
    const [msg, setMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)


    useEffect(() => {
       userSelect && handleSubmit()
    },[location])

    const handleSubmit = async () => {

        setMsg(null)
        setErrorMsg(null)


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
            cache: 'no-store'
        })

        console.log('got here')

        const res = await response.json()
        console.log(res.data)
        console.log('from customer', JSON.stringify(res.data))

        // if(res.data === null) {
        //     setMsg(res.message) 
        // } else {
        //     setChartData(res.data)
        // } 

       } catch(error) {
       console.log(error)
       }
       
    }


    return (
        <>
        <div>
            <h1 className="mt-10 text-xl font-semibold capitalize ">Customers Per area</h1>
            
            <div>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        

        {msg && (
            <>
              <p className="text-sm text-red-600">{msg}</p>
            </>
          )}

        <div className="w-full">

        <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
          <div className="mt-2">
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
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
                <option value=''>Selecta area</option>
            {areas?.length > 0 && areas.map((item,i) => {
            return (
                <option key={i} value={item}>{item}</option>
            )
            })
        }
            </select>
          </div>
        </div>

        </div>
      </div>
    </div>
            </div>
        </>
    )
}

export default TestingCustomersPerArea;