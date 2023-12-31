import { signOut } from "@/auth";
import { PowerIcon } from '@heroicons/react/24/outline';


export default function SignOut() {
    return (
      <form
        action={async () => {
            'use server'
          await signOut();
        }}
        className="w-full flex justify-end items-center"
      >
<button className="flex h-[32px] grow items-center bg-black justify-end gap-2 ml-2 rounded-md bg-red-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-end md:p-1 md:px-2">
        <PowerIcon className="h-5 w-5 text-slate-100" />
      </button>
      </form>
    );
  }