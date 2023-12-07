import Link from 'next/link'

export default function Dashboard() {


      return (
        <main>
        <div className='flex flex-col justify-center items-center my-5 py-5'>
          <h1 className='text-3xl'>Account</h1>

          <div className='flex flex-col justify-center items-center p-5'>
            <div className='my-2 py-2'>
          <Link className='my-2 py-2 bg-zinc-800 text-white rounded px-3' href='/account/admin'>Admin</Link>
          </div>
          {/* <div className='my-2 py-2'>
          <Link className='my-2 py-2' href='/account/meter-owners'>Meter Owners</Link>
          </div>
          <div className='my-2 py-2'>
          <Link className='my-2 py-2' href='/account/vendors'>Vendors</Link>
          </div>
          <div className='my-2 py-2'>
          <Link className='my-2 py-2' href='/account/fleet-owners'>FleetOwners</Link>
          </div> */}
          </div>
          </div>

        </main>
      )
}