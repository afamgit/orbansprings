import { prisma } from "@/scripts";
import Image from "next/image";
import Link from "next/link";
import { fetchFilteredTestimonials } from "../utils/data";
import { UpdateTestimonial, DeleteTestimonial } from "@/app/ui/buttons";

export default async function Testimonials({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const allTestimonials = await fetchFilteredTestimonials(query, currentPage);

  const total = await prisma.testimonials.count();

  const getNameInitials = (name: string) => {
    const arr = name.split(" ");
    const first = arr[0];
    const second = arr[1];

    return `${first[0]}${second[0]}`;
  };

  return (
    <main className="w-full flex flex-col justify-start items-start">
      <div className="w-full flex justify-between iteams-center my-2 py-2">
        <h1 className="font-bold text-2xl">Testimonials ({total})</h1>
        <Link
          className="rounded-full px-3 py-2 bg-gray-800 text-white"
          href="/account/testimonials/create"
        >
          Add testimonial
        </Link>
      </div>

      <div className="w-full bg-white">
        <table className="w-full table-auto p-3 md:p-5" cellPadding={10}>
          <thead>
            <tr className="bg-gray-300 px-2 py-1">
              <th className="text-start">#</th>
              <th className="text-start hidden md:block">Photo</th>
              <th className="text-start">Name</th>
              <th className="text-start">Role</th>
              <th className="text-start flex justify-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {allTestimonials.length > 0 &&
              allTestimonials.map((item, i) => {
                const id = item.tid.toString();
                const imgUrl = item?.tphoto.includes("https")
                  ? `${item?.tphoto}`
                  : "";

                return (
                  <tr key={i} className="border-b-2 border-b-slate-100">
                    <td>{++i}</td>
                    <td className="hidden md:block">
                      {imgUrl !== "" ? (
                        <div className="w-32 h-32">
                          <Image
                            src={`${imgUrl}`}
                            height={96}
                            width={96}
                            alt={item.tcustomer}
                          />
                        </div>
                      ) : (
                        <div className="rounded-full bg-gray-200 h-24 w-24 flex justify-center items-center">
                          <h2 className="text-4xl justify-center text-gray-600">
                            {getNameInitials(item.tcustomer)}
                          </h2>
                        </div>
                      )}
                    </td>
                    <td>{item.tcustomer}</td>
                    <td>{item.trole}</td>
                    <td className="flex justify-end">
                      <UpdateTestimonial testimonial={item} />{" "}
                      <DeleteTestimonial id={id} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
