import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {email} = body

    const isEmailExist = await prisma.users.findUnique({
        where: {
            email: email
        },
        select: {
            email:true,
            name: true,
            photo: true,
            role: true
        }
    })

    if(!isEmailExist) {
     return NextResponse.json({user:null, message: 'User not found with this email address'})
    }

    return NextResponse.json({user: isEmailExist})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch user', error})
   }
}
