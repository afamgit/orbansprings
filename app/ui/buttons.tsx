'use client'

import { deletePage, deleteTestimonial, deleteTeam, deleteMeter } from '@/app/utils/actions';
import Link from 'next/link';
import { BsTrash2Fill, BsPencilSquare } from 'react-icons/bs';


export function DeletePage({ id }: { id: string }) {
   
    return (
        <button onClick={() => deletePage(id)} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>Delete
        </button>
    );
  }

  export function UpdatePage({ page }: { page: any }) {

   
    return (
      <Link
        href={`/account/admin/content-pages/${page.cpageid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span>Update
      </Link>
    );
  }

  export function DeleteTestimonial({ id }: { id: string }) {
   
    return (
        <button onClick={() => deleteTestimonial(id)} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>Delete
        </button>
    );
  }

  export function UpdateTestimonial({ testimonial }: { testimonial: any }) {

   
    return (
      <Link
        href={`/account/admin/testimonials/${testimonial.tid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span>Update
      </Link>
    );
  }

  export function DeleteTeam({ id }: { id: string }) {
   
    return (
        <button onClick={() => deleteTeam(id)} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>Delete
        </button>
    );
  }

  export function UpdateTeam({ team }: { team: any }) {

   
    return (
      <Link
        href={`/account/admin/teams/${team.tmemberid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span>Update
      </Link>
    );
  }

  export function DeleteMeter({ id }: { id: string }) {
   
    return (
        <button onClick={() => deleteMeter(id)} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>Delete
        </button>
    );
  }

  export function UpdateMeter({ meter }: { meter: any }) {

   
    return (
      <Link
        href={`/account/admin/meters/${meter.meterid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' />
          </div>
      </Link>
    );
  }
  