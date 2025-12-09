import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
      
   try {
    const body = await req.json()

    const {id, drvStatus} = body

    const userMsg = drvStatus ? 'disabled' : 'enabled'

    const doAvailability = await prisma.users.update({
        where: {
            id: parseInt(id), role: 'driver'
        },
        data: {isavailable: !drvStatus}
    })


    if(!doAvailability) {
     return NextResponse.json({message: `Driver could not be ${userMsg}`})
    }

    return NextResponse.json({message: `Driver has been ${userMsg}`})

   } catch(error) {

    return NextResponse.json({message: `Operation failed, please try later`, error})
   }
}
