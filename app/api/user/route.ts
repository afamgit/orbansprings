import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {name, email, password} = body

    const isEmailExist = await prisma.users.findUnique({
        where: {
            email: email
        }
    })

    if(isEmailExist) {
     return NextResponse.json({user:null, message: 'User exists with this email address'})
    }

    const isUsernameExist = await prisma.users.findUnique({
        where: {
            username: name
        }
    })

    if(isUsernameExist) {
        return NextResponse.json({user:null, message: 'User exists with this username'})
    }

  const hashedPassword = password

    const createUser = await prisma.users.create({
        data: {
            name: name, 
            username: name,
            email:email,
            password: hashedPassword,
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    const {password: newUserPassword, ...rest} = createUser

    return NextResponse.json({user: rest, message: 'User successfully created'})

   } catch(error) {

    return NextResponse.json({message: 'Failed to sign up user', error})
   }
}
