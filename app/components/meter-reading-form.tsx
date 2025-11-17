'use client'
 
import { useFormState, useFormStatus } from 'react-dom'
import { saveMeterReading } from '@/app/utils/actions'
import { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
 
const initialState = {
  message: '',
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      Add
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      Update
    </button>
  )
}

 
export function AddMeterReadingForm({meters}: {meters: any[]}) {
    const [state, formAction] = useActionState(saveMeterReading, initialState)
    const [meterId, setMeterId] = useState('')
    const [readingDate, setReadingDate] = useState(new Date().toISOString().split('T')[0])
    const [readingValue, setReadingValue] = useState('')
    const [readingType, setReadingType] = useState('first')
    const router = useRouter();
   
    return (
      <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add meter reading
      </h2>

                        {state?.message && <p className='bg-green-700 text-white rounded-lg px-10 py-1 mt-4' aria-live="polite">
          {state?.message}
        </p>}

    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action={formAction}>

        <div>
          <label htmlFor="meterId" className="block text-sm font-medium leading-6 text-gray-900">Meter</label>
          <div className="mt-2">
            <select
              id="meterId"
              name="meterId"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setMeterId(e.target.value)}
              value={meterId}
            >
              <option value="">Select a meter</option>
              {meters.map((meter:any) => (
                <option key={meter.meterid} value={meter.meterid}>
                  {meter.m_unique_id} - {meter.m_assigned_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="reading_date" className="block text-sm font-medium leading-6 text-gray-900">Reading Date</label>
          <div className="mt-2">
            <input
              type="date"
              id="reading_date"
              name="reading_date"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setReadingDate(e.target.value)}
              value={readingDate}
            />
          </div>
        </div>

        <div>
          <label htmlFor="readingValue" className="block text-sm font-medium leading-6 text-gray-900">Reading Value</label>
          <div className="mt-2">
            <input
              type="text"
              id="readingValue"
              name="readingValue"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setReadingValue(e.target.value)}
              value={readingValue}
            />
          </div>
        </div>

        <div>
          <label htmlFor="readingType" className="block text-sm font-medium leading-6 text-gray-900">Reading Type</label>
          <div className="mt-2">
            <select
              id="readingType"
              name="readingType"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setReadingType(e.target.value)}
              value={readingType}
            >
              <option value="first">First Reading</option>
              <option value="afternoon">Afternoon Reading</option>
              <option value="last">Last Reading</option>
            </select>
          </div>
        </div>
    
                      <div className='mt-4 flex flex-row justify-between items-center'>
        <SubmitButton />
                    <button type="button" onClick={() => router.back()} className='bg-gray-300 text-gray-800 px-4 py-1 rounded'>
      Go Back
    </button>
    </div>

</form>

    </div>
  </div>


</>
)
  }
  
  export function UpdateMeterReadingForm({reading, meters}: {reading: any, meters: any[]}) {

   const updateMeterReadingWithId = saveMeterReading
   const [state, formAction] = useActionState(updateMeterReadingWithId, initialState)

   const [meterId, setMeterId] = useState(reading?.meterId || '')
   const [readingDate, setReadingDate] = useState(new Date(reading.reading_date).toISOString().split('T')[0])
   const [readingValue, setReadingValue] = useState(() => {
    if (reading.last_reading) return reading.last_reading;
    if (reading.afternoon_reading) return reading.afternoon_reading;
    if (reading.first_reading) return reading.first_reading;
    return '';
   });
   const [readingType, setReadingType] = useState(() => {
    if (reading.last_reading) return 'last';
    if (reading.afternoon_reading) return 'afternoon';
    if (reading.first_reading) return 'first';
    return 'first';
   });
   const router = useRouter();

   return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update meter reading
          </h2>

                        {state?.message && <p className='bg-green-700 text-white rounded-lg px-10 py-1 mt-4' aria-live="polite">
          {state?.message}
        </p>}

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction}>
        <input type="hidden" name="meterId" value={meterId} />
        <input type="hidden" name="reading_date" value={readingDate} />
        <div>
          <label htmlFor="meterId" className="block text-sm font-medium leading-6 text-gray-900">Meter</label>
          <div className="mt-2">
            <select
              id="meterId"
              name="meterId"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={meterId}
              onChange={(e) => setMeterId(e.target.value)}
              disabled
            >
              <option value="">Select a meter</option>
              {meters.map((meter) => (
                <option key={meter.meterid} value={meter.meterid}>
                  {meter.m_unique_id} - {meter.m_assigned_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="reading_date" className="block text-sm font-medium leading-6 text-gray-900">Reading Date</label>
          <div className="mt-2">
            <input
              type="date"
              id="reading_date"
              name="reading_date"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={readingDate}
              onChange={(e) => setReadingDate(e.target.value)}
              disabled
            />
          </div>
        </div>

        <div>
          <label htmlFor="readingValue" className="block text-sm font-medium leading-6 text-gray-900">Reading Value</label>
          <div className="mt-2">
            <input
              type="text"
              id="readingValue"
              name="readingValue"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setReadingValue(e.target.value)}
              value={readingValue}
            />
          </div>
        </div>

        <div>
          <label htmlFor="readingType" className="block text-sm font-medium leading-6 text-gray-900">Reading Type</label>
          <div className="mt-2">
            <select
              id="readingType"
              name="readingType"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setReadingType(e.target.value)}
              value={readingType}
            >
              <option value="first">First Reading</option>
              <option value="afternoon">Afternoon Reading</option>
              <option value="last">Last Reading</option>
            </select>
          </div>
        </div>
              
                  <div className='mt-4 flex flex-row justify-between items-center'>
                    <EditButton />
                    <button type="button" onClick={() => router.back()} className='bg-gray-300 text-gray-800 px-4 py-1 rounded'>
      Go Back
    </button>
    </div>
        </form>
      
              </div>
            </div>
          
       
    </>

    )
  }
