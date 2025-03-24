'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/scripts'
import { z } from 'zod'
import process from 'process'
import { slugify, removeTags } from "./snippets"
import { auth, signIn, signOut } from "../../auth"
import { AuthError } from "next-auth"
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { getProfileUser } from "./data"


const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  const schema = z.object({
    username: z.string(),
    userpass: z.string(),
    usercode: z.string(),
  })
  const data = schema.parse({
    username: formData.get('username'),
    userpass: formData.get('password'),
    usercode: formData.get('usercode'),
  })


  try {

    const checkUser = await prisma.users.findFirst({
      where: {username: data.username, },
      select: {username:true, email:true, enable2fa:true, code2fa:true, expiry2fa:true, password:true}
    })
  
    const userPass = checkUser?.password.startsWith('$2y$') ? checkUser.password.replace('$2y$', '$2b$') : checkUser?.password.startsWith('$2b$') ? checkUser?.password : '';
  
    const existingPass = data.userpass.trim()
  
    const passwordsMatch = await bcrypt.compare(existingPass, userPass)
  
    if(!passwordsMatch) {
      return 'Invalid credentials'; 
    }
    
  if(checkUser?.enable2fa === 'yes' && checkUser?.code2fa !== data.usercode) {

    const randomId = uuidv4().substring(0,6)

    const generateCode = await prisma.users.update({
      data: {
        code2fa: randomId,
      },
      where: {email: checkUser?.email, username: checkUser?.username}
    })

    return 'require 2fa code'; 
  }
  
  if(checkUser?.enable2fa === 'yes' && checkUser?.code2fa === data.usercode) {

    const deleteCode = await prisma.users.update({
      data: {
        code2fa: '',
      },
      where: {email: checkUser?.email, username: checkUser?.username}
    })

  }

  await signIn('credentials', formData);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }

}


export async function newsletterSignup(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string(),
  })
  const data = schema.parse({
    email: formData.get('nemail'),
  })

  try {

const checkNewsletter = await prisma.newsletter.findFirst({
  where: {nlemail: data.email}
})

if(checkNewsletter) {
  return { message: 'This email address exists on our Newsletter database' }
}

    await prisma.newsletter.create({
      data: {
        nlemail: data.email,
        nlname: data.email,
        nlstatus: 1,
        nl_received: 0,
        nl_id: 0
      }
    })
    return { message: 'You have successfully signed up' }

  } catch (e) {
    console.log(e)
    return { message: 'Failed to sign up' }
  }
}


