'use client'

import { deletePage, deleteTestimonial, deleteTeam, deleteMeter, deleteUser } from '@/app/utils/actions';
import Link from 'next/link';
import { BsTrash2Fill, BsPencilSquare } from 'react-icons/bs';


export function DeletePage({ id }: { id: string }) {
   
    return (
        <button onClick={() => {
          if(confirm('Confirm you want to delete this page. This action is irreversible') === true) {
            deletePage(id)}
         }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdatePage({ page }: { page: any }) {

   
    return (
      <Link
        href={`/account/content-pages/${page.cpageid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
      </Link>
    );
  }

  export function DeleteTestimonial({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete this testimonial. This action is irreversible') === true) {
          deleteTestimonial(id)}
       }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateTestimonial({ testimonial }: { testimonial: any }) {

   
    return (
      <Link
        href={`/account/testimonials/${testimonial.tid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
      </Link>
    );
  }

  export function DeleteTeam({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete this team member. This action is irreversible') === true) {
          deleteTeam(id)}
       }} className="rounded-md border p-2 hover:bg-gray-100"> 
         <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateTeam({ team }: { team: any }) {

   
    return (
      <Link
        href={`/account/teams/${team.tmemberid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
      </Link>
    );
  }

  export function DeleteMeter({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete this meter. This action is irreversible') === true) {
          deleteMeter(id)}
       }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateMeter({ meter }: { meter: any }) {

   
    return (
      <Link
        href={`/account/meters/${meter.meterid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
          </div>
      </Link>
    );
  }
  
  export function DeleteUser({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete this user. This action is irreversible') === true) {
          deleteUser(id)}
       }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateUser({ user }: { user: any }) {

   
    return (
      <Link
        href={`/account/users/${user.id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
          </div>
      </Link>
    );
  }
  