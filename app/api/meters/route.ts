import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {username, meterid } = body

    const parsedCredentials = z
    .object({ username: z.string(), meterid: z.string().min(9).max(10) })
    .safeParse(body);

    if(!parsedCredentials.success) {
      return NextResponse.json({meter:null, message: 'Please provide all the required information'})
    }

    const userExist = await prisma.users.findUnique({
        where: {
            username: username, role: 'admin' || 'iot'
        }
    })

    if(!userExist) {
     return NextResponse.json({meter:null, message: 'You are not authorised to do this please'})
    }


    const meterExist = await prisma.meters.findUnique({
        where: {
            m_unique_id: meterid
        }
    })

    if(!meterExist) {
     return NextResponse.json({meter:null, message: 'Meter ID not found in the database'})
    }

    return NextResponse.json({meter: meterExist, message: `Meter found with meter ID ${meterid}`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to retrieve meter details', error})
   }
}