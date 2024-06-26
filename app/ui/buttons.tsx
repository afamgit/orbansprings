'use client'

import { deletePage, deleteNewsletter, deleteSubscription, deleteArticle, deleteAccount, deleteProduct, deleteAreaGroup, deleteTestimonial, deleteTeam, deleteMeter, deleteUser, deleteFaq } from '@/app/utils/actions';
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

  export function DeleteSubscription({ id }: { id: string }) {
   
    return (
        <button onClick={() => {
          if(confirm('Confirm you want to delete this subscription plan. This action is irreversible') === true) {
            deleteSubscription(id)}
         }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateSubscription({ plan }: { plan: any }) {

   
    return (
      <Link
        href={`/account/subscriptions/${plan.subplanid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
      </Link>
    );
  }

  export function DeleteNewsletter({ id }: { id: string }) {
   
    return (
        <button onClick={() => {
          if(confirm('Confirm you want to delete this newsletter. This action is irreversible') === true) {
            deleteNewsletter(id)}
         }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateNewsletter({ newsletter }: { newsletter: any }) {

   
    return (
      <Link
        href={`/account/newsletters/${newsletter.nlb_id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
      </Link>
    );
  }

  export function DeleteAccount({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete your account. This action is irreversible') === true) {
          deleteAccount(id)}
       }} className="rounded-md border p-2 bg-blue-300 hover:bg-blue-400">
          <span className='text-gray-900'>Delete Profile</span>
        </button>
    );
  }

  export function DeleteBlog({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete this article. This action is irreversible') === true) {
          deleteArticle(id)}
       }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateDriver ({ driver }: { driver: string }) {

   
    return (
      <Link
        href={`/account/vendor-merchants/drivers/${driver}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' />
          </div>
      </Link>
    );
  }

  export function UpdateTruck ({ truck }: { truck: string }) {

   
    return (
      <Link
        href={`/account/vendor-merchants/fleet/${truck}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' />
          </div>
      </Link>
    );
  }

  export function UpdateBlog({ article }: { article: any }) {

   
    return (
      <Link
        href={`/account/blog/${article.artid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
          </div>
      </Link>
    );
  }

  export function DeleteProduct({ id }: { id: string }) {
   
    return (
        <button onClick={() => {
          if(confirm('Confirm you want to delete this product. This action is irreversible') === true) {
            deleteProduct(id)}
         }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateProduct({ product }: { product: any }) {

   
    return (
      <Link
        href={`/account/products/${product.id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
      </Link>
    );
  }

  export function UpdateProductPrices({ id }: { id: any }) {

   
    return (
      <Link
        href={`/account/products/${id}/prices`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <span className="sr-only">Manage prices</span> <span className='hidden md:block'>Manage prices</span>
      </Link>
    );
  }

  export function DeleteAreaGroup({ id }: { id: string }) {
   
    return (
        <button onClick={() => {
          if(confirm('Confirm you want to delete this area group. This action is irreversible') === true) {
            deleteAreaGroup(id)}
         }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateAreaGroup({ areagroup }: { areagroup: any }) {

   
    return (
      <Link
        href={`/account/areagroups/${areagroup.agid}/edit`}
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
  
  export function DeleteFaq({ id }: { id: string }) {
   
    return (
      <button onClick={() => {
        if(confirm('Confirm you want to delete this user. This action is irreversible') === true) {
          deleteFaq(id)}
       }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span> <BsTrash2Fill className='text-2xl text-red-600' /><span className='hidden md:block'>Delete</span>
        </button>
    );
  }

  export function UpdateFaq({ faq }: { faq: any }) {

   
    return (
      <Link
        href={`/account/faqs/${faq.faqid}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
          <div className='flex justify-center items-center'>
          <span className="sr-only">Update</span> <BsPencilSquare className='text-2xl' /><span className='hidden md:block'>Update</span>
          </div>
      </Link>
    );
  }
  