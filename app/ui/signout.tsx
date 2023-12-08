import { signOut } from "@/auth";
import { PowerIcon } from '@heroicons/react/24/outline';


export default function SignOut() {
    return (
      <form
        action={async () => {
            'use server'
          await signOut();
        }}
        className="w-full"
      >
<button className="flex h-[32px] grow items-center bg-black justify-center gap-2 ml-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-1 md:px-2">
        <PowerIcon className="ml-2 h-5 w-5 text-slate-700" />
        <div className="hidden md:block text-slate-600">Sign Out</div>
      </button>
      </form>
    );
  }