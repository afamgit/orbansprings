import Image from "next/image"

export const BottomAppBanner = () => {
    return (
        <div className='flex justify-center items-center md:items-end md:h-[800px] p-2 md:p-8'>

        <div className='bg-sky-500 w-full max-w-[1100px] md:h-[500px] md:max-h-[500px] md:p-8 mx-auto rounded-3xl flex flex-col justify-center items-center md:flex-row md:justify-between md:items-end'>
          <div className='p-6 basis-1/3'>
            <h2 className='text-3xl text-white'>Download Our App</h2>
            <p className='text-white my-2'>Get access to clean potable water at the touch of a button. Experience premium water delivery services, responsive customer support and much more...</p>
            <div className='flex flex-col justify-center items-center'>
              <a href="https://play.google.com/store/apps/details?id=com.orbansprings.app" target={"_blank"}>
                 <Image
              src='/playstore.png'
              width={300}
              height={100}
              alt='playstore'
              className='rounded-lg my-3'
            /></a>
                          <a href="https://apps.apple.com/ng/app/orban-springs/id1621725479" target={"_blank"}>

            <Image
              src='/appstore.png'
              width={300}
              height={100}
              alt='playstore'
              className='rounded-lg my-3'
            /></a>
            </div>
          </div>
          <div className='static block basis-1/3 flex justify-end'>
          <Image
              src='/mobile_app1.png'
              width={350}
              height={400}
              alt='mobile app'
              className="block"
            />
          </div>
          <div className='static block basis-1/3 flex justify-start'>
          <Image
              src='/mobile_app2.png'
              width={350}
              height={400}
              alt='mobile app 2'
              className="block"
            />
          </div>
          </div>
      </div>

    )
}