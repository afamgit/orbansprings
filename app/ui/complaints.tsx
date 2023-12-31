import { prisma } from "@/scripts";
import Image from "next/image";
import Link from "next/link";
import { fetchFilteredComplaints } from "../utils/data";
import moment from "moment";

export default async function Complaints({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const getComplaints = await fetchFilteredComplaints(query, currentPage);

  const allComplaints = JSON.parse(JSON.stringify(getComplaints));

  const total = await prisma.contact_messages.count();

  return (
    <main className="w-full flex flex-col justify-start items-start">
      <p className="text-3xl my-3 py-3">Recent</p>

      <div className='w-full md:w-[1100px]  bg-white'>
    {allComplaints.length > 0 && allComplaints.slice(0,5).map((item:any,i:number) => {
        return (
          <Link key={i} href={`/account/complaints/${item.cid}/view`}> 
          <div className='w-full flex justify-between items-center border-b-slate-100 border-b-2 px-3 py-1 md:px-5 md:py-3'>
          <div>{++i}</div>              
          <div>{item.cname}</div>
          <div>{item.cphone}</div>
          <div className='w-3/4'>{item.csubject}: {item.cmessage}</div>
            <div>{moment(item.createdAt).format('MMM DD')}</div>
            
          </div></Link>
        )
    }
    )
    }

</div>

     
      <p className="text-3xl my-3 py-3 text-gray-500">Older</p>

      <div className='w-full md:w-[1100px]  bg-white'>
    {allComplaints.length > 0 && allComplaints.slice(5).map((item:any,i:number) => {
        return (
          <Link key={i} href={`/account/complaints/${item.cid}/view`}> 
          <div className='w-full flex justify-between items-center border-b-slate-100 border-b-2 px-3 py-1 md:px-5 md:py-3'>
          <div>{++i}</div>              
          <div>{item.cname}</div>
          <div>{item.cphone}</div>
          <div className='w-3/4'>{item.csubject}: {item.cmessage}</div>
            <div>{moment(item.createdAt).format('MMM DD')}</div>
            
          </div></Link>
        )
    }
    )
    }

</div>

     

    </main>
  );
}
