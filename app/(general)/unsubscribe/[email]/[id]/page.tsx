import { prisma} from '@/scripts'
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/breadcrumbs';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Page({params}: {params: {email: string, id: number}}) {
    const {email, id} = params;

    const decodedEmail = decodeURIComponent(email)

    const user = await prisma.newsletter.findFirst({
        where: {
            nlemail: decodedEmail, nlid: id
        }
    })

  
    const deleted = user && await prisma?.newsletter.delete({
      where: { nlemail: decodedEmail, nlid: id },
    });


    return (
        <div className='p-3 bg-white'>
                      <div className="w-full md:w-[1200px] mx-auto flex justify-start items-center">
        <div className='hidden md:block'>
          <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Newsletters subscription", href: "/unsubscribe", active: true },
          ]}
        />
        </div>
      </div>

        <div className='w-full md:w-[1200px]  mx-auto p-3 md:p-5 bg-white'>

{!user ? <div className='my-2 py-2'>
    We encountered a problem confirming your subscription. Try again later.
    </div> : null}

{deleted ? <div className='my-2 py-2'>
    Your email address has been deleted from our newsletter subscription database.
</div> : null}

<p className='my-2 py-2'>Return to <Link className='font-bold' href='/'>home</Link></p>


       </div>
            </div>
    )

    }