'use client'

import { PutBlobResult } from '@vercel/blob';
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateUser, createUser } from '../utils/actions'
import { useState, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded my-2'>
     {pending ? 'Adding...' : 'Add'}
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded my-2'>
      {pending ? 'Updating' : 'Update'}
    </button>
  )
}
 

export function AddUserForm({
  areagroup,
}: {
  areagroup: any;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const [state, formAction] = useFormState(createUser, initialState)
   
    return (
      <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add User
      </h2>
    </div>

    <div className="w-full md:flex mt-6 mx-auto">
    <div className='w-4/5 px-4'>    

    <p className='my-2 py-2 border-1'>{state?.message}
    </p>
    <form action={formAction}>

        <div>
        <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="first_name" 
            name="first_name" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="last_name" 
            name="last_name" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="email" 
            name="email" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="address" 
            name="address" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="ranking" className="block text-sm font-medium leading-6 text-gray-900">Ranking</label>
          <div className="mt-2">
          <select
                  id="areagroup"
                  name="areagroup"
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {areagroup.length > 0 &&
                    areagroup.map((item: any, i: number) => {
                      return (
                        <option key={i} value={item.agname}>
                          {item.agname}
                        </option>
                      );
                    })}
                </select>
          </div>
        </div>

        <div>
        <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">Latitude</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="latitude" 
            name="latitude" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">Longitude</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="longitude" 
            name="longitude" 
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>


        <div>
        <label htmlFor="userrole" className="block text-sm font-medium leading-6 text-gray-900">Type</label>
          <div className="mt-2">
          <select 
            id="userrole" 
            name="userrole" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='fleetownerdriver'>FleetOwner Driver</option>
            <option value='watermerchant'>Water Merchant</option>
            </select>
          </div>
        </div>

        <div className='my-2 py-2'>
          <h2 className='text-xl'>Login details</h2>
        </div>

        <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="username" 
            name="username" 
            min={3}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
          <input 
            type="password" 
            id="password" 
            name="password" 
            min={6}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <input type="hidden" id="photourl" name="photourl" defaultValue={blob?.url}/>

        <div className='my-2'>
                 <SubmitButton /> <Link href='/account/users' className='px-2 py-3 ml-2 bg-gray-200 rounded'>
      Cancel
    </Link>
                  </div> 
                  
                  <p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>
      <div className='w-1/5'>
      <div>
        <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];
 
          const formData = new FormData();

          formData.append("file", file)
          formData.append("action", 'upload')
 
          const response = await fetch(
            'https://support.orbansprings.com/api/upload_file.php',
            {
              method: 'POST',
              body: formData,
            },
          );
 
          // const newBlob = (await response.json()) as PutBlobResult;
          const newBlob = await response.json();
          setBlob(newBlob);
        }}
      >
        {blob && <Image
              height={100}
              width={200}
              src={`${blob?.url}`}
              alt={''}
              className='rounded-lg h-[100px] mb-4'
            /> }

        <input name="file" ref={inputFileRef} type="file" required />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>
      </div>
      </div>


    </div>
  </div>


</>
)
  }
  
  export function UpdateUserForm({user, areagroup}: {user:any, areagroup:any}) {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
  
   const updateUserWithId = updateUser.bind(null, user.id)
   const [state, formAction] = useFormState(updateUserWithId, initialState)
   
   const photoImg = user?.photo.includes('https') ? `${user?.photo}` : `https://app.orbansprings.com/${user?.photo}`

   return (
    <>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update user
                </h2>
              </div>
      
              <div className="w-full md:flex mt-6 mx-auto">
              <div className='w-4/5 px-4'>    
              <form action={formAction}>

                <p className='my-2 py-2 border-1'>{state?.message}
                </p>


        <div className='my-2 my-2'>
        <h2 className='text-xl'>Username:</h2> {user?.username} {user?.photo}
        </div>

        <div>
        <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="first_name" 
            name="first_name" 
            defaultValue={user?.first_name}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="last_name" 
            name="last_name" 
            defaultValue={user?.last_name}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="email" 
            name="email" 
            defaultValue={user?.email}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            defaultValue={user?.phone}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="address" 
            name="address" 
            defaultValue={user?.address}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="ranking" className="block text-sm font-medium leading-6 text-gray-900">Ranking</label>
          <div className="mt-2">
          <select
                  id="areagroup"
                  name="areagroup"
                  defaultValue={user?.areagroup}
                  required
                  className="block w-full h-[50px] p-5 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {areagroup.length > 0 &&
                    areagroup.map((item: any, i: number) => {
                      return (
                        <option key={i} value={item.agname}>
                          {item.agname}
                        </option>
                      );
                    })}
                </select>
          </div>
        </div>

        <div>
        <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">Latitude</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="latitude" 
            name="latitude" 
            defaultValue={user?.latitude}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">Longitude</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="longitude" 
            name="longitude" 
            defaultValue={user?.longitude}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>


        <div>
        <label htmlFor="userrole" className="block text-sm font-medium leading-6 text-gray-900">Type</label>
          <div className="mt-2">
          <select 
            id="userrole" 
            name="userrole" 
            defaultValue={user?.role}
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='fleetownerdriver'>FleetOwner Driver</option>
            <option value='watermerchant'>Water Merchant</option>
            </select>
          </div>
        </div>

        <input type="hidden" id="uploadedpic" name="uploadedpic" defaultValue={blob?.url}/>
        <input type="hidden" id="photourl" name="photourl" defaultValue={user?.photo}/>



    
        <div className='my-2'>
                 <EditButton /> <Link href='/account/users' className='px-2 py-3 ml-2 bg-gray-200 rounded'>
      Cancel
    </Link>
                  </div> 
                  <p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>

                </div>
      <div className='w-1/5'>
      <div>
        <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];
 
          const formData = new FormData();

          formData.append("file", file)
          formData.append("action", 'upload')
 
          const response = await fetch(
            'https://support.orbansprings.com/api/upload_file.php',
            {
              method: 'POST',
              body: formData,
            },
          );
 
          // const newBlob = (await response.json()) as PutBlobResult;
          const newBlob = await response.json();
          setBlob(newBlob);
        }}
      >
        {blob && <Image
              height={100}
              width={200}
              src={`${blob?.url}`}
              alt={''}
              className='rounded-lg h-[100px] mb-4'
            /> }

        <input name="file" ref={inputFileRef} type="file" required />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>

      <Image
              height={120}
              width={200}
              src={`${photoImg}`}
              alt={user?.name}
              className='rounded-lg h-[100px] mt-4'
            />

      </div>
      </div>

      
              </div>
            </div>
          
       
    </>

    )
  }
