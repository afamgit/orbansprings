'use client'
 
import { PutBlobResult } from '@vercel/blob';
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createPage, updateTeam, deletePage, createTeam } from '../utils/actions'
import Link from 'next/link';
 
const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      {pending ? 'Adding...' : 'Add'}
    </button>
  )
}
 
function EditButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='p-2 bg-blue-300 rounded'>
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}
 
function DeleteButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

 


export function AddTeamForm() {
  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const [state, formAction] = useFormState(createTeam, initialState)
   
    return (
      <>

      <div className="flex min-h-full md:w-[1000px] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add Team member
      </h2>
    </div>

    <div className="w-full md:flex mt-6 mx-auto">
    <div className='w-3/5 px-4'>
        <form action={formAction}>
        <div>
        <label htmlFor="ranking" className="block text-sm font-medium leading-6 text-gray-900">Ranking</label>
          <div className="mt-2">
          <select 
            id="ranking" 
            name="ranking" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">Position</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="position" 
            name="position" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="profile" className="block text-sm font-medium leading-6 text-gray-900">Profile</label>
          <div className="mt-2">
          <textarea 
            rows={4}
            id="profile" 
            name="profile" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>
        <input type="hidden" id="photourl" name="photourl" value={blob?.url}/>

    
        <div className='flex my-2 py-2'>
        <Link className='mr-2 px-3 py-1 rounded bg-gray-200 text-gray-800' href='/account/teams'>Cancel</Link>
        <SubmitButton /> 
                  </div>
<p aria-live="polite" className="sr-only">
{state?.message}
</p>
      </form>
      </div>
      <div className='w-2/5'>
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
              height={200}
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
  
  export function UpdateTeamForm({team}: {team: any}) {
    const router = useRouter();

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

   const updateTeamWithId = updateTeam.bind(null, team.tmemberid)
   const [state, formAction] = useFormState(updateTeamWithId, initialState)

   const photoImg = team?.tmemberphoto.includes('https') ? `${team?.tmemberphoto}` : team?.tmemberphoto.includes('images') ? `https://support.orbansprings.com/${team?.tmemberphoto}` : `/${team?.tmemberphoto}`


   return (
    <>

                <div className="flex min-h-full md:w-[1000px] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update team member
                </h2>
              </div>
      
              <div className="w-full md:flex mt-6 mx-auto">
              <div className='w-3/5 px-4'>
                  <form action={formAction}>
        <div>
        <label htmlFor="ranking" className="block text-sm font-medium leading-6 text-gray-900">Ranking</label>
          <div className="mt-2">
          <select 
            id="ranking" 
            defaultValue={team.tmemberrank}
            name="ranking" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </select>
          </div>
        </div>

        <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="name" 
            defaultValue={team.tmember}
            name="name" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">Position</label>
          <div className="mt-2">
          <input 
            type="text" 
            id="position" 
            defaultValue={team.tmemberposition}
            name="position" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <div>
        <label htmlFor="profile" className="block text-sm font-medium leading-6 text-gray-900">Profile</label>
          <div className="mt-2">
          <textarea 
            rows={4}
            id="profile" 
            defaultValue={team.tmemberprofile}
            name="profile" 
            required
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          />
          </div>
        </div>

        <input type="hidden" id="photourl" name="photourl" defaultValue={team?.tmemberphoto}/>
        <input type="hidden" id="uploadedpic" name="uploadedpic" defaultValue={blob?.url}/>

              
        <div className='flex my-2 py-2'>
                  <Link className='mr-2 px-3 py-1 rounded bg-gray-200 text-gray-800' href='/account/teams'>Cancel</Link>
                  <EditButton /> 
                  </div>
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
                </form>
                </div>

                <div className='w-2/5'>
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
              height={200}
              width={200}
              src={`${blob?.url}}`}
              alt={team?.tmember}
              className='rounded-lg h-[100px] mb-4'
            />}

        <input name="file" ref={inputFileRef} type="file" />
        <button className='mt-3 bg-gray-600 text-white rounded px-3 py-1' type="submit">Upload</button>
      </form>

      <Image
              height={220}
              width={200}
              src={`${photoImg}`}
              alt={team?.tmember}
              className='rounded-lg h-[200px] mt-4'
            />

        </div>

                </div>
      
              </div>
            </div>
          
       
    </>

    )
  }

// export function DeleteButtonForm(id) {
//   const [state, formAction] = useFormState(deletePage, initialState)
 
//   return (
//     <form action={formAction}>
//       <input value={id} type='hidden' id="todo" name="todo" required />
//       <DeleteButton />
//       <p aria-live="polite" className="sr-only">
//         {state?.message}
//       </p>
//     </form>
//   )
// }
