import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {id} = body
    const password = '111111'

    const hashedPassword = await bcrypt.hash(password,10)


    const doReset = await prisma.users.update({
        where: {
            id: parseInt(id), role: 'customer'
        },
        data: {password: hashedPassword}
    })

    if(!doReset) {
     return NextResponse.json({message: 'Customer password could not be reset'})
    }

    return NextResponse.json({message: `Customer password has been reset to ${password}`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch reset customer password', error})
   }
}
