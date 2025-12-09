import { signOut } from "@/auth";


export default function SignOutUser() {
    return (
      <form
        action={async () => {
          'use server'

              await signOut()}
        }
        className="w-full flex justify-start items-center"
      >
<button className="rounded-md border p-2 bg-blue-300 hover:bg-blue-400">
<span className='text-gray-900'>Sign Out User</span>
      </button>
      </form>
    );
  }