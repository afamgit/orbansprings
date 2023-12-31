import { prisma } from "@/scripts";
import { ComplaintReplyForm } from "@/app/components/complaint-reply";
import { fetchCustomers } from "@/app/utils/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import moment from "moment";
import {
  FaArrowAltCircleLeft,
  FaArrowLeft,
  FaChevronLeft,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Notification",
};

export default async function Message({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const message = await prisma.usermessages.findUnique({
    where: {
      umsgid: id,
    },
  });

  return (
    <main className="w-full md:w-[1100px] flex flex-col justify-center items-center">
      <div className="w-full flex justify-end items-start">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Account", href: "/account" },
            {
              label: "Notifications",
              href: "/account/notifications",
            },
            {
              label: "View Message",
              href: `/account/notifications/${id}/view`,
              active: true,
            },
          ]}
        />
      </div>

      <div className="w-full flex flex-col justify-start items-start p-6">
        <div className="w-full md:w-[1100px] flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link className="text-gray-900 mr-2" href="/account/notifications">
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
              <h2 className="text-2xl md:text-4xl">{message?.umsg_sender}</h2>
              <div className="flex text-xl">
                {message?.umsg_cat} | {message?.umsg_user} |{" "}
                {moment(message?.umsg_time).format("MMM Do, YYYY")}
              </div>
            </div>
          </div>
        </div>

        <div className="my-1 py-2 w-full flex justify-start items-end">
          <div className="text-4xl">{message?.umsg_title}</div>
        </div>
        <div className="my-1 py-2">
          <div
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: message?.umsg_body || "" }}
          />
        </div>

      </div>
    </main>
  );
}