export async function createPage(prevState: any, formData: FormData) {
  const schema = z.object({
    category: z.string(),
    title: z.string(),
    photourl: z.string(),
    desc: z.string(),
  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    title: formData.get('title'),
    photourl: formData.get('photourl'),
    desc: formData.get('desc'),
  })

  try {
    // const file: File | null = formData.get('photo') as unknown as File
    // if (!file) {
    //   throw new Error('No file uploaded')
    // }


    // const bytes = await file.arrayBuffer()
    // const buffer = Buffer.from(bytes)

    // // With the file data in the buffer, you can do whatever you want with it.
    // // For this, we'll just write it to the filesystem in a new location
    // // /Users/afamnnaji/Desktop/next-apps/orban-springs/public
    // console.log("Current working directory: ",
    //   process.cwd());
    // const path = join(process.cwd(), 'public', file.name)
    // const doUpload = await writeFile(path, buffer)

    const doInsert = await prisma.contentpages.create({
      data: {
        cpagemenu: parsedData.category,
        cpagename: parsedData.title,
        cpagecontent: parsedData.desc,
        cpagephoto: parsedData.photourl,
        cpagesbanner: '',
        cpagelinkname: slugify(parsedData.title),
        cpage_postedby: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to create page' }
  }
  revalidatePath('/account/content-pages')
  redirect('/account/content-pages')

}

export async function updatePage(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    category: z.string(),
    title: z.string(),
    desc: z.string(),
    photourl: z.string(),
    uploadedpic: z.string(),
})
  const parsedData = schema.parse({
    category: formData.get('category'),
    title: formData.get('title'),
    desc: formData.get('desc'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic'),
})

  try {
    // const file: File | null = formData.get('photo') as unknown as File
    // if (file) {

    //   const bytes = await file.arrayBuffer()
    //   const buffer = Buffer.from(bytes)

    //   // With the file data in the buffer, you can do whatever you want with it.
    //   // For this, we'll just write it to the filesystem in a new location
    //   // /Users/afamnnaji/Desktop/next-apps/orban-springs/public

    //   const path = join(process.cwd(), 'public', file.name)
    //   const doUpload = await writeFile(path, buffer)
    // }

    const doUpdate = await prisma.contentpages.update({
      where: {
        cpageid: parseInt(id)
      },
      data: {
        cpagemenu: parsedData.category,
        cpagename: parsedData.title,
        cpagecontent: parsedData.desc,
        cpagephoto: parsedData.uploadedpic || parsedData.photourl,
        cpagesbanner: '',
        cpagelinkname: slugify(parsedData.title),
        cpage_postedby: 'admin',
        updatedAt: new Date()
      }
    })


  } catch (e) {
    return { message: 'Failed to update page' }
  }

  revalidatePath('/account/content-pages')
  redirect('/account/content-pages')
}

export async function deletePage(id: string) {

  try {
    await prisma.contentpages.delete({
      where: {
        cpageid: parseInt(id)
      }
    })


    revalidatePath('/account/content-pages')
    return { message: 'Deleted page' }

  } catch (e) {
    return { message: 'Failed to delete page' }
  }
}

export async function createDriver(prevState: any, formData: FormData) {
  const schema = z.object({
    fname: z.string(),
    lname: z.string(),
    fleet: z.coerce.number(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    areagroup: z.string(),
    vehplateno: z.string(),
    vehcapacity: z.string(),
    photourl: z.string(),
  })
  const parsedData = schema.parse({
    fname: formData.get('fname'),
    lname: formData.get('lname'),
    fleet: formData.get('fleet'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    areagroup: formData.get('areagroup'),
    vehplateno: formData.get('truckno'),
    vehcapacity: formData.get('truckvol'),
    photourl: formData.get('photourl'),
  })

  try {

    const name = `${parsedData.fname} ${parsedData.lname}`
    const hashedPassword = await bcrypt.hash('111111',10)

    const doUpdate = await prisma.users.create({
      data: {
        name: name,
        first_name: parsedData.fname,
        last_name: parsedData.lname,
        fleetid: parsedData.fleet,
        username: name,
        password: hashedPassword,
        email: parsedData.email,
        phone: parsedData.phone,
        address: parsedData.address,
        subscription_plan: 'Basic',
        role: 'driver',
        photo: parsedData.photourl,
        areagroup: parsedData.areagroup,
        drv_vehicle_license_plate_no: parsedData.vehplateno,
        drv_vehicle_capacity: parsedData.vehcapacity,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to create page' }
  }
  revalidatePath('/account/vendor-merchants/drivers')
  redirect('/account/vendor-merchants/drivers')

}

export async function updateDriver(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    fname: z.string(),
    lname: z.string(),
    fleet: z.coerce.number(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    areagroup: z.string(),
    vehplateno: z.string(),
    vehcapacity: z.string(),
    photourl: z.string(),
    uploadedpic: z.string()
  })
  const parsedData = schema.parse({
    fname: formData.get('fname'),
    lname: formData.get('lname'),
    fleet: formData.get('fleet'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    areagroup: formData.get('areagroup'),
    vehplateno: formData.get('truckno'),
    vehcapacity: formData.get('truckvol'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic')
  })

  try {
   
    const name = `${parsedData.fname} ${parsedData.lname}`

    const doUpdate = await prisma.users.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: name,
        first_name: parsedData.fname,
        last_name: parsedData.lname,
        fleetid: parsedData.fleet,
        email: parsedData.email,
        phone: parsedData.phone,
        address: parsedData.address,
        photo: parsedData.uploadedpic || parsedData.photourl,
        areagroup: parsedData.areagroup,
        drv_vehicle_license_plate_no: parsedData.vehplateno,
        drv_vehicle_capacity: parsedData.vehcapacity,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update driver' }
  }

  revalidatePath('/account/vendor-merchants/drivers')
  redirect('/account/vendor-merchants/drivers')
}

export async function createTruck(prevState: any, formData: FormData) {
  const schema = z.object({
    truckbrand: z.string(),
    plateno: z.string(),
    meter: z.string(),
    driver: z.string(),
    fleet: z.coerce.number(),
  })
  const parsedData = schema.parse({
    truckbrand: formData.get('truckbrand'),
    plateno: formData.get('plateno'),
    meter: formData.get('meter'),
    driver: formData.get('driver'),
    fleet: formData.get('fleet'),
  })

  try {

    const doUpdate = await prisma.trucks.create({
      data: {
        truck_make: parsedData.truckbrand,
        truck_plateno: parsedData.plateno,
        truck_fleetowner: parsedData.fleet,
        truck_meterid: parsedData.meter,
        truck_driver: parsedData.driver,
        truck_status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to create truck' }
  }
  revalidatePath('/account/vendor-merchants/fleet')
  redirect('/account/vendor-merchants/fleet')

}

export async function updateTruck(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    truckbrand: z.string(),
    plateno: z.string(),
    meter: z.string(),
    driver: z.string(),
    fleet: z.coerce.number(),
    status: z.string(),
  })
  const parsedData = schema.parse({
    truckbrand: formData.get('truckbrand'),
    plateno: formData.get('plateno'),
    meter: formData.get('meter'),
    driver: formData.get('driver'),
    fleet: formData.get('fleet'),
    status: formData.get('status'),
  })

  try {
   

    const doUpdate = await prisma.trucks.update({
      where: {
        truckid: parseInt(id)
      },
      data: {
        truck_make: parsedData.truckbrand,
        truck_plateno: parsedData.plateno,
        truck_fleetowner: parsedData.fleet,
        truck_meterid: parsedData.meter,
        truck_driver: parsedData.driver,
        truck_status: parsedData.status,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update truck' }
  }

  revalidatePath('/account/vendor-merchants/fleet')
  redirect('/account/vendor-merchants/fleet')
}

export async function updateRequest(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    driver: z.coerce.number(),
    fleet: z.string(),
    status: z.string(),
    transid: z.coerce.number(),
  })
  const parsedData = schema.parse({
    driver: formData.get('driver'),
    fleet: formData.get('fleet'),
    status: formData.get('status'),
    transid: formData.get('transid'),
  })


  console.log(`${id} - ${parsedData.driver} - ${parsedData.fleet} - ${parsedData.status} - ${parsedData.transid}`)

  try {

    const user = await prisma.users.findUnique({
      where: {id: parsedData.driver}
    })
   

    const doUpdateRequest = await prisma.requests.update({
      where: {
        id: parseInt(id), status: parsedData.status
      },
      data: {
        driverid: user?.id,
        drivername: user?.name,
        driverphone: user?.phone,
        driveremail: user?.email,
        drivervehicleplateno: user?.drv_vehicle_license_plate_no,
        status: 'accepted',
        updatedAt: new Date()
      }
    })

    const doUpdateOrder = await prisma.transactions.update({
      where: {
        id: parsedData.transid
      },
      data: {
        driverid: user?.id.toString(),
        drivername: user?.name,
        driverphone: user?.phone || '',
        driveremail: user?.email,
        driverphoto: user?.photo || '',
        drivervehicleplateno: user?.drv_vehicle_license_plate_no || '',
        fleetid: parsedData.fleet,
        status: 'Accepted',
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update request' }
  }

  revalidatePath(`/account/vendor-merchants/requests/${id}/request-detail`)
  redirect(`/account/vendor-merchants/requests/${id}/request-detail`)
}

export async function deleteAccount(id: string) {

  try {
    await prisma.users.delete({
      where: {
        id: parseInt(id)
      }
    })


    signOut()
    return { message: 'Deleted user' }

  } catch (e) {
    return { message: 'Failed to delete account' }
  }
}

export async function updateProfile(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    areagroup: z.string(),
    enable2fa: z.string(),
    photourl: z.string(),
    uploadedpic: z.string()
  })
  const parsedData = schema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    areagroup: formData.get('areagroup'),
    enable2fa: formData.get('enable2fa'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic')
  })

  try {

    const doUpdate = await prisma.users.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        address: parsedData.address,
        photo: parsedData.uploadedpic || parsedData.photourl,
        areagroup: parsedData.areagroup,
        enable2fa: parsedData.enable2fa,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update profile' }
  }

  revalidatePath('/account/update_profile')
  return { message: 'Profile successfully updated' }

}

export async function changePassword(id: string, prevState: any, formData: FormData) {


  const schema = z.object({
    email: z.string(),
    oldpass: z.string(),
    newpass: z.string(),
    newpassconfirm: z.string(),
  })
  const parsedData = schema.parse({
    email: formData.get('email'),
    oldpass: formData.get('oldpass'),
    newpass: formData.get('newpass'),
    newpassconfirm: formData.get('newpass_confirm'),
  })


  try {


    if (parsedData.newpass !== parsedData.newpassconfirm) {
      return { message: 'New password does not match the confirm new password' }
    }

    const user = await prisma.users.findFirst({
      where: { email: parsedData.email },
      select: {
        email: true, id: true, password: true
      }
    });

    const userPass = user?.password.startsWith('$2y$') ? user.password.replace('$2y$', '$2b$') : user?.password.startsWith('$2b$') ? user?.password : '';

    const existingPass = parsedData.oldpass.trim()

    const passwordsMatch = await bcrypt.compare(existingPass, userPass)

    if (passwordsMatch) {

    const hashednewPassword = await bcrypt.hash(parsedData.newpass, 10)

    const doUpdate = await prisma.users.update({
      where: {
        id: parseInt(id)
      },
      data: {
        password: hashednewPassword,
        updatedAt: new Date()
      }
    })
  } else {
    console.log('e no still work')
    return { message: 'The old password you provided does not match the password in your account' }
  }
  } catch (e) {
    console.log(e)
    return { message: 'Failed to change password' }
  }
  revalidatePath('/account/change-password')
  return { message: 'You have successfully changed your password. Remember to use the new password when next you need to login' }

}



export async function createProduct(prevState: any, formData: FormData) {
  const schema = z.object({
    category: z.string(),
    name: z.string(),
    desc: z.string(),
    sku: z.string(),
    price: z.coerce.number(),
    size: z.string(),
    responsetime: z.string(),
    status: z.string().transform((value) => value === "1" ? true : false),
    paymentaccount: z.string(),
    photourl: z.string(),
  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    name: formData.get('productname'),
    desc: formData.get('desc'),
    sku: formData.get('sku'),
    price: formData.get('price'),
    size: formData.get('size'),
    responsetime: formData.get('responsetime'),
    status: formData.get('status'),
    paymentaccount: formData.get('paymentaccount'),
    photourl: formData.get('photourl'),
  })

  try {

    const doInsert = await prisma.products.create({
      data: {
        category: parsedData.category,
        catslug: slugify(parsedData.category),
        uuid: '',
        name: parsedData.name,
        nameslug: slugify(parsedData.name),
        sku: parsedData.sku,
        description: parsedData.desc,
        picture: parsedData.photourl,
        price: parsedData.price,
        size: parsedData.size,
        response_time: parsedData.responsetime,
        status: parsedData.status,
        payment_account: parsedData.paymentaccount,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to create product' }
  }
  revalidatePath('/account/products')
  redirect('/account/products')

}

export async function updateProduct(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    category: z.string(),
    name: z.string(),
    desc: z.string(),
    sku: z.string(),
    price: z.coerce.number(),
    size: z.string(),
    responsetime: z.string(),
    status: z.string().transform((value) => value === "1" ? true : false),
    paymentaccount: z.string(),
    photourl: z.string(),
    uploadedpic: z.string(),

  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    name: formData.get('productname'),
    desc: formData.get('desc'),
    sku: formData.get('sku'),
    price: formData.get('price'),
    size: formData.get('size'),
    responsetime: formData.get('responsetime'),
    status: formData.get('status'),
    paymentaccount: formData.get('paymentaccount'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic'),
  })

  try {
    

    const doUpdate = await prisma.products.update({
      where: {
        id: parseInt(id)
      },
      data: {
        category: parsedData.category,
        catslug: slugify(parsedData.category),
        uuid: '',
        name: parsedData.name,
        nameslug: slugify(parsedData.name),
        sku: parsedData.sku,
        description: parsedData.desc,
        picture: parsedData.uploadedpic || parsedData.photourl,
        price: parsedData.price,
        size: parsedData.size,
        response_time: parsedData.responsetime,
        status: parsedData.status,
        payment_account: parsedData.paymentaccount,
        updatedAt: new Date()
      }
    })


  } catch (e) {
    return { message: 'Failed to update product' }
  }

  revalidatePath('/account/products')
  redirect('/account/products')
}

export async function deleteProduct(id: string) {

  try {
    await prisma.products.delete({
      where: {
        id: parseInt(id)
      }
    })


    revalidatePath('/account/products')
    return { message: 'Deleted product' }

  } catch (e) {
    return { message: 'Failed to delete product' }
  }
}

export async function createAreaGroup(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    areas: z.string(),
  })
  const parsedData = schema.parse({
    name: formData.get('areagroup'),
    areas: formData.get('areas'),
  })

  try {

    const doInsert = await prisma.area_groups.create({
      data: {
        agname: parsedData.name,
        agareas: parsedData.areas,
      }
    })

  } catch (e) {
    return { message: 'Failed to create area group' }
  }
  revalidatePath('/account/areagroups')
  redirect('/account/areagroups')

}

export async function updateAreaGroup(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    name: z.string(),
    areas: z.string(),
  })
  const parsedData = schema.parse({
    name: formData.get('areagroup'),
    areas: formData.get('areas'),
  })

  try {

    const doUpdate = await prisma.area_groups.update({
      where: {
        agid: parseInt(id)
      },
      data: {
        agname: parsedData.name,
        agareas: parsedData.areas,
      }
    })


  } catch (e) {
    return { message: 'Failed to update area group' }
  }

  revalidatePath('/account/areagroups')
  redirect('/account/areagroups')
}

export async function deleteAreaGroup(id: string) {

  try {
    await prisma.area_groups.delete({
      where: {
        agid: parseInt(id)
      }
    })


    revalidatePath('/account/areagroups')
    return { message: 'Deleted area group' }

  } catch (e) {
    return { message: 'Failed to delete area group' }
  }
}

export async function createTestimonial(prevState: any, formData: FormData) {
  const schema = z.object({
    rating: z.string(),
    name: z.string(),
    desc: z.string(),
    profession: z.string(),
    photourl: z.string(),
  })
  const parsedData = schema.parse({
    rating: formData.get('stars'),
    name: formData.get('name'),
    desc: formData.get('desc'),
    profession: formData.get('profession'),
    photourl: formData.get('photourl'),
  })

  try {

    const doInsert = await prisma.testimonials.create({
      data: {
        tcustomer: parsedData.name,
        tmessage: parsedData.desc,
        tphoto: parsedData.photourl,
        trole: parsedData.profession,
        tstars: parseInt(parsedData.rating),
        tdate: new Date(),
        tstatus: 1,
      }
    })

  } catch (e) {
    return { message: 'Failed to create page' }
  }

  revalidatePath('/account/testimonials')
  redirect('/account/testimonials')

}

export async function updateTestimonial(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    rating: z.string(),
    name: z.string(),
    desc: z.string(),
    profession: z.string(),
    photourl: z.string(),
    uploadedpic: z.string(),

  })
  const parsedData = schema.parse({
    rating: formData.get('stars'),
    name: formData.get('name'),
    desc: formData.get('desc'),
    profession: formData.get('profession'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic'),

  })

  try {
    
    const doUpdate = await prisma.testimonials.update({
      where: {
        tid: parseInt(id)
      },
      data: {
        tcustomer: parsedData.name,
        tmessage: parsedData.desc,
        tphoto: parsedData.uploadedpic || parsedData.photourl,
        trole: parsedData.profession,
        tstars: parseInt(parsedData.rating),
        tdate: new Date(),
        tstatus: 1,
      }
    })

  } catch (e) {
    return { message: 'Failed to update testimonial' }
  }

  revalidatePath('/account/testimonials')
  redirect('/account/testimonials')
}

export async function deleteTestimonial(id: string) {

  try {
    await prisma.testimonials.delete({
      where: {
        tid: parseInt(id)
      }
    })


    revalidatePath('/account/testimonials')
    return { message: 'Deleted testimonial' }

  } catch (e) {
    return { message: 'Failed to delete testimonial' }
  }
}

export async function createTeam(prevState: any, formData: FormData) {
  const schema = z.object({
    ranking: z.string(),
    name: z.string(),
    profile: z.string(),
    position: z.string(),
    photourl: z.string(),
  })
  const parsedData = schema.parse({
    ranking: formData.get('ranking'),
    name: formData.get('name'),
    profile: formData.get('profile'),
    position: formData.get('position'),
    photourl: formData.get('photourl'),
  })

  try {

    const doInsert = await prisma.team_members.create({
      data: {
        tmcategory: 'Staff',
        tmember: parsedData.name,
        tmember_slug: slugify(parsedData.name),
        tmemberprofile: parsedData.profile,
        tmemberphoto: parsedData.photourl,
        tmemberposition: parsedData.position,
        tmemberrank: parseInt(parsedData.ranking),
        tmemberdateadded: new Date(),
        tmembersummary: parsedData.profile,
        tmemberpostedby: 'Admin',
        tmember_email: '',
        tmember_facebook: '',
        tmember_instagram: '',
        tmember_linkedin: '',
        tmember_phone: '',
        tmember_twitter: '',
      }
    })


  } catch (e) {
    return { message: 'Failed to create page' }
  }

  revalidatePath('/account/teams')
  redirect('/account/teams')

}

export async function updateTeam(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    ranking: z.string(),
    name: z.string(),
    profile: z.string(),
    position: z.string(),
    photourl: z.string(),
    uploadedpic: z.string(),

  })
  const parsedData = schema.parse({
    ranking: formData.get('ranking'),
    name: formData.get('name'),
    profile: formData.get('profile'),
    position: formData.get('position'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic'),
  })
  try {

    const doUpdate = await prisma.team_members.update({
      where: {
        tmemberid: parseInt(id)
      },
      data: {
        tmember: parsedData.name,
        tmember_slug: slugify(parsedData.name),
        tmemberprofile: parsedData.profile,
        tmemberphoto: parsedData.uploadedpic || parsedData.photourl,
        tmemberposition: parsedData.position,
        tmemberrank: parseInt(parsedData.ranking),
      }
    })

  } catch (e) {
    return { message: 'Failed to update team' }
  }

  revalidatePath('/account/teams')
  redirect('/account/teams')
}

export async function deleteTeam(id: string) {

  try {
    await prisma.team_members.delete({
      where: {
        tmemberid: parseInt(id)
      }
    })

    revalidatePath('/account/teams')

    return { message: 'Deleted team member' }

  } catch (e) {
    return { message: 'Failed to delete team member' }
  }
}

export async function createSubscription(prevState: any, formData: FormData) {
  const schema = z.object({
    cat: z.string(),
    name: z.string(),
    amount: z.coerce.number(),
    months: z.string(),
    includes: z.string(),
    excludes: z.string(),
  })
  const parsedData = schema.parse({
    cat: formData.get('cat'),
    name: formData.get('spname'),
    amount: formData.get('amount'),
    months: formData.get('months'),
    includes: formData.get('includes'),
    excludes: formData.get('excludes'),
  })

  try {

    const doInsert = await prisma.subscription_plans.create({
      data: {
        subplan_cat: parsedData.cat,
        subplan: parsedData.name,
        subplan_amount: parsedData.amount,
        subplan_months: parsedData.months,
        subplan_include: parsedData.includes,
        subplan_exclude: parsedData.excludes,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })


  } catch (e) {
    return { message: 'Failed to create subscription' }
  }

  revalidatePath('/account/subscriptions')
  redirect('/account/subscriptions')

}

export async function updateSubscription(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    cat: z.string(),
    name: z.string(),
    amount: z.coerce.number(),
    months: z.string(),
    includes: z.string(),
    excludes: z.string(),
  })
  const parsedData = schema.parse({
    cat: formData.get('cat'),
    name: formData.get('spname'),
    amount: formData.get('amount'),
    months: formData.get('months'),
    includes: formData.get('includes'),
    excludes: formData.get('excludes'),
  })

  try {

    const doUpdate = await prisma.subscription_plans.update({
      where: {
        subplanid: parseInt(id)
      },
      data: {
        subplan_cat: parsedData.cat,
        subplan: parsedData.name,
        subplan_amount: parsedData.amount,
        subplan_months: parsedData.months,
        subplan_include: parsedData.includes,
        subplan_exclude: parsedData.excludes,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update subscription' }
  }

  revalidatePath('/account/subscriptions')
  redirect('/account/subscriptions')
}

export async function deleteSubscription(id: string) {

  try {
    await prisma.subscription_plans.delete({
      where: {
        subplanid: parseInt(id)
      }
    })

    revalidatePath('/account/subscriptions')

    return { message: 'Deleted subscription plan' }

  } catch (e) {
    return { message: 'Failed to delete subscription plan' }
  }
}

export async function createArticle(story: string, prevState: any, formData: FormData) {
  const schema = z.object({
    category: z.string(),
    title: z.string(),
    author: z.string(),
    mkeys: z.string().min(0),
    mdesc: z.string().min(0),
    photourl: z.string(),
    caption: z.string(),
    status: z.string(),
    source: z.string(),
    source_url: z.string(),
    date_published: z.string()
  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    title: formData.get('title'),
    author: formData.get('author'),
    mkeys: formData.get('mkeys'),
    mdesc: formData.get('mdesc'),
    photourl: formData.get('photourl'),
    caption: formData.get('caption'),
    status: formData.get('status'),
    source: formData.get('source'),
    source_url: formData.get('source_url'),
    date_published: formData.get('date_published')
  })

  try {

    let cleanText = removeTags(story) || ''

    const doInsert = await prisma.articles.create({
      data: {
        artcategory: parsedData.category,
        title: parsedData.title,
        titleslug: slugify(parsedData.title),
        fullcontent: story,
        author: parsedData.author,
        mkeys: parsedData.mkeys || parsedData.title.split(' ', 10).join(','),
        mdesc: parsedData.mdesc || cleanText,
        artphotourl: parsedData.photourl,
        artstatus: parsedData.status,
        views: 1,
        artphotocaption: parsedData.caption,
        artphoto: parsedData.photourl,
        artsource: parsedData.source,
        artsource_url: parsedData.source_url,
        published_date: parsedData.date_published,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    })


  } catch (e) {
    return { message: 'Failed to add article' }
  }

  revalidatePath('/account/blog')
  redirect('/account/blog')

}

export async function updateArticle(id: string, story: string, prevState: any, formData: FormData) {

  const schema = z.object({
    category: z.string(),
    title: z.string(),
    author: z.string(),
    mkeys: z.string().min(0),
    mdesc: z.string().min(0),
    photourl: z.string(),
    uploadedpic: z.string(),
    hits: z.coerce.number(),
    caption: z.string(),
    status: z.string(),
    source: z.string(),
    source_url: z.string(),
    date_published: z.string()

  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    title: formData.get('title'),
    author: formData.get('author'),
    mkeys: formData.get('mkeys'),
    mdesc: formData.get('mdesc'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic'),
    hits: formData.get('hits'),
    caption: formData.get('caption'),
    status: formData.get('status'),
    source: formData.get('source'),
    source_url: formData.get('source_url'),
    date_published: formData.get('date_published')
  })
  try {

    let cleanText = removeTags(story) || ''


    const doUpdate = await prisma.articles.update({
      where: {
        artid: parseInt(id)
      },
      data: {
        artcategory: parsedData.category,
        title: parsedData.title,
        titleslug: slugify(parsedData.title),
        fullcontent: story,
        author: parsedData.author,
        mkeys: parsedData.mkeys || parsedData.title.split(' ', 15).join(','),
        mdesc: parsedData.mdesc || cleanText,
        artphotourl: parsedData.uploadedpic || parsedData.photourl,
        views: parsedData.hits,
        artstatus: parsedData.status,
        artphotocaption: parsedData.caption,
        artphoto: parsedData.uploadedpic || parsedData.photourl,
        artsource: parsedData.source,
        artsource_url: parsedData.source_url,
        published_date: parsedData.date_published,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    console.log(e)
    return { message: 'Failed to update article' }
  }

  revalidatePath('/account/blog')
  redirect('/account/blog')
}

export async function deleteArticle(id: string) {

  try {
    await prisma.articles.delete({
      where: {
        artid: parseInt(id)
      }
    })

    revalidatePath('/account/blog')

    return { message: 'Deleted article' }

  } catch (e) {
    return { message: 'Failed to delete article' }
  }
}

export async function createNewsletter(story: string, prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string(),
    postedby: z.string(),
  })
  const parsedData = schema.parse({
    title: formData.get('title'),
    postedby: formData.get('postedby'),
  })

  try {

    const doInsert = await prisma.newsletter_body.create({
      data: {
        nlb_title: parsedData.title,
        nlb_story: story,
        nlb_finished: 'No',
        nlb_postedby: parsedData.postedby,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    })

    const updateSubscribers = await prisma.newsletter.updateMany({
      data: {
        nl_received: 0,
        nl_id: doInsert?.nlb_id
      }
    })


  } catch (e) {
    return { message: 'Failed to add newsletter' }
  }

  revalidatePath('/account/newsletters')
  redirect('/account/newsletters')

}

export async function updateNewsletter(id: string, story: string, prevState: any, formData: FormData) {

  const schema = z.object({
    title: z.string(),
    finished: z.string(),
    postedby: z.string(),
  })
  const parsedData = schema.parse({
    title: formData.get('title'),
    finished: formData.get('finished'),
    postedby: formData.get('postedby'),
  })

  
  try {

    const doUpdate = await prisma.newsletter_body.update({
      where: {
        nlb_id: parseInt(id)
      },
      data: {
        nlb_title: parsedData.title,
        nlb_story: story,
        nlb_finished: parsedData.finished,
        nlb_postedby: parsedData.postedby,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    console.log(e)
    return { message: 'Failed to update newsletter' }
  }

  revalidatePath('/account/newsletters')
  redirect('/account/newsletters')
}

export async function deleteNewsletter(id: string) {

  try {
    await prisma.newsletter_body.delete({
      where: {
        nlb_id: parseInt(id)
      }
    })

    revalidatePath('/account/newsletters')

    return { message: 'Deleted newsletter' }

  } catch (e) {
    return { message: 'Failed to delete newsletter' }
  }
}

export async function createMeter(prevState: any, formData: FormData) {
  const schema = z.object({
    uniqueid: z.string(),
    for: z.string(),
    assigned: z.string(),
    assignedto: z.string(),
    area: z.string(),
    status: z.string(),
    valvestate: z.string(),
  })
  const parsedData = schema.parse({
    uniqueid: formData.get('uniqueid'),
    for: formData.get('for'),
    assigned: formData.get('assigned'),
    assignedto: formData.get('assignedto'),
    area: formData.get('area'),
    status: formData.get('status'),
    valvestate: formData.get('valvestate'),
  })

  try {
    const doInsert = await prisma.meters.create({
      data: {
        m_unique_id: parsedData.uniqueid,
        m_for: parsedData.for,
        m_assigned: parsedData.assigned,
        m_assigned_to: parsedData.assignedto,
        m_area: parsedData.area,
        m_status: parsedData.status,
        m_valve_state: parsedData.valvestate,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })


  } catch (e) {
    return { message: 'Failed to create meter' }
  }

  revalidatePath('/account/meters')
  redirect('/account/meters')

}

export async function updateMeter(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    uniqueid: z.string(),
    for: z.string(),
    assigned: z.string(),
    assignedto: z.string(),
    area: z.string(),
    status: z.string(),
    valvestate: z.string(),
  })
  const parsedData = schema.parse({
    uniqueid: formData.get('uniqueid'),
    for: formData.get('for'),
    assigned: formData.get('assigned'),
    assignedto: formData.get('assignedto'),
    area: formData.get('area'),
    status: formData.get('status'),
    valvestate: formData.get('valvestate'),
  })

  try {
    const file: File | null = formData.get('photo') as unknown as File
    if (file) {

      const bytes = await file.arrayBuffer()
      const buffer:any = Buffer.from(bytes)

      // With the file data in the buffer, you can do whatever you want with it.
      // For this, we'll just write it to the filesystem in a new location
      // /Users/afamnnaji/Desktop/next-apps/orban-springs/public

      const path = join(process.cwd(), 'public', file.name)
      const doUpload = await writeFile(path, buffer)
    }

    const doUpdate = await prisma.meters.update({
      where: {
        meterid: parseInt(id)
      },
      data: {
        m_unique_id: parsedData.uniqueid,
        m_for: parsedData.for,
        m_assigned: parsedData.assigned,
        m_assigned_to: parsedData.assignedto,
        m_area: parsedData.area,
        m_status: parsedData.status,
        m_valve_state: parsedData.valvestate,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update meter' }
  }

  revalidatePath('/account/meters')
  redirect('/account/meters')

}

export async function deleteMeter(id: string) {

  try {
    await prisma.meters.delete({
      where: {
        meterid: parseInt(id)
      }
    })


    revalidatePath('/account/meters')
    return { message: "Deleted meter" }

  } catch (e) {
    return { message: 'Failed to delete meter' }
  }
}

export async function createMeterNumber(prevState: any, formData: FormData) {
  const schema = z.object({
    qty: z.string(),
    type: z.string()
  })
  const parsedData = schema.parse({
    qty: formData.get('qty'),
    type: formData.get('type'),
  })

  const lastid = await prisma.meter_numbers.count()

  const unique_nums = arrayRange(lastid + 1, parseInt(parsedData.qty) + lastid, 1)

  const total = lastid + unique_nums.length

  try {

    for (let i = unique_nums[0]; i <= total; i++) {
      const num = String(i).padStart(10, '0')

      await prisma.meter_numbers.create({
        data:
        {
          meter_uuid: num,
          meter_type: parsedData.type,
          meter_assigned: 'No',
          meter_uuid_used: 'No',
          createdAt: new Date(),
        }
      })

      await prisma.meters.create({
        data:
        {
          m_unique_id: num,
          m_for: parsedData.type,
          m_assigned: 'No',
          m_assigned_to: '',
          m_area: '',
          m_status: 'Inactive',
          m_valve_state: 'Closed',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    }

  } catch (e) {
    return { message: 'Failed to generate meter numbers' }
  }

  revalidatePath('/account/meters/meter-numbers')
  redirect('/account/meters/meter-numbers')
}

export async function createProductPrices(prevState: any, formData: FormData) {
  const schema = z.object({
    productid: z.coerce.number(),
    subscriptiontype: z.string()
  })
  const parsedData = schema.parse({
    productid: formData.get('productid'),
    subscriptiontype: formData.get('subscriptiontype'),
  })

  const areas = await prisma.area_groups.findMany()

  try {

    for (let i = 0; i < areas.length; i++) {
      const area = areas[i].agname

      await prisma.product_prices_areas.create({
        data:
        {
          ppa_pid: parsedData.productid,
          pparea: area,
          pp_subscription: parsedData.subscriptiontype,
          pp_rate: 19,
        }
      })

    }

  } catch (e) {
    return { message: 'Failed to generate product prices' }
  }

  revalidatePath(`/account/products/${parsedData.productid}/prices`)
  // redirect('/account/products')
}

export async function updateProductPrice(ppriceid: string, prevState: any, formData: FormData) {
  const schema = z.object({
    productid: z.coerce.number(),
    amount: z.coerce.number()
  })
  const parsedData = schema.parse({
    productid: formData.get('productid'),
    amount: formData.get('amount'),
  })


  try {

    await prisma.product_prices_areas.update({
      where: { ppid: parseInt(ppriceid), ppa_pid: parsedData.productid },
      data:
      {
        pp_rate: parsedData.amount,
      }
    })


  } catch (e) {
    return { message: 'Failed to update product price' }
  }

  revalidatePath(`/account/products/${parsedData.productid}/prices`)
  // redirect('/account/products')
}

export async function sendMessage(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
  })
  const data = schema.parse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  try {
    await prisma.contact_messages.create({
      data: {
        cname: data.name,
        cphone: data.phone,
        cemail: data.email,
        csubject: data.subject,
        cmessage: data.message,
        cstatus: 'Open',
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    })
  } catch (e) {
    return { message: 'Failed to send message' }
  }

  return redirect('/contact-confirmation')

}

export async function replyComplaint(id: string, prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    phone: z.string(),
    subject: z.string(),
    message: z.string(),
  })
  const data = schema.parse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  try {
    await prisma.complaints_replies.create({
      data: {
        complaintid: parseInt(id),
        creplyname: data.name,
        creplyphone: data.phone,
        creplysubject: data.subject,
        creplymessage: data.message,
        createdAt: new Date(),
      }
    })
  } catch (e) {
    return { message: 'Failed to reply message' }
  }

  return redirect('/account/complaints')

}

export async function createUser(prevState: any, formData: FormData) {
  const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    areagroup: z.string(),
    latitude: z.coerce.number() || 0,
    longitude: z.coerce.number() || 0,
    username: z.string(),
    password: z.string(),
    userrole: z.string(),
    photourl: z.string(),
  })
  const parsedData = schema.parse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    areagroup: formData.get('areagroup'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    username: formData.get('username'),
    password: formData.get('password'),
    userrole: formData.get('userrole'),
    photourl: formData.get('photourl'),
  })

  const userInfo = await auth()

  const usrEmail = userInfo?.user.email || ''

  const profile = await getProfileUser(usrEmail)

  try {
    const name = `${parsedData.first_name} ${parsedData.last_name}`
    const hashedPassword = await bcrypt.hash(parsedData.password,10)

    const doInsert = await prisma.users.create({
      data: {
        name: name,
        first_name: parsedData.first_name,
        last_name: parsedData.last_name,
        fleetid: 0,
        username: name,
        password: hashedPassword,
        email: parsedData.email,
        phone: parsedData.phone,
        address: parsedData.address,
        subscription_plan: 'Basic',
        role: parsedData.userrole,
        photo: parsedData.photourl,
        latitude: parsedData.latitude,
        longitude: parsedData.longitude,
        areagroup: parsedData.areagroup,
        isactive: true,
        isverified: true,
        verifiedby: profile?.name,
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })


  } catch (e) {
    console.log(e)
    return { message: 'Failed to create merchant' }
  }

  revalidatePath('/account/users/merchants')
  redirect('/account/users/merchants')

}

export async function updateUser(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    areagroup: z.string(),
    latitude: z.coerce.number() || 0,
    longitude: z.coerce.number() || 0,
    userrole: z.string(),
    photourl: z.string(),
    uploadedpic: z.string(),
  })
  const parsedData = schema.parse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    areagroup: formData.get('areagroup'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    userrole: formData.get('userrole'),
    photourl: formData.get('photourl'),
    uploadedpic: formData.get('uploadedpic'),
  })
    try {
      const name = `${parsedData.first_name} ${parsedData.last_name}`
    
      const doUpdate = await prisma.users.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: name,
        first_name: parsedData.first_name,
        last_name: parsedData.last_name,
        email: parsedData.email,
        phone: parsedData.phone,
        address: parsedData.address,
        role: parsedData.userrole,
        photo: parsedData.uploadedpic || parsedData.photourl,
        areagroup: parsedData.areagroup,
        latitude: parsedData.latitude,
        longitude: parsedData.longitude,
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update merchant' }
  }

  revalidatePath('/account/users/merchants')
  redirect('/account/users/merchants')
}

export async function deleteUser(id: string) {

  try {
    await prisma.users.delete({
      where: {
        id: parseInt(id)
      }
    })

    revalidatePath('/account/users')

    return { message: 'Deleted user' }

  } catch (e) {
    return { message: 'Failed to delete user' }
  }
}

export async function createFaq(prevState: any, formData: FormData) {
  const schema = z.object({
    category: z.string(),
    question: z.string(),
    answer: z.string(),
  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    question: formData.get('question'),
    answer: formData.get('answer'),
  })

  try {

    const doInsert = await prisma.faqs.create({
      data: {
        faqcat: parsedData.category,
        faqquestion: parsedData.question,
        faqslug: slugify(parsedData.question),
        faqanswer: parsedData.answer,
        faqpostedby: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })


  } catch (e) {
    return { message: 'Failed to create question' }
  }

  revalidatePath('/account/faqs')
  redirect('/account/faqs')

}

export async function updateFaq(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    category: z.string(),
    question: z.string(),
    answer: z.string(),
  })
  const parsedData = schema.parse({
    category: formData.get('category'),
    question: formData.get('question'),
    answer: formData.get('answer'),
  })
  try {
    const doUpdate = await prisma.faqs.update({
      where: {
        faqid: parseInt(id)
      },
      data: {
        faqcat: parsedData.category,
        faqquestion: parsedData.question,
        faqslug: slugify(parsedData.question),
        faqanswer: parsedData.answer,
        faqpostedby: 'Admin',
        updatedAt: new Date()
      }
    })

  } catch (e) {
    return { message: 'Failed to update question' }
  }

  revalidatePath('/account/faqs')
  redirect('/account/faqs')
}

export async function deleteFaq(id: string) {

  try {
    await prisma.faqs.delete({
      where: {
        faqid: parseInt(id)
      }
    })

    revalidatePath('/account/faqs')

    return { message: 'Deleted question' }

  } catch (e) {
    return { message: 'Failed to delete question' }
  }
}

