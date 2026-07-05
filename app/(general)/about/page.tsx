import Image from "next/image";
import { prisma } from "@/scripts";
import { BottomAppBannerHorizontal } from "@/app/components/bottom-app-banner-horizontal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function Page() {
  const about = await prisma.contentpages.findMany({
    where: { cpagemenu: "About" },
  });

  const partners = await prisma.contentpages.findMany({
    where: { cpagemenu: "Partner" },
  });

  const teamMembers = await prisma.team_members.findMany();

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center p-2 md:p-5">
        <h1 className="my-3 py-3 text-sky-600 font-bold text-5xl">About</h1>
        <h3 className="text-2xl my-2 py-2 font-medium">Orban Springs</h3>

        <p className="text-center">
          At Orban Springs we have reimagined eficiency in water distribution
          systems across Africa through the integration of IoT driven SMART
          technology and the deployment of innovative approaches that optimize
          water systems
        </p>

        <h3 className="my-3 py-3 text-blue-800 text-2xl font-bold">
          We welcome you to join us
        </h3>
      </div>

      <div className="max-w-[1200px] mx-auto h-full md:h-[500px] md:flex md:justify-center md:items-start p-8">
        <div className="md:w-2/5 justify-start items-start">
          <Image
            src={`/${about[0].cpagephoto}`}
            height={500}
            width={500}
            alt={about[0].cpagename}
          />
        </div>
        <div className="md:w-3/5 p-2">
          <h2 className="text-3xl my-3 py-2 text-blue-900">
            {about[0].cpagename}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: about[0].cpagecontent }} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto h-full md:h-[500px] md:flex md:justify-center md:items-center p-8">
        <div className="md:w-3/5 flex flex-col justify-start items-start order-2 md:order-1">
          <h2 className="text-3xl my-3 py-2 text-blue-900">
            {about[1].cpagename}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: about[1].cpagecontent }} />
        </div>
        <div className="md:w-2/5 p-2 order-1 md:order-2">
          <Image
            src={`/${about[1].cpagephoto}`}
            height={500}
            width={500}
            alt={about[1].cpagename}
          />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto h-full md:h-[500px] md:flex md:justify-center md:items-center p-8">
        <div className="md:w-2/5">
          <Image
            src={`/${about[2].cpagephoto}`}
            height={500}
            width={500}
            alt={about[2].cpagename}
          />
        </div>
        <div className="md:w-3/5 p-2 flex flex-col justify-start items-start">
          <h2 className="text-3xl my-3 py-2 text-blue-900">
            {about[2].cpagename}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: about[2].cpagecontent }} />
        </div>
      </div>

      <div className="bg-gradient-to-b from-sky-500 to-blue-700 py-16 px-4 md:px-8">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">Our Team</h1>

          <div className="flex flex-wrap justify-center items-stretch gap-8 mb-16">
            {teamMembers
              .filter((item) => item.tmemberrank === 1)
              .map((item, i) => {
                const photoImg = item?.tmemberphoto
                  ? (item.tmemberphoto.includes("https")
                    ? item.tmemberphoto
                    : item.tmemberphoto.startsWith("/")
                      ? item.tmemberphoto
                      : `/${item.tmemberphoto}`)
                  : "/images/noimage.png";

                return (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col items-center text-white rounded-3xl shadow-xl w-full sm:w-[360px] hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="w-full aspect-square relative overflow-hidden rounded-2xl mb-6 shadow-md">
                      <Image
                        src={photoImg}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        alt={item.tmember}
                        className="object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">
                      {item.tmember}
                    </h2>
                    <p className="text-sky-100 text-center text-sm font-medium tracking-wide uppercase">
                      {item.tmemberposition}
                    </p>
                  </div>
                );
              })}
          </div>

          <div className="w-full">
            <div className="flex flex-wrap justify-center items-stretch gap-6">
              {teamMembers
                .filter((item) => item.tmemberrank === 2)
                .map((item, i) => {
                  const photoImg = item?.tmemberphoto
                    ? (item.tmemberphoto.includes("https")
                      ? item.tmemberphoto
                      : item.tmemberphoto.startsWith("/")
                        ? item.tmemberphoto
                        : `/${item.tmemberphoto}`)
                    : "/images/noimage.png";

                  return (
                    <div
                      key={i}
                      className="p-5 flex flex-col items-center text-white bg-slate-950/20 border border-white/5 rounded-2xl w-full sm:w-64 hover:scale-[1.02] transition-transform duration-300"
                    >
                      <div className="w-44 h-44 relative overflow-hidden rounded-xl mb-4 shadow-sm">
                        <Image
                          src={photoImg}
                          fill
                          sizes="176px"
                          alt={item.tmember}
                          className="object-cover"
                        />
                      </div>
                      <h2 className="text-lg font-bold mb-1 text-center">
                        {item.tmember}
                      </h2>
                      <div className="text-sky-150 text-xs text-center font-light leading-relaxed">
                        {item.tmemberposition}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-5">
        <h1 className="text-5xl text-center my-3 py-3">Our Partners</h1>
        <div className="w-full md:w-[1200px] mx-auto flex justify-center items-center flex-wrap">
          {partners.map((item, i) => {
            return (
              <div
                className="p-1 m-1 flex flex-col justify-center items-center md:p-3 md:m-3 bg-blue-900 rounded-lg"
                key={i}
              >
                <h3 className="font-bold text-white">{item.cpagename}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <BottomAppBannerHorizontal />
    </div>
  );
}
