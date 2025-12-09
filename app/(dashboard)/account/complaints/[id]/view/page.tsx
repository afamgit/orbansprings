import { prisma } from "@/scripts";
import { ComplaintReplyForm } from "@/app/components/complaint-reply";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import moment from "moment";
import {
  FaChevronLeft,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Message",
};

export default async function Message({ params }: { params: any }) {
  const {id} = await params;
  const userInfo = await auth()

  const usremail = userInfo?.user.email || ''

  const profile = await prisma?.users.findFirst({
    where: {email: usremail},
    select: {
      id: true,
      username: true,
      name: true,
      phone: true
    }
  })

  const message = await prisma.contact_messages.findUnique({
    where: {
      cid: parseInt(id),
    },
  });

  const replies = await prisma.complaints_replies.findMany({
    where: {complaintid: parseInt(id)},
    orderBy: {'createdAt': 'desc'}
  })

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Complaints",
              href: "/account/complaints",
            },
            {
              label: "View Message",
              href: `/account/complaints/${id}/view`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full flex flex-col justify-start items-start p-6">
        <div className="w-full md:w-[1100px] flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link className="text-gray-900 mr-2" href="/account/complaints">
              <FaChevronLeft size={24} />
            </Link>
            <Image
              src="/noimage.png"
              height={60}
              width={60}
              alt="photo"
              className="rounded-full mr-2"
            />
            <div>
              <h2 className="text-2xl md:text-4xl">{message?.cname}</h2>
              <div className="flex text-xl">
                {message?.cphone} | {message?.cemail} |{" "}
                {moment(message?.createdAt).format("MMM Do")}
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border-2 border-sky-300 rounded">
            Forward
          </button>
        </div>

        <div className="my-1 py-2 w-full flex justify-start items-end">
          <div className="text-4xl">{message?.csubject}</div>
        </div>
        <div className="my-1 py-2">
          <div
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: message?.cmessage || "" }}
          />
        </div>

        <div className="w-full my-3 border-t-2 border-t-gray-300">
          {replies.map((item,i) => {
            return (
              <div key={i} className="w-full my-2 shadow-md p-3">
                <p className="text-xl mb-3">{item.creplymessage}</p>

               <p className="text-gray-800 text-sm">{item.creplyname} <br /> {item.creplyphone} <br /> Date: {moment(item.createdAt).format('Do MMM YYYY hh:mma')}</p>
              </div>
            )
          })}

        </div>

<ComplaintReplyForm message={message} name={profile?.name} phone={profile?.phone} />


      </div>
    </main>
  );
}
