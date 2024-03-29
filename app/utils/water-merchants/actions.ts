'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/scripts'
import {z} from 'zod'
import process from 'process'
import { slugify } from "./../snippets"
import { signIn } from "../../../auth"
import { AuthError } from "next-auth"

 
const arrayRange = (start: number, stop: number, step: number) =>
Array.from(
{ length: (stop - start) / step + 1 },
(value, index) => start + index * step
);

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  try {
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
        email: formData.get('email'),
})

  try {
    await prisma.newsletter.create({
       data: {
        nlemail: data.email,
        nlname: data.email
        
       }
})
  } catch (e) {
    throw e
  }
}


export async function createPage(prevState: any, formData: FormData) {
  const schema = z.object({
      category: z.string(),
      title: z.string(),
      desc: z.string(),
  })
  const parsedData = schema.parse({
      category: formData.get('category'),
      title: formData.get('title'),
      desc: formData.get('desc'),
})

try {
  const file: File | null = formData.get('photo') as unknown as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public
  console.log("Current working directory: ",
  process.cwd());
  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)

  const doInsert = await prisma.contentpages.create({
    data: {
      cpagemenu: parsedData.category,
      cpagename: parsedData.title,
      cpagecontent: parsedData.desc,
      cpagephoto: file.name,
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
      picture: z.string(),
  })
  const parsedData = schema.parse({
      category: formData.get('category'),
      title: formData.get('title'),
      desc: formData.get('desc'),
      picture: formData.get('picture'),
})

try {
  const file: File | null = formData.get('photo') as unknown as File
  if (file) {
 
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public

  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)
}

  const doUpdate = await prisma.contentpages.update({
    where: {
      cpageid: parseInt(id)
    },
    data: {
      cpagemenu: parsedData.category,
      cpagename: parsedData.title,
      cpagecontent: parsedData.desc,
      cpagephoto: file.name !== '' && file.name !== null && file.name !== 'undefined' ? file.name : parsedData.picture,
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


export async function createTestimonial(prevState: any, formData: FormData) {
  const schema = z.object({
      rating: z.string(),
      name: z.string(),
      desc: z.string(),
      profession: z.string(),
  })
  const parsedData = schema.parse({
      rating: formData.get('stars'),
      name: formData.get('name'),
      desc: formData.get('desc'),
      profession: formData.get('profession'),
})

try {
  const file: File | null = formData.get('photo') as unknown as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public
  console.log("Current working directory: ",
  process.cwd());
  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)

  const doInsert = await prisma.testimonials.create({
    data: {
      tcustomer: parsedData.name,
      tmessage: parsedData.desc,
      tphoto: file.name,
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
    picture: z.string(),
  })
const parsedData = schema.parse({
    rating: formData.get('stars'),
    name: formData.get('name'),
    desc: formData.get('desc'),
    profession: formData.get('profession'),
    picture: formData.get('picture'),
  })

try {
  const file: File | null = formData.get('photo') as unknown as File
  if (file) {
 
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public

  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)
}

  const doUpdate = await prisma.testimonials.update({
    where: {
      tid: parseInt(id)
    },
    data: {
      tcustomer: parsedData.name,
      tmessage: parsedData.desc,
      tphoto: file.name !== '' && file.name !== null && file.name !== 'undefined' ? file.name : parsedData.picture,
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
  })
  const parsedData = schema.parse({
      ranking: formData.get('ranking'),
      name: formData.get('name'),
      profile: formData.get('profile'),
      position: formData.get('position'),
})

try {
  const file: File | null = formData.get('photo') as unknown as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public
  console.log("Current working directory: ",
  process.cwd());
  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)

  const doInsert = await prisma.team_members.create({
    data: {
      tmcategory: 'Staff',
      tmember: parsedData.name,
      tmember_slug: slugify(parsedData.name),
      tmemberprofile: parsedData.profile,
      tmemberphoto: file.name,
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
    picture: z.string(),
  })
const parsedData = schema.parse({
    ranking: formData.get('ranking'),
    name: formData.get('name'),
    profile: formData.get('profile'),
    position: formData.get('position'),
    picture: formData.get('picture'),
  })
try {
  const file: File | null = formData.get('photo') as unknown as File
  if (file) {
 
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public

  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)
}
  const doUpdate = await prisma.team_members.update({
    where: {
      tmemberid: parseInt(id)
    },
    data: {
      tmember: parsedData.name,
      tmember_slug: slugify(parsedData.name),
      tmemberprofile: parsedData.profile,
      tmemberphoto: file.name !== '' && file.name !== null && file.name !== 'undefined' ? file.name : parsedData.picture,
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
  const buffer = Buffer.from(bytes)

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
  return {message: "Deleted meter"}

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

const unique_nums = arrayRange(lastid+1,parseInt(parsedData.qty)+lastid,1)

const total = lastid + unique_nums.length

try {

  for (let i=unique_nums[0]; i <= total; i++) {
    const num = String(i).padStart(10,'0')
  
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
      ranking: z.string(),
      name: z.string(),
      profile: z.string(),
      position: z.string(),
  })
  const parsedData = schema.parse({
      ranking: formData.get('ranking'),
      name: formData.get('name'),
      profile: formData.get('profile'),
      position: formData.get('position'),
})

try {
  const file: File | null = formData.get('photo') as unknown as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public
  console.log("Current working directory: ",
  process.cwd());
  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)

  const doInsert = await prisma.team_members.create({
    data: {
      tmcategory: 'Staff',
      tmember: parsedData.name,
      tmember_slug: slugify(parsedData.name),
      tmemberprofile: parsedData.profile,
      tmemberphoto: file.name,
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
  return { message: 'Failed to create user' }
}

revalidatePath('/account/users')
redirect('/account/users')

}

export async function updateUser(id: string, prevState: any, formData: FormData) {

  const schema = z.object({
    ranking: z.string(),
    name: z.string(),
    profile: z.string(),
    position: z.string(),
    picture: z.string(),
  })
const parsedData = schema.parse({
    ranking: formData.get('ranking'),
    name: formData.get('name'),
    profile: formData.get('profile'),
    position: formData.get('position'),
    picture: formData.get('picture'),
  })
try {
  const file: File | null = formData.get('photo') as unknown as File
  if (file) {
 
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // /Users/afamnnaji/Desktop/next-apps/orban-springs/public

  const path = join(process.cwd(), 'public', file.name)
  const doUpload = await writeFile(path, buffer)
}
  const doUpdate = await prisma.team_members.update({
    where: {
      tmemberid: parseInt(id)
    },
    data: {
      tmember: parsedData.name,
      tmember_slug: slugify(parsedData.name),
      tmemberprofile: parsedData.profile,
      tmemberphoto: file.name !== '' && file.name !== null && file.name !== 'undefined' ? file.name : parsedData.picture,
      tmemberposition: parsedData.position,
      tmemberrank: parseInt(parsedData.ranking),
    }
  })

} catch (e) {
  return { message: 'Failed to update user' }
}

revalidatePath('/account/users')
redirect('/account/users')
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
    
  