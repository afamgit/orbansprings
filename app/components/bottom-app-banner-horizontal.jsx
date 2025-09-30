import Image from "next/image"

export const BottomAppBannerHorizontal = () => {
    return (
        <div className='flex justify-center items-center md:items-end md:h-[600px] p-2 md:p-8'>

        <div className='relative bg-sky-500 w-full max-w-[1100px] md:h-[300px] md:max-h-[300px] md:px-8 mx-auto rounded-3xl flex flex-col justify-center items-center md:flex-row md:justify-between md:items-end'>
          <div className='px-6 pb-9 basis-1/3'>
            <h2 className='text-3xl text-white'>Download Our App</h2>
            <p className='text-white my-2'>Get access to clean potable water at the touch of a button. Experience premium water delivery services, responsive customer support and much more...</p>
           
          </div>
          <div className='basis-1/3 px-2 pb-6 flex flex-col justify-center items-center'>
          <a href="https://play.google.com/store/apps/details?id=com.orbansprings.app" target={"_blank"}>
            <Image
              src='/playstore.png'
              width={250}
              height={80}
              alt='playstore'
              className='rounded my-3'
            /></a>
           <a href="https://apps.apple.com/ng/app/orban-springs/id1621725479" target={"_blank"}>
                <Image
              src='/appstore.png'
              width={250}
              height={80}
              alt='playstore'
              className='rounded my-3'
            /></a>
          </div>
          <div className='static basis-1/3 flex justify-end items-end mb-[-10px] pb-0'>
          <Image
              src='/worker_2.png'
              width={350}
              height={450}
              alt='worker'
              className="block"
            />
          </div>
          </div>
        </div>
        
    )
}